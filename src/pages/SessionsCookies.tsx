export default function SessionsCookies() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 8 min</div>
      <h1>Sessions vs JWT</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Toda autenticação web acaba caindo em duas famílias: <strong>sessions com cookie</strong> (estado no servidor) ou <strong>JWT</strong> (estado no token). Cada uma resolve um problema diferente; misturar mal as duas é fonte comum de bugs e brechas.</p>

<h2>Conceito</h2>
<p><strong>Session-based</strong>: o servidor cria um ID, guarda os dados associados (user, roles, expiração) num store (Redis, DB) e devolve só o ID via cookie. A cada request, o servidor lê o store.</p>
<p><strong>JWT</strong>: o token carrega os claims assinados. O servidor valida a assinatura sem consultar nada. Stateless, mas difícil de revogar antes de expirar.</p>

<h3>Comparação rápida</h3>
<ul>
<li><strong>Revogação</strong> — sessions vencem na hora (delete no Redis); JWT precisa de blacklist ou tempos curtos + refresh.</li>
<li><strong>Escala</strong> — JWT não consulta store por request, mas força refresh frequente; sessions com Redis são triviais de escalar horizontalmente.</li>
<li><strong>Tamanho</strong> — cookie de sessão tem ~32 bytes; JWT cresce com claims (centenas de bytes).</li>
<li><strong>Web vs mobile</strong> — sessions com cookie HttpOnly são mais seguras para web; JWT é prático em mobile/SPA cross-domain.</li>
</ul>

<h2>Exemplo prático: session com Redis</h2>
<pre><code class="language-bash">npm i express express-session connect-redis ioredis</code></pre>
<pre><code class="language-js">import express from 'express';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
const app = express();

app.set('trust proxy', 1);
app.use(session({
  store: new RedisStore({ client: redis, prefix: 'sess:' }),
  secret: process.env.SESSION_SECRET,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

app.post('/login', async (req, res) =&gt; {
  const user = await authenticate(req.body);
  if (!user) return res.status(401).json({ error: 'invalid' });
  req.session.userId = user.id;
  res.json({ ok: true });
});

app.post('/logout', (req, res) =&gt; {
  req.session.destroy(() =&gt; res.clearCookie('sid').json({ ok: true }));
});</code></pre>

<h3>JWT com refresh</h3>
<pre><code class="language-js">import jwt from 'jsonwebtoken';

function issueTokens(user) {
  const access = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
  const refresh = jwt.sign({ sub: user.id, t: 'refresh' }, process.env.JWT_REFRESH, {
    expiresIn: '30d',
  });
  return { access, refresh };
}

app.post('/login', async (req, res) =&gt; {
  const user = await authenticate(req.body);
  const { access, refresh } = issueTokens(user);
  res
    .cookie('refresh', refresh, { httpOnly: true, secure: true, sameSite: 'lax' })
    .json({ access });
});</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Web app server-rendered, mesmo domínio: <strong>session cookie</strong>.</li>
<li>SPA + API no mesmo domínio: <strong>session cookie</strong> (com proteção CSRF).</li>
<li>SPA cross-domain ou mobile: <strong>JWT access curto + refresh em cookie</strong>.</li>
<li>Microsserviços internos: <strong>JWT</strong> assinado pela auth central.</li>
<li>Webhooks: nenhuma das duas — use HMAC do payload.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Cookies sempre <code>HttpOnly</code> + <code>Secure</code> + <code>SameSite=Lax</code> (ou <code>Strict</code> se possível).</li>
<li>Rotacione o ID de sessão após login (<code>req.session.regenerate</code>) para mitigar fixation.</li>
<li>Em JWT, <strong>nunca</strong> coloque dados sensíveis nos claims — eles são só base64, não criptografados.</li>
<li>Use algoritmos assimétricos (RS256/ES256) em sistemas distribuídos para que serviços validem sem ter o secret.</li>
<li>Tempos curtos (15min access, 7d refresh) limitam dano em vazamento.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">CSRF não morre com JWT</div><div>Se você guarda o token em cookie, ainda precisa de proteção CSRF. Se guarda em <code>localStorage</code>, abre porta para XSS. Não há almoço grátis — escolha conscientemente.</div></div>

<div class="callout callout-tip"><div class="callout-title">Comece pelo session</div><div>Para 90% dos web apps, session com Redis é mais simples, mais seguro e suficiente. JWT só compensa quando você realmente precisa de stateless cross-service.</div></div>`}} />
    </article>
  );
}

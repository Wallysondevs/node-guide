import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · intermediario · 11 min"}),e.jsx("h1",{children:"Sessions e cookies"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Sessions são estado server-side identificado por um cookie no cliente. Útil para auth tradicional (server-rendered) e fluxos OAuth. Em JSON APIs puras, JWT costuma vencer; em SSR ou aplicações com SameSite, sessions ainda são a melhor escolha.</p>

<h2>Conceito</h2>
<p>O cookie carrega apenas um ID opaco assinado. O conteúdo real (userId, carrinho, flags) fica num store: memória (só dev), Redis (recomendado), Postgres, MongoDB.</p>

<h2>Setup com Redis</h2>
<pre><code class="language-bash">npm i express-session connect-redis ioredis</code></pre>
<pre><code class="language-js">import express from 'express';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

const app = express();
app.set('trust proxy', 1);                   // atrás de load balancer

const redis = new Redis(process.env.REDIS_URL);

app.use(session({
  store: new RedisStore({ client: redis, prefix: 'sess:' }),
  secret: process.env.SESSION_SECRET,        // segredo forte, rotacionável
  name: 'sid',                                // não vaze "connect.sid"
  resave: false,
  saveUninitialized: false,                  // GDPR: não cria sessão antes de login
  rolling: true,                              // renova maxAge a cada request
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,         // 7 dias
    domain: '.exemplo.com',                   // compartilha com subdomínios
  },
}));</code></pre>

<h2>Login e logout</h2>
<pre><code class="language-js">app.post('/login', ah(async (req, res) =&gt; {
  const u = await users.authenticate(req.body.email, req.body.password);
  if (!u) return res.sendStatus(401);

  // regenera ID para evitar session fixation
  req.session.regenerate((err) =&gt; {
    if (err) return res.sendStatus(500);
    req.session.userId = u.id;
    req.session.role = u.role;
    res.json({ ok: true });
  });
}));

app.post('/logout', (req, res) =&gt; {
  req.session.destroy(() =&gt; {
    res.clearCookie('sid');
    res.json({ ok: true });
  });
});

// middleware de auth
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.sendStatus(401);
  next();
}

app.get('/me', requireAuth, ah(async (req, res) =&gt; {
  const u = await users.find(req.session.userId);
  res.json(u);
}));</code></pre>

<h2>Cookies sem session</h2>
<pre><code class="language-js">import cookieParser from 'cookie-parser';
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/set', (req, res) =&gt; {
  res.cookie('lang', 'pt-BR', {
    httpOnly: true, secure: true, sameSite: 'lax', maxAge: 86400_000, signed: true,
  });
  res.send('ok');
});

app.get('/get', (req, res) =&gt; {
  res.json({ lang: req.signedCookies.lang });
});</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Apps server-rendered (Express + EJS/Pug, Next.js Pages)</li>
<li>Fluxos OAuth (state intermediário entre redirects)</li>
<li>Carrinho de compras anônimo</li>
<li>CSRF tokens emparelhados a sessão</li>
<li>Onde JWT é overkill (1 servidor, 1 origem)</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">SameSite e CSRF</div><div><code>SameSite=lax</code> bloqueia a maioria dos CSRF mas não tudo. Para forms cross-site, ainda combine com tokens CSRF (<code>csurf</code>, <code>csrf-csrf</code>).</div></div>

<h2>Boas práticas</h2>
<ul>
<li>Sempre <code>secure: true</code> em produção; nunca envie cookie de auth por HTTP</li>
<li>Rotacione <code>secret</code> via array: <code>secret: [novo, antigo]</code> aceita ambos</li>
<li>Chame <code>req.session.regenerate</code> no login para evitar fixation</li>
<li>Limite tamanho da sessão — não jogue carrinho enorme dentro</li>
<li>TTL no Redis igual ao <code>maxAge</code> do cookie para limpeza automática</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Alternativa moderna</div><div>Em apps SPA + API, considere cookies httpOnly com tokens curtos + refresh, ou bibliotecas como <code>iron-session</code> (cookie criptografado stateless).</div></div>`}})]})}export{a as default};

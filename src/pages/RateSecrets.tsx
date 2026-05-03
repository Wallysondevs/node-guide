export default function RateSecrets() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · intermediario · 8 min</div>
      <h1>Rate limit avançado e secrets</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Rate limiting protege sua API contra abuso, brute-force e custo descontrolado. Em produção, o limit precisa ser <strong>distribuído</strong> (vários processos compartilhando estado) e os <strong>segredos</strong> nunca devem viver no repositório nem em variáveis chumbadas.</p>

<h2>Conceito</h2>
<p>Os algoritmos clássicos:</p>
<ul>
<li><strong>Fixed window</strong> — conta em janelas fixas (ex.: 100 req/min). Simples, mas tem efeito de "borda" no virar do minuto.</li>
<li><strong>Sliding window</strong> — janela deslizante. Mais preciso e justo, custo levemente maior.</li>
<li><strong>Token bucket</strong> — tokens regeneram a uma taxa; pico controlado pelo tamanho do balde. Ótimo para rajadas.</li>
<li><strong>Leaky bucket</strong> — fila de saída a taxa fixa. Suaviza tráfego.</li>
</ul>

<h2>Exemplo prático: rate-limit distribuído com Redis</h2>
<pre><code class="language-bash">npm i express express-rate-limit rate-limit-redis ioredis</code></pre>
<pre><code class="language-js">import express from 'express';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
const app = express();

const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) =&gt; req.user?.id ?? req.ip,
  store: new RedisStore({
    sendCommand: (...args) =&gt; redis.call(...args),
  }),
});

app.use('/api', apiLimiter);</code></pre>

<h3>Penalidade progressiva no /login</h3>
<pre><code class="language-js">const loginLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 5,
  skipSuccessfulRequests: true,
  message: { error: 'Muitas tentativas. Tente em 15 minutos.' },
});
app.post('/login', loginLimiter, handler);</code></pre>

<div class="callout callout-info"><div class="callout-title">Identifique o cliente certo</div><div>Atrás de proxy/CDN, configure <code>app.set('trust proxy', 1)</code> para que <code>req.ip</code> reflita o IP real do <code>X-Forwarded-For</code>. Sem isso, todos os usuários compartilham o IP do load balancer.</div></div>

<h2>Secrets: como tratar</h2>
<p>Segredo é qualquer string que dá acesso a algo: <code>JWT_SECRET</code>, senha de banco, API key de terceiro, chave de assinatura de webhook. Regras:</p>
<ul>
<li>Nunca commit no git. Use <code>.env</code> local fora do versionamento e <code>.env.example</code> com chaves vazias.</li>
<li>Em produção use um cofre: AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, Doppler, Infisical ou variáveis injetadas pela plataforma (Fly, Render, Railway).</li>
<li>Rotacione periodicamente. Bibliotecas de JWT aceitam múltiplas chaves de verificação durante a transição.</li>
<li>Bloqueie acesso por IAM: só o serviço que precisa lê o segredo.</li>
</ul>

<h3>Lendo do AWS Secrets Manager</h3>
<pre><code class="language-js">import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const sm = new SecretsManagerClient({});
const out = await sm.send(new GetSecretValueCommand({ SecretId: 'prod/api' }));
const secrets = JSON.parse(out.SecretString);
process.env.JWT_SECRET = secrets.jwtSecret;
process.env.DATABASE_URL = secrets.databaseUrl;</code></pre>

<h3>Rotação de JWT com duas chaves</h3>
<pre><code class="language-js">import jwt from 'jsonwebtoken';

const KEYS = {
  current: { kid: '2025-01', secret: process.env.JWT_SECRET_CURRENT },
  previous: { kid: '2024-12', secret: process.env.JWT_SECRET_PREVIOUS },
};

export function sign(payload) {
  return jwt.sign(payload, KEYS.current.secret, {
    algorithm: 'HS256',
    keyid: KEYS.current.kid,
    expiresIn: '15m',
  });
}

export function verify(token) {
  const decoded = jwt.decode(token, { complete: true });
  const key = decoded?.header?.kid === KEYS.previous.kid ? KEYS.previous : KEYS.current;
  return jwt.verify(token, key.secret);
}</code></pre>

<h2>Boas práticas</h2>
<ul>
<li>Combine rate limit por IP e por usuário autenticado — quem tem conta paga preço diferente.</li>
<li>Retorne <code>429</code> com <code>Retry-After</code> e headers <code>RateLimit-*</code> padronizados.</li>
<li>Para webhooks de terceiros, valide assinatura HMAC com <code>crypto.timingSafeEqual</code> em vez de <code>===</code>.</li>
<li>Logue tentativas bloqueadas com IP, rota e user-agent — útil para detectar ataques.</li>
<li>Aplique limit também em endpoints caros (busca, geração de PDF, IA) com janelas menores.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não logue o segredo</div><div>Configure o logger para redacta campos sensíveis. <code>pino</code> tem <code>redact: ['req.headers.authorization', '*.password']</code>. Um stack trace vazado em Sentry com a env inteira é incidente de segurança.</div></div>`}} />
    </article>
  );
}

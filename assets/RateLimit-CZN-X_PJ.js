import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function o(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"API design · intermediario · 8 min"}),e.jsx("h1",{children:"Rate limiting"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>Rate limiting</strong> protege APIs contra abuso, força bruta, scraping e custos descontrolados, limitando quantas requisições um cliente pode fazer em uma janela de tempo. É fundamental em qualquer endpoint público.</p>

<h2>Conceito</h2>
<p>Algoritmos comuns:</p>
<ul>
  <li><strong>Fixed window</strong>: contador por minuto/hora; simples mas tem "borda" (rajadas no virar da janela).</li>
  <li><strong>Sliding window</strong>: janela deslizante; mais preciso e fluido.</li>
  <li><strong>Token bucket</strong>: tokens repostos a uma taxa; permite rajadas curtas.</li>
  <li><strong>Leaky bucket</strong>: fila de tamanho fixo drenada a taxa constante.</li>
</ul>

<h2>Express + memória (single-process)</h2>
<pre><code class="language-bash">npm i express-rate-limit</code></pre>
<pre><code class="language-js">import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',  // RateLimit-* headers
  legacyHeaders: false,
  message: { error: 'too_many_requests' },
  keyGenerator: (req) =&gt; req.ip
});

app.use('/api', apiLimiter);

// limites mais agressivos por endpoint
const loginLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  skipSuccessfulRequests: true   // só conta tentativas falhadas
});
app.post('/login', loginLimiter, loginHandler);</code></pre>

<h2>Multi-instância com Redis</h2>
<pre><code class="language-bash">npm i rate-limit-redis ioredis</code></pre>
<pre><code class="language-js">import { RedisStore } from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) =&gt; redis.call(...args)
  }),
  windowMs: 60_000,
  max: 1000,
  keyGenerator: (req) =&gt; req.user?.id || req.ip
});</code></pre>

<h2>Token bucket caseiro</h2>
<pre><code class="language-js">class TokenBucket {
  constructor(capacity, refillPerSec) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refill = refillPerSec;
    this.last = Date.now();
  }
  take(n = 1) {
    const now = Date.now();
    this.tokens = Math.min(this.capacity, this.tokens + (now - this.last) / 1000 * this.refill);
    this.last = now;
    if (this.tokens &gt;= n) { this.tokens -= n; return true; }
    return false;
  }
}

const buckets = new Map();
function limit(req, res, next) {
  const key = req.ip;
  if (!buckets.has(key)) buckets.set(key, new TokenBucket(20, 1)); // 20 burst, 1/s
  if (buckets.get(key).take()) return next();
  res.set('Retry-After', '1').status(429).json({ error: 'rate_limited' });
}</code></pre>

<h2>Headers padrão</h2>
<pre><code class="language-bash">RateLimit-Limit: 100
RateLimit-Remaining: 73
RateLimit-Reset: 42        # segundos até reset
Retry-After: 42            # quando 429</code></pre>

<h2>Quando usar</h2>
<ul>
  <li>Endpoints de autenticação (login, signup, password reset) para frear força bruta.</li>
  <li>APIs públicas: limites por API key/usuário.</li>
  <li>Endpoints caros (upload, busca complexa, IA) para controlar custo.</li>
  <li>Webhooks de saída para não derrubar o destinatário.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
  <li><strong>Identificação por IP</strong> falha atrás de proxies/CDN/NAT. Configure <code>app.set('trust proxy', 1)</code> e use o IP real.</li>
  <li>Memória local não funciona em multi-processo (cluster, k8s). Sempre Redis em produção.</li>
  <li>Limite muito baixo bloqueia usuários legítimos; muito alto não protege. Comece generoso e aperte com base em métricas.</li>
  <li>Devolva sempre <code>Retry-After</code> para clientes saberem quando voltar.</li>
  <li>Diferencie limites por <strong>usuário autenticado</strong> vs <strong>anônimo</strong> — anônimos devem ser muito mais restritos.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não confie só no app</div><div>Rate limiting na borda (Cloudflare, nginx, API Gateway) é a primeira linha; no app é a segunda. DDoS volumétrico só morre antes de chegar no Node.</div></div>

<div class="callout callout-tip"><div class="callout-title">Throttle inteligente</div><div>Para login, combine <code>express-slow-down</code> (atrasa progressivamente) com <code>express-rate-limit</code> (bloqueia depois). Frustra ataques sem irritar usuários.</div></div>`}})]})}export{o as default};

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · intermediario · 9 min"}),e.jsx("h1",{children:"CORS, helmet, compression"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Toda API HTTP em produção precisa de três camadas de middleware antes de qualquer rota: <strong>CORS</strong> para permitir browsers, <strong>helmet</strong> para hardening de headers e <strong>compression</strong> para reduzir payloads. São linhas curtas com impacto enorme em segurança e performance.</p>

<h2>Instalação</h2>
<pre><code class="language-bash">npm i cors helmet compression
npm i -D @types/cors @types/compression</code></pre>

<h2>Conceito: ordem importa</h2>
<p>Helmet vem primeiro (define headers em <em>todas</em> as respostas, incluindo erros). CORS depois, antes das rotas. Compression preferencialmente antes das rotas estáticas.</p>
<pre><code class="language-js">import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

const app = express();
app.use(helmet());
app.use(cors({ origin: ['https://meusite.com'], credentials: true }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));</code></pre>

<h2>CORS detalhado</h2>
<pre><code class="language-js">// liberação fina por origem
const allowed = new Set(['https://app.exemplo.com', 'https://admin.exemplo.com']);

app.use(cors({
  origin: (origin, cb) =&gt; {
    if (!origin || allowed.has(origin)) return cb(null, true);
    cb(new Error('CORS bloqueado: ' + origin));
  },
  credentials: true,                      // permite cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,                          // cache do preflight (24h)
}));</code></pre>

<h2>Helmet detalhado</h2>
<p>Helmet aplica ~15 headers por padrão. Customize CSP por aplicação:</p>
<pre><code class="language-js">app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.exemplo.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.exemplo.com'],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));</code></pre>

<h2>Compression com filtro</h2>
<pre><code class="language-js">app.use(compression({
  threshold: 1024,                        // só comprime &gt; 1KB
  filter: (req, res) =&gt; {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
}));</code></pre>

<h2>Quando usar cada um</h2>
<ul>
<li><strong>cors</strong> — sempre que o frontend roda em domínio diferente da API</li>
<li><strong>helmet</strong> — sempre, em qualquer API pública (ou interna)</li>
<li><strong>compression</strong> — JSON grandes, HTML, CSS; pule pra binários (imagens, vídeos já comprimidos)</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não use <code>origin: '*'</code> com credentials</div><div>O navegador rejeita silenciosamente. Sempre liste origens explícitas quando enviar cookies ou <code>Authorization</code>.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li>Compression depois de <code>res.write</code> não funciona — precisa estar antes da rota</li>
<li>Em proxy reverso (nginx, Cloudflare), desabilite compression no Express se o proxy já comprime</li>
<li>CSP muito restritiva quebra Stripe, Google Analytics, etc — teste em staging</li>
<li>Helmet sozinho não substitui sanitização de input (XSS via DOM ainda passa)</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Rate limiting</div><div>Combine com <code>express-rate-limit</code> para bloquear abuso. Use <code>trust proxy</code> se atrás de load balancer.</div></div>`}})]})}export{a as default};

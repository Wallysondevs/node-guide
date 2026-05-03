import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Segurança · intermediario · 8 min"}),e.jsx("h1",{children:"CORS detalhado"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>CORS</strong> (Cross-Origin Resource Sharing) é o mecanismo pelo qual o navegador autoriza o front-end servido em uma origem (esquema + host + porta) a falar com uma API hospedada em outra origem. Sem os headers certos, o navegador bloqueia a resposta — o servidor recebe o request, processa, mas o JS do cliente nunca lê o body.</p>

<h2>Conceito</h2>
<p>O navegador classifica requests em <strong>simples</strong> (GET/HEAD/POST com content-types limitados, sem headers customizados) e <strong>preflighted</strong> (OPTIONS automático antes do request real, exigido para PUT/DELETE/PATCH, JSON, headers como <code>Authorization</code>).</p>
<p>O servidor responde com <code>Access-Control-Allow-Origin</code>, <code>-Methods</code>, <code>-Headers</code>, <code>-Credentials</code> e, no preflight, <code>-Max-Age</code> para cachear a permissão.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import express from 'express';
import cors from 'cors';

const app = express();

// 1) Liberal — só em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// 2) Restrito — produção
const allowedOrigins = [
  'https://app.meusite.com',
  'https://admin.meusite.com',
];

app.use(cors({
  origin(origin, cb) {
    // requests server-to-server vêm sem Origin
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Origin não permitida: ' + origin));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  exposedHeaders: ['X-Total-Count', 'X-Page'],
  credentials: true,
  maxAge: 86400, // 24h de cache do preflight
}));

app.get('/api/me', (req, res) =&gt; {
  res.json({ user: req.user ?? null });
});

app.listen(3000);</code></pre>

<p>Para uma rota específica (ex.: webhook público), você pode aplicar CORS local:</p>
<pre><code class="language-js">app.post('/webhooks/stripe', cors({ origin: '*', methods: ['POST'] }), handler);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>SPA em <code>app.meusite.com</code> consumindo API em <code>api.meusite.com</code>.</li>
<li>Permitir domínios de preview (Vercel, Netlify) via regex.</li>
<li>API pública aberta com <code>origin: '*'</code> (sem credenciais).</li>
<li>Liberar headers customizados de tracing (<code>X-Trace-Id</code>).</li>
<li>Expor headers de paginação para o front-end (<code>exposedHeaders</code>).</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">credentials + wildcard não combinam</div><div>Se você usa <code>credentials: true</code>, <strong>não</strong> pode responder <code>Access-Control-Allow-Origin: *</code>. O navegador rejeita. Sempre ecoe a Origin recebida quando válida.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Preflight quebra POST com JSON</strong>: lembre de aceitar OPTIONS na rota (o middleware <code>cors</code> já faz isso globalmente).</li>
<li><strong>Cookies cross-site</strong>: além de <code>credentials: true</code>, o cookie precisa de <code>SameSite=None; Secure</code>.</li>
<li><strong>Erro &quot;CORS&quot; que não é CORS</strong>: 500/timeouts no servidor aparecem como erro de CORS no DevTools porque a resposta não chega com os headers. Cheque os logs do servidor.</li>
<li><strong>Origin: null</strong> aparece em <code>file://</code> e em alguns iframes — não libere por engano.</li>
<li><strong>Cache do navegador</strong>: ajuste <code>maxAge</code> com cuidado — durante mudanças de configuração, teste em janela anônima.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Debug rápido</div><div>Use <code>curl -i -X OPTIONS https://api/... -H 'Origin: https://app...' -H 'Access-Control-Request-Method: POST'</code> para inspecionar a resposta de preflight sem o navegador.</div></div>`}})]})}export{i as default};

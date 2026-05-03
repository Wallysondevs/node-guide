import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Deploy · intermediario · 8 min"}),e.jsx("h1",{children:"Logs estruturados (Pino)"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Em produção, logs precisam ser <strong>estruturados</strong> (JSON), com <strong>níveis</strong>, <strong>correlação</strong> por request e baixo overhead. <code>pino</code> é o logger mais rápido do ecossistema Node — escreve JSON em stdout sem serialização sync.</p>

<h2>Setup</h2>
<pre><code class="language-bash">npm i pino
npm i -D pino-pretty</code></pre>
<pre><code class="language-js">import pino from 'pino';

export const log = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  // dev: legível com cores; prod: JSON puro (não use transport)
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
    : undefined,
  redact: ['req.headers.authorization', 'password', 'token'],
});

log.info({ userId: 42 }, 'login realizado');
log.warn('quase lá');
log.error({ err }, 'falhou');</code></pre>

<h2>Child loggers para correlação por request</h2>
<pre><code class="language-js">import { randomUUID } from 'node:crypto';

app.use((req, res, next) =&gt; {
  req.id = req.headers['x-request-id'] ?? randomUUID();
  req.log = log.child({ reqId: req.id, method: req.method, url: req.url });
  res.setHeader('x-request-id', req.id);
  next();
});

app.get('/users/:id', (req, res) =&gt; {
  req.log.info({ userId: req.params.id }, 'fetching user');
  // ...
});</code></pre>

<h2>Integração com Express/Fastify</h2>
<pre><code class="language-js">// Express
import pinoHttp from 'pino-http';
app.use(pinoHttp({ logger: log }));

// Fastify (built-in)
import Fastify from 'fastify';
const app = Fastify({ logger: log });</code></pre>

<h2>Níveis e quando usar</h2>
<ul>
<li><strong>fatal</strong>: app vai morrer.</li>
<li><strong>error</strong>: operação falhou, requer atenção.</li>
<li><strong>warn</strong>: degradação, retry, fallback ativado.</li>
<li><strong>info</strong>: eventos de negócio (login, pedido criado).</li>
<li><strong>debug</strong>: detalhe de fluxo, off em prod.</li>
<li><strong>trace</strong>: muito verboso, dev only.</li>
</ul>

<h2>Anti-padrões a evitar</h2>
<ul>
<li><code>console.log</code> em prod: sync, sem nível, sem JSON.</li>
<li>Logar objetos grandes inteiros (request body de upload).</li>
<li>Logar PII ou senhas (use <code>redact</code>).</li>
<li>Strings interpoladas em vez de objetos: <code>log.info('user ' + id)</code> destrói parseabilidade.</li>
<li>Transports custom em prod (lentos): deixe pino escrever stdout e use sidecar (vector, fluentbit).</li>
</ul>

<h2>Casos de uso</h2>
<ul>
<li>Centralizar logs no Loki, Datadog, CloudWatch.</li>
<li>Correlacionar requests entre serviços (passe <code>x-request-id</code> adiante).</li>
<li>Auditoria de eventos críticos (login, mudança de senha).</li>
<li>Profiling: <code>log.info({ duration: t1 - t0 }, 'query lenta')</code>.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Nunca console.log em prod</div><div>Sync na stdout serializa o event loop em alta carga. Pino escreve via worker.</div></div>

<div class="callout callout-tip"><div class="callout-title">Sampling de logs verbosos</div><div>Para endpoints de altíssima frequência, logue 1 a cada N requests com <code>Math.random() &lt; 0.01</code>. Reduz custo sem perder visibilidade.</div></div>`}})]})}export{t as default};

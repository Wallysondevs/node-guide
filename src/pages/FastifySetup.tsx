export default function FastifySetup() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 7 min</div>
      <h1>Fastify: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Subir um servidor Fastify leva poucos segundos, mas montar um esqueleto sólido — com logger, env tipado, graceful shutdown e organização de plugins — é o que diferencia um POC de algo que vai pra produção sem dor.</p>

<h2>Conceito</h2>
<p>Fastify é importado como factory: <code>Fastify(opts)</code> devolve uma instância onde você registra plugins, hooks e rotas. Toda inicialização é assíncrona e <code>app.ready()</code> espera tudo terminar antes de aceitar conexões.</p>

<h2>Setup mínimo</h2>
<pre><code class="language-bash">npm i fastify
npm i -D typescript tsx @types/node</code></pre>
<pre><code class="language-js">// src/server.js
import Fastify from 'fastify';

const app = Fastify({
  logger: { level: process.env.LOG_LEVEL ?? 'info' },
});

app.get('/health', async () =&gt; ({ status: 'ok' }));

app.get('/users/:id', async (req, reply) =&gt; {
  const user = await db.user(req.params.id);
  if (!user) return reply.code(404).send({ error: 'not found' });
  return user;
});

const port = Number(process.env.PORT ?? 3000);
await app.listen({ port, host: '0.0.0.0' });</code></pre>

<h2>Esqueleto de produção</h2>
<pre><code class="language-bash">src/
  app.js          # build da instância (sem listen)
  server.js       # entrypoint: faz listen + signals
  plugins/
    db.js
    auth.js
  routes/
    users.js
    health.js</code></pre>

<pre><code class="language-js">// src/app.js
import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import path from 'node:path';

export async function build(opts = {}) {
  const app = Fastify({ logger: true, ...opts });
  await app.register(autoload, { dir: path.join(import.meta.dirname, 'plugins') });
  await app.register(autoload, { dir: path.join(import.meta.dirname, 'routes') });
  return app;
}</code></pre>

<pre><code class="language-js">// src/server.js
import { build } from './app.js';

const app = await build();
const port = Number(process.env.PORT ?? 3000);

await app.listen({ port, host: '0.0.0.0' });

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () =&gt; {
    app.log.info({ sig }, 'closing');
    await app.close();
    process.exit(0);
  });
}</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>APIs REST de alta performance.</li>
<li>Microsserviços com contratos por JSON Schema.</li>
<li>BFFs e gateways internos.</li>
<li>Webhooks com validação rigorosa.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Separe <code>app.js</code> (factory testável) de <code>server.js</code> (listen).</li>
<li>Sempre configure <code>host: '0.0.0.0'</code> em containers.</li>
<li>Use <code>tsx</code> em dev e <code>node</code> + build em produção.</li>
<li>Trate sinais para graceful shutdown — falha disso causa requests cortadas em deploy.</li>
<li>Logue em JSON (pino) e centralize no observability stack (Datadog, Loki).</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Logger amigável em dev</div><div>Use <code>pino-pretty</code> só em desenvolvimento: <code>logger: { transport: { target: 'pino-pretty' } }</code>.</div></div>

<div class="callout callout-info"><div class="callout-title">Por que separar build do listen?</div><div>Permite escrever testes que constroem a instância e usam <code>app.inject()</code> sem subir socket. Mais rápido e estável que subir HTTP de verdade.</div></div>`}} />
    </article>
  );
}

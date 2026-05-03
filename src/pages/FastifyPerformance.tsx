export default function FastifyPerformance() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 7 min</div>
      <h1>Performance e produção</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Fastify é rápido por padrão, mas há um conjunto de práticas que separam um app "ok" de um que aguenta dezenas de milhares de req/s sem ranger. Schemas, logger certo e ordem de inicialização fazem a diferença.</p>

<h2>Conceito</h2>
<p>Os pilares da performance:</p>
<ul>
<li><strong>Router radix tree</strong>: matching de rotas em O(log n) — não há nada para configurar.</li>
<li><strong>Serialização por schema</strong>: <code>fast-json-stringify</code> gera código otimizado em vez de <code>JSON.stringify</code>.</li>
<li><strong>Logger pino</strong>: streaming de JSON, ~5x mais rápido que winston.</li>
<li><strong>Async sem overhead</strong>: hooks e handlers async não criam closures extras.</li>
</ul>

<h2>Configuração de produção</h2>
<pre><code class="language-js">import Fastify from 'fastify';

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    redact: ['req.headers.authorization'],
  },
  trustProxy: true,
  disableRequestLogging: false,
  bodyLimit: 1024 * 1024,
  ajv: { customOptions: { removeAdditional: 'all', useDefaults: true } },
});

app.get('/users/:id', {
  schema: {
    params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    response: {
      200: {
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' } },
      },
    },
  },
}, async (req) =&gt; getUser(req.params.id));

await app.listen({ port: 3000, host: '0.0.0.0' });</code></pre>

<h2>Boas práticas</h2>
<ul>
<li>Sempre declare <code>response</code> schemas — ganho de 1.5x a 2x na serialização.</li>
<li>Use <code>removeAdditional: 'all'</code> para descartar campos extras silenciosamente.</li>
<li>Carregue plugins com <code>@fastify/autoload</code> para evitar boilerplate.</li>
<li>Habilite <code>trustProxy</code> atrás de load balancer (Nginx, ALB) para IP correto.</li>
<li>Configure <code>keepAliveTimeout</code> &gt; do que o do upstream.</li>
<li>Em containers, use <code>--max-old-space-size</code> alinhado com o limite de memória.</li>
</ul>

<h3>Graceful shutdown</h3>
<pre><code class="language-js">for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () =&gt; {
    app.log.info({ sig }, 'shutting down');
    await app.close();
    process.exit(0);
  });
}</code></pre>

<h2>Benchmark</h2>
<pre><code class="language-bash">npm i -g autocannon
autocannon -c 100 -d 30 -p 10 http://localhost:3000/users/abc

# pipelining alta + medir p99
autocannon -c 200 -d 30 --renderStatusCodes http://localhost:3000/</code></pre>

<h2>Pegadinhas</h2>
<ul>
<li>Logger em <code>level: 'debug'</code> em produção mata performance — fica em <code>info</code> ou <code>warn</code>.</li>
<li>Não use <code>JSON.stringify</code> manual; deixe o Fastify serializar via schema.</li>
<li>Hooks síncronos pesados bloqueiam o event loop — sempre <em>async</em> + I/O não-bloqueante.</li>
<li>Evite <code>app.ready()</code> só no primeiro request: chame antes do <code>listen</code> para falhar cedo.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Cluster vs PM2</div><div>O Node não é multi-thread por default. Use <code>cluster</code> ou PM2 com <code>-i max</code> para escalar nos núcleos disponíveis.</div></div>

<div class="callout callout-warn"><div class="callout-title">Memória vs throughput</div><div>Schemas geram código JIT — apps com milhares de rotas distintas podem aumentar uso de memória. Monitore.</div></div>`}} />
    </article>
  );
}

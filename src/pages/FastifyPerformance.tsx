export default function FastifyPerformance() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 5 min</div>
      <h1>Performance e produção</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><code>logger: { level: "info" }</code> — Pino é integrado, super rápido</li><li><code>schema.response</code> — serialização ~2x mais rápida</li><li><code>app.ready()</code> — espera plugins antes de servir</li><li>Use <code>fastify-cli</code> ou <code>@fastify/autoload</code> para descobrir plugins/rotas</li></ul><pre><code class="language-bash"># benchmark rápido
npm i -g autocannon
autocannon -c 100 -d 10 http://localhost:3000</code></pre>`}} />
    </article>
  );
}

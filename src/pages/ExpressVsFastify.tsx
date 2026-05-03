export default function ExpressVsFastify() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 5 min</div>
      <h1>Express vs Fastify</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>Express</strong>: ecossistema gigante, simples, ~30k req/s</li><li><strong>Fastify</strong>: schemas embutidos, ~70k req/s, plugin system robusto</li><li><strong>Hono</strong>: edge-first, web standards, super rápido</li><li><strong>NestJS</strong>: opinativo, DI, decorators — sobre Express ou Fastify</li></ul><p>Para APIs novas em 2024+: Fastify ou Hono. Express ainda é solidíssimo se você prioriza ecossistema.</p>`}} />
    </article>
  );
}

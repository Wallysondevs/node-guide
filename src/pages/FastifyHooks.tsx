export default function FastifyHooks() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 5 min</div>
      <h1>Hooks</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><code>onRequest</code> — antes de tudo</li><li><code>preHandler</code> — depois da validação, antes do handler (auth aqui)</li><li><code>onSend</code> — antes de enviar resposta</li><li><code>onResponse</code> — depois de enviar</li><li><code>onError</code> — quando ocorre erro</li></ul><pre><code class="language-js">app.addHook('preHandler', async (req, reply) =&gt; {
  if (req.routeOptions.config.auth) {
    const user = await verifyToken(req.headers.authorization);
    if (!user) return reply.code(401).send();
    req.user = user;
  }
});</code></pre>`}} />
    </article>
  );
}

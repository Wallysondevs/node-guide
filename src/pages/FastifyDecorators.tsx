export default function FastifyDecorators() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 4 min</div>
      <h1>Decorators</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">app.decorate('user', null);
app.decorateRequest('user', null);
app.decorateReply('json', function(data) { this.send(data); });

// agora em qualquer handler:
async (req, reply) =&gt; {
  req.user = await load(req);
  reply.json({ ok: true });
}</code></pre>`}} />
    </article>
  );
}

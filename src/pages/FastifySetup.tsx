export default function FastifySetup() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 5 min</div>
      <h1>Fastify: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i fastify</code></pre><pre><code class="language-js">import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/', async () =&gt; ({ ok: true }));

app.get('/users/:id', async (req) =&gt; {
  return await db.user(req.params.id);
});

await app.listen({ port: 3000, host: '0.0.0.0' });</code></pre>`}} />
    </article>
  );
}

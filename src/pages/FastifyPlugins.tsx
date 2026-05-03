export default function FastifyPlugins() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 6 min</div>
      <h1>Plugins</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Tudo em Fastify é plugin. Encapsulamento por padrão — o que você registra dentro de um plugin não vaza pra fora.</p><pre><code class="language-js">// plugins/db.js
import fp from 'fastify-plugin';
export default fp(async (app) =&gt; {
  const db = await connect();
  app.decorate('db', db);
  app.addHook('onClose', () =&gt; db.end());
});

// app.js
await app.register(import('./plugins/db.js'));
app.get('/users', async () =&gt; app.db.query('select * from users'));</code></pre>`}} />
    </article>
  );
}

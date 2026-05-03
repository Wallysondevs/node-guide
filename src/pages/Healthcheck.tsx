export default function Healthcheck() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Deploy · intermediario · 5 min</div>
      <h1>Healthchecks</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">app.get('/healthz', (req, res) =&gt; res.json({ ok: true }));   // liveness

app.get('/readyz', async (req, res) =&gt; {                       // readiness
  try {
    await db.query('select 1');
    await redis.ping();
    res.json({ ok: true });
  } catch (e) {
    res.status(503).json({ ok: false, error: e.message });
  }
});</code></pre><p>Liveness diz "estou vivo" (orquestrador reinicia se falhar). Readiness diz "estou pronto pra tráfego" (load balancer remove se falhar).</p>`}} />
    </article>
  );
}

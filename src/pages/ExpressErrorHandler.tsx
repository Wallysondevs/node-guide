export default function ExpressErrorHandler() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 6 min</div>
      <h1>Error handler</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Middleware com <strong>4 argumentos</strong> é tratado como error handler. Deve ir por último.</p><pre><code class="language-js">class HttpError extends Error {
  constructor(status, msg) { super(msg); this.status = status; }
}

app.get('/users/:id', ah(async (req, res) =&gt; {
  const u = await db.user(req.params.id);
  if (!u) throw new HttpError(404, 'não encontrado');
  res.json(u);
}));

app.use((err, req, res, _next) =&gt; {
  const status = err.status ?? 500;
  if (status &gt;= 500) console.error(err);
  res.status(status).json({ error: err.message });
});</code></pre>`}} />
    </article>
  );
}

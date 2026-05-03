export default function ExpressAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 5 min</div>
      <h1>Async handlers</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Express 4 não captura rejections em handlers async. Erros são <strong>perdidos</strong>. Express 5 (RC) corrige isso.</p><pre><code class="language-js">// errado — erro silencioso
app.get('/x', async (req, res) =&gt; {
  const data = await db.query();
  res.json(data);
});

// solução clássica: wrapper
const ah = fn =&gt; (req, res, next) =&gt; Promise.resolve(fn(req, res, next)).catch(next);
app.get('/x', ah(async (req, res) =&gt; {
  const data = await db.query();
  res.json(data);
}));

// ou use Express 5 / express-async-errors</code></pre>`}} />
    </article>
  );
}

export default function ExpressMiddleware() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · iniciante · 7 min</div>
      <h1>Middleware</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Função com assinatura <code>(req, res, next)</code>. Roda em ordem. Chame <code>next()</code> pra continuar ou <code>next(err)</code> pra ir ao error handler.</p><pre><code class="language-js">// global
app.use((req, _res, next) =&gt; {
  console.log(req.method, req.url);
  next();
});

// específico de rota
function auth(req, res, next) {
  const t = req.headers.authorization;
  if (!t) return res.sendStatus(401);
  req.user = decode(t);
  next();
}

app.get('/me', auth, (req, res) =&gt; res.json(req.user));

// múltiplos
app.post('/posts', auth, validate(schema), createPost);</code></pre>`}} />
    </article>
  );
}

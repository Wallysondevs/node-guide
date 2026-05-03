export default function ExpressRouting() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · iniciante · 6 min</div>
      <h1>Roteamento e parâmetros</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">app.get('/users', listUsers);
app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.patch('/users/:id', patch);
app.delete('/users/:id', remove);

// params, query, body
app.get('/users/:id', (req, res) =&gt; {
  req.params.id          // string
  req.query.page         // ?page=2
  req.body               // se express.json() montado
});

// regex e múltiplos
app.get('/file/:name.:ext', handler);
app.get(['/legacy', '/old'], handler);</code></pre>`}} />
    </article>
  );
}

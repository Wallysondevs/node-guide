export default function Csrf() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · intermediario · 5 min</div>
      <h1>CSRF</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Cross-Site Request Forgery: site malicioso faz request com cookies do usuário no seu domínio.</p><ul><li><strong>SameSite=Lax</strong> em cookies já mitiga 90%</li><li><strong>Bearer token</strong> em header (não cookie) é imune por padrão</li><li>Pra forms tradicionais com cookie: token CSRF por sessão</li></ul><pre><code class="language-js">// csurf
import csrf from 'csurf';
app.use(csrf({ cookie: { httpOnly: true, sameSite: 'lax' } }));

app.get('/form', (req, res) =&gt; {
  res.render('form', { csrfToken: req.csrfToken() });
});</code></pre>`}} />
    </article>
  );
}

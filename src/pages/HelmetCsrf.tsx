export default function HelmetCsrf() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 5 min</div>
      <h1>Helmet, CSRF, secure cookies</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import helmet from 'helmet';
import csrf from 'csurf';

app.use(helmet({
  contentSecurityPolicy: {
    directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'"] }
  }
}));

// CSRF para forms tradicionais (não necessário em API REST com Bearer)
app.use(csrf({ cookie: true }));

// cookies seguros
res.cookie('sid', token, {
  httpOnly: true,        // JS não acessa
  secure: true,          // só HTTPS
  sameSite: 'lax',       // protege CSRF parcialmente
  maxAge: 86400_000,
});</code></pre>`}} />
    </article>
  );
}

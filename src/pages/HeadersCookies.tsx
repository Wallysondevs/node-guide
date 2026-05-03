export default function HeadersCookies() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · intermediario · 5 min</div>
      <h1>Headers e cookies</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// no servidor
res.setHeader('Cache-Control', 'public, max-age=3600');
res.setHeader('Set-Cookie', [
  'sid=abc123; HttpOnly; Secure; SameSite=Lax; Path=/',
  'theme=dark; Path=/'
]);

req.headers['user-agent']
req.headers.cookie       // 'sid=abc123; theme=dark'

// parsing simples
function parseCookies(str = '') {
  return Object.fromEntries(
    str.split(';').map(p =&gt; p.trim().split('=').map(decodeURIComponent))
  );
}</code></pre>`}} />
    </article>
  );
}

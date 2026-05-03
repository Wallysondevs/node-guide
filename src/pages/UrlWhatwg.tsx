export default function UrlWhatwg() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · iniciante · 5 min</div>
      <h1>URL e querystring</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>A API <strong>WHATWG URL</strong> (a mesma do browser) substitui o legacy <code>url.parse</code>.</p><pre><code class="language-js">const u = new URL('https://api.com/users?id=42&amp;tag=node#top');
u.protocol     // 'https:'
u.host         // 'api.com'
u.pathname     // '/users'
u.searchParams.get('id')   // '42'
u.searchParams.append('sort', 'name');
u.toString();

// resolver relativo
new URL('/v2/list', 'https://api.com/x').toString();
// 'https://api.com/v2/list'</code></pre>`}} />
    </article>
  );
}

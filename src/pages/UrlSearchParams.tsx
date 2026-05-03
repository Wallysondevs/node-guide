export default function UrlSearchParams() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · iniciante · 4 min</div>
      <h1>URLSearchParams</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">const params = new URLSearchParams({ q: 'node', page: 2 });
params.toString()      // 'q=node&amp;page=2'
params.append('tag', 'js');
params.getAll('tag');
params.has('q');
params.delete('page');

// parse de query
const qs = new URLSearchParams('?a=1&amp;a=2&amp;b=3');
qs.getAll('a')   // ['1', '2']</code></pre>`}} />
    </article>
  );
}

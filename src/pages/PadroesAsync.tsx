export default function PadroesAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 7 min</div>
      <h1>Padrões: pool, sequential, retry</h1>
      <div dangerouslySetInnerHTML={{__html: `<h2>Sequencial</h2><pre><code class="language-js">for (const url of urls) {
  await fetch(url);
}</code></pre><h2>Concorrente limitado (pool)</h2><pre><code class="language-js">import pLimit from 'p-limit';
const limit = pLimit(5);
const results = await Promise.all(
  urls.map(u =&gt; limit(() =&gt; fetch(u)))
);</code></pre><h2>Retry</h2><pre><code class="language-js">async function retry(fn, attempts = 3, delay = 200) {
  for (let i = 0; i &lt; attempts; i++) {
    try { return await fn(); }
    catch (e) {
      if (i === attempts - 1) throw e;
      await new Promise(r =&gt; setTimeout(r, delay * 2 ** i));
    }
  }
}</code></pre>`}} />
    </article>
  );
}

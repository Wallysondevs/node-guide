export default function PromiseAll() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 6 min</div>
      <h1>Promise.all/race/any/allSettled</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// all — falha se qualquer uma falhar
const [a, b, c] = await Promise.all([p1, p2, p3]);

// allSettled — espera todas, sucesso ou falha
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r =&gt; {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});

// race — primeira a resolver/rejeitar
await Promise.race([fetch(url), timeout(5000)]);

// any — primeira a RESOLVER (ignora rejects)
await Promise.any([cdn1, cdn2, cdn3]);</code></pre>`}} />
    </article>
  );
}

export default function QueueMicrotask() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 5 min</div>
      <h1>Microtasks: nextTick e queueMicrotask</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Microtasks rodam <strong>antes</strong> da próxima fase do event loop. Ordem: <code>nextTick</code> → promises.</p><pre><code class="language-js">console.log(1);
process.nextTick(() =&gt; console.log(2));
queueMicrotask(() =&gt; console.log(3));
Promise.resolve().then(() =&gt; console.log(4));
console.log(5);
// 1 → 5 → 2 → 3 → 4</code></pre><div class="callout callout-warn"><div class="callout-title">nextTick recursivo</div><div>Encadear nextTicks em loop infinito impede I/O. Use setImmediate se precisar ceder o loop.</div></div>`}} />
    </article>
  );
}

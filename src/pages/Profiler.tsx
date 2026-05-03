export default function Profiler() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · intermediario · 6 min</div>
      <h1>Profiler embutido</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash"># CPU profile
node --prof dist/index.js
# gera isolate-XXX-v8.log
node --prof-process isolate-*.log &gt; processed.txt

# heap snapshot
node --inspect dist/index.js
# Chrome → chrome://inspect → Memory → Take snapshot</code></pre><p>Chrome DevTools conecta no Node via <code>--inspect</code>. Você tem flame graph, heap, network — tudo.</p>`}} />
    </article>
  );
}

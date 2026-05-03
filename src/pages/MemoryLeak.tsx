export default function MemoryLeak() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · avancado · 7 min</div>
      <h1>Caçando memory leaks</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li>Snapshots periódicos com Chrome DevTools → comparar</li><li><code>--max-old-space-size=2048</code> aumenta heap (em MB)</li><li>Causas comuns: closures que retêm objetos, listeners não removidos, caches sem limite</li></ul><pre><code class="language-js">// monitorar
setInterval(() =&gt; {
  const m = process.memoryUsage();
  console.log({
    rss: (m.rss / 1024 / 1024).toFixed(0) + 'MB',
    heap: (m.heapUsed / 1024 / 1024).toFixed(0) + 'MB',
  });
}, 10_000);

// gerar heap snapshot programaticamente
import { writeHeapSnapshot } from 'node:v8';
process.on('SIGUSR2', () =&gt; writeHeapSnapshot());</code></pre>`}} />
    </article>
  );
}

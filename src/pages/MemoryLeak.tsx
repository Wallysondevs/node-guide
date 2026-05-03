export default function MemoryLeak() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · avancado · 9 min</div>
      <h1>Caçando memory leaks</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>Um memory leak em Node acontece quando objetos continuam <strong>alcançáveis</strong> pelo GC mesmo sem uso real. O processo cresce em RSS/heap, latência sobe (GC mais frequente) e eventualmente o container é morto por OOM.</p>

        <h2>Conceito</h2>
        <p>O V8 usa coleta geracional. Objetos retidos por <strong>raízes vivas</strong> (escopos globais, closures, listeners, timers, caches) nunca são coletados. Identificar o leak é identificar <em>quem</em> ainda referencia o objeto.</p>
        <pre><code class="language-js">// padrão clássico de leak: cache sem limite
const cache = new Map();
function get(id) {
  if (!cache.has(id)) cache.set(id, fetchFromDb(id));
  return cache.get(id);
}
// solução: usar LRU (lru-cache) ou WeakMap quando aplicável</code></pre>

        <h2>Exemplo prático</h2>
        <pre><code class="language-js">import { writeHeapSnapshot } from 'node:v8';

setInterval(() =&gt; {
  const m = process.memoryUsage();
  console.log({
    rss: (m.rss / 1024 / 1024).toFixed(0) + 'MB',
    heap: (m.heapUsed / 1024 / 1024).toFixed(0) + 'MB',
    ext: (m.external / 1024 / 1024).toFixed(0) + 'MB',
  });
}, 10_000);

// dispare snapshot por sinal: kill -SIGUSR2 &lt;pid&gt;
process.on('SIGUSR2', () =&gt; {
  const file = writeHeapSnapshot();
  console.log('snapshot escrito em', file);
});</code></pre>
        <p>Carregue 2-3 snapshots no Chrome DevTools (aba Memory) e use <strong>Comparison</strong> para ver quais retainers crescem entre eles.</p>

        <h2>Casos de uso</h2>
        <ul>
          <li>API que cresce de 200MB para 2GB ao longo de horas sob carga.</li>
          <li>Workers que vazam listeners de <code>EventEmitter</code> a cada job.</li>
          <li>Cache em memória sem TTL nem limite de entradas.</li>
          <li>Closures que capturam respostas grandes (req/res) por engano.</li>
          <li>Buffers grandes mantidos por filas (queues) sem consumir.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li><code>setInterval</code> sem <code>.unref()</code> mantém o processo e referencia o callback inteiro.</li>
          <li>Listeners adicionados em hot path sem <code>off/removeListener</code> — vigie o warning <em>MaxListenersExceededWarning</em>.</li>
          <li><code>--max-old-space-size=2048</code> apenas adia o problema; não corrige.</li>
          <li>Promessas pendentes para sempre seguram o contexto que as criou.</li>
          <li>Strings concatenadas em logs viram <strong>external memory</strong> que não aparece no heap.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Ferramentas</div><div>Combine <code>clinic doctor</code>, <code>--inspect</code> + Chrome DevTools, <code>0x</code> para flamegraphs e <code>heapdump</code> em produção sob janelas curtas.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Coletando em produção</div><div>Snapshots pausam o event loop por segundos. Faça em uma instância isolada do load balancer.</div></div>
      `}} />
    </article>
  );
}

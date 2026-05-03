export default function EventLoop() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 10 min</div>
      <h1>O Event Loop</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O event loop é o coração do Node. Ele orquestra <strong>callbacks</strong>, <strong>promises</strong> e <strong>I/O</strong> sem bloquear a thread principal.</p><h2>Fases do loop</h2><ul><li><strong>timers</strong> — executa <code>setTimeout</code> e <code>setInterval</code></li><li><strong>pending callbacks</strong> — callbacks de I/O adiados</li><li><strong>idle, prepare</strong> — uso interno</li><li><strong>poll</strong> — espera novos eventos de I/O</li><li><strong>check</strong> — executa <code>setImmediate</code></li><li><strong>close callbacks</strong> — eventos de close (sockets, etc.)</li></ul><p>Entre cada fase, o loop processa a <strong>microtask queue</strong>: <code>process.nextTick</code> primeiro, depois resoluções de Promise.</p><pre><code class="language-js">console.log('1');
setTimeout(() =&gt; console.log('2'), 0);
setImmediate(() =&gt; console.log('3'));
Promise.resolve().then(() =&gt; console.log('4'));
process.nextTick(() =&gt; console.log('5'));
console.log('6');
// Saída: 1 → 6 → 5 → 4 → 2 → 3</code></pre><div class="callout callout-warn"><div class="callout-title">Bloqueio é fatal</div><div>Funções síncronas pesadas (loops grandes, regex catastrófico, JSON.parse de gigabytes) bloqueiam o loop e travam todas as conexões.</div></div>`}} />
    </article>
  );
}

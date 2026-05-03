export default function Timers() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · iniciante · 7 min</div>
      <h1>setTimeout, setInterval, setImmediate</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Os timers do Node agendam funções para o event loop. Conhecer a diferença entre <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code> e <code>process.nextTick</code> é o que separa código que "funciona" do código que escala.</p>

<h2>Conceito</h2>
<ul>
<li><strong>setTimeout(fn, ms)</strong> — executa <code>fn</code> uma vez após <em>pelo menos</em> <code>ms</code> milissegundos. Não é garantia de tempo exato.</li>
<li><strong>setInterval(fn, ms)</strong> — repete a cada <em>pelo menos</em> <code>ms</code>. Drifta com o tempo se <code>fn</code> demora.</li>
<li><strong>setImmediate(fn)</strong> — roda na próxima iteração do event loop, depois de I/O.</li>
<li><strong>process.nextTick(fn)</strong> — roda <strong>antes</strong> da próxima iteração — mais cedo que tudo. Cuidado: pode starvar I/O.</li>
<li><strong>queueMicrotask(fn)</strong> — fila de microtasks (igual <code>.then</code>).</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">setTimeout(() =&gt; console.log('1s'), 1000);

const id = setInterval(() =&gt; tick(), 100);
clearInterval(id);

setImmediate(() =&gt; console.log('depois de I/O'));
process.nextTick(() =&gt; console.log('antes de I/O'));
queueMicrotask(() =&gt; console.log('após task atual'));</code></pre>

<h3>API moderna baseada em Promises</h3>
<pre><code class="language-js">import { setTimeout as wait, setInterval as ticker } from 'node:timers/promises';

await wait(2000);
console.log('passaram 2s');

for await (const _ of ticker(1000)) {
  console.log('a cada segundo');
  if (Date.now() % 5 === 0) break;
}</code></pre>

<h3>Cancelamento com AbortController</h3>
<pre><code class="language-js">import { setTimeout as wait } from 'node:timers/promises';

const ac = new AbortController();
setTimeout(() =&gt; ac.abort(), 500);

try {
  await wait(2000, undefined, { signal: ac.signal });
} catch (err) {
  if (err.name === 'AbortError') console.log('cancelado');
}</code></pre>

<h2>Ordem de execução</h2>
<pre><code class="language-js">console.log('1');
process.nextTick(() =&gt; console.log('2 nextTick'));
queueMicrotask(() =&gt; console.log('3 microtask'));
setImmediate(() =&gt; console.log('4 immediate'));
setTimeout(() =&gt; console.log('5 timeout'), 0);
console.log('6');

// saída: 1, 6, 2 nextTick, 3 microtask, 5 timeout, 4 immediate</code></pre>

<h2>Quando usar</h2>
<ul>
<li><code>setTimeout</code> — debounce, retry com backoff, timeouts de operação.</li>
<li><code>setInterval</code> — heartbeat, polling de baixa frequência. Para alta precisão, prefira agendar próximo tick após processar.</li>
<li><code>setImmediate</code> — fatiar trabalho pesado para não bloquear o event loop.</li>
<li><code>process.nextTick</code> — APIs internas que precisam emitir eventos antes do próximo I/O.</li>
<li><code>queueMicrotask</code> — quando você quer agendar antes do próximo timer mas depois do código atual.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>setTimeout</code> com <code>ms = 0</code> ainda espera no mínimo 1ms; não é "imediato".</li>
<li><code>setInterval</code> não para se a função joga — use try/catch dentro.</li>
<li>Drift acumulado em interval: para precisão, agende <code>setTimeout</code> recursivo medindo o tempo real.</li>
<li><code>process.nextTick</code> em loop infinito starva o event loop — nada de I/O acontece.</li>
<li>Timers seguram o processo aberto. Use <code>id.unref()</code> para deixar o Node sair se for o único pendente.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">unref para timers de fundo</div><div><code>const id = setInterval(coleta, 60_000); id.unref();</code> deixa o processo encerrar normalmente quando todo trabalho útil acabou, mesmo com o timer agendado.</div></div>

<div class="callout callout-tip"><div class="callout-title">setImmediate vs setTimeout(fn, 0)</div><div>Dentro de um callback de I/O, <code>setImmediate</code> roda na fase Check da mesma iteração; <code>setTimeout(fn, 0)</code> só na próxima. <code>setImmediate</code> é mais previsível para "agende o resto do trabalho".</div></div>`}} />
    </article>
  );
}

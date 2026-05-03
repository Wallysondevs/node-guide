import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Async · intermediario · 8 min"}),e.jsx("h1",{children:"Microtasks: nextTick e queueMicrotask"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Microtasks são callbacks que rodam <strong>imediatamente após</strong> a operação atual da pilha terminar e <strong>antes</strong> da próxima fase do event loop (timers, I/O, etc). Em Node há duas filas: <code>process.nextTick</code> e a fila de microtasks padrão (promises + <code>queueMicrotask</code>).</p>

<h2>Conceito</h2>
<p>Após cada operação síncrona (e entre cada fase do event loop), Node esvazia <strong>toda</strong> a fila <code>nextTick</code>, depois <strong>toda</strong> a fila de microtasks. Só então passa para timers/IO.</p>
<pre><code class="language-js">console.log(1);
process.nextTick(() =&gt; console.log(2));
queueMicrotask(() =&gt; console.log(3));
Promise.resolve().then(() =&gt; console.log(4));
setImmediate(() =&gt; console.log(5));
setTimeout(() =&gt; console.log(6), 0);
console.log(7);

// saída: 1, 7, 2, 3, 4, 6, 5
// (ou 5/6 trocados dependendo do contexto)</code></pre>

<h2>Diferenças</h2>
<ul>
  <li><strong>process.nextTick</strong>: específico do Node; tem <em>prioridade absoluta</em> sobre microtasks padrão.</li>
  <li><strong>queueMicrotask</strong>: padrão WHATWG, equivalente a <code>Promise.resolve().then(fn)</code> mas sem alocar a promise.</li>
  <li>Promises (<code>.then</code>, <code>await</code>) também usam a fila de microtasks.</li>
</ul>

<h2>Exemplo prático: garantir assincronia</h2>
<pre><code class="language-js">// API que às vezes resolve sync, às vezes async
function getUser(id) {
  if (cache.has(id)) {
    // se chamarmos cb sync, quebra contrato Zalgo
    queueMicrotask(() =&gt; cb(null, cache.get(id)));
  } else {
    db.query('...', cb);
  }
}</code></pre>

<h2>Quando usar</h2>
<ul>
  <li>Adiar trabalho para <strong>depois</strong> da pilha atual sem esperar I/O.</li>
  <li>Garantir que callbacks sejam sempre assíncronos (evita "Releasing Zalgo").</li>
  <li>Implementar primitivas como <em>schedulers</em>, debouncers de microtasks.</li>
  <li>Em libs internas do Node, sinalizar erros de forma controlada (<code>nextTick(emit, 'error')</code>).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
  <li><strong>nextTick recursivo</strong> bloqueia I/O. Loop como <code>function loop(){ process.nextTick(loop); }</code> trava o servidor: timers e sockets nunca disparam.</li>
  <li>Use <strong>setImmediate</strong> quando precisar ceder o loop entre iterações pesadas.</li>
  <li><code>queueMicrotask</code> não captura exceções — elas viram <code>uncaughtException</code>. Embrulhe em try/catch.</li>
  <li>Promises <em>já resolvidas</em> não rodam síncronas; o callback de <code>.then</code> sempre vai para a fila de microtasks.</li>
  <li>Em workers/threads cada um tem sua própria fila — não há ordem global.</li>
</ul>

<pre><code class="language-js">// CORRETO: ceder loop em batch grande
async function processAll(items) {
  for (let i = 0; i &lt; items.length; i++) {
    process(items[i]);
    if (i % 1000 === 0) await new Promise(r =&gt; setImmediate(r));
  }
}</code></pre>

<div class="callout callout-warn"><div class="callout-title">Zalgo</div><div>Funções que às vezes chamam o callback sync e às vezes async causam bugs sutis. Sempre force assincronia com <code>queueMicrotask</code> ou <code>setImmediate</code>.</div></div>

<div class="callout callout-tip"><div class="callout-title">nextTick vs queueMicrotask</div><div>Em código de aplicação, prefira <code>queueMicrotask</code> (padrão web). Use <code>process.nextTick</code> apenas em código de baixo nível que precisa rodar antes de qualquer promise pendente.</div></div>`}})]})}export{r as default};

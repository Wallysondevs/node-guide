export default function EventLoop() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 14 min</div>
      <h1>O Event Loop</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O event loop é o coração do Node. Ele orquestra <strong>callbacks</strong>, <strong>promises</strong> e <strong>I/O</strong> sem bloquear a thread principal de JavaScript. Entender suas fases é o que separa quem escreve Node por instinto de quem realmente prevê quando algo vai travar a aplicação.</p>

<h2>Conceito</h2>
<p>Node usa uma única thread para executar JavaScript, mas delega I/O ao <code>libuv</code>, que mantém um pool de threads para operações como leitura de arquivos, DNS e crypto. Quando o I/O termina, o resultado volta como uma callback enfileirada em uma das fases do loop.</p>
<p>O ciclo principal tem fases bem definidas, executadas em ordem fixa:</p>
<ul>
<li><strong>timers</strong> — executa callbacks de <code>setTimeout</code> e <code>setInterval</code> cujo tempo expirou</li>
<li><strong>pending callbacks</strong> — callbacks de I/O do sistema adiados (ex.: erros TCP)</li>
<li><strong>idle, prepare</strong> — uso interno do libuv</li>
<li><strong>poll</strong> — recebe novos eventos de I/O; pode bloquear esperando</li>
<li><strong>check</strong> — executa <code>setImmediate</code></li>
<li><strong>close callbacks</strong> — eventos de close (sockets, handles)</li>
</ul>
<p>Entre cada fase, o Node drena duas filas de microtasks: primeiro <code>process.nextTick</code>, depois resoluções de Promise. Isso vale também entre cada callback individual dentro de uma fase.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">console.log('1');
setTimeout(() =&gt; console.log('2'), 0);
setImmediate(() =&gt; console.log('3'));
Promise.resolve().then(() =&gt; console.log('4'));
process.nextTick(() =&gt; console.log('5'));
console.log('6');
// Saída: 1 → 6 → 5 → 4 → 2 → 3</code></pre>
<p>Síncrono primeiro (1, 6). Depois drena microtasks: <code>nextTick</code> (5) antes de <code>Promise</code> (4). Então o loop entra na fase de timers (2) e em seguida check (3).</p>

<h3>setImmediate vs setTimeout(0)</h3>
<pre><code class="language-js">import { readFile } from 'node:fs';

readFile(__filename, () =&gt; {
  setTimeout(() =&gt; console.log('timeout'), 0);
  setImmediate(() =&gt; console.log('immediate'));
});
// Dentro de uma callback de I/O, immediate SEMPRE roda antes de timeout(0).</code></pre>

<h2>Quando usar cada API</h2>
<ul>
<li><strong>setImmediate</strong> — agendar trabalho para "depois deste tick de I/O", evitando recursão direta</li>
<li><strong>setTimeout(fn, 0)</strong> — atrasar para o próximo ciclo, mas sem garantia de prioridade vs immediate</li>
<li><strong>process.nextTick</strong> — rodar <em>antes</em> de qualquer I/O, útil em libs para emitir eventos depois do return síncrono</li>
<li><strong>queueMicrotask</strong> — equivalente padrão a <code>Promise.resolve().then</code>, sem criar Promise</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Bloqueio é fatal</div><div>Funções síncronas pesadas (loops grandes, regex catastrófico, <code>JSON.parse</code> de gigabytes, <code>bcrypt.hashSync</code>) bloqueiam o loop e travam <em>todas</em> as conexões abertas. Em servidor, isso significa downtime instantâneo.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>nextTick starvation</strong> — recursão de <code>process.nextTick</code> nunca deixa o loop avançar para I/O</li>
<li>Promises encadeadas longas também postergam timers e I/O — cada <code>.then</code> é uma microtask</li>
<li>Em workers e libuv pool (4 threads por padrão), crypto e fs concorrem; ajuste <code>UV_THREADPOOL_SIZE</code></li>
<li>Não confie em ordem de <code>setTimeout(a,0)</code> vs <code>setTimeout(b,0)</code> entre módulos — a fase de timers reordena por expiração</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Diagnóstico</div><div>Use <code>node --trace-event-categories=node.async_hooks</code> ou ferramentas como <code>clinic doctor</code> para visualizar bloqueios no loop. <code>perf_hooks.monitorEventLoopDelay()</code> dá métricas em produção.</div></div>`}} />
    </article>
  );
}

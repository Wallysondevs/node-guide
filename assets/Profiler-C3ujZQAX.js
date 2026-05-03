import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Performance · intermediario · 8 min"}),e.jsx("h1",{children:"Profiler embutido"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Antes de chutar otimizações, <strong>meça</strong>. Node traz três ferramentas de profiling embutidas: o sampling profiler (<code>--prof</code>), o inspector com Chrome DevTools (<code>--inspect</code>) e a API <code>perf_hooks</code> para instrumentação manual.</p>

<h2>Conceito</h2>
<p>Profiling identifica onde o tempo é gasto (CPU) ou onde a memória cresce (heap). O sampling profiler captura stack traces várias vezes por segundo; o heap snapshot fotografa todos os objetos vivos.</p>

<h2>CPU profile</h2>
<pre><code class="language-bash"># gera log binário do V8
node --prof dist/index.js
# rode sua carga de trabalho, depois Ctrl+C
ls isolate-*-v8.log

# converte em texto legível
node --prof-process isolate-*.log &gt; processed.txt
less processed.txt</code></pre>
<p>Procure por <em>"ticks"</em>: funções com mais ticks consomem mais CPU.</p>

<h2>Chrome DevTools (interativo)</h2>
<pre><code class="language-bash">node --inspect dist/index.js              # porta 9229
node --inspect-brk dist/index.js          # pausa no início (debug)
# Abra chrome://inspect → Inspect</code></pre>
<p>No DevTools você tem: <strong>Performance</strong> (flame graph), <strong>Memory</strong> (heap snapshot, allocation timeline), <strong>Sources</strong> (debugger com breakpoints).</p>

<div class="callout callout-info"><div class="callout-title">Remoto</div><div>Em servidor sem GUI, suba SSH tunnel: <code>ssh -L 9229:localhost:9229 user@server</code> e abra chrome://inspect localmente.</div></div>

<h2>Heap snapshot programático</h2>
<pre><code class="language-js">import v8 from 'node:v8';
import fs from 'node:fs';

// gera arquivo .heapsnapshot
const path = '/tmp/heap-' + Date.now() + '.heapsnapshot';
const stream = v8.getHeapSnapshot();
stream.pipe(fs.createWriteStream(path));
console.log('snapshot em', path);</code></pre>
<p>Abra no DevTools (Memory → Load) e procure por crescimento entre snapshots ("Comparison" view).</p>

<h2>perf_hooks: medir trechos</h2>
<pre><code class="language-js">import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver(list =&gt; {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration.toFixed(1), 'ms');
  }
});
obs.observe({ entryTypes: ['measure'] });

performance.mark('start-query');
await db.query('select ...');
performance.mark('end-query');
performance.measure('user-query', 'start-query', 'end-query');</code></pre>

<h2>Event loop lag</h2>
<pre><code class="language-js">import { monitorEventLoopDelay } from 'node:perf_hooks';

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

setInterval(() =&gt; {
  console.log('p99 lag ms:', (h.percentile(99) / 1e6).toFixed(1));
  h.reset();
}, 5000);</code></pre>

<div class="callout callout-warn"><div class="callout-title">Lag alto = problema</div><div>Lag &gt; 50ms p99 indica trabalho síncrono pesado bloqueando o event loop. Mova para worker_thread ou divida em microtasks.</div></div>

<h2>Quando usar</h2>
<ul>
<li>Endpoint lento — CPU profile com carga reproduzida (autocannon, k6).</li>
<li>RSS crescente sem teto — heap snapshots espaçados + comparison.</li>
<li>p99 latency irregular — event loop delay monitor.</li>
<li>Job CLI lento — <code>--prof</code> rápido sem precisar de DevTools.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Profile sob carga</strong>. Profiling de "request único" não revela hotpaths reais.</li>
<li>Habilitar <code>--prof</code> tem overhead pequeno (5–10%); <code>--inspect</code> em produção é arriscado (RCE se exposto).</li>
<li>Heap snapshot pode levar segundos e travar o event loop — agende em janela de baixa carga.</li>
<li>Sourcemaps: para profile legível em código TS, use <code>--enable-source-maps</code>.</li>
<li>Não confunda <strong>RSS</strong> (memória total) com <strong>heap</strong> (objetos JS) — leak pode estar em Buffers/native.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Ferramentas amigáveis</div><div>Para análise visual sem DevTools, use <strong>clinic.js</strong> (clinic doctor/flame/bubbleprof) — é um wrapper sobre essas mesmas APIs com UI HTML pronta.</div></div>`}})]})}export{t as default};

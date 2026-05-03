import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Performance · avancado · 11 min"}),e.jsx("h1",{children:"Worker threads"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p>Worker threads permitem rodar JavaScript em threads separadas dentro do mesmo processo. Use para tarefas <strong>CPU-bound</strong> que travam o event loop: criptografia pesada, parsing grande, image/PDF processing.</p>

<h2>Conceito</h2>
<p>Cada worker tem seu próprio event loop, heap e contexto V8. A comunicação acontece via <code>postMessage</code> (cópia estruturada) ou via <code>SharedArrayBuffer</code>/<code>Atomics</code> para memória compartilhada. Não é <code>cluster</code> (que cria processos separados).</p>

<pre><code class="language-js">// main.js
import { Worker } from 'node:worker_threads';

const worker = new Worker(new URL('./worker.js', import.meta.url), {
  workerData: { n: 1e9 },
});

worker.on('message', r =&gt; console.log('soma:', r));
worker.on('error', console.error);
worker.on('exit', code =&gt; console.log('exit', code));</code></pre>

<pre><code class="language-js">// worker.js
import { parentPort, workerData } from 'node:worker_threads';

let s = 0;
for (let i = 0; i &lt; workerData.n; i++) s += i;
parentPort.postMessage(s);</code></pre>

<h2>Exemplo prático: pool de workers</h2>
<pre><code class="language-js">import { Worker } from 'node:worker_threads';
import os from 'node:os';

class WorkerPool {
  constructor(file, size = os.availableParallelism()) {
    this.workers = Array.from({ length: size }, () =&gt; new Worker(file));
    this.queue = [];
    this.idle = [...this.workers];
    this.workers.forEach(w =&gt; w.on('message', m =&gt; this.onDone(w, m)));
  }
  run(task) {
    return new Promise((resolve, reject) =&gt; {
      this.queue.push({ task, resolve, reject });
      this.next();
    });
  }
  next() {
    if (!this.queue.length || !this.idle.length) return;
    const w = this.idle.pop();
    const job = this.queue.shift();
    w._job = job;
    w.postMessage(job.task);
  }
  onDone(w, msg) {
    const job = w._job;
    w._job = null;
    this.idle.push(w);
    job.resolve(msg);
    this.next();
  }
}

const pool = new WorkerPool(new URL('./worker.js', import.meta.url));
const results = await Promise.all([1, 2, 3, 4].map(n =&gt; pool.run(n)));</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Hash/criptografia (bcrypt síncrono, Argon2).</li>
<li>Parsing/serialização pesada (CSV gigante, JSON enorme).</li>
<li>Processamento de imagens com <code>sharp</code>.</li>
<li>Cálculos numéricos puros (ML inference, simulações).</li>
<li>Compressão/descompressão de arquivos grandes.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Worker <strong>não acelera I/O</strong> — o event loop já faz isso. Só ajuda com CPU.</li>
<li>Criar workers tem custo (~30ms); use pool para tarefas frequentes.</li>
<li><code>postMessage</code> faz cópia profunda — para buffers grandes, transfira (<code>transferList</code>).</li>
<li>Não compartilha cache de módulo: cada worker carrega seus próprios imports.</li>
<li>Erros não capturados matam o worker silenciosamente — sempre escute <code>error</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Use piscina</div><div>Em produção, prefira a lib <code>piscina</code> — pool de workers tipado, com filas, timeout e abort.</div></div>

<div class="callout callout-warn"><div class="callout-title">Worker x cluster x child_process</div><div>Worker: thread (mesma memória possível). Cluster: processos compartilhando porta. child_process: rodar binários ou scripts isolados.</div></div>
`}})]})}export{t as default};

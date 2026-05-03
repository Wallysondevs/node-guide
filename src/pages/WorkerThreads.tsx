export default function WorkerThreads() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · avancado · 7 min</div>
      <h1>Worker threads</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Para CPU-bound (criptografia, parsing pesado, image processing). Cada worker = isolado, comunicação via mensagens.</p><pre><code class="language-js">// main.js
import { Worker } from 'node:worker_threads';

const worker = new Worker('./worker.js', { workerData: { n: 1e9 } });
worker.on('message', r =&gt; console.log(r));
worker.on('error', console.error);

// worker.js
import { parentPort, workerData } from 'node:worker_threads';
let s = 0;
for (let i = 0; i &lt; workerData.n; i++) s += i;
parentPort.postMessage(s);</code></pre><div class="callout callout-tip"><div class="callout-title">Pool</div><div>Use <code>piscina</code> — pool de workers reusáveis e tipado.</div></div>`}} />
    </article>
  );
}

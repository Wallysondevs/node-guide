import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Performance · intermediario · 8 min"}),e.jsx("h1",{children:"Cluster"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Node é single-threaded por padrão. O módulo <code>cluster</code> permite forkar N processos filhos compartilhando a mesma porta — a forma nativa de aproveitar todos os cores de uma máquina sem mudar o código do servidor.</p>

<h2>Conceito</h2>
<p>O processo <em>primary</em> faz o <code>listen</code> no socket; os <em>workers</em> aceitam conexões em <em>round-robin</em> (no Linux). Cada worker tem heap próprio — não compartilham variáveis. Comunicação acontece via IPC (<code>process.send</code>) ou via Redis/banco.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';

if (cluster.isPrimary) {
  const cores = os.cpus().length;
  console.log(\`primary \${process.pid} forkando \${cores} workers\`);
  for (let i = 0; i &lt; cores; i++) cluster.fork();

  cluster.on('exit', (worker, code, sig) =&gt; {
    console.warn(\`worker \${worker.process.pid} morreu (\${sig||code}) — refork\`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) =&gt; {
    res.end(\`hello do worker \${process.pid}\`);
  }).listen(3000);
}</code></pre>

<h2>Comunicação primary ↔ worker</h2>
<pre><code class="language-js">// no worker
process.send({ type: 'metric', cpu: process.cpuUsage() });

// no primary
for (const id in cluster.workers) {
  cluster.workers[id].on('message', (msg) =&gt; {
    if (msg.type === 'metric') console.log(msg);
  });
}</code></pre>

<h2>Graceful shutdown</h2>
<pre><code class="language-js">// no worker
const server = http.createServer(handler).listen(3000);

process.on('SIGTERM', () =&gt; {
  server.close(() =&gt; process.exit(0));
});

// no primary
process.on('SIGTERM', () =&gt; {
  for (const id in cluster.workers) cluster.workers[id].kill('SIGTERM');
});</code></pre>

<h2>Quando usar</h2>
<ul>
<li>APIs REST/HTTP CPU-bound em uma máquina com vários cores.</li>
<li>Redundância básica: se um worker morre, o primary refork.</li>
<li>Migrar gradualmente para arquitetura multi-instância antes de subir Kubernetes.</li>
</ul>

<h2>Quando NÃO usar</h2>
<ul>
<li>Você já roda em Kubernetes/PM2 — eles fazem isso melhor (controle de restart, rollout).</li>
<li>Workload puramente I/O-bound: 1 processo já satura a NIC.</li>
<li>Estado compartilhado complexo entre processos — vira pesadelo. Mova para Redis.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Cada worker tem cache, sessões e métricas separadas — inconsistência se contar com memória local.</li>
<li>Logs misturam-se. Prefixe com PID ou use logger estruturado central.</li>
<li>Sticky session é necessário para WebSockets/SSE — configure no LB ou use adapter Redis.</li>
<li>Refork sem backoff em loop de crash queima CPU. Limite tentativas por minuto.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">PM2</div><div><code>pm2 start app.js -i max</code> faz tudo isso (cluster, refork, logs unificados, monit) sem você escrever a glue code.</div></div>

<div class="callout callout-warn"><div class="callout-title">worker_threads ≠ cluster</div><div><code>cluster</code> = processos separados (escala HTTP). <code>worker_threads</code> = threads compartilhando memória (CPU pesada num único processo). Não confunda.</div></div>`}})]})}export{i as default};

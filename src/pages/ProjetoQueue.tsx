export default function ProjetoQueue() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · avancado · 11 min</div>
      <h1>Projeto: queue worker</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Sistema de jobs assíncronos com <strong>BullMQ</strong> sobre Redis: producer, worker, retries com backoff exponencial, jobs agendados (cron), prioridade e dashboard com bull-board.</p>

<h2>Estrutura</h2>
<pre><code class="language-bash">queue-worker/
├─ docker-compose.yml
└─ src/
   ├─ queue.js          # instância compartilhada
   ├─ producer.js       # enfileira
   ├─ worker.js         # processa
   ├─ scheduler.js      # cron
   └─ dashboard.js      # bull-board UI</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">npm i bullmq ioredis express @bull-board/express @bull-board/api
docker run -d --name redis -p 6379:6379 redis:7</code></pre>

<h2>Queue compartilhada</h2>
<pre><code class="language-js">// src/queue.js
import { Queue, QueueEvents } from 'bullmq';

export const connection = { host: 'localhost', port: 6379 };
export const emails = new Queue('emails', { connection });
export const events = new QueueEvents('emails', { connection });

events.on('completed', ({ jobId }) =&gt; console.log('done', jobId));
events.on('failed', ({ jobId, failedReason }) =&gt; console.error('fail', jobId, failedReason));</code></pre>

<h2>Producer</h2>
<pre><code class="language-js">// src/producer.js
import { emails } from './queue.js';

// job comum
await emails.add('welcome', { to: 'a@b.com', name: 'Ana' }, {
  attempts: 5,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: 1000,
  removeOnFail: 5000
});

// agendado
await emails.add('reminder', { userId: 42 }, { delay: 60_000 });

// prioridade (1 = mais alta)
await emails.add('vip', { to: 'ceo@x.com' }, { priority: 1 });

// idempotência via jobId
await emails.add('digest', { day: '2025-01-15' }, { jobId: 'digest-2025-01-15' });</code></pre>

<h2>Worker</h2>
<pre><code class="language-js">// src/worker.js
import { Worker } from 'bullmq';
import { connection } from './queue.js';

async function send(data) {
  // simula envio
  if (Math.random() &lt; 0.2) throw new Error('SMTP timeout');
  await new Promise(r =&gt; setTimeout(r, 500));
}

const worker = new Worker('emails', async (job) =&gt; {
  await job.updateProgress(10);
  await send(job.data);
  await job.updateProgress(100);
  return { sentAt: Date.now() };
}, {
  connection,
  concurrency: 10,
  limiter: { max: 100, duration: 1000 } // 100 jobs/s no máximo
});

worker.on('failed', (job, err) =&gt; console.error('fail', job?.id, err.message));
worker.on('completed', (job) =&gt; console.log('ok', job.id));

process.on('SIGTERM', async () =&gt; { await worker.close(); process.exit(0); });</code></pre>

<h2>Scheduler (jobs repetidos)</h2>
<pre><code class="language-js">// src/scheduler.js
import { emails } from './queue.js';

await emails.add('digest', {}, {
  repeat: { pattern: '0 8 * * *', tz: 'America/Sao_Paulo' }, // 8h todo dia
  jobId: 'cron-digest'
});

await emails.add('healthcheck', {}, {
  repeat: { every: 60_000 }
});</code></pre>

<h2>Dashboard</h2>
<pre><code class="language-js">// src/dashboard.js
import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import { emails } from './queue.js';

const adapter = new ExpressAdapter();
adapter.setBasePath('/admin/queues');
createBullBoard({ queues: [new BullMQAdapter(emails)], serverAdapter: adapter });

const app = express();
app.use('/admin/queues', adapter.getRouter());
app.listen(3001, () =&gt; console.log('dashboard em http://localhost:3001/admin/queues'));</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">node src/worker.js &amp;
node src/scheduler.js &amp;
node src/dashboard.js &amp;
node src/producer.js   # enfileira jobs de teste</code></pre>

<div class="callout callout-warn"><div class="callout-title">Workers separados</div><div>Rode worker em processo distinto da API HTTP. Eles têm perfis de CPU/memória diferentes e escalam independente.</div></div>

<h2>Boas práticas</h2>
<ul>
  <li>Sempre defina <code>removeOnComplete</code> — Redis enche rápido com jobs antigos.</li>
  <li>Use <code>jobId</code> determinístico para idempotência (BullMQ ignora duplicados).</li>
  <li><code>limiter</code> protege APIs externas de sobrecarga (rate limit no consumer).</li>
  <li>Para jobs longos, chame <code>job.updateProgress()</code> — útil em dashboards.</li>
  <li>Trate <code>SIGTERM</code> chamando <code>worker.close()</code> para terminar o job em andamento.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Quando NÃO usar BullMQ</div><div>Para jobs distribuídos entre linguagens diferentes ou com requisitos rígidos de delivery, prefira RabbitMQ ou Kafka. BullMQ é Node-only e roda sobre Redis Lists/Streams.</div></div>`}} />
    </article>
  );
}

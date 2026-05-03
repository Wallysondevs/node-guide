export default function ProjetoQueue() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · avancado · 7 min</div>
      <h1>Projeto: queue worker</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Stack: BullMQ (sobre Redis) — jobs assíncronos com retry, prioridade e cron.</p><pre><code class="language-bash">npm i bullmq ioredis</code></pre><pre><code class="language-js">// producer.js
import { Queue } from 'bullmq';
const emails = new Queue('emails', { connection: { host: 'localhost' } });

await emails.add('welcome', { to: 'a@b.com' }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 },
});

// agendar
await emails.add('reminder', { id: 42 }, { delay: 3600_000 });

// worker.js
import { Worker } from 'bullmq';

new Worker('emails', async job =&gt; {
  console.log('processando', job.name, job.data);
  await sendEmail(job.data);
}, { connection: { host: 'localhost' }, concurrency: 5 });</code></pre>`}} />
    </article>
  );
}

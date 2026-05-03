export default function ProjetoMicroservico() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · avancado · 7 min</div>
      <h1>Projeto: microserviço</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Stack: Fastify + Pino + Postgres + RabbitMQ.</p><pre><code class="language-js">import Fastify from 'fastify';
import { connect } from 'amqplib';
import pino from 'pino';

const log = pino({ level: 'info' });
const app = Fastify({ loggerInstance: log });

const rabbit = await connect(process.env.RABBIT_URL);
const ch = await rabbit.createChannel();
await ch.assertQueue('orders');

app.post('/orders', {
  schema: { body: { type: 'object', required: ['items'], properties: { items: { type: 'array' } } } },
  handler: async (req, reply) =&gt; {
    const order = { id: crypto.randomUUID(), ...req.body, status: 'pending' };
    await ch.sendToQueue('orders', Buffer.from(JSON.stringify(order)), { persistent: true });
    log.info({ orderId: order.id }, 'order enqueued');
    return reply.code(202).send(order);
  }
});

app.get('/healthz', async () =&gt; ({ ok: true }));

await app.listen({ port: 3000, host: '0.0.0.0' });</code></pre>`}} />
    </article>
  );
}

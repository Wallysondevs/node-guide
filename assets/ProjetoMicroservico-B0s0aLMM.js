import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Projetos · avancado · 11 min"}),e.jsx("h1",{children:"Projeto: microserviço"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Microserviço de pedidos com <strong>Fastify</strong> + <strong>RabbitMQ</strong> + <strong>Postgres</strong>, logs estruturados (Pino), healthcheck, graceful shutdown e publicação assíncrona via fila para um worker desacoplado.</p>

<h2>Arquitetura</h2>
<pre><code class="language-bash">[client] -- HTTP --&gt; [orders-api] --publish--&gt; (RabbitMQ "orders") --consume--&gt; [orders-worker] --&gt; [Postgres]
                                                                                          |
                                                                                          +--&gt; [notifier]</code></pre>

<h2>Estrutura</h2>
<pre><code class="language-bash">orders/
├─ docker-compose.yml
├─ api/
│  ├─ package.json
│  └─ src/index.js
└─ worker/
   ├─ package.json
   └─ src/index.js</code></pre>

<h2>API (publisher)</h2>
<pre><code class="language-js">// api/src/index.js
import Fastify from 'fastify';
import { connect } from 'amqplib';
import { randomUUID } from 'node:crypto';

const app = Fastify({ logger: { level: 'info' } });

const rabbit = await connect(process.env.RABBIT_URL);
const ch = await rabbit.createConfirmChannel();
await ch.assertQueue('orders', { durable: true });

app.post('/orders', {
  schema: {
    body: {
      type: 'object',
      required: ['items'],
      properties: {
        items: { type: 'array', minItems: 1, items: {
          type: 'object',
          required: ['sku', 'qty'],
          properties: { sku: { type: 'string' }, qty: { type: 'integer', minimum: 1 } }
        }}
      }
    }
  }
}, async (req, reply) =&gt; {
  const order = { id: randomUUID(), items: req.body.items, status: 'pending', createdAt: Date.now() };
  await new Promise((res, rej) =&gt; {
    ch.sendToQueue('orders', Buffer.from(JSON.stringify(order)), { persistent: true }, (err) =&gt; err ? rej(err) : res());
  });
  req.log.info({ orderId: order.id }, 'enqueued');
  return reply.code(202).send(order);
});

app.get('/healthz', async () =&gt; ({ ok: true, rabbit: rabbit.connection.serverProperties.product }));

const close = async () =&gt; {
  app.log.info('shutting down');
  await app.close();
  await ch.close(); await rabbit.close();
  process.exit(0);
};
process.on('SIGTERM', close); process.on('SIGINT', close);

await app.listen({ port: 3000, host: '0.0.0.0' });</code></pre>

<h2>Worker (consumer)</h2>
<pre><code class="language-js">// worker/src/index.js
import { connect } from 'amqplib';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
await pool.query('CREATE TABLE IF NOT EXISTS orders(id uuid PRIMARY KEY, payload jsonb, status text, created_at timestamptz DEFAULT now())');

const rabbit = await connect(process.env.RABBIT_URL);
const ch = await rabbit.createChannel();
await ch.assertQueue('orders', { durable: true });
await ch.prefetch(10); // backpressure

ch.consume('orders', async (msg) =&gt; {
  if (!msg) return;
  try {
    const order = JSON.parse(msg.content.toString());
    await pool.query(
      'INSERT INTO orders(id,payload,status) VALUES ($1,$2,$3) ON CONFLICT (id) DO NOTHING',
      [order.id, order, 'processed']
    );
    console.log('processed', order.id);
    ch.ack(msg);
  } catch (e) {
    console.error('fail', e);
    ch.nack(msg, false, false); // descarta para DLX
  }
});</code></pre>

<h2>docker-compose.yml</h2>
<pre><code class="language-bash">services:
  rabbit:
    image: rabbitmq:3-management
    ports: ['5672:5672', '15672:15672']
  pg:
    image: postgres:16
    environment: { POSTGRES_PASSWORD: pass, POSTGRES_USER: user, POSTGRES_DB: orders }
    ports: ['5432:5432']
  api:
    build: ./api
    environment:
      RABBIT_URL: amqp://rabbit
    depends_on: [rabbit]
    ports: ['3000:3000']
  worker:
    build: ./worker
    environment:
      RABBIT_URL: amqp://rabbit
      DATABASE_URL: postgres://user:pass@pg:5432/orders
    depends_on: [rabbit, pg]</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">docker compose up --build
curl -X POST localhost:3000/orders -H 'content-type: application/json' \\
  -d '{"items":[{"sku":"abc","qty":2}]}'</code></pre>

<div class="callout callout-info"><div class="callout-title">Confirm channel</div><div><code>createConfirmChannel</code> garante que o broker confirmou a mensagem antes de você responder 202 — evita perda em queda do RabbitMQ.</div></div>

<h2>Boas práticas</h2>
<ul>
  <li><strong>prefetch</strong> limita mensagens em vôo por consumer; sem ele, um worker engasga.</li>
  <li>Configure <strong>Dead Letter Exchange</strong> para mensagens descartadas (<code>nack</code>).</li>
  <li>Idempotência: ON CONFLICT DO NOTHING ou <code>upsert</code> com <code>orderId</code> — mensagens podem ser entregues 2x.</li>
  <li>Graceful shutdown: pare de aceitar HTTP, drene fila, feche channels e pools.</li>
  <li>Logs estruturados (Pino) com <code>requestId</code>/<code>orderId</code> para correlacionar entre serviços.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Observabilidade</div><div>Adicione OpenTelemetry e exporte traces para Jaeger/Tempo. Cada serviço propaga <code>traceparent</code> via headers HTTP e propriedades AMQP.</div></div>`}})]})}export{t as default};

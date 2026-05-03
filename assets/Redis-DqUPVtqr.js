import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Banco de dados · intermediario · 8 min"}),e.jsx("h1",{children:"Redis com ioredis"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Redis é um armazenamento chave-valor em memória, ultrarrápido, com tipos de dados ricos (strings, listas, sets, hashes, streams, sorted sets). Usado para cache, sessões, rate limit, pub/sub, filas leves e leaderboards.</p>

<h2>Conceito</h2>
<p>O cliente padrão para Node é <code>ioredis</code> — suporte nativo a Cluster, Sentinel, pipelining, scripts Lua e pub/sub. Conexões são reutilizadas; crie um pool por processo e injete onde precisar.</p>

<pre><code class="language-bash">npm i ioredis</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

redis.on('error', (err) =&gt; console.error('redis', err));

await redis.set('user:42', JSON.stringify(user), 'EX', 3600);
const raw = await redis.get('user:42');
const user = raw ? JSON.parse(raw) : null;

await redis.incr('hits:home');
await redis.expire('hits:home', 86400);</code></pre>

<h3>Cache-aside com TTL</h3>
<pre><code class="language-js">async function getUser(id) {
  const key = 'user:' + id;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const user = await db.users.findById(id);
  if (user) await redis.set(key, JSON.stringify(user), 'EX', 300);
  return user;
}

async function invalidateUser(id) {
  await redis.del('user:' + id);
}</code></pre>

<h3>Pub/Sub</h3>
<pre><code class="language-js">const sub = new Redis(process.env.REDIS_URL);
const pub = new Redis(process.env.REDIS_URL);

await sub.subscribe('events');
sub.on('message', (channel, msg) =&gt; {
  console.log('recebido em', channel, msg);
});

await pub.publish('events', JSON.stringify({ type: 'user.created', id: 1 }));</code></pre>

<h3>Pipeline e transações</h3>
<pre><code class="language-js">// pipeline — envia em batch (sem atomicidade)
const r = await redis.pipeline()
  .set('a', '1')
  .incr('b')
  .lpush('queue', 'job1')
  .exec();

// multi — transação atômica
const t = await redis.multi()
  .decr('stock:42')
  .lpush('orders', 'o-1')
  .exec();</code></pre>

<h3>Hashes e sorted sets</h3>
<pre><code class="language-js">await redis.hset('session:abc', { userId: '42', role: 'admin' });
const sess = await redis.hgetall('session:abc');

// leaderboard
await redis.zadd('scores', 1500, 'alice', 1200, 'bob', 1800, 'carol');
const top = await redis.zrevrange('scores', 0, 9, 'WITHSCORES');</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Cache de respostas HTTP, queries pesadas e renderizações de página.</li>
<li>Sessões de usuário compartilhadas entre múltiplas instâncias do servidor.</li>
<li>Rate limit distribuído (com <code>rate-limit-redis</code>).</li>
<li>Filas com BullMQ (jobs em background, agendamento, retries).</li>
<li>Locks distribuídos com <code>SET NX EX</code> ou Redlock.</li>
<li>Pub/Sub leve para notificações entre serviços.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Sempre defina TTL em chaves de cache — evita memória crescer sem limite.</li>
<li>Use <strong>prefixos</strong> consistentes (<code>cache:</code>, <code>session:</code>, <code>rl:</code>) e namespace por ambiente.</li>
<li>Evite chaves enormes; nunca rode <code>KEYS *</code> em produção, use <code>SCAN</code>.</li>
<li>Para Cluster, escolha keys com <code>{hashtag}</code> em comum quando precisar de operações multi-key.</li>
<li>Monitore <code>used_memory</code>, <code>evicted_keys</code> e configure <code>maxmemory-policy</code> (ex.: <code>allkeys-lru</code>).</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Redis não é seu banco principal</div><div>Trate como cache volátil. Mesmo com persistência (RDB/AOF), perda de minutos de dados é possível em crash. Dados críticos vivem no Postgres; o Redis apenas acelera.</div></div>

<div class="callout callout-tip"><div class="callout-title">Conexão única em serverless</div><div>Em Lambda/Edge, reaproveite a conexão entre invocações guardando-a fora do handler. Cada cold start abre socket novo — caro no p99.</div></div>`}})]})}export{r as default};

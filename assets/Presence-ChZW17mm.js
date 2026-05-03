import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function n(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Realtime · intermediario · 7 min"}),e.jsx("h1",{children:"Presença online"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Mostrar quem está online é um problema clássico de realtime: precisa rastrear conexões, lidar com múltiplas abas, sobreviver a reconexões e — em produção — funcionar entre múltiplas instâncias do servidor.</p>

<h2>Conceito</h2>
<p>Cada usuário pode ter <strong>N sockets</strong> (várias abas, mobile + desktop). Um usuário só está offline quando o último socket cai. Mantenha um índice <code>userId → Set&lt;socketId&gt;</code> em memória (single node) ou em Redis (cluster).</p>

<h2>Implementação single-node (Socket.IO)</h2>
<pre><code class="language-js">const online = new Map();   // userId → Set&lt;socketId&gt;

io.on('connection', socket =&gt; {
  const userId = socket.handshake.auth.userId;
  if (!userId) return socket.disconnect(true);

  if (!online.has(userId)) online.set(userId, new Set());
  online.get(userId).add(socket.id);

  if (online.get(userId).size === 1) {
    io.emit('presence', { userId, online: true });
  }

  socket.on('disconnect', () =&gt; {
    const set = online.get(userId);
    if (!set) return;
    set.delete(socket.id);
    if (set.size === 0) {
      online.delete(userId);
      io.emit('presence', { userId, online: false });
    }
  });
});

// API auxiliar
function isOnline(userId) {
  return (online.get(userId)?.size ?? 0) &gt; 0;
}</code></pre>

<div class="callout callout-info"><div class="callout-title">Por que Set?</div><div>Multipla aba. Se você usar boolean, fechar uma aba já marcaria offline mesmo com outra aberta.</div></div>

<h2>Multi-instância com Redis</h2>
<pre><code class="language-js">import { createClient } from 'redis';
const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

io.on('connection', async socket =&gt; {
  const userId = socket.handshake.auth.userId;
  await redis.sAdd('online:' + userId, socket.id);
  await redis.expire('online:' + userId, 60);          // TTL de segurança

  // pub/sub para broadcast entre nodes
  await redis.publish('presence', JSON.stringify({ userId, online: true }));

  socket.on('disconnect', async () =&gt; {
    await redis.sRem('online:' + userId, socket.id);
    const left = await redis.sCard('online:' + userId);
    if (left === 0) {
      await redis.del('online:' + userId);
      await redis.publish('presence', JSON.stringify({ userId, online: false }));
    }
  });
});</code></pre>

<h2>Heartbeat: detectar zumbis</h2>
<pre><code class="language-js">// cliente envia ping a cada 25s; servidor renova TTL
socket.on('ping', async () =&gt; {
  await redis.expire('online:' + userId, 60);
});

// job periódico limpa sets sem TTL renovado (Redis faz isso sozinho via expire)</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Chat: indicador verde ao lado do nome.</li>
<li>Multiplayer: mostrar jogadores na sala.</li>
<li>Colaboração: cursores ao vivo (Figma/Notion-like).</li>
<li>Dashboards: contador de "usuários ativos agora".</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Estado em memória <strong>não funciona</strong> com mais de 1 instância — use Redis adapter do Socket.IO.</li>
<li>Sem TTL no Redis, crashes deixam usuários "fantasma" online para sempre.</li>
<li>Emitir <code>presence</code> a cada conexão floda clientes — só notifique nas transições (0→1 e N→0).</li>
<li>Conexões móveis caem e voltam o tempo todo. Use debounce de alguns segundos antes de marcar offline.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Debounce offline</div><div>Antes de emitir <code>online: false</code>, espere 5–10s e cheque de novo. Reduz "piscar" do indicador em redes ruins.</div></div>`}})]})}export{n as default};

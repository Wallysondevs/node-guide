export default function SocketioSetup() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Realtime · intermediario · 8 min</div>
      <h1>Socket.IO: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Socket.IO é uma camada acima do WebSocket que adiciona reconexão automática, fallback para HTTP long-polling, rooms, namespaces, broadcast e ack/timeout. É a forma mais pragmática de fazer realtime em Node hoje.</p>

<h2>Conceito</h2>
<p>O servidor cria uma instância (<code>io</code>) atada a um <code>http.Server</code>. Clientes (browser, mobile, outro Node) abrem uma conexão e mantêm um canal bidirecional. Mensagens são <strong>eventos nomeados</strong> com payload JSON.</p>

<pre><code class="language-bash">npm i socket.io
npm i socket.io-client   # no front</code></pre>

<h2>Exemplo prático: servidor</h2>
<pre><code class="language-js">import { createServer } from 'node:http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true },
  pingInterval: 25_000,
  pingTimeout: 20_000,
});

io.use((socket, next) =&gt; {
  const token = socket.handshake.auth?.token;
  const user = verifyJwt(token);
  if (!user) return next(new Error('unauthorized'));
  socket.data.user = user;
  next();
});

io.on('connection', (socket) =&gt; {
  console.log('online:', socket.data.user.id);

  socket.on('chat:send', async ({ room, text }, ack) =&gt; {
    const msg = await saveMessage({ userId: socket.data.user.id, room, text });
    io.to(room).emit('chat:new', msg);
    ack?.({ id: msg.id });
  });

  socket.on('disconnect', (reason) =&gt; {
    console.log('offline:', socket.data.user.id, reason);
  });
});

httpServer.listen(3001);</code></pre>

<h3>Cliente</h3>
<pre><code class="language-js">import { io } from 'socket.io-client';

const socket = io('https://api.example.com', {
  auth: { token: localStorage.getItem('jwt') },
  transports: ['websocket'],
  reconnectionDelayMax: 10_000,
});

socket.on('connect', () =&gt; console.log('conectado', socket.id));
socket.on('connect_error', (err) =&gt; console.error(err.message));

socket.emit('chat:send', { room: 'general', text: 'oi' }, (ack) =&gt; {
  console.log('confirmado', ack.id);
});

socket.on('chat:new', (msg) =&gt; renderMessage(msg));</code></pre>

<h3>Escala horizontal com Redis</h3>
<pre><code class="language-bash">npm i @socket.io/redis-adapter ioredis</code></pre>
<pre><code class="language-js">import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';

const pub = new Redis(process.env.REDIS_URL);
const sub = pub.duplicate();
io.adapter(createAdapter(pub, sub));</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Chat e mensageria em tempo real.</li>
<li>Notificações push no browser sem service worker.</li>
<li>Painéis ao vivo (métricas, status de pipeline, presença).</li>
<li>Edição colaborativa simples (sem CRDT — para isso prefira Yjs/Automerge).</li>
<li>Multiplayer leve em jogos casuais.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Use <strong>namespaces de eventos</strong> (<code>chat:send</code>, <code>chat:new</code>) — facilita logs e debug.</li>
<li>Sempre autentique no middleware do <code>io.use</code> antes de aceitar conexão.</li>
<li>Valide <strong>todo</strong> payload recebido (Zod, Yup) — cliente pode mandar lixo.</li>
<li>Aplique rate limit por socket para eventos custosos.</li>
<li>Use <code>ack</code> (callback no emit) quando precisar de confirmação.</li>
<li>Em prod com múltiplos pods, sticky sessions no LB <strong>e</strong> adapter Redis.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">WebSocket puro vs Socket.IO</div><div>Use <code>ws</code> quando precisar de WebSocket cru e baixo overhead (proxy, gateway). Socket.IO compensa quando você quer rooms, fallback e reconexão sem reescrever o protocolo.</div></div>

<div class="callout callout-warn"><div class="callout-title">Sticky sessions obrigatórias</div><div>O handshake inicial pode usar HTTP polling. Se o LB roteia cada request para um pod diferente, a conexão nunca completa. Configure <code>ip_hash</code> no NGINX ou cookie-based no ALB.</div></div>`}} />
    </article>
  );
}

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Realtime · intermediario · 7 min"}),e.jsx("h1",{children:"Broadcast e adapters"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>"Broadcast" em sistemas realtime é enviar a mesma mensagem para múltiplos clientes ao mesmo tempo. No Socket.IO, controle quem recebe via <em>rooms</em>, <em>namespaces</em> e operadores como <code>broadcast</code>, <code>to</code> e <code>except</code>.</p>

<h2>Conceito</h2>
<p>Cada cliente conectado vira um <code>socket</code> com id único. Você pode emitir para um socket específico, para todos, ou para um conjunto definido por <em>room</em> (string arbitrária que socket pode entrar/sair).</p>
<pre><code class="language-js">// para todos os clientes (incluindo o remetente)
io.emit('news', data);

// todos exceto o remetente
socket.broadcast.emit('user-joined', socket.id);

// uma room específica
io.to('sala-42').emit('msg', data);

// múltiplas rooms (união)
io.to('a').to('b').emit('news', data);

// excluir clientes/rooms
io.except('banidos').emit('news', data);</code></pre>

<h2>Exemplo prático: chat por sala</h2>
<pre><code class="language-js">io.on('connection', (socket) =&gt; {
  socket.on('join', (sala) =&gt; {
    socket.join(sala);
    socket.to(sala).emit('system', \`\${socket.id} entrou\`);
  });

  socket.on('msg', ({ sala, texto }) =&gt; {
    io.to(sala).emit('msg', { from: socket.id, texto, ts: Date.now() });
  });

  socket.on('disconnecting', () =&gt; {
    for (const sala of socket.rooms) {
      socket.to(sala).emit('system', \`\${socket.id} saiu\`);
    }
  });
});</code></pre>

<h2>Escala horizontal: Redis Adapter</h2>
<p>Em produção você roda N processos (cluster, PM2, Kubernetes). Sem adapter, um <code>io.emit</code> só atinge clientes do mesmo processo. O <code>@socket.io/redis-adapter</code> publica eventos via Pub/Sub para todas as instâncias.</p>
<pre><code class="language-bash">npm i @socket.io/redis-adapter ioredis</code></pre>
<pre><code class="language-js">import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';

const pub = new Redis(process.env.REDIS_URL);
const sub = pub.duplicate();
io.adapter(createAdapter(pub, sub));</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Chat e mensageria entre usuários.</li>
<li>Notificações push em dashboards (preço, métricas).</li>
<li>Multiplayer leve (turnos, lobby).</li>
<li>Colaboração em tempo real (presença, cursors).</li>
<li>Streaming de logs/CI para a UI.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>socket.broadcast.emit</code> ignora o remetente; <code>io.emit</code> não — escolha conscientemente.</li>
<li>Rooms são strings — colisões silenciosas: padronize prefixos (<code>chat:42</code>, <code>user:7</code>).</li>
<li>Sem adapter, <em>sticky session</em> no load balancer é obrigatório, senão handshake quebra.</li>
<li>Mensagens grandes em broadcast estouram banda — pagine ou envie deltas.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Volatile</div><div><code>socket.volatile.emit(...)</code> descarta a mensagem se o cliente não está pronto. Útil para telemetria não-crítica.</div></div>

<div class="callout callout-tip"><div class="callout-title">Ack confirmações</div><div><code>socket.emit('msg', data, (resp) =&gt; { ... })</code> recebe ack do cliente — útil pra confirmar entrega.</div></div>`}})]})}export{i as default};

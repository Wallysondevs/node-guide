import{j as o}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return o.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[o.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Realtime · intermediario · 7 min"}),o.jsx("h1",{children:"Rooms e namespaces"}),o.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>Rooms</strong> e <strong>namespaces</strong> são os dois mecanismos do Socket.IO para segmentar conexões. Confundi-los gera mensagens entregues a quem não deveria — bug clássico em chats e dashboards.</p>

<h2>Conceito</h2>
<p><strong>Namespace</strong> é um endpoint lógico (<code>/admin</code>, <code>/chat</code>). Cada um é um plano de comunicação isolado, com seus próprios handlers e middleware. Definido em design time.</p>
<p><strong>Room</strong> é um agrupamento dinâmico de sockets dentro de um namespace. Sockets entram e saem em runtime. Ideal para "sala de chat", "documento aberto", "canal de notificação por usuário".</p>

<h2>Exemplo prático: chat com rooms</h2>
<pre><code class="language-js">io.on('connection', (socket) =&gt; {
  socket.on('join', (room) =&gt; {
    socket.join(room);
    socket.to(room).emit('system', socket.id + ' entrou');
  });

  socket.on('leave', (room) =&gt; {
    socket.leave(room);
    socket.to(room).emit('system', socket.id + ' saiu');
  });

  socket.on('message', ({ room, text }) =&gt; {
    io.to(room).emit('message', { from: socket.id, text, at: Date.now() });
  });

  socket.on('disconnecting', () =&gt; {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('system', socket.id + ' caiu');
      }
    }
  });
});</code></pre>

<h3>Sala privada por usuário</h3>
<pre><code class="language-js">io.use((socket, next) =&gt; {
  const userId = verifyToken(socket.handshake.auth.token);
  if (!userId) return next(new Error('unauthorized'));
  socket.data.userId = userId;
  next();
});

io.on('connection', (socket) =&gt; {
  socket.join('user:' + socket.data.userId);
});

// em algum lugar do app
io.to('user:42').emit('notification', { title: 'Pedido enviado' });</code></pre>

<h3>Namespaces para áreas distintas</h3>
<pre><code class="language-js">const adminNs = io.of('/admin');
adminNs.use(requireAdmin);
adminNs.on('connection', (socket) =&gt; {
  socket.on('broadcast', (msg) =&gt; io.emit('admin-msg', msg));
});

const chatNs = io.of('/chat');
chatNs.on('connection', (socket) =&gt; { /* ... */ });</code></pre>

<h3>Targeting</h3>
<pre><code class="language-js">io.to('room1').emit('e', data);              // todos na room1
socket.to('room1').emit('e', data);          // todos na room1, exceto este socket
io.in('room1').in('room2').emit('e', data);  // intersecção
io.except('room2').to('room1').emit('e', d); // em room1 mas não em room2

// listar sockets de uma room
const sockets = await io.in('room1').fetchSockets();</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Chat por canal/grupo — uma room por conversa.</li>
<li>Colaboração em documento — uma room por arquivo.</li>
<li>Notificações por usuário — room <code>user:&lt;id&gt;</code>.</li>
<li>Painéis admin separados do app principal — namespace dedicado.</li>
<li>Multiplayer de jogo — uma room por partida; namespace por modo de jogo.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Cada socket entra automaticamente numa room com seu próprio <code>id</code>. Isso aparece em <code>socket.rooms</code>.</li>
<li>Saídas voluntárias (<code>leave</code>) e desconexão limpam rooms automaticamente; não tente "deletar" rooms — elas somem quando vazias.</li>
<li>Em cluster, broadcast para uma room só funciona com <strong>adapter Redis</strong> (<code>@socket.io/redis-adapter</code>).</li>
<li>Namespace é fixo na conexão — não dá para um socket "trocar" de namespace; ele se conecta a outro.</li>
<li>Validar autorização no <code>join</code> é obrigatório — qualquer cliente pode pedir para entrar em qualquer room.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Adapter para escalar</div><div>Sem adapter, cada instância só vê seus próprios sockets. Em prod com mais de um processo, configure o Redis adapter — caso contrário metade dos usuários não recebe broadcasts.</div></div>

<div class="callout callout-tip"><div class="callout-title">Namespaces, não rooms, para auth</div><div>Se a separação é por permissão fixa (admin vs user), prefira namespaces com middleware. Se é por escopo dinâmico (sala de chat X), use rooms.</div></div>`}})]})}export{i as default};

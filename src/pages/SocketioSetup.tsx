export default function SocketioSetup() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Realtime · intermediario · 6 min</div>
      <h1>Socket.IO: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Abstração sobre WebSocket com fallback, rooms, namespaces, broadcast e reconexão automática.</p><pre><code class="language-bash">npm i socket.io</code></pre><pre><code class="language-js">import { Server } from 'socket.io';
import { createServer } from 'node:http';

const server = createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket =&gt; {
  console.log('conectou', socket.id);

  socket.on('chat', msg =&gt; {
    io.emit('chat', { user: socket.id, msg });
  });

  socket.on('disconnect', () =&gt; console.log('saiu'));
});

server.listen(3001);</code></pre>`}} />
    </article>
  );
}

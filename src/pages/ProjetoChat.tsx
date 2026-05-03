export default function ProjetoChat() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · intermediario · 8 min</div>
      <h1>Projeto: chat realtime</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// server.js
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
app.use(express.static('public'));
const http = createServer(app);
const io = new Server(http);

const messages = [];   // em produção: banco
const online = new Set();

io.on('connection', socket =&gt; {
  socket.emit('history', messages.slice(-50));

  socket.on('join', name =&gt; {
    socket.data.name = name;
    online.add(name);
    io.emit('online', [...online]);
  });

  socket.on('msg', text =&gt; {
    const msg = { user: socket.data.name, text, at: Date.now() };
    messages.push(msg);
    io.emit('msg', msg);
  });

  socket.on('disconnect', () =&gt; {
    online.delete(socket.data.name);
    io.emit('online', [...online]);
  });
});

http.listen(3000);</code></pre>`}} />
    </article>
  );
}

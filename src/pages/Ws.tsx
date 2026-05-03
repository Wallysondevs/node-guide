export default function Ws() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Realtime · intermediario · 6 min</div>
      <h1>WebSocket com ws</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i ws</code></pre><pre><code class="language-js">import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, req) =&gt; {
  console.log('cliente:', req.socket.remoteAddress);

  socket.on('message', data =&gt; {
    const msg = JSON.parse(data.toString());
    // broadcast
    wss.clients.forEach(c =&gt; {
      if (c !== socket &amp;&amp; c.readyState === 1) c.send(data.toString());
    });
  });

  socket.on('close', () =&gt; console.log('saiu'));
});</code></pre>`}} />
    </article>
  );
}

export default function SocketioRooms() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Realtime · intermediario · 5 min</div>
      <h1>Rooms e namespaces</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// rooms — agrupa sockets dinamicamente
io.on('connection', socket =&gt; {
  socket.on('join', room =&gt; {
    socket.join(room);
    io.to(room).emit('joined', socket.id);
  });

  socket.on('msg', ({ room, text }) =&gt; {
    io.to(room).emit('msg', { from: socket.id, text });
  });
});

// namespaces — segrega por endpoint
const adminNs = io.of('/admin');
adminNs.on('connection', socket =&gt; { /* ... */ });</code></pre>`}} />
    </article>
  );
}

export default function Presence() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Realtime · intermediario · 5 min</div>
      <h1>Presença online</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">const online = new Map();   // userId → Set&lt;socketId&gt;

io.on('connection', socket =&gt; {
  const userId = socket.handshake.auth.userId;
  if (!online.has(userId)) online.set(userId, new Set());
  online.get(userId).add(socket.id);
  io.emit('presence', { userId, online: true });

  socket.on('disconnect', () =&gt; {
    online.get(userId)?.delete(socket.id);
    if (online.get(userId)?.size === 0) {
      online.delete(userId);
      io.emit('presence', { userId, online: false });
    }
  });
});</code></pre>`}} />
    </article>
  );
}

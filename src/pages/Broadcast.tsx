export default function Broadcast() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Realtime · intermediario · 5 min</div>
      <h1>Broadcast e adapters</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// para todos
io.emit('news', data);

// para todos exceto remetente
socket.broadcast.emit('user-joined', socket.id);

// para uma room
io.to('sala-42').emit('msg', data);

// para vários (exclude)
io.except('banidos').emit('news', data);</code></pre><p>Para escalar Socket.IO em múltiplos processos, use <strong>@socket.io/redis-adapter</strong> — broadcasts atravessam todas as instâncias.</p>`}} />
    </article>
  );
}

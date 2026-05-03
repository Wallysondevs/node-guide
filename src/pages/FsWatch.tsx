export default function FsWatch() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · intermediario · 5 min</div>
      <h1>fs.watch e --watch</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { watch } from 'node:fs/promises';

for await (const event of watch('src', { recursive: true })) {
  console.log(event.eventType, event.filename);
  // 'change' ou 'rename'
}</code></pre><p>Para hot reload em dev, prefira a flag nativa <code>node --watch src/index.js</code> (Node 18.11+) ou <code>tsx watch</code>. Em produção: ignore.</p><div class="callout callout-warn"><div class="callout-title">Limites do SO</div><div>Em projetos grandes você pode estourar <code>inotify</code> no Linux. Aumente <code>fs.inotify.max_user_watches</code>.</div></div>`}} />
    </article>
  );
}

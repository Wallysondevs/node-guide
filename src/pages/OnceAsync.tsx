export default function OnceAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · intermediario · 5 min</div>
      <h1>once e async iteration</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { once, on, EventEmitter } from 'node:events';

const ee = new EventEmitter();

// espera 1 emit
const [data] = await once(ee, 'ready');

// itera todos os eventos
for await (const [evt] of on(ee, 'data')) {
  console.log(evt);
}</code></pre><p>Útil para converter APIs callback/event em async/await.</p>`}} />
    </article>
  );
}

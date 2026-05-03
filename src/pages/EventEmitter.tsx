export default function EventEmitter() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · iniciante · 6 min</div>
      <h1>EventEmitter</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Padrão pub/sub embutido no Node. Quase tudo herda dele: streams, http server, process.</p><pre><code class="language-js">import { EventEmitter } from 'node:events';

const bus = new EventEmitter();

bus.on('login', user =&gt; console.log('hi', user));
bus.on('login', user =&gt; log('audit', user));

bus.emit('login', { id: 1, name: 'Ana' });

bus.off('login', handler);
bus.removeAllListeners('login');
bus.listenerCount('login');</code></pre><div class="callout callout-tip"><div class="callout-title">typed-emitter</div><div>Para tipar eventos em TS, use a lib <code>typed-emitter</code> ou estenda <code>EventEmitter</code> com generics.</div></div>`}} />
    </article>
  );
}

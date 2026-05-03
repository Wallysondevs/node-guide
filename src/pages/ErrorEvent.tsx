export default function ErrorEvent() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · intermediario · 5 min</div>
      <h1>O evento error</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>EventEmitter trata <code>error</code> de forma especial: se ninguém estiver escutando, o processo <strong>crasha</strong>.</p><pre><code class="language-js">const ee = new EventEmitter();
ee.emit('error', new Error('falhou'));   // crash do processo!

// sempre escute:
ee.on('error', err =&gt; console.error(err));</code></pre><div class="callout callout-warn"><div class="callout-title">Em streams</div><div>Sempre adicione listener de <code>error</code> em todo stream que você criar — ou use pipeline.</div></div>`}} />
    </article>
  );
}

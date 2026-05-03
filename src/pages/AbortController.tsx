export default function AbortController() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · intermediario · 6 min</div>
      <h1>AbortController</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>API padrão para cancelar operações async. Substitui timeouts manuais e cancellation tokens.</p><pre><code class="language-js">const ctrl = new AbortController();

setTimeout(() =&gt; ctrl.abort(), 5000);

try {
  const r = await fetch(url, { signal: ctrl.signal });
} catch (e) {
  if (e.name === 'AbortError') console.log('cancelado');
}

// timers, fs, eventos — todos aceitam signal
import { setTimeout as wait } from 'node:timers/promises';
await wait(1000, undefined, { signal: ctrl.signal });</code></pre>`}} />
    </article>
  );
}

export default function AbortAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 6 min</div>
      <h1>Cancelando async</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Combine <code>AbortController</code> com timers e fetch para timeouts robustos.</p><pre><code class="language-js">import { setTimeout as wait } from 'node:timers/promises';

async function withTimeout(promise, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() =&gt; ctrl.abort(), ms);
  try {
    return await Promise.race([
      promise,
      wait(ms, undefined, { signal: ctrl.signal }).then(() =&gt; {
        throw new Error('timeout');
      }),
    ]);
  } finally {
    clearTimeout(t);
  }
}</code></pre>`}} />
    </article>
  );
}

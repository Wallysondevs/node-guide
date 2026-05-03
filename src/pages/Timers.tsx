export default function Timers() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · iniciante · 5 min</div>
      <h1>setTimeout, setInterval, setImmediate</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">setTimeout(() =&gt; console.log('1s'), 1000);
const id = setInterval(() =&gt; tick(), 100);
clearInterval(id);

setImmediate(() =&gt; console.log('próxima iteração'));

// versão promise (Node 16+)
import { setTimeout as wait, setInterval as ticker } from 'node:timers/promises';

await wait(2000);
for await (const _ of ticker(1000)) {
  console.log('a cada segundo');
}</code></pre>`}} />
    </article>
  );
}

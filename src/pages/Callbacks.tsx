export default function Callbacks() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · iniciante · 5 min</div>
      <h1>Callbacks</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Convenção histórica: erro como primeiro argumento, resultado como segundo.</p><pre><code class="language-js">import fs from 'node:fs';

fs.readFile('config.json', 'utf8', (err, data) =&gt; {
  if (err) return console.error(err);
  console.log(JSON.parse(data));
});</code></pre><h2>Promisify</h2><pre><code class="language-js">import { promisify } from 'node:util';
const readFileP = promisify(fs.readFile);
const data = await readFileP('config.json', 'utf8');</code></pre><div class="callout callout-warn"><div class="callout-title">Callback hell</div><div>Aninhar muito é insustentável. Refatore para promises ou async/await.</div></div>`}} />
    </article>
  );
}

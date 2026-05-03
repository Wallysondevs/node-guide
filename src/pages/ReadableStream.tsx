export default function ReadableStream() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 7 min</div>
      <h1>Readable streams</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Stream que <strong>emite</strong> dados. Modos: <em>flowing</em> (push) e <em>paused</em> (pull). Use <code>for await</code> para consumir.</p><pre><code class="language-js">import { createReadStream } from 'node:fs';

const rs = createReadStream('big.log', { encoding: 'utf8', highWaterMark: 64 * 1024 });

// API moderna
for await (const chunk of rs) {
  console.log(chunk.length);
}

// API tradicional
rs.on('data', chunk =&gt; console.log(chunk.length));
rs.on('end', () =&gt; console.log('fim'));
rs.on('error', err =&gt; console.error(err));</code></pre><h2>Criando próprio</h2><pre><code class="language-js">import { Readable } from 'node:stream';

const r = Readable.from(['a', 'b', 'c']);     // de iterável
const r2 = Readable.from(asyncGen());          // async generator</code></pre>`}} />
    </article>
  );
}

export default function Transform() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 6 min</div>
      <h1>Transform streams</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Lê e escreve — transforma dados. Ex: gzip, criptografia, parsing.</p><pre><code class="language-js">import { Transform } from 'node:stream';

const upperCase = new Transform({
  transform(chunk, enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  }
});

process.stdin.pipe(upperCase).pipe(process.stdout);</code></pre><pre><code class="language-js">// transform como async generator
import { Readable } from 'node:stream';

async function* mapStream(source, fn) {
  for await (const x of source) yield fn(x);
}

const out = Readable.from(mapStream(input, x =&gt; x * 2));</code></pre>`}} />
    </article>
  );
}

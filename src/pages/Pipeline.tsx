export default function Pipeline() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 6 min</div>
      <h1>pipe e pipeline</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>pipeline</code> conecta streams e gerencia erros, fechamento e backpressure automaticamente. <strong>Sempre</strong> prefira <code>pipeline</code> a <code>.pipe()</code> manual.</p><pre><code class="language-js">import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz')
);
console.log('feito');</code></pre><div class="callout callout-warn"><div class="callout-title">.pipe() vaza</div><div><code>.pipe()</code> manual não propaga erros corretamente nem fecha streams downstream em caso de erro upstream.</div></div>`}} />
    </article>
  );
}

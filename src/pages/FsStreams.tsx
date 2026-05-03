export default function FsStreams() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · intermediario · 7 min</div>
      <h1>Streams de arquivo</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Para arquivos grandes (>100MB) você não quer carregar tudo em memória. Use streams.</p><pre><code class="language-js">import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('huge.log'),
  createGzip(),
  createWriteStream('huge.log.gz')
);</code></pre><p><code>pipeline</code> garante limpeza correta de erros e fechamento de descriptors. Sempre prefira a <code>.pipe()</code> manual.</p>`}} />
    </article>
  );
}

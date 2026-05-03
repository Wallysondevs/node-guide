export default function WritableStream() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 9 min</div>
      <h1>Writable streams</h1>
      <div dangerouslySetInnerHTML={{__html: `
<p>Um <strong>Writable</strong> é um destino de dados em pedaços: arquivo, socket, resposta HTTP, stdout. A interface controla buffer interno, sinaliza backpressure e te avisa quando fechar.</p>

<h2>Conceito</h2>
<ul>
<li><code>write(chunk)</code> — devolve <code>false</code> quando o buffer interno excedeu <code>highWaterMark</code>.</li>
<li>Nesse caso, espere o evento <code>'drain'</code> antes de escrever de novo.</li>
<li><code>end([chunk], cb)</code> finaliza o stream e libera recursos.</li>
<li>Escute <code>'error'</code> sempre — Writable não rejeita promise.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { createWriteStream } from 'node:fs';

const ws = createWriteStream('out.log', { flags: 'a' });

async function writeMany(ws, lines) {
  for (const line of lines) {
    if (!ws.write(line + '\\n')) {
      // buffer cheio — espere drain antes de continuar
      await new Promise(resolve =&gt; ws.once('drain', resolve));
    }
  }
  await new Promise((res, rej) =&gt; ws.end(err =&gt; err ? rej(err) : res()));
}

ws.on('error', console.error);
await writeMany(ws, Array.from({ length: 100_000 }, (_, i) =&gt; 'linha ' + i));</code></pre>

<h3>pipeline (a forma correta)</h3>
<pre><code class="language-js">import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('big.log'),
  createGzip(),
  createWriteStream('big.log.gz'),
);
// fecha tudo, propaga erros, respeita backpressure</code></pre>

<h3>Próprio Writable</h3>
<pre><code class="language-js">import { Writable } from 'node:stream';

class UpperOut extends Writable {
  _write(chunk, enc, cb) {
    process.stdout.write(chunk.toString().toUpperCase());
    cb();
  }
}

const out = new UpperOut();
out.write('hello\\n');
out.end();</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Gerar arquivos grandes (CSV, NDJSON) sem segurar tudo em memória.</li>
<li>Comprimir/descomprimir on the fly em pipelines.</li>
<li>Servir downloads grandes via <code>res</code> em servidor HTTP.</li>
<li>Forwardar dados para sockets/processos filhos.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Ignorar o retorno de <code>write</code> faz a memória crescer sem limite.</li>
<li>Esquecer de tratar <code>'error'</code> derruba o processo (uncaught).</li>
<li>Não chame <code>write</code> depois de <code>end</code>: <code>ERR_STREAM_WRITE_AFTER_END</code>.</li>
<li>Em Node 16+ use sempre <code>stream/promises.pipeline</code>; ele cuida de tudo.</li>
<li>Em modo objeto (<code>objectMode: true</code>), o tamanho do buffer é por item, não por byte.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">finished()</div><div><code>import {{ finished }} from 'node:stream/promises'</code> espera um stream terminar (sucesso ou erro) sem precisar montar listeners.</div></div>

<div class="callout callout-warn"><div class="callout-title">Não use .pipe() sem cuidado</div><div>O método <code>.pipe()</code> antigo não propaga erros nem fecha tudo na falha. <code>pipeline()</code> resolve isso.</div></div>
`}} />
    </article>
  );
}

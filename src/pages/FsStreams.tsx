export default function FsStreams() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · intermediario · 9 min</div>
      <h1>Streams de arquivo</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Streams permitem processar arquivos pedaço por pedaço, mantendo o uso de memória constante (tipicamente 64KB de buffer) independente do tamanho do arquivo. Essencial para logs, vídeos, dumps de banco e qualquer coisa acima de algumas dezenas de MB.</p>

<h2>Conceito</h2>
<p><code>createReadStream</code> retorna um <code>Readable</code>; <code>createWriteStream</code>, um <code>Writable</code>. Conecte-os com <code>pipeline()</code> de <code>node:stream/promises</code> — ele propaga erros, fecha file descriptors e respeita backpressure automaticamente.</p>
<pre><code class="language-js">import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('huge.log'),
  createGzip(),
  createWriteStream('huge.log.gz')
);</code></pre>

<h2>Iterar linha a linha</h2>
<pre><code class="language-js">import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('access.log'),
  crlfDelay: Infinity,
});

let total = 0;
for await (const line of rl) {
  if (line.includes(' 500 ')) total++;
}
console.log('5xx:', total);</code></pre>

<h2>Exemplo prático: servidor de download eficiente</h2>
<pre><code class="language-js">import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';

createServer(async (req, res) =&gt; {
  const file = './videos/curso.mp4';
  const { size } = statSync(file);
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': size,
  });
  try {
    await pipeline(createReadStream(file), res);
  } catch (err) {
    if (err.code !== 'ERR_STREAM_PREMATURE_CLOSE') console.error(err);
  }
}).listen(3000);</code></pre>

<h2>Opções úteis</h2>
<ul>
<li><code>highWaterMark</code>: tamanho do buffer (default 64KB). Aumentar acelera I/O sequencial.</li>
<li><code>start</code>/<code>end</code>: bytes inicial e final — base para HTTP Range requests.</li>
<li><code>encoding: 'utf8'</code>: emite strings em vez de Buffers.</li>
<li><code>flags: 'a'</code> em <code>createWriteStream</code>: append.</li>
</ul>

<h2>Casos de uso</h2>
<ul>
<li>Compactar logs no rotate sem estourar memória.</li>
<li>Servir vídeo/áudio com Range para seek do player.</li>
<li>Importar CSVs gigantes processando linha a linha.</li>
<li>Fazer hash SHA-256 streaming: <code>createHash('sha256').update(chunk)</code>.</li>
<li>Pipe entre processos: <code>spawn</code> + stdin/stdout do filho.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Esquecer de tratar <code>error</code>: <code>.pipe()</code> não propaga. Sempre <code>pipeline()</code>.</li>
<li>Backpressure: chamar <code>write()</code> em loop sem checar o retorno enche memória — use pipeline.</li>
<li>Streams pausam em <code>'data'</code> handler removido; cuidado com event listeners temporários.</li>
<li>Arquivos pequenos (&lt;1MB) não compensam o overhead — use <code>readFile</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">pipeline &gt; pipe</div><div>O método <code>.pipe()</code> ainda existe mas vaza file descriptors em erros. Use sempre <code>pipeline()</code> de <code>node:stream/promises</code>.</div></div>

<div class="callout callout-info"><div class="callout-title">Web Streams</div><div>Node 18+ suporta <code>ReadableStream</code> da spec Web. <code>Readable.toWeb()</code> converte. Útil quando o consumidor é fetch ou Response.</div></div>`}} />
    </article>
  );
}

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Streams & Buffers · intermediario · 8 min"}),e.jsx("h1",{children:"pipe e pipeline"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><code>pipeline</code> conecta streams e gerencia erros, fechamento e backpressure automaticamente. Em código moderno, <strong>sempre</strong> prefira <code>pipeline</code> ao <code>.pipe()</code> manual.</p>

<h2>Conceito</h2>
<p>Streams formam uma cadeia: <em>readable → transform → writable</em>. Cada elo precisa propagar erros e fechamento corretamente. <code>.pipe()</code> não faz isso — se o destino falha, a fonte fica aberta consumindo memória.</p>
<pre><code class="language-js">// RUIM
src.pipe(gzip).pipe(dst);
// se dst der erro, src e gzip continuam abertos</code></pre>

<h2>Exemplo prático: comprimir arquivo</h2>
<pre><code class="language-js">import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz')
);
console.log('feito');</code></pre>

<h2>Cancelamento com AbortSignal</h2>
<pre><code class="language-js">import { pipeline } from 'node:stream/promises';

const ac = new AbortController();
setTimeout(() =&gt; ac.abort(), 5_000);

try {
  await pipeline(src, transform, dst, { signal: ac.signal });
} catch (err) {
  if (err.name === 'AbortError') console.log('cancelado');
  else throw err;
}</code></pre>

<h2>Transform inline com async generator</h2>
<pre><code class="language-js">import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('users.csv'),
  async function* (source) {
    source.setEncoding('utf8');
    for await (const chunk of source) {
      yield chunk.toUpperCase();
    }
  },
  createWriteStream('out.csv')
);</code></pre>

<div class="callout callout-info"><div class="callout-title">Backpressure grátis</div><div><code>pipeline</code> respeita o ritmo do sink. Se a escrita está lenta, a leitura pausa automaticamente — sem comer RAM.</div></div>

<h2>HTTP: pipe de upload</h2>
<pre><code class="language-js">import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';

app.post('/upload', async (req, res, next) =&gt; {
  try {
    await pipeline(req, createWriteStream('/tmp/file.bin'));
    res.json({ ok: true });
  } catch (err) { next(err); }
});</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Cópia/transformação de arquivos grandes.</li>
<li>Compressão (gzip, brotli) de respostas HTTP.</li>
<li>ETL: ler CSV/JSONL → transformar → gravar em DB.</li>
<li>Proxy de upload/download sem buffer intermediário.</li>
<li>Qualquer fluxo onde o tamanho excede a RAM disponível.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Não use <code>.pipe()</code> em produção</strong> — não propaga erros.</li>
<li>Importe de <code>node:stream/promises</code>, não <code>node:stream</code> (versão promisificada).</li>
<li>Streams já consumidos não podem ser repipeados — recrie a fonte.</li>
<li>Em Node 18+ existe <code>readable.compose()</code> como alternativa fluente.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">.pipe() vaza</div><div><code>.pipe()</code> manual não propaga erros corretamente nem fecha streams downstream em caso de erro upstream. É a causa #1 de file descriptor leaks em servidores Node antigos.</div></div>`}})]})}export{t as default};

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Streams & Buffers · intermediario · 8 min"}),e.jsx("h1",{children:"Transform streams"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Um <strong>Transform</strong> é simultaneamente Readable e Writable: você escreve chunks de um lado e lê (transformados) do outro. Compressão, criptografia, parsing CSV, tradução de encoding — tudo é Transform.</p>

<h2>Conceito</h2>
<p>Você implementa um método <code>_transform(chunk, encoding, callback)</code>. Recebe o chunk, faz o trabalho, chama <code>callback(err, output)</code>. Opcionalmente <code>_flush(cb)</code> para emitir dados pendentes ao fim do input.</p>

<pre><code class="language-js">import { Transform } from 'node:stream';

const upper = new Transform({
  transform(chunk, enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

process.stdin.pipe(upper).pipe(process.stdout);</code></pre>

<h2>Exemplo prático: parser de CSV linha a linha</h2>
<pre><code class="language-js">import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';

class LineSplitter extends Transform {
  constructor(opts) {
    super({ ...opts, readableObjectMode: true });
    this.buffer = '';
  }
  _transform(chunk, enc, cb) {
    this.buffer += chunk.toString('utf8');
    const lines = this.buffer.split('\\n');
    this.buffer = lines.pop() ?? '';
    for (const line of lines) this.push(line);
    cb();
  }
  _flush(cb) {
    if (this.buffer) this.push(this.buffer);
    cb();
  }
}

class CsvToObject extends Transform {
  constructor(opts) {
    super({ ...opts, objectMode: true });
    this.headers = null;
  }
  _transform(line, enc, cb) {
    const cols = line.split(',');
    if (!this.headers) {
      this.headers = cols;
      return cb();
    }
    const obj = Object.fromEntries(this.headers.map((h, i) =&gt; [h, cols[i]]));
    cb(null, obj);
  }
}

await pipeline(
  createReadStream('users.csv'),
  new LineSplitter(),
  new CsvToObject(),
  async function* (source) {
    for await (const obj of source) {
      console.log(obj);
    }
  },
);</code></pre>

<h3>Transform como async generator (forma moderna)</h3>
<pre><code class="language-js">import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

async function* mapStream(source, fn) {
  for await (const chunk of source) yield fn(chunk);
}

async function* filterStream(source, fn) {
  for await (const chunk of source) {
    if (fn(chunk)) yield chunk;
  }
}

await pipeline(
  Readable.from([1, 2, 3, 4, 5]),
  (s) =&gt; mapStream(s, (n) =&gt; n * 2),
  (s) =&gt; filterStream(s, (n) =&gt; n &gt; 4),
  async function* (source) {
    for await (const n of source) console.log(n); // 6, 8, 10
  },
);</code></pre>

<h3>Transforms nativos prontos</h3>
<pre><code class="language-js">import { createGzip, createGunzip, createBrotliCompress } from 'node:zlib';
import { createCipheriv, createDecipheriv } from 'node:crypto';

await pipeline(
  createReadStream('app.log'),
  createGzip(),
  createWriteStream('app.log.gz'),
);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Compressão (gzip, brotli, deflate) em respostas HTTP grandes.</li>
<li>Criptografia/descriptografia de arquivos antes de upload/download.</li>
<li>Parsing incremental de formatos linha-a-linha (CSV, NDJSON, logs).</li>
<li>Conversão de encoding (latin1 → utf8) em pipes de processo.</li>
<li>Sanitização ou redação de dados sensíveis em logs em trânsito.</li>
<li>Limitar throughput (throttle) ou tamanho com pequenos transforms.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Sempre chame <code>callback</code>, mesmo que com <code>cb()</code> sem dados, ou o pipeline trava.</li>
<li>Em parsing, mantenha um buffer interno para chunks que cortam no meio de um registro.</li>
<li>Use <code>objectMode</code> para transformar em estruturas (objetos), não bytes.</li>
<li>Trate erros propagando para o <code>callback</code>: <code>cb(err)</code>. <code>pipeline</code> rejeita corretamente.</li>
<li>Prefira <code>pipeline</code> sobre <code>.pipe()</code> — propaga erros e fecha tudo no fim.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">_flush para drenar</div><div>Quando o input acaba, <code>_transform</code> não é mais chamado. Se você acumulou estado (como o último chunk de CSV sem newline), emita-o em <code>_flush</code> antes de sinalizar fim.</div></div>

<div class="callout callout-tip"><div class="callout-title">Generators vs classes</div><div>Para transforms simples e ad-hoc, async generators dentro de <code>pipeline</code> são mais limpos. Para componentes reutilizáveis com configuração, classe Transform tem cara mais profissional.</div></div>`}})]})}export{t as default};

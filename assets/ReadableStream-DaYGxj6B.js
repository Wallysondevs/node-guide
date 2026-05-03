import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function d(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Streams & Buffers · intermediario · 9 min"}),e.jsx("h1",{children:"Readable streams"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Um <strong>Readable</strong> é uma fonte de dados que entrega chunks em vez de tudo de uma vez. Permite processar arquivos enormes, respostas HTTP e pipes de processo sem estourar memória.</p>

<h2>Conceito</h2>
<p>Modos de operação:</p>
<ul>
<li><strong>Paused (pull)</strong> — você chama <code>read()</code> ou consome via <code>for await</code>. Padrão moderno.</li>
<li><strong>Flowing (push)</strong> — eventos <code>'data'</code> chegam automaticamente. Pode causar perda de dados se não houver listener.</li>
</ul>
<p>Eventos: <code>'data'</code>, <code>'end'</code>, <code>'error'</code>, <code>'close'</code>, <code>'readable'</code>. Cada chunk é normalmente um <code>Buffer</code> ou <code>string</code> se você definir <code>encoding</code>.</p>

<h2>Exemplo prático: lendo um arquivo grande</h2>
<pre><code class="language-js">import { createReadStream } from 'node:fs';

const stream = createReadStream('huge.log', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024,
});

let lines = 0;
let buffer = '';

for await (const chunk of stream) {
  buffer += chunk;
  const parts = buffer.split('\\n');
  buffer = parts.pop() ?? '';
  lines += parts.length;
}
console.log('linhas:', lines);</code></pre>

<h3>Criando um Readable customizado</h3>
<pre><code class="language-js">import { Readable } from 'node:stream';

class CounterStream extends Readable {
  constructor(max) {
    super({ objectMode: true });
    this.i = 0;
    this.max = max;
  }
  _read() {
    if (this.i &lt; this.max) this.push({ n: this.i++ });
    else this.push(null);
  }
}

for await (const obj of new CounterStream(5)) {
  console.log(obj);
}</code></pre>

<h3>Readable.from() — atalho moderno</h3>
<pre><code class="language-js">import { Readable } from 'node:stream';

async function* gen() {
  for (let i = 0; i &lt; 1000; i++) yield JSON.stringify({ i }) + '\\n';
}

const stream = Readable.from(gen());
stream.pipe(process.stdout);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Processar logs ou CSVs com gigabytes sem carregar tudo na RAM.</li>
<li>Streamar download de S3 direto para o cliente HTTP.</li>
<li>Transformar dados em tempo real (gzip, criptografar, parser line-by-line).</li>
<li>Adaptar fontes assíncronas (cursor de DB, fila) a APIs que esperam stream.</li>
<li>Implementar SSE/streaming HTTP de respostas longas (tokens de LLM).</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Backpressure de graça</div><div>Quando você usa <code>pipeline</code> ou <code>for await</code>, o consumo lento freia automaticamente o produtor. Em modo flowing manual com <code>'data'</code>, você precisa respeitar o retorno de <code>write()</code> no destino.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li>Não consumir um stream o deixa pendurado segurando file descriptors — feche com <code>stream.destroy()</code>.</li>
<li>Misturar <code>'data'</code> e <code>for await</code> coloca o stream em flowing e perde chunks.</li>
<li>Esquecer de tratar <code>'error'</code> derruba o processo. Use <code>pipeline()</code> que propaga erros corretamente.</li>
<li><code>highWaterMark</code> muito baixo = muitas trocas de contexto; alto demais = picos de memória.</li>
<li>Em <code>objectMode</code>, o <code>highWaterMark</code> conta itens, não bytes.</li>
</ul>

<h3>pipeline é o jeito certo</h3>
<pre><code class="language-js">import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz'),
);</code></pre>

<div class="callout callout-tip"><div class="callout-title">Web Streams interop</div><div>Desde o Node 18, converta com <code>Readable.toWeb(node)</code> e <code>Readable.fromWeb(web)</code>. Útil para usar <code>fetch().body</code> dentro de pipelines Node.</div></div>`}})]})}export{d as default};

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Streams & Buffers · intermediario · 9 min"}),e.jsx("h1",{children:"Web Streams"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p>Node 18+ implementa <code>ReadableStream</code>, <code>WritableStream</code> e <code>TransformStream</code> compatíveis com a Web Streams API do browser. É o que <code>fetch</code> usa para body em ambos os ambientes.</p>

<h2>Conceito</h2>
<p>Web Streams são a API <em>standard</em> de fluxo de bytes/objetos. Vantagens sobre os streams Node clássicos: portabilidade browser/Node/Cloudflare/Deno, melhor backpressure por design e composição com <code>pipeThrough</code>.</p>

<pre><code class="language-js">// criar Readable
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
    controller.enqueue('b');
    controller.close();
  }
});

for await (const chunk of stream) console.log(chunk);</code></pre>

<h2>Exemplo prático: consumir fetch</h2>
<pre><code class="language-js">const res = await fetch('https://api.example.com/big.ndjson');
const reader = res.body
  .pipeThrough(new TextDecoderStream())
  .getReader();

let buffer = '';
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  buffer += value;
  let nl;
  while ((nl = buffer.indexOf('\\n')) !== -1) {
    const line = buffer.slice(0, nl);
    buffer = buffer.slice(nl + 1);
    if (line) console.log(JSON.parse(line));
  }
}</code></pre>

<h3>TransformStream</h3>
<pre><code class="language-js">const upper = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

await fetch('https://api.com/data')
  .then(r =&gt; r.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(upper)
    .pipeTo(new WritableStream({
      write(chunk) { process.stdout.write(chunk); }
    })));</code></pre>

<h3>Interop com Node streams</h3>
<pre><code class="language-js">import { Readable, Writable } from 'node:stream';

// web -&gt; node
const nodeReadable = Readable.fromWeb(res.body);
// node -&gt; web
const webReadable = Readable.toWeb(nodeReadable);</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Código que precisa rodar em browser, Cloudflare Workers, Deno e Node.</li>
<li>Consumir <code>fetch</code> de forma incremental.</li>
<li>Compor pipelines com <code>pipeThrough</code> de forma declarativa.</li>
<li>Servir respostas em streaming em frameworks modernos (Next, Hono).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Backpressure é por <code>desiredSize</code> do controller — não tem <code>drain</code>.</li>
<li>Esqueça de <code>.releaseLock()</code> e o stream fica preso.</li>
<li>Performance ainda fica atrás dos Node streams clássicos em I/O puro de arquivo.</li>
<li>Iteração com <code>for await</code> em <code>ReadableStream</code> só funciona em Node 18+.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Quando usar Node streams</div><div>Para arquivos locais e pipelines internos do Node, <code>node:stream</code> ainda é mais rápido e idiomático. Web Streams brilham na borda do sistema.</div></div>
`}})]})}export{t as default};

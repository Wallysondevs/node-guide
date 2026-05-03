export default function Buffer() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams &amp; Buffers · intermediario · 8 min</div>
      <h1>Buffer</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>Buffer</code> é a representação de dados binários em Node — uma fatia de memória <em>fora do heap V8</em>. É um <code>Uint8Array</code> com helpers para encoding, slicing e I/O. Sempre que você lê arquivo, recebe pacote TCP ou usa crypto, está manipulando Buffers.</p>

<h2>Conceito</h2>
<p>Bytes são bytes — strings precisam de um <em>encoding</em> para virar Buffer (e vice-versa). Confundir UTF-8 com Latin-1 causa "caracteres estranhos". Lembre que muitos caracteres ocupam mais de 1 byte em UTF-8.</p>
<pre><code class="language-js">const b1 = Buffer.from('olá', 'utf8');
const b2 = Buffer.alloc(16);          // 16 bytes zerados
const b3 = Buffer.allocUnsafe(16);    // mais rápido, conteúdo aleatório

b1.length;                  // 4 bytes (não 3 chars!)
b1.toString('utf8');        // 'olá'
b1.toString('hex');         // 'c3b36cc3a1'
b1.toString('base64');      // 'w7Nsw6E='</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const buf = await readFile('foto.jpg');     // Buffer de bytes da imagem
console.log('tamanho:', buf.length);

const sha = createHash('sha256').update(buf).digest('hex');
console.log('hash:', sha);

// concatenar pedaços
const partes = [Buffer.from('hello '), Buffer.from('world')];
const todo = Buffer.concat(partes);

// fatiar (compartilha memória, não copia!)
const slice = todo.subarray(0, 5);   // 'hello'</code></pre>

<h2>Encodings suportados</h2>
<ul>
<li><strong>utf8</strong> (padrão) — texto Unicode.</li>
<li><strong>hex</strong> — cada byte vira 2 chars hexadecimais.</li>
<li><strong>base64</strong> / <strong>base64url</strong> — transporte seguro em JSON/URL.</li>
<li><strong>latin1</strong> — 1 byte por char (não use para texto Unicode).</li>
<li><strong>utf16le</strong>, <strong>ucs2</strong> — interop com sistemas antigos.</li>
</ul>

<h2>Quando usar</h2>
<ul>
<li>Ler/escrever arquivos binários (imagens, PDFs).</li>
<li>Crypto: <code>createHash</code>, <code>createCipheriv</code>, HMAC.</li>
<li>Parser de protocolos binários (TCP, protobuf, MessagePack).</li>
<li>Concatenar chunks recebidos via stream.</li>
<li>Encoding/decoding base64 para JWT, embed em JSON.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>Buffer.byteLength('olá', 'utf8')</code> = 4, mas <code>'olá'.length</code> = 3 — não confunda.</li>
<li><code>allocUnsafe</code> é rápido mas pode vazar dados antigos da memória — só use se for sobrescrever tudo.</li>
<li><code>subarray</code> e <code>slice</code> compartilham a memória do original — modificar um afeta o outro. Use <code>Buffer.from(buf)</code> para copiar.</li>
<li>Buffers grandes ficam em <em>memory pool</em> separado — visíveis em <code>process.memoryUsage().external</code>.</li>
<li><code>JSON.stringify(buf)</code> serializa como <code>{"type":"Buffer","data":[...]}</code> — geralmente não é o que você quer.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Buffer é Uint8Array</div><div>Toda API que aceita <code>Uint8Array</code> (Web Crypto, fetch body, streams Web) aceita Buffer direto.</div></div>

<div class="callout callout-warn"><div class="callout-title">Concatenar com +</div><div>Não use <code>buf1 + buf2</code> — vira string via <code>toString()</code>. Use <code>Buffer.concat([b1, b2])</code>.</div></div>`}} />
    </article>
  );
}

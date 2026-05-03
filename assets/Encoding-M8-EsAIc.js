import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Streams & Buffers · iniciante · 7 min"}),e.jsx("h1",{children:"Encodings"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Encoding é o mapeamento entre <strong>bytes</strong> (o que circula em arquivos, sockets, buffers) e <strong>caracteres</strong> (o que humanos leem). Confundir os dois é causa #1 de bugs com acentos, emojis e dados binários corrompidos.</p>

<h2>Conceito</h2>
<p>JavaScript guarda strings internamente em UTF-16. Quando você converte para bytes (e vice-versa), precisa declarar o encoding. Os principais suportados pelo Node:</p>
<ul>
<li><code>utf8</code> (padrão) — universal, 1-4 bytes por caractere. Use sempre que possível.</li>
<li><code>utf16le</code> — 2-4 bytes, little-endian. Algumas APIs Windows.</li>
<li><code>ascii</code> — 7 bits, perde tudo fora do inglês básico.</li>
<li><code>latin1</code> (ISO-8859-1) — 8 bits, alguns caracteres ocidentais.</li>
<li><code>hex</code> — representação textual de bytes (cada byte vira 2 chars).</li>
<li><code>base64</code> / <code>base64url</code> — empacota binário em texto seguro (~33% maior).</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// Bytes vs caracteres
const buf = Buffer.from('café', 'utf8');
buf.length;                  // 5  bytes  (c=1, a=1, f=1, é=2)
'café'.length;               // 4  unidades UTF-16
[...'café'].length;          // 4  code points
[...'😀'].length;            // 1  code point (mas '😀'.length === 2)

// Converter entre formatos
const hex = buf.toString('hex');           // '636166c3a9'
const b64 = buf.toString('base64');        // 'Y2Fmw6k='
const back = Buffer.from(b64, 'base64').toString('utf8');  // 'café'

// Ler arquivo como texto x binário
import { readFile } from 'node:fs/promises';
const txt = await readFile('a.txt', 'utf8');     // string
const bin = await readFile('a.png');              // Buffer

// TextEncoder/TextDecoder (padrão Web API)
const enc = new TextEncoder();
const dec = new TextDecoder('utf-8');
const bytes = enc.encode('Olá');           // Uint8Array(4)
const text  = dec.decode(bytes);           // 'Olá'</code></pre>

<p>Streams e encoding:</p>
<pre><code class="language-js">import { createReadStream } from 'node:fs';

// Sem encoding: emite Buffers
createReadStream('big.txt').on('data', (chunk) =&gt; console.log(chunk));

// Com encoding: emite strings (cuidado em chunks que partem char multibyte)
createReadStream('big.txt', { encoding: 'utf8' }).on('data', (s) =&gt; console.log(s));</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Salvar/ler texto: <strong>sempre</strong> utf8.</li>
<li>Anexar arquivo binário em JSON/JWT: base64/base64url.</li>
<li>Hash em formato legível: hex (32 chars para SHA-128, 64 para SHA-256).</li>
<li>Calcular tamanho real em bytes para limite de upload: <code>Buffer.byteLength(s, 'utf8')</code>.</li>
<li>Conversões entre APIs Web (Uint8Array) e Node (Buffer).</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">String.length mente</div><div>Para limitar tamanho de input em bytes (ex.: BD VARCHAR), use <code>Buffer.byteLength</code>. <code>'😀'.length === 2</code> por causa de UTF-16 surrogate pairs — não é o número de caracteres nem de bytes.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Chunk parte caractere</strong>: ler stream com <code>encoding</code> resolve, mas concatenar Buffers e converter no final pode partir um caractere multibyte. Use <code>StringDecoder</code>.</li>
<li><strong>Latin1 vs UTF-8</strong>: arquivos antigos do Windows vêm em Latin1/CP1252 — declare o encoding correto.</li>
<li><strong>BOM (byte order mark)</strong>: arquivos UTF-8 do Excel começam com <code>EF BB BF</code> — remova ao parsear.</li>
<li><strong>Base64 sem padding</strong>: prefira <code>base64url</code> em URLs (sem <code>+</code>, <code>/</code>, <code>=</code>).</li>
<li><strong>JSON.stringify de Buffer</strong>: serializa como objeto <code>{ type: 'Buffer', data: [...] }</code> — converta para base64 antes.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Detectando encoding</div><div>Use o pacote <code>chardet</code> ou <code>jschardet</code> para adivinhar encoding de arquivos legados. Em CSVs do Excel, geralmente é <code>windows-1252</code>.</div></div>`}})]})}export{s as default};

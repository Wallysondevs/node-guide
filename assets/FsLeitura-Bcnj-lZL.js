import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"fs · iniciante · 8 min"}),e.jsx("h1",{children:"Lendo arquivos"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Ler arquivo em Node tem três sabores e cada um tem seu lugar: <strong>promises</strong> (default moderno), <strong>callback</strong> (legado) e <strong>sync</strong> (só para inicialização e CLIs). Saber qual usar evita a maior pegadinha de servidor Node: bloquear o event loop.</p>

<h2>Conceito</h2>
<ul>
<li><code>node:fs/promises</code> — versão async/await, retorna <code>Promise</code>.</li>
<li><code>node:fs</code> (callbacks) — API original, raramente necessária hoje.</li>
<li><code>node:fs</code> (Sync) — bloqueia a thread; usar só fora do hot path.</li>
</ul>
<p>Para arquivos grandes, prefira <strong>streams</strong> em vez de carregar tudo na memória.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { readFile } from 'node:fs/promises';

// texto: passa encoding e recebe string
const text = await readFile('config.json', 'utf8');
const config = JSON.parse(text);

// binário: sem encoding = Buffer
const buf = await readFile('foto.jpg');
console.log(buf.byteLength);</code></pre>

<h3>Sync — startup e CLIs</h3>
<pre><code class="language-js">import { readFileSync } from 'node:fs';

const cfg = JSON.parse(readFileSync('config.json', 'utf8'));</code></pre>

<h3>Streams para arquivos grandes</h3>
<pre><code class="language-js">import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('access.log', { encoding: 'utf8' }),
  crlfDelay: Infinity,
});

let count = 0;
for await (const line of rl) {
  if (line.includes(' 500 ')) count++;
}
console.log({ erros: count });</code></pre>

<h3>Lendo só parte do arquivo</h3>
<pre><code class="language-js">import { open } from 'node:fs/promises';

const fh = await open('arquivo.bin', 'r');
const { buffer, bytesRead } = await fh.read({
  buffer: Buffer.alloc(1024),
  position: 0,
  length: 1024,
});
await fh.close();</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Carregar config/segredos no boot.</li>
<li>Servir arquivos pequenos via HTTP (favicon, html estático).</li>
<li>Processar logs grandes linha-a-linha (stream + readline).</li>
<li>Ler chunks específicos de binários (parsers de formato).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Sem <code>encoding</code>, você recebe <code>Buffer</code>. Esquecer isso é fonte clássica de bugs com texto.</li>
<li><code>readFileSync</code> em servidor HTTP trava todas as conexões enquanto lê — proibido no hot path.</li>
<li>Arquivos grandes carregados com <code>readFile</code> matam memória; use streams.</li>
<li>Caminhos relativos dependem de <code>process.cwd()</code>, não da localização do script. Use <code>import.meta.dirname</code> + <code>path.join</code>.</li>
<li>Erros vêm como <code>ENOENT</code> (não existe), <code>EACCES</code> (permissão), <code>EISDIR</code>. Trate com try/catch.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Nunca em request handler</div><div><code>readFileSync</code> bloqueia o event loop. Em servidor HTTP, todas as conexões esperam — incluindo health checks.</div></div>

<div class="callout callout-tip"><div class="callout-title">Cache</div><div>Se um config raramente muda, leia uma vez no boot e mantenha em memória. Reler a cada request é desperdício.</div></div>`}})]})}export{i as default};

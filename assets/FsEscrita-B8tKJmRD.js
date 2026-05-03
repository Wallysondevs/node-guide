import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"fs · iniciante · 7 min"}),e.jsx("h1",{children:"Escrevendo arquivos"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Escrever arquivo em Node parece trivial — e é, até você precisar garantir atomicidade, lidar com encoding ou descobrir que dois processos estão escrevendo no mesmo arquivo. O módulo <code>node:fs/promises</code> resolve a maioria dos casos com poucas funções.</p>

<h2>Conceito</h2>
<p>As três operações principais:</p>
<ul>
<li><code>writeFile(path, data)</code> — substitui o arquivo inteiro.</li>
<li><code>appendFile(path, data)</code> — adiciona ao fim.</li>
<li><code>open(path, flags).createWriteStream()</code> — escrita em chunks (grandes volumes).</li>
</ul>
<p>Aceitam <code>string</code>, <code>Buffer</code> ou <code>Uint8Array</code>. Encoding default para string é <code>utf-8</code>.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { writeFile, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const dir = 'logs';
await mkdir(dir, { recursive: true });

await writeFile(path.join(dir, 'out.txt'), 'olá\\n');
await appendFile(path.join(dir, 'out.txt'), 'mais uma linha\\n');

const obj = { id: 1, ok: true };
await writeFile('data.json', JSON.stringify(obj, null, 2));</code></pre>

<h3>Escrita atômica (write + rename)</h3>
<p><code>writeFile</code> não é atômico — se o processo morrer no meio, o arquivo fica truncado/corrompido. Padrão clássico: escrever em <code>.tmp</code> e renomear.</p>
<pre><code class="language-js">import { writeFile, rename } from 'node:fs/promises';

async function writeAtomic(target, data) {
  const tmp = target + '.tmp.' + process.pid;
  await writeFile(tmp, data);
  await rename(tmp, target);
}

await writeAtomic('data.json', JSON.stringify(state));</code></pre>
<p><code>rename</code> dentro do mesmo filesystem é atômico no POSIX; o arquivo final ou está totalmente escrito ou continua na versão antiga.</p>

<h3>Streams para arquivos grandes</h3>
<pre><code class="language-js">import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  generateRows(),
  createWriteStream('export.csv', { highWaterMark: 64 * 1024 }),
);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Logs em disco (append).</li>
<li>Persistência de configuração/cache em JSON.</li>
<li>Exportar relatórios CSV/NDJSON via stream.</li>
<li>Salvar uploads recebidos via HTTP.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>writeFile</code> com flag default (<code>'w'</code>) <strong>trunca</strong> o arquivo. Use <code>'a'</code> para appendar ou <code>'wx'</code> para falhar se já existir.</li>
<li>Não escreva concorrentemente no mesmo arquivo — sem locks você corrompe.</li>
<li><code>fsync</code> não é chamado por padrão; em caso de power-loss os bytes podem ainda estar no cache do SO. Use <code>fileHandle.sync()</code> se precisar de durabilidade real.</li>
<li>Evite ler o arquivo, modificar e escrever de volta sem proteção — é uma race condition clássica.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Cuidado com diretórios</div><div><code>writeFile</code> não cria pastas intermediárias. Faça <code>mkdir(dir, { recursive: true })</code> antes.</div></div>

<div class="callout callout-tip"><div class="callout-title">Permissões</div><div>Defina o modo com <code>{ mode: 0o600 }</code> para arquivos sensíveis (segredos). Por padrão o umask do processo decide.</div></div>`}})]})}export{t as default};

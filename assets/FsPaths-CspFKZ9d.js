import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"fs · iniciante · 8 min"}),e.jsx("h1",{children:"path: cross-platform"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>O módulo <code>node:path</code> normaliza, monta e decompõe caminhos respeitando o sistema operacional. Concatenar strings com <code>+</code> ou <code>/</code> quebra no Windows e produz bugs sutis em Linux/macOS quando há barras duplas, <code>..</code> não resolvido ou separadores trocados.</p>

<h2>Conceito</h2>
<p>Existem duas variantes acessíveis: <code>path.posix</code> (sempre <code>/</code>) e <code>path.win32</code> (sempre <code>\\</code>). O default <code>path</code> escolhe a do SO em runtime. Para URLs e identificadores web use sempre <code>path.posix</code>; para tocar o filesystem local use o default.</p>
<pre><code class="language-js">import path from 'node:path';

path.join('users', 'ana', 'docs');     // 'users/ana/docs' (posix) ou 'users\\ana\\docs' (win)
path.resolve('src', 'index.js');       // caminho absoluto a partir do cwd
path.normalize('a//b/../c');           // 'a/c'
path.isAbsolute('/etc');               // true
path.relative('/a/b', '/a/c/d');       // '../c/d'</code></pre>

<h2>Decompor caminhos</h2>
<pre><code class="language-js">path.basename('/a/b/foo.tar.gz');      // 'foo.tar.gz'
path.basename('/a/b/foo.tar.gz', '.gz');// 'foo.tar'
path.dirname('/a/b/foo.js');           // '/a/b'
path.extname('foo.tar.gz');            // '.gz'  (apenas a última extensão)
path.parse('/a/foo.js');
// { root: '/', dir: '/a', base: 'foo.js', name: 'foo', ext: '.js' }
path.format({ dir: '/a', name: 'foo', ext: '.js' }); // '/a/foo.js'</code></pre>

<h2>Exemplo prático: resolver caminhos relativos ao módulo</h2>
<p>Em ESM não existe <code>__dirname</code>. Use <code>import.meta.url</code> com <code>fileURLToPath</code>:</p>
<pre><code class="language-js">import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const config = await readFile(path.join(__dirname, 'config.json'), 'utf8');</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Montar caminhos para ler/gravar arquivos sem se preocupar com o SO.</li>
<li>Validar uploads: rejeitar nomes que escapem do diretório destino (path traversal).</li>
<li>Calcular caminhos relativos para gerar imports ou logs legíveis.</li>
<li>Servir assets estáticos calculando o root via <code>path.resolve</code>.</li>
<li>Extrair extensão para escolher Content-Type.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Path traversal</strong>: usuário envia <code>../../etc/passwd</code>. Sempre faça <code>path.resolve(base, userInput)</code> e verifique que o resultado começa com <code>base</code>.</li>
<li><code>path.join</code> aceita <code>..</code> e os resolve; <code>path.resolve</code> também converte para absoluto. Não confunda com URLs — para isso use <code>new URL()</code>.</li>
<li>No Windows, <code>path.sep</code> é <code>\\</code>. Loga isso pode quebrar JSON se não escapar.</li>
<li><code>path.extname('Makefile')</code> retorna <code>''</code>; arquivos sem ponto não têm extensão.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Sanitize uploads</div><div>const safe = path.resolve(uploadDir, name); if (!safe.startsWith(uploadDir + path.sep)) throw new Error('path traversal');</div></div>

<div class="callout callout-tip"><div class="callout-title">URLs ≠ paths</div><div>Para URLs use <code>new URL(rel, base)</code>. Para paths de arquivo, <code>path</code>. Misturar gera bugs no Windows porque o construtor de URL exige <code>/</code>.</div></div>`}})]})}export{t as default};

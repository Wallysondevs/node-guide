import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"path/os/url · intermediario · 7 min"}),e.jsx("h1",{children:"path: casos avançados"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>O módulo <code>node:path</code> manipula caminhos de forma cross-platform. Conhecer os métodos avançados evita bugs de Windows/Linux e ataques de path traversal.</p>

<h2>Conceito</h2>
<p>Caminhos no Node são strings, mas a interpretação muda por SO: separador (<code>/</code> vs <code>\\\\</code>), case-sensitivity, drive letters. Use sempre <code>path</code> em vez de concatenar strings manualmente.</p>
<pre><code class="language-js">import path from 'node:path';

path.join('a', 'b', '..', 'c');       // 'a/c'
path.resolve('foo', 'bar');           // '/cwd/foo/bar' (absoluto)
path.normalize('a//b/./c/../d');      // 'a/b/d'
path.relative('/a/b/c', '/a/d');      // '../../d'
path.parse('/x/y/file.tar.gz');
// { root:'/', dir:'/x/y', base:'file.tar.gz', name:'file.tar', ext:'.gz' }</code></pre>

<h2>Exemplo prático: validar path dentro de um diretório</h2>
<pre><code class="language-js">import path from 'node:path';

function safeJoin(base, userPath) {
  const target = path.resolve(base, userPath);
  if (!target.startsWith(path.resolve(base) + path.sep)) {
    throw new Error('path traversal detected');
  }
  return target;
}

safeJoin('/var/uploads', '../../etc/passwd'); // throws
safeJoin('/var/uploads', 'user/avatar.png');  // ok</code></pre>

<div class="callout callout-warn"><div class="callout-title">Path traversal</div><div>Nunca passe input do usuário direto para <code>fs</code>. Sempre resolva e cheque o prefixo. Usar <code>..</code> ou caminhos absolutos é o vetor clássico de RCE/leak.</div></div>

<h2>POSIX vs Windows</h2>
<pre><code class="language-js">import path from 'node:path';

// força semântica POSIX mesmo no Windows
path.posix.join('a', 'b');     // 'a/b'
path.win32.join('a', 'b');     // 'a\\\\b'

// detectar
path.sep;                       // '/' ou '\\\\'
path.delimiter;                 // ':' ou ';' (PATH env)</code></pre>

<h2>__dirname em ESM</h2>
<pre><code class="language-js">// Node 20.11+ tem o atalho:
import.meta.dirname;
import.meta.filename;

// Compat antiga:
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);</code></pre>

<h2>Quando usar cada função</h2>
<ul>
<li><code>join</code>: monta caminho relativo, normaliza separadores.</li>
<li><code>resolve</code>: converte para absoluto, ideal antes de checar acesso.</li>
<li><code>relative</code>: gera caminho de A para B (útil em logs e imports gerados).</li>
<li><code>parse/format</code>: extrair extensão, trocar nome preservando dir.</li>
<li><code>isAbsolute</code>: validar input antes de juntar com base.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>path.join('/a', '/b')</code> retorna <code>/a/b</code>; <code>path.resolve('/a', '/b')</code> retorna <code>/b</code> (segundo absoluto reseta tudo).</li>
<li>No Windows, <code>C:foo</code> é caminho relativo ao CWD do drive C — bizarro mas legal.</li>
<li><code>path.extname('.gitignore')</code> retorna <code>''</code> (não <code>.gitignore</code>).</li>
<li>Trailing slashes podem importar em comparações: normalize antes.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Dica</div><div>Para listar arquivos com filtro, combine <code>fs.readdir</code> + <code>path.extname</code>. Para padrões mais ricos, use <code>fs.glob</code> (Node 22+) ou <code>fast-glob</code>.</div></div>`}})]})}export{i as default};

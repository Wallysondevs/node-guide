export default function FsStat() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · iniciante · 6 min</div>
      <h1>Stat, exists e tipo</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Antes de ler, mover ou deletar um arquivo é comum precisar saber se ele existe, seu tamanho, mtime ou se é diretório/symlink. Use <code>stat</code> e <code>access</code> de <code>node:fs/promises</code>.</p>

<h2>Conceito</h2>
<p><code>stat()</code> retorna metadados (tamanho, datas, tipo, permissões). <code>access()</code> apenas testa permissão. Não existe mais <code>fs.exists</code> oficial — é deprecated. O padrão moderno é "tente abrir e trate o erro" (TOCTOU-safe).</p>
<pre><code class="language-js">import { stat, access, constants } from 'node:fs/promises';

const s = await stat('package.json');
s.size;         // bytes
s.mtime;        // Date
s.isFile();     // true/false
s.isDirectory();
s.isSymbolicLink();
s.mode;         // permissões (octal)</code></pre>

<h2>Verificar existência sem race condition</h2>
<pre><code class="language-js">import { readFile } from 'node:fs/promises';

try {
  const data = await readFile('config.json', 'utf8');
  // usa data
} catch (err) {
  if (err.code === 'ENOENT') {
    // arquivo não existe — fallback
  } else {
    throw err;
  }
}</code></pre>
<p>Esse padrão evita TOCTOU: entre <code>exists()</code> e <code>open()</code> outro processo pode deletar o arquivo. Tentar direto é atômico.</p>

<h2>Exemplo prático: listar tamanho e mtime</h2>
<pre><code class="language-js">import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

async function listar(dir) {
  const entries = await readdir(dir);
  const out = await Promise.all(entries.map(async (name) =&gt; {
    const full = path.join(dir, name);
    const s = await stat(full);
    return {
      name,
      size: s.size,
      modified: s.mtime.toISOString(),
      kind: s.isDirectory() ? 'dir' : 'file',
    };
  }));
  return out.sort((a, b) =&gt; b.size - a.size);
}

console.table(await listar('.'));</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Cache de arquivos: comparar <code>mtime</code> com timestamp do cache.</li>
<li>Pré-validar uploads (tamanho máximo, tipo).</li>
<li>Limpar arquivos antigos: <code>Date.now() - s.mtimeMs &gt; 7*24*3600*1000</code>.</li>
<li>Diferenciar arquivo, diretório e symlink antes de recursão.</li>
<li>Conditional GET: gerar <code>ETag</code>/<code>Last-Modified</code> a partir de <code>mtime</code> e <code>size</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>stat</code> segue symlinks; use <code>lstat</code> se quer info do link em si.</li>
<li><code>access</code> não garante nada para o próximo open: só evita tentar quando obviamente não dá.</li>
<li>Permissões em Windows são limitadas — <code>mode</code> não reflete ACLs.</li>
<li><code>mtime</code> tem precisão de ms em sistemas modernos, mas pode ter resolução de 1s em FS antigos.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não use exists()</div><div>É deprecated e cria race conditions. Use try/catch em volta da operação real.</div></div>

<div class="callout callout-info"><div class="callout-title">Códigos comuns</div><div><code>ENOENT</code> (não existe), <code>EACCES</code> (sem permissão), <code>EISDIR</code> (esperava arquivo), <code>ENOTDIR</code> (esperava diretório).</div></div>`}} />
    </article>
  );
}

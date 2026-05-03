export default function FsStat() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · iniciante · 4 min</div>
      <h1>Stat, exists e tipo</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { stat, access, constants } from 'node:fs/promises';

try {
  const s = await stat('arquivo.txt');
  s.isFile();        // true
  s.isDirectory();
  s.size;            // bytes
  s.mtime;           // last modified
} catch (e) {
  if (e.code === 'ENOENT') console.log('não existe');
}

// checagem de existência
try { await access('foo', constants.R_OK); } catch { /* sem permissão */ }</code></pre><div class="callout callout-tip"><div class="callout-title">Não use existsSync()</div><div>É anti-padrão TOCTOU. Tente abrir e trate o erro <code>ENOENT</code>.</div></div>`}} />
    </article>
  );
}

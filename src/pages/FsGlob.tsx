export default function FsGlob() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · intermediario · 7 min</div>
      <h1>Glob e walk</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Listar arquivos por padrão (<em>glob</em>) é comum em CLIs, build tools e scripts. Node 22+ traz um <code>glob</code> nativo; em versões anteriores, <code>fast-glob</code> é o padrão. Para casos simples, basta caminhar o diretório com <code>readdir</code>.</p>

<h2>Conceito</h2>
<p>Padrões glob:</p>
<ul>
<li><code>*</code> — qualquer coisa em um nível.</li>
<li><code>**</code> — qualquer profundidade.</li>
<li><code>{a,b}</code> — alternativas.</li>
<li><code>?</code> — um único caractere.</li>
<li><code>!padrão</code> ou <code>ignore</code> — exclui.</li>
</ul>

<h2>Glob nativo (Node 22+)</h2>
<pre><code class="language-js">import { glob } from 'node:fs/promises';

for await (const file of glob('src/**/*.{ts,tsx}')) {
  console.log(file);
}

const files = [];
for await (const f of glob(['**/*.md', '!node_modules/**'])) {
  files.push(f);
}</code></pre>

<h2>fast-glob (qualquer versão)</h2>
<pre><code class="language-bash">npm i fast-glob</code></pre>
<pre><code class="language-js">import fg from 'fast-glob';

const files = await fg(['src/**/*.ts', '!**/*.test.ts'], {
  dot: false,
  absolute: true,
  ignore: ['**/node_modules/**'],
});</code></pre>

<h2>Walk recursivo manual</h2>
<p>Quando você precisa de controle fino (filtrar por <code>stat</code>, parar cedo), use <code>readdir</code> com <code>withFileTypes</code>.</p>
<pre><code class="language-js">import { readdir } from 'node:fs/promises';
import path from 'node:path';

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

for await (const file of walk('src')) {
  console.log(file);
}</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>CLIs que recebem padrões na linha de comando (<code>eslint 'src/**/*.ts'</code>).</li>
<li>Build tools coletando entradas e templates.</li>
<li>Scripts de migração que processam arquivos por extensão.</li>
<li>Watchers de mudança baseados em padrões.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>O shell pode <em>expandir</em> o glob antes de chegar no Node — sempre passe entre aspas: <code>'src/**/*.ts'</code>.</li>
<li>Padrões com <code>**</code> em árvores grandes podem ser lentos; use <code>ignore</code> agressivo.</li>
<li>O <code>glob</code> nativo é assíncrono iterável — não devolve Array por padrão.</li>
<li>Em Windows, separadores são <code>\\\\</code>; <code>fast-glob</code> normaliza para <code>/</code>.</li>
<li>Symlinks podem causar loops infinitos no walk manual — desligue ou detecte.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Performance</div><div><code>fast-glob</code> é em geral mais rápido que o nativo porque usa paralelismo agressivo e cache de stat. Para CLIs pesados, ele ainda vale a pena.</div></div>

<div class="callout callout-info"><div class="callout-title">.gitignore aware</div><div>Use <code>globby</code> com <code>{ gitignore: true }</code> para respeitar arquivos ignorados pelo Git automaticamente.</div></div>`}} />
    </article>
  );
}

export default function FsLeitura() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · iniciante · 6 min</div>
      <h1>Lendo arquivos</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O módulo <code>fs</code> tem três sabores: <strong>callback</strong> (legado), <strong>sync</strong> (bloqueia) e <strong>promises</strong> (recomendado). Use <code>node:fs/promises</code>.</p><pre><code class="language-js">import { readFile } from 'node:fs/promises';

const text = await readFile('config.json', 'utf8');
const data = JSON.parse(text);

const buf = await readFile('foto.jpg');  // sem encoding = Buffer</code></pre><h2>Sync — só em CLIs e startup</h2><pre><code class="language-js">import { readFileSync } from 'node:fs';
const cfg = JSON.parse(readFileSync('config.json', 'utf8'));</code></pre><div class="callout callout-warn"><div class="callout-title">Nunca em request handler</div><div><code>readFileSync</code> bloqueia o event loop. Em servidor HTTP isso trava todas as conexões.</div></div>`}} />
    </article>
  );
}

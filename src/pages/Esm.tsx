export default function Esm() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 7 min</div>
      <h1>ES Modules (import/export)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Padrão moderno. Ative com <code>"type": "module"</code> no package.json ou use extensão <code>.mjs</code>. Carregamento <strong>assíncrono</strong> e estático.</p><pre><code class="language-js">// math.js
export function soma(a, b) { return a + b; }
export const PI = 3.14;
export default function multiplicar(a, b) { return a * b; }

// app.js
import multiplicar, { soma, PI } from './math.js';
import * as math from './math.js';
import { readFile } from 'node:fs/promises';

// dynamic import
const mod = await import('./plugin.js');</code></pre><div class="callout callout-warn"><div class="callout-title">Extensão obrigatória</div><div>Em ESM você sempre precisa do <code>.js</code> nos imports relativos. Sem extensão = erro.</div></div><pre><code class="language-js">// __dirname não existe em ESM. Equivalente:
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);</code></pre>`}} />
    </article>
  );
}

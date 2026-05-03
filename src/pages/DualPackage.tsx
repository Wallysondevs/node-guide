export default function DualPackage() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · avancado · 10 min</div>
      <h1>Dual ESM + CJS</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Publicar uma biblioteca para ser consumida por <strong>ambos</strong> CJS (<code>require</code>) e ESM (<code>import</code>) requer construir os dois formatos e expor cada um com <code>exports</code> condicionais. É um trade-off: maior compatibilidade vs risco do &quot;dual package hazard&quot;.</p>

<h2>Conceito</h2>
<p>Os campos <code>main</code>, <code>module</code> e <code>types</code> existem por compatibilidade legada. O que <strong>realmente</strong> importa em Node moderno é o campo <code>exports</code>: ele define o que cada importador recebe, baseado em condições como <code>import</code>, <code>require</code>, <code>types</code>, <code>node</code>, <code>browser</code>.</p>

<h2>Exemplo prático</h2>
<p>Estrutura típica do projeto:</p>
<pre><code class="language-bash">my-lib/
├── package.json
├── src/
│   └── index.ts
├── dist/
│   ├── esm/
│   │   ├── index.js
│   │   └── index.d.ts
│   └── cjs/
│       ├── index.cjs
│       └── index.d.cts</code></pre>

<p><code>package.json</code> com exports condicionais:</p>
<pre><code class="language-json">{
  "name": "my-lib",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/cjs/index.cjs",
  "module": "./dist/esm/index.js",
  "types": "./dist/esm/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/esm/index.d.ts",
        "default": "./dist/esm/index.js"
      },
      "require": {
        "types": "./dist/cjs/index.d.cts",
        "default": "./dist/cjs/index.cjs"
      }
    },
    "./package.json": "./package.json"
  },
  "files": ["dist"],
  "sideEffects": false
}</code></pre>

<p>Build com <code>tsup</code> (cobre 99% dos casos sem dor):</p>
<pre><code class="language-bash">npm i -D tsup typescript</code></pre>
<pre><code class="language-ts">// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  sourcemap: true,
  splitting: false,
  treeshake: true,
});</code></pre>

<pre><code class="language-bash">npx tsup
# gera dist/index.js (ESM), dist/index.cjs e .d.ts/.d.cts</code></pre>

<p>Testando em ambos consumidores:</p>
<pre><code class="language-js">// consumer-esm/index.mjs
import { hello } from 'my-lib';
console.log(hello());

// consumer-cjs/index.cjs
const { hello } = require('my-lib');
console.log(hello());</code></pre>

<h2>Quando publicar dual</h2>
<ul>
<li>Sua lib tem usuários legados em CJS (Express middlewares, ferramentas de CLI antigas).</li>
<li>Você quer trabalhar em harmonia com bundlers (webpack/Vite) e Node nativo.</li>
<li>Sua API é pequena e estável — o dual hazard fica gerenciável.</li>
</ul>

<h2>Quando publicar só ESM</h2>
<ul>
<li>Lib nova, audience moderna (Node 20+, frameworks atuais).</li>
<li>Usa top-level <code>await</code> ou ESM-only deps (<code>node-fetch</code> v3+, <code>chalk</code> v5+).</li>
<li>Reduz superfície de bugs e build time.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Dual Package Hazard</div><div>Se uma app importa sua lib em CJS (via <code>require</code>) e outra dependência a importa em ESM, o Node carrega <strong>duas instâncias</strong> com estados separados. Singletons, caches internos e <code>instanceof</code> quebram. Mantenha a lib stateless quando possível.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Ordem de <code>exports</code></strong>: condições mais específicas primeiro (<code>types</code> antes de <code>default</code>).</li>
<li><strong>Extensão dos arquivos</strong>: ESM precisa terminar em <code>.js</code> (com <code>type: module</code>) ou <code>.mjs</code>; CJS em <code>.cjs</code>.</li>
<li><strong><code>__dirname</code> não existe em ESM</strong> — use <code>fileURLToPath(import.meta.url)</code>.</li>
<li><strong>Subpath exports</strong>: para múltiplos entry points, mapeie cada um (<code>&quot;./utils&quot;: { ... }</code>).</li>
<li><strong>Tipos divergentes</strong>: garanta <code>.d.ts</code> e <code>.d.cts</code> para que o TS resolva corretamente em ambos os modos.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Verifique antes de publicar</div><div>Use <code>npx @arethetypeswrong/cli .</code> e <code>publint</code> para auditar o <code>package.json</code> e detectar problemas comuns de dual publishing.</div></div>`}} />
    </article>
  );
}

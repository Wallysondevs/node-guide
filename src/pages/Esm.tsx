export default function Esm() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 9 min</div>
      <h1>ES Modules (import/export)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><strong>ES Modules</strong> (ESM) é o sistema oficial de módulos do JavaScript, padronizado pela ECMAScript. Roda nativamente em browsers e em Node 14+. Em projetos novos é o default — ative com <code>&quot;type&quot;: &quot;module&quot;</code> no <code>package.json</code> ou use a extensão <code>.mjs</code>.</p>

<h2>Conceito</h2>
<p>ESM é <strong>estático</strong>: os imports são analisados antes da execução, permitindo tree-shaking e detecção de erros cedo. O carregamento é <strong>assíncrono</strong>, suporta top-level <code>await</code> e usa URLs (com extensão obrigatória) para resolver módulos.</p>
<p>Difere de CommonJS em pontos importantes: imports/exports são vínculos vivos (não cópias), <code>this</code> não existe no escopo do módulo, não há <code>__dirname</code>/<code>__filename</code> automaticamente.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// math.js
export function soma(a, b) { return a + b; }
export const PI = 3.14;
export default function multiplicar(a, b) { return a * b; }

// app.js
import multiplicar, { soma, PI } from './math.js';
import * as math from './math.js';            // namespace
import { readFile } from 'node:fs/promises';  // built-in com prefixo node:
import express from 'express';                 // pacote npm

console.log(soma(2, 3), multiplicar(4, 5));

// Top-level await — só em ESM
const config = JSON.parse(await readFile('./config.json', 'utf8'));

// Dynamic import — funciona em CJS também
const mod = await import('./plugin.js');
mod.default();</code></pre>

<p>Equivalentes para <code>__dirname</code>/<code>__filename</code>:</p>
<pre><code class="language-js">import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const dataPath = join(__dirname, 'data', 'users.json');</code></pre>

<p>Re-exports e barrel files:</p>
<pre><code class="language-js">// services/index.js
export { UserService } from './user.js';
export { OrderService } from './order.js';
export * from './errors.js';</code></pre>

<p><code>package.json</code> mínimo para ESM:</p>
<pre><code class="language-json">{
  "name": "minha-app",
  "type": "module",
  "main": "src/index.js",
  "scripts": { "start": "node src/index.js" }
}</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Projetos novos em Node 18+ (default na comunidade).</li>
<li>Quando você precisa de top-level <code>await</code> (carregar config, conectar BD na inicialização).</li>
<li>Bibliotecas que rodam tanto em browser quanto Node.</li>
<li>Para usar pacotes ESM-only (<code>chalk</code> v5, <code>node-fetch</code> v3, <code>ora</code> v6).</li>
<li>Tree-shaking efetivo em libs publicadas.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Extensão obrigatória</div><div>Em ESM <strong>sempre</strong> inclua a extensão em imports relativos: <code>import './foo.js'</code>, não <code>import './foo'</code>. TypeScript com <code>moduleResolution: 'NodeNext'</code> exige escrever <code>.js</code> mesmo importando arquivo <code>.ts</code>.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>JSON imports</strong>: precisam de assert: <code>import data from './x.json' with { type: 'json' }</code>.</li>
<li><strong>Mistura com CJS</strong>: você pode <code>import</code> CJS (Node converte), mas <code>require</code> ESM falha — use dynamic import.</li>
<li><strong>Caches diferentes</strong>: o cache de módulos ESM e CJS são separados — instâncias podem duplicar.</li>
<li><strong>this no topo</strong>: é <code>undefined</code> em ESM (era <code>module.exports</code> em CJS).</li>
<li><strong>Hoisting de imports</strong>: imports são içados antes da execução; código inline antes do import roda <strong>depois</strong> de imports resolverem.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Migração gradual</div><div>Você pode ter um pacote CJS e arquivos ESM com extensão <code>.mjs</code> (ou vice-versa com <code>.cjs</code>). Útil em monorepos legacy.</div></div>`}} />
    </article>
  );
}

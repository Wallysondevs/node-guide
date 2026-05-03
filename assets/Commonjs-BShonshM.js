import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function d(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Módulos · iniciante · 8 min"}),e.jsx("h1",{children:"CommonJS (require)"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>CommonJS (CJS) é o sistema de módulos histórico do Node, ainda dominante em milhões de pacotes. Usa <code>require()</code> síncrono e <code>module.exports</code>. Conhecer CJS é obrigatório mesmo em projetos novos ESM — você inevitavelmente integra com libs CJS.</p>

<h2>Conceito</h2>
<p>Cada arquivo é um módulo. <code>require</code> resolve o caminho, executa o arquivo (uma única vez — resultado é cacheado em <code>require.cache</code>) e devolve o que foi atribuído a <code>module.exports</code>.</p>
<pre><code class="language-js">// math.js
function soma(a, b) { return a + b; }
function mult(a, b) { return a * b; }

module.exports = { soma, mult };
// ou: module.exports.soma = soma;
// ou: exports.soma = soma;   (cuidado com reatribuição)

// app.js
const { soma } = require('./math');
const path = require('node:path');           // built-in
const fs = require('node:fs/promises');      // submódulo</code></pre>

<h2>Variáveis "mágicas" do CJS</h2>
<p>Em todo módulo CJS você tem disponíveis sem importar:</p>
<ul>
<li><code>__dirname</code> — diretório do arquivo atual.</li>
<li><code>__filename</code> — caminho absoluto do arquivo.</li>
<li><code>module</code>, <code>exports</code>, <code>require</code>.</li>
</ul>
<pre><code class="language-js">const cfgPath = require('node:path').join(__dirname, 'config.json');</code></pre>

<h2>Exemplo prático: module pattern</h2>
<pre><code class="language-js">// counter.js
let count = 0;
module.exports = {
  inc: () =&gt; ++count,
  get: () =&gt; count,
};

// um.js
const c1 = require('./counter');
c1.inc(); c1.inc();

// dois.js
const c2 = require('./counter');
console.log(c2.get());   // 2 — mesmo módulo, mesmo state (cacheado)</code></pre>

<h2>Resolução de paths</h2>
<ol>
<li>Built-ins (<code>node:fs</code>, <code>node:path</code>) ganham prioridade.</li>
<li>Caminhos relativos (<code>./</code>, <code>../</code>) e absolutos.</li>
<li><code>node_modules</code> escalando para cima até a raiz.</li>
<li>Resolve <code>main</code>/<code>exports</code> do <code>package.json</code>.</li>
</ol>

<h2>Quando usar CJS</h2>
<ul>
<li>Bibliotecas que precisam suportar versões antigas de Node (&lt; 14).</li>
<li>Projetos legados sem orçamento para migração.</li>
<li>Scripts simples de ferramentas internas.</li>
<li>Compatibilidade com pacotes que ainda não publicam ESM.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>require</code> é <strong>síncrono</strong>: bloqueia o event loop. Não dá pra fazer <em>code splitting</em> dinâmico decente.</li>
<li><code>exports = ...</code> não funciona — quebra a referência. Sempre <code>module.exports = ...</code>.</li>
<li>Importar pacote ESM-only em CJS exige <code>await import()</code>.</li>
<li>Cache pode mascarar bugs em testes — use <code>delete require.cache[require.resolve(...)]</code> com cuidado.</li>
<li>Dependências circulares retornam <code>module.exports</code> parcialmente preenchido.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">CJS dentro de ESM</div><div>Em ESM você pode <code>import x from './legacy.cjs'</code> — Node resolve. Mas <code>require</code> não existe em ESM (use <code>createRequire</code>).</div></div>

<div class="callout callout-tip"><div class="callout-title">Transição</div><div>Adote <code>"type": "module"</code> em projetos novos. Quando precisar de CJS pontual, renomeie para <code>.cjs</code>.</div></div>`}})]})}export{d as default};

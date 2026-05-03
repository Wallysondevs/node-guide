import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Async · iniciante · 8 min"}),e.jsx("h1",{children:"async/await"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><code>async/await</code> é açúcar sintático sobre Promises. Permite escrever código assíncrono com aparência sequencial, sem perder concorrência. <strong>Toda função <code>async</code> retorna Promise</strong>; um <code>throw</code> dentro dela vira <em>rejection</em>.</p>

<h2>Conceito</h2>
<p>Quando você usa <code>await</code>, a função pausa até a Promise resolver ou rejeitar. Outras partes do programa (event loop, I/O) continuam normalmente. Só faz sentido dentro de <code>async</code> ou no topo de um módulo ESM.</p>
<pre><code class="language-js">async function carregaPerfil(id) {
  const user = await db.user(id);
  // execuções paralelas: dispare antes do await
  const [posts, friends] = await Promise.all([
    db.posts(id),
    db.friends(id),
  ]);
  return { user, posts, friends };
}</code></pre>

<h2>Exemplo prático: tratamento de erros</h2>
<pre><code class="language-js">import { setTimeout as wait } from 'node:timers/promises';

async function buscaComRetry(url, tentativas = 3) {
  for (let i = 1; i &lt;= tentativas; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
      return await r.json();
    } catch (e) {
      if (i === tentativas) throw e;
      await wait(2 ** i * 100);   // backoff exponencial
    }
  }
}</code></pre>

<h2>Sequencial vs paralelo</h2>
<p>O erro mais comum é <code>await</code> em loop quando podia ser paralelo:</p>
<pre><code class="language-js">// LENTO: cada fetch espera o anterior
for (const id of ids) {
  const u = await fetch(\`/u/\${id}\`);
}

// RÁPIDO: dispara todos, espera junto
const todos = await Promise.all(ids.map(id =&gt; fetch(\`/u/\${id}\`)));</code></pre>

<h2>Top-level await (ESM)</h2>
<pre><code class="language-js">// index.mjs
const cfg = await import('./config.js');
const db  = await connect(cfg.url);
export { db };</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Qualquer I/O: HTTP, banco, fs, streams via async iterators.</li>
<li>Composição de chamadas dependentes onde clareza importa mais que micro-otimização.</li>
<li>Inicialização de módulos (top-level await em ESM).</li>
<li>Testes (await em <code>it/test</code> simplifica asserts).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Esquecer o <code>await</code> — a Promise vira <em>floating</em> e erros somem em <code>unhandledRejection</code>.</li>
<li>Usar <code>forEach</code> com função async: ele não espera; use <code>for...of</code> ou <code>Promise.all(map(...))</code>.</li>
<li><code>try/catch</code> em volta de funções async externas: lembre que rejeições viram exceções aqui.</li>
<li>Top-level await em ESM bloqueia <em>imports</em> dependentes — não use para tarefas longas.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Promise.allSettled</div><div>Quando você quer continuar mesmo se algumas falharem, use <code>Promise.allSettled</code> — recebe um array de resultados com <code>status: 'fulfilled' | 'rejected'</code>.</div></div>

<div class="callout callout-warn"><div class="callout-title">unhandledRejection</div><div>Em Node 15+, rejeições não tratadas terminam o processo. Sempre use <code>try/catch</code> em handlers HTTP ou wrappers como <code>express-async-errors</code>.</div></div>`}})]})}export{i as default};

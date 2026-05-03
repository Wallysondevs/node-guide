import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Fundamentos JS · iniciante · 9 min"}),e.jsx("h1",{children:"Funções e arrow"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Funções são cidadãs de primeira classe em JS: você passa, retorna e armazena. Em Node, escolher entre <code>function</code>, expressão e arrow afeta hoisting, <code>this</code>, e legibilidade de stack traces.</p>

<h2>Conceito</h2>
<pre><code class="language-js">function soma(a, b) { return a + b; }       // declaração — hoisted (chamável antes)
const sub = function(a, b) { return a - b; }; // expressão — não hoisted
const mul = (a, b) =&gt; a * b;                 // arrow — sem this/arguments próprios
const named = function fat(n) { return n &lt;= 1 ? 1 : n * fat(n-1); }; // expressão nomeada (auto-ref)</code></pre>

<h2>Parâmetros modernos</h2>
<pre><code class="language-js">// default + rest + destructuring
function send({ to, subject = 'sem assunto', ...rest } = {}) {
  return { to, subject, extra: rest };
}

// rest captura argumentos restantes em array
function max(...nums) { return Math.max(...nums); }

// IIFE — escopo isolado, padrão pré-ESM
(() =&gt; { console.log('roda já'); })();</code></pre>

<h2>this lexical das arrows</h2>
<pre><code class="language-js">class Counter {
  count = 0;
  inc = () =&gt; this.count++;   // arrow: this fixo na instância — pode passar como callback
  incBad() { this.count++; }  // método: this depende do call site
}

const c = new Counter();
setTimeout(c.inc, 0);    // ok
setTimeout(c.incBad, 0); // TypeError — this é undefined em strict mode</code></pre>

<h2>Exemplo prático: helper de retry</h2>
<pre><code class="language-js">async function retry(fn, { tries = 3, delay = 200 } = {}) {
  let lastErr;
  for (let i = 0; i &lt; tries; i++) {
    try { return await fn(); }
    catch (err) {
      lastErr = err;
      await new Promise(r =&gt; setTimeout(r, delay * 2 ** i));
    }
  }
  throw lastErr;
}

const data = await retry(() =&gt; fetch('https://api.com').then(r =&gt; r.json()));</code></pre>

<h2>Quando usar cada forma</h2>
<ul>
<li><strong>Arrow</strong>: callbacks, métodos curtos, handlers que capturam <code>this</code> de fora.</li>
<li><strong>function declarada</strong>: top-level, helpers nomeados (melhor stack trace).</li>
<li><strong>Método de classe</strong>: quando <code>this</code> é desejado e você não vai passar como callback.</li>
<li><strong>Arrow de campo</strong> (<code>x = () =&gt; ...</code>): handler que será passado adiante.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Arrows não podem ser <code>new</code>-adas e não têm <code>prototype</code>.</li>
<li>Arrows não têm <code>arguments</code> — use <code>...args</code>.</li>
<li>Default args avaliam a cada chamada: <code>function (x = []) {}</code> cria array novo (bom — evita o bug clássico do Python).</li>
<li>Funções nomeadas dão stack trace legível; arrows anônimas viram <code>&lt;anonymous&gt;</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Nomeie suas arrows</div><div>Atribuir a <code>const</code> dá nome inferido pelo V8: <code>const handler = () =&gt; ...</code> aparece como <code>handler</code> nos logs.</div></div>

<div class="callout callout-info"><div class="callout-title">Tail call</div><div>Node não otimiza tail calls (TCO). Para recursão profunda, use loop ou trampolim.</div></div>`}})]})}export{s as default};

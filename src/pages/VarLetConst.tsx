export default function VarLetConst() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 7 min</div>
      <h1>var, let e const</h1>
      <div dangerouslySetInnerHTML={{__html: `
<p>JavaScript tem três formas de declarar variáveis. <code>var</code> é histórica e quase sempre errada hoje; <code>let</code> e <code>const</code> são o padrão moderno e têm escopo de bloco previsível.</p>

<h2>Conceito</h2>
<ul>
<li><strong>var</strong> — escopo de função, sofre <em>hoisting</em>, pode ser redeclarada. Evite.</li>
<li><strong>let</strong> — escopo de bloco, não pode ser redeclarada no mesmo escopo, pode ser reatribuída.</li>
<li><strong>const</strong> — escopo de bloco, não pode ser reatribuída. Para objetos/arrays, protege a referência, não o conteúdo.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">const PI = 3.14;
let count = 0;

if (true) {
  let x = 1;          // só vive aqui
  const y = 2;
  count = x + y;
}
// x e y não existem aqui
console.log(count);   // 3

const obj = { a: 1 };
obj.a = 2;            // OK — referência continua a mesma
// obj = {};          // TypeError: assignment to constant

const arr = [1, 2];
arr.push(3);          // OK
Object.freeze(obj);   // congela de verdade (raso)</code></pre>

<h3>Por que evitar var</h3>
<pre><code class="language-js">for (var i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 0);
}
// imprime 3, 3, 3 (i é uma só, escopo de função)

for (let i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 0);
}
// imprime 0, 1, 2 (let cria binding por iteração)</code></pre>

<h2>Quando usar cada um</h2>
<ul>
<li><strong>const por padrão.</strong> 90% dos casos.</li>
<li><strong>let</strong> quando vai reatribuir (contadores, acumuladores em loop).</li>
<li><strong>var</strong> nunca em código novo. Existe só por compatibilidade.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>const</code> não congela objetos — use <code>Object.freeze</code> ou <code>readonly</code> (TS) para imutabilidade real.</li>
<li>Acesso a <code>let</code>/<code>const</code> antes da declaração lança <code>ReferenceError</code> (Temporal Dead Zone).</li>
<li>Em <code>switch</code>, declare dentro de blocos <code>{ }</code> para evitar conflito de escopo entre cases.</li>
<li>No top level de ESM, <code>const</code> exportado é live binding read-only no consumidor.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Default</div><div>Comece sempre com <code>const</code>. Só mude para <code>let</code> quando o ESLint ou o compilador reclamarem.</div></div>

<div class="callout callout-warn"><div class="callout-title">Hoisting</div><div><code>var</code> é içada e inicializada com <code>undefined</code>; <code>let</code>/<code>const</code> também são içadas, mas ficam na TDZ até a linha de declaração.</div></div>
`}} />
    </article>
  );
}

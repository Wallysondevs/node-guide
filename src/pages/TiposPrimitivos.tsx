export default function TiposPrimitivos() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 9 min</div>
      <h1>Tipos primitivos</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>JS tem <strong>7 tipos primitivos</strong>: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>symbol</code>, <code>bigint</code>. Tudo o mais é objeto (incluindo arrays, funções e datas). Conhecer as armadilhas de cada um economiza horas de bug.</p>

<h2>Conceito</h2>
<p>Primitivos são <strong>imutáveis</strong> e copiados por valor. Objetos são mutáveis e copiados por referência. <code>typeof</code> revela o tipo:</p>

<pre><code class="language-js">typeof 'abc'          // 'string'
typeof 42             // 'number'
typeof 42n            // 'bigint'
typeof true           // 'boolean'
typeof undefined      // 'undefined'
typeof null           // 'object'      bug histórico do JS
typeof Symbol('id')   // 'symbol'
typeof {}             // 'object'
typeof []             // 'object'
typeof function(){}   // 'function'    (subtipo de objeto)</code></pre>

<h2>Number — IEEE 754 64-bit</h2>
<p>Não dá para representar todo decimal exatamente. Resultado: matemática de centavos quebra.</p>
<pre><code class="language-js">0.1 + 0.2                    // 0.30000000000000004
0.1 + 0.2 === 0.3            // false

Number.MAX_SAFE_INTEGER       // 9007199254740991 (2^53 - 1)
9007199254740993              // 9007199254740992 — perdeu bit
Number.EPSILON                // 2.220446049250313e-16

Number.isNaN(NaN)             // true (não confunda com isNaN global)
Number.isFinite(Infinity)     // false</code></pre>

<h3>Para dinheiro: centavos como inteiro</h3>
<pre><code class="language-js">// errado
const total = 0.1 + 0.2;     // 0.30000000000000004

// certo: trabalhe em centavos
const totalCents = 10 + 20;  // 30
const display = (totalCents / 100).toFixed(2); // '0.30'

// ou use big.js / decimal.js para precisão arbitrária</code></pre>

<h2>BigInt — inteiros gigantes</h2>
<pre><code class="language-js">const big = 2n ** 100n;       // 1267650600228229401496703205376n
big + 1n                       // ok
big + 1                        // TypeError: Cannot mix BigInt and Number

JSON.stringify({ x: 1n })      // TypeError — JSON não suporta BigInt</code></pre>

<h2>String — UTF-16 e surrogate pairs</h2>
<pre><code class="language-js">'oi'.length                    // 2
'😀'.length                    // 2 — emoji é par surrogate!
[...'😀'].length              // 1 — iterador respeita code points

'a'.charCodeAt(0)              // 97
'😀'.codePointAt(0)            // 128512</code></pre>

<h2>null vs undefined</h2>
<ul>
<li><code>undefined</code> — variável não inicializada, propriedade ausente, retorno padrão.</li>
<li><code>null</code> — ausência <strong>intencional</strong> de valor, atribuída pelo programador.</li>
<li><code>== </code> trata os dois como iguais; <code>===</code> distingue. Prefira sempre <code>===</code>.</li>
</ul>

<pre><code class="language-js">let x;                         // undefined
const y = null;

x == null                      // true (cobre os dois)
x === undefined                // true
y === null                     // true

const obj = { a: 1 };
obj.b ?? 'fallback'            // 'fallback' (nullish coalescing)
obj.b || 'fallback'            // também, mas pega 0/'' por engano</code></pre>

<h2>Symbol — chaves únicas</h2>
<pre><code class="language-js">const ID = Symbol('id');
const obj = { [ID]: 42, name: 'x' };

obj[ID]                        // 42
Object.keys(obj)               // ['name'] — symbols invisíveis
Object.getOwnPropertySymbols(obj) // [Symbol(id)]

Symbol.for('shared') === Symbol.for('shared') // true (registry global)</code></pre>

<h2>Coerção implícita: as armadilhas</h2>
<pre><code class="language-js">'5' + 3        // '53'    string + number =&gt; concatena
'5' - 3        // 2       outros operadores convertem
true + 1       // 2
[] + []        // ''
[] + {}        // '[object Object]'
null + 1       // 1
undefined + 1  // NaN</code></pre>

<h2>Boas práticas</h2>
<ul>
<li>Use <strong>sempre</strong> <code>===</code> e <code>!==</code>. Use <code>==</code> só em <code>x == null</code>.</li>
<li>Para dinheiro, trabalhe em inteiros (centavos) ou use lib decimal.</li>
<li>Não use <code>parseInt</code> sem radix: <code>parseInt(str, 10)</code>.</li>
<li>Cheque NaN com <code>Number.isNaN</code> — não com <code>=== NaN</code> (sempre false).</li>
<li>Iterar string char a char: <code>[...str]</code> ou <code>for (const ch of str)</code>, não <code>str[i]</code>.</li>
<li>Use <code>??</code> para defaults — <code>||</code> trata 0, '' e false como ausentes.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">typeof null === 'object'</div><div>É um bug do JS de 1995 que nunca foi corrigido para não quebrar a web. Use <code>x === null</code> para checar especificamente, ou <code>x == null</code> para "null ou undefined".</div></div>

<div class="callout callout-tip"><div class="callout-title">TypeScript ajuda muito aqui</div><div>Boa parte das pegadinhas (coerção, ausência de propriedade, NaN) somem ou viram erro de compilação com TS estrito (<code>strictNullChecks</code>, <code>noImplicitAny</code>).</div></div>`}} />
    </article>
  );
}

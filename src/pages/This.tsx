export default function This() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · intermediario · 8 min</div>
      <h1>this, bind, call e apply</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>this</code> é a palavrinha que mais derruba código JS. Em funções regulares, ele é definido <strong>no momento da chamada</strong> — não onde foi declarado. Em arrow functions é lexical (herdado do escopo). Entender isso evita 90% dos bugs de "undefined is not a function".</p>

<h2>Conceito: as quatro regras</h2>
<ol>
<li><strong>Default</strong>: chamada solta (<code>f()</code>) — <code>this</code> é <code>undefined</code> em strict mode (ESM/classes), ou o objeto global em sloppy.</li>
<li><strong>Implicit</strong>: chamada como método (<code>obj.f()</code>) — <code>this</code> é <code>obj</code>.</li>
<li><strong>Explicit</strong>: <code>f.call(ctx)</code>, <code>f.apply(ctx)</code>, <code>f.bind(ctx)</code> — você manda o <code>this</code>.</li>
<li><strong>new</strong>: <code>new F()</code> — <code>this</code> é a instância recém-criada.</li>
</ol>

<pre><code class="language-js">const obj = {
  nome: 'Ana',
  oi() { return 'oi ' + this.nome; },
};

obj.oi();              // 'oi Ana'        (implicit)

const f = obj.oi;
f();                   // 'oi undefined'  (default — perdeu contexto)

f.call({ nome: 'Léo' });  // 'oi Léo'    (explicit)
f.apply({ nome: 'Bia' }); // 'oi Bia'    (explicit, args como array)

const bound = obj.oi.bind({ nome: 'Caio' });
bound();               // 'oi Caio'      (explicit, fixo)</code></pre>

<h2>Arrows: this lexical</h2>
<pre><code class="language-js">class Timer {
  constructor() {
    this.count = 0;
  }
  start() {
    setInterval(() =&gt; {
      this.count++;     // arrow: this herda de start() =&gt; instância
    }, 1000);
  }
  startBuggy() {
    setInterval(function () {
      this.count++;     // function: this perdido — undefined
    }, 1000);
  }
}</code></pre>

<h3>call vs apply vs bind</h3>
<pre><code class="language-js">function soma(a, b) { return this.base + a + b; }

soma.call({ base: 10 }, 1, 2);     // 13
soma.apply({ base: 10 }, [1, 2]);  // 13 (mesmo resultado, args em array)
const f = soma.bind({ base: 100 }, 5); // bind também faz partial application
f(2);                               // 107</code></pre>

<h2>Casos de uso</h2>
<ul>
<li><code>bind</code> em event handlers de classe React (raro hoje, arrows substituíram).</li>
<li><code>call/apply</code> para reusar métodos entre objetos diferentes.</li>
<li>Arrows em callbacks (timers, then, map) para preservar <code>this</code> da classe.</li>
<li><code>new.target</code> para detectar se uma função foi chamada com <code>new</code>.</li>
<li>Polyfills antigos: <code>Array.prototype.slice.call(arguments)</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Métodos passados como callback perdem <code>this</code>: <code>btn.on('click', obj.handler)</code> quebra. Use <code>obj.handler.bind(obj)</code> ou arrow <code>() =&gt; obj.handler()</code>.</li>
<li>Em ESM e classes, strict mode é o padrão — <code>this</code> default é <code>undefined</code>, não o global.</li>
<li>Arrow functions <strong>não</strong> aceitam <code>bind/call/apply</code> para mudar <code>this</code> — o primeiro argumento é ignorado.</li>
<li>Em <code>setTimeout(obj.method, 100)</code>, o método é chamado solto. Solução: <code>setTimeout(() =&gt; obj.method(), 100)</code>.</li>
<li>Em métodos de classe definidos como propriedade arrow (<code>handler = () =&gt; {}</code>), cada instância tem sua própria cópia — gasta mais memória mas evita o problema do <code>this</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Regra prática</div><div>Use arrow para callback. Use método regular quando quiser que <code>this</code> seja o objeto que chama. Quando em dúvida, faça <code>const self = this</code> ou use arrow — quase sempre é o que você quer.</div></div>

<div class="callout callout-warn"><div class="callout-title">new sem new</div><div>Chamar um construtor sem <code>new</code> em strict mode dá <code>TypeError</code>. Em sloppy, polui o objeto global. Sempre marque construtores com nome PascalCase e prefira <code>class</code>.</div></div>`}} />
    </article>
  );
}

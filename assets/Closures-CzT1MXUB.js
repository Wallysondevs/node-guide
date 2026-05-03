import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Fundamentos JS · intermediario · 8 min"}),e.jsx("h1",{children:"Closures"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Uma <strong>closure</strong> é uma função que "lembra" o escopo léxico onde foi criada — mesmo depois de esse escopo terminar. É a base de encapsulamento, currying, factories e callbacks idiomáticos em JS.</p>

<h2>Conceito</h2>
<p>Toda função carrega referência implícita às variáveis visíveis no momento da definição. Como o GC não coleta enquanto houver referência viva, essas variáveis sobrevivem e formam um estado privado.</p>
<pre><code class="language-js">function makeCounter() {
  let count = 0;
  return {
    inc:   () =&gt; ++count,
    dec:   () =&gt; --count,
    valor: () =&gt; count,
    reset: () =&gt; { count = 0; },
  };
}

const c = makeCounter();
c.inc(); c.inc();
c.valor();   // 2
// "count" só é acessível pelos métodos retornados</code></pre>

<h2>Exemplo prático: cache memoizado</h2>
<pre><code class="language-js">function memoize(fn) {
  const cache = new Map();
  return (...args) =&gt; {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const r = fn(...args);
    cache.set(key, r);
    return r;
  };
}

const slow = (n) =&gt; { for (let i = 0; i &lt; 1e7; i++); return n * 2; };
const fast = memoize(slow);
fast(10);   // demora
fast(10);   // instantâneo</code></pre>

<h2>Pegadinha clássica do for</h2>
<pre><code class="language-js">// var compartilha escopo de função:
for (var i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 10);
}
// imprime: 3, 3, 3

// let cria binding novo por iteração:
for (let i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 10);
}
// imprime: 0, 1, 2</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Encapsulamento (estado privado sem classe).</li>
<li>Factories de funções configuradas (<code>logger(level)</code>).</li>
<li>Currying e aplicação parcial.</li>
<li>Cache/memoization.</li>
<li>Handlers com contexto fixo (event listeners).</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Use closures para esconder estado, não para lambda complexa que mereceria classe.</li>
<li>Evite criar closures em hot loop — alocação por iteração custa.</li>
<li>Liberar referências quando não precisar mais: <code>handler = null</code>.</li>
<li>Em event emitters, prefira métodos com <code>removeListener</code> a closures anônimas — facilita unsubscribe.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Memory leak</strong>: closures presas a DOM/objetos grandes mantêm tudo vivo.</li>
<li><strong>this</strong> dentro de closure depende do tipo: arrow herda do escopo léxico; function regular depende da chamada.</li>
<li>Compartilhar variável mutável entre closures gera bugs sutis (estado global disfarçado).</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Module pattern</div><div>Antes de classes/ESM, encapsulamento em JS era feito via IIFE + closure. Hoje use módulos — mas o conceito ainda aparece em libraries antigas.</div></div>

<div class="callout callout-tip"><div class="callout-title">WeakMap para identidade</div><div>Para anexar dados privados a objetos sem leak, combine closure com <code>WeakMap</code> — o GC limpa quando a chave some.</div></div>`}})]})}export{r as default};

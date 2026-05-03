import{j as o}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return o.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[o.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Fundamentos JS · iniciante · 9 min"}),o.jsx("h1",{children:"Classes ES2022+"}),o.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Classes em JS são açúcar sintático sobre o sistema de protótipos. Desde ES2022 o conjunto ficou completo: campos públicos/privados, métodos estáticos, getters/setters, herança e <code>static blocks</code> de inicialização.</p>

<h2>Conceito</h2>
<p>Toda <code>class</code> compila para uma função construtora + objetos prototípicos. <code>extends</code> faz herança real (não cópia). Métodos vivem no protótipo (uma cópia compartilhada); campos vivem na instância.</p>
<pre><code class="language-js">class Conta {
  #saldo = 0;                  // campo privado (#)
  static taxa = 0.02;          // estático
  static {                     // static block
    Conta.criada = Date.now();
  }

  constructor(titular) {
    this.titular = titular;
  }

  depositar(v) {
    if (v &lt;= 0) throw new RangeError('valor inválido');
    this.#saldo += v;
    return this;                // permite chain
  }

  get saldo() { return this.#saldo; }
}</code></pre>

<h2>Exemplo prático: herança</h2>
<pre><code class="language-js">class ContaPremium extends Conta {
  #limite;
  constructor(titular, limite) {
    super(titular);
    this.#limite = limite;
  }

  sacar(v) {
    const novo = this.saldo - v;
    if (novo &lt; -this.#limite) throw new Error('limite excedido');
    // Importante: não dá pra acessar #saldo da pai
    this.depositar(-v);
  }
}

const c = new ContaPremium('Ana', 500).depositar(1000);
c.sacar(1200);   // ok, usa limite</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Modelos de domínio (Pedido, Pagamento, Usuario).</li>
<li>Custom errors: <code>class HttpError extends Error { ... }</code>.</li>
<li>Componentes de framework que precisam ciclo de vida explícito.</li>
<li>EventEmitters customizados.</li>
<li>Objetos com invariantes complexas que merecem encapsulamento.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Prefira <strong>composição</strong> à herança profunda. Mais de 1-2 níveis vira pesadelo.</li>
<li>Use campos privados (<code>#</code>) para invariantes — checagem em runtime, ao contrário de TS <code>private</code>.</li>
<li>Métodos que não usam <code>this</code> deveriam ser <code>static</code> ou funções soltas.</li>
<li>Em modelos imutáveis, considere objetos congelados (<code>Object.freeze</code>) e <em>data classes</em> simples.</li>
<li>Para JSON, cuide do <code>toJSON()</code> ou serializadores — campos privados não aparecem.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>this</code> perdido em callbacks: use arrow ou <code>.bind</code>.</li>
<li>Métodos no protótipo, mas <strong>arrow methods em campo</strong> criam uma cópia por instância — caro em milhões de objetos.</li>
<li>Não confunda <code>#priv</code> (privacidade real) com <code>_priv</code> (convenção apenas).</li>
<li>Herdar de <code>Error</code> exige <code>Object.setPrototypeOf</code> em alguns ambientes ES5.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Custom Error</div><div>Sempre defina <code>this.name = this.constructor.name</code> no construtor para logs decentes e <code>captureStackTrace</code> para stack limpa.</div></div>

<div class="callout callout-tip"><div class="callout-title">instanceof e Symbol.hasInstance</div><div>Você pode customizar <code>instanceof</code> implementando <code>static [Symbol.hasInstance](obj)</code> — útil para checks estruturais.</div></div>`}})]})}export{t as default};

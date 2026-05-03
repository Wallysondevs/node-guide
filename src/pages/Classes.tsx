export default function Classes() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 7 min</div>
      <h1>Classes ES2022+</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Sintaxe açúcar para protótipos. Suporta campos públicos/privados, métodos estáticos, getters/setters, herança e <code>static blocks</code>.</p><pre><code class="language-js">class Conta {
  #saldo = 0;                  // campo privado
  static taxa = 0.02;          // estático

  constructor(titular) {
    this.titular = titular;
  }

  depositar(v) {
    if (v &lt;= 0) throw new Error('inválido');
    this.#saldo += v;
    return this;
  }

  get saldo() { return this.#saldo; }
}

class Premium extends Conta {
  constructor(t) { super(t); }
  saque(v) { this.#saldo -= v; }   // erro! private da classe pai
}</code></pre>`}} />
    </article>
  );
}

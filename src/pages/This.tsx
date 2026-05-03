export default function This() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · intermediario · 6 min</div>
      <h1>this, bind, call e apply</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>this</code> em JS depende de <strong>como</strong> a função é chamada, não de onde foi definida. Em arrows é lexical (herda do escopo).</p><pre><code class="language-js">const obj = {
  nome: 'Ana',
  oi() { return 'oi ' + this.nome; }
};

obj.oi();           // 'oi Ana' — this = obj
const f = obj.oi;
f();                // 'oi undefined' — this perdido

// soluções
const bound = obj.oi.bind(obj);
bound();            // 'oi Ana'

obj.oi.call({nome:'Léo'});  // 'oi Léo'
obj.oi.apply({nome:'Bia'}, []); // 'oi Bia'</code></pre><div class="callout callout-tip"><div class="callout-title">Arrows resolvem</div><div>Em callbacks, prefira arrows ou <code>.bind</code> no construtor para preservar <code>this</code>.</div></div>`}} />
    </article>
  );
}

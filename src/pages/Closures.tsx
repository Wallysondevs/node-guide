export default function Closures() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · intermediario · 6 min</div>
      <h1>Closures</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Uma <strong>closure</strong> é uma função que "lembra" do escopo onde foi criada, mesmo depois desse escopo ter terminado.</p><pre><code class="language-js">function makeCounter() {
  let count = 0;
  return {
    inc: () =&gt; ++count,
    get: () =&gt; count,
  };
}

const c = makeCounter();
c.inc(); c.inc();
c.get();          // 2
// count é privado — só acessível pelos métodos retornados</code></pre><h2>Pegadinha do for</h2><pre><code class="language-js">// var compartilha escopo de função:
for (var i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 10);
}
// 3, 3, 3

// let cria novo binding por iteração:
for (let i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 10);
}
// 0, 1, 2</code></pre>`}} />
    </article>
  );
}

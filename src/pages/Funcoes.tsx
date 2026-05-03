export default function Funcoes() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 7 min</div>
      <h1>Funções e arrow</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>JS tem três formas: declaração, expressão e arrow. Arrows não têm <code>this</code>, <code>arguments</code> nem <code>super</code> próprios.</p><pre><code class="language-js">function soma(a, b) { return a + b; }     // declaração — hoisted
const sub = function(a, b) { return a - b; };  // expressão
const mul = (a, b) =&gt; a * b;               // arrow

// default + rest + destructuring
function send({ to, subject = 'sem assunto', ...rest }) {
  return { to, subject, extra: rest };
}

// IIFE
(() =&gt; { console.log('roda já'); })();</code></pre><h2>this binding</h2><pre><code class="language-js">class Counter {
  count = 0;
  // arrow: this lexical, não precisa bind
  inc = () =&gt; this.count++;
  // método normal: this depende do call site
  incBad() { this.count++; }
}</code></pre>`}} />
    </article>
  );
}

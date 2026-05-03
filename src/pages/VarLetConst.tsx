export default function VarLetConst() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 5 min</div>
      <h1>var, let e const</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>var</code> é histórico — escopo de função, hoisted, redeclarável. Evite. Use <code>let</code> e <code>const</code>, ambos com escopo de bloco.</p><pre><code class="language-js">const PI = 3.14;
let count = 0;

if (true) {
  let x = 1;       // só vive dentro do bloco
  const y = 2;
}
// x e y não existem aqui

const obj = { a: 1 };
obj.a = 2;         // OK — const protege a referência, não o conteúdo
// obj = {}         // erro!</code></pre><div class="callout callout-tip"><div class="callout-title">Default</div><div>Comece sempre com <code>const</code>. Só troque para <code>let</code> quando precisar reatribuir.</div></div>`}} />
    </article>
  );
}

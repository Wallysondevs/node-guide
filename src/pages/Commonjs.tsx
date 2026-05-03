export default function Commonjs() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 6 min</div>
      <h1>CommonJS (require)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Sistema histórico do Node, ainda dominante em pacotes legados. Usa <code>require</code> e <code>module.exports</code>. Carregamento <strong>síncrono</strong>.</p><pre><code class="language-js">// math.js
function soma(a, b) { return a + b; }
module.exports = { soma };
// ou: module.exports.soma = soma;

// app.js
const { soma } = require('./math');
const path = require('node:path');   // built-in
const fs = require('node:fs/promises');</code></pre><h2>Variáveis mágicas</h2><p>Em CJS você tem <code>__dirname</code>, <code>__filename</code>, <code>module</code>, <code>exports</code>, <code>require</code>. Em ESM essas globais não existem.</p>`}} />
    </article>
  );
}

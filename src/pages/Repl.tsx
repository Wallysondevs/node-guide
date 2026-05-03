export default function Repl() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 5 min</div>
      <h1>REPL e flags úteis</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Digite <code>node</code> sem argumentos para abrir o <strong>REPL</strong> — um prompt interativo de JS. Ótimo para testar trechos rápidos.</p><pre><code class="language-bash">$ node
&gt; 2 + 2
4
&gt; const fs = require('fs')
&gt; fs.readdirSync('.').length
12
&gt; .exit</code></pre><h2>Flags úteis</h2><ul><li><code>--watch</code> — reinicia ao salvar (Node 18.11+)</li><li><code>--watch-path=src</code> — observa diretório específico</li><li><code>--env-file=.env</code> — carrega .env (Node 20.6+)</li><li><code>--inspect</code> — abre debugger Chrome DevTools</li><li><code>--experimental-strip-types</code> — roda .ts direto (Node 22+)</li></ul><pre><code class="language-bash">node --watch --env-file=.env src/index.js</code></pre>`}} />
    </article>
  );
}

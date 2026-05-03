export default function Operadores() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 6 min</div>
      <h1>Operadores</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Aritméticos, lógicos, comparação, bitwise e operadores modernos: <code>??</code>, <code>?.</code>, <code>??=</code>, <code>||=</code>, <code>&&=</code>.</p><pre><code class="language-js">// nullish coalescing — só null ou undefined
const port = process.env.PORT ?? 3000;
0 ?? 'fallback'          // 0
0 || 'fallback'          // 'fallback'

// optional chaining
user?.profile?.email
fn?.()
arr?.[0]

// logical assignment
config.timeout ??= 5000  // só atribui se for nullish
opts.retries ||= 3       // se for falsy
flags.debug &amp;&amp;= true     // só atribui se for truthy</code></pre><h2>Equality</h2><p>Use <code>===</code> sempre. <code>==</code> faz coerção bizarra: <code>[] == false</code> é <code>true</code>.</p>`}} />
    </article>
  );
}

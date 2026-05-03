export default function ProcessEnv() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">process/env · iniciante · 5 min</div>
      <h1>process.env e .env</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">process.env.NODE_ENV         // 'production' | 'development'
process.env.DATABASE_URL
process.env.PORT ?? 3000

// nunca atribua valor não-string:
process.env.X = 42        // converte para '42'</code></pre><h2>.env nativo (Node 20.6+)</h2><pre><code class="language-bash"># .env
PORT=8080
DATABASE_URL=postgres://...

# rodando
node --env-file=.env src/index.js</code></pre><div class="callout callout-tip"><div class="callout-title">dotenv</div><div>Para múltiplos .env (.env.local, .env.development), use o pacote <code>dotenv</code> ou <code>dotenv-flow</code>.</div></div>`}} />
    </article>
  );
}

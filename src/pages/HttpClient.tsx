export default function HttpClient() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · iniciante · 6 min</div>
      <h1>HTTP client (fetch)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Node 18+ traz <code>fetch</code> nativo, idêntico ao do browser. Não precisa mais de <code>node-fetch</code> ou <code>axios</code> para casos simples.</p><pre><code class="language-js">const res = await fetch('https://api.com/users', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'Ana' }),
});

if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();

// streaming
for await (const chunk of res.body) {
  process.stdout.write(chunk);
}</code></pre>`}} />
    </article>
  );
}

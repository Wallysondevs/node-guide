export default function AsyncAwait() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · iniciante · 6 min</div>
      <h1>async/await</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Açúcar sintático sobre Promises. Código async lido como sync. <strong>Toda função async retorna Promise.</strong></p><pre><code class="language-js">async function carregaPerfil(id) {
  const user = await db.user(id);
  const [posts, friends] = await Promise.all([
    db.posts(id),
    db.friends(id),
  ]);
  return { user, posts, friends };
}

try {
  const p = await carregaPerfil(42);
} catch (e) {
  console.error(e);
}</code></pre><div class="callout callout-tip"><div class="callout-title">Top-level await</div><div>Em ESM você pode usar <code>await</code> fora de funções, no nível do módulo.</div></div>`}} />
    </article>
  );
}

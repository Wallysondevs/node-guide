export default function Versioning() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 4 min</div>
      <h1>Versionamento</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>Path</strong>: <code>/v1/users</code> — visível e simples (mais comum)</li><li><strong>Header</strong>: <code>Accept: application/vnd.api+json;version=1</code> — limpo mas oculto</li><li><strong>Query</strong>: <code>?v=1</code> — fácil mas feio</li></ul><pre><code class="language-js">app.use('/v1', v1Router);
app.use('/v2', v2Router);</code></pre><div class="callout callout-tip"><div class="callout-title">Quebre só quando precisar</div><div>Adicione campos opcionais sem subir versão. Suba apenas pra mudanças quebradoras.</div></div>`}} />
    </article>
  );
}

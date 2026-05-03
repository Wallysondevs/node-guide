export default function Rest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · iniciante · 6 min</div>
      <h1>Design REST</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>Recursos no plural</strong>: <code>/users</code>, não <code>/user</code></li><li><strong>HTTP verbs</strong>: GET (ler), POST (criar), PUT (substituir), PATCH (atualizar parcial), DELETE</li><li><strong>Status codes</strong> certos: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500</li><li><strong>Aninhamento</strong> raso: <code>/users/:id/posts</code> mas evite mais de 2 níveis</li><li><strong>Filtros como query</strong>: <code>?status=active&amp;sort=-created_at</code></li></ul><pre><code class="language-bash">GET    /users
GET    /users/42
POST   /users
PUT    /users/42
PATCH  /users/42
DELETE /users/42

GET    /users/42/posts
POST   /users/42/posts</code></pre>`}} />
    </article>
  );
}

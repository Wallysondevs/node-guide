export default function Paginacao() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 5 min</div>
      <h1>Paginação</h1>
      <div dangerouslySetInnerHTML={{__html: `<h2>Offset/limit</h2><pre><code class="language-js">// GET /posts?page=3&amp;limit=20
const offset = (page - 1) * limit;
const items = await db.posts.findMany({ take: limit, skip: offset });
const total = await db.posts.count();

res.json({ items, total, page, limit, pages: Math.ceil(total / limit) });</code></pre><h2>Cursor (mais rápido em datasets grandes)</h2><pre><code class="language-js">// GET /posts?cursor=abc&amp;limit=20
const items = await db.posts.findMany({
  take: limit + 1,
  ...(cursor &amp;&amp; { cursor: { id: cursor }, skip: 1 }),
  orderBy: { id: 'desc' },
});
const next = items.length &gt; limit ? items.pop().id : null;
res.json({ items, nextCursor: next });</code></pre>`}} />
    </article>
  );
}

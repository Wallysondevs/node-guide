export default function Promises() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · iniciante · 7 min</div>
      <h1>Promises</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">function fetchUser(id) {
  return new Promise((resolve, reject) =&gt; {
    db.query('select ...', [id], (err, row) =&gt; {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

fetchUser(1)
  .then(u =&gt; fetchPosts(u.id))
  .then(posts =&gt; console.log(posts))
  .catch(err =&gt; console.error(err))
  .finally(() =&gt; console.log('done'));</code></pre><h2>Estados</h2><ul><li><strong>pending</strong> — em andamento</li><li><strong>fulfilled</strong> — resolveu com valor</li><li><strong>rejected</strong> — rejeitou com erro</li></ul>`}} />
    </article>
  );
}

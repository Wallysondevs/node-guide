import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"API design · intermediario · 7 min"}),e.jsx("h1",{children:"Paginação"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p>Listar tudo de uma vez é receita certa para travar o backend e o cliente. Existem dois padrões dominantes: <strong>offset/limit</strong> (simples) e <strong>cursor</strong> (escalável).</p>

        <h2>Conceito</h2>
        <p><strong>Offset/limit</strong>: o cliente pede "página 3, 20 itens" e o backend pula 40 antes de retornar 20. Fácil, mas fica lento em datasets grandes (o DB ainda precisa contar/visitar os pulados) e pode <em>perder</em> ou <em>duplicar</em> itens se a lista mudar entre requests.</p>
        <p><strong>Cursor</strong>: o cliente envia um ponteiro opaco (geralmente o último <code>id</code>/<code>createdAt</code> visto) e o backend devolve "os próximos N depois disso". Imune a inserções/deleções no meio.</p>

        <h2>Offset/limit</h2>
        <pre><code class="language-js">// GET /posts?page=3&amp;limit=20
const page = Math.max(1, Number(req.query.page) || 1);
const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
const offset = (page - 1) * limit;

const [items, total] = await Promise.all([
  db.posts.findMany({ take: limit, skip: offset, orderBy: { id: 'desc' } }),
  db.posts.count(),
]);

res.json({
  items,
  page,
  limit,
  total,
  pages: Math.ceil(total / limit),
});</code></pre>

        <h2>Cursor (keyset)</h2>
        <pre><code class="language-js">// GET /posts?cursor=abc&amp;limit=20
const limit = Math.min(100, Number(req.query.limit) || 20);
const cursor = req.query.cursor;

const items = await db.posts.findMany({
  take: limit + 1, // pega 1 a mais pra saber se há próxima página
  ...(cursor &amp;&amp; { cursor: { id: cursor }, skip: 1 }),
  orderBy: { id: 'desc' },
});

const hasMore = items.length &gt; limit;
if (hasMore) items.pop();
const nextCursor = hasMore ? items[items.length - 1].id : null;

res.json({ items, nextCursor });</code></pre>

        <h2>Cursor opaco (base64)</h2>
        <pre><code class="language-js">function encodeCursor(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64url');
}
function decodeCursor(s) {
  return JSON.parse(Buffer.from(s, 'base64url').toString());
}

// codifica id + createdAt para ordenações compostas
const next = encodeCursor({ id: last.id, t: last.createdAt });</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Feeds infinitos (Twitter-like) → <strong>cursor</strong>.</li>
          <li>Tabela admin com "ir para página N" → <strong>offset</strong>.</li>
          <li>Exportações em lote → cursor + streaming.</li>
          <li>APIs públicas com SLA → cursor (consistente sob concorrência).</li>
        </ul>

        <h2>Boas práticas</h2>
        <ul>
          <li>Sempre limite <code>limit</code> com um teto (ex.: 100).</li>
          <li>Sempre defina <code>orderBy</code> determinístico (use <code>id</code> como tiebreaker).</li>
          <li>Devolva metadados úteis: <code>nextCursor</code>, <code>hasMore</code>, ou Link header (RFC 5988).</li>
          <li>Para offset, considere cachear o <code>count</code> — ele é caro.</li>
          <li>Em GraphQL, siga o <strong>Connections spec</strong> (Relay).</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Sem <code>orderBy</code>, a ordem do DB pode mudar entre requests.</li>
          <li>Cursor com timestamp único quebra em colisões — combine com id.</li>
          <li>Offset gigante (page=10000) é praticamente um full scan.</li>
          <li>Não vaze internals do DB no cursor — sempre opaco.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Link header</div><div>APIs REST clássicas (GitHub, GitLab) devolvem <code>Link: &lt;url&gt;; rel="next"</code>. Padrão maduro, descobrível por SDKs.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Count caro</div><div>Em tabelas com bilhões de linhas, <code>SELECT COUNT(*)</code> pode levar minutos. Mostre "1000+" em vez do total real.</div></div>
      `}})]})}export{r as default};

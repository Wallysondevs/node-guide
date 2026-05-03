export default function DrizzleCrud() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 9 min</div>
      <h1>Drizzle: queries</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Com o schema definido (ver capítulo de setup), o Drizzle expõe um query builder que parece SQL mas é totalmente tipado: o TS sabe quais colunas existem, seus tipos e o que cada operador retorna.</p>

<h2>Conceito</h2>
<p>O builder começa em <code>db.select()</code>, <code>db.insert(table)</code>, <code>db.update(table)</code>, <code>db.delete(table)</code>. Operadores como <code>eq</code>, <code>and</code>, <code>or</code>, <code>gt</code>, <code>lte</code>, <code>like</code>, <code>inArray</code> vêm de <code>drizzle-orm</code>. Joins são explícitos: <code>.innerJoin(other, on)</code>.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-ts">import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, and, gt, desc, sql, inArray } from 'drizzle-orm';
import pg from 'pg';
import { users, posts } from './schema';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// CREATE
const [created] = await db
  .insert(users)
  .values({ email: 'ana@ex.com', age: 30 })
  .returning();

// READ — listas tipadas
const adultos = await db
  .select({ id: users.id, email: users.email })
  .from(users)
  .where(and(gt(users.age, 17), eq(users.active, true)))
  .orderBy(desc(users.createdAt))
  .limit(20)
  .offset(0);

// READ — by id
const [user] = await db
  .select()
  .from(users)
  .where(eq(users.id, created.id));

// UPDATE
await db
  .update(users)
  .set({ age: 31, updatedAt: new Date() })
  .where(eq(users.id, created.id));

// DELETE
await db.delete(users).where(eq(users.id, created.id));

// JOIN
const rows = await db
  .select({
    postId: posts.id,
    title:  posts.title,
    author: users.email,
  })
  .from(posts)
  .innerJoin(users, eq(users.id, posts.authorId))
  .where(eq(posts.published, true));

// IN (...)
const some = await db.select().from(users)
  .where(inArray(users.id, ['u1', 'u2', 'u3']));

// SQL bruto tipado
const counts = await db.execute(
  sql\`select author_id, count(*)::int as total
       from posts group by author_id\`
);</code></pre>

<p>Transações:</p>
<pre><code class="language-ts">await db.transaction(async (tx) =&gt; {
  const [u] = await tx.insert(users).values({ email }).returning();
  await tx.insert(profiles).values({ userId: u.id, bio: '' });
  // se qualquer await lançar, tudo faz rollback
});</code></pre>

<p>Query API relacional (alternativa ao select):</p>
<pre><code class="language-ts">const result = await db.query.users.findFirst({
  where: (u, { eq }) =&gt; eq(u.id, 'u1'),
  with: { posts: true },   // eager loading tipado
});</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>CRUD tipado em APIs REST/GraphQL.</li>
<li>Queries complexas com joins sem perder tipagem.</li>
<li>Migrações automáticas com <code>drizzle-kit</code>.</li>
<li>Substituir queries SQL espalhadas por um modelo central.</li>
<li>Edge runtimes (Cloudflare D1, Neon serverless) — Drizzle tem drivers leves.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Sempre use parâmetros</div><div>Os helpers <code>eq</code>, <code>and</code>, etc. parametrizam automaticamente. Em <code>sql\`...\`</code> raw, use placeholders <code>\${value}</code> — Drizzle escapa, evita SQL injection.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Esquecer <code>.returning()</code></strong> em INSERT/UPDATE — você fica sem o registro modificado.</li>
<li><strong>WHERE faltando</strong> em UPDATE/DELETE = afeta a tabela inteira. Adicione testes que verifiquem o número de linhas.</li>
<li><strong>Joins sem alias</strong>: ao juntar a mesma tabela duas vezes, use <code>alias()</code>.</li>
<li><strong>Pool exhaustion</strong>: configure <code>pool.max</code> e sempre use <code>db.transaction</code> para múltiplas operações relacionadas.</li>
<li><strong>Drizzle não faz N+1 mágica</strong>: para listar relacionamentos eficientemente, use <code>db.query....findMany({ with })</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Logs de SQL</div><div>Passe <code>{ logger: true }</code> em <code>drizzle(pool, { logger: true })</code> para ver as queries no console durante o dev.</div></div>`}} />
    </article>
  );
}

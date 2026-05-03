export default function DrizzleCrud() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 6 min</div>
      <h1>Drizzle: queries</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, and, gt } from 'drizzle-orm';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

await db.insert(users).values({ id: '1', email: 'a@b.com' });

const all = await db.select().from(users).where(eq(users.email, 'a@b.com'));

const adults = await db.select().from(users)
  .where(and(gt(users.age, 18), eq(users.email, 'x')))
  .limit(10);

await db.update(users).set({ age: 30 }).where(eq(users.id, '1'));
await db.delete(users).where(eq(users.id, '1'));

// raw SQL com type-safety:
const r = await db.execute(sql\`select count(*) from users\`);</code></pre>`}} />
    </article>
  );
}

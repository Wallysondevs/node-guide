export default function DrizzleIntro() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 6 min</div>
      <h1>Drizzle: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>ORM "SQL-like" tipado, sem runtime overhead. Você escreve SQL com helpers tipados.</p><pre><code class="language-bash">npm i drizzle-orm pg
npm i -D drizzle-kit @types/pg</code></pre><pre><code class="language-js">// schema.ts
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  createdAt: timestamp('created_at').defaultNow(),
});</code></pre><pre><code class="language-bash"># drizzle.config.ts e
npx drizzle-kit generate
npx drizzle-kit push</code></pre>`}} />
    </article>
  );
}

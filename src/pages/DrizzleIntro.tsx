export default function DrizzleIntro() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 9 min</div>
      <h1>Drizzle: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><strong>Drizzle</strong> é um ORM &quot;SQL-like&quot; tipado para TypeScript. Em vez de esconder SQL atrás de abstrações, ele tipa o que você já escreveria — sem runtime grande, sem geração de cliente. Roda em Node, Bun, Deno, edge runtimes (Cloudflare, Vercel) e suporta Postgres, MySQL e SQLite.</p>

<h2>Conceito</h2>
<p>Você define o schema em TS com helpers (<code>pgTable</code>, <code>text</code>, <code>integer</code>, <code>timestamp</code>...). A partir disso o Drizzle infere tipos para queries, e o <code>drizzle-kit</code> gera migrations SQL versionadas.</p>

<h2>Exemplo prático</h2>
<p>Instalação para Postgres com <code>pg</code>:</p>
<pre><code class="language-bash">npm i drizzle-orm pg
npm i -D drizzle-kit @types/pg tsx</code></pre>

<p>Schema:</p>
<pre><code class="language-ts">// src/db/schema.ts
import { pgTable, text, integer, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  age: integer('age'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id').notNull().references(() =&gt; users.id),
  title: text('title').notNull(),
  body: text('body').notNull(),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) =&gt; ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) =&gt; ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));</code></pre>

<p>Conexão:</p>
<pre><code class="language-ts">// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export const db = drizzle(pool, { schema, logger: process.env.NODE_ENV !== 'production' });</code></pre>

<p>Configuração do drizzle-kit:</p>
<pre><code class="language-ts">// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
  verbose: true,
});</code></pre>

<p>Workflow de migrations:</p>
<pre><code class="language-bash"># gera SQL a partir do schema TS
npx drizzle-kit generate

# aplica no banco (CI/CD, ou manualmente em dev)
npx drizzle-kit migrate

# protótipo rápido sem versionar
npx drizzle-kit push

# inspetor visual
npx drizzle-kit studio</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Você quer SQL real, mas com tipos.</li>
<li>Roda em edge runtimes (Cloudflare Workers, Vercel Edge).</li>
<li>Time já conhece SQL e não quer aprender uma DSL exótica.</li>
<li>Bundle pequeno importa (apps serverless).</li>
<li>Você quer migrations versionadas + studio sem cobrança extra.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Drizzle vs Prisma</div><div>Prisma é &quot;ORM clássico&quot; com cliente gerado e schema próprio. Drizzle é mais leve, edge-friendly, e o schema é TS puro. Em apps onde control sobre SQL importa, Drizzle ganha.</div></div>

<h2>Boas práticas</h2>
<ul>
<li><strong>Migrations no CI</strong>: rode <code>drizzle-kit generate</code> em PRs e revise o SQL.</li>
<li><strong>Pool com limite</strong>: <code>max</code> compatível com o tamanho do banco — Postgres free tier sufoca com pool grande.</li>
<li><strong>Não use <code>push</code> em produção</strong>: ele compara schema sem manter histórico.</li>
<li><strong>Helpers tipados</strong>: <code>InferSelectModel&lt;typeof users&gt;</code> dá o tipo do registro.</li>
<li><strong>Separe schema</strong> em arquivos por domínio quando crescer.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Postgres no Replit</div><div>Provisione <code>DATABASE_URL</code> via Replit DB ou Neon — Drizzle funciona com qualquer connection string Postgres padrão.</div></div>`}} />
    </article>
  );
}

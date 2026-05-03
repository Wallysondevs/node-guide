export default function PrismaIntro() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 9 min</div>
      <h1>Prisma: schema e migrate</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Prisma é um ORM moderno para Node/TypeScript com <strong>geração automática de tipos</strong>, migrations versionadas e um schema declarativo próprio (DSL chamada Prisma Schema Language).</p>

<h2>Conceito</h2>
<p>Você descreve seus models em <code>schema.prisma</code>. O CLI gera dois artefatos: (1) o <strong>Prisma Client</strong>, totalmente tipado para seu schema; (2) <strong>migrations SQL</strong> versionadas. O fluxo é: editar schema → <code>migrate dev</code> → usar o client.</p>
<pre><code class="language-bash">npm i prisma -D
npm i @prisma/client
npx prisma init --datasource-provider postgresql</code></pre>

<h2>schema.prisma</h2>
<pre><code class="language-js">// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  posts     Post[]

  @@index([createdAt])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  body      String   @db.Text
  published Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String

  @@index([userId, published])
}</code></pre>

<h2>Migrations</h2>
<pre><code class="language-bash">npx prisma migrate dev --name init       # cria migration + aplica + gera client
npx prisma generate                       # só gera o client (após pull/edição)
npx prisma migrate deploy                 # aplica migrations em produção (sem prompt)
npx prisma migrate reset                  # DROP + recria + seed (DEV ONLY)
npx prisma studio                         # GUI no http://localhost:5555</code></pre>

<div class="callout callout-warn"><div class="callout-title">dev vs deploy</div><div><code>migrate dev</code> pode dropar dados em mudanças destrutivas — nunca rode em prod. Em CI/CD use <strong>apenas</strong> <code>migrate deploy</code>.</div></div>

<h2>Seed</h2>
<pre><code class="language-js">// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@x.com' },
    update: {},
    create: { email: 'admin@x.com', name: 'Admin' }
  });
}

main().finally(() =&gt; prisma.$disconnect());</code></pre>
<pre><code class="language-json">// package.json
{
  "prisma": { "seed": "tsx prisma/seed.ts" }
}</code></pre>
<pre><code class="language-bash">npx prisma db seed</code></pre>

<h2>Introspect (banco existente)</h2>
<pre><code class="language-bash">npx prisma db pull        # gera schema.prisma a partir do banco atual
npx prisma generate</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Projetos novos com TypeScript — autocompletar é matador.</li>
<li>Times que querem migrations versionadas no Git.</li>
<li>Precisa trocar de Postgres para MySQL/SQLite sem reescrever tudo.</li>
<li>Prototipagem rápida com <code>prisma studio</code> como GUI temporária.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>O client é gerado em <code>node_modules/.prisma</code> — esquecer <code>generate</code> após mudar schema causa erros estranhos.</li>
<li><code>cuid()</code> e <code>uuid()</code> são gerados pelo client (não pelo DB) — limita uso fora do Node.</li>
<li>Relação 1:1 exige <code>@unique</code> no FK; senão Prisma trata como 1:N.</li>
<li>No Vercel/Lambda, conexão por instância acaba esgotando o pool — use <code>?pgbouncer=true</code> ou Prisma Accelerate.</li>
<li><code>onDelete: Cascade</code> é declarado no Prisma e replicado para o SQL — confirme na migration gerada.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Versionamento</div><div>Commit <code>prisma/migrations/</code> SEMPRE. Ele é a fonte da verdade do schema do banco em produção.</div></div>`}} />
    </article>
  );
}

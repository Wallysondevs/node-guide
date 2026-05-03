export default function PrismaIntro() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 7 min</div>
      <h1>Prisma: schema e migrate</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>ORM moderno com gerador de tipos automático e migrations versionadas.</p><pre><code class="language-bash">npm i prisma -D
npm i @prisma/client
npx prisma init</code></pre><pre><code class="language-js">// prisma/schema.prisma
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }

model User {
  id    String  @id @default(cuid())
  email String  @unique
  posts Post[]
}

model Post {
  id     String @id @default(cuid())
  title  String
  user   User   @relation(fields: [userId], references: [id])
  userId String
}</code></pre><pre><code class="language-bash">npx prisma migrate dev --name init     # cria migration e aplica
npx prisma generate                     # gera client tipado
npx prisma studio                       # GUI</code></pre>`}} />
    </article>
  );
}

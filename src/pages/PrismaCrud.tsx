export default function PrismaCrud() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 6 min</div>
      <h1>Prisma: CRUD</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// create
await prisma.user.create({ data: { email: 'a@b.com' } });

// read
const u = await prisma.user.findUnique({ where: { id: '...' } });
const list = await prisma.user.findMany({
  where: { email: { contains: '@gmail' } },
  include: { posts: true },
  orderBy: { id: 'desc' },
  take: 20,
  skip: 0,
});

// update
await prisma.user.update({ where: { id }, data: { email: 'x' } });

// delete
await prisma.user.delete({ where: { id } });

// transação
await prisma.$transaction([op1, op2, op3]);
// ou interativa
await prisma.$transaction(async (tx) =&gt; {
  await tx.user.create({ data });
  await tx.audit.create({ data: { action: 'create' } });
});</code></pre>`}} />
    </article>
  );
}

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Banco de dados · intermediario · 8 min"}),e.jsx("h1",{children:"Prisma: CRUD"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>O Prisma Client expõe uma API tipada para todas as tabelas do schema. Cada model vira uma propriedade em <code>prisma</code> com <code>create</code>, <code>findMany</code>, <code>update</code>, <code>delete</code>, <code>upsert</code> etc.</p>

<h2>Conceito</h2>
<p>Os métodos seguem padrão: você passa <code>where</code>, <code>data</code>, <code>select</code>, <code>include</code>, <code>orderBy</code>, <code>take</code>, <code>skip</code>. Tudo é typesafe — o TypeScript reclama de campos inexistentes ou tipos errados.</p>
<pre><code class="language-js">import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();</code></pre>

<h2>Create</h2>
<pre><code class="language-js">const u = await prisma.user.create({
  data: { email: 'a@b.com', name: 'Alice' }
});

// nested write — cria user e posts em uma chamada
await prisma.user.create({
  data: {
    email: 'b@b.com',
    posts: { create: [{ title: 'Hello' }, { title: 'World' }] }
  }
});

// múltiplos
await prisma.user.createMany({
  data: [{ email: 'x@x' }, { email: 'y@y' }],
  skipDuplicates: true
});</code></pre>

<h2>Read</h2>
<pre><code class="language-js">// por chave
const u = await prisma.user.findUnique({ where: { id } });

// lista paginada com filtro e include
const list = await prisma.user.findMany({
  where: {
    email: { contains: '@gmail' },
    posts: { some: { published: true } }
  },
  include: { posts: { where: { published: true } } },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: (page - 1) * 20
});

// projeção
const slim = await prisma.user.findMany({
  select: { id: true, email: true, _count: { select: { posts: true } } }
});

// agregação
const stats = await prisma.post.aggregate({
  _count: true,
  _avg: { views: true },
  where: { published: true }
});</code></pre>

<h2>Update</h2>
<pre><code class="language-js">await prisma.user.update({
  where: { id },
  data: { name: 'Novo' }
});

// incremento atômico
await prisma.post.update({
  where: { id },
  data: { views: { increment: 1 } }
});

// em massa
await prisma.user.updateMany({
  where: { active: false },
  data: { archived: true }
});

// upsert
await prisma.user.upsert({
  where: { email },
  create: { email, name: 'Novo' },
  update: { lastLoginAt: new Date() }
});</code></pre>

<h2>Delete</h2>
<pre><code class="language-js">await prisma.user.delete({ where: { id } });
await prisma.post.deleteMany({ where: { published: false } });</code></pre>

<h2>Transações</h2>
<pre><code class="language-js">// sequencial atômica
await prisma.$transaction([
  prisma.user.create({ data: u }),
  prisma.audit.create({ data: { action: 'create' } })
]);

// interativa (com lógica entre queries)
await prisma.$transaction(async (tx) =&gt; {
  const conta = await tx.conta.findUnique({ where: { id } });
  if (conta.saldo &lt; valor) throw new Error('saldo insuficiente');
  await tx.conta.update({ where: { id }, data: { saldo: { decrement: valor } } });
  await tx.movimento.create({ data: { contaId: id, valor: -valor } });
});</code></pre>

<div class="callout callout-info"><div class="callout-title">Isolation</div><div><code>$transaction</code> interativa aceita <code>{ isolationLevel: 'Serializable' }</code>. Use quando lê e escreve o mesmo registro para evitar race conditions.</div></div>

<h2>Quando usar</h2>
<ul>
<li>CRUD padrão com tipagem completa.</li>
<li>Schemas que mudam — migrations geradas automaticamente.</li>
<li>Times mistos onde nem todos sabem SQL avançado.</li>
<li>Queries multi-tabela com <code>include</code> ergonômico.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>findMany</code> sem <code>take</code> pode retornar milhões de linhas — paginação é responsabilidade sua.</li>
<li><code>include</code> aninhado faz N+1 queries por baixo — use <code>select</code> quando puder.</li>
<li>Não rode migrations em produção via CI sem <code>migrate deploy</code> (não <code>migrate dev</code>).</li>
<li>O Prisma Client é pesado (&gt;10MB). Em Lambda, use <code>--no-engine</code> + Prisma Accelerate.</li>
<li>Para queries complexas (CTE, window functions), caia para <code>$queryRaw</code> com tagged template.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Raw queries</div><div>Use <code>prisma.$queryRaw\\\`select * from x where id = \\${id}\\\`</code> com tagged template — interpolação direta com <code>$queryRawUnsafe</code> abre SQL injection.</div></div>`}})]})}export{s as default};

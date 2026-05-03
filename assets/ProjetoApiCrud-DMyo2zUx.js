import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Projetos · intermediario · 14 min"}),e.jsx("h1",{children:"Projeto: API CRUD completa"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Vamos construir uma API REST de blog com autenticação JWT, validação Zod, persistência em Postgres via Prisma, hashing de senha com bcrypt e tratamento de erros centralizado. Stack idiomática para produção em Node 20+.</p>

<h2>Estrutura de pastas</h2>
<pre><code class="language-bash">api-crud/
├─ package.json
├─ .env
├─ prisma/
│  └─ schema.prisma
└─ src/
   ├─ index.js          # bootstrap
   ├─ db.js             # PrismaClient singleton
   ├─ schemas.js        # Zod schemas
   ├─ middlewares/
   │  ├─ auth.js
   │  └─ error.js
   └─ routes/
      ├─ auth.js
      └─ posts.js</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">npm init -y
npm i express zod @prisma/client jsonwebtoken bcrypt dotenv
npm i -D prisma nodemon
npx prisma init</code></pre>
<pre><code class="language-bash"># .env
DATABASE_URL="postgresql://user:pass@localhost:5432/blog"
JWT_SECRET="troque-por-32-bytes-aleatorios"
PORT=3000</code></pre>

<h2>Schema Prisma</h2>
<pre><code class="language-js">// prisma/schema.prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}</code></pre>
<pre><code class="language-bash">npx prisma migrate dev --name init</code></pre>

<h2>Código da aplicação</h2>
<pre><code class="language-js">// src/db.js
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();</code></pre>
<pre><code class="language-js">// src/schemas.js
import { z } from 'zod';
export const SignUp = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72)
});
export const NewPost = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1)
});</code></pre>
<pre><code class="language-js">// src/middlewares/auth.js
import jwt from 'jsonwebtoken';
export function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = sub;
    next();
  } catch { res.sendStatus(401); }
}</code></pre>
<pre><code class="language-js">// src/middlewares/error.js
import { ZodError } from 'zod';
export function errorHandler(err, req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'validation', issues: err.issues });
  }
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'conflict', target: err.meta?.target });
  }
  console.error(err);
  res.status(500).json({ error: 'internal' });
}</code></pre>
<pre><code class="language-js">// src/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { SignUp } from '../schemas.js';

export const authRouter = Router();

authRouter.post('/signup', async (req, res, next) =&gt; {
  try {
    const { email, password } = SignUp.parse(req.body);
    const hash = await bcrypt.hash(password, 12);
    const u = await prisma.user.create({ data: { email, password: hash } });
    const token = jwt.sign({ sub: u.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ id: u.id, token });
  } catch (e) { next(e); }
});

authRouter.post('/login', async (req, res, next) =&gt; {
  try {
    const { email, password } = SignUp.parse(req.body);
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u || !(await bcrypt.compare(password, u.password))) return res.sendStatus(401);
    res.json({ token: jwt.sign({ sub: u.id }, process.env.JWT_SECRET, { expiresIn: '7d' }) });
  } catch (e) { next(e); }
});</code></pre>
<pre><code class="language-js">// src/routes/posts.js
import { Router } from 'express';
import { prisma } from '../db.js';
import { auth } from '../middlewares/auth.js';
import { NewPost } from '../schemas.js';

export const postsRouter = Router();
postsRouter.use(auth);

postsRouter.get('/', async (req, res, next) =&gt; {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const take = Math.min(50, Number(req.query.limit) || 10);
    const [items, total] = await Promise.all([
      prisma.post.findMany({ where: { userId: req.userId }, skip: (page-1)*take, take, orderBy: { id: 'desc' } }),
      prisma.post.count({ where: { userId: req.userId } })
    ]);
    res.json({ items, page, total });
  } catch (e) { next(e); }
});

postsRouter.post('/', async (req, res, next) =&gt; {
  try {
    const data = NewPost.parse(req.body);
    const p = await prisma.post.create({ data: { ...data, userId: req.userId } });
    res.status(201).json(p);
  } catch (e) { next(e); }
});

postsRouter.put('/:id', async (req, res, next) =&gt; {
  try {
    const data = NewPost.partial().parse(req.body);
    const p = await prisma.post.updateMany({
      where: { id: Number(req.params.id), userId: req.userId },
      data
    });
    if (!p.count) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (e) { next(e); }
});

postsRouter.delete('/:id', async (req, res, next) =&gt; {
  try {
    const r = await prisma.post.deleteMany({ where: { id: Number(req.params.id), userId: req.userId } });
    if (!r.count) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (e) { next(e); }
});</code></pre>
<pre><code class="language-js">// src/index.js
import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/auth.js';
import { postsRouter } from './routes/posts.js';
import { errorHandler } from './middlewares/error.js';

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/health', (_req, res) =&gt; res.json({ ok: true }));
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () =&gt; console.log('http://localhost:' + port));</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">docker run -d --name pg -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=user -e POSTGRES_DB=blog -p 5432:5432 postgres:16
npx prisma migrate dev
node --watch src/index.js

# testar
curl -X POST localhost:3000/auth/signup -H 'content-type: application/json' \\
  -d '{"email":"a@b.com","password":"12345678"}'</code></pre>

<div class="callout callout-warn"><div class="callout-title">Produção</div><div>Adicione <code>helmet</code>, rate limiting (<code>express-rate-limit</code>), CORS restrito, logs estruturados (pino), e rode atrás de um proxy (nginx/Cloud) com TLS.</div></div>

<h2>Boas práticas</h2>
<ul>
  <li>Sempre <strong>valide na borda</strong> com Zod antes de tocar no banco.</li>
  <li>Use <code>updateMany</code>/<code>deleteMany</code> com filtro de <code>userId</code> para evitar IDOR.</li>
  <li>JWT secret &gt;= 32 bytes; rotacione periodicamente; considere refresh tokens.</li>
  <li>Centralize erros — handlers de rota só fazem <code>next(e)</code>.</li>
  <li>Singleton do PrismaClient — instanciar por request esgota o pool.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Próximos passos</div><div>Adicione testes com <code>supertest</code>, OpenAPI com <code>zod-to-openapi</code>, e CI com migrate em ambiente efêmero.</div></div>`}})]})}export{a as default};

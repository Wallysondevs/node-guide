export default function ProjetoApiCrud() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · intermediario · 10 min</div>
      <h1>Projeto: API CRUD completa</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Stack: Express + Zod + Prisma + Postgres + JWT.</p><pre><code class="language-js">// src/index.js
import express from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const SignUp = z.object({ email: z.string().email(), password: z.string().min(8) });

app.post('/signup', async (req, res, next) =&gt; {
  try {
    const { email, password } = SignUp.parse(req.body);
    const hash = await bcrypt.hash(password, 12);
    const u = await prisma.user.create({ data: { email, password: hash } });
    const token = jwt.sign({ sub: u.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, id: u.id });
  } catch (e) { next(e); }
});

app.post('/login', async (req, res, next) =&gt; {
  const { email, password } = req.body;
  const u = await prisma.user.findUnique({ where: { email } });
  if (!u || !await bcrypt.compare(password, u.password)) return res.sendStatus(401);
  res.json({ token: jwt.sign({ sub: u.id }, process.env.JWT_SECRET) });
});

function auth(req, res, next) {
  const t = req.headers.authorization?.split(' ')[1];
  try { req.userId = jwt.verify(t, process.env.JWT_SECRET).sub; next(); }
  catch { res.sendStatus(401); }
}

app.get('/posts', auth, async (req, res) =&gt; {
  res.json(await prisma.post.findMany({ where: { userId: req.userId } }));
});

app.post('/posts', auth, async (req, res) =&gt; {
  const p = await prisma.post.create({ data: { ...req.body, userId: req.userId } });
  res.status(201).json(p);
});

app.use((err, req, res, _next) =&gt; {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(3000);</code></pre>`}} />
    </article>
  );
}

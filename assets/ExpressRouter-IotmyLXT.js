import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · iniciante · 9 min"}),e.jsx("h1",{children:"Router modular"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><code>express.Router()</code> cria mini-aplicações independentes que podem ter rotas, middlewares e error handlers próprios. É a forma idiomática de organizar APIs grandes em arquivos por recurso.</p>

<h2>Conceito</h2>
<p>Um Router é um middleware que despacha para sub-rotas. Você o monta em um path-base com <code>app.use('/users', router)</code>, e ele recebe requests cujo URL começa com <code>/users</code>.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// routes/users.js
import { Router } from 'express';
import { ah } from '../utils/ah.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use(auth());                        // protege todas as rotas

router.get('/', ah(async (req, res) =&gt; {
  const users = await db.users.list({ limit: req.query.limit ?? 20 });
  res.json(users);
}));

router.get('/:id', ah(async (req, res) =&gt; {
  const u = await db.users.find(req.params.id);
  if (!u) return res.sendStatus(404);
  res.json(u);
}));

router.post('/', ah(async (req, res) =&gt; {
  const u = await db.users.create(req.body);
  res.status(201).json(u);
}));

router.delete('/:id', ah(async (req, res) =&gt; {
  await db.users.remove(req.params.id);
  res.sendStatus(204);
}));

export default router;</code></pre>

<pre><code class="language-js">// app.js
import express from 'express';
import users from './routes/users.js';
import posts from './routes/posts.js';
import auth from './routes/auth.js';

const app = express();
app.use(express.json());

app.use('/auth', auth);
app.use('/users', users);
app.use('/posts', posts);

app.listen(3000);</code></pre>

<h2>Routers aninhados</h2>
<pre><code class="language-js">// routes/posts/comments.js
const router = Router({ mergeParams: true });   // herda :postId do pai

router.get('/', ah(async (req, res) =&gt; {
  const comments = await db.comments.byPost(req.params.postId);
  res.json(comments);
}));

// routes/posts/index.js
import comments from './comments.js';
const router = Router();
router.use('/:postId/comments', comments);
export default router;</code></pre>

<h2>Quando usar</h2>
<ul>
<li>APIs com mais de 5-10 rotas — separe por recurso</li>
<li>Versionamento: <code>app.use('/v1', v1Router); app.use('/v2', v2Router)</code></li>
<li>Áreas com permissões diferentes (admin, public, internal)</li>
<li>Plug-ins de terceiros que expõem um router (ex.: dashboards, OAuth)</li>
<li>Testes isolados — você pode importar só o router e testar com <code>supertest</code></li>
</ul>

<div class="callout callout-info"><div class="callout-title">mergeParams</div><div>Sem <code>{ mergeParams: true }</code>, o router filho não enxerga params do pai. Esqueça e <code>req.params.postId</code> vira <code>undefined</code>.</div></div>

<h2>Boas práticas</h2>
<ul>
<li>Um arquivo por recurso (<code>users.js</code>, <code>posts.js</code>), nunca tudo em <code>app.js</code></li>
<li>Middleware específico do router fica dentro do arquivo do router</li>
<li>Error handlers podem ser por router para tratamento contextual (ex.: 404 customizado por área)</li>
<li>Mantenha o handler curto — extraia lógica para serviços/casos de uso</li>
<li>Use <code>router.route('/:id').get(...).put(...).delete(...)</code> para reduzir repetição de path</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Auto-loader</div><div>Em projetos grandes, use <code>fs.readdir</code> ou <code>fast-glob</code> para montar todos os arquivos de <code>routes/</code> automaticamente, evitando esquecer de importar.</div></div>`}})]})}export{a as default};

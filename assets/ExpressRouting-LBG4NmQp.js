import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · iniciante · 10 min"}),e.jsx("h1",{children:"Roteamento e parâmetros"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Roteamento em Express é o casamento entre método HTTP e path. Cada combinação aponta para uma cadeia de middlewares terminando num handler. Saber como params, query e body diferem é o primeiro passo para APIs RESTful sólidas.</p>

<h2>Conceito</h2>
<pre><code class="language-js">app.get('/users', listUsers);
app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.patch('/users/:id', patchUser);
app.delete('/users/:id', removeUser);

// método arbitrário
app.all('/health', (req, res) =&gt; res.json({ ok: true }));</code></pre>

<h2>Tipos de input</h2>
<ul>
<li><strong>req.params</strong> — segmentos de URL (<code>:id</code>); sempre string</li>
<li><strong>req.query</strong> — parâmetros após <code>?</code>; string ou objeto/array (com <code>qs</code>)</li>
<li><strong>req.body</strong> — corpo, populado por <code>express.json()</code> ou <code>express.urlencoded()</code></li>
<li><strong>req.headers</strong> — sempre lowercase, string ou string[]</li>
<li><strong>req.cookies</strong> — com <code>cookie-parser</code></li>
</ul>
<pre><code class="language-js">app.get('/users/:id', (req, res) =&gt; {
  req.params.id;          // '42' (string)
  req.query.page;         // '2' (string)
  req.query.tags;         // ['a','b'] se ?tags=a&amp;tags=b
  req.body;               // populado se express.json() montado
  req.headers['x-trace']; // header arbitrário
});</code></pre>

<h2>Padrões de path</h2>
<pre><code class="language-js">// múltiplos params
app.get('/users/:userId/posts/:postId', handler);

// param opcional (Express 4 com ?, Express 5 mudou)
app.get('/posts/:slug?', handler);

// extensão
app.get('/file/:name.:ext', handler);  // /file/foo.png → { name:'foo', ext:'png' }

// múltiplos paths
app.get(['/legacy', '/old', '/deprecated'], handler);

// regex (use com cuidado)
app.get(/^\\/u\\/[a-z]+$/i, handler);</code></pre>

<h2>Exemplo prático: CRUD completo</h2>
<pre><code class="language-js">import { Router } from 'express';
import { ah } from '../utils/ah.js';

const r = Router();

r.route('/users')
 .get(ah(async (req, res) =&gt; {
   const { page = 1, limit = 20, q } = req.query;
   const users = await db.users.search({ page: Number(page), limit: Number(limit), q });
   res.json(users);
 }))
 .post(ah(async (req, res) =&gt; {
   const u = await db.users.create(req.body);
   res.status(201).location(\\\`/users/\\${u.id}\\\`).json(u);
 }));

r.route('/users/:id')
 .get(ah(async (req, res) =&gt; {
   const u = await db.users.find(req.params.id);
   if (!u) return res.sendStatus(404);
   res.json(u);
 }))
 .patch(ah(async (req, res) =&gt; {
   const u = await db.users.update(req.params.id, req.body);
   res.json(u);
 }))
 .delete(ah(async (req, res) =&gt; {
   await db.users.remove(req.params.id);
   res.sendStatus(204);
 }));

export default r;</code></pre>

<h2>Quando usar</h2>
<ul>
<li><strong>params</strong> — identificadores obrigatórios da rota (<code>/users/:id</code>)</li>
<li><strong>query</strong> — filtros, paginação, ordenação opcionais</li>
<li><strong>body</strong> — payloads de criação/atualização</li>
<li><strong>headers</strong> — auth, content-type, request id, idioma</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Tudo é string</div><div><code>req.params</code> e <code>req.query</code> nunca são números. Converta com <code>Number()</code> ou (melhor) valide com <code>zod.coerce.number()</code> antes de usar.</div></div>

<h2>Boas práticas</h2>
<ul>
<li>Siga REST: substantivos no plural, verbos via método HTTP</li>
<li>Status codes consistentes: 200 GET, 201 POST, 204 DELETE, 422 validação</li>
<li>Inclua <code>Location</code> em 201 com a URL do recurso criado</li>
<li>Valide TODO input com zod/joi antes de usar</li>
<li>Não use <code>app.all</code> para CORS preflight — use a lib <code>cors</code></li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Express 5</div><div>Sintaxe de wildcards e opcionais mudou (path-to-regexp v6). Veja o <em>migration guide</em> antes de subir o major.</div></div>`}})]})}export{t as default};

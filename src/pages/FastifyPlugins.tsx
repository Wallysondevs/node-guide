export default function FastifyPlugins() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 8 min</div>
      <h1>Plugins</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>No Fastify, <strong>tudo é plugin</strong>: rotas, hooks, decorators, integrações. Plugins são a unidade fundamental de organização e o segredo do encapsulamento que torna o framework previsível em projetos grandes.</p>

<h2>Conceito</h2>
<p>Um plugin é uma função <code>async (fastify, opts) =&gt; { ... }</code> que recebe a instância e registra coisas nela. Por padrão, tudo que ele registra fica <strong>encapsulado</strong> naquele escopo — não vaza para o pai. Para vazar (compartilhar), envolve com <code>fastify-plugin</code>.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// plugins/db.js — vaza decorator pro app
import fp from 'fastify-plugin';
import { Pool } from 'pg';

export default fp(async (app, opts) =&gt; {
  const db = new Pool({ connectionString: opts.url });
  await db.query('SELECT 1');
  app.decorate('db', db);
  app.addHook('onClose', async () =&gt; db.end());
}, { name: 'db', dependencies: [] });</code></pre>

<pre><code class="language-js">// routes/users.js — encapsulado, suas rotas não vazam
export default async function usersRoutes(app) {
  app.get('/', async () =&gt; (await app.db.query('SELECT * FROM users')).rows);
  app.get('/:id', async (req) =&gt; {
    const { rows } = await app.db.query('SELECT * FROM users WHERE id=\\$1', [req.params.id]);
    return rows[0] ?? { error: 'not found' };
  });
}</code></pre>

<pre><code class="language-js">// app.js — composição
import Fastify from 'fastify';
import db from './plugins/db.js';
import usersRoutes from './routes/users.js';

const app = Fastify({ logger: true });
await app.register(db, { url: process.env.DATABASE_URL });
await app.register(usersRoutes, { prefix: '/users' });
await app.listen({ port: 3000 });</code></pre>

<h3>Autoload</h3>
<pre><code class="language-js">import autoload from '@fastify/autoload';
import path from 'node:path';

await app.register(autoload, { dir: path.join(import.meta.dirname, 'plugins') });
await app.register(autoload, { dir: path.join(import.meta.dirname, 'routes'), options: { prefix: '/api' } });</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Conexões compartilhadas (db, redis, kafka) com lifecycle hook de close.</li>
<li>Grupos de rotas isolados (cada feature em seu próprio plugin).</li>
<li>Aplicar middlewares/hooks só em um subconjunto de rotas (auth para <code>/admin/*</code>).</li>
<li>Bibliotecas oficiais: <code>@fastify/cors</code>, <code>@fastify/jwt</code>, <code>@fastify/swagger</code>.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Use <code>fastify-plugin</code> só quando precisar vazar — encapsulamento é seu amigo.</li>
<li>Declare <code>dependencies</code> e <code>name</code> em plugins compartilhados para erros claros.</li>
<li>Nunca registre plugins <em>dentro</em> de handlers — registre no boot.</li>
<li>Aguarde com <code>await app.register(...)</code> se a ordem importa.</li>
<li>Um arquivo por plugin facilita testes isolados.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Encapsulamento explicado</div><div>Sem <code>fastify-plugin</code>, decorators e hooks ficam só no escopo daquele plugin (e filhos). Com <code>fp</code>, eles sobem para o pai. Essa é a regra que define toda a arquitetura.</div></div>

<div class="callout callout-tip"><div class="callout-title">Testes</div><div>Como cada plugin é uma função pura sobre uma instância, você pode subir uma <code>Fastify()</code> só com o plugin sob teste — sem mocks complicados.</div></div>`}} />
    </article>
  );
}

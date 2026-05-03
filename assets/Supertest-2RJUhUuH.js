import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Testing · intermediario · 7 min"}),e.jsx("h1",{children:"Supertest: testar HTTP"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>Supertest</strong> é a forma idiomática de escrever testes de integração HTTP em Node. Ele inicia seu app Express/Fastify/Koa em uma porta efêmera, manda requests reais e devolve uma API fluente para assertar status, body e headers.</p>

<h2>Conceito</h2>
<p>Você passa um <code>app</code> (qualquer handler compatível com <code>http.createServer</code>) ou uma URL. Supertest sobe um listener temporário, executa a request com <code>superagent</code>, fecha. Funciona com Vitest, Jest e <code>node:test</code>.</p>

<pre><code class="language-bash">npm i -D supertest @types/supertest</code></pre>

<h2>Exemplo prático com Vitest</h2>
<pre><code class="language-ts">import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { db, migrate } from '../src/db.js';

beforeAll(async () =&gt; {
  await migrate();
});

afterAll(async () =&gt; {
  await db.close();
});

describe('GET /users', () =&gt; {
  it('lista vazia inicialmente', async () =&gt; {
    const res = await request(app).get('/users').expect(200);
    expect(res.body.data).toEqual([]);
  });

  it('cria e busca', async () =&gt; {
    const create = await request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({ name: 'Ana', email: 'ana@ex.com' })
      .expect(201);

    expect(create.body).toMatchObject({ name: 'Ana' });

    const list = await request(app).get('/users').expect(200);
    expect(list.body.data).toHaveLength(1);
  });
});</code></pre>

<h3>Validação de erro</h3>
<pre><code class="language-ts">it('400 sem email', async () =&gt; {
  const res = await request(app)
    .post('/users')
    .send({ name: 'X' })
    .expect(400);

  expect(res.body.error.code).toBe('VALIDATION_ERROR');
  expect(res.body.error.details[0].field).toBe('email');
});</code></pre>

<h3>Auth com token</h3>
<pre><code class="language-ts">async function loginAs(email, password) {
  const res = await request(app)
    .post('/login')
    .send({ email, password })
    .expect(200);
  return res.body.token;
}

it('rota protegida', async () =&gt; {
  const token = await loginAs('a@b.c', '123456');
  await request(app)
    .get('/me')
    .set('Authorization', 'Bearer ' + token)
    .expect(200);
});</code></pre>

<h3>Upload e cookies</h3>
<pre><code class="language-ts">await request(app)
  .post('/avatar')
  .attach('file', 'tests/fixtures/avatar.png')
  .field('userId', '42')
  .expect(201);

const agent = request.agent(app); // mantém cookies entre requests
await agent.post('/login').send(creds);
await agent.get('/me').expect(200);</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Testes de integração de rotas — verificar contrato HTTP completo.</li>
<li>Smoke tests em CI antes de promover build.</li>
<li>Verificar middlewares (cors, auth, rate limit) atuando junto.</li>
<li>Reproduzir bugs de produção com payload exato em teste regressivo.</li>
<li>Documentação executável: cada request real serve como exemplo.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Exporte o <code>app</code> separado do <code>listen</code> — supertest cria seu próprio servidor.</li>
<li>Use <strong>banco de teste isolado</strong> (sqlite in-memory ou postgres em container) e limpe entre testes.</li>
<li>Não compartilhe estado entre testes; cada um deve poder rodar isolado.</li>
<li>Para webhooks externos, use <code>nock</code> ou MSW para interceptar HTTP de saída.</li>
<li>Asserções específicas (<code>.expect(201)</code>, <code>.expect('Content-Type', /json/)</code>) falham mais cedo e melhoram diagnóstico.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Sem porta fixa</div><div>Passar o <code>app</code> direto (sem chamar <code>listen</code>) faz Supertest abrir e fechar uma porta efêmera por request. Você nunca esbarra em "EADDRINUSE" ao paralelizar testes.</div></div>

<div class="callout callout-warn"><div class="callout-title">Não esqueça de await</div><div>Cada chamada Supertest retorna uma Promise. Esquecer o <code>await</code> faz o teste passar mesmo se a request falhar — falsos positivos silenciosos.</div></div>`}})]})}export{r as default};

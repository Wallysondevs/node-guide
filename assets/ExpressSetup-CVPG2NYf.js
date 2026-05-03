import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · iniciante · 10 min"}),e.jsx("h1",{children:"Express: setup"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Express continua sendo o framework HTTP mais popular do Node. É minimalista — você compõe a aplicação somando middlewares — e tem ecossistema imenso. Esta página mostra um setup limpo e production-ready.</p>

<h2>Instalação</h2>
<pre><code class="language-bash">npm init -y
npm i express
npm i -D @types/express typescript tsx</code></pre>

<h2>Estrutura mínima</h2>
<pre><code class="language-bash">.
├── src/
│   ├── app.ts          # constrói o app (sem listen)
│   ├── server.ts       # importa app e dá listen
│   ├── routes/
│   │   ├── users.ts
│   │   └── health.ts
│   ├── middlewares/
│   │   └── auth.ts
│   └── utils/
│       └── ah.ts
├── package.json
└── tsconfig.json</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-ts">// src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { randomUUID } from 'node:crypto';
import users from './routes/users.js';
import health from './routes/health.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // request id
  app.use((req, _res, next) =&gt; { (req as any).id = randomUUID(); next(); });

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') }));
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/health', health);
  app.use('/users', users);

  // 404
  app.use((req, res) =&gt; res.status(404).json({ error: 'not found' }));

  // error handler
  app.use((err: any, req: any, res: any, _next: any) =&gt; {
    const status = err.status ?? 500;
    if (status &gt;= 500) console.error({ requestId: req.id, err });
    res.status(status).json({ error: err.message ?? 'internal' });
  });

  return app;
}</code></pre>

<pre><code class="language-ts">// src/server.ts
import { createApp } from './app.js';

const app = createApp();
const port = Number(process.env.PORT ?? 3000);

const server = app.listen(port, () =&gt; {
  console.log(\\\`http://localhost:\\${port}\\\`);
});

// graceful shutdown
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () =&gt; {
    console.log(\\\`\\${sig} recebido, encerrando...\\\`);
    server.close(() =&gt; process.exit(0));
    setTimeout(() =&gt; process.exit(1), 10_000).unref();
  });
}</code></pre>

<h2>Scripts úteis</h2>
<pre><code class="language-json">{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "test": "vitest"
  }
}</code></pre>

<h2>Quando usar Express</h2>
<ul>
<li>Equipe já conhece — curva zero</li>
<li>Precisa de ecossistema gigante (auth, sockets, GraphQL)</li>
<li>API simples ou monolito server-rendered</li>
<li>Compatibilidade com middlewares Connect legados</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Alternativas</div><div>Para alta performance considere <strong>Fastify</strong> (~2x mais rápido, schema validation nativo). Para serverless e edge, <strong>Hono</strong>. Para tipos fim-a-fim, <strong>tRPC</strong>.</div></div>

<h2>Boas práticas</h2>
<ul>
<li>Separe <code>app.ts</code> (sem listen) de <code>server.ts</code> — facilita testes com supertest</li>
<li><code>app.disable('x-powered-by')</code> esconde o header revelador</li>
<li><code>app.set('trust proxy', 1)</code> quando atrás de nginx/ELB para <code>req.ip</code> correto</li>
<li>Implemente graceful shutdown — SIGTERM em containers exige isso</li>
<li>Não use o singleton <code>app</code> exportado direto; exporte uma factory <code>createApp()</code></li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Hot reload</div><div><code>tsx watch</code> (ou <code>node --watch</code> a partir do 20) recarrega o servidor a cada save sem precisar de nodemon.</div></div>`}})]})}export{a as default};

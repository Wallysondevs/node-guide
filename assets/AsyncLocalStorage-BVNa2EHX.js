import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Eventos · avancado · 9 min"}),e.jsx("h1",{children:"AsyncLocalStorage"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><code>AsyncLocalStorage</code> (ALS) propaga contexto através de cadeias assíncronas — equivalente a <em>thread-local</em> em outras linguagens. É a base de tracing distribuído, request-id e multi-tenant em frameworks modernos.</p>

<h2>Conceito</h2>
<p>Você cria uma instância e chama <code>als.run(store, fn)</code>. Qualquer código que rode dentro de <code>fn</code> (mesmo após vários <code>await</code>) recupera o store via <code>als.getStore()</code>. O Node usa <em>async hooks</em> internamente para amarrar cada Promise/timer ao contexto vigente.</p>
<pre><code class="language-js">import { AsyncLocalStorage } from 'node:async_hooks';

export const als = new AsyncLocalStorage();

als.run({ reqId: 'abc-123' }, async () =&gt; {
  await algumIO();
  console.log(als.getStore());   // { reqId: 'abc-123' }
});</code></pre>

<h2>Exemplo prático: middleware Express com request-id</h2>
<pre><code class="language-js">import express from 'express';
import { randomUUID } from 'node:crypto';
import { als } from './als.js';

const app = express();

app.use((req, res, next) =&gt; {
  als.run({ reqId: randomUUID(), ip: req.ip }, () =&gt; next());
});

function log(msg) {
  const ctx = als.getStore() ?? {};
  console.log(\`[\${ctx.reqId ?? '-'}] \${msg}\`);
}

app.get('/users/:id', async (req, res) =&gt; {
  log('handler iniciado');
  const u = await db.user(req.params.id);
  log('db ok');
  res.json(u);
});</code></pre>

<h2>Atualizando o store</h2>
<pre><code class="language-js">// store é referência: mutar funciona
const ctx = als.getStore();
ctx.userId = req.user.id;

// ou empilhar contexto temporário:
als.run({ ...ctx, op: 'billing' }, async () =&gt; {
  await cobrar();
});</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Logs estruturados com <code>requestId</code>, <code>traceId</code>, <code>userId</code>.</li>
<li>OpenTelemetry / APM (Datadog, New Relic) para correlacionar spans.</li>
<li>Multi-tenancy: amarrar a query do ORM ao tenant atual sem passar parâmetro.</li>
<li>Feature flags por request.</li>
<li>Auditoria: gravar quem fez cada mutação no banco.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Callbacks em código nativo (alguns drivers C++) podem perder contexto. Teste em produção.</li>
<li>Tem custo: ~5–10% em hot paths. Aceitável, mas meça antes de abusar.</li>
<li>Não funciona em <code>worker_threads</code> diferentes — cada worker tem seu storage.</li>
<li>Evite armazenar <em>tudo</em> da request — guarde só identificadores e metadados pequenos.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Pino + ALS</div><div>O logger <code>pino-http</code> integra direto com ALS via <code>req.log.child</code> — toda linha sai com o requestId já preenchido.</div></div>

<div class="callout callout-warn"><div class="callout-title">enterWith</div><div>Existe <code>als.enterWith(store)</code> que não exige callback, mas vaza contexto para tudo que rodar depois no mesmo "tick assíncrono". Use só se souber bem o que está fazendo.</div></div>`}})]})}export{t as default};

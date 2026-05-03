import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · intermediario · 7 min"}),e.jsx("h1",{children:"Express vs Fastify"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Express e Fastify são os dois frameworks HTTP mais usados em Node. Ambos são minimalistas, mas têm filosofias diferentes em torno de performance, validação e ecossistema. Saber quando escolher cada um é parte do trabalho de um dev backend Node.</p>

<h2>Conceito</h2>
<p><strong>Express</strong> (2010) é o padrão de fato: API minúscula baseada em middlewares <code>(req, res, next)</code>, ecossistema gigantesco e estável. Pouca opinião — você monta tudo.</p>
<p><strong>Fastify</strong> (2017) foca em <em>throughput</em> e validação por schema (JSON Schema). Tem um sistema de plugins encapsulados e é cerca de 2–3x mais rápido em benchmarks sintéticos.</p>

<h2>Exemplo prático</h2>
<p>O mesmo endpoint nos dois frameworks.</p>
<pre><code class="language-js">// Express
import express from 'express';
const app = express();
app.use(express.json());

app.get('/users/:id', async (req, res) =&gt; {
  const user = await db.user.find(req.params.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
});

app.listen(3000);</code></pre>

<pre><code class="language-js">// Fastify
import Fastify from 'fastify';
const app = Fastify({ logger: true });

app.get('/users/:id', {
  schema: {
    params: { type: 'object', properties: { id: { type: 'string' } } },
    response: { 200: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } } },
  },
}, async (req, reply) =&gt; {
  const user = await db.user.find(req.params.id);
  if (!user) return reply.code(404).send({ error: 'not found' });
  return user;
});

await app.listen({ port: 3000 });</code></pre>

<h2>Diferenças principais</h2>
<ul>
<li><strong>Performance:</strong> Fastify ~2-3x mais rápido (router radix tree + serialização por schema).</li>
<li><strong>Validação:</strong> Fastify tem JSON Schema embutido; Express precisa de Zod/Joi/express-validator.</li>
<li><strong>Async:</strong> Fastify trata <code>async</code> nativamente; Express até v5 exigia <code>asyncHandler</code> ou try/catch.</li>
<li><strong>Plugins:</strong> Fastify encapsula contexto por plugin (escopo); Express tudo é global.</li>
<li><strong>TypeScript:</strong> Fastify foi escrito pensando em TS; tipos do Express vêm de <code>@types/express</code>.</li>
<li><strong>Ecossistema:</strong> Express tem ordem de magnitude mais middlewares prontos no npm.</li>
</ul>

<h2>Quando usar</h2>
<ul>
<li><strong>Express</strong>: time iniciante, integração com ferramentas legadas, prototipagem rápida, BFFs simples.</li>
<li><strong>Fastify</strong>: APIs com SLA agressivo, alta carga, contratos rígidos por JSON Schema, microsserviços.</li>
<li>Para projetos novos em TS com foco em performance, <strong>Fastify</strong> é a escolha mais moderna.</li>
<li>Para manter código de equipe que já conhece Express, não migre só por hype.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>No Fastify, <code>return</code> envia a resposta — não chame <code>reply.send()</code> e <code>return</code> juntos.</li>
<li>Schemas de <code>response</code> no Fastify <em>filtram</em> campos não declarados (segurança implícita).</li>
<li>Plugins Fastify não-encapsulados precisam de <code>fastify-plugin</code> para vazar contexto.</li>
<li>Express 5 já corrigiu o problema de promises rejeitadas em handlers.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Benchmark não é tudo</div><div>Em produção, gargalos costumam ser banco e I/O externo. A escolha do framework raramente é o limite de throughput real.</div></div>

<div class="callout callout-tip"><div class="callout-title">Migração</div><div>Migrar de Express para Fastify costuma valer a pena quando você quer schemas como contrato e logs estruturados de fábrica (pino).</div></div>`}})]})}export{i as default};

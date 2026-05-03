import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Fastify · intermediario · 8 min"}),e.jsx("h1",{children:"Schemas e validação"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Schemas são o coração do Fastify: validam entradas, serializam saídas e geram documentação. Você descreve os contratos uma única vez e ganha validação, performance e tipos.</p>

<h2>Conceito</h2>
<p>Para cada rota você pode definir <code>schema.{ body, querystring, params, headers, response }</code>. Validação usa <strong>Ajv</strong>; serialização usa <strong>fast-json-stringify</strong>. Quando declarado, o response é <em>filtrado</em> — campos não previstos são removidos antes de ir pro cliente.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">app.post('/users', {
  schema: {
    body: {
      type: 'object',
      required: ['email'],
      additionalProperties: false,
      properties: {
        email: { type: 'string', format: 'email' },
        age: { type: 'integer', minimum: 13, maximum: 120 },
        role: { type: 'string', enum: ['admin', 'user'], default: 'user' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: { id: { type: 'string' }, email: { type: 'string' } },
      },
      '4xx': {
        type: 'object',
        properties: { error: { type: 'string' }, message: { type: 'string' } },
      },
    },
  },
  handler: async (req, reply) =&gt; {
    const user = await db.user.create(req.body);
    return reply.code(201).send(user);
  },
});</code></pre>

<h3>Schemas reusáveis</h3>
<pre><code class="language-js">app.addSchema({
  \\$id: 'User',
  type: 'object',
  properties: { id: { type: 'string' }, email: { type: 'string' } },
});

app.get('/users/:id', {
  schema: { response: { 200: { \\$ref: 'User#' } } },
}, getById);</code></pre>

<h3>TypeBox para tipos automáticos</h3>
<pre><code class="language-ts">import { Type, Static } from '@sinclair/typebox';

const CreateUser = Type.Object({
  email: Type.String({ format: 'email' }),
  age: Type.Integer({ minimum: 13 }),
});

type CreateUserT = Static&lt;typeof CreateUser&gt;;

app.post&lt;{ Body: CreateUserT }&gt;('/users', {
  schema: { body: CreateUser },
}, async (req) =&gt; createUser(req.body));</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>APIs com contratos rígidos onde o cliente não pode mandar campos extras.</li>
<li>Filtragem implícita de dados sensíveis (campo <code>password</code> nunca declarado no response).</li>
<li>Geração de OpenAPI via <code>@fastify/swagger</code>.</li>
<li>Performance crítica: serialização por schema é ~2x mais rápida que <code>JSON.stringify</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Response schema filtra silenciosamente</strong>: campos faltando no schema simplesmente somem do JSON. Ótimo pra segurança, ruim quando você esquece de incluir um.</li>
<li><code>additionalProperties: false</code> no body rejeita campos extras — recomendado.</li>
<li>Date virando string: schema só lida com tipos JSON; converta <code>Date</code> antes de retornar.</li>
<li>Ajv por padrão não coage tipos; configure <code>coerceTypes: true</code> se precisar (cuidado com query string).</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">OpenAPI grátis</div><div>Com <code>@fastify/swagger</code> + schemas declarados, você ganha um <code>/docs</code> com Swagger UI sem trabalho extra.</div></div>

<div class="callout callout-warn"><div class="callout-title">Zod no Fastify</div><div>Para usar Zod direto, instale <code>fastify-type-provider-zod</code>. Ele converte o schema Zod em JSON Schema por baixo dos panos.</div></div>`}})]})}export{t as default};

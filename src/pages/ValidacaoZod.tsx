export default function ValidacaoZod() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 11 min</div>
      <h1>Validação completa com Zod</h1>
      <div dangerouslySetInnerHTML={{__html: `
<p><strong>Zod</strong> é uma biblioteca de validação de schemas com inferência de tipos para TypeScript. Você descreve a forma do dado uma vez e ganha validação em runtime + tipo estático automaticamente.</p>

<h2>Conceito</h2>
<p>Cada schema é um objeto com método <code>.parse(data)</code> (joga em erro) ou <code>.safeParse(data)</code> (retorna <code>{success, data | error}</code>). Use <code>z.infer&lt;typeof Schema&gt;</code> para extrair o tipo TS — o tipo segue o schema sempre.</p>

<pre><code class="language-bash">npm i zod</code></pre>

<pre><code class="language-ts">import { z } from 'zod';

const User = z.object({
  email: z.string().email(),
  age: z.number().int().min(18),
  role: z.enum(['admin', 'user']).default('user'),
});

type User = z.infer&lt;typeof User&gt;;</code></pre>

<h2>Exemplo prático: middleware Express</h2>
<pre><code class="language-ts">import { z, ZodError } from 'zod';

const PaginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['asc', 'desc']).default('desc'),
});

const CreatePost = z.object({
  title: z.string().min(3).max(200),
  body: z.string().min(10),
  tags: z.array(z.string()).max(5).optional(),
});

function validate(schemas) {
  return (req, res, next) =&gt; {
    try {
      if (schemas.body)   req.body   = schemas.body.parse(req.body);
      if (schemas.query)  req.query  = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.flatten() });
      }
      next(err);
    }
  };
}

app.post('/posts',
  validate({ body: CreatePost, query: PaginationQuery }),
  postsController.create);</code></pre>

<h3>Refinamentos e transformações</h3>
<pre><code class="language-ts">const Password = z.object({
  password: z.string().min(8),
  confirm: z.string(),
}).refine(d =&gt; d.password === d.confirm, {
  message: 'senhas não conferem',
  path: ['confirm'],
});

const DateString = z.string().transform((s, ctx) =&gt; {
  const d = new Date(s);
  if (isNaN(d.getTime())) {
    ctx.addIssue({ code: 'custom', message: 'data inválida' });
    return z.NEVER;
  }
  return d;
});</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Validar request body, query e params.</li>
<li>Validar variáveis de ambiente no boot do app.</li>
<li>Validar payloads de webhooks.</li>
<li>Parsear respostas de APIs externas que você não controla.</li>
<li>Substituir DTOs verbosos por schemas tipados.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Use <code>z.coerce.number()</code> para query strings (que sempre chegam como string).</li>
<li>Centralize schemas em <code>src/schemas/</code> e exporte os tipos derivados.</li>
<li>Use <code>.strict()</code> para rejeitar campos extras quando importar.</li>
<li>Cuidado com <code>.default()</code> em schemas usados para output — só faz sentido em input.</li>
<li>Em hot path (milhares de req/s) considere <code>valibot</code> que é mais leve.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Env validation</div><div>Valide <code>process.env</code> no boot. Erra cedo e claro em vez de quebrar no primeiro request.</div></div>

<div class="callout callout-info"><div class="callout-title">OpenAPI</div><div>Com <code>zod-to-openapi</code> você gera a spec automaticamente a partir dos schemas — single source of truth.</div></div>
`}} />
    </article>
  );
}

export default function ExpressValidation() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 9 min</div>
      <h1>Validação com Zod</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Validar entrada é a primeira linha de defesa de qualquer API. <strong>Zod</strong> oferece schemas declarativos com inferência de tipos em TypeScript, o que elimina a duplicação entre validação em runtime e tipagem estática.</p>

<h2>Conceito</h2>
<p>Um schema Zod é ao mesmo tempo um <em>parser</em> (transforma e valida dados) e uma fonte de tipos. Em Express, encapsulamos o parse em um middleware que substitui <code>req.body</code> pelo dado normalizado.</p>
<pre><code class="language-bash">npm i zod</code></pre>
<pre><code class="language-ts">import { z } from 'zod';

export const CreateUser = z.object({
  email: z.string().email(),
  age: z.coerce.number().int().min(13).max(120),
  role: z.enum(['admin', 'user']).default('user'),
});

export type CreateUserDto = z.infer&lt;typeof CreateUser&gt;;</code></pre>

<h2>Exemplo prático</h2>
<p>Middleware genérico que valida <code>body</code>, <code>query</code> ou <code>params</code> e devolve erros estruturados em 400.</p>
<pre><code class="language-ts">import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';

type Source = 'body' | 'query' | 'params';

export const validate = (schema: ZodTypeAny, where: Source = 'body') =&gt;
  (req: Request, res: Response, next: NextFunction) =&gt; {
    const result = schema.safeParse(req[where]);
    if (!result.success) {
      return res.status(400).json({
        error: 'ValidationError',
        issues: result.error.flatten(),
      });
    }
    (req as any)[where] = result.data;
    next();
  };

app.post('/users', validate(CreateUser), async (req, res) =&gt; {
  const user = await db.user.create({ data: req.body });
  res.status(201).json(user);
});</code></pre>

<h3>Validando query string</h3>
<pre><code class="language-ts">const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).optional(),
});

app.get('/users', validate(ListQuery, 'query'), listUsers);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Validar payloads JSON em endpoints REST.</li>
<li>Coerção de tipos vindos de query string (sempre strings).</li>
<li>Sanitização (<code>trim</code>, <code>toLowerCase</code>) antes de gravar no banco.</li>
<li>Compartilhar schemas entre back-end e front-end (mesmo pacote).</li>
<li>Gerar tipos DTO sem manter <code>interface</code> em paralelo.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>req.query</code> é sempre <code>string</code> ou <code>string[]</code>: use <code>z.coerce.number()</code> ou <code>z.string().transform(Number)</code>.</li>
<li><code>safeParse</code> não lança — sempre cheque <code>result.success</code>.</li>
<li>Use <code>.strict()</code> para rejeitar campos desconhecidos quando o cliente não pode mandar lixo.</li>
<li>Schemas reusáveis devem viver fora do handler para não recriar a cada request.</li>
<li>Para mensagens em PT-BR, passe <code>{ message: 'Email inválido' }</code> em cada validador.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Tipos grátis</div><div><code>type CreateUserDto = z.infer&lt;typeof CreateUser&gt;</code> deriva o tipo do schema — uma fonte da verdade.</div></div>

<div class="callout callout-warn"><div class="callout-title">Não confie no cliente</div><div>Mesmo com validação no front, valide de novo no back. O cliente pode ser modificado, scripts podem chamar sua API direto.</div></div>`}} />
    </article>
  );
}

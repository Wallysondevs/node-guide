export default function ExpressValidation() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 7 min</div>
      <h1>Validação com Zod</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i zod</code></pre><pre><code class="language-js">import { z } from 'zod';

const CreateUser = z.object({
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
});

function validate(schema) {
  return (req, res, next) =&gt; {
    const r = schema.safeParse(req.body);
    if (!r.success) return res.status(400).json({ errors: r.error.flatten() });
    req.body = r.data;
    next();
  };
}

app.post('/users', validate(CreateUser), createUser);</code></pre><div class="callout callout-tip"><div class="callout-title">Tipos grátis</div><div><code>type CreateUserDto = z.infer&lt;typeof CreateUser&gt;</code> — types derivados sem duplicação.</div></div>`}} />
    </article>
  );
}

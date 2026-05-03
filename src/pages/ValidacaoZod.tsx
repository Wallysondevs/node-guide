export default function ValidacaoZod() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 7 min</div>
      <h1>Validação completa com Zod</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { z } from 'zod';

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

type CreatePostDto = z.infer&lt;typeof CreatePost&gt;;

function validate(schemas) {
  return (req, res, next) =&gt; {
    if (schemas.body) req.body = schemas.body.parse(req.body);
    if (schemas.query) req.query = schemas.query.parse(req.query);
    if (schemas.params) req.params = schemas.params.parse(req.params);
    next();
  };
}</code></pre>`}} />
    </article>
  );
}

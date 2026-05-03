export default function ExpressAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 9 min</div>
      <h1>Async handlers</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Express 4 não captura <em>rejections</em> de Promises em handlers <code>async</code>. Quando uma exceção escapa, o request fica pendurado e a aplicação pode até crashar com <code>unhandledRejection</code>. Express 5 (já estável em 2024) corrige isso, mas a maioria das bases ainda roda 4.</p>

<h2>O problema</h2>
<pre><code class="language-js">// errado — erro silencioso, request pendura até timeout
app.get('/users/:id', async (req, res) =&gt; {
  const data = await db.query('SELECT ...', [req.params.id]);
  res.json(data);
});</code></pre>
<p>Se <code>db.query</code> rejeita, Express não sabe — o middleware de erro nunca é chamado e o cliente espera 30s até o load balancer cortar.</p>

<h2>Solução clássica: wrapper</h2>
<pre><code class="language-js">// utils/ah.js
export const ah = (fn) =&gt; (req, res, next) =&gt;
  Promise.resolve(fn(req, res, next)).catch(next);

// uso
app.get('/users/:id', ah(async (req, res) =&gt; {
  const data = await db.query('SELECT ...', [req.params.id]);
  if (!data) throw new HttpError(404, 'not found');
  res.json(data);
}));

// error handler captura
app.use((err, req, res, _next) =&gt; {
  res.status(err.status ?? 500).json({ error: err.message });
});</code></pre>

<h2>Alternativas</h2>
<ul>
<li><strong>express-async-errors</strong> — patch global, basta <code>import 'express-async-errors'</code> no topo</li>
<li><strong>Express 5</strong> — suporte nativo, sem wrapper</li>
<li><strong>express-async-handler</strong> — equivalente ao <code>ah</code> acima, com types</li>
</ul>

<h2>Exemplo prático com tipagem</h2>
<pre><code class="language-ts">import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const ah = &lt;P, B, Q&gt;(
  fn: (req: Request&lt;P, unknown, B, Q&gt;, res: Response, next: NextFunction) =&gt; Promise&lt;unknown&gt;
): RequestHandler&lt;P, unknown, B, Q&gt; =&gt;
  (req, res, next) =&gt; { fn(req, res, next).catch(next); };

router.post('/users', ah&lt;{}, CreateUserDTO, {}&gt;(async (req, res) =&gt; {
  const user = await users.create(req.body);
  res.status(201).json(user);
}));</code></pre>

<div class="callout callout-warn"><div class="callout-title">Não esqueça do return</div><div>Em <code>if (err) return res.status(400).json(...)</code>, o <code>return</code> impede o handler de continuar e tentar mandar resposta duas vezes (<code>ERR_HTTP_HEADERS_SENT</code>).</div></div>

<h2>Boas práticas</h2>
<ul>
<li>Crie classes de erro tipadas (<code>HttpError</code>, <code>ValidationError</code>) com <code>.status</code> e <code>.code</code></li>
<li>Centralize o error handler no fim da pipeline, depois de TODAS as rotas</li>
<li>Logue stack traces apenas para 5xx, mantenha 4xx limpos</li>
<li>Não vaze mensagens internas em produção — mapeie para mensagens públicas</li>
<li>Considere migrar para Express 5 ou Fastify se começar projeto novo</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Migração</div><div>Em Express 5, o wrapper <code>ah</code> vira no-op mas continua funcionando. Migre o framework primeiro, remova o wrapper depois.</div></div>`}} />
    </article>
  );
}

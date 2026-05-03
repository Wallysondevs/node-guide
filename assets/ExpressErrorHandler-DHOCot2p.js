import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · intermediario · 10 min"}),e.jsx("h1",{children:"Error handler"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Em Express, qualquer middleware com assinatura de <strong>4 argumentos</strong> <code>(err, req, res, next)</code> é tratado como error handler. Ele deve ser o último <code>app.use</code> da pipeline. Erros chegam lá via <code>next(err)</code> ou via <code>throw</code> dentro de wrappers async.</p>

<h2>Conceito</h2>
<p>Express identifica error handlers pela aridade da função. Se você omitir o <code>_next</code>, vira middleware comum e nunca recebe o erro.</p>
<pre><code class="language-js">// classe base de erros HTTP
class HttpError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

class NotFound extends HttpError { constructor(m='not found') { super(404, m, 'NOT_FOUND'); } }
class Forbidden extends HttpError { constructor(m='forbidden') { super(403, m, 'FORBIDDEN'); } }
class BadRequest extends HttpError { constructor(m, details) { super(400, m, 'BAD_REQUEST'); this.details = details; } }</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { ah } from './utils/ah.js';

app.get('/users/:id', ah(async (req, res) =&gt; {
  const u = await db.user(req.params.id);
  if (!u) throw new NotFound('usuário não encontrado');
  res.json(u);
}));

// 404 catch-all (depois das rotas, antes do error handler)
app.use((req, res, next) =&gt; next(new NotFound(\\\`rota \\${req.method} \\${req.path}\\\`)));

// error handler central
app.use((err, req, res, _next) =&gt; {
  const status = err.status ?? 500;
  const payload = {
    error: {
      code: err.code ?? 'INTERNAL',
      message: status &gt;= 500 ? 'internal server error' : err.message,
      ...(err.details &amp;&amp; { details: err.details }),
    },
    requestId: req.id,
  };
  if (status &gt;= 500) {
    req.log?.error({ err, requestId: req.id }, 'unhandled');
  }
  res.status(status).json(payload);
});</code></pre>

<h2>Erros do próprio Express</h2>
<p>O framework gera erros úteis que você deve reconhecer:</p>
<ul>
<li><strong>SyntaxError</strong> com <code>type === 'entity.parse.failed'</code> — body JSON inválido</li>
<li><strong>PayloadTooLargeError</strong> — request maior que <code>limit</code> do <code>express.json</code></li>
<li><strong>UnauthorizedError</strong> — vindo de libs como <code>express-jwt</code></li>
</ul>
<pre><code class="language-js">app.use((err, req, res, next) =&gt; {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'arquivo grande demais' });
  }
  next(err);
});</code></pre>

<h2>Boas práticas</h2>
<ul>
<li>Sempre tenha <strong>uma</strong> classe base de erro com <code>.status</code> — facilita o handler</li>
<li>Não vaze stack trace ao cliente em produção; logue completo internamente</li>
<li>Inclua <code>requestId</code> (use <code>req.id</code> de <code>express-request-id</code>) na resposta para correlação com logs</li>
<li>Diferencie erros operacionais (4xx) de erros de programação (5xx)</li>
<li>Em 5xx, considere encerrar o processo após responder se o erro indicar estado corrompido (deixar PM2/k8s reiniciar)</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Async sem wrapper</div><div>Em Express 4, <code>throw</code> dentro de handler async <strong>não chega</strong> ao error handler sem <code>ah()</code> ou <code>express-async-errors</code>. O request fica pendurado.</div></div>

<div class="callout callout-tip"><div class="callout-title">Observabilidade</div><div>Plugue o handler em Sentry/Datadog antes do <code>res.status(...)</code> para capturar contexto (user, body, headers) automaticamente.</div></div>`}})]})}export{t as default};

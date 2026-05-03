export default function ExpressMiddleware() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · iniciante · 11 min</div>
      <h1>Middleware</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Middleware é uma função com assinatura <code>(req, res, next)</code> que roda na ordem em que é registrada. É o conceito central do Express — autenticação, logs, parsing, rate limit, tudo é middleware.</p>

<h2>Conceito</h2>
<p>Cada middleware decide se passa adiante (<code>next()</code>), termina a resposta (<code>res.send</code>), ou propaga erro (<code>next(err)</code>). A pipeline percorre middlewares globais, depois middlewares de rota, depois o handler final.</p>
<pre><code class="language-js">// global — roda em toda request
app.use((req, _res, next) =&gt; {
  console.log(req.method, req.url);
  next();
});</code></pre>

<h2>Tipos de middleware</h2>
<ul>
<li><strong>Application-level</strong> — <code>app.use(fn)</code>, roda em tudo</li>
<li><strong>Router-level</strong> — <code>router.use(fn)</code>, roda em todas as rotas do router</li>
<li><strong>Route-specific</strong> — <code>app.get('/x', a, b, handler)</code></li>
<li><strong>Built-in</strong> — <code>express.json()</code>, <code>express.static()</code>, <code>express.urlencoded()</code></li>
<li><strong>Third-party</strong> — <code>cors</code>, <code>helmet</code>, <code>morgan</code></li>
<li><strong>Error-handling</strong> — 4 args <code>(err, req, res, next)</code></li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import express from 'express';
import morgan from 'morgan';

const app = express();

// 1) globais
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));

// 2) middleware de auth (factory pattern)
function auth({ required = true } = {}) {
  return (req, res, next) =&gt; {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      if (required) return res.sendStatus(401);
      return next();
    }
    try {
      req.user = verifyJwt(token);
      next();
    } catch {
      res.sendStatus(401);
    }
  };
}

// 3) validação
function validate(schema) {
  return (req, res, next) =&gt; {
    const r = schema.safeParse(req.body);
    if (!r.success) return res.status(400).json({ errors: r.error.issues });
    req.body = r.data;
    next();
  };
}

// 4) rota com pipeline completa
app.post('/posts',
  auth(),
  validate(createPostSchema),
  async (req, res) =&gt; {
    const post = await db.posts.create({ ...req.body, userId: req.user.id });
    res.status(201).json(post);
  }
);

app.get('/me', auth(), (req, res) =&gt; res.json(req.user));
app.get('/public', auth({ required: false }), (req, res) =&gt; {
  res.json({ user: req.user ?? null });
});</code></pre>

<h2>Ordem importa</h2>
<pre><code class="language-js">// CORRETO: parser antes da rota que lê body
app.use(express.json());
app.post('/x', (req, res) =&gt; res.json(req.body));

// ERRADO: req.body será undefined
app.post('/x', (req, res) =&gt; res.json(req.body));
app.use(express.json());</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Logging estruturado de cada request</li>
<li>Autenticação e autorização</li>
<li>Parsing de body (JSON, multipart)</li>
<li>Rate limiting, CORS, headers de segurança</li>
<li>Injeção de contexto (request id, tenant, locale)</li>
<li>Cache de respostas</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Sempre chame next ou responda</div><div>Esquecer <code>next()</code> ou <code>res.send()</code> faz o request pendurar até o timeout. Use linter (<code>eslint-plugin-promise</code>) para detectar.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li>Não modifique <code>res</code> depois que ele já enviou — vai dar <code>ERR_HTTP_HEADERS_SENT</code></li>
<li>Middlewares assíncronos sem wrapper async vazam erros (veja "Async handlers")</li>
<li>Middleware com mesmo nome de prop em <code>req</code> sobrescreve outros — use namespaces (<code>req.ctx.user</code>)</li>
<li>Em rotas com array <code>app.get('/x', [a, b], handler)</code>, o array vira spread automático</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Composição</div><div>Para reusar várias linhas de pipeline, exporte arrays: <code>export const protectedRoute = [auth(), rateLimit(), audit()]</code> e use <code>app.get('/x', ...protectedRoute, handler)</code>.</div></div>`}} />
    </article>
  );
}

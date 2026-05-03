export default function FastifyDecorators() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 6 min</div>
      <h1>Decorators</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Decorators são o mecanismo do Fastify para anexar propriedades e métodos à instância, ao <code>request</code> ou ao <code>reply</code>. É como você compartilha utilitários (banco, logger, helpers) sem singletons globais e mantendo o tipo conhecido.</p>

<h2>Conceito</h2>
<p>Existem três variantes:</p>
<ul>
<li><code>app.decorate(name, value)</code> — adiciona em <code>fastify.X</code> (instância).</li>
<li><code>app.decorateRequest(name, value)</code> — adiciona em <code>request.X</code>.</li>
<li><code>app.decorateReply(name, value)</code> — adiciona em <code>reply.X</code>.</li>
</ul>
<p>Decorators de <code>request</code>/<code>reply</code> precisam de um <em>valor inicial</em> (mesmo que <code>null</code>) para que o V8 mantenha a hidden class consistente — isso é parte do truque de performance do Fastify.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import Fastify from 'fastify';
import { Pool } from 'pg';

const app = Fastify({ logger: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.decorate('db', pool);
app.decorateRequest('user', null);
app.decorateReply('ok', function (data) {
  this.code(200).send({ status: 'ok', data });
});

app.addHook('preHandler', async (req) =&gt; {
  const token = req.headers.authorization?.replace('Bearer ', '');
  req.user = token ? await verifyJwt(token) : null;
});

app.get('/me', async (req, reply) =&gt; {
  if (!req.user) return reply.code(401).send();
  const { rows } = await app.db.query('SELECT * FROM users WHERE id=\\$1', [req.user.id]);
  return reply.ok(rows[0]);
});

await app.listen({ port: 3000 });</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Injetar conexões (banco, redis, http client) sem importar de módulos globais.</li>
<li>Adicionar <code>request.user</code> populado por hook de auth.</li>
<li>Helpers de resposta padronizados (<code>reply.ok</code>, <code>reply.fail</code>).</li>
<li>Versão tipada de <code>app.config</code> carregada de env.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Não use <em>arrow functions</em> em <code>decorateReply</code>/<code>decorateRequest</code> se precisar de <code>this</code>.</li>
<li>Decorator duplicado lança erro — proteja com <code>app.hasDecorator(name)</code>.</li>
<li>Para tipos em TS, use <em>module augmentation</em> em <code>fastify</code>.</li>
<li>Sem valor inicial em <code>decorateRequest</code> a JIT cai de performance.</li>
</ul>

<h3>Tipando decorators (TypeScript)</h3>
<pre><code class="language-ts">declare module 'fastify' {
  interface FastifyInstance { db: Pool }
  interface FastifyRequest { user: { id: string } | null }
  interface FastifyReply { ok&lt;T&gt;(data: T): FastifyReply }
}</code></pre>

<div class="callout callout-tip"><div class="callout-title">Encapsulamento</div><div>Quando registrado dentro de um plugin <em>encapsulado</em>, o decorator vale só naquele escopo. Use <code>fastify-plugin</code> para vazar para o app inteiro.</div></div>

<div class="callout callout-info"><div class="callout-title">Performance</div><div>Inicializar campos com <code>null</code> em vez de <code>undefined</code> evita transições de hidden class no V8 e mantém o request rápido.</div></div>`}} />
    </article>
  );
}

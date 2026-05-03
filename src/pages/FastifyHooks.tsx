export default function FastifyHooks() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 7 min</div>
      <h1>Hooks</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Hooks são pontos de extensão do ciclo de vida de uma request no Fastify. Eles substituem a ideia de "middleware encadeado" do Express com um modelo mais granular e previsível, permitindo plugar lógica em qualquer fase do processamento.</p>

<h2>Conceito</h2>
<p>O Fastify expõe hooks de <strong>request/reply</strong> e de <strong>app</strong>. Cada um roda em uma fase específica:</p>
<ul>
<li><code>onRequest</code> — primeira coisa, antes de parsing de body.</li>
<li><code>preParsing</code> — antes do parse do payload (útil para descomprimir).</li>
<li><code>preValidation</code> — depois do parse, antes da validação por schema.</li>
<li><code>preHandler</code> — depois da validação, antes do handler. Lugar canônico para auth.</li>
<li><code>preSerialization</code> — antes de serializar resposta (transformar payload).</li>
<li><code>onSend</code> — pode mutar o payload final antes de ir pro socket.</li>
<li><code>onResponse</code> — depois que a resposta foi enviada (métricas).</li>
<li><code>onError</code> — quando o handler ou hook lança.</li>
<li><code>onTimeout</code> — quando bate o timeout configurado.</li>
</ul>
<p>Hooks de app: <code>onReady</code>, <code>onClose</code>, <code>onRoute</code>, <code>onRegister</code>.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import Fastify from 'fastify';
const app = Fastify({ logger: true });

app.addHook('onRequest', async (req) =&gt; {
  req.startedAt = process.hrtime.bigint();
});

app.addHook('preHandler', async (req, reply) =&gt; {
  if (req.routeOptions.config?.auth) {
    const user = await verifyToken(req.headers.authorization);
    if (!user) return reply.code(401).send({ error: 'unauthorized' });
    req.user = user;
  }
});

app.addHook('onResponse', async (req, reply) =&gt; {
  const ns = process.hrtime.bigint() - req.startedAt;
  req.log.info({ ms: Number(ns) / 1e6, status: reply.statusCode }, 'request done');
});

app.get('/private', { config: { auth: true } }, async (req) =&gt; ({ hi: req.user.name }));

await app.listen({ port: 3000 });</code></pre>

<h3>Hook por rota</h3>
<pre><code class="language-js">app.get('/admin', {
  preHandler: async (req, reply) =&gt; {
    if (req.user?.role !== 'admin') reply.code(403).send();
  },
}, adminHandler);</code></pre>

<h2>Quando usar cada um</h2>
<ul>
<li><strong>onRequest</strong>: rate-limit, geo-block, métricas iniciais.</li>
<li><strong>preHandler</strong>: autenticação/autorização, carregar entidades por id.</li>
<li><strong>preSerialization</strong>: mascarar dados sensíveis no payload.</li>
<li><strong>onSend</strong>: comprimir, adicionar headers de cache.</li>
<li><strong>onError</strong>: enviar para Sentry, formatar erro padronizado.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Retornar uma resposta dentro do hook (chamar <code>reply.send</code>) <em>encerra</em> a request — não deixe o handler rodar.</li>
<li>Hooks <code>async</code> funcionam, mas se você usar callback estilo <code>done</code>, não chame <code>done()</code> e <code>return Promise</code> juntos.</li>
<li>Hooks registrados <em>fora</em> de plugin valem globalmente; dentro de plugin encapsulado, valem só naquele escopo.</li>
<li>A ordem de registro importa para hooks da mesma fase.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Auth limpa</div><div>Coloque autenticação em <code>preHandler</code> e marque rotas com <code>config: { auth: true }</code>. Centraliza a lógica e mantém handlers focados no negócio.</div></div>

<div class="callout callout-warn"><div class="callout-title">Cuidado com onSend</div><div>O payload chega serializado (string/Buffer). Para mexer no objeto, use <code>preSerialization</code>.</div></div>`}} />
    </article>
  );
}

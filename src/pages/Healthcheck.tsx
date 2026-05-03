export default function Healthcheck() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Deploy · intermediario · 7 min</div>
      <h1>Healthchecks</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Healthchecks são endpoints que orquestradores (Kubernetes, ECS, Docker Swarm) e load balancers consultam para decidir se reiniciam o container ou se direcionam tráfego. Sem eles, deploys quebram silenciosamente.</p>

<h2>Conceito: liveness vs readiness vs startup</h2>
<ul>
<li><strong>Liveness</strong> (<code>/healthz</code>): "estou vivo". Se falhar, o orquestrador <em>reinicia</em> o container. Mantenha barato e sem dependências externas.</li>
<li><strong>Readiness</strong> (<code>/readyz</code>): "estou pronto pra tráfego". Verifica DB, cache, filas. Se falhar, o load balancer <em>tira do pool</em>, mas não reinicia.</li>
<li><strong>Startup</strong> (<code>/startupz</code>): para apps com boot lento (ex: warm cache). O orquestrador espera esse passar antes de começar liveness/readiness.</li>
</ul>

<h2>Implementação em Express</h2>
<pre><code class="language-js">import express from 'express';
const app = express();

app.get('/healthz', (req, res) =&gt; res.json({ ok: true }));

app.get('/readyz', async (req, res) =&gt; {
  try {
    await Promise.all([
      db.query('select 1'),
      redis.ping(),
    ]);
    res.json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false, error: err.message });
  }
});

let ready = false;
app.get('/startupz', (req, res) =&gt; res.status(ready ? 200 : 503).end());

await warmCache();
ready = true;
app.listen(3000);</code></pre>

<h2>Graceful shutdown</h2>
<p>Ao receber SIGTERM (deploy/scale-down), o app deve responder <code>503</code> em <code>/readyz</code> por alguns segundos antes de fechar conexões. Isso dá tempo do load balancer parar de mandar tráfego.</p>
<pre><code class="language-js">let shuttingDown = false;

app.get('/readyz', (req, res) =&gt; {
  if (shuttingDown) return res.status(503).json({ ok: false, draining: true });
  // ...checks
  res.json({ ok: true });
});

const server = app.listen(3000);

process.on('SIGTERM', () =&gt; {
  shuttingDown = true;
  setTimeout(() =&gt; {
    server.close(() =&gt; process.exit(0));
  }, 10_000); // janela para LB perceber
});</code></pre>

<h2>Configuração no Kubernetes</h2>
<pre><code class="language-bash">livenessProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 10
  failureThreshold: 3
readinessProbe:
  httpGet: { path: /readyz, port: 3000 }
  periodSeconds: 5
  failureThreshold: 2
startupProbe:
  httpGet: { path: /startupz, port: 3000 }
  failureThreshold: 30
  periodSeconds: 5</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Auto-restart em deadlock ou OOM-soft.</li>
<li>Drenar tráfego antes de deploy (rolling update).</li>
<li>Detectar perda de conexão com banco e tirar do pool.</li>
<li>Métricas: registrar latência das probes para alertar.</li>
<li>Probes externas (UptimeRobot, Pingdom) usam liveness.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Não chame DB no liveness</strong> — se DB cair, todos os pods reiniciam em loop.</li>
<li><strong>Cache o readiness</strong> por 1-2s para não martelar dependências.</li>
<li>Endpoints de health não devem aparecer em logs de acesso (poluem) — filtre no logger.</li>
<li>Não exija auth para healthchecks (o orquestrador não tem token).</li>
<li>Evite checks pesados (queries grandes); use <code>SELECT 1</code>.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Liveness ≠ readiness</div><div>Confundir os dois é a causa #1 de loops de restart em produção.</div></div>

<div class="callout callout-tip"><div class="callout-title">Use terminus</div><div>O pacote <code>@godaddy/terminus</code> empacota graceful shutdown + healthcheck com boas práticas.</div></div>`}} />
    </article>
  );
}

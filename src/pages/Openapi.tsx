export default function Openapi() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 6 min</div>
      <h1>OpenAPI / Swagger</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Documentação executável e tipada. Geração de clients automática.</p><pre><code class="language-bash">npm i swagger-ui-express
npm i -D @types/swagger-ui-express</code></pre><pre><code class="language-js">import swaggerUi from 'swagger-ui-express';
import spec from './openapi.json' assert { type: 'json' };

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));</code></pre><div class="callout callout-tip"><div class="callout-title">Gere do código</div><div>Use <code>zod-to-openapi</code> ou <code>@asteasolutions/zod-to-openapi</code> para gerar OpenAPI a partir dos seus schemas Zod.</div></div>`}} />
    </article>
  );
}

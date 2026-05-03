export default function Openapi() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 8 min</div>
      <h1>OpenAPI / Swagger</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>OpenAPI (antigo Swagger) é a especificação padrão para descrever APIs HTTP. Documentação executável, validação, geração de clients tipados e mocks — tudo a partir de um único YAML/JSON.</p>

        <h2>Conceito</h2>
        <p>Você descreve <em>paths</em>, <em>operations</em>, <em>parameters</em>, <em>request bodies</em> e <em>responses</em> usando JSON Schema. A spec é a fonte da verdade — código, docs e clients são derivados dela (<strong>spec-first</strong>) ou geradas a partir do código (<strong>code-first</strong>).</p>

        <h2>Exemplo de spec</h2>
        <pre><code class="language-yaml">openapi: 3.1.0
info:
  title: Users API
  version: 1.0.0
paths:
  /users/{id}:
    get:
      operationId: getUser
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { $ref: '#/components/schemas/User' }
components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id: { type: string }
        email: { type: string, format: email }</code></pre>

        <h2>Servir Swagger UI no Express</h2>
        <pre><code class="language-bash">npm i swagger-ui-express
npm i -D @types/swagger-ui-express</code></pre>
        <pre><code class="language-js">import express from 'express';
import swaggerUi from 'swagger-ui-express';
import spec from './openapi.json' with { type: 'json' };

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
app.listen(3000);</code></pre>

        <h2>Code-first com Zod</h2>
        <pre><code class="language-ts">import { z } from 'zod';
import { extendZodWithOpenApi, OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();

const User = z.object({
  id: z.string().openapi({ example: 'u_1' }),
  email: z.string().email(),
}).openapi('User');

registry.registerPath({
  method: 'get',
  path: '/users/{id}',
  request: { params: z.object({ id: z.string() }) },
  responses: { 200: { description: 'OK', content: { 'application/json': { schema: User } } } },
});

const doc = new OpenApiGeneratorV31(registry.definitions).generateDocument({
  openapi: '3.1.0', info: { title: 'API', version: '1.0.0' },
});</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Documentação interativa para times consumidores.</li>
          <li>Geração de SDK em TS/Go/Python (<code>openapi-generator</code>, <code>orval</code>).</li>
          <li>Mock servers (Prism) para frontend desenvolver em paralelo.</li>
          <li>Contract testing entre microsserviços.</li>
          <li>Validação de request/response em runtime (express-openapi-validator).</li>
        </ul>

        <h2>Boas práticas</h2>
        <ul>
          <li>Use <strong>operationId</strong> único e legível — ele vira nome de função no SDK.</li>
          <li>Versione a spec junto do código (<code>/v1/openapi.yaml</code>).</li>
          <li>Trate erros como schemas reutilizáveis (<code>$ref</code>) — <code>Problem</code> RFC 7807 é um bom padrão.</li>
          <li>Lint a spec com <code>spectral</code> em CI.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Spec-first vs code-first</div><div>Spec-first é melhor quando vários times consomem; code-first é mais ágil para apps que evoluem rápido. Ambos funcionam — escolha um e seja consistente.</div></div>
        <div class="callout callout-info"><div class="callout-title">Alternativas</div><div>Para gRPC use Protobuf; para GraphQL, o próprio SDL já documenta. OpenAPI ainda lidera REST/HTTP.</div></div>
      `}} />
    </article>
  );
}

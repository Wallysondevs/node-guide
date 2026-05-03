export default function Rest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · iniciante · 8 min</div>
      <h1>Design REST</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>REST não é "qualquer API HTTP que retorna JSON". É um conjunto de convenções que torna sua API previsível, cacheável e fácil de consumir. Investir em design consistente economiza dezenas de horas no longo prazo.</p>

<h2>Conceito</h2>
<p>Princípios que importam na prática:</p>
<ul>
<li><strong>Recursos</strong> são substantivos no plural: <code>/users</code>, <code>/orders</code>. Verbos são para o método HTTP.</li>
<li><strong>Métodos</strong> têm semântica fixa: GET (ler, idempotente), POST (criar), PUT (substituir), PATCH (atualizar parcial), DELETE (remover).</li>
<li><strong>Status codes</strong> certos: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500.</li>
<li><strong>Stateless</strong>: cada request carrega tudo que precisa (token, headers). Sem estado de sessão dependente de servidor específico.</li>
<li><strong>HATEOAS</strong> (links na resposta) é opcional; raro em APIs modernas, comum em hypermedia puras.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-bash">GET    /users              # listar
GET    /users/42           # detalhe
POST   /users              # criar
PUT    /users/42           # substituir inteiro
PATCH  /users/42           # atualizar parcial
DELETE /users/42           # remover

GET    /users/42/posts     # subrecurso
POST   /users/42/posts</code></pre>

<h3>Resposta de listagem com paginação</h3>
<pre><code class="language-bash">GET /users?page=2&amp;limit=20&amp;sort=-created_at&amp;status=active</code></pre>
<pre><code class="language-json">{
  "data": [
    { "id": 41, "name": "Ana" },
    { "id": 42, "name": "Bia" }
  ],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 137
  }
}</code></pre>

<h3>Erros padronizados</h3>
<pre><code class="language-json">{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "email é obrigatório",
    "details": [
      { "field": "email", "rule": "required" }
    ]
  }
}</code></pre>

<h3>Idempotência em POST</h3>
<pre><code class="language-bash">POST /payments
Idempotency-Key: 5f3a-9b2c-...
Content-Type: application/json

{ "amount": 1000, "currency": "BRL" }</code></pre>

<h2>Quando usar quais status</h2>
<ul>
<li><strong>200 OK</strong> — sucesso com corpo (GET, PUT/PATCH retornando recurso).</li>
<li><strong>201 Created</strong> — criação bem-sucedida; envie <code>Location</code> ou o recurso criado.</li>
<li><strong>204 No Content</strong> — sucesso sem corpo (DELETE típico).</li>
<li><strong>400 Bad Request</strong> — JSON inválido, parâmetros faltando.</li>
<li><strong>401 Unauthorized</strong> — falta autenticação ou token inválido.</li>
<li><strong>403 Forbidden</strong> — autenticado mas sem permissão.</li>
<li><strong>404 Not Found</strong> — recurso não existe.</li>
<li><strong>409 Conflict</strong> — duplicata, estado incompatível.</li>
<li><strong>422 Unprocessable Entity</strong> — payload válido mas semanticamente errado (validação de domínio).</li>
<li><strong>429 Too Many Requests</strong> — rate limit atingido.</li>
<li><strong>5xx</strong> — culpa do servidor; nunca devolva 500 para erro de input.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Versione na URL (<code>/v1/users</code>) ou no header. Manter sem versão em produção é dívida técnica.</li>
<li>Filtros e ordenação como query string. Aninhamento raso — evite mais de dois níveis.</li>
<li>Use <code>snake_case</code> ou <code>camelCase</code>, mas seja consistente em toda a API.</li>
<li>Respostas sempre envelopadas (<code>data</code>/<code>meta</code>) facilitam paginação e versionamento.</li>
<li>Documente com OpenAPI; gere clients e contract tests a partir do schema.</li>
<li>Cabeçalhos de cache (<code>ETag</code>, <code>Cache-Control</code>) em recursos imutáveis.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">REST vs GraphQL vs RPC</div><div>REST brilha em recursos CRUD com cacheabilidade HTTP. GraphQL ganha quando o front precisa de seleção fina por tela. tRPC/gRPC casam bem em monorepos full-TS ou microsserviços internos.</div></div>

<div class="callout callout-warn"><div class="callout-title">Não vaze IDs internos</div><div>Use UUIDs ou IDs externos opacos quando o recurso for público. IDs sequenciais expõem volumetria do negócio e facilitam enumeração.</div></div>`}} />
    </article>
  );
}

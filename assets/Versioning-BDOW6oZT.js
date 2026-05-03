import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"API design · intermediario · 7 min"}),e.jsx("h1",{children:"Versionamento de APIs"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p>Versionamento permite evoluir a API sem quebrar consumidores antigos. Há três estratégias dominantes — escolha uma e seja consistente.</p>

<h2>Conceito</h2>
<ul>
<li><strong>Path</strong>: <code>/v1/users</code>. Visível, simples, fácil de cachear. Mais comum em APIs públicas.</li>
<li><strong>Header</strong>: <code>Accept: application/vnd.api+json;version=1</code>. URLs limpas, mas oculto e mais complexo.</li>
<li><strong>Query</strong>: <code>?v=1</code>. Fácil mas feio — evite em APIs sérias.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import express from 'express';
import { v1Router } from './routes/v1/index.js';
import { v2Router } from './routes/v2/index.js';

const app = express();
app.use('/v1', v1Router);
app.use('/v2', v2Router);

// header-based
app.use((req, res, next) =&gt; {
  const accept = req.headers.accept || '';
  const m = accept.match(/version=(\\d+)/);
  req.apiVersion = m ? Number(m[1]) : 1;
  next();
});</code></pre>

<h3>SemVer no contrato</h3>
<pre><code class="language-bash">MAJOR.MINOR.PATCH
1.0.0 -&gt; 1.1.0  novo campo opcional, retrocompatível
1.1.0 -&gt; 2.0.0  remove ou renomeia campo, quebra clientes</code></pre>

<h2>Quando subir versão</h2>
<ul>
<li>Remover campo ou endpoint.</li>
<li>Mudar tipo de um campo (string -&gt; objeto).</li>
<li>Mudar semântica (mesmo campo, comportamento diferente).</li>
<li>Renomear rota ou parâmetro obrigatório.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Adicione campos novos opcionais sem subir versão.</li>
<li>Documente <em>deprecation</em> com header <code>Sunset</code> ou <code>Deprecation</code>.</li>
<li>Mantenha N-1 versão funcionando por pelo menos 6 meses.</li>
<li>Versione apenas o contrato externo, não a estrutura interna.</li>
<li>Centralize lógica em services; routers <code>v1</code>/<code>v2</code> só adaptam input/output.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Quebre só quando precisar</div><div>Cada nova major dobra o custo de manter. Prefira evoluir aditivamente até que seja realmente impossível.</div></div>

<div class="callout callout-info"><div class="callout-title">OpenAPI</div><div>Tenha um arquivo OpenAPI por versão. Torna o diff entre versões explícito e gera SDKs automaticamente.</div></div>
`}})]})}export{s as default};

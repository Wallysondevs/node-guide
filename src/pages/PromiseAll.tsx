export default function PromiseAll() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 9 min</div>
      <h1>Promise.all/race/any/allSettled</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Os combinadores de promise (<code>all</code>, <code>allSettled</code>, <code>race</code>, <code>any</code>) deixam você compor operações assíncronas em paralelo com semânticas diferentes de sucesso/falha. Escolher o combinador errado é uma das fontes mais comuns de bugs em Node.</p>

<h2>Conceito</h2>
<ul>
  <li><strong>Promise.all([...])</strong> — resolve com array de valores quando <em>todas</em> resolverem; rejeita assim que <em>uma</em> rejeitar (fail-fast). As outras continuam executando, mas o resultado é descartado.</li>
  <li><strong>Promise.allSettled([...])</strong> — espera todas terminarem (resolvendo ou rejeitando) e retorna array de <code>{ status, value | reason }</code>. Nunca rejeita.</li>
  <li><strong>Promise.race([...])</strong> — resolve/rejeita com a <em>primeira</em> a se assentar (fulfilled ou rejected).</li>
  <li><strong>Promise.any([...])</strong> — resolve com a <em>primeira</em> que <em>resolver</em>. Se todas falharem, rejeita com <code>AggregateError</code>.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// all — buscar dados em paralelo
const [user, posts, comments] = await Promise.all([
  fetch('/api/users/1').then(r =&gt; r.json()),
  fetch('/api/posts').then(r =&gt; r.json()),
  fetch('/api/comments').then(r =&gt; r.json())
]);

// allSettled — relatório com falhas parciais
const results = await Promise.allSettled(urls.map(u =&gt; fetch(u)));
const ok = results.filter(r =&gt; r.status === 'fulfilled').map(r =&gt; r.value);
const fail = results.filter(r =&gt; r.status === 'rejected');
console.log(ok.length, 'sucessos,', fail.length, 'falhas');

// race — timeout
function timeout(ms) {
  return new Promise((_, rej) =&gt; setTimeout(() =&gt; rej(new Error('timeout')), ms));
}
const data = await Promise.race([fetch('/slow'), timeout(3000)]);

// any — primeiro CDN saudável
const r = await Promise.any([
  fetch('https://cdn1.example.com/asset'),
  fetch('https://cdn2.example.com/asset'),
  fetch('https://cdn3.example.com/asset')
]);</code></pre>

<h2>Quando usar</h2>
<ul>
  <li><strong>all</strong>: dependências obrigatórias (todas precisam dar certo).</li>
  <li><strong>allSettled</strong>: batch jobs, dashboards, métricas — você quer saber o que falhou.</li>
  <li><strong>race</strong>: implementar timeouts, cancelamento por evento externo.</li>
  <li><strong>any</strong>: failover entre réplicas, multi-CDN, fallback automático.</li>
</ul>

<h2>AbortController + race</h2>
<pre><code class="language-js">const ctrl = new AbortController();
setTimeout(() =&gt; ctrl.abort(), 5000);
const res = await fetch(url, { signal: ctrl.signal });
// melhor que race + setTimeout: cancela a request de verdade</code></pre>

<h2>Pegadinhas</h2>
<ul>
  <li><strong>all não cancela</strong> as outras quando uma falha. Se forem <code>fetch</code>, use <code>AbortController</code> compartilhado.</li>
  <li>Em <code>allSettled</code>, sempre filtre por <code>status</code> antes de acessar <code>value</code>/<code>reason</code>.</li>
  <li><code>race</code> com array vazio fica pendente para sempre; <code>all</code> com array vazio resolve com <code>[]</code>.</li>
  <li>Não confunda <code>any</code> (ignora rejects) com <code>race</code> (primeiro evento, mesmo erro).</li>
  <li>Para limitar concorrência (ex. 1000 URLs), <code>Promise.all</code> direto explode. Use <code>p-limit</code>.</li>
</ul>

<pre><code class="language-js">// limitar concorrência
import pLimit from 'p-limit';
const limit = pLimit(10);
const results = await Promise.all(urls.map(u =&gt; limit(() =&gt; fetch(u))));</code></pre>

<div class="callout callout-warn"><div class="callout-title">Erros silenciados</div><div>Promises pendentes que rejeitam após <code>Promise.all</code> ter falhado viram <code>unhandledRejection</code>. Combine com <code>AbortController</code> para evitar warnings em produção.</div></div>

<div class="callout callout-tip"><div class="callout-title">AggregateError</div><div><code>Promise.any</code> rejeita com <code>AggregateError</code> contendo <code>.errors[]</code> com todas as causas — útil para logar tudo o que falhou.</div></div>`}} />
    </article>
  );
}

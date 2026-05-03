export default function AbortAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 8 min</div>
      <h1>Cancelando async</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Operações assíncronas que nunca terminam consomem memória, sockets e file descriptors. <strong>Cancelar</strong> é tão importante quanto iniciar. Em Node 18+ a forma idiomática é combinar <code>AbortController</code> com APIs que aceitam <code>signal</code>.</p>

<h2>Conceito</h2>
<p>Um <code>AbortController</code> expõe duas coisas: <code>controller.abort(reason)</code> e <code>controller.signal</code>. Você passa o <em>signal</em> para qualquer API compatível (fetch, timers, fs, streams, eventos) e, ao chamar <code>abort()</code>, todas elas falham com <code>AbortError</code>.</p>
<pre><code class="language-js">const ctrl = new AbortController();
setTimeout(() =&gt; ctrl.abort(new Error('timeout')), 3000);

try {
  const res = await fetch(url, { signal: ctrl.signal });
} catch (e) {
  if (e.name === 'AbortError') console.log('cancelado');
  else throw e;
}</code></pre>

<h2>Exemplo prático: timeout reutilizável</h2>
<p>Padrão de "race" combinando timer cancelável com a operação principal — ao primeiro a resolver, o outro é abortado para não vazar.</p>
<pre><code class="language-js">import { setTimeout as wait } from 'node:timers/promises';

export async function withTimeout(promiseFn, ms) {
  const ctrl = new AbortController();
  const timer = wait(ms, undefined, { signal: ctrl.signal })
    .then(() =&gt; { throw new Error('timeout'); });
  try {
    return await Promise.race([promiseFn(ctrl.signal), timer]);
  } finally {
    ctrl.abort();
  }
}

const data = await withTimeout(
  (signal) =&gt; fetch('https://api.exemplo.com', { signal }).then(r =&gt; r.json()),
  2000,
);</code></pre>

<h2>Combinando signals</h2>
<p>Node 20+ traz <code>AbortSignal.any([s1, s2])</code>: cancela quando qualquer um dispara. Útil quando o request já carrega um signal vindo do framework (ex.: Express/Fastify) e você quer adicionar um timeout local.</p>
<pre><code class="language-js">const composed = AbortSignal.any([req.signal, AbortSignal.timeout(2000)]);
await fetch(url, { signal: composed });</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Encerrar requisições HTTP de longa duração quando o cliente desconecta.</li>
<li>Limitar consultas a banco que podem travar (Drizzle/Prisma aceitam abort em alguns drivers).</li>
<li>Parar streams de leitura quando o consumidor não quer mais os dados.</li>
<li>Pipelines de processamento (ex.: scraping em lote) que precisam parar no primeiro erro.</li>
<li>Encerrar workers e listeners para permitir <code>graceful shutdown</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Não esqueça</strong> de propagar o signal para <em>todas</em> as chamadas async internas — senão a função "cancelada" continua trabalhando em segundo plano.</li>
<li><code>AbortError</code> é um erro normal: trate com <code>if (e.name === 'AbortError')</code>, não silencie tudo.</li>
<li>Chamar <code>abort()</code> depois de a operação já ter terminado é seguro — não lança.</li>
<li>Em loops, crie um signal por iteração (ou use <code>AbortSignal.timeout</code>) para evitar reuso acidental.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">AbortSignal.timeout</div><div>Atalho moderno: <code>fetch(url, { signal: AbortSignal.timeout(5000) })</code>. Sem precisar criar controller manualmente.</div></div>

<div class="callout callout-warn"><div class="callout-title">Streams travadas</div><div>Se você não passa o signal para um <code>Readable</code> infinito, o processo nunca encerra. Sempre encadeie via <code>pipeline(src, dst, { signal })</code>.</div></div>`}} />
    </article>
  );
}

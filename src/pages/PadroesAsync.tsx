export default function PadroesAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Async · intermediario · 9 min</div>
      <h1>Padrões: pool, sequential, retry</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>Quando você processa N itens em paralelo, raramente faz sentido disparar todos de uma vez. Conheça os três padrões básicos: <strong>sequencial</strong>, <strong>pool concorrente</strong> e <strong>retry com backoff</strong>.</p>

        <h2>Conceito</h2>
        <ul>
          <li><strong>Sequencial</strong>: um por vez. Mais lento, mas seguro contra rate limits.</li>
          <li><strong>Paralelo total</strong>: <code>Promise.all</code>. Rápido até quebrar o servidor remoto.</li>
          <li><strong>Pool</strong>: paralelismo limitado (ex.: 5 simultâneos). O melhor balanço.</li>
          <li><strong>Retry</strong>: tenta de novo com espera exponencial em falhas transitórias.</li>
        </ul>

        <h2>Sequencial</h2>
        <pre><code class="language-js">for (const url of urls) {
  await fetch(url);
}</code></pre>

        <h2>Concorrente limitado (pool)</h2>
        <pre><code class="language-js">import pLimit from 'p-limit';

const limit = pLimit(5);
const results = await Promise.all(
  urls.map((u) =&gt; limit(() =&gt; fetch(u).then((r) =&gt; r.json())))
);</code></pre>

        <p>Sem dep externa, em algumas linhas:</p>
        <pre><code class="language-js">async function pool(items, worker, concurrency = 5) {
  const ret = new Array(items.length);
  let i = 0;
  async function next() {
    while (i &lt; items.length) {
      const idx = i++;
      ret[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return ret;
}</code></pre>

        <h2>Retry com backoff exponencial</h2>
        <pre><code class="language-js">async function retry(fn, { attempts = 3, baseMs = 200, factor = 2 } = {}) {
  let lastErr;
  for (let i = 0; i &lt; attempts; i++) {
    try { return await fn(); }
    catch (e) {
      lastErr = e;
      if (i === attempts - 1) break;
      const wait = baseMs * factor ** i + Math.random() * 100; // jitter
      await new Promise((r) =&gt; setTimeout(r, wait));
    }
  }
  throw lastErr;
}

await retry(() =&gt; fetch('/api/flaky').then((r) =&gt; {
  if (!r.ok) throw new Error('http ' + r.status);
  return r.json();
}));</code></pre>

        <h2>Composição: pool + retry + abort</h2>
        <pre><code class="language-js">const ac = new AbortController();
setTimeout(() =&gt; ac.abort(), 30_000);

const limit = pLimit(10);
const results = await Promise.allSettled(
  urls.map((u) =&gt; limit(() =&gt; retry(
    () =&gt; fetch(u, { signal: ac.signal }).then((r) =&gt; r.json()),
    { attempts: 4 }
  )))
);</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Crawlers respeitando limites de concorrência.</li>
          <li>Migrations em lote (sem matar o DB).</li>
          <li>Chamadas a APIs com rate limit (Stripe, GitHub).</li>
          <li>Workers que processam fila com paralelismo configurável.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li><code>Promise.all</code> rejeita ao primeiro erro — perdeu os sucessos. Use <code>Promise.allSettled</code> quando precisar de todos os resultados.</li>
          <li>Retry sem <em>jitter</em> sincroniza tentativas de vários clientes (thundering herd).</li>
          <li>Não retentar erros 4xx (cliente) — só 5xx, timeouts e network.</li>
          <li>Pool grande demais = você é o atacante DDoS do parceiro.</li>
          <li>Sempre combine retry com timeout/AbortSignal — senão pode travar para sempre.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Bibliotecas</div><div><code>p-limit</code>, <code>p-retry</code>, <code>p-queue</code>, <code>p-map</code> da família "p-" cobrem 95% dos casos. Pequenas, sem deps.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Idempotência</div><div>Só retente operações <em>idempotentes</em>. POST que cria recurso pode duplicar — use chave de idempotência (header <code>Idempotency-Key</code>).</div></div>
      `}} />
    </article>
  );
}

export default function HttpClient() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · iniciante · 8 min</div>
      <h1>HTTP client (fetch)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Node 18+ traz <code>fetch</code> nativo (baseado em <strong>undici</strong>), com a mesma API do browser. Para 95% dos casos, você não precisa mais de <code>axios</code>, <code>node-fetch</code> ou <code>got</code>.</p>

<h2>Conceito</h2>
<p><code>fetch</code> retorna uma <code>Response</code>. <code>res.ok</code> só é <code>true</code> para status 2xx — ele <strong>não lança</strong> em 4xx/5xx (diferente de axios). Lê o corpo com <code>.json()</code>, <code>.text()</code>, <code>.arrayBuffer()</code>, <code>.formData()</code> ou itera <code>res.body</code> como stream.</p>
<pre><code class="language-js">const res = await fetch('https://api.exemplo.com/users', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'Ana' }),
});

if (!res.ok) throw new Error('HTTP ' + res.status);
const user = await res.json();</code></pre>

<h2>Timeout com AbortController</h2>
<pre><code class="language-js">const ctrl = new AbortController();
const t = setTimeout(() =&gt; ctrl.abort(), 5_000);

try {
  const res = await fetch(url, { signal: ctrl.signal });
  return await res.json();
} catch (err) {
  if (err.name === 'AbortError') throw new Error('timeout');
  throw err;
} finally {
  clearTimeout(t);
}

// atalho moderno:
await fetch(url, { signal: AbortSignal.timeout(5_000) });</code></pre>

<h2>Streaming de download</h2>
<pre><code class="language-js">import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const res = await fetch('https://exemplo.com/big.zip');
if (!res.ok) throw new Error('falhou');

await pipeline(Readable.fromWeb(res.body), createWriteStream('big.zip'));</code></pre>

<h2>Upload multipart</h2>
<pre><code class="language-js">const form = new FormData();
form.append('file', new Blob([buf]), 'foto.png');
form.append('caption', 'minha foto');

await fetch('https://api/upload', { method: 'POST', body: form });
// content-type vem com boundary correto automaticamente</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Chamar APIs REST/JSON.</li>
<li>Webhooks: POST para URL configurada pelo usuário.</li>
<li>Proxy reverso simples (server-side rendering).</li>
<li>Download/upload de arquivos com streaming.</li>
<li>Health checks externos.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>4xx/5xx não lança</strong>: sempre cheque <code>res.ok</code>.</li>
<li>Esquecer de consumir o body em erros vaza socket. Faça <code>res.body?.cancel()</code> ou ignore com <code>await res.text()</code>.</li>
<li>Sem timeout default — sua request pode pendurar para sempre.</li>
<li>Para APIs muito chamadas, use <code>undici.Pool</code>/<code>Agent</code> direto: pool de keep-alive, mais rápido que fetch puro.</li>
<li><code>fetch</code> não segue redirects POST mantendo método (segue spec — vira GET).</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Use undici para alto throughput</div><div>O <code>fetch</code> embrulha undici. Em hot paths, use <code>request</code> de <code>undici</code> direto — menor overhead.</div></div>

<div class="callout callout-info"><div class="callout-title">Retry exponencial</div><div>Combine com <code>AbortSignal.timeout</code> e backoff: 200ms, 400ms, 800ms. Pare em 4xx (cliente) — só retry 5xx e network errors.</div></div>`}} />
    </article>
  );
}

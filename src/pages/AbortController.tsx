export default function AbortController() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · intermediario · 8 min</div>
      <h1>AbortController</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>AbortController</code> é a API padrão (Web + Node) para sinalizar cancelamento de operações assíncronas. Substitui flags manuais, <em>cancellation tokens</em> caseiros e timers acoplados.</p>

<h2>Conceito</h2>
<p>Um controller carrega um <code>signal</code>. APIs que aceitam <code>{ signal }</code> reagem ao <code>abort()</code> rejeitando com <code>AbortError</code> e liberando recursos. O signal também emite o evento <code>'abort'</code>, útil para limpeza customizada.</p>
<pre><code class="language-js">const ctrl = new AbortController();
ctrl.signal.addEventListener('abort', () =&gt; {
  console.log('motivo:', ctrl.signal.reason);
});

setTimeout(() =&gt; ctrl.abort(new Error('expirou')), 1000);</code></pre>

<h2>Exemplo prático</h2>
<p>Cancelando timers, fetch e leitura de arquivo com o mesmo signal:</p>
<pre><code class="language-js">import { setTimeout as wait } from 'node:timers/promises';
import { readFile } from 'node:fs/promises';

const ctrl = new AbortController();
const { signal } = ctrl;

setTimeout(() =&gt; ctrl.abort(), 5000);

try {
  const r = await fetch('https://api.exemplo.com', { signal });
  const cfg = await readFile('./config.json', { signal, encoding: 'utf8' });
  await wait(10_000, undefined, { signal });
} catch (e) {
  if (e.name === 'AbortError') console.log('cancelado');
  else throw e;
}</code></pre>

<h2>Helpers estáticos (Node 17.3+)</h2>
<pre><code class="language-js">const s1 = AbortSignal.timeout(3000);            // dispara em 3s
const s2 = AbortSignal.abort('boom');            // já abortado
const s3 = AbortSignal.any([req.signal, s1]);    // cancela quando qualquer um dispara</code></pre>

<h2>Casos de uso</h2>
<ul>
<li><strong>HTTP timeouts</strong> sem dependência externa.</li>
<li><strong>Graceful shutdown</strong>: um único controller derruba todos os trabalhos pendentes em SIGTERM.</li>
<li>Cancelar <code>EventEmitter.on(emitter, 'data', { signal })</code>.</li>
<li>Interromper <code>stream.pipeline(src, dst, { signal })</code>.</li>
<li>Parar consumo de filas (BullMQ, Kafka) ao receber sinal de parada.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Sempre cheque <code>e.name === 'AbortError'</code> em vez de inspecionar mensagens.</li>
<li>Passe o <code>signal</code> recebido pelo framework adiante — não crie um novo "do zero" no meio do caminho.</li>
<li>Use <code>signal.reason</code> para contextualizar erros nos logs.</li>
<li>Após o término normal, chame <code>controller.abort()</code> mesmo assim para limpar timers compostos.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Compatível com Web</div><div>O mesmo código funciona em browsers, Workers, Deno e Bun — é uma API padrão WHATWG.</div></div>

<div class="callout callout-warn"><div class="callout-title">Memory leak silencioso</div><div>Se você adiciona muitos listeners ao mesmo <code>signal</code> sem removê-los (ou sem usar <code>{ once: true }</code>), o Node avisa em <code>MaxListenersExceededWarning</code>. Em produção isso causa retenção de objetos.</div></div>`}} />
    </article>
  );
}

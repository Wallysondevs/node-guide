export default function Undici() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · avancado · 9 min</div>
      <h1>Undici: HTTP client moderno</h1>
      <div dangerouslySetInnerHTML={{__html: `
<p><strong>Undici</strong> é o HTTP client escrito do zero para Node — é o que está por trás do <code>fetch</code> nativo. Use diretamente quando precisar de pool de conexões, pipelining, controle fino de timeouts ou performance máxima.</p>

<h2>Conceito</h2>
<p>O módulo <code>http</code> legado é lento e tem APIs antigas. Undici substitui o stack inteiro com keep-alive agressivo, HTTP/1.1 pipelining e dispatcher plugável. Funciona como dependência (<code>npm i undici</code>) ou via <code>node:undici</code> (alguns símbolos expostos).</p>

<pre><code class="language-js">import { request, Agent, fetch } from 'undici';

const { statusCode, headers, body } = await request('https://api.example.com/users');
const data = await body.json();
console.log(statusCode, data);</code></pre>

<h2>Exemplo prático: pool com Agent</h2>
<pre><code class="language-js">import { Agent, request, setGlobalDispatcher } from 'undici';

const agent = new Agent({
  connections: 100,           // por origem
  pipelining: 10,
  keepAliveTimeout: 10_000,
  keepAliveMaxTimeout: 60_000,
});

setGlobalDispatcher(agent);   // afeta fetch global também

const { body } = await request('https://api.example.com/v1/items', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'foo' }),
});
console.log(await body.json());</code></pre>

<h3>Streaming de download</h3>
<pre><code class="language-js">import { request } from 'undici';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const { body } = await request('https://example.com/big.zip');
await pipeline(body, createWriteStream('big.zip'));</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Serviços que fazem milhares de requests/segundo a poucas origens (APIs internas).</li>
<li>Web crawlers e scrapers — <code>Pool</code> e <code>BalancedPool</code> rendem muito.</li>
<li>Proxies e gateways HTTP.</li>
<li>Quando você precisa de <code>MockAgent</code> para testar sem subir servidor.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>body</code> é um stream: você precisa consumi-lo (<code>.json()</code>, <code>.text()</code>) ou descartar, senão vaza memória.</li>
<li>Erros de DNS/conexão viram <code>UND_ERR_*</code>; trate explicitamente.</li>
<li>Pipelining quebra com servidores antigos — desligue se ver respostas embaralhadas.</li>
<li><code>fetch</code> global usa o dispatcher global; trocá-lo afeta o app inteiro.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">MockAgent para testes</div><div>Use <code>MockAgent</code> de undici para interceptar requests em testes sem nock nem servidor fake.</div></div>

<div class="callout callout-info"><div class="callout-title">fetch é só uma fachada</div><div>Sob o capô <code>fetch</code> usa undici. Se já tem fetch nativo, só vá pra API low-level quando precisar de pool customizado.</div></div>
`}} />
    </article>
  );
}

export default function HttpServer() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · intermediario · 9 min</div>
      <h1>Servidor HTTP cru</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Antes de usar Express ou Fastify, vale entender o módulo <code>node:http</code>: é a base sobre a qual todo framework é construído. Em microsserviços simples, ele basta — sem dependências, sem overhead.</p>

<h2>Conceito</h2>
<p><code>createServer(handler)</code> recebe uma função <code>(req, res)</code>. <code>req</code> é um <code>IncomingMessage</code> (Readable stream); <code>res</code> é um <code>ServerResponse</code> (Writable stream). Você precisa terminar a resposta com <code>res.end()</code> ou ela pendura.</p>
<pre><code class="language-js">import { createServer } from 'node:http';

const server = createServer((req, res) =&gt; {
  if (req.method === 'GET' &amp;&amp; req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('hello');
    return;
  }
  res.writeHead(404).end('not found');
});

server.listen(3000, () =&gt; console.log('http://localhost:3000'));</code></pre>

<h2>Lendo o body</h2>
<pre><code class="language-js">// versão moderna com async iterator
const chunks = [];
for await (const chunk of req) chunks.push(chunk);
const body = Buffer.concat(chunks).toString('utf8');

let data;
try { data = JSON.parse(body); }
catch { res.writeHead(400).end('invalid json'); return; }</code></pre>

<h2>Limitando tamanho de body</h2>
<pre><code class="language-js">const MAX = 1_000_000; // 1MB
let received = 0;
const chunks = [];

for await (const chunk of req) {
  received += chunk.length;
  if (received &gt; MAX) {
    res.writeHead(413).end('payload too large');
    req.destroy();
    return;
  }
  chunks.push(chunk);
}</code></pre>

<h2>Roteamento manual</h2>
<pre><code class="language-js">const routes = new Map();
const route = (method, path, fn) =&gt; routes.set(method + ' ' + path, fn);

route('GET', '/users', (req, res) =&gt; {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify([{ id: 1 }]));
});

createServer(async (req, res) =&gt; {
  const handler = routes.get(req.method + ' ' + new URL(req.url, 'http://x').pathname);
  if (!handler) { res.writeHead(404).end(); return; }
  try { await handler(req, res); }
  catch (err) { console.error(err); res.writeHead(500).end('erro'); }
}).listen(3000);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Microsserviços minimalistas (health, métricas).</li>
<li>Webhooks dedicados de baixo volume.</li>
<li>Proxies caseiros.</li>
<li>Aprender o que o framework esconde.</li>
<li>Benchmark base (Express adiciona ~20-30% overhead).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Esquecer <code>res.end()</code> trava o cliente até timeout.</li>
<li>Setar header depois de <code>writeHead</code> ou <code>write</code> lança erro.</li>
<li>Sem timeout default no <code>http.Server</code> — cliente lento pode segurar socket. Configure <code>server.requestTimeout</code> e <code>server.headersTimeout</code>.</li>
<li><code>req.url</code> é só o path+query, não inclui scheme nem host. Use <code>new URL(req.url, 'http://' + req.headers.host)</code>.</li>
<li>Sem CORS, body parser, cookies, error handler — você implementa tudo. Por isso Express existe.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Configure timeouts</div><div>server.requestTimeout = 30_000; server.headersTimeout = 60_000; server.keepAliveTimeout = 5_000; — defaults mudaram em Node 18.</div></div>

<div class="callout callout-tip"><div class="callout-title">close vs closeAllConnections</div><div>Em graceful shutdown, <code>server.close()</code> espera conexões existentes. <code>closeAllConnections()</code> (Node 18+) força fechamento.</div></div>`}} />
    </article>
  );
}

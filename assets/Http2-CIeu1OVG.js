import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"HTTP nativo · avancado · 7 min"}),e.jsx("h1",{children:"HTTP/2"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>HTTP/2 multiplexa várias requests em uma única conexão TCP, comprime headers (HPACK) e usa frames binários. Para APIs com muitas chamadas pequenas, reduz latência e overhead. Node tem suporte nativo via <code>node:http2</code>.</p>

<h2>Conceito</h2>
<p>Em HTTP/1.1 cada request precisa de uma conexão (ou serializa em pipeline). HTTP/2 abre <em>streams</em> dentro de uma conexão única, todos paralelos. ALPN negocia o protocolo durante o handshake TLS. Sem TLS, browsers não falam HTTP/2.</p>
<pre><code class="language-js">import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';

const server = createSecureServer({
  key:  readFileSync('key.pem'),
  cert: readFileSync('cert.pem'),
});

server.on('stream', (stream, headers) =&gt; {
  stream.respond({ ':status': 200, 'content-type': 'text/plain' });
  stream.end('olá http/2');
});

server.listen(8443);</code></pre>

<h2>Compatibilidade com Express</h2>
<p>Frameworks Express/Fastify usam HTTP/1.1 por padrão. Para HTTP/2 com Express use <code>createSecureServer({ allowHTTP1: true })</code> e passe o <code>app</code> como handler — funciona em "HTTP/2 compatibility mode" com perda de algumas features.</p>
<pre><code class="language-js">import { createSecureServer } from 'node:http2';
import express from 'express';

const app = express();
app.get('/', (req, res) =&gt; res.send('ok'));

createSecureServer({ key, cert, allowHTTP1: true }, app).listen(8443);</code></pre>

<h2>Server Push (descontinuado)</h2>
<p>HTTP/2 Push foi removido do Chrome em 2022. Use <code>103 Early Hints</code> com <code>Link: rel=preload</code> em vez disso.</p>

<h2>Cliente HTTP/2</h2>
<pre><code class="language-js">import { connect } from 'node:http2';

const client = connect('https://api.exemplo.com');
const req = client.request({ ':path': '/users' });

req.setEncoding('utf8');
let body = '';
req.on('data', (c) =&gt; body += c);
req.on('end', () =&gt; { console.log(body); client.close(); });
req.end();</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Backend para frontend (BFF) que dispara muitas chamadas paralelas.</li>
<li>gRPC (que roda sobre HTTP/2).</li>
<li>Mobile clients em redes lentas — handshake único.</li>
<li>Streaming bidirecional sem WebSocket.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>TLS obrigatório</strong> na prática. h2c (cleartext) só funciona server-to-server.</li>
<li>API diferente da de <code>http</code> — eventos <code>stream</code> em vez de <code>request</code>.</li>
<li>Proxies (nginx, ALB) costumam terminar HTTP/2 e falar HTTP/1 com o backend. Não há ganho real para o app Node.</li>
<li>Bibliotecas antigas (multer, body-parser variantes) podem não suportar request streams de h2.</li>
<li>Head-of-line blocking ainda existe em TCP — HTTP/3 (QUIC) resolve, mas Node ainda não tem suporte estável.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Termine TLS no proxy</div><div>O padrão moderno é nginx/Cloudflare/ALB falar HTTP/2 com o cliente e HTTP/1.1 com o Node. Você ganha quase tudo sem mexer no código.</div></div>

<div class="callout callout-warn"><div class="callout-title">undici não fala HTTP/2</div><div>O cliente HTTP padrão do Node 18+ (undici, base do <code>fetch</code>) é HTTP/1.1. Para HTTP/2 client, use <code>node:http2</code> ou <code>fetch-h2</code>.</div></div>`}})]})}export{s as default};

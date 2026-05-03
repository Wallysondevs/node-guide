import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Realtime · intermediario · 10 min"}),e.jsx("h1",{children:"WebSocket com ws"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p><strong>ws</strong> é a biblioteca WebSocket mais usada em Node — leve, rápida, sem dependências. Use quando quiser controle total sobre o protocolo. Para abstrações de mais alto nível (rooms, fallback, namespaces), pule para <code>socket.io</code>.</p>

<h2>Conceito</h2>
<p>WebSocket é um protocolo full-duplex sobre TCP que começa como upgrade de uma conexão HTTP. Depois do handshake, mensagens fluem nos dois sentidos sem o overhead de novos requests. Ideal para chat, notificações, dashboards em tempo real e jogos casuais.</p>

<pre><code class="language-bash">npm i ws
npm i -D @types/ws</code></pre>

<h2>Exemplo prático: servidor com broadcast</h2>
<pre><code class="language-js">import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

function broadcast(except, data) {
  for (const client of wss.clients) {
    if (client !== except &amp;&amp; client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

wss.on('connection', (socket, req) =&gt; {
  console.log('cliente:', req.socket.remoteAddress);

  socket.on('message', raw =&gt; {
    let msg;
    try { msg = JSON.parse(raw.toString()); }
    catch { return socket.close(1003, 'invalid json'); }

    if (msg.type === 'chat') {
      broadcast(socket, JSON.stringify(msg));
    }
  });

  socket.on('close', () =&gt; console.log('desconectou'));
  socket.on('error', console.error);

  socket.send(JSON.stringify({ type: 'welcome' }));
});</code></pre>

<h3>Heartbeat (ping/pong)</h3>
<pre><code class="language-js">function noop() {}
function heartbeat() { this.isAlive = true; }

wss.on('connection', socket =&gt; {
  socket.isAlive = true;
  socket.on('pong', heartbeat);
});

const interval = setInterval(() =&gt; {
  for (const s of wss.clients) {
    if (!s.isAlive) return s.terminate();
    s.isAlive = false;
    s.ping(noop);
  }
}, 30_000);

wss.on('close', () =&gt; clearInterval(interval));</code></pre>

<h3>Cliente</h3>
<pre><code class="language-js">import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');
ws.on('open', () =&gt; ws.send(JSON.stringify({ type: 'chat', text: 'oi' })));
ws.on('message', data =&gt; console.log(data.toString()));</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Chat e mensageria em tempo real.</li>
<li>Notificações push dentro de SPA.</li>
<li>Live dashboards (métricas, status, sensores).</li>
<li>Colaboração (cursors, edição compartilhada).</li>
<li>Jogos turn-based ou ações leves.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Sem heartbeat, conexões fantasmas se acumulam atrás de proxies/NAT.</li>
<li>Não confie no <code>readyState</code>; cheque antes de cada <code>send</code>.</li>
<li>Em produção, sempre <code>wss://</code> (TLS) — proxies bloqueiam <code>ws://</code>.</li>
<li>Mensagens grandes podem fragmentar; configure <code>maxPayload</code>.</li>
<li>Sem horizontal scaling nativo: para múltiplos nós use Redis pub/sub para sincronizar broadcasts.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Compartilhar com Express</div><div>Crie o servidor HTTP manualmente (<code>http.createServer(app)</code>) e passe-o ao <code>WebSocketServer({{ server }})</code>. WS e REST vivem na mesma porta.</div></div>

<div class="callout callout-warn"><div class="callout-title">Autenticação</div><div>Não há header <code>Authorization</code> no upgrade pelo browser. Use cookie de sessão ou token na query string protegida por TLS.</div></div>
`}})]})}export{r as default};

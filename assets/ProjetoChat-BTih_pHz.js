import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Projetos · intermediario · 12 min"}),e.jsx("h1",{children:"Projeto: chat realtime"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Chat em tempo real com salas, presença e histórico, usando <strong>Socket.IO</strong> sobre Express e Redis como adapter para escalar horizontalmente. Persistência simples em SQLite via better-sqlite3.</p>

<h2>Estrutura</h2>
<pre><code class="language-bash">chat/
├─ package.json
├─ public/
│  └─ index.html
└─ src/
   ├─ index.js          # http + socket.io
   ├─ db.js             # better-sqlite3
   └─ rooms.js          # presença</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">npm i express socket.io @socket.io/redis-adapter redis better-sqlite3
node --watch src/index.js</code></pre>

<h2>Servidor</h2>
<pre><code class="language-js">// src/db.js
import Database from 'better-sqlite3';
const db = new Database('chat.db');
db.exec(
  'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT, user TEXT, body TEXT, ts INTEGER);' +
  'CREATE INDEX IF NOT EXISTS idx_room_ts ON messages(room, ts);'
);
export const insert = db.prepare('INSERT INTO messages (room,user,body,ts) VALUES (?,?,?,?)');
export const last = db.prepare('SELECT user,body,ts FROM messages WHERE room=? ORDER BY id DESC LIMIT ?');</code></pre>
<pre><code class="language-js">// src/index.js
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { insert, last } from './db.js';

const app = express();
app.use(express.static('public'));
const http = createServer(app);
const io = new Server(http, { cors: { origin: '*' } });

if (process.env.REDIS_URL) {
  const pub = createClient({ url: process.env.REDIS_URL });
  const sub = pub.duplicate();
  await Promise.all([pub.connect(), sub.connect()]);
  io.adapter(createAdapter(pub, sub));
}

const presence = new Map(); // room -&gt; Set&lt;username&gt;

io.on('connection', (socket) =&gt; {
  let user = null, room = null;

  socket.on('join', ({ u, r }) =&gt; {
    user = String(u || 'anon').slice(0, 30);
    room = String(r || 'lobby').slice(0, 50);
    socket.join(room);
    if (!presence.has(room)) presence.set(room, new Set());
    presence.get(room).add(user);

    const history = last.all(room, 50).reverse();
    socket.emit('history', history);
    io.to(room).emit('presence', [...presence.get(room)]);
    io.to(room).emit('system', user + ' entrou');
  });

  socket.on('msg', (text) =&gt; {
    if (!user || !room) return;
    const body = String(text || '').slice(0, 1000);
    if (!body) return;
    const ts = Date.now();
    insert.run(room, user, body, ts);
    io.to(room).emit('msg', { user, body, ts });
  });

  socket.on('disconnect', () =&gt; {
    if (user && room && presence.has(room)) {
      presence.get(room).delete(user);
      io.to(room).emit('presence', [...presence.get(room)]);
      io.to(room).emit('system', user + ' saiu');
    }
  });
});

http.listen(3000, () =&gt; console.log('chat em http://localhost:3000'));</code></pre>

<h2>Cliente mínimo</h2>
<pre><code class="language-js">// public/index.html (script inline)
&lt;script src="/socket.io/socket.io.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const s = io();
  const u = prompt('seu nome?');
  s.emit('join', { u, r: 'lobby' });
  s.on('history', (h) =&gt; h.forEach(render));
  s.on('msg', render);
  s.on('system', (t) =&gt; render({ user: '*', body: t, ts: Date.now() }));
  s.on('presence', (list) =&gt; document.title = 'chat (' + list.length + ')');
  function render({ user, body, ts }) {
    const li = document.createElement('li');
    li.textContent = new Date(ts).toLocaleTimeString() + ' ' + user + ': ' + body;
    document.getElementById('log').appendChild(li);
  }
  document.getElementById('form').onsubmit = (e) =&gt; {
    e.preventDefault();
    const i = document.getElementById('i');
    s.emit('msg', i.value); i.value = '';
  };
&lt;/script&gt;</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">docker run -d --name redis -p 6379:6379 redis:7
REDIS_URL=redis://localhost:6379 node --watch src/index.js
# abra duas abas em http://localhost:3000</code></pre>

<div class="callout callout-info"><div class="callout-title">Por que Redis adapter?</div><div>Sem ele, dois processos Node não compartilham eventos. Com ele, <code>io.to(room).emit(...)</code> chega em todas as instâncias atrás do load balancer.</div></div>

<h2>Boas práticas</h2>
<ul>
  <li><strong>Valide tamanho</strong> de username/room/body — clientes maliciosos enviam payloads enormes.</li>
  <li>Use <code>socket.join(room)</code> em vez de listas manuais — Socket.IO já cuida.</li>
  <li>Persistência: SQLite serve para POC; em produção use Postgres ou Redis Streams.</li>
  <li>Para milhares de conexões, ative <code>perMessageDeflate: false</code> e considere <code>uWebSockets.js</code>.</li>
  <li>Sticky sessions são obrigatórias se houver fallback HTTP long-polling.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Autenticação</div><div>Passe um JWT em <code>io({ auth: { token } })</code> e valide em <code>io.use((socket, next) =&gt; ...)</code> antes de aceitar a conexão.</div></div>`}})]})}export{i as default};

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Introdução · iniciante · 8 min"}),e.jsx("h1",{children:"O que é Node.js"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p><strong>Node.js</strong> é um runtime JavaScript fora do browser, construído sobre o motor <strong>V8</strong> do Chrome. Permite rodar JS no servidor, em scripts CLI, em ferramentas de build e até em apps desktop.</p>

        <h2>Conceito</h2>
        <p>Foi criado em 2009 por Ryan Dahl com uma ideia central: <strong>I/O não-bloqueante</strong> e orientado a eventos. Em vez de uma thread por requisição (modelo tradicional Apache/PHP), Node usa um <strong>event loop</strong> em uma única thread principal e delega I/O para o sistema operacional via libuv.</p>

        <p>Resultado: poucos bytes por conexão e excelente escala para cargas <strong>I/O-bound</strong> (HTTP, banco, fila, websocket).</p>

        <h2>Hello, world</h2>
        <pre><code class="language-js">// server.js
import { createServer } from 'node:http';

const server = createServer((req, res) =&gt; {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Olá, Node!');
});

server.listen(3000, () =&gt; console.log('http://localhost:3000'));</code></pre>
        <pre><code class="language-bash">node server.js</code></pre>

        <h2>Onde Node brilha</h2>
        <ul>
          <li>APIs HTTP/REST e GraphQL de alta concorrência.</li>
          <li>Servidores realtime (WebSockets, chat, streaming).</li>
          <li>Ferramentas de linha de comando e build (Vite, ESLint, Prettier).</li>
          <li>Microsserviços leves, BFFs e gateways.</li>
          <li>Scripts de automação, ETL e jobs agendados.</li>
          <li>Serverless / edge functions.</li>
        </ul>

        <h2>Onde NÃO é a melhor escolha</h2>
        <p>Cargas <em>CPU-bound</em> pesadas (processamento numérico, ML treinamento, encoding de vídeo) tendem a sofrer numa única thread. Para esses casos use <code>worker_threads</code>, processamento em fila, ou outra linguagem (Go, Rust).</p>

        <h2>Anatomia do runtime</h2>
        <ul>
          <li><strong>V8</strong>: compila e roda JavaScript.</li>
          <li><strong>libuv</strong>: implementa o event loop e I/O assíncrono.</li>
          <li><strong>Node bindings</strong>: módulos como <code>fs</code>, <code>net</code>, <code>http</code> que conectam JS aos serviços nativos.</li>
          <li><strong>npm</strong>: o registry e cliente de pacotes que vem junto.</li>
        </ul>

        <h2>Pegadinhas para quem vem de outras linguagens</h2>
        <ul>
          <li>Bloquear o event loop trava <em>todas</em> as conexões. Nada de <code>while(true)</code>.</li>
          <li>Tudo I/O é assíncrono. Aprenda <code>async/await</code> antes de qualquer framework.</li>
          <li>Há duas formas de módulos: <strong>CommonJS</strong> (legado, <code>require</code>) e <strong>ES Modules</strong> (moderno, <code>import</code>). Padronize seu projeto.</li>
        </ul>

        <div class="callout callout-info"><div class="callout-title">Versionamento</div><div>Use sempre versões <strong>LTS</strong> (números pares: 18, 20, 22) em produção. Versões ímpares (19, 21) são <em>Current</em> com suporte curto.</div></div>
        <div class="callout callout-tip"><div class="callout-title">Setup recomendado</div><div>Instale via <strong>nvm</strong>/<strong>fnm</strong> em vez do binário do sistema. Você precisa alternar versões entre projetos mais cedo do que pensa.</div></div>
      `}})]})}export{t as default};

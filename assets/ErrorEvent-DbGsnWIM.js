import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Eventos · intermediario · 7 min"}),e.jsx("h1",{children:"O evento error"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>O <code>EventEmitter</code> trata o evento <code>'error'</code> de maneira <strong>especial e perigosa</strong>: se ninguém estiver escutando quando ele é emitido, o Node imprime stack trace e <strong>encerra o processo</strong>. Isso vale para todos os emitters do core: streams, sockets, requests HTTP, processos filhos.</p>

<h2>Conceito</h2>
<p>A motivação é forçar o programador a lidar com erros — silêncio é considerado bug. Para um <code>EventEmitter</code> custom, qualquer <code>emit('error', ...)</code> sem listener vira <code>uncaughtException</code>. Para streams, esquecer o handler é a causa mais comum de processos morrendo &quot;do nada&quot; em produção.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';

// 1) EventEmitter custom — sem listener crasha
const ee = new EventEmitter();
try {
  ee.emit('error', new Error('boom'));
  // process.exit() — nunca chega aqui
} catch {}

// 2) Solução: SEMPRE registrar listener
ee.on('error', (err) =&gt; {
  console.error('falha:', err.message);
  // log estruturado, métrica, etc.
});

// 3) Streams — mesmo padrão
const rs = createReadStream('inexistente.txt');
rs.on('data', (chunk) =&gt; process.stdout.write(chunk));
rs.on('error', (err) =&gt; console.error('stream:', err.code));   // ENOENT

// 4) Múltiplos streams: pipeline gerencia error pra você
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { createWriteStream } from 'node:fs';

await pipeline(
  createReadStream('input.txt'),
  createGzip(),
  createWriteStream('input.txt.gz'),
);  // se qualquer stream falhar, pipeline rejeita</code></pre>

<p>Outro caso clássico: child processes.</p>
<pre><code class="language-js">import { spawn } from 'node:child_process';

const child = spawn('comando-que-nao-existe');
child.on('error', (err) =&gt; {
  // sem este listener, o processo pai morre
  console.error('spawn falhou:', err.code);
});</code></pre>

<p>Captura de último recurso (mas não substitui handlers locais):</p>
<pre><code class="language-js">process.on('uncaughtException', (err, origin) =&gt; {
  logger.fatal({ err, origin }, 'uncaughtException');
  // dump métricas, flush logs, então morrer
  process.exit(1);
});

process.on('unhandledRejection', (reason) =&gt; {
  logger.error({ reason }, 'unhandledRejection');
});</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Pipelines de stream em ETL — proteger contra arquivos corrompidos.</li>
<li>HTTP servers — tratar erros de socket sem derrubar o processo.</li>
<li>Conexões de banco/Redis com reconexão — emitter emite <code>'error'</code> em quedas.</li>
<li>Workers de fila (BullMQ, etc.) — registrar listener de erro do worker.</li>
<li>Child processes em ferramentas de CLI.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Listener tardio não conta</div><div>Se você fizer <code>emit('error', ...)</code> antes de adicionar o listener, o crash acontece. Adicione listeners <strong>imediatamente</strong> após criar o emitter/stream.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Stream com <code>.pipe()</code></strong> não propaga erro automaticamente — use <code>pipeline</code>.</li>
<li><strong>Erros assíncronos dentro de listeners</strong>: <code>throw</code> dentro de um <code>on('event', async ...)</code> vira unhandledRejection.</li>
<li><strong>Promise + EventEmitter</strong>: combine com <code>events.once(emitter, 'event')</code>, que rejeita corretamente em <code>'error'</code>.</li>
<li><strong>Memory leak</strong>: registrar listeners dentro de loops sem remover gera warning <code>MaxListenersExceededWarning</code>.</li>
<li><strong>Não engula</strong>: capturar todos os erros silenciosamente esconde bugs reais. Logue com contexto.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">events.once</div><div>Use <code>const [data] = await once(emitter, 'data')</code> para promisificar — ele já trata <code>'error'</code> rejeitando a promise.</div></div>`}})]})}export{a as default};

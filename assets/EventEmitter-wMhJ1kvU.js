import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function n(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Eventos · iniciante · 8 min"}),e.jsx("h1",{children:"EventEmitter"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>EventEmitter</strong> é o padrão pub/sub embutido no Node. Quase tudo no core o estende: <code>http.Server</code>, streams, <code>process</code>, sockets, child processes. Entender a API é entender como o Node se comunica internamente.</p>

<h2>Conceito</h2>
<p>Um emitter mantém um mapa de <strong>nome de evento → array de listeners</strong>. <code>emit(name, ...args)</code> chama todos os listeners <strong>sincronamente</strong>, na ordem em que foram registrados. Listeners podem ser adicionados, removidos e contados.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import { EventEmitter, once } from 'node:events';

const bus = new EventEmitter();

// Registrar
bus.on('login', (user) =&gt; console.log('hi', user.name));
bus.on('login', (user) =&gt; auditLog('login', user));

// Uma vez só
bus.once('boot', () =&gt; console.log('app started'));

// Emitir
bus.emit('login', { id: 1, name: 'Ana' });
bus.emit('boot');

// Remover
const handler = (x) =&gt; console.log(x);
bus.on('tick', handler);
bus.off('tick', handler);
bus.removeAllListeners('tick');

// Inspecionar
bus.listenerCount('login');     // 2
bus.eventNames();               // ['login']

// Promisificar — espera um único evento, ou erro
const [user] = await once(bus, 'login');
console.log('chegou', user);</code></pre>

<p>Criando um emitter próprio com tipagem TS:</p>
<pre><code class="language-ts">import { EventEmitter } from 'node:events';

type Events = {
  login: [user: { id: string; name: string }];
  logout: [userId: string];
  error: [err: Error];
};

class TypedBus extends EventEmitter {
  override emit&lt;K extends keyof Events&gt;(event: K, ...args: Events[K]): boolean {
    return super.emit(event, ...args);
  }
  override on&lt;K extends keyof Events&gt;(event: K, listener: (...args: Events[K]) =&gt; void): this {
    return super.on(event, listener);
  }
}

const bus = new TypedBus();
bus.on('login', (u) =&gt; console.log(u.name));    // u é tipado!
bus.emit('login', { id: '1', name: 'Ana' });</code></pre>

<p>Padrão async iterator — útil para streams de eventos:</p>
<pre><code class="language-js">import { on } from 'node:events';

const bus = new EventEmitter();

(async () =&gt; {
  for await (const [data] of on(bus, 'msg')) {
    console.log('recebi', data);
  }
})();

setInterval(() =&gt; bus.emit('msg', Date.now()), 1000);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Decoupling entre módulos (auth emite, audit escuta).</li>
<li>Sistemas de plugin (host emite ciclo de vida).</li>
<li>Streams (data, end, error, close).</li>
<li>Conexões persistentes (Socket.IO, Redis pub/sub) — todos baseados em emitter.</li>
<li>Telemetria interna sem acoplar a um logger específico.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">'error' é especial</div><div>Emitir <code>error</code> sem listener encerra o processo. Sempre adicione um <code>on('error', ...)</code> após criar o emitter (veja capítulo &quot;O evento error&quot;).</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Listeners executam síncrono</strong>: erros lançados em um listener afetam o <code>emit</code>.</li>
<li><strong>MaxListenersExceededWarning</strong>: default é 10. Se cresce além disso, provavelmente é leak. Para casos legítimos: <code>bus.setMaxListeners(50)</code>.</li>
<li><strong>Async listeners</strong>: <code>emit</code> não espera promises. Erros em <code>async</code> handlers viram unhandledRejection.</li>
<li><strong>Ordem de registro importa</strong>: dois listeners de <code>'login'</code> rodam em ordem de inscrição.</li>
<li><strong>Não confunda com Web EventTarget</strong>: APIs parecidas, mas EventTarget é padrão DOM/Web, EventEmitter é Node.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">eventemitter3</div><div>Para apps onde o overhead do core <code>events</code> importa (alta frequência), o pacote <code>eventemitter3</code> é uma alternativa drop-in, ~3x mais rápida.</div></div>`}})]})}export{n as default};

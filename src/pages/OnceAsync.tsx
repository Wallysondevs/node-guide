export default function OnceAsync() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · intermediario · 7 min</div>
      <h1>once e async iteration</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>O módulo <code>node:events</code> oferece dois utilitários poderosos para integrar event emitters com <code>async/await</code>: <code>once</code> (espera um único evento) e <code>on</code> (transforma uma stream de eventos em <em>async iterable</em>).</p>

        <h2>Conceito</h2>
        <p><code>once(emitter, 'evento')</code> retorna uma Promise que resolve com o array de argumentos quando o evento dispara. <code>on(emitter, 'evento')</code> retorna um async iterator que emite cada disparo até alguém chamar <code>.return()</code>.</p>

        <h2>Exemplo prático</h2>
        <pre><code class="language-js">import { once, on, EventEmitter } from 'node:events';

const ee = new EventEmitter();

// === once: espera 1 emit ===
setTimeout(() =&gt; ee.emit('ready', { port: 3000 }), 100);
const [data] = await once(ee, 'ready');
console.log('iniciou em', data.port);

// === on: itera todos os eventos ===
setTimeout(() =&gt; {
  ee.emit('data', 1);
  ee.emit('data', 2);
  ee.emit('data', 3);
}, 100);

for await (const [evt] of on(ee, 'data')) {
  console.log('recebi', evt);
  if (evt === 3) break; // sair encerra o iterator
}</code></pre>

        <h2>Aborting</h2>
        <pre><code class="language-js">const ac = new AbortController();
setTimeout(() =&gt; ac.abort(), 1000);

try {
  await once(ee, 'maybe-never', { signal: ac.signal });
} catch (e) {
  if (e.name === 'AbortError') console.log('cancelado');
}</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Aguardar <code>'listening'</code> de um servidor antes de seguir.</li>
          <li>Consumir mensagens de um <code>EventEmitter</code> como se fosse uma fila.</li>
          <li>Esperar <code>'spawn'</code> ou <code>'exit'</code> de child process.</li>
          <li>Substituir <code>process.on('SIGTERM', ...)</code> por <code>await once(process, 'SIGTERM')</code> em scripts.</li>
          <li>Adaptar APIs callback antigas para <code>async/await</code>.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li><code>once</code> rejeita se o emitter emitir <code>'error'</code> antes do evento esperado.</li>
          <li><code>on</code> faz buffer dos eventos: se você processar lento, o EventEmitter acumula e pode vazar memória.</li>
          <li>Saia do <code>for await</code> com <code>break</code> ou <code>return</code> — senão o iterator nunca encerra.</li>
          <li>Combine sempre com <code>AbortSignal</code> para evitar await pendente para sempre.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Streams como async iterables</div><div><code>Readable</code> também é async iterable: <code>for await (const chunk of stream) { ... }</code> é o jeito mais limpo de consumir.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Limite de listeners</div><div>Ao usar <code>once</code> dentro de loops, lembre que cada chamada adiciona um listener temporário. Prefira <code>on</code> + iteração para múltiplos eventos.</div></div>
      `}} />
    </article>
  );
}

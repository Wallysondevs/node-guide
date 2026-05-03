export default function Backpressure() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams &amp; Buffers · avancado · 9 min</div>
      <h1>Backpressure</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Quando o produtor é mais rápido que o consumidor, dados se acumulam em buffers internos — memória explode. <strong>Backpressure</strong> é o mecanismo de empurrar de volta o sinal "vai devagar" até a fonte original. Ignorar isso é a causa #1 de OOM em pipelines Node.</p>

<h2>Conceito</h2>
<p>Em streams Node, todo <code>Writable</code> tem um buffer com <code>highWaterMark</code> (padrão 16KB). Quando <code>write()</code> retorna <code>false</code>, é o sinal: "estou cheio, pare". Você espera o evento <code>'drain'</code> antes de continuar.</p>
<pre><code class="language-js">const ok = writable.write(chunk);
if (!ok) {
  readable.pause();
  writable.once('drain', () =&gt; readable.resume());
}</code></pre>

<h2>A solução idiomática: pipeline</h2>
<p>Implementar pause/resume manual é frágil. <code>pipeline</code> propaga backpressure, erros e cleanup automaticamente.</p>
<pre><code class="language-js">import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('huge.log'),
  createGzip(),
  createWriteStream('huge.log.gz'),
);
// se qualquer estágio falhar, todos fecham e o erro propaga</code></pre>

<h2>Async iterators</h2>
<p>Streams são async iteráveis em Node 10+. <code>for await</code> respeita backpressure naturalmente.</p>
<pre><code class="language-js">for await (const chunk of readable) {
  if (!writable.write(chunk)) {
    await new Promise(r =&gt; writable.once('drain', r));
  }
}
writable.end();</code></pre>

<h2>Tunning de highWaterMark</h2>
<pre><code class="language-js">createReadStream('f', { highWaterMark: 256 * 1024 });   // 256KB
new Writable({ highWaterMark: 1024 * 1024, write(...) { ... } });</code></pre>
<p>Buffer maior = menos chamadas, mais latência por bloco. Buffer menor = mais sensível a backpressure. Para arquivos grandes em SSD, 64KB–256KB costuma ser ótimo.</p>

<h2>Casos de uso</h2>
<ul>
<li>Upload/download de arquivos grandes sem segurar tudo em memória.</li>
<li>Compressão e criptografia em pipelines.</li>
<li>ETL: ler de banco → transformar → gravar em outro destino.</li>
<li>Proxy reverso de bytes (Express + http.request).</li>
<li>Geração de relatórios CSV gigantes para HTTP response.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Usar <code>readable.on('data', cb)</code> sem checar o retorno do <code>write</code> consome RAM linear ao tamanho da entrada.</li>
<li><code>res.write()</code> em Express também sofre backpressure — em downloads grandes, sempre <code>pipeline</code>.</li>
<li>Streams <em>object mode</em> têm <code>highWaterMark</code> em <strong>quantidade de objetos</strong>, não bytes.</li>
<li>Se o consumidor cair, o buffer pode ficar pendurado — sempre trate <code>'error'</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Web Streams</div><div>As Web Streams (<code>ReadableStream</code>) também implementam backpressure via <code>controller.desiredSize</code>. APIs novas (Undici, fetch) usam essa convenção.</div></div>

<div class="callout callout-warn"><div class="callout-title">Sintoma de backpressure ignorado</div><div>RSS subindo monotônicamente em transferências, sem GC liberar. Investigue com <code>process.memoryUsage()</code> e Clinic Doctor.</div></div>`}} />
    </article>
  );
}

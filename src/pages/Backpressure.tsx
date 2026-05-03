export default function Backpressure() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · avancado · 7 min</div>
      <h1>Backpressure</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Quando um consumidor é mais lento que o produtor, dados acumulam em buffer interno. Backpressure = sinalizar pra produzir mais devagar.</p><pre><code class="language-js">// write retorna false quando buffer está cheio
const ok = writable.write(chunk);
if (!ok) {
  readable.pause();
  writable.once('drain', () =&gt; readable.resume());
}</code></pre><p>Tudo isso é gratuito se você usar <code>pipeline</code>. É a razão #1 para preferi-lo.</p><h2>Tunning</h2><pre><code class="language-js">createReadStream('f', { highWaterMark: 256 * 1024 })   // buffer de 256KB</code></pre>`}} />
    </article>
  );
}

export default function WritableStream() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 6 min</div>
      <h1>Writable streams</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { createWriteStream } from 'node:fs';

const ws = createWriteStream('out.log');

const ok = ws.write('linha 1\\n');
if (!ok) {
  // buffer cheio — espere drain
  await new Promise(r =&gt; ws.once('drain', r));
}

ws.end('última\\n', () =&gt; console.log('fechado'));
ws.on('error', console.error);</code></pre><h2>Próprio Writable</h2><pre><code class="language-js">import { Writable } from 'node:stream';

const upper = new Writable({
  write(chunk, enc, cb) {
    process.stdout.write(chunk.toString().toUpperCase());
    cb();
  }
});</code></pre>`}} />
    </article>
  );
}

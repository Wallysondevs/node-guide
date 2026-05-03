export default function WebStreams() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 5 min</div>
      <h1>Web Streams</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Node 18+ implementa <code>ReadableStream</code>, <code>WritableStream</code> e <code>TransformStream</code> compatíveis com browser e Fetch API.</p><pre><code class="language-js">const res = await fetch('https://api.com/big.json');
for await (const chunk of res.body) {
  console.log(chunk.byteLength);
}

// converter
import { Readable } from 'node:stream';
const nodeStream = Readable.fromWeb(res.body);
const webStream = Readable.toWeb(nodeStream);</code></pre>`}} />
    </article>
  );
}

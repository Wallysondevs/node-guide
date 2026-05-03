export default function Buffer() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · intermediario · 6 min</div>
      <h1>Buffer</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>Buffer</code> é a representação de dados binários em Node — uma área de memória fora do heap V8. É um <code>Uint8Array</code> com superpoderes.</p><pre><code class="language-js">const b1 = Buffer.from('olá', 'utf8');
const b2 = Buffer.alloc(16);          // zerado
const b3 = Buffer.allocUnsafe(16);    // mais rápido, conteúdo lixo

b1.toString('utf8')        // 'olá'
b1.toString('hex')         // 'c3b36cc3a1'
b1.toString('base64')

Buffer.byteLength('olá', 'utf8')   // 4 (não 3!)

Buffer.concat([b1, b2])
b1.equals(b1)</code></pre>`}} />
    </article>
  );
}

export default function Encoding() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Streams & Buffers · iniciante · 5 min</div>
      <h1>Encodings</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Encoding define como bytes viram texto. Use <strong>utf-8</strong> sempre que possível.</p><ul><li><code>utf8</code> — universal, varia 1-4 bytes por caractere</li><li><code>ascii</code> — 7-bit, perde acentos</li><li><code>latin1</code> — 8-bit, alguns acentos</li><li><code>hex</code> — representação hexadecimal</li><li><code>base64</code> — útil para anexar binário em texto</li></ul><pre><code class="language-js">const buf = Buffer.from('café', 'utf8');
buf.length                 // 5 bytes (não 4 chars!)
'café'.length              // 4 (chars JS)
[...'café'].length         // 4 (code points)</code></pre>`}} />
    </article>
  );
}

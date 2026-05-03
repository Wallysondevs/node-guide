export default function PathAvancado() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · intermediario · 5 min</div>
      <h1>path: casos avançados</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import path from 'node:path';

path.relative('/a/b', '/a/c/d')   // '../c/d'
path.normalize('/a//b/../c')      // '/a/c'
path.isAbsolute('/etc')           // true
path.sep                          // '/' ou '\\\\'

// posix vs win32 explicitamente
path.posix.join('a', 'b')         // sempre 'a/b'
path.win32.join('a', 'b')         // sempre 'a\\\\b'</code></pre><div class="callout callout-tip"><div class="callout-title">Caminhos em ESM</div><div><code>__dirname</code> não existe. Use <code>import.meta.dirname</code> (Node 20.11+) ou <code>fileURLToPath(import.meta.url)</code>.</div></div>`}} />
    </article>
  );
}

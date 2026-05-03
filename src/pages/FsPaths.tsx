export default function FsPaths() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · iniciante · 5 min</div>
      <h1>path: cross-platform</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Nunca concatene caminhos com <code>+</code>. Windows usa <code>\\</code>, Unix usa <code>/</code>. Use <code>path</code>.</p><pre><code class="language-js">import path from 'node:path';

path.join('users', 'ana', 'docs')   // 'users/ana/docs'
path.resolve('src', 'index.js')     // /abs/path/src/index.js
path.basename('/a/b/foo.js')        // 'foo.js'
path.dirname('/a/b/foo.js')         // '/a/b'
path.extname('foo.tar.gz')          // '.gz'
path.parse('/a/foo.js')             // { dir, base, name, ext, root }</code></pre>`}} />
    </article>
  );
}

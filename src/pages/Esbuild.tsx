export default function Esbuild() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · intermediario · 5 min</div>
      <h1>esbuild</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Bundler/transpiler escrito em Go. ~100x mais rápido que webpack para builds de servidor.</p><pre><code class="language-bash">npm i -D esbuild</code></pre><pre><code class="language-js">// build.js
import { build } from 'esbuild';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/server.js',
  external: ['pg', '@prisma/client'],   // não bundlar nativos
  sourcemap: true,
  minify: true,
});</code></pre>`}} />
    </article>
  );
}

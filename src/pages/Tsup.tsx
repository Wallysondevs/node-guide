export default function Tsup() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · intermediario · 4 min</div>
      <h1>tsup</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Wrapper amigável sobre esbuild para libs. Gera ESM + CJS + .d.ts em um comando.</p><pre><code class="language-bash">npm i -D tsup</code></pre><pre><code class="language-json">// package.json
"scripts": {
  "build": "tsup src/index.ts --format esm,cjs --dts --clean"
}</code></pre>`}} />
    </article>
  );
}

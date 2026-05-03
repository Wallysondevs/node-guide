export default function Tsx() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · intermediario · 5 min</div>
      <h1>tsx, ts-node, swc</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>tsx</strong> — esbuild por baixo, super rápido, ideal pra dev e scripts</li><li><strong>ts-node</strong> — clássico, mais lento</li><li><strong>@swc/cli</strong> — Rust, build de produção rápido</li><li><strong>Node 22+</strong> — <code>--experimental-strip-types</code> roda .ts sem nada</li></ul><pre><code class="language-bash"># Node 22+
node --experimental-strip-types src/index.ts</code></pre>`}} />
    </article>
  );
}

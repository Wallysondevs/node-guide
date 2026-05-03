export default function ProjectReferences() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · avancado · 6 min</div>
      <h1>Project references</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Em monorepos, divida o tsconfig em projetos para builds incrementais.</p><pre><code class="language-json">// tsconfig.json (raiz)
{
  "files": [],
  "references": [
    { "path": "./packages/utils" },
    { "path": "./packages/api" }
  ]
}

// packages/api/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "composite": true, "outDir": "dist" },
  "references": [{ "path": "../utils" }]
}</code></pre><pre><code class="language-bash">tsc --build           # incremental, paralelo
tsc --build --watch</code></pre>`}} />
    </article>
  );
}

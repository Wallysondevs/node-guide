export default function PackageJson() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 7 min</div>
      <h1>package.json</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Manifesto do seu projeto. Define metadados, deps, scripts e como o pacote é exposto a quem o consome.</p><pre><code class="language-json">{
  "name": "@meu-org/api",
  "version": "1.2.3",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./utils": "./dist/utils.js"
  },
  "files": ["dist"],
  "engines": { "node": "&gt;=20" },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "test": "vitest"
  },
  "dependencies": { "express": "^4.21.0" },
  "devDependencies": { "typescript": "^5.6.0" },
  "peerDependencies": { "react": "&gt;=18" }
}</code></pre>`}} />
    </article>
  );
}

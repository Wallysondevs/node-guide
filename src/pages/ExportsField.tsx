export default function ExportsField() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · intermediario · 7 min</div>
      <h1>Exports field</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O campo <code>exports</code> é o mecanismo moderno para expor entrypoints. Ele substitui <code>main</code> e dá controle fino: ESM vs CJS, types, browser vs node.</p><pre><code class="language-json">{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./client": "./dist/client.js",
    "./package.json": "./package.json"
  }
}</code></pre><p>Tudo que <strong>não estiver</strong> em exports vira inacessível externamente — ótimo para encapsulamento.</p><div class="callout callout-tip"><div class="callout-title">Dual package</div><div>Para publicar ESM + CJS, gere os dois bundles e use <code>import</code>/<code>require</code> conditional exports.</div></div>`}} />
    </article>
  );
}

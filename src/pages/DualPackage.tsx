export default function DualPackage() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · avancado · 8 min</div>
      <h1>Dual ESM + CJS</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Para suportar consumidores em ambos os mundos, gere ambos os formatos e use exports condicionais.</p><pre><code class="language-json">{
  "type": "module",
  "main": "./dist/cjs/index.cjs",
  "module": "./dist/esm/index.js",
  "types": "./dist/esm/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/esm/index.d.ts",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.cjs"
    }
  }
}</code></pre><pre><code class="language-bash"># Build com tsup (mais simples)
tsup src/index.ts --format esm,cjs --dts</code></pre><div class="callout callout-warn"><div class="callout-title">Dual package hazard</div><div>Importar a mesma lib em ambos formatos cria DUAS instâncias com estado separado. Cuidado com singletons.</div></div>`}} />
    </article>
  );
}

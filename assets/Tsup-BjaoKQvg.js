import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function d(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Build & TS · intermediario · 6 min"}),e.jsx("h1",{children:"tsup"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>tsup</strong> é um wrapper amigável sobre o esbuild focado em <em>publicar libraries</em>. Em um comando você gera ESM + CJS + tipos <code>.d.ts</code>, com tree-shaking, watch e dual package — sem mexer em config de Rollup.</p>

<h2>Conceito</h2>
<p>Para libs Node/TS modernas, você normalmente precisa entregar:</p>
<ul>
<li>ESM (<code>.mjs</code> ou <code>.js</code> com <code>type: module</code>) para bundlers e Node moderno.</li>
<li>CJS (<code>.cjs</code>) para suportar consumidores legados.</li>
<li><code>.d.ts</code> para que TypeScript funcione no consumidor.</li>
<li>Sourcemaps para debug.</li>
</ul>
<p>tsup faz tudo isso. Por baixo: esbuild (compilação ultrarrápida) + <code>tsc</code> ou rollup-plugin-dts (tipos).</p>

<pre><code class="language-bash">npm i -D tsup typescript</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-json">{
  "name": "minha-lib",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}</code></pre>

<h3>tsup.config.ts</h3>
<pre><code class="language-ts">import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: 'node20',
  external: ['react', 'react-dom'],
});</code></pre>

<h3>Múltiplas entradas</h3>
<pre><code class="language-ts">export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    'plugins/auth': 'src/plugins/auth.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
});</code></pre>

<h3>CLI executável</h3>
<pre><code class="language-ts">// src/cli.ts
#!/usr/bin/env node
console.log('hello cli');</code></pre>
<pre><code class="language-json">// package.json
"bin": { "minha-cli": "./dist/cli.js" }</code></pre>
<p>tsup preserva o shebang automaticamente.</p>

<h2>Quando usar</h2>
<ul>
<li>Publicar libs npm com suporte ESM + CJS sem dor.</li>
<li>Empacotar SDKs internos em monorepos.</li>
<li>CLI tools simples (Node 20+) que precisam ser <code>npx</code>-zable.</li>
<li>Plugins para frameworks (Vite, Rollup, ESLint) que exigem múltiplos formatos.</li>
<li>Substituir Rollup quando configuração custosa não traz benefício.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Marque dependências de runtime grandes como <code>external</code> — elas não vão para o bundle final, o consumidor instala.</li>
<li>Sempre defina <code>exports</code> no package.json com condicionais <code>import</code>/<code>require</code>/<code>types</code>.</li>
<li>Inclua <code>"files": ["dist"]</code> para publicar só o build, não <code>src</code>.</li>
<li>Rode <code>tsc --noEmit</code> em separado no CI — tsup gera tipos mas não roda checagem completa.</li>
<li>Use <code>--watch</code> em dev junto com <code>workspace:</code> em monorepo para hot reload entre pacotes.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">tsup vs tsc vs unbuild</div><div><code>tsc</code> é simples mas não bundla. <code>unbuild</code> (do ecossistema Nuxt) tem zero-config e gera tipos via rollup. <code>tsup</code> é o sweet spot para a maioria das libs.</div></div>

<div class="callout callout-tip"><div class="callout-title">Cuidado com dual package hazard</div><div>Quando ESM e CJS coexistem, instâncias podem divergir (duas cópias do mesmo módulo). Evite estado global em libs dual; use <code>"type": "module"</code> e ESM-only quando possível.</div></div>`}})]})}export{d as default};

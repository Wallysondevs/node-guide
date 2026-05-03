import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Build & TS · avancado · 8 min"}),e.jsx("h1",{children:"Project references"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>Project references</strong> permitem dividir um codebase TypeScript grande em vários projetos menores, com builds incrementais, paralelos e isolados. Essencial em monorepos onde libs internas dependem umas das outras.</p>

<h2>Conceito</h2>
<p>Cada subprojeto vira um <code>tsconfig.json</code> com <code>composite: true</code>. O TS gera arquivos <code>.d.ts</code> e <code>.tsbuildinfo</code> e só recompila o que mudou. Um projeto raiz lista os filhos em <code>references</code>.</p>
<pre><code class="language-json">// tsconfig.json (raiz)
{
  "files": [],
  "references": [
    { "path": "./packages/utils" },
    { "path": "./packages/api" },
    { "path": "./packages/web" }
  ]
}</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-bash">monorepo/
├─ tsconfig.base.json
├─ tsconfig.json          # só agrega references
└─ packages/
   ├─ utils/
   │  ├─ src/index.ts
   │  └─ tsconfig.json
   └─ api/
      ├─ src/server.ts
      └─ tsconfig.json</code></pre>
<pre><code class="language-json">// tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}</code></pre>
<pre><code class="language-json">// packages/utils/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}

// packages/api/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "references": [{ "path": "../utils" }],
  "include": ["src/**/*"]
}</code></pre>
<pre><code class="language-bash">tsc --build                # build incremental, em ordem topológica
tsc --build --watch        # rebuild ao salvar
tsc --build --clean        # limpa dist + tsbuildinfo
tsc --build --force        # ignora cache</code></pre>

<h2>Quando usar</h2>
<ul>
  <li>Monorepos com pnpm/turbo/nx onde várias libs compartilham tipos.</li>
  <li>Projetos grandes onde <code>tsc</code> demora &gt; 10s no clean build.</li>
  <li>Quando você quer publicar libs internas com <code>.d.ts</code> reais (não <code>paths</code>).</li>
  <li>Para garantir que app não quebre quando lib interna muda — TS rebuildará a cadeia.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">composite implica</div><div><code>declaration: true</code>, <code>incremental: true</code> e <code>rootDir</code> obrigatório. Não dá para misturar com <code>noEmit</code>.</div></div>

<h2>Pegadinhas</h2>
<ul>
  <li><strong>Imports devem mirar no <code>dist</code></strong> (ou usar <code>paths</code> + bundler) — Node não resolve TS direto.</li>
  <li>Arquivos referenciados precisam estar em <code>include</code> do projeto-dono; senão <code>error TS6307</code>.</li>
  <li><code>tsc</code> simples ignora references. Sempre use <code>tsc --build</code> (ou <code>tsc -b</code>).</li>
  <li>Nunca commite <code>.tsbuildinfo</code> — adicione ao <code>.gitignore</code>.</li>
  <li>Em CI, rode <code>tsc -b --force</code> para evitar caches corrompidos.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Combine com pnpm workspaces</div><div>Em <code>package.json</code> de cada lib, aponte <code>"main": "dist/index.js"</code> e <code>"types": "dist/index.d.ts"</code>. O resolver do Node achará tudo via <code>workspace:*</code>.</div></div>`}})]})}export{r as default};

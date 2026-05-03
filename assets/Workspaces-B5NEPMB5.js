import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Módulos · intermediario · 11 min"}),e.jsx("h1",{children:"Workspaces e monorepos"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p>Monorepo = vários pacotes num único repositório, compartilhando dependências, tooling e versionamento. npm, pnpm e yarn suportam workspaces nativamente. <strong>pnpm</strong> é o mais eficiente em disco e velocidade.</p>

<h2>Conceito</h2>
<p>Em workspaces, cada pasta tem seu <code>package.json</code> e pode declarar dependência local de outra (<code>"workspace:*"</code>). O gerenciador faz symlinks em <code>node_modules</code>; alterações são imediatas, sem <code>npm link</code>.</p>

<h3>Layout típico</h3>
<pre><code class="language-bash">monorepo/
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   ├── api/
│   │   └── package.json
│   └── web/
│       └── package.json
└── libs/
    ├── ui/
    │   └── package.json
    └── utils/
        └── package.json</code></pre>

<h2>Exemplo prático: pnpm</h2>
<pre><code class="language-bash"># pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'libs/*'</code></pre>

<pre><code class="language-json">// apps/api/package.json
{
  "name": "@org/api",
  "dependencies": {
    "@org/utils": "workspace:*",
    "express": "^4.19.0"
  }
}</code></pre>

<pre><code class="language-bash">pnpm install                       # instala tudo, faz symlinks
pnpm --filter @org/api dev         # roda script de um pacote
pnpm --filter @org/utils build
pnpm -r build                      # roda em todos
pnpm -r --parallel dev             # paralelo
pnpm --filter './apps/*' test</code></pre>

<h3>npm workspaces</h3>
<pre><code class="language-json">{
  "name": "monorepo",
  "private": true,
  "workspaces": ["apps/*", "libs/*"]
}</code></pre>

<pre><code class="language-bash">npm install
npm run dev -w @org/api
npm run build --workspaces</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Front + back + libs compartilhadas no mesmo repo.</li>
<li>Várias APIs internas que reusam um SDK ou DTOs.</li>
<li>Design system + apps que consomem.</li>
<li>Plugins/adapters de uma lib principal versionados juntos.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Coloque ferramentas comuns (eslint, ts, vitest) na raiz com <code>-D -w</code>.</li>
<li>Use <code>tsconfig.base.json</code> e <code>extends</code> em cada pacote.</li>
<li>Para builds incrementais e cache, adote <strong>Turborepo</strong> ou <strong>Nx</strong>.</li>
<li>Versione com <code>changesets</code>: changelog, bump e publish automatizados.</li>
<li>Marque pacotes não-publicados com <code>"private": true</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">pnpm vence em disco</div><div>pnpm usa hard-links para um content-addressable store, então node_modules ocupa uma fração do que ocupa em npm/yarn.</div></div>

<div class="callout callout-warn"><div class="callout-title">Versão local vs publicada</div><div><code>workspace:*</code> só funciona dentro do monorepo. Antes de publicar, <code>pnpm publish</code> reescreve para a versão real.</div></div>
`}})]})}export{i as default};

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Build & TS · intermediario · 9 min"}),e.jsx("h1",{children:"tsx, ts-node, swc"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p>Para rodar TypeScript em Node sem um passo separado de build existem várias opções. Cada uma faz um trade-off diferente entre velocidade, compatibilidade com ESM/CJS e fidelidade de checagem de tipos.</p>

<h2>Conceito</h2>
<p>O Node não executa <code>.ts</code> nativamente (ainda). As ferramentas abaixo interceptam o carregamento de módulos e transpilam para JS antes de executar. Quase todas <strong>não fazem type-check</strong> em runtime — você ainda precisa do <code>tsc --noEmit</code> no CI.</p>
<ul>
<li><strong>tsx</strong> — usa esbuild, suporta ESM e CJS, watch built-in. Ideal para dev e scripts.</li>
<li><strong>ts-node</strong> — clássico, baseado no compilador oficial do TS. Mais lento, mas honra <code>tsconfig</code> de forma fiel.</li>
<li><strong>@swc/cli + swc-node</strong> — Rust, build de produção e loader rápido.</li>
<li><strong>Node 22+</strong> traz <code>--experimental-strip-types</code> que apaga anotações de tipo sem transpilar nada além disso.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-bash">npm i -D tsx typescript
# rodar um script TS
npx tsx src/index.ts
# modo watch para servidores
npx tsx watch src/server.ts</code></pre>

<p>Com Node 22+ e código sem enums/decorators você pode dispensar até o tsx em dev:</p>
<pre><code class="language-bash">node --experimental-strip-types src/index.ts
# Node 23+: ligado por padrão</code></pre>

<p>Para builds de produção use <code>tsc</code> ou <code>tsup</code>/<code>esbuild</code> e rode o JS resultante com <code>node dist/index.js</code> — não use loaders em produção.</p>

<h2>Quando usar cada um</h2>
<ul>
<li><strong>tsx</strong>: dev local, scripts CLI, monorepos.</li>
<li><strong>ts-node</strong>: projetos legados, quando você precisa de <code>--type-check</code> on-the-fly.</li>
<li><strong>swc-node</strong>: pipelines CI muito grandes onde cada segundo conta.</li>
<li><strong>strip-types nativo</strong>: scripts simples, exemplos, prototipagem.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Loaders <strong>não validam tipos</strong>; rode <code>tsc --noEmit</code> separadamente.</li>
<li>Decorators e <code>enum</code> exigem transpilador real — strip-types nativo não cobre.</li>
<li>Em ESM, lembre dos imports com extensão <code>.js</code> mesmo apontando para <code>.ts</code>.</li>
<li>Não distribua um pacote npm que dependa do tsx em produção do consumidor.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Dica</div><div>Em <code>package.json</code> use <code>"dev": "tsx watch src/server.ts"</code> e <code>"build": "tsc"</code>. Simples e rápido.</div></div>

<div class="callout callout-warn"><div class="callout-title">Cuidado</div><div>Não confunda <code>tsx</code> (a CLI) com a extensão <code>.tsx</code> de React. São coisas diferentes.</div></div>
`}})]})}export{t as default};

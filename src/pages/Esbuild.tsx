export default function Esbuild() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build &amp; TS · intermediario · 7 min</div>
      <h1>esbuild</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><strong>esbuild</strong> é um bundler/transpiler escrito em Go. Compila TypeScript e JSX, faz bundling, minificação, tree-shaking e splitting — tudo entre 10x e 100x mais rápido que webpack/Rollup. Em servidores Node, é a opção mais simples para gerar um <code>dist/</code> pronto para deploy.</p>

<h2>Conceito</h2>
<p>esbuild não verifica tipos: ele apenas <strong>strips</strong> as anotações de TS. Para checagem de tipos use <code>tsc --noEmit</code> em paralelo (ou no CI). Bundling para Node geralmente exclui <code>node_modules</code> nativos via <code>external</code>.</p>

<h2>Exemplo prático</h2>
<p>Instalação e uso de CLI:</p>
<pre><code class="language-bash">npm i -D esbuild

# bundle simples
npx esbuild src/index.ts \\
  --bundle --platform=node --target=node20 \\
  --outfile=dist/server.js</code></pre>

<p>Script de build mais completo:</p>
<pre><code class="language-js">// build.mjs
import { build } from 'esbuild';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: 'dist/server.js',
  external: ['pg-native', '@prisma/client', 'sharp'],
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  banner: { js: 'import { createRequire } from &quot;module&quot;; const require = createRequire(import.meta.url);' },
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production') },
  logLevel: 'info',
});</code></pre>

<p>Modo <strong>watch</strong> para desenvolvimento:</p>
<pre><code class="language-js">// dev.mjs
import { context } from 'esbuild';

const ctx = await context({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/server.js',
  sourcemap: true,
});

await ctx.watch();
console.log('watching...');</code></pre>

<p>Scripts típicos no <code>package.json</code>:</p>
<pre><code class="language-json">{
  "scripts": {
    "build": "node build.mjs",
    "dev": "node dev.mjs &amp; node --watch dist/server.js",
    "typecheck": "tsc --noEmit"
  }
}</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Bundlar API Node em <strong>um arquivo</strong> para Lambda/Cloud Functions.</li>
<li>Gerar <code>dist/</code> em projetos TS sem precisar de Babel/webpack.</li>
<li>Hot rebuild em monorepos grandes.</li>
<li>Embed de assets (com <code>loader: { '.html': 'text' }</code>).</li>
<li>Build de bibliotecas dual ESM+CJS (com <code>tsup</code> por cima).</li>
</ul>

<div class="callout callout-info"><div class="callout-title">esbuild vs tsc</div><div><code>tsc</code> é o oficial, faz type-check, mais lento, gera arquivo por arquivo. <code>esbuild</code> é só transpilação, ultra rápido, ideal para deploy. Combine: <code>esbuild</code> para output, <code>tsc --noEmit</code> para validar tipos.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Sem type-check</strong>: rode <code>tsc --noEmit</code> no pre-commit/CI ou erros de tipo viram bugs em runtime.</li>
<li><strong>Decorators e <code>emitDecoratorMetadata</code></strong>: esbuild não suporta totalmente — use <code>swc</code> ou <code>tsc</code> se depende disso (TypeORM, NestJS).</li>
<li><strong><code>__dirname</code> em ESM</strong>: ao bundlar para <code>format: 'esm'</code>, defina o banner com shim ou use <code>import.meta.url</code>.</li>
<li><strong>Native modules</strong>: liste em <code>external</code> — bundling de <code>.node</code> não funciona.</li>
<li><strong>Tree-shake só com ESM</strong>: importe seletivamente para reduzir output.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">tsup como wrapper</div><div>Para libs publicáveis, <code>tsup</code> usa esbuild por baixo + adiciona geração de <code>.d.ts</code>, dual ESM/CJS e configuração mais simples.</div></div>`}} />
    </article>
  );
}

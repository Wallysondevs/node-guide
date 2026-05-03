export default function ExportsField() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · intermediario · 10 min</div>
      <h1>Exports field</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O campo <code>exports</code> no <code>package.json</code> é o mecanismo moderno para expor entrypoints de um pacote. Ele substitui (e estende) <code>main</code>, dando controle fino sobre ESM vs CJS, types do TypeScript e ambiente (browser, node, deno).</p>

<h2>Conceito</h2>
<p>Antes do Node 12, qualquer arquivo dentro do pacote podia ser importado livremente. Com <code>exports</code>, o autor declara explicitamente o que é público — tudo que não está listado fica <strong>inacessível</strong> de fora. Isso traz encapsulamento real e libera você para refatorar internals sem quebrar consumidores.</p>
<pre><code class="language-json">{
  "name": "minha-lib",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.cjs"
    },
    "./package.json": "./package.json"
  }
}</code></pre>
<p>A ordem das chaves <strong>importa</strong>: o Node lê de cima para baixo e usa a primeira que casa. Por isso <code>"types"</code> sempre vem antes de <code>"import"</code> e <code>"require"</code>.</p>

<h2>Exemplo prático</h2>
<p>Pacote dual (ESM + CJS) com subpath, condições de browser e tipos:</p>
<pre><code class="language-json">{
  "name": "@acme/sdk",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "browser": "./dist/index.browser.mjs",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "default": "./dist/index.mjs"
    },
    "./client": {
      "types": "./dist/client.d.ts",
      "import": "./dist/client.mjs",
      "require": "./dist/client.cjs"
    },
    "./package.json": "./package.json"
  },
  "files": ["dist"]
}</code></pre>
<pre><code class="language-js">import sdk from '@acme/sdk';
import { createClient } from '@acme/sdk/client';
// import x from '@acme/sdk/internal' → ERR_PACKAGE_PATH_NOT_EXPORTED</code></pre>

<h2>Condições suportadas</h2>
<ul>
<li><strong>types</strong> — arquivo <code>.d.ts</code> para TypeScript (sempre primeiro)</li>
<li><strong>node</strong> — específico do runtime Node</li>
<li><strong>browser</strong> — usado por bundlers (Vite, webpack, esbuild)</li>
<li><strong>import</strong> — quem usa <code>import x from</code> (ESM)</li>
<li><strong>require</strong> — quem usa <code>require()</code> (CJS)</li>
<li><strong>development</strong>, <strong>production</strong> — ativadas por <code>node --conditions=production</code></li>
<li><strong>default</strong> — fallback final, sempre por último</li>
</ul>

<h2>Quando usar</h2>
<ul>
<li>Bibliotecas que suportam ESM e CJS simultaneamente (dual package)</li>
<li>SDKs com subpaths organizados (<code>/client</code>, <code>/server</code>, <code>/react</code>)</li>
<li>Esconder código interno (utils, helpers, fixtures) do consumidor</li>
<li>Diferenciar bundle browser vs node (ex.: <code>fetch</code> nativo no browser, <code>undici</code> no node)</li>
<li>Versões otimizadas com <code>development</code>/<code>production</code> (ex.: warnings só em dev)</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Cuidado com a ordem</div><div>Se <code>"default"</code> ou <code>"import"</code> vierem antes de <code>"types"</code>, o TypeScript pode não achar as definições e o usuário recebe <code>any</code> silencioso. Sempre coloque <code>"types"</code> no topo de cada bloco condicional.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li>Sem <code>"./package.json": "./package.json"</code>, ferramentas que leem o manifesto (next, storybook) quebram</li>
<li>Wildcards <code>"./feat/*": "./dist/feat/*.js"</code> existem mas não funcionam em todos os bundlers antigos</li>
<li>Em monorepo, <code>exports</code> só vale quando o pacote vai pro npm; <code>tsconfig paths</code> ignora</li>
<li>Não duplique no <code>main</code> e no <code>exports["."]</code> rotas conflitantes — o Node prioriza <code>exports</code></li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Ferramenta</div><div><code>tsup</code> e <code>tshy</code> geram automaticamente o campo <code>exports</code> coerente com a saída dual. Use <code>npx @arethetypeswrong/cli</code> antes de publicar para validar todas as condições contra Node ESM, Node CJS e bundlers.</div></div>`}} />
    </article>
  );
}

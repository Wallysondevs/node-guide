export default function NpmCli() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 7 min</div>
      <h1>npm, npx e pnpm</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O <strong>npm</strong> é o registry e o cliente padrão de pacotes. Vem com o Node. <strong>npx</strong> roda binários sem instalar. <strong>pnpm</strong> é uma alternativa moderna, com cache global e instalação ~3x mais rápida.</p><h2>Comandos essenciais</h2><pre><code class="language-bash">npm init -y                 # cria package.json
npm install express        # adiciona dependência
npm install -D vitest      # devDependency
npm install -g typescript  # global
npm uninstall lodash
npm update
npm outdated
npm run dev                # roda script
npx create-vite my-app     # roda binário sem instalar</code></pre><h2>package.json</h2><pre><code class="language-json">{
  "name": "minha-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "test": "node --test"
  },
  "dependencies": { "express": "^4.21.0" }
}</code></pre><div class="callout callout-tip"><div class="callout-title">pnpm</div><div><code>npm install -g pnpm</code> e use <code>pnpm i</code> em vez de <code>npm i</code>. Em monorepos a diferença é gritante.</div></div>`}} />
    </article>
  );
}

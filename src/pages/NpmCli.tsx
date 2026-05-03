export default function NpmCli() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 9 min</div>
      <h1>npm, npx e pnpm</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>O <strong>npm</strong> é o registry e o cliente padrão de pacotes do Node — vem instalado junto. <strong>npx</strong> roda binários sem instalar globalmente. <strong>pnpm</strong> é uma alternativa moderna com cache global, links simbólicos e instalação 2-3x mais rápida.</p>

        <h2>Comandos essenciais</h2>
        <pre><code class="language-bash">npm init -y                  # cria package.json com defaults
npm install express          # adiciona dependência
npm install -D vitest        # devDependency (--save-dev)
npm install -g typescript    # global (cuidado: PATH)
npm uninstall lodash
npm update                   # atualiza dentro do range semver
npm outdated                 # mostra o que está atrasado
npm run dev                  # roda script do package.json
npm ci                       # install determinístico (CI)
npx create-vite my-app       # roda binário sem instalar</code></pre>

        <h2>package.json mínimo</h2>
        <pre><code class="language-json">{
  "name": "minha-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "test": "node --test",
    "lint": "eslint ."
  },
  "dependencies": { "express": "^4.21.0" },
  "devDependencies": { "eslint": "^9.0.0" }
}</code></pre>

        <h2>Semver em uma linha</h2>
        <ul>
          <li><code>^1.2.3</code>: aceita <em>minor</em> e <em>patch</em> (1.x.x), bloqueia 2.0.</li>
          <li><code>~1.2.3</code>: só <em>patch</em> (1.2.x).</li>
          <li><code>1.2.3</code>: exato.</li>
          <li><code>*</code>: qualquer (não use).</li>
        </ul>

        <h2>pnpm: por que migrar</h2>
        <pre><code class="language-bash">npm install -g pnpm
pnpm i                       # install
pnpm add express             # equivale a npm install
pnpm add -D vitest
pnpm dlx create-vite my-app  # equivale a npx
pnpm -r build                # roda em todos workspaces</code></pre>
        <p>Em monorepos, <code>pnpm</code> gasta uma fração do disco e é dramaticamente mais rápido. Outras alternativas: <strong>yarn</strong> e <strong>bun</strong>.</p>

        <h2>Casos de uso</h2>
        <ul>
          <li><code>npm ci</code> em pipelines de CI para builds reproduzíveis.</li>
          <li><code>npx</code> para gerar projetos sem poluir o sistema.</li>
          <li><code>pnpm</code> em monorepos (workspaces).</li>
          <li><code>npm publish</code> para publicar bibliotecas no registry.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Sem <code>package-lock.json</code> commitado, builds não são reproduzíveis.</li>
          <li>Misturar <code>npm</code> e <code>pnpm</code> no mesmo projeto cria locks conflitantes.</li>
          <li><code>npm install -g</code> exige permissão; prefira gerenciadores como <strong>nvm</strong>.</li>
          <li>Scripts em <code>postinstall</code> de deps podem rodar código arbitrário — atente.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Versões do Node</div><div>Use <strong>nvm</strong> (Linux/Mac), <strong>fnm</strong> ou <strong>volta</strong> para alternar entre versões. Comprometa <code>.nvmrc</code> no repo.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Lockfile sagrado</div><div>Nunca edite <code>package-lock.json</code> à mão. Para forçar resolução, edite <code>package.json</code> e rode <code>npm install</code>.</div></div>
      `}} />
    </article>
  );
}

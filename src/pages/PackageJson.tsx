export default function PackageJson() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 9 min</div>
      <h1>package.json</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>O <code>package.json</code> é o <strong>manifesto</strong> do seu projeto. Define metadados, dependências, scripts e — para libs — como o pacote é exposto a quem o consome.</p>

        <h2>Conceito</h2>
        <p>Cada projeto Node tem um. Ele controla resolução de módulos (<code>type</code>, <code>exports</code>, <code>main</code>), o que vai pro registry (<code>files</code>), versionamento (<code>version</code>, semver), e a UX de instalação (<code>scripts</code>).</p>

        <h2>Esqueleto completo</h2>
        <pre><code class="language-json">{
  "name": "@meu-org/api",
  "version": "1.2.3",
  "description": "API HTTP do produto X",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./utils": "./dist/utils.js"
  },
  "files": ["dist"],
  "engines": { "node": "&gt;=20" },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint .",
    "prepublishOnly": "npm run build"
  },
  "dependencies": { "express": "^4.21.0" },
  "devDependencies": { "typescript": "^5.6.0", "tsx": "^4.0.0" },
  "peerDependencies": { "react": "&gt;=18" },
  "publishConfig": { "access": "public" }
}</code></pre>

        <h2>Campos críticos</h2>
        <ul>
          <li><strong>name</strong>: scoped (<code>@org/pkg</code>) é obrigatório se publicar como público em org.</li>
          <li><strong>version</strong>: semver. Bump correto evita quebrar consumidores.</li>
          <li><strong>type</strong>: <code>"module"</code> = ESM por padrão; sem isso é CommonJS.</li>
          <li><strong>exports</strong>: substitui <code>main</code>; permite <em>conditional exports</em> (import/require/types).</li>
          <li><strong>files</strong>: lista do que vai pro tarball publicado. Sem isso, vai tudo.</li>
          <li><strong>engines</strong>: versão mínima do Node — npm avisa se incompatível.</li>
        </ul>

        <h2>Tipos de dependências</h2>
        <ul>
          <li><strong>dependencies</strong>: precisa em runtime.</li>
          <li><strong>devDependencies</strong>: build, test, lint.</li>
          <li><strong>peerDependencies</strong>: o consumidor traz (ex.: React em uma lib React).</li>
          <li><strong>optionalDependencies</strong>: install pode falhar sem quebrar.</li>
          <li><strong>bundledDependencies</strong>: incluídas no tarball publicado.</li>
        </ul>

        <h2>Scripts comuns</h2>
        <pre><code class="language-json">{
  "scripts": {
    "build": "tsc",
    "test": "node --test",
    "test:watch": "node --test --watch",
    "format": "prettier --write .",
    "prebuild": "rimraf dist",
    "postinstall": "echo obrigado"
  }
}</code></pre>
        <p>Hooks <code>pre*</code> e <code>post*</code> rodam automaticamente.</p>

        <h2>Casos de uso</h2>
        <ul>
          <li>Lib publicada com dual ESM/CJS via <code>exports</code>.</li>
          <li>App interno com scripts orquestrando dev/build/test.</li>
          <li>Workspace raiz em monorepo (<code>workspaces</code>: ["packages/*"]).</li>
          <li>CLI (<code>bin</code>: <code>{ "minha-cli": "./dist/cli.js" }</code>).</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Sem <code>files</code> ou <code>.npmignore</code>, você publica testes e segredos por engano.</li>
          <li><code>dependencies</code> com <code>*</code> ou ranges largos quebram builds reproduzíveis.</li>
          <li>Esquecer <code>type: "module"</code> quebra <code>import</code> em <code>.js</code>.</li>
          <li><code>main</code> sem <code>exports</code> não permite subpath imports.</li>
          <li>Scripts em deps rodam código arbitrário no install — atente.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Validação</div><div>Use <code>publint</code> e <code>arethetypeswrong</code> para validar que sua lib publica corretamente para ESM, CJS e tipos.</div></div>
        <div class="callout callout-warn"><div class="callout-title">npm publish</div><div>Rode <code>npm pack --dry-run</code> antes de publicar para inspecionar o que vai no tarball.</div></div>
      `}} />
    </article>
  );
}

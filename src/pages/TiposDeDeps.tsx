export default function TiposDeDeps() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 7 min</div>
      <h1>dependencies vs dev vs peer</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O <code>package.json</code> tem quatro campos para dependências, cada um com semântica e impacto diferente em quem instala seu pacote. Misturá-los gera builds gordas em produção, pacotes quebrados para usuários e atualizações dolorosas.</p>

<h2>Conceito</h2>
<ul>
<li><strong>dependencies</strong> — necessárias em runtime. Vão para qualquer instalação, inclusive produção. Ex.: <code>express</code>, <code>pg</code>, <code>zod</code>.</li>
<li><strong>devDependencies</strong> — só em build, teste e ferramental. Não instaladas com <code>npm ci --omit=dev</code>. Ex.: <code>typescript</code>, <code>vitest</code>, <code>eslint</code>, <code>tsup</code>.</li>
<li><strong>peerDependencies</strong> — pacote espera que o consumidor forneça. Usado por libs/plugins. Ex.: <code>react</code> em libs de UI.</li>
<li><strong>optionalDependencies</strong> — instala se possível; não falha se der erro de plataforma. Ex.: <code>fsevents</code> só no macOS.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-json">{
  "name": "minha-api",
  "dependencies": {
    "express": "^4.19.0",
    "pg": "^8.12.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "@types/express": "^4.17.0",
    "tsup": "^8.0.0"
  }
}</code></pre>

<h3>Lib com peer</h3>
<pre><code class="language-json">{
  "name": "minha-lib-react",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": { "optional": true }
  }
}</code></pre>

<h3>Comandos para cada caso</h3>
<pre><code class="language-bash">npm install express              # vai para dependencies
npm install -D vitest            # devDependencies
npm install --save-peer react    # peerDependencies
npm install --save-optional fsevents

# instalação de produção
npm ci --omit=dev                # ignora devDependencies
NODE_ENV=production npm install  # mesma coisa por convenção</code></pre>

<h2>Quando usar cada um</h2>
<ul>
<li><strong>dependencies</strong> — qualquer <code>import</code>/<code>require</code> que roda em produção.</li>
<li><strong>devDependencies</strong> — typescript, linters, formatters, test runners, bundlers, geradores de código, types (<code>@types/*</code>).</li>
<li><strong>peerDependencies</strong> — você está escrevendo uma lib e não quer duplicar React/Vue/Express na bundle do consumidor.</li>
<li><strong>optionalDependencies</strong> — binários nativos por plataforma, integrações que degradam graciosamente.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Colocar <code>typescript</code> em dependencies de uma <strong>aplicação</strong> não é grave; em <strong>lib</strong> publicada na npm é desperdício para o consumidor.</li>
<li>Tipos de bibliotecas (<code>@types/express</code>) em libs publicadas devem ser <code>peerDependencies</code> ou <code>devDependencies</code> + <code>peerDependenciesMeta</code>.</li>
<li>Faltando <code>peer</code>: o consumidor recebe avisos de versão incompatível e às vezes erros estranhos em runtime.</li>
<li>Em monorepos (pnpm/yarn workspaces), use <code>workspace:*</code> para pacotes internos e seja explícito sobre tipos versus runtime.</li>
<li><code>npm install</code> sem flag salva em <code>dependencies</code>. Em CI, sempre prefira <code>npm ci</code> — instala exatamente o lockfile.</li>
</ul>

<h3>Verificando o que vai pra produção</h3>
<pre><code class="language-bash">npm ls --omit=dev               # árvore de produção
npm prune --production          # remove dev de node_modules
npx depcheck                    # acha deps não usadas
npx npm-check-updates           # vê atualizações disponíveis</code></pre>

<div class="callout callout-info"><div class="callout-title">peerDependencies opcionais</div><div>Em libs com integrações plug-and-play (ex.: adapter de Redis para sua lib de cache), declare o pacote em <code>peerDependencies</code> e marque como opcional com <code>peerDependenciesMeta.&lt;pkg&gt;.optional = true</code>. O usuário só instala se quiser usar.</div></div>

<div class="callout callout-warn"><div class="callout-title">Cuidado com bundlephobia</div><div>Toda dependência em <code>dependencies</code> conta para o tamanho final em ambientes serverless. Importe só o que usa, prefira libs pequenas e verifique <code>bundlephobia.com</code> antes de adicionar.</div></div>`}} />
    </article>
  );
}

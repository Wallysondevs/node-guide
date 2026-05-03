import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"process/env · iniciante · 7 min"}),e.jsx("h1",{children:"process.env e .env"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><code>process.env</code> expõe as variáveis de ambiente do processo. É o canal padrão para configuração externa: URLs de banco, secrets, feature flags, modo de execução.</p>

<h2>Conceito</h2>
<p>Variáveis de ambiente são herdadas do processo pai (shell, systemd, Docker) e são <strong>strings</strong>. Prefira-as a arquivos JSON de config porque seguem o <a href="https://12factor.net">12-factor</a> e funcionam igual em qualquer plataforma.</p>
<pre><code class="language-js">process.env.NODE_ENV         // 'production' | 'development' | undefined
process.env.DATABASE_URL
process.env.PORT ?? '3000'   // sempre string

// atribuir converte para string:
process.env.X = 42;
console.log(typeof process.env.X);   // 'string'</code></pre>

<h2>.env nativo (Node 20.6+)</h2>
<pre><code class="language-bash"># .env
PORT=8080
DATABASE_URL=postgres://user:pass@localhost/app
LOG_LEVEL=debug</code></pre>
<pre><code class="language-bash">node --env-file=.env src/index.js
# múltiplos arquivos (último vence)
node --env-file=.env --env-file=.env.local src/index.js</code></pre>

<h2>Validação com Zod no boot</h2>
<pre><code class="language-js">import { z } from 'zod';

const Env = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info')
});

export const env = Env.parse(process.env);
// fail-fast se faltar config — antes de subir o servidor</code></pre>

<div class="callout callout-warn"><div class="callout-title">Fail-fast</div><div>Valide env no startup. Crashar imediatamente é melhor do que subir e quebrar em runtime quando uma variável faltar.</div></div>

<h2>Convenção de nomes</h2>
<ul>
<li><code>UPPER_SNAKE_CASE</code> sempre.</li>
<li>Prefixo por escopo: <code>DB_HOST</code>, <code>DB_USER</code>; <code>SMTP_HOST</code>, <code>SMTP_USER</code>.</li>
<li>URLs completas em vez de partes: <code>DATABASE_URL=postgres://...</code> &gt; <code>DB_HOST + DB_PORT + ...</code>.</li>
</ul>

<h2>.env.example versionado</h2>
<pre><code class="language-bash"># .env.example (commit)
DATABASE_URL=
JWT_SECRET=
PORT=3000

# .gitignore
.env
.env.local
.env.*.local</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Configurar conexões externas sem hardcode.</li>
<li>Distinguir ambientes (NODE_ENV).</li>
<li>Feature flags simples (<code>FEATURE_X=on</code>).</li>
<li>Secrets injetadas pelo orquestrador (k8s Secret, Vault).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Tudo é string — <code>Boolean(process.env.DEBUG)</code> é <code>true</code> mesmo se for <code>'false'</code>. Use <code>=== 'true'</code>.</li>
<li>Não logue <code>process.env</code> em erro — vaza secrets.</li>
<li>NODE_ENV diferente de <code>production</code> faz Express habilitar verbose, e várias libs usam isso. Defina explicitamente.</li>
<li>Variáveis com espaços precisam de aspas no .env: <code>NAME="João"</code>.</li>
<li>Em Windows PowerShell: <code>$env:PORT="8080"; node app.js</code>; em bash: <code>PORT=8080 node app.js</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">dotenv (legado)</div><div>O pacote <code>dotenv</code> ainda é útil em Node &lt;20.6 ou quando você precisa de múltiplos .env (.env.local, .env.development) com lógica de override. Para projetos novos no Node 20+, use <code>--env-file</code>.</div></div>`}})]})}export{i as default};

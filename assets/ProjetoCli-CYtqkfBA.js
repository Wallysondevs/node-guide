import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Projetos · intermediario · 10 min"}),e.jsx("h1",{children:"Projeto: CLI tool"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Construímos um CLI <strong>myctl</strong> com subcomandos, flags, spinner, cores e prompts interativos. Stack: <code>commander</code>, <code>chalk</code>, <code>ora</code>, <code>prompts</code>. Distribuído via <code>npm publish</code> com <code>bin</code>.</p>

<h2>Estrutura</h2>
<pre><code class="language-bash">myctl/
├─ package.json
└─ bin/
   └─ cli.js          # entry com shebang
└─ src/
   ├─ commands/
   │  ├─ hello.js
   │  ├─ fetch.js
   │  └─ init.js
   └─ utils/
      └─ spinner.js</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">npm init -y
npm i commander chalk ora prompts
chmod +x bin/cli.js</code></pre>
<pre><code class="language-json">// package.json (trecho)
{
  "name": "myctl",
  "type": "module",
  "bin": { "myctl": "./bin/cli.js" },
  "files": ["bin", "src"],
  "engines": { "node": "&gt;=18" }
}</code></pre>

<h2>Entry point</h2>
<pre><code class="language-js">#!/usr/bin/env node
// bin/cli.js
import { Command } from 'commander';
import { hello } from '../src/commands/hello.js';
import { fetchCmd } from '../src/commands/fetch.js';
import { init } from '../src/commands/init.js';

const prog = new Command();
prog
  .name('myctl')
  .description('CLI de exemplo')
  .version('1.0.0');

hello(prog);
fetchCmd(prog);
init(prog);

prog.parseAsync().catch((e) =&gt; {
  console.error(e.message);
  process.exit(1);
});</code></pre>

<h2>Comandos</h2>
<pre><code class="language-js">// src/commands/hello.js
import chalk from 'chalk';
export function hello(prog) {
  prog.command('hello &lt;nome&gt;')
    .description('saudação colorida')
    .option('-l, --loud', 'em maiúsculas')
    .option('-c, --color &lt;cor&gt;', 'cor do chalk', 'green')
    .action((nome, opts) =&gt; {
      const msg = 'olá, ' + nome;
      const out = opts.loud ? msg.toUpperCase() : msg;
      console.log(chalk[opts.color] ? chalk[opts.color](out) : out);
    });
}</code></pre>
<pre><code class="language-js">// src/commands/fetch.js
import ora from 'ora';
export function fetchCmd(prog) {
  prog.command('fetch &lt;url&gt;')
    .description('baixa uma URL e mostra status')
    .option('-H, --header &lt;h...&gt;', 'headers extras')
    .action(async (url, opts) =&gt; {
      const sp = ora('GET ' + url).start();
      try {
        const headers = Object.fromEntries((opts.header || []).map(h =&gt; h.split(/:\\s*/)));
        const r = await fetch(url, { headers });
        const len = r.headers.get('content-length') || '?';
        sp.succeed(r.status + ' · ' + len + ' bytes · ' + (r.headers.get('content-type') || ''));
      } catch (e) {
        sp.fail(e.message);
        process.exitCode = 1;
      }
    });
}</code></pre>
<pre><code class="language-js">// src/commands/init.js
import prompts from 'prompts';
import { writeFile, mkdir } from 'node:fs/promises';
export function init(prog) {
  prog.command('init')
    .description('cria projeto interativo')
    .action(async () =&gt; {
      const a = await prompts([
        { type: 'text', name: 'name', message: 'nome do projeto?' },
        { type: 'select', name: 'tpl', message: 'template?', choices: [
          { title: 'api', value: 'api' },
          { title: 'cli', value: 'cli' }
        ]},
        { type: 'confirm', name: 'git', message: 'iniciar git?' }
      ], { onCancel: () =&gt; process.exit(130) });

      await mkdir(a.name, { recursive: true });
      await writeFile(a.name + '/README.md', '# ' + a.name + '\\n\\ntemplate: ' + a.tpl);
      console.log('criado em ./' + a.name);
    });
}</code></pre>

<h2>Como rodar / publicar</h2>
<pre><code class="language-bash"># dev
node bin/cli.js hello mundo --loud --color cyan
npm link                         # instala myctl global apontando ao repo

# publicar
npm version patch
npm publish --access public</code></pre>

<div class="callout callout-info"><div class="callout-title">Shebang e EOL</div><div>A primeira linha precisa ser exatamente <code>#!/usr/bin/env node</code> com LF (não CRLF). No Windows, configure <code>git config core.autocrlf input</code> para evitar quebra.</div></div>

<h2>Boas práticas</h2>
<ul>
  <li><strong>Saída para stderr</strong> em erros; stdout reservado para dados que serão consumidos por pipes.</li>
  <li>Defina <code>process.exitCode</code> em vez de chamar <code>process.exit()</code> direto — permite flush de streams.</li>
  <li>Aceite <code>--json</code> para saída estruturada — útil em scripts.</li>
  <li>Detecte TTY (<code>process.stdout.isTTY</code>) antes de colorir/animar.</li>
  <li>Documente todas as flags no <code>--help</code>; commander gera automaticamente.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Empacote único</div><div>Use <code>esbuild --bundle --platform=node</code> ou <code>pkg</code> para distribuir um binário único sem exigir Node instalado no usuário.</div></div>`}})]})}export{r as default};

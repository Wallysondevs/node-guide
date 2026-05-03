export default function ProjetoCli() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · intermediario · 7 min</div>
      <h1>Projeto: CLI tool</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i commander chalk ora</code></pre><pre><code class="language-js">#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

const prog = new Command();

prog
  .name('myctl')
  .description('CLI exemplo')
  .version('1.0.0');

prog.command('hello &lt;nome&gt;')
  .option('-l, --loud', 'maiúsculas')
  .action((nome, opts) =&gt; {
    const msg = \`olá \${nome}\`;
    console.log(chalk.green(opts.loud ? msg.toUpperCase() : msg));
  });

prog.command('fetch &lt;url&gt;')
  .action(async (url) =&gt; {
    const sp = ora('baixando...').start();
    const r = await fetch(url);
    sp.succeed(\`\${r.status} — \${r.headers.get('content-length')} bytes\`);
  });

prog.parse();</code></pre><pre><code class="language-json">// package.json
"bin": { "myctl": "./bin/cli.js" }</code></pre>`}} />
    </article>
  );
}

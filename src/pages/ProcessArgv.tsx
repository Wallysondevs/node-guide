export default function ProcessArgv() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">process/env · iniciante · 7 min</div>
      <h1>process.argv</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>process.argv</code> é o array com os argumentos passados ao processo Node. É o ponto de entrada para construir CLIs, scripts parametrizados e ferramentas de build.</p>

<h2>Conceito</h2>
<p>O array tem sempre pelo menos dois elementos: o caminho do binário <code>node</code> e o caminho do script executado. Os argumentos do usuário começam no índice 2.</p>
<pre><code class="language-bash">node app.js --port 8080 user</code></pre>
<pre><code class="language-js">process.argv;
// [
//   '/usr/bin/node',
//   '/abs/app.js',
//   '--port',
//   '8080',
//   'user'
// ]
process.argv.slice(2); // ['--port', '8080', 'user']</code></pre>

<h2>Parsing manual (educacional)</h2>
<pre><code class="language-js">const args = process.argv.slice(2);
const port = args[args.indexOf('--port') + 1] ?? '3000';
const verbose = args.includes('--verbose');
console.log({ port, verbose });</code></pre>
<p>Funciona para 2-3 flags, mas vira pesadelo rápido. Use o parser do Node.</p>

<h2>Exemplo prático: parseArgs (Node 18.3+)</h2>
<pre><code class="language-js">import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  options: {
    port:    { type: 'string',  short: 'p', default: '3000' },
    verbose: { type: 'boolean', short: 'v' },
    out:     { type: 'string',  short: 'o' },
    tag:     { type: 'string',  multiple: true }
  },
  allowPositionals: true,
  strict: true
});

console.log(values);      // { port: '8080', verbose: true, tag: ['a','b'] }
console.log(positionals); // ['comando']</code></pre>

<h2>CLI completa com subcomandos</h2>
<pre><code class="language-js">#!/usr/bin/env node
import { parseArgs } from 'node:util';

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === 'build') {
  const { values } = parseArgs({
    args: rest,
    options: { watch: { type: 'boolean' } }
  });
  await build({ watch: values.watch });
} else if (cmd === 'serve') {
  const { values } = parseArgs({
    args: rest,
    options: { port: { type: 'string', default: '3000' } }
  });
  await serve({ port: Number(values.port) });
} else {
  console.log('uso: mycli build|serve [opts]');
  process.exit(1);
}</code></pre>

<div class="callout callout-info"><div class="callout-title">Bibliotecas alternativas</div><div>Para CLIs grandes (subcomandos profundos, help auto-gerado, prompts), considere <strong>commander</strong>, <strong>yargs</strong>, ou <strong>citty</strong>. <code>parseArgs</code> nativo cobre 80% dos casos sem dependência.</div></div>

<h2>Casos de uso</h2>
<ul>
<li>Scripts de migration que aceitam <code>--dry-run</code>.</li>
<li>CLIs internas (gerador de código, deploy, lint).</li>
<li>Workers de background com modo configurável.</li>
<li>Ferramentas devtool publicadas no npm (use <code>"bin"</code> no package.json).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Argumentos sempre chegam como <strong>string</strong>. Converta para number/boolean explicitamente.</li>
<li>Quote argumentos com espaço no shell: <code>--name "João da Silva"</code>.</li>
<li><code>parseArgs</code> com <code>strict: true</code> joga em qualquer flag desconhecida — bom para detectar typos.</li>
<li>Use <code>process.argv0</code> (sem array) para o nome do binário, útil em workers.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Shebang</div><div>Para tornar o script executável direto: comece com <code>#!/usr/bin/env node</code>, dê <code>chmod +x</code> e adicione em <code>"bin"</code> no package.json.</div></div>`}} />
    </article>
  );
}

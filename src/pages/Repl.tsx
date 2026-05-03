export default function Repl() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 6 min</div>
      <h1>REPL e flags úteis</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O <strong>REPL</strong> (Read-Eval-Print Loop) é o prompt interativo do Node. Ótimo para experimentar APIs, depurar regex, inspecionar objetos e prototipar trechos antes de comitá-los a um arquivo.</p>

<h2>Conceito</h2>
<p>Rode <code>node</code> sem argumentos e cai num prompt onde cada linha é avaliada e o resultado impresso. O top-level <code>await</code> funciona desde o Node 16.</p>

<pre><code class="language-bash">$ node
Welcome to Node.js v22.x
&gt; 2 + 2
4
&gt; const fs = require('node:fs')
undefined
&gt; fs.readdirSync('.').length
12
&gt; await fetch('https://api.github.com').then(r =&gt; r.status)
200
&gt; .help</code></pre>

<h3>Comandos do REPL</h3>
<ul>
<li><code>.editor</code> — modo multilinha (Ctrl+D para executar)</li>
<li><code>.load arquivo.js</code> — carrega um arquivo no contexto</li>
<li><code>.save sessao.js</code> — salva o histórico da sessão</li>
<li><code>.break</code> — sai de uma expressão multilinha</li>
<li><code>.exit</code> ou Ctrl+D — encerra</li>
<li><code>_</code> — última expressão avaliada</li>
</ul>

<h2>Flags úteis na CLI</h2>
<ul>
<li><code>--watch</code> — reinicia ao salvar (Node 18.11+).</li>
<li><code>--watch-path=src</code> — observa diretório específico.</li>
<li><code>--env-file=.env</code> — carrega variáveis de um .env (Node 20.6+).</li>
<li><code>--inspect</code> / <code>--inspect-brk</code> — abre debugger via Chrome DevTools.</li>
<li><code>--experimental-strip-types</code> — executa <code>.ts</code> direto (Node 22+).</li>
<li><code>--enable-source-maps</code> — stack traces no código TS original.</li>
<li><code>--max-old-space-size=4096</code> — aumenta heap V8 (em MB).</li>
<li><code>--trace-warnings</code> — mostra stack de avisos (rejections, etc.).</li>
</ul>

<h3>Combinando para dev</h3>
<pre><code class="language-bash">node --watch --env-file=.env --enable-source-maps src/index.js</code></pre>

<h3>Debug interativo</h3>
<pre><code class="language-bash">node --inspect-brk src/server.js
# abra chrome://inspect no Chrome e clique em "inspect"</code></pre>

<h2>Casos de uso do REPL</h2>
<ul>
<li>Testar uma regex contra strings reais antes de colar no código.</li>
<li>Inspecionar a forma de um objeto retornado por uma API.</li>
<li>Validar comportamento de <code>Date</code>, <code>Intl</code> ou parsing de números.</li>
<li>Simular cenários de bug: copie um snippet do app, rode no REPL, ajuste.</li>
<li>Aprender APIs nativas (<code>node:crypto</code>, <code>node:url</code>) sem criar projeto.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">REPL customizado</div><div>Você pode embutir um REPL no seu app para inspecionar o estado em produção (com cuidado!). <code>require('node:repl').start({ prompt: 'app&gt; ' }).context.app = app;</code> e conecte via socket.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><code>let</code> e <code>const</code> redeclarados no REPL antigo davam erro — versões modernas permitem.</li>
<li><code>require</code> existe no REPL mesmo em projetos ESM, porque o REPL roda em modo CJS por padrão.</li>
<li>Variáveis declaradas no REPL não persistem entre execuções; salve com <code>.save</code>.</li>
<li>Em scripts, prefira <code>process.env.NODE_OPTIONS='--enable-source-maps'</code> para aplicar flags sem alterar comandos.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Node 22 e .ts nativo</div><div>Com <code>--experimental-strip-types</code> o Node remove anotações de tipo em runtime e executa o arquivo. Não faz checagem — para isso continua sendo <code>tsc --noEmit</code> no CI.</div></div>`}} />
    </article>
  );
}

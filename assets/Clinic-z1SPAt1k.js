import{j as o}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function l(){return o.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[o.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Performance · intermediario · 7 min"}),o.jsx("h1",{children:"Clinic.js"}),o.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><code>clinic</code> é uma suíte de ferramentas de profiling para Node, mantida pela NearForm. Combina coleta automática de métricas com relatórios HTML interativos: ideal para diagnosticar problemas em produção (lentidão, vazamento, event loop bloqueado) sem inserir código manual.</p>

<h2>Conceito</h2>
<p>Cada subcomando ataca um problema:</p>
<ul>
<li><strong>doctor</strong> — diagnóstico geral. Aponta se o gargalo é CPU, I/O ou event loop.</li>
<li><strong>flame</strong> — flamegraph de CPU.</li>
<li><strong>bubbleprof</strong> — visualiza operações async (promises, callbacks) e onde estão bloqueando.</li>
<li><strong>heapprofiler</strong> — uso de memória ao longo do tempo.</li>
</ul>

<h2>Instalação e uso</h2>
<pre><code class="language-bash">npm i -g clinic
# ou local + npx clinic ...

clinic doctor -- node dist/index.js
clinic flame -- node dist/index.js
clinic bubbleprof -- node dist/index.js
clinic heapprofiler -- node dist/index.js</code></pre>
<p>Em outro terminal, rode load test (ex.: <code>autocannon</code>); volte e dê <code>Ctrl+C</code>. O Clinic abre o relatório no browser.</p>

<h2>Exemplo prático: workflow</h2>
<pre><code class="language-bash"># 1. instala autocannon
npm i -g autocannon

# 2. inicia profiling
clinic doctor -- node dist/index.js
# servidor sobe em :3000

# 3. em outro terminal, gera carga
autocannon -c 100 -d 30 http://localhost:3000/api/users

# 4. Ctrl+C no servidor — Clinic abre relatório HTML</code></pre>

<h2>Interpretando o Doctor</h2>
<ul>
<li><strong>Event loop delay alto</strong> e CPU baixa → I/O síncrono ou microtasks demais.</li>
<li><strong>CPU 100%</strong> sustentado → loop pesado em JS, falta de paralelismo.</li>
<li><strong>Memory crescendo monotonicamente</strong> → leak; siga com <code>heapprofiler</code> + DevTools.</li>
<li><strong>Active handles</strong> não caindo → conexões/timers não fechando (sintoma de shutdown errado).</li>
</ul>

<h2>Casos de uso</h2>
<ul>
<li>Antes de subir um endpoint novo crítico — baseline de performance.</li>
<li>Após relatos de "API ficou lenta sem mudar nada" (regressão).</li>
<li>Investigar memory leak em ambiente de staging.</li>
<li>Comparar duas versões: rode com profiling antes/depois do refactor.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Profile com workload realista — sem carga, o report é inútil.</li>
<li>Não rode em produção real: a instrumentação tem custo. Use staging com tráfego espelhado.</li>
<li>Combine com logs estruturados e <code>--inspect</code> quando precisar zoom.</li>
<li>Mantenha um diretório <code>.clinic/</code> versionado de baselines para comparar.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Alternativas</div><div><code>--prof</code> nativo + <code>0x</code> para flamegraphs; <code>node --inspect</code> + Chrome DevTools para heap snapshots.</div></div>

<div class="callout callout-warn"><div class="callout-title">Overhead</div><div>Profiling pode dobrar latência. Os números absolutos não são representativos; o que importa é o formato do gráfico e onde está o pico.</div></div>`}})]})}export{l as default};

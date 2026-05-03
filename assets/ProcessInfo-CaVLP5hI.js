import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function c(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"process/env · iniciante · 6 min"}),e.jsx("h1",{children:"Memória, PID, CWD"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>O objeto <code>process</code> expõe metadados úteis sobre o processo Node em execução: identificador, diretório, plataforma, versões e uso de recursos. Essencial para logs, diagnóstico e métricas.</p>

<h2>Conceito</h2>
<p>Tudo é síncrono e barato. Você pode ler em qualquer ponto do código sem se preocupar com performance. Use para enriquecer logs e expor métricas no <code>/health</code>.</p>
<pre><code class="language-js">process.pid              // ID do processo no SO
process.ppid             // ID do processo pai
process.cwd()            // working directory atual
process.platform         // 'linux' | 'darwin' | 'win32'
process.arch             // 'x64' | 'arm64'
process.version          // 'v20.11.1'
process.versions         // { node, v8, openssl, uv, zlib, ... }
process.execPath         // caminho do binário node
process.title = 'meu-worker';   // aparece no top/ps</code></pre>

<h2>Memória</h2>
<pre><code class="language-js">const m = process.memoryUsage();
// {
//   rss: 45_678_592,        // memória total alocada pelo SO
//   heapTotal: 12_345_678,  // heap reservado pelo V8
//   heapUsed: 8_901_234,    // heap em uso por objetos JS
//   external: 234_567,      // memória de C++ ligada ao V8 (Buffers)
//   arrayBuffers: 12_345    // ArrayBuffer/SharedArrayBuffer
// }

const mb = (n) =&gt; (n / 1024 / 1024).toFixed(1) + 'MB';
console.log('heap:', mb(m.heapUsed), '/', mb(m.heapTotal));</code></pre>

<h2>CPU e uptime</h2>
<pre><code class="language-js">process.uptime();        // segundos desde o start (float)
process.cpuUsage();      // { user, system } em microssegundos

const start = process.cpuUsage();
// ... trabalho pesado ...
const diff = process.cpuUsage(start);
console.log('cpu user ms:', diff.user / 1000);</code></pre>

<h2>Mudando o ambiente</h2>
<pre><code class="language-js">process.chdir('/tmp');               // muda CWD
process.umask(0o022);                // máscara de permissão de novos arquivos
process.title = 'queue-worker-#3';   // útil em ps/htop com cluster</code></pre>

<h2>Exemplo prático: endpoint de diagnóstico</h2>
<pre><code class="language-js">app.get('/diag', (req, res) =&gt; {
  const m = process.memoryUsage();
  res.json({
    pid: process.pid,
    uptimeSec: Math.floor(process.uptime()),
    node: process.version,
    platform: process.platform + '/' + process.arch,
    rssMB: +(m.rss / 1024 / 1024).toFixed(1),
    heapUsedMB: +(m.heapUsed / 1024 / 1024).toFixed(1)
  });
});</code></pre>

<div class="callout callout-tip"><div class="callout-title">Métricas</div><div>Exporte <code>memoryUsage</code> e <code>cpuUsage</code> a cada 10s para Prometheus/Datadog. É o caminho mais barato para detectar memory leak em produção.</div></div>

<h2>Casos de uso</h2>
<ul>
<li>Enriquecer logs estruturados com <code>pid</code> e <code>uptime</code>.</li>
<li>Endpoint <code>/diag</code> ou <code>/metrics</code> para SRE.</li>
<li>Detectar memory leak comparando <code>heapUsed</code> ao longo do tempo.</li>
<li>Identificar workers no <code>ps aux</code> com <code>process.title</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>memoryUsage</code> não conta memória de processos filhos (worker_threads, child_process).</li>
<li><code>rss</code> é o número que o SO reporta — o que importa para limites de container.</li>
<li>Em Docker, use <code>--max-old-space-size</code> compatível com o limit do container.</li>
<li><code>process.title</code> tem limite de tamanho (geralmente o tamanho original de argv) em alguns SOs.</li>
<li><code>process.cwd()</code> pode mudar se algum código chamar <code>chdir</code> — não confie como caminho do projeto. Use <code>import.meta.dirname</code>.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Limites de heap</div><div>O default do V8 é ~1.7GB em 64-bit. Suba com <code>node --max-old-space-size=4096</code> (em MB). Se você precisa disso, talvez seja hora de streamar dados em vez de carregar tudo em memória.</div></div>`}})]})}export{c as default};

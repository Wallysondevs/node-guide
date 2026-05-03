import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"path/os/url · iniciante · 7 min"}),e.jsx("h1",{children:"Informações do sistema"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p>O módulo <code>node:os</code> expõe metadados do sistema operacional: plataforma, arquitetura, CPUs, memória, usuário, rede. Útil para diagnósticos, ajuste de pools e features condicionais.</p>

        <h2>Conceito</h2>
        <p>Tudo é síncrono e leve — são leituras direto do kernel. Use à vontade em código de boot e métricas; evite em hot path porque algumas chamadas (como <code>cpus()</code>) instanciam objetos novos a cada chamada.</p>

        <h2>Exemplo prático</h2>
        <pre><code class="language-js">import os from 'node:os';

console.log({
  platform: os.platform(),       // 'linux' | 'darwin' | 'win32'
  arch: os.arch(),               // 'x64' | 'arm64'
  release: os.release(),
  uptime: os.uptime(),           // segundos desde boot
  cores: os.cpus().length,       // núcleos lógicos
  totalMem: (os.totalmem() / 1024 ** 3).toFixed(1) + 'GB',
  freeMem: (os.freemem() / 1024 ** 3).toFixed(1) + 'GB',
  hostname: os.hostname(),
  user: os.userInfo().username,
  home: os.homedir(),
  tmp: os.tmpdir(),
  endianness: os.endianness(),   // 'BE' | 'LE'
});</code></pre>

        <h2>Carga e rede</h2>
        <pre><code class="language-js">os.loadavg();                  // [1m, 5m, 15m] — Linux/Mac
os.networkInterfaces();        // por interface, IPs e MAC
os.constants.signals.SIGTERM;  // valor do sinal</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Dimensionar pool de workers: <code>os.cpus().length</code>.</li>
          <li>Decidir caminhos de arquivo por plataforma (<code>'win32'</code> vs Unix).</li>
          <li>Endpoint <code>/health</code> com métricas básicas.</li>
          <li>Logar contexto no startup (versão Node, hostname).</li>
          <li>Detectar contêiner: comparar <code>os.totalmem()</code> com cgroups.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Em containers, <code>os.cpus()</code> retorna CPUs do <em>host</em>, não os limites do cgroup. Use <code>os.availableParallelism()</code> (Node 19+).</li>
          <li><code>os.freemem()</code> em Linux é enganoso — page cache não conta como livre.</li>
          <li><code>os.hostname()</code> pode ser o ID do contêiner, não o servidor real.</li>
          <li><code>os.platform()</code> retorna <code>'darwin'</code> para macOS, não <code>'macos'</code>.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">availableParallelism</div><div>Desde Node 19, prefira <code>os.availableParallelism()</code>: respeita limites de CPU em containers e affinities.</div></div>
        <div class="callout callout-info"><div class="callout-title">Métricas mais ricas</div><div>Para monitoramento sério, use <code>process.resourceUsage()</code>, <code>perf_hooks</code> e exporte para Prometheus/OpenTelemetry.</div></div>
      `}})]})}export{r as default};

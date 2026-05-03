export default function ProcessInfo() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">process/env · iniciante · 4 min</div>
      <h1>Memória, PID, CWD</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">process.pid                  // ID do processo
process.cwd()                // working directory
process.platform             // 'linux'
process.version              // 'v20.11.1'
process.versions             // { node, v8, openssl, ... }
process.memoryUsage()        // { rss, heapTotal, heapUsed, external }
process.uptime()             // segundos
process.cpuUsage()           // { user, system } em microssegundos

process.chdir('/tmp')        // muda CWD
process.title = 'meu-worker' // aparece no top/ps</code></pre>`}} />
    </article>
  );
}

export default function Cluster() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · intermediario · 6 min</div>
      <h1>Cluster</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>cluster</code> forka N processos compartilhando a mesma porta — escala horizontalmente em uma máquina. PM2 e Node nativo suportam.</p><pre><code class="language-js">import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) {
  for (let i = 0; i &lt; os.cpus().length; i++) cluster.fork();
  cluster.on('exit', () =&gt; cluster.fork());
} else {
  startServer();
}</code></pre><p>Cada processo tem heap próprio (não compartilha estado). Use Redis pra estado compartilhado.</p>`}} />
    </article>
  );
}

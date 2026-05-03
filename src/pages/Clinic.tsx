export default function Clinic() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · intermediario · 5 min</div>
      <h1>Clinic.js</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i -g clinic

clinic doctor -- node dist/index.js          # diagnóstico geral
clinic flame -- node dist/index.js           # flamegraph CPU
clinic bubbleprof -- node dist/index.js      # async ops
clinic heapprofiler -- node dist/index.js</code></pre><p>Roda load test, gera relatório HTML interativo. Excelente pra encontrar gargalos de event loop.</p>`}} />
    </article>
  );
}

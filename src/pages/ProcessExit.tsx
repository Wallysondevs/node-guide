export default function ProcessExit() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">process/env · intermediario · 6 min</div>
      <h1>Exit codes e signals</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">process.exit(0)    // sucesso
process.exit(1)    // erro genérico

// graceful shutdown
process.on('SIGINT', async () =&gt; {       // Ctrl+C
  console.log('encerrando...');
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', shutdown);          // docker stop, k8s

process.on('uncaughtException', err =&gt; {
  console.error('FATAL', err);
  process.exit(1);
});

process.on('unhandledRejection', err =&gt; { /* logar */ });</code></pre><div class="callout callout-warn"><div class="callout-title">Não ignore</div><div>Ignorar <code>uncaughtException</code> deixa o processo num estado inconsistente. Logue e saia.</div></div>`}} />
    </article>
  );
}

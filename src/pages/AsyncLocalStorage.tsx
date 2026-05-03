export default function AsyncLocalStorage() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Eventos · avancado · 7 min</div>
      <h1>AsyncLocalStorage</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Permite "carregar" contexto através de chamadas async — equivalente a thread-local em outras linguagens. Ótimo para request-id, tracing, tenant.</p><pre><code class="language-js">import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();

app.use((req, _res, next) =&gt; {
  als.run({ reqId: crypto.randomUUID() }, next);
});

// em qualquer função chamada dentro do request:
function log(msg) {
  const ctx = als.getStore();
  console.log(\`[\${ctx?.reqId}] \${msg}\`);
}</code></pre>`}} />
    </article>
  );
}

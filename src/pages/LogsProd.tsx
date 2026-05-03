export default function LogsProd() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Deploy · intermediario · 5 min</div>
      <h1>Logs estruturados (Pino)</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i pino pino-pretty</code></pre><pre><code class="language-js">import pino from 'pino';

export const log = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' }
    : undefined,
});

log.info({ userId: 42 }, 'login realizado');
log.warn('quase lá');
log.error({ err }, 'falhou');

// child logger por request
const reqLog = log.child({ reqId: crypto.randomUUID() });</code></pre><div class="callout callout-warn"><div class="callout-title">Nunca use console.log em produção</div><div>Sem níveis, sem estrutura, lentíssimo, sem context.</div></div>`}} />
    </article>
  );
}

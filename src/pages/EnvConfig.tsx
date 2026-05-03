export default function EnvConfig() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Deploy · intermediario · 5 min</div>
      <h1>Configuração por env</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// config.js — valida e expõe configs no startup
import { z } from 'zod';

const Env = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url().optional(),
});

export const env = Env.parse(process.env);
// se faltar algo: crash imediato com erro claro</code></pre><p>Validar no startup é crucial — melhor crashar em deploy do que descobrir falta de var em produção.</p>`}} />
    </article>
  );
}

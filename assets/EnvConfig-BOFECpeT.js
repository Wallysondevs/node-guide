import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Deploy · intermediario · 7 min"}),e.jsx("h1",{children:"Configuração por env"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>O princípio do <em>12-factor</em> diz: <strong>config vive no ambiente, não no código</strong>. Em Node isso vira ler <code>process.env</code>, validar no startup e expor um objeto tipado para o resto da aplicação.</p>

<h2>Conceito</h2>
<p>Validação no boot é crítica: melhor crashar imediatamente em deploy do que descobrir, três horas depois em produção, que <code>JWT_SECRET</code> está <code>undefined</code> e todos os tokens estão sendo assinados como string vazia.</p>
<p>Use uma biblioteca de validação (Zod, Valibot, env-var) que faça parse + coerção + mensagens de erro.</p>

<h2>Exemplo prático</h2>
<pre><code class="language-ts">// src/config/env.ts
import 'dotenv/config';
import { z } from 'zod';

const Schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET precisa ter &gt;= 32 chars'),
  JWT_EXPIRES_IN: z.string().default('1h'),

  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  RATE_LIMIT_MAX: z.coerce.number().default(100),
  ENABLE_NEW_CHECKOUT: z.coerce.boolean().default(false),
});

const parsed = Schema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = z.infer&lt;typeof Schema&gt;;</code></pre>

<p>Uso no resto da app — completamente tipado:</p>
<pre><code class="language-ts">import { env } from './config/env';

app.listen(env.PORT, () =&gt; {
  console.log('listening on', env.PORT);   // env.PORT é number
});

const token = jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

if (env.ENABLE_NEW_CHECKOUT) {
  app.use('/checkout', newCheckoutRouter);
}</code></pre>

<p>Em testes, dá para sobrescrever:</p>
<pre><code class="language-bash">DATABASE_URL=postgres://test JWT_SECRET=$(openssl rand -hex 32) npm test</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>URLs de bancos diferentes por ambiente (dev/staging/prod).</li>
<li>Feature flags simples (<code>ENABLE_X</code>).</li>
<li>Limites operacionais (<code>RATE_LIMIT_MAX</code>, <code>POOL_SIZE</code>).</li>
<li>Credenciais de APIs externas.</li>
<li>Toggle de logs verbosos sem deploy.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Falhe rápido</div><div>O <code>process.exit(1)</code> em parse inválido faz o orquestrador (Kubernetes, ECS, Fly) marcar o container como unhealthy. Você descobre o problema no primeiro health check, não na primeira request real.</div></div>

<h2>Boas práticas</h2>
<ul>
<li><strong>Schema único</strong>: centralize em um arquivo. Não leia <code>process.env</code> espalhado.</li>
<li><strong>Tipos derivados</strong>: <code>z.infer</code> garante autocomplete em todo lugar.</li>
<li><strong>Coerção explícita</strong>: <code>z.coerce.number()</code> e <code>boolean()</code> — sem isso, &quot;3000&quot; é string e &quot;false&quot; é truthy.</li>
<li><strong>Defaults sensatos</strong>: assuma valores de dev quando faltar (mas exija segredos críticos).</li>
<li><strong>Documente</strong>: mantenha <code>.env.example</code> alinhado com o schema.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Cuidado com logs</div><div>Nunca logue o objeto <code>env</code> inteiro — segredos vão aparecer no console e no agregador de logs. Logue só chaves não sensíveis ou um diff redacted.</div></div>`}})]})}export{t as default};

import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"process/env · iniciante · 6 min"}),e.jsx("h1",{children:"Múltiplos .env"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Arquivos <code>.env</code> carregam variáveis de ambiente para <code>process.env</code> em desenvolvimento local. Em produção, os valores vêm do orquestrador (PaaS, k8s secrets, GitHub Actions). O pacote <code>dotenv</code> cuida do carregamento; Node 20+ tem suporte nativo via <code>--env-file</code>.</p>

<h2>Conceito</h2>
<p>A convenção é ter múltiplos arquivos por ambiente: <code>.env</code> (default), <code>.env.local</code> (overrides locais, fora do git), <code>.env.development</code>, <code>.env.test</code>, <code>.env.production</code>. A ordem de carregamento define a precedência: o <strong>primeiro</strong> a setar uma chave geralmente vence.</p>

<h2>Exemplo prático</h2>
<p>Com o pacote <code>dotenv</code>:</p>
<pre><code class="language-bash">npm i dotenv</code></pre>
<pre><code class="language-js">// Carregamento simples — .env do CWD
import 'dotenv/config';

// Carregamento manual com cascata (precedência: local &gt; ambiente &gt; default)
import dotenv from 'dotenv';

const env = process.env.NODE_ENV ?? 'development';

dotenv.config({ path: '.env.' + env + '.local' });
dotenv.config({ path: '.env.' + env });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// dotenv não sobrescreve por padrão — útil para a cascata acima
console.log(process.env.DATABASE_URL);</code></pre>

<p>Com Node 20+ nativo (sem dependência):</p>
<pre><code class="language-bash">node --env-file=.env --env-file=.env.local src/index.js</code></pre>

<p>Padrão recomendado: validar tudo no startup com Zod e expor um <code>env</code> tipado:</p>
<pre><code class="language-ts">// src/env.ts
import 'dotenv/config';
import { z } from 'zod';

const Schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const env = Schema.parse(process.env);</code></pre>

<p>Arquivo <code>.env.example</code> (commitado) serve como contrato:</p>
<pre><code class="language-bash"># .env.example
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/app
JWT_SECRET=troque-isso-por-32-chars-no-minimo</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Configurar URLs de banco, Redis, APIs externas em dev.</li>
<li>Manter segredos fora do código (chaves de API, tokens de teste).</li>
<li>Sobrescrever defaults para um desenvolvedor específico (<code>.env.local</code>).</li>
<li>Em scripts de teste E2E, usando <code>.env.test</code>.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Segredos no git, NUNCA</div><div>Adicione <code>.env</code> e <code>.env.*.local</code> ao <code>.gitignore</code>. Commit apenas <code>.env.example</code> com valores fictícios. Se vazou, <strong>rotacione tudo</strong> imediatamente.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Em produção</strong> não use <code>.env</code>: configure variáveis no PaaS/secrets manager.</li>
<li><strong>Carregar em qualquer lugar</strong>: <code>dotenv</code> tem que rodar antes de qualquer <code>import</code> que leia <code>process.env</code>. Use <code>-r dotenv/config</code> ou top do entrypoint.</li>
<li><strong>Aspas e espaços</strong>: <code>FOO=bar baz</code> precisa ser <code>FOO=&quot;bar baz&quot;</code>.</li>
<li><strong>Strings sempre</strong>: tudo em <code>process.env</code> é string. Use <code>z.coerce.number()</code>/<code>boolean()</code> ao validar.</li>
<li><strong>Override perigoso</strong>: por padrão <code>dotenv</code> não sobrescreve vars já setadas — bom para CI, surpresa em local.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">dotenv-vault e equivalentes</div><div>Para times distribuídos, considere <code>dotenv-vault</code>, <code>doppler</code> ou <code>1Password CLI</code> em vez de compartilhar <code>.env</code> por Slack.</div></div>`}})]})}export{r as default};

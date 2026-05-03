import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Performance · intermediario · 8 min"}),e.jsx("h1",{children:"Caching: in-memory e Redis"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Cachear evita repetir trabalho caro: query lenta, chamada externa, render de template. As duas camadas mais comuns em Node são <strong>in-memory</strong> (rápido, local ao processo) e <strong>Redis</strong> (compartilhado, persistente).</p>

<h2>Conceito</h2>
<p>Cache implica três decisões: <em>chave</em> (única e estável), <em>TTL</em> (quanto tempo vive) e <em>invalidação</em> (quando descartar antes do TTL). O padrão mais simples é <strong>cache-aside</strong>: leia do cache; se faltar, busque na fonte e popule.</p>

<h2>LRU em memória</h2>
<pre><code class="language-bash">npm i lru-cache</code></pre>
<pre><code class="language-js">import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
  max: 1000,           // capacidade
  ttl: 60_000,         // 60s
  updateAgeOnGet: false,
});

cache.set('user:42', user);
cache.get('user:42');
cache.delete('user:42');
cache.clear();</code></pre>

<h2>Exemplo prático: cache-aside com Redis</h2>
<pre><code class="language-js">import { Redis } from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export async function getUser(id) {
  const key = \`user:\${id}\`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const user = await db.user.findById(id);
  if (user) {
    await redis.set(key, JSON.stringify(user), 'EX', 300);   // 5 min
  }
  return user;
}

export async function updateUser(id, patch) {
  const u = await db.user.update(id, patch);
  await redis.del(\`user:\${id}\`);   // invalidação
  return u;
}</code></pre>

<h2>Stale-while-revalidate</h2>
<p>Devolve valor antigo imediatamente e revalida em background — UX melhor.</p>
<pre><code class="language-js">async function swr(key, fetcher, ttl = 60) {
  const v = await redis.get(key);
  if (v) {
    queueMicrotask(async () =&gt; {
      const fresh = await fetcher();
      await redis.set(key, JSON.stringify(fresh), 'EX', ttl);
    });
    return JSON.parse(v);
  }
  const fresh = await fetcher();
  await redis.set(key, JSON.stringify(fresh), 'EX', ttl);
  return fresh;
}</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Resultados de queries leitura-pesadas (top N, agregações).</li>
<li>Respostas de APIs externas com rate limit.</li>
<li>Sessões e tokens de curta duração.</li>
<li>Resultados de funções puras caras (parsing, render).</li>
<li>Renderização SSR/HTML por rota+params.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Cache stampede</strong>: TTL expira e mil requests batem na fonte simultaneamente. Use lock (single-flight) ou jitter no TTL.</li>
<li>Cache em memória + multi-instância = inconsistência. Use Redis ou aceite o trade-off.</li>
<li>Esqueça invalidação em <em>updates/deletes</em> e você verá dados velhos eternamente.</li>
<li>Não cacheie dados sensíveis sem cuidado (PII, tokens) — Redis em texto puro vaza fácil.</li>
<li>Sempre defina TTL — cache infinito vira leak.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Cache-Control HTTP</div><div>O melhor cache é o que nem chega no servidor. Configure <code>Cache-Control</code> e <code>ETag</code> em respostas estáveis.</div></div>

<div class="callout callout-warn"><div class="callout-title">Negative caching</div><div>Cachear "não encontrado" evita repetir 404s caros. Mas TTL curto, senão dados novos ficam invisíveis.</div></div>`}})]})}export{r as default};

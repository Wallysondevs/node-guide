export default function Caching() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Performance · intermediario · 6 min</div>
      <h1>Caching: in-memory e Redis</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// LRU em memória
import { LRUCache } from 'lru-cache';

const cache = new LRUCache({ max: 1000, ttl: 60_000 });
cache.set('key', value);
cache.get('key');

// padrão cache-aside
async function getUser(id) {
  const key = \`user:\${id}\`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const u = await db.user.find(id);
  await redis.set(key, JSON.stringify(u), 'EX', 300);
  return u;
}</code></pre>`}} />
    </article>
  );
}

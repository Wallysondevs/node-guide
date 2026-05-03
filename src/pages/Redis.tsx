export default function Redis() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 6 min</div>
      <h1>Redis com ioredis</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i ioredis</code></pre><pre><code class="language-js">import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// strings
await redis.set('user:42', JSON.stringify(user), 'EX', 3600);
const raw = await redis.get('user:42');

// counter
await redis.incr('hits');

// pub/sub
const sub = new Redis();
sub.subscribe('news');
sub.on('message', (ch, msg) =&gt; console.log(ch, msg));
await redis.publish('news', 'hello');

// pipeline (batch)
const r = await redis.pipeline()
  .set('a', 1)
  .incr('b')
  .exec();</code></pre>`}} />
    </article>
  );
}

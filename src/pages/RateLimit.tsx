export default function RateLimit() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">API design · intermediario · 5 min</div>
      <h1>Rate limiting</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i express-rate-limit rate-limit-redis</code></pre><pre><code class="language-js">import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,    // 15 min
  max: 100,                      // 100 req por IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// rate-limit específico
const loginLimiter = rateLimit({ windowMs: 60_000, max: 5 });
app.post('/login', loginLimiter, login);</code></pre>`}} />
    </article>
  );
}

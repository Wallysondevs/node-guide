export default function ExpressSessions() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 6 min</div>
      <h1>Sessions e cookies</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i express-session connect-redis ioredis</code></pre><pre><code class="language-js">import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

app.use(session({
  store: new RedisStore({ client: new Redis() }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 86400_000 },
}));

app.post('/login', (req, res) =&gt; {
  req.session.userId = user.id;
  res.json({ ok: true });
});</code></pre>`}} />
    </article>
  );
}

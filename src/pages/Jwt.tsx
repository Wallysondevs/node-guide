export default function Jwt() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 7 min</div>
      <h1>JWT (JSON Web Tokens)</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i jsonwebtoken
npm i -D @types/jsonwebtoken</code></pre><pre><code class="language-js">import jwt from 'jsonwebtoken';

// sign
const token = jwt.sign(
  { sub: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m', issuer: 'meu-app' }
);

// verify (middleware)
function auth(req, res, next) {
  const h = req.headers.authorization?.replace('Bearer ', '');
  if (!h) return res.sendStatus(401);
  try {
    req.user = jwt.verify(h, process.env.JWT_SECRET);
    next();
  } catch { res.sendStatus(401); }
}</code></pre><div class="callout callout-tip"><div class="callout-title">Refresh tokens</div><div>Access token curto (15min) + refresh token longo (7d) armazenado server-side. Renovação sem novo login.</div></div>`}} />
    </article>
  );
}

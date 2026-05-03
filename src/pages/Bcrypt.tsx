export default function Bcrypt() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 5 min</div>
      <h1>Senhas com bcrypt</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i bcrypt</code></pre><pre><code class="language-js">import bcrypt from 'bcrypt';

const hash = await bcrypt.hash('senha123', 12);   // cost factor 12
await db.users.create({ email, password: hash });

// login
const user = await db.users.findByEmail(email);
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.sendStatus(401);</code></pre><div class="callout callout-warn"><div class="callout-title">Nunca armazene senhas em plaintext</div><div>E nunca use MD5/SHA1. Use bcrypt, argon2 ou scrypt.</div></div>`}} />
    </article>
  );
}

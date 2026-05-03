export default function Passport() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 5 min</div>
      <h1>Passport.js</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Passport é um middleware de auth com mais de <strong>500 estratégias</strong>: Google, GitHub, Facebook, LDAP, JWT, local...</p><pre><code class="language-js">// estratégia local (email + senha)
import { Strategy as Local } from 'passport-local';

passport.use(new Local({ usernameField: 'email' }, async (email, pass, done) =&gt; {
  const u = await db.user.findByEmail(email);
  if (!u || !await bcrypt.compare(pass, u.password)) {
    return done(null, false, { message: 'invalid' });
  }
  done(null, u);
}));

passport.serializeUser((u, cb) =&gt; cb(null, u.id));
passport.deserializeUser(async (id, cb) =&gt; cb(null, await db.user.find(id)));</code></pre>`}} />
    </article>
  );
}

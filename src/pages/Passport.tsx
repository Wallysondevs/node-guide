export default function Passport() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 8 min</div>
      <h1>Passport.js</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Passport é o middleware de autenticação mais usado do ecossistema Node/Express. Ele padroniza um conceito chamado <strong>strategy</strong>, com mais de 500 implementações prontas (local, JWT, Google, GitHub, OAuth2, SAML, LDAP...). Isso permite trocar o provedor sem reescrever a camada de auth.</p>

<h2>Conceito</h2>
<p>Passport tem três responsabilidades: <strong>(1)</strong> autenticar uma request via uma <em>strategy</em>, <strong>(2)</strong> serializar o usuário na sessão (quando há sessão), <strong>(3)</strong> deserializar a cada request. Cada strategy é um pacote npm independente.</p>
<pre><code class="language-bash">npm i passport passport-local passport-jwt express-session bcrypt</code></pre>

<h2>Exemplo prático: estratégia local</h2>
<pre><code class="language-js">import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as Local } from 'passport-local';
import bcrypt from 'bcrypt';

passport.use(new Local({ usernameField: 'email' }, async (email, pass, done) =&gt; {
  try {
    const u = await db.user.findByEmail(email);
    if (!u) return done(null, false, { message: 'invalid credentials' });
    const ok = await bcrypt.compare(pass, u.passwordHash);
    if (!ok) return done(null, false, { message: 'invalid credentials' });
    return done(null, u);
  } catch (err) { return done(err); }
}));

passport.serializeUser((u, cb) =&gt; cb(null, u.id));
passport.deserializeUser(async (id, cb) =&gt; {
  try { cb(null, await db.user.find(id)); } catch (e) { cb(e); }
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) =&gt; {
  res.redirect('/dashboard');
});

app.get('/me', (req, res) =&gt; {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  res.json(req.user);
});</code></pre>

<h2>Estratégia JWT (APIs stateless)</h2>
<pre><code class="language-js">import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, async (payload, done) =&gt; {
  const u = await db.user.find(payload.sub);
  return u ? done(null, u) : done(null, false);
}));

app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) =&gt; {
  res.json(req.user);
});</code></pre>

<div class="callout callout-info"><div class="callout-title">Sessão x stateless</div><div>Use <code>passport.session()</code> apenas para apps web com cookie. Para APIs REST/mobile, use JWT com <code>session: false</code> e descarte <code>express-session</code>.</div></div>

<h2>OAuth com Google</h2>
<pre><code class="language-js">import { Strategy as Google } from 'passport-google-oauth20';

passport.use(new Google({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
}, async (_accessToken, _refreshToken, profile, done) =&gt; {
  const u = await db.user.upsertByGoogleId(profile.id, profile.emails[0].value);
  done(null, u);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) =&gt; res.redirect('/dashboard'));</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Apps Express com múltiplos provedores (local + social login).</li>
<li>Migração entre provedores sem mudar handlers.</li>
<li>Necessidade de SAML/LDAP corporativo.</li>
<li>Reuso de strategies da comunidade já testadas.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Ordem de middleware:</strong> <code>session()</code> sempre antes de <code>passport.session()</code>.</li>
<li><strong>serializeUser</strong> deve guardar só o ID, não o objeto inteiro — sessões inflam rápido.</li>
<li>Em JWT, lembre <code>session: false</code> para não tentar tocar a sessão inexistente.</li>
<li><code>req.user</code> só existe após autenticação bem-sucedida; sempre cheque <code>req.isAuthenticated()</code>.</li>
<li>Strategies abandonadas existem (último publish &gt; 4 anos) — verifique manutenção antes de adotar.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Cuidado com cookies</div><div>Em produção, use <code>cookie: { secure: true, httpOnly: true, sameSite: 'lax' }</code> e configure <code>trust proxy</code> se estiver atrás de load balancer.</div></div>`}} />
    </article>
  );
}

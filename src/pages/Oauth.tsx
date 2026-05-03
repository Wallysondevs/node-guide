export default function Oauth() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 9 min</div>
      <h1>OAuth 2.0 com Google</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>OAuth 2.0 é o protocolo padrão para login social e autorização delegada. Você redireciona o usuário ao provedor (Google, GitHub, ...), ele autoriza, e seu app recebe um <strong>access token</strong> para chamar APIs em nome dele.</p>

        <h2>Conceito</h2>
        <p>O fluxo recomendado para web tradicional é o <strong>Authorization Code Flow</strong> (com PKCE para SPAs/mobile):</p>
        <ul>
          <li>Seu app redireciona para <code>/authorize</code> do provedor.</li>
          <li>Usuário autentica e consente os <strong>scopes</strong>.</li>
          <li>Provedor redireciona de volta com um <code>code</code> efêmero.</li>
          <li>Backend troca o <code>code</code> por <code>access_token</code> (e opcionalmente <code>refresh_token</code>).</li>
        </ul>

        <h2>Exemplo prático com Passport</h2>
        <pre><code class="language-bash">npm i passport passport-google-oauth20 express-session</code></pre>
        <pre><code class="language-js">import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

passport.use(new Strategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
}, async (access, refresh, profile, done) =&gt; {
  try {
    const u = await findOrCreate({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    });
    done(null, u);
  } catch (e) { done(e); }
}));

passport.serializeUser((u, cb) =&gt; cb(null, u.id));
passport.deserializeUser(async (id, cb) =&gt; cb(null, await findById(id)));

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) =&gt; res.redirect('/'));

app.get('/me', (req, res) =&gt; {
  if (!req.user) return res.status(401).end();
  res.json(req.user);
});</code></pre>

        <h2>Sem Passport (puro)</h2>
        <pre><code class="language-js">// Recebe ?code=... no callback e troca por token
const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: 'https://app.com/auth/google/callback',
    grant_type: 'authorization_code',
  }),
});
const { access_token, id_token } = await tokenRes.json();</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Login social ("Continue com Google").</li>
          <li>Integração com APIs do provedor (Calendar, Drive, GitHub repos).</li>
          <li>SSO corporativo via Workspace, Microsoft 365.</li>
          <li>Apps mobile/SPA usando Authorization Code + PKCE.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Sempre valide o <code>state</code> para evitar CSRF no redirect.</li>
          <li>Para SPAs, use PKCE — nunca embute <code>client_secret</code> no front.</li>
          <li><code>redirect_uri</code> deve bater <em>exatamente</em> com o cadastrado no provedor.</li>
          <li>Refresh tokens precisam ser guardados criptografados.</li>
          <li>Scopes excessivos espantam o usuário e exigem revisão da Google.</li>
        </ul>

        <div class="callout callout-info"><div class="callout-title">OpenID Connect</div><div>OIDC é uma camada de identidade sobre OAuth 2.0. Se quer só login, peça scope <code>openid</code> e use o <code>id_token</code> (JWT) — mais simples que chamar <code>/userinfo</code>.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Não reinvente</div><div>Para multi-provider, considere <strong>Auth.js</strong>, <strong>Clerk</strong>, <strong>WorkOS</strong> ou <strong>Keycloak</strong>. Roll-your-own auth é a fonte número 1 de bugs de segurança.</div></div>
      `}} />
    </article>
  );
}

export default function Oauth() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 7 min</div>
      <h1>OAuth 2.0 com Google</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i passport passport-google-oauth20</code></pre><pre><code class="language-js">import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

passport.use(new Strategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
}, async (access, refresh, profile, done) =&gt; {
  const u = await findOrCreate({
    googleId: profile.id,
    email: profile.emails[0].value,
  });
  done(null, u);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) =&gt; res.redirect('/'));</code></pre>`}} />
    </article>
  );
}

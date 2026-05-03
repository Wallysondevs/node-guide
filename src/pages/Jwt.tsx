export default function Jwt() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 9 min</div>
      <h1>JWT (JSON Web Tokens)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>JWT é um formato compacto de token: header + payload + signature, base64url. O servidor assina; qualquer parte com a chave pública verifica sem consultar banco. Bom para auth stateless em APIs e microsserviços.</p>

<h2>Conceito</h2>
<p>Estrutura: <code>xxxxx.yyyyy.zzzzz</code>. O payload contém claims (<code>sub</code>, <code>iat</code>, <code>exp</code>, <code>iss</code>, custom). O <strong>payload não é criptografado</strong>, só assinado — qualquer pessoa lê. Nunca coloque senha ou dado sensível.</p>
<pre><code class="language-bash">npm i jsonwebtoken
npm i -D @types/jsonwebtoken</code></pre>

<h2>Sign &amp; verify</h2>
<pre><code class="language-js">import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { sub: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m', issuer: 'meu-app', audience: 'web' }
);

// no middleware
function auth(req, res, next) {
  const h = req.headers.authorization?.replace('Bearer ', '');
  if (!h) return res.sendStatus(401);
  try {
    req.user = jwt.verify(h, process.env.JWT_SECRET, {
      issuer: 'meu-app',
      audience: 'web',
      algorithms: ['HS256'],   // !!! sempre fixe o algoritmo
    });
    next();
  } catch (err) {
    res.sendStatus(err.name === 'TokenExpiredError' ? 401 : 403);
  }
}</code></pre>

<h2>Refresh tokens</h2>
<p>Access tokens devem ser curtos (5-15min). Para evitar logins constantes, emita também um <strong>refresh token</strong> longo (7-30d), armazenado server-side (banco) e enviado em cookie HttpOnly. Quando access expira, frontend chama <code>/refresh</code>.</p>
<pre><code class="language-js">app.post('/login', async (req, res) =&gt; {
  const user = await authenticate(req.body);
  const access = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '15m' });
  const refresh = randomBytes(64).toString('hex');
  await db.insert(refreshTokens).values({ token: refresh, userId: user.id, exp: Date.now() + 7*24*3600*1000 });
  res.cookie('rt', refresh, { httpOnly: true, secure: true, sameSite: 'lax' });
  res.json({ access });
});

app.post('/refresh', async (req, res) =&gt; {
  const rt = req.cookies.rt;
  const row = await db.query.refreshTokens.findFirst({ where: eq(rt) });
  if (!row || row.exp &lt; Date.now()) return res.sendStatus(401);
  // rotaciona: emite novo refresh e invalida o antigo
  await db.delete(refreshTokens).where(eq(rt));
  const newRt = randomBytes(64).toString('hex');
  await db.insert(refreshTokens).values({ token: newRt, userId: row.userId, exp: Date.now() + 7*24*3600*1000 });
  res.cookie('rt', newRt, cookieOpts);
  res.json({ access: jwt.sign({ sub: row.userId }, SECRET, { expiresIn: '15m' }) });
});</code></pre>

<h2>RS256 vs HS256</h2>
<ul>
<li><strong>HS256</strong> (HMAC + secret): mesmo segredo assina e verifica. Bom para um app só.</li>
<li><strong>RS256</strong> (RSA): chave privada assina, pública verifica. Use quando vários serviços verificam (auth server emite, APIs validam).</li>
<li>JWKS (<code>/.well-known/jwks.json</code>) expõe chaves públicas — base do OIDC.</li>
</ul>

<h2>Casos de uso</h2>
<ul>
<li>Auth stateless em microsserviços (cada serviço valida sem chamar auth).</li>
<li>SSO via OIDC (Auth0, Keycloak emitem JWT).</li>
<li>Tokens de email (reset de senha, verificação) com expiração.</li>
<li>Service-to-service auth com client credentials.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>algorithm: 'none'</strong> — bug histórico. Sempre passe <code>algorithms: ['HS256']</code> no verify.</li>
<li>Não dá pra "deslogar" um JWT sem manter blacklist. Por isso access curto + refresh.</li>
<li>Payload visível: nada de PII.</li>
<li>Tamanho cresce rápido — JWT em cookie pode estourar 4KB.</li>
<li>Clock skew entre serviços pode invalidar tokens válidos. Use <code>clockTolerance</code>.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não armazene em localStorage</div><div>JS no browser leria — XSS rouba. Use cookie HttpOnly + Secure + SameSite, ou memória do app (perde no reload, mas mais seguro).</div></div>

<div class="callout callout-tip"><div class="callout-title">Em sessões com cookie, JWT é overkill</div><div>Sessão server-side com sid opaco em cookie é mais simples e mais seguro. JWT brilha quando você precisa de stateless.</div></div>`}} />
    </article>
  );
}

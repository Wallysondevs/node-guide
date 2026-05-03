import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Auth · intermediario · 8 min"}),e.jsx("h1",{children:"Helmet, CSRF, secure cookies"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Três camadas de defesa para apps com sessão por cookie: <strong>Helmet</strong> seta headers de segurança, <strong>CSRF tokens</strong> impedem POST forjados de outros sites, e <strong>cookies seguros</strong> evitam roubo de sessão por XSS ou redes inseguras.</p>

<h2>Helmet: headers em uma linha</h2>
<p>Helmet adiciona ~15 headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, etc). Tudo opt-out — o default é seguro.</p>
<pre><code class="language-bash">npm i helmet</code></pre>
<pre><code class="language-js">import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // remova unsafe-inline assim que possível
      imgSrc: ["'self'", 'data:', 'https://cdn.exemplo.com'],
    },
  },
  hsts: { maxAge: 31_536_000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: 'no-referrer' },
}));</code></pre>

<h2>CSRF: por que e quando</h2>
<p>CSRF (Cross-Site Request Forgery) ataca apps que confiam só em cookie para autenticar. Outro site faz <code>fetch('https://seubanco.com/transfer', { credentials: 'include' })</code> e o browser anexa o cookie.</p>
<ul>
<li><strong>API com Bearer token</strong> (Authorization header): não precisa de CSRF — token não vai automaticamente.</li>
<li><strong>App com cookie de sessão</strong>: precisa CSRF token em forms e mutações.</li>
<li><strong>SameSite=Lax/Strict</strong> bloqueia a maioria dos ataques modernos, mas defesa em profundidade ainda recomenda token.</li>
</ul>

<h2>CSRF token (double-submit)</h2>
<pre><code class="language-bash">npm i csrf-csrf</code></pre>
<pre><code class="language-js">import { doubleCsrf } from 'csrf-csrf';

const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () =&gt; process.env.CSRF_SECRET,
  cookieName: '__Host-psifi.x-csrf-token',
  cookieOptions: { sameSite: 'lax', secure: true, httpOnly: true },
});

app.get('/csrf', (req, res) =&gt; res.json({ token: generateToken(req, res) }));
app.use(doubleCsrfProtection);

app.post('/transfer', (req, res) =&gt; { /* só roda com token válido */ });</code></pre>

<h2>Cookies seguros: o checklist</h2>
<pre><code class="language-js">res.cookie('sid', token, {
  httpOnly: true,        // JS no browser não lê → defesa contra XSS
  secure: true,          // só envia sob HTTPS
  sameSite: 'lax',       // 'strict' é mais seguro mas quebra OAuth
  maxAge: 86_400_000,    // 24h
  path: '/',
  domain: undefined,     // não setar a menos que precise compartilhar com subdomínios
});</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>App tradicional com formulário HTML e sessão por cookie.</li>
<li>SPA + API mesmo domínio com cookie de sessão (precisa CSRF).</li>
<li>API pura com Bearer token (Helmet sim, CSRF não).</li>
<li>Endpoints de webhook: desabilite CSRF nessas rotas (sem origem de browser).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>csurf</code> está deprecated. Use <code>csrf-csrf</code> ou <code>@fastify/csrf-protection</code>.</li>
<li>CSP com <code>'unsafe-inline'</code> mata o benefício. Migre para nonces.</li>
<li>HSTS com <code>preload</code> em domínio errado pode deixar HTTPS obrigatório por meses — teste antes.</li>
<li>Atrás de proxy (nginx, Cloudflare), <code>app.set('trust proxy', 1)</code> para <code>secure</code> funcionar.</li>
<li>SameSite=Strict quebra fluxos cross-site comuns (link de e-mail abrindo logado).</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">XSS quebra tudo</div><div>Se você tem XSS, nem HttpOnly nem CSRF salvam. Sanitize entrada, use CSP e valide saída.</div></div>

<div class="callout callout-tip"><div class="callout-title">Prefixos de cookie</div><div><code>__Host-</code> exige Secure, Path=/ e sem Domain. <code>__Secure-</code> exige Secure. Browsers rejeitam variantes inseguras.</div></div>`}})]})}export{t as default};

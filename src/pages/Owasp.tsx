export default function Owasp() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · intermediario · 10 min</div>
      <h1>OWASP Top 10 em Node</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>O <strong>OWASP Top 10</strong> é a lista mais usada de riscos de segurança em aplicações web. Aqui está como cada item se manifesta — e se evita — em Node.</p>

        <h2>1. Broken Access Control</h2>
        <p>Endpoint que confia no <code>req.params.id</code> sem checar se o usuário pode acessar.</p>
        <pre><code class="language-js">// errado
app.get('/orders/:id', (req, res) =&gt; db.orders.find(req.params.id));
// certo
app.get('/orders/:id', auth, async (req, res) =&gt; {
  const o = await db.orders.find(req.params.id);
  if (o.userId !== req.user.id) return res.status(403).end();
  res.json(o);
});</code></pre>

        <h2>2. Cryptographic Failures</h2>
        <ul>
          <li>Sempre HTTPS (TLS 1.2+).</li>
          <li>Senhas: <code>bcrypt</code>/<code>argon2</code>, nunca SHA/MD5.</li>
          <li>Não armazene tokens em texto plano.</li>
        </ul>

        <h2>3. Injection</h2>
        <pre><code class="language-js">// SQL — sempre parametrize
await pool.query('select * from users where email = ?', [email]);
// Mongo — não passe operadores direto do client
const safe = { email: String(req.body.email) };
await db.users.findOne(safe);
// Comando shell — use array, nunca string
import { execFile } from 'node:child_process';
execFile('git', ['log', '--', file]);</code></pre>

        <h2>4. Insecure Design</h2>
        <p>Threat modeling antes de codar; não confie em controles do front.</p>

        <h2>5. Security Misconfiguration</h2>
        <ul>
          <li><code>helmet()</code> no Express para headers de segurança.</li>
          <li>CORS estrito por origem.</li>
          <li>Não exponha <code>x-powered-by</code>.</li>
          <li>Mensagens de erro sem stacktrace em prod.</li>
        </ul>

        <h2>6. Vulnerable &amp; Outdated Components</h2>
        <pre><code class="language-bash">npm audit --omit=dev --audit-level=high
npx snyk test</code></pre>
        <p>Configure <strong>Dependabot</strong>/<strong>Renovate</strong>.</p>

        <h2>7. Identification &amp; Authentication Failures</h2>
        <ul>
          <li>Rate limit em <code>/login</code> e <code>/forgot-password</code>.</li>
          <li>Tokens com expiração curta + refresh rotacionado.</li>
          <li>2FA em contas privilegiadas.</li>
        </ul>

        <h2>8. Software &amp; Data Integrity Failures</h2>
        <p>Nunca <code>JSON.parse</code> sem validar; nunca <code>eval</code>; verifique assinaturas de webhooks.</p>
        <pre><code class="language-js">import crypto from 'node:crypto';
const sig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
if (sig !== req.headers['x-signature']) return res.status(401).end();</code></pre>

        <h2>9. Security Logging &amp; Monitoring Failures</h2>
        <ul>
          <li>Logue eventos de auth (sucesso, falha, lockout).</li>
          <li>Não logue senhas, tokens, PII.</li>
          <li>Alarme em picos de 401/403.</li>
        </ul>

        <h2>10. Server-Side Request Forgery (SSRF)</h2>
        <pre><code class="language-js">// nunca: fetch(req.body.url)
// valide host contra allowlist
const allowed = new Set(['api.parceiro.com']);
const u = new URL(req.body.url);
if (!allowed.has(u.hostname)) return res.status(400).end();</code></pre>

        <h2>Boas práticas gerais</h2>
        <ul>
          <li>Nunca retorne hash de senha, mesmo "só pro admin".</li>
          <li>Schema-validate <em>tudo</em> que vem do client (Zod).</li>
          <li>Princípio do menor privilégio em DB e cloud.</li>
          <li>Faça pentests anuais.</li>
        </ul>

        <div class="callout callout-warn"><div class="callout-title">Defaults inseguros</div><div>Express CORS aberto, sessions sem <code>httpOnly</code>/<code>secure</code>, JWT sem <code>exp</code> — todos defaults perigosos. Sempre revise.</div></div>
        <div class="callout callout-tip"><div class="callout-title">Cheatsheets</div><div>OWASP mantém <em>cheatsheets</em> específicos para Node, JWT, REST, GraphQL — leitura obrigatória.</div></div>
      `}} />
    </article>
  );
}

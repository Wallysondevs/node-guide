import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Segurança · intermediario · 8 min"}),e.jsx("h1",{children:"CSRF"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p><strong>CSRF</strong> (Cross-Site Request Forgery) é o ataque em que um site malicioso induz o navegador da vítima a enviar um request autenticado para o seu domínio. Como o navegador anexa cookies automaticamente, a request parece legítima do ponto de vista do servidor.</p>

<h2>Conceito</h2>
<p>O ataque só funciona quando: (1) sua sessão usa cookies enviados automaticamente, (2) o endpoint causa uma mudança de estado (POST/PUT/DELETE) e (3) você não exige um segredo que o atacante não tenha como obter.</p>
<p>Defesas modernas, em ordem de simplicidade:</p>
<ul>
<li><strong>SameSite=Lax/Strict</strong> em cookies — bloqueia envio cross-site para POST. Default no Chrome moderno.</li>
<li><strong>Bearer token</strong> em header <code>Authorization</code> — imune por design (atacante não consegue setar headers cross-origin sem CORS).</li>
<li><strong>Token CSRF</strong> (synchronizer token / double-submit cookie) — para forms tradicionais com sessão por cookie.</li>
</ul>

<h2>Exemplo prático</h2>
<p>Usando o pacote <code>csrf-csrf</code> (sucessor moderno do antigo <code>csurf</code>):</p>
<pre><code class="language-js">import express from 'express';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';

const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () =&gt; process.env.CSRF_SECRET,
  cookieName: '__Host-psifi.x-csrf-token',
  cookieOptions: { sameSite: 'lax', secure: true, httpOnly: true },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

app.get('/form', (req, res) =&gt; {
  const token = generateToken(req, res);
  res.send(\`&lt;form method="POST" action="/transfer"&gt;
    &lt;input type="hidden" name="_csrf" value="\${token}"&gt;
    &lt;input name="amount"&gt;
    &lt;button&gt;Enviar&lt;/button&gt;
  &lt;/form&gt;\`);
});

app.post('/transfer', doubleCsrfProtection, (req, res) =&gt; {
  res.send('OK: ' + req.body.amount);
});</code></pre>

<p>Configurando cookies de sessão de forma defensiva:</p>
<pre><code class="language-js">app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',   // ou 'strict' se não há fluxo cross-site
    secure: true,
    maxAge: 1000 * 60 * 60 * 8,
  },
}));</code></pre>

<h2>Quando usar cada defesa</h2>
<ul>
<li><strong>API JSON com Bearer token</strong>: nada extra — Bearer já protege.</li>
<li><strong>SPA + cookies de sessão</strong>: token CSRF + SameSite=Lax.</li>
<li><strong>Forms HTML clássicos</strong>: token CSRF é obrigatório.</li>
<li><strong>Endpoints públicos sem autenticação</strong>: CSRF é irrelevante (não há sessão a roubar).</li>
<li><strong>Webhooks</strong>: validar assinatura HMAC, não CSRF.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">SameSite não é tudo</div><div>Browsers antigos e ataques baseados em subdomínios maliciosos burlam SameSite. Combine com token CSRF em fluxos sensíveis (transferência, mudança de senha).</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>GET que muda estado</strong> é ataque garantido — todo write deve ser POST/PUT/DELETE.</li>
<li><strong>csurf está deprecado</strong>: use <code>csrf-csrf</code> ou <code>@fastify/csrf-protection</code>.</li>
<li><strong>SPA com fetch</strong>: leia o token de um endpoint <code>/csrf</code> e mande no header <code>x-csrf-token</code>.</li>
<li><strong>CORS liberal</strong> + cookies = CSRF aberto. Limite <code>Access-Control-Allow-Origin</code>.</li>
<li><strong>Subdomínios</strong>: cookies em <code>.meusite.com</code> são acessíveis a qualquer subdomínio — risco se um deles é comprometido.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Prefira Bearer</div><div>Em arquiteturas novas (SPA + API), use JWT/opaco em <code>Authorization: Bearer</code>. Elimina toda a classe de ataques CSRF.</div></div>`}})]})}export{a as default};

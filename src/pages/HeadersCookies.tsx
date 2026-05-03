export default function HeadersCookies() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · intermediario · 7 min</div>
      <h1>Headers e cookies</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Headers carregam metadados de cada request/response: tipo de conteúdo, cache, autenticação, idioma. Cookies são pares chave/valor enviados via header <code>Cookie</code> e setados via <code>Set-Cookie</code>. Dominar isso é pré-requisito para auth, sessões, CORS e cache.</p>

<h2>Conceito</h2>
<p>No servidor HTTP nativo, headers de request vêm em <code>req.headers</code> (lowercased). Para responder, use <code>res.setHeader</code> antes de <code>res.writeHead</code>/<code>end</code>. Múltiplos cookies precisam de array em <code>Set-Cookie</code>.</p>
<pre><code class="language-js">// servidor
res.setHeader('Cache-Control', 'public, max-age=3600');
res.setHeader('Content-Type', 'application/json; charset=utf-8');
res.setHeader('Set-Cookie', [
  'sid=abc123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400',
  'theme=dark; Path=/; Max-Age=31536000',
]);

// leitura
req.headers['user-agent'];
req.headers.cookie;          // 'sid=abc123; theme=dark'
req.headers['x-forwarded-for'];</code></pre>

<h2>Parsing seguro de cookies</h2>
<pre><code class="language-js">function parseCookies(str = '') {
  return Object.fromEntries(
    str.split(';')
       .map(p =&gt; p.trim())
       .filter(Boolean)
       .map(p =&gt; {
         const i = p.indexOf('=');
         const k = decodeURIComponent(p.slice(0, i).trim());
         const v = decodeURIComponent(p.slice(i + 1).trim());
         return [k, v];
       })
  );
}

const cookies = parseCookies(req.headers.cookie);</code></pre>

<h2>Atributos de Set-Cookie que importam</h2>
<ul>
<li><strong>HttpOnly</strong>: JS no browser não lê — protege de XSS roubando sessão.</li>
<li><strong>Secure</strong>: só envia sob HTTPS.</li>
<li><strong>SameSite</strong>: <code>Lax</code> (padrão moderno), <code>Strict</code> (mais rígido), <code>None</code> (exige Secure; cross-site).</li>
<li><strong>Path</strong>: escopo do cookie. <code>/</code> = todo o site.</li>
<li><strong>Domain</strong>: subdomínios. Sem ele, fica preso ao host atual.</li>
<li><strong>Max-Age</strong> / <strong>Expires</strong>: validade. Sem nenhum, é cookie de sessão (some ao fechar o browser).</li>
</ul>

<h2>Exemplo prático: login simples</h2>
<pre><code class="language-js">import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';

const sessions = new Map();

createServer((req, res) =&gt; {
  if (req.url === '/login' &amp;&amp; req.method === 'POST') {
    const sid = randomUUID();
    sessions.set(sid, { user: 'ana', at: Date.now() });
    res.setHeader('Set-Cookie',
      \\\`sid=\\\${sid}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400\\\`);
    return res.end('ok');
  }

  const cookies = parseCookies(req.headers.cookie);
  const session = cookies.sid &amp;&amp; sessions.get(cookies.sid);
  if (!session) { res.statusCode = 401; return res.end('unauth'); }

  res.end('hello ' + session.user);
}).listen(3000);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Sessão de usuário (sid HttpOnly).</li>
<li>Preferências (tema, idioma) — sem HttpOnly, leitura via JS.</li>
<li>CSRF token de double-submit.</li>
<li>Tracking básico (consent banners primeiro!).</li>
<li>Cache control fino com <code>ETag</code> e <code>Last-Modified</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Headers são case-insensitive na spec, mas <code>req.headers</code> sempre vem lowercased.</li>
<li><code>setHeader</code> após <code>writeHead</code> ou após <code>write</code> lança erro.</li>
<li>Tamanho de cookie limitado (~4KB por cookie, ~50 por domínio).</li>
<li>Sem <code>Secure</code>, o cookie vaza em qualquer redirect HTTP.</li>
<li>Atrás de proxy, use <code>X-Forwarded-Proto</code>/<code>For</code> e configure <code>trust proxy</code>.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">SameSite=None exige Secure</div><div>Browsers modernos rejeitam <code>SameSite=None</code> sem <code>Secure</code>. Em local dev, use <code>Lax</code>.</div></div>

<div class="callout callout-tip"><div class="callout-title">Em Express, use cookie-parser</div><div>O módulo <code>cookie</code> (npm) faz parse/serialize com escape correto. Não invente seu próprio em produção.</div></div>`}} />
    </article>
  );
}

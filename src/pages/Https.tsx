export default function Https() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · intermediario · 7 min</div>
      <h1>HTTPS e certificados</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>HTTPS é HTTP sobre TLS. Em produção, normalmente você termina TLS no proxy (nginx, Caddy, Cloudflare, ALB) e o Node escuta HTTP plano internamente. Para dev local, mTLS, ou quando o serviço é exposto direto, você precisa configurar TLS no Node.</p>

<h2>Conceito</h2>
<p>O módulo <code>node:https</code> tem a mesma API de <code>node:http</code>, mas exige <code>key</code> + <code>cert</code> no setup. As chaves vêm em PEM. O processo costuma ser: gerar par de chaves (RSA ou ECDSA), criar CSR, obter cert assinado por uma CA (Let's Encrypt) ou auto-assinado para dev.</p>
<pre><code class="language-js">import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const server = createServer({
  key:  readFileSync('key.pem'),
  cert: readFileSync('cert.pem'),
  // ca: readFileSync('chain.pem'), // intermediários
}, (req, res) =&gt; res.end('seguro'));

server.listen(443);</code></pre>

<h2>Cert auto-assinado para dev</h2>
<pre><code class="language-bash">openssl req -x509 -newkey rsa:4096 -nodes \\
  -keyout key.pem -out cert.pem -days 365 \\
  -subj "/CN=localhost"

# ou usando mkcert (recomendado — instala CA local no SO)
mkcert -install
mkcert localhost 127.0.0.1 ::1</code></pre>

<h2>Let's Encrypt em produção (sem proxy)</h2>
<p>Use <code>greenlock-express</code> ou <code>acme-client</code> para auto-renovar certs do Let's Encrypt. Mas considere: nginx + certbot é menos código.</p>

<h2>Cliente: validando certs custom</h2>
<pre><code class="language-js">import { Agent, request } from 'node:undici';
import { readFileSync } from 'node:fs';

const dispatcher = new Agent({
  connect: { ca: readFileSync('corporate-ca.pem') },
});

const res = await fetch('https://internal/api', { dispatcher });</code></pre>

<h2>mTLS (mutual TLS)</h2>
<pre><code class="language-js">createServer({
  key,
  cert,
  ca: readFileSync('client-ca.pem'),
  requestCert: true,
  rejectUnauthorized: true,  // recusa clientes sem cert válido
}, handler).listen(8443);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Dev local com cert válido (mkcert).</li>
<li>Backend exposto direto sem proxy (raro).</li>
<li>Comunicação service-to-service em redes não confiáveis.</li>
<li>mTLS para B2B APIs (substituição de OAuth em alguns casos).</li>
<li>Ambientes air-gapped com CA interna.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Certs expiram. Sem renovação automática você acorda com pager 🚨.</li>
<li>Cadeia de certificado incompleta passa em curl mas falha em alguns clients (Java, mobile). Inclua intermediários em <code>cert</code> ou <code>ca</code>.</li>
<li>HSTS com <code>preload</code> aplicado errado tranca usuários em HTTPS quebrado.</li>
<li>TLS 1.0/1.1 estão deprecated. Force <code>minVersion: 'TLSv1.2'</code>.</li>
<li>Hot reload de cert exige recriar o server ou usar <code>secureContext</code> + <code>setSecureContext</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Em produção, termine TLS no proxy</div><div>Nginx/Caddy/Cloudflare fazem isso melhor: OCSP stapling, sessões, ALPN, renovação automática. Node fica só com HTTP plano.</div></div>

<div class="callout callout-warn"><div class="callout-title">rejectUnauthorized=false só em dev</div><div>Desativar validação de cert no cliente abre brecha para MITM. Em produção, importe a CA correta.</div></div>`}} />
    </article>
  );
}

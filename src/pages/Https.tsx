export default function Https() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · intermediario · 5 min</div>
      <h1>HTTPS e certificados</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const server = createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem'),
}, (req, res) =&gt; res.end('seguro'));

server.listen(443);</code></pre><div class="callout callout-tip"><div class="callout-title">Em produção</div><div>Termine TLS num proxy reverso (Nginx, Caddy, Cloudflare) e fale HTTP plano com seu Node. Mais simples e mais rápido.</div></div>`}} />
    </article>
  );
}

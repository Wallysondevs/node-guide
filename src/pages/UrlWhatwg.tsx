export default function UrlWhatwg() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · iniciante · 8 min</div>
      <h1>URL e querystring</h1>
      <div dangerouslySetInnerHTML={{__html: `
<p>A API <strong>WHATWG URL</strong> (a mesma do browser) é o jeito moderno de manipular URLs em Node. Substitui o legado <code>url.parse</code>, é mais segura e padronizada.</p>

<h2>Conceito</h2>
<p><code>new URL(input, base?)</code> faz parse, valida e expõe partes via getters/setters. Lança <code>TypeError</code> se a URL é inválida — diferente do legado, que voltava <code>null</code> em alguns campos.</p>

<pre><code class="language-js">const u = new URL('https://user:pass@api.com:8443/v1/users?id=42&amp;tag=node#top');

u.protocol      // 'https:'
u.username      // 'user'
u.password      // 'pass'
u.host          // 'api.com:8443'
u.hostname      // 'api.com'
u.port          // '8443'
u.pathname      // '/v1/users'
u.search        // '?id=42&amp;tag=node'
u.searchParams  // URLSearchParams
u.hash          // '#top'
u.origin        // 'https://api.com:8443'</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// resolver URL relativa contra uma base (HTTP redirects, links)
const next = new URL('/v2/list', 'https://api.com/v1/x');
next.toString();  // 'https://api.com/v2/list'

// montar query
const url = new URL('https://api.com/search');
url.searchParams.set('q', 'node');
url.searchParams.append('tag', 'js');
url.searchParams.append('tag', 'ts');
console.log(url.toString());
// https://api.com/search?q=node&amp;tag=js&amp;tag=ts

// validar input do usuário
function isHttpUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}</code></pre>

<h3>file:// e caminhos</h3>
<pre><code class="language-js">import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const url = pathToFileURL('/etc/hosts');  // file:///etc/hosts</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Validar URLs vindas de input ou config.</li>
<li>Resolver redirects e links relativos em scrapers.</li>
<li>Construir URLs de API com query dinâmica.</li>
<li>Converter <code>import.meta.url</code> em path para ler arquivos vizinhos.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>new URL('foo.com')</code> falha — sem protocolo não é absoluta. Use base ou prefixe <code>https://</code>.</li>
<li><code>url.host</code> inclui porta; <code>hostname</code> não.</li>
<li>Mudar <code>pathname</code> não mexe em <code>search</code> nem <code>hash</code>.</li>
<li>Use <code>URL</code> em vez de concatenar strings — você ganha encoding correto de graça.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não use url.parse</div><div>O módulo legado é deprecated e tem comportamentos surpresa com auth/host. Sempre <code>new URL()</code>.</div></div>

<div class="callout callout-tip"><div class="callout-title">SSRF</div><div>Ao receber URLs de usuários, valide protocolo, hostname e bloqueie IPs internos antes de fazer fetch.</div></div>
`}} />
    </article>
  );
}

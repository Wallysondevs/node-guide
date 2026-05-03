import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"path/os/url · iniciante · 7 min"}),e.jsx("h1",{children:"URLSearchParams"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p><code>URLSearchParams</code> é a forma padrão (mesma do browser) de criar, ler e modificar query strings. Substitui o módulo legado <code>querystring</code> e cuida de encoding automaticamente.</p>

<h2>Conceito</h2>
<p>É um objeto iterável que mantém pares chave/valor — sempre como string. Aceita repetição de chaves, faz <code>encodeURIComponent</code> sozinho e tem método <code>toString()</code> que devolve a query pronta.</p>

<pre><code class="language-js">const params = new URLSearchParams({ q: 'node js', page: 2 });
params.toString();   // 'q=node+js&amp;page=2'</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-js">// criar
const p = new URLSearchParams();
p.set('q', 'node');
p.append('tag', 'js');
p.append('tag', 'ts');

// ler
p.get('tag');        // 'js'  (primeiro)
p.getAll('tag');     // ['js', 'ts']
p.has('q');          // true
p.delete('q');

// iterar
for (const [k, v] of p) console.log(k, v);

// integrar com URL
const url = new URL('https://api.com/search');
url.searchParams.set('q', 'olá mundo');
url.searchParams.append('lang', 'pt');
console.log(url.toString());
// https://api.com/search?q=ol%C3%A1+mundo&amp;lang=pt</code></pre>

<h3>Parsing de uma query existente</h3>
<pre><code class="language-js">const qs = new URLSearchParams('a=1&amp;a=2&amp;b=3');
qs.getAll('a');   // ['1', '2']
qs.get('b');      // '3'

// converter para objeto simples (perde duplicatas)
const obj = Object.fromEntries(qs);</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Montar URLs de API com filtros dinâmicos.</li>
<li>Ler <code>req.url</code> num servidor HTTP nativo.</li>
<li>Construir bodies <code>application/x-www-form-urlencoded</code> para <code>fetch</code>.</li>
<li>Serializar paginação/ordenação no front e back.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Tudo é string — números viram <code>'2'</code> ao serializar.</li>
<li><code>set</code> remove duplicatas; <code>append</code> mantém.</li>
<li>Espaços viram <code>+</code> (não <code>%20</code>) por padrão — funciona, mas confunde quem espera RFC 3986.</li>
<li>Não existe <code>nested objects</code> nativo (<code>{a: {b: 1}}</code>); precisa convencionar (<code>a[b]=1</code>) ou usar <code>qs</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Form-encoded body</div><div><code>fetch(url, {{ method: 'POST', body: new URLSearchParams({{ a: 1 }}) }})</code> já manda com o content-type correto.</div></div>
`}})]})}export{s as default};

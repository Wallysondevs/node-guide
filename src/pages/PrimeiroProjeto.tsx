export default function PrimeiroProjeto() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 10 min</div>
      <h1>Primeiro projeto</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Vamos criar um servidor HTTP mínimo, sem dependências externas. Só Node puro. O objetivo é entender a estrutura básica de um projeto antes de adicionar Express/Fastify.</p>

<h2>Conceito</h2>
<p>Todo projeto Node começa com um <code>package.json</code>. Nele declaramos nome, versão, scripts (atalhos para comandos), dependências e o tipo de módulos (<code>commonjs</code> ou <code>module</code>). A partir do Node 14+, recomenda-se <code>"type": "module"</code> para usar <code>import/export</code>.</p>

<h2>Estrutura de pastas</h2>
<pre><code class="language-bash">hello-node/
├── package.json
├── .gitignore
└── src/
    └── index.js</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">mkdir hello-node &amp;&amp; cd hello-node
npm init -y
# edite package.json e adicione: "type": "module"
mkdir src
echo "node_modules" &gt; .gitignore</code></pre>

<h2>Servidor HTTP</h2>
<pre><code class="language-js">// src/index.js
import { createServer } from 'node:http';

const server = createServer((req, res) =&gt; {
  console.log(req.method, req.url);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ msg: 'olá node!' }));
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () =&gt; {
  console.log('servidor em http://localhost:' + PORT);
});</code></pre>

<h2>Scripts no package.json</h2>
<pre><code class="language-json">{
  "name": "hello-node",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev":   "node --watch src/index.js",
    "start": "node src/index.js"
  }
}</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">npm run dev
# Em outro terminal:
curl http://localhost:3000/
curl http://localhost:3000/health
curl -i http://localhost:3000/desconhecido</code></pre>

<div class="callout callout-info"><div class="callout-title">--watch</div><div>A flag <code>--watch</code> (Node 18.11+) reinicia o processo automaticamente quando arquivos mudam. Substitui o <code>nodemon</code> para casos simples.</div></div>

<h2>Lendo body de um POST</h2>
<pre><code class="language-js">if (req.method === 'POST' &amp;&amp; req.url === '/echo') {
  let body = '';
  req.on('data', chunk =&gt; body += chunk);
  req.on('end', () =&gt; {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ recebido: body }));
  });
  return;
}</code></pre>

<h2>Quando usar HTTP cru</h2>
<ul>
<li>Endpoints triviais (healthcheck, redirect).</li>
<li>Aprendizado: entender o que um framework faz por baixo.</li>
<li>Performance extrema sem overhead de roteador.</li>
<li>Microsserviço com 1-2 rotas.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Sem framework, parsing de JSON, query string e roteamento ficam por sua conta — vira boilerplate rápido.</li>
<li>Esqueça <code>res.end()</code> e a request fica pendurada até timeout do cliente.</li>
<li><code>req.on('data')</code> recebe <code>Buffer</code>; concatene como string só se souber a encoding.</li>
<li>Erros não tratados em handlers derrubam o processo — adicione <code>try/catch</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Próximos passos</div><div>Esse é o "hello world" cru. Em projetos reais você usa <strong>Express</strong> ou <strong>Fastify</strong> para roteamento, middleware, parsing de body e validação.</div></div>`}} />
    </article>
  );
}

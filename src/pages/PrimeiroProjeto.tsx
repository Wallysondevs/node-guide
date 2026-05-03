export default function PrimeiroProjeto() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 8 min</div>
      <h1>Primeiro projeto</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Vamos criar um servidor HTTP mínimo. Sem dependências, só Node puro.</p><pre><code class="language-bash">mkdir hello-node &amp;&amp; cd hello-node
npm init -y
echo '{"type":"module"}' &gt; package.json   # ou edite manual</code></pre><pre><code class="language-js">// src/index.js
import { createServer } from 'node:http';

const server = createServer((req, res) =&gt; {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ msg: 'olá node!', url: req.url }));
});

server.listen(3000, () =&gt; {
  console.log('http://localhost:3000');
});</code></pre><pre><code class="language-bash">node --watch src/index.js
# Em outro terminal:
curl http://localhost:3000/</code></pre><div class="callout callout-info"><div class="callout-title">Próximos passos</div><div>Esse é o "hello world" cru. Em projetos reais você usa Express ou Fastify para roteamento, middleware e parsing de body.</div></div>`}} />
    </article>
  );
}

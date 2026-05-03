export default function HttpServer() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · intermediario · 7 min</div>
      <h1>Servidor HTTP cru</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { createServer } from 'node:http';

const server = createServer((req, res) =&gt; {
  if (req.method === 'GET' &amp;&amp; req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('hello');
    return;
  }
  res.writeHead(404).end('not found');
});

server.listen(3000);</code></pre><h2>Lendo body</h2><pre><code class="language-js">let body = '';
req.setEncoding('utf8');
req.on('data', chunk =&gt; body += chunk);
req.on('end', () =&gt; {
  const data = JSON.parse(body);
  res.end('ok');
});

// versão moderna
const chunks = [];
for await (const chunk of req) chunks.push(chunk);
const body = Buffer.concat(chunks).toString('utf8');</code></pre>`}} />
    </article>
  );
}

export default function Http2() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · avancado · 5 min</div>
      <h1>HTTP/2</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>HTTP/2 multiplexa streams numa única conexão TCP. Útil para APIs com muitas requests pequenas.</p><pre><code class="language-js">import { createSecureServer } from 'node:http2';

const server = createSecureServer({ key, cert });

server.on('stream', (stream, headers) =&gt; {
  stream.respond({ ':status': 200, 'content-type': 'text/plain' });
  stream.end('ola http/2');
});

server.listen(8443);</code></pre>`}} />
    </article>
  );
}

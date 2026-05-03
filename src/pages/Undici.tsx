export default function Undici() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">HTTP nativo · avancado · 5 min</div>
      <h1>Undici: client moderno</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Undici é o HTTP client por trás do <code>fetch</code> nativo. Use diretamente para performance máxima e features avançadas.</p><pre><code class="language-js">import { request, Agent } from 'undici';

const { statusCode, body } = await request('https://api.com');
const data = await body.json();

// agent com pool
const agent = new Agent({ connections: 100, pipelining: 10 });
await request(url, { dispatcher: agent });</code></pre>`}} />
    </article>
  );
}

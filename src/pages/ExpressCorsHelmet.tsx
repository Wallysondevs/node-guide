export default function ExpressCorsHelmet() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · intermediario · 5 min</div>
      <h1>CORS, helmet, compression</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i cors helmet compression</code></pre><pre><code class="language-js">import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

app.use(helmet());                                          // headers de segurança
app.use(cors({ origin: ['https://meusite.com'] }));         // CORS
app.use(compression());                                     // gzip/brotli</code></pre>`}} />
    </article>
  );
}

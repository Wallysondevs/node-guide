export default function Dotenv() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">process/env · iniciante · 4 min</div>
      <h1>Múltiplos .env</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i dotenv</code></pre><pre><code class="language-js">import 'dotenv/config';   // carrega .env do CWD

// ou manualmente
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });   // não sobrescreve</code></pre><div class="callout callout-warn"><div class="callout-title">Segredos no git</div><div>Adicione <code>.env</code> ao <code>.gitignore</code> sempre. Commit apenas <code>.env.example</code>.</div></div>`}} />
    </article>
  );
}

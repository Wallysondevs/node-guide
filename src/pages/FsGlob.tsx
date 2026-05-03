export default function FsGlob() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · intermediario · 5 min</div>
      <h1>Glob e walk</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Node 22 trouxe <code>glob</code> nativo. Antes disso, use a lib <code>fast-glob</code>.</p><pre><code class="language-js">import { glob } from 'node:fs/promises';

for await (const file of glob('src/**/*.{ts,tsx}')) {
  console.log(file);
}</code></pre><pre><code class="language-js">// fast-glob (qualquer versão)
import fg from 'fast-glob';
const files = await fg(['src/**/*.ts', '!**/*.test.ts']);</code></pre>`}} />
    </article>
  );
}

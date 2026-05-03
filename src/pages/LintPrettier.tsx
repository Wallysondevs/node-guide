export default function LintPrettier() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · iniciante · 5 min</div>
      <h1>ESLint e Prettier</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i -D eslint @eslint/js typescript-eslint prettier</code></pre><pre><code class="language-js">// eslint.config.js
import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  { rules: { 'no-console': 'warn' } }
];</code></pre><pre><code class="language-json">// .prettierrc
{ "singleQuote": true, "semi": true, "printWidth": 100 }</code></pre>`}} />
    </article>
  );
}

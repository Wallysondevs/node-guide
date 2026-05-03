export default function LintPrettier() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · iniciante · 7 min</div>
      <h1>ESLint e Prettier</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><strong>ESLint</strong> pega bugs e impõe convenções (variável não usada, await em loop, comparação errada). <strong>Prettier</strong> formata o código (espaços, quebras, aspas). Juntos, padronizam o estilo do time e eliminam discussão em PR.</p>

<h2>Setup moderno (flat config)</h2>
<pre><code class="language-bash">npm i -D eslint @eslint/js typescript-eslint prettier eslint-config-prettier</code></pre>
<pre><code class="language-js">// eslint.config.js (flat config — ESLint 9+)
import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
    },
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  prettier, // sempre por último — desliga regras de formatação
];</code></pre>

<h2>Prettier</h2>
<pre><code class="language-json">// .prettierrc
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "trailingComma": "all",
  "arrowParens": "always"
}</code></pre>
<pre><code class="language-bash">// .prettierignore
dist
build
coverage
*.md</code></pre>

<h2>Scripts no package.json</h2>
<pre><code class="language-json">{
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}</code></pre>

<h2>Pre-commit com husky + lint-staged</h2>
<pre><code class="language-bash">npm i -D husky lint-staged
npx husky init
echo "npx lint-staged" &gt; .husky/pre-commit</code></pre>
<pre><code class="language-json">// package.json
"lint-staged": {
  "*.{ts,tsx,js}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml}": ["prettier --write"]
}</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Manter consistência em time (zero PRs sobre formatação).</li>
<li>Pegar bugs cedo: <code>no-floating-promises</code>, <code>no-misused-promises</code>.</li>
<li>Forçar regras de arquitetura (<code>import/no-cycle</code>).</li>
<li>CI gate: <code>lint &amp;&amp; test &amp;&amp; build</code>.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>typescript-eslint</code> com <code>recommendedTypeChecked</code> exige <code>parserOptions.project</code> e fica lento. Para projetos grandes, considere <code>recommended</code> (sem type info).</li>
<li>Esqueceu <code>eslint-config-prettier</code> no fim → conflito de regras.</li>
<li><code>--fix</code> não corrige tudo (só regras com fixer). Outras precisam de refator manual.</li>
<li>Mudança de regra em projeto grande gera PR gigante. Faça por diretório.</li>
<li>Husky em monorepo precisa de root específico — veja docs.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Editor &gt; CLI</div><div>Configure VS Code para rodar ESLint+Prettier ao salvar (<code>editor.formatOnSave</code>, <code>source.fixAll.eslint</code>). Time corrige enquanto digita.</div></div>

<div class="callout callout-info"><div class="callout-title">Biome é alternativa</div><div>Biome unifica linter+formatter em um binário Rust ultra-rápido. API ainda em evolução, mas vale acompanhar.</div></div>`}} />
    </article>
  );
}

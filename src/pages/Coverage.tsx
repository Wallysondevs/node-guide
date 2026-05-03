export default function Coverage() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 5 min</div>
      <h1>Coverage e CI</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash"># vitest
npx vitest run --coverage

# node:test
node --test --experimental-test-coverage

# jest
jest --coverage</code></pre><p>Targets razoáveis: 70-80% de cobertura. <strong>Não persiga 100%</strong> — diminuish returns. Foque em fluxos críticos: auth, pagamento, integrações.</p><pre><code class="language-yaml"># .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm test
      - run: npm run typecheck</code></pre>`}} />
    </article>
  );
}

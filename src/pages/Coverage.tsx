export default function Coverage() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 8 min</div>
      <h1>Coverage e CI</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Cobertura de testes responde uma pergunta: <strong>quais linhas/branches do código foram exercitadas pelos testes?</strong>. É um sinal — não uma meta sagrada. Use para encontrar áreas críticas sem teste, não para perseguir 100%.</p>

<h2>Conceito</h2>
<p>As ferramentas medem quatro métricas: <strong>statements</strong>, <strong>branches</strong>, <strong>functions</strong> e <strong>lines</strong>. O instrumentador (V8 nativo, c8, istanbul) injeta contadores que registram execuções e gera relatórios em texto, HTML e <code>lcov</code> (consumido por SonarQube, Codecov, etc).</p>

<h2>Exemplo prático</h2>
<p>Rodando coverage com cada runner popular:</p>
<pre><code class="language-bash"># Vitest (V8 ou istanbul)
npx vitest run --coverage

# node:test (Node 20+) — usa V8 coverage
node --test --experimental-test-coverage

# Jest
npx jest --coverage

# c8 wrapper (qualquer runner)
npx c8 --reporter=text --reporter=lcov node --test</code></pre>

<p>Configurando thresholds no Vitest:</p>
<pre><code class="language-ts">// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/types/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
});</code></pre>

<h2>Pipeline em CI</h2>
<pre><code class="language-yaml"># .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Detectar arquivos sem nenhum teste (cobertura 0%).</li>
<li>Comparar PRs: a mudança baixou a cobertura geral?</li>
<li>Mapear branches não testados em código de auth/pagamento.</li>
<li>Bloquear merge se a cobertura cair abaixo do threshold.</li>
<li>Gerar HTML para inspeção visual em refactors grandes.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Targets razoáveis</div><div>70-80% de linhas/branches é um ponto saudável para projetos típicos. Bibliotecas e código de pagamento merecem mais; CRUD trivial não compensa.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>100% não significa &quot;sem bugs&quot;</strong>: testes que só executam o código sem asserções inflam a métrica.</li>
<li><strong>V8 vs istanbul</strong>: V8 é mais rápido mas tem granularidade um pouco diferente em branches.</li>
<li><strong>Arquivos sem teste não aparecem</strong> a menos que você configure <code>include</code> explícito.</li>
<li><strong>Source maps</strong>: rode contra fontes (TS) usando o provider correto, senão o relatório aponta o JS compilado.</li>
<li><strong>Flaky tests</strong> com cobertura inflam falsos positivos no PR — estabilize antes de exigir threshold.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Foco em fluxos críticos</div><div>Em vez de subir &quot;cobertura geral&quot;, escolha 3-5 fluxos críticos (login, checkout, webhook) e exija &gt;90% só nesses arquivos via <code>thresholds.perFile</code>.</div></div>`}} />
    </article>
  );
}

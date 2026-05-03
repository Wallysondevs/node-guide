export default function Vitest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 10 min</div>
      <h1>Vitest</h1>
      <div dangerouslySetInnerHTML={{__html: `
<p><strong>Vitest</strong> é um test runner moderno com TS nativo via Vite, API praticamente idêntica ao Jest, watch mode rápido e UI opcional. É a escolha padrão para projetos Node/TS novos em 2024+.</p>

<h2>Conceito</h2>
<p>Vitest reusa o pipeline do Vite: transforma TS/ESM sob demanda, faz HMR de testes e roda em paralelo por padrão. Compatível com a maior parte do ecossistema Jest (<code>jest.fn</code> -&gt; <code>vi.fn</code>, <code>jest.mock</code> -&gt; <code>vi.mock</code>).</p>

<pre><code class="language-bash">npm i -D vitest
# opcional
npm i -D @vitest/coverage-v8 @vitest/ui</code></pre>

<pre><code class="language-ts">// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    coverage: { provider: 'v8', reporter: ['text', 'lcov'] },
    include: ['src/**/*.test.ts'],
  },
});</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-ts">// src/math.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { soma, fetchUser } from './math';

describe('math', () =&gt; {
  beforeEach(() =&gt; { vi.useFakeTimers(); });
  afterEach(() =&gt; { vi.useRealTimers(); });

  it('soma', () =&gt; {
    expect(soma(2, 2)).toBe(4);
  });

  it('mock', () =&gt; {
    const fn = vi.fn().mockReturnValue(42);
    expect(fn()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('async com resolves', async () =&gt; {
    await expect(fetchUser(1)).resolves.toEqual({ id: 1 });
  });

  it('snapshot', () =&gt; {
    expect({ a: 1, b: [2, 3] }).toMatchInlineSnapshot();
  });
});</code></pre>

<h3>Mock de módulo</h3>
<pre><code class="language-ts">import { vi } from 'vitest';

vi.mock('./db', () =&gt; ({
  query: vi.fn().mockResolvedValue([{ id: 1 }]),
}));</code></pre>

<h2>Comandos</h2>
<pre><code class="language-bash">npx vitest                # watch
npx vitest run            # uma vez (CI)
npx vitest --coverage
npx vitest --ui           # interface visual
npx vitest related src/x  # testes que dependem de x</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Projetos TypeScript que querem rodar sem build.</li>
<li>Migração suave do Jest (mesmas APIs).</li>
<li>Monorepos onde velocidade do watch importa.</li>
<li>Testes de bibliotecas multiplataforma (Node + browser via jsdom).</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Use <code>describe.concurrent</code> para suites independentes — ganha paralelismo.</li>
<li>Prefira <code>toMatchInlineSnapshot</code> a snapshots externos para visibilidade no PR.</li>
<li>Isole side effects com <code>beforeEach</code>/<code>afterEach</code>.</li>
<li>Configure <code>coverage.thresholds</code> no CI para evitar regressão.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Vitest x node:test</div><div>Para libs minúsculas, <code>node:test</code> sem deps é ótimo. Para apps reais com mocks e cobertura, Vitest entrega muito mais.</div></div>
`}} />
    </article>
  );
}

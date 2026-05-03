import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Testing · iniciante · 8 min"}),e.jsx("h1",{children:"node:test (built-in)"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p>Desde o Node 18, existe um test runner <strong>nativo</strong>: zero dependências, zero configuração. Combinado com <code>node:assert/strict</code>, cobre 90% dos casos sem precisar de Jest ou Vitest.</p>

        <h2>Conceito</h2>
        <p>Você organiza testes com <code>describe</code>/<code>test</code> (ou <code>it</code>) e roda com a flag <code>--test</code>. Por padrão Node descobre arquivos <code>*.test.js</code>, <code>*.spec.js</code> e similares, e roda cada arquivo em um <strong>processo isolado</strong>.</p>

        <h2>Exemplo prático</h2>
        <pre><code class="language-js">// math.test.js
import { test, describe, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { soma, fetchUser } from './math.js';

describe('soma', () =&gt; {
  beforeEach(() =&gt; {
    // setup por teste
  });

  test('positivos', () =&gt; {
    assert.equal(soma(2, 2), 4);
  });

  test('async', async () =&gt; {
    const r = await fetchUser(1);
    assert.deepEqual(r, { id: 1, name: 'Ana' });
  });

  test('erro esperado', () =&gt; {
    assert.throws(() =&gt; soma('a', 1), /tipo inválido/);
  });
});</code></pre>

        <h2>CLI</h2>
        <pre><code class="language-bash">node --test                          # roda toda a suíte
node --test --watch                  # re-roda ao salvar
node --test --experimental-test-coverage
node --test --test-name-pattern='soma'
node --test --test-reporter=spec
node --test --test-reporter=tap
node --test --test-reporter=junit --test-reporter-destination=junit.xml</code></pre>

        <h2>TypeScript</h2>
        <pre><code class="language-bash">node --import tsx --test 'src/**/*.test.ts'</code></pre>

        <h2>Mocks built-in</h2>
        <pre><code class="language-js">import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

test('mock de função', () =&gt; {
  const fn = mock.fn((x) =&gt; x * 2);
  assert.equal(fn(3), 6);
  assert.equal(fn.mock.callCount(), 1);
});</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Bibliotecas que querem zero dependências de teste.</li>
          <li>Projetos novos sem necessidade de snapshots ou DOM.</li>
          <li>Testes de integração de CLIs e scripts.</li>
          <li>Migrar gradualmente saindo de Mocha/Jest.</li>
        </ul>

        <h2>Boas práticas</h2>
        <ul>
          <li>Use <code>assert/strict</code>: força <code>===</code> e profundidade total em <code>deepEqual</code>.</li>
          <li>Nomeie arquivos com <code>.test.js</code> para descoberta automática.</li>
          <li>Use <code>t.diagnostic('msg')</code> para anotações úteis no relatório.</li>
          <li>Em CI, salve TAP ou JUnit para integração com painéis.</li>
        </ul>

        <div class="callout callout-info"><div class="callout-title">Quando preferir Vitest/Jest</div><div>Se você precisa de snapshot testing, mock automático profundo de módulos ESM, ou um ecossistema rico de matchers, ainda compensa um runner externo.</div></div>
        <div class="callout callout-tip"><div class="callout-title">Subtests</div><div>Dentro de um <code>test</code>, use <code>await t.test('caso', ...)</code> para criar subtests aninhados que aparecem no relatório.</div></div>
      `}})]})}export{r as default};

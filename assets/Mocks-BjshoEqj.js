import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Testing · intermediario · 8 min"}),e.jsx("h1",{children:"Mocks, spies e fixtures"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p>Mocks substituem dependências reais por <strong>versões controláveis</strong> para deixar o teste rápido, determinístico e isolado. <em>Spies</em> só observam chamadas; <em>fixtures</em> são dados pré-fabricados.</p>

        <h2>Conceito</h2>
        <ul>
          <li><strong>Stub</strong>: substitui uma função e devolve um valor fixo.</li>
          <li><strong>Spy</strong>: embrulha a função real e registra chamadas/argumentos.</li>
          <li><strong>Mock</strong>: stub com expectativas (foi chamado N vezes? com quê?).</li>
          <li><strong>Fixture</strong>: dado estático (JSON, arquivos) reutilizado entre testes.</li>
        </ul>

        <h2>Exemplo prático com node:test</h2>
        <pre><code class="language-js">import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import * as mailer from './mailer.js';
import { signup } from './signup.js';

test('signup envia email de boas-vindas', async () =&gt; {
  const sendMock = mock.method(mailer, 'send', async () =&gt; ({ id: 'm1' }));
  await signup({ email: 'a@b.com' });
  assert.equal(sendMock.mock.callCount(), 1);
  assert.deepEqual(sendMock.mock.calls[0].arguments[0], {
    to: 'a@b.com',
    template: 'welcome',
  });
  sendMock.mock.restore();
});</code></pre>

        <h2>Mock de timers e fetch</h2>
        <pre><code class="language-js">import { mock, test } from 'node:test';

test('debounce', () =&gt; {
  mock.timers.enable({ apis: ['setTimeout'] });
  const fn = mock.fn();
  setTimeout(fn, 1000);
  mock.timers.tick(999);
  // ainda não chamou
  mock.timers.tick(1);
  // chamou
  mock.timers.reset();
});</code></pre>

        <h2>Vitest equivalente</h2>
        <pre><code class="language-ts">import { vi } from 'vitest';

vi.mock('../src/email.js', () =&gt; ({
  sendEmail: vi.fn().mockResolvedValue({ id: '1' }),
}));

const spy = vi.spyOn(console, 'log').mockImplementation(() =&gt; {});
vi.useFakeTimers();
vi.advanceTimersByTime(5000);
vi.useRealTimers();</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Isolar testes de chamadas HTTP externas (terceiros instáveis).</li>
          <li>Simular falhas (timeout, 500) que são difíceis de reproduzir.</li>
          <li>Acelerar suítes que dependem de I/O lento.</li>
          <li>Testar branches de erro sem provocar erro real.</li>
          <li>Verificar contratos: foi chamado o serviço X com argumento Y?</li>
        </ul>

        <h2>Boas práticas</h2>
        <ul>
          <li>Sempre <code>restore()</code>/<code>reset()</code> em <code>afterEach</code>.</li>
          <li>Não mocke o que você está testando — mocke as <em>dependências</em>.</li>
          <li>Prefira injeção de dependência a monkey-patch global.</li>
          <li>Fixtures vivem em <code>__fixtures__/</code>, versionadas no repo.</li>
          <li>Cuidado com <em>over-mocking</em>: testes passam mas produção quebra.</li>
        </ul>

        <div class="callout callout-info"><div class="callout-title">Para HTTP</div><div>Use <code>nock</code> ou <code>msw</code> para interceptar requisições reais sem alterar o código de produção.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Pegadinha de ESM</div><div>Em ESM puro, <code>mock.method</code> só funciona em propriedades de objetos exportados — não em bindings imutáveis. Refatore para passar dependências por argumento.</div></div>
      `}})]})}export{a as default};

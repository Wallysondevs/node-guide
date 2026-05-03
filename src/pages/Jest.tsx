export default function Jest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 8 min</div>
      <h1>Jest</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Jest é o test runner historicamente mais popular no ecossistema JS. Vem completo: assertions, mocks, snapshot, coverage, watch. Lento comparado a Vitest mas tem suporte excelente em CI e tooling enterprise.</p>

<h2>Setup</h2>
<pre><code class="language-bash">npm i -D jest @types/jest ts-jest
npx ts-jest config:init</code></pre>
<pre><code class="language-js">// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageThreshold: { global: { branches: 80, lines: 80 } },
};</code></pre>

<h2>Estrutura básica</h2>
<pre><code class="language-js">describe('user service', () =&gt; {
  beforeAll(async () =&gt; { await db.connect(); });
  afterAll(async () =&gt; { await db.close(); });
  beforeEach(() =&gt; jest.clearAllMocks());

  it('cria usuário', async () =&gt; {
    const u = await create({ email: 'a@b.com' });
    expect(u).toMatchObject({ email: 'a@b.com' });
    expect(u.id).toEqual(expect.any(String));
  });

  it.todo('valida email');
  it.skip('feature em construção', () =&gt; {});
});</code></pre>

<h2>Mocks</h2>
<pre><code class="language-js">jest.mock('./mailer');
import { send } from './mailer';

const mockedSend = send as jest.MockedFunction&lt;typeof send&gt;;

it('dispara email no signup', async () =&gt; {
  mockedSend.mockResolvedValue({ ok: true });
  await signup({ email: 'a@b.com' });
  expect(mockedSend).toHaveBeenCalledWith(
    expect.objectContaining({ to: 'a@b.com' })
  );
});

// spy sem substituir
const spy = jest.spyOn(console, 'error').mockImplementation(() =&gt; {});
spy.mockRestore();</code></pre>

<h2>Snapshot</h2>
<pre><code class="language-js">it('renderiza payload', () =&gt; {
  expect(buildResponse(input)).toMatchSnapshot();
});
// rode com --updateSnapshot quando o output for mudança intencional</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Projetos legados que já usam Jest.</li>
<li>Times grandes com tooling padrão (Storybook, Nx).</li>
<li>Snapshots de UI (com testing-library).</li>
<li>Mocks complexos de módulos.</li>
<li>Coverage integrado a CI.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>ESM</strong>: Jest historicamente lutou com ESM. Use <code>NODE_OPTIONS=--experimental-vm-modules</code> ou migre para Vitest.</li>
<li><code>jest.mock</code> é hoisted — declarações ficam acima dos imports na execução.</li>
<li>Globals (<code>describe</code>, <code>it</code>) só funcionam dentro do runner. Para autocomplete, importe de <code>@jest/globals</code>.</li>
<li>Watch mode pode esquecer de detectar arquivos novos em monorepos. Use <code>--watchAll</code>.</li>
<li>Snapshots viram lixo se nunca revisados. Faça code review nos <code>__snapshots__</code>.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Vitest é Jest-compatível</div><div>API quase idêntica. Migrar costuma ser substituir <code>jest.mock</code> por <code>vi.mock</code>. 5-10x mais rápido em projetos médios.</div></div>

<div class="callout callout-tip"><div class="callout-title">Para Node puro, considere node:test</div><div>Desde Node 20, há test runner nativo. Sem instalar nada, sem config. Bom para libs e scripts.</div></div>`}} />
    </article>
  );
}

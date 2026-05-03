export default function Jest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 5 min</div>
      <h1>Jest</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O test runner mais usado historicamente. Lento comparado a Vitest mas com ecossistema gigante.</p><pre><code class="language-bash">npm i -D jest @types/jest ts-jest</code></pre><pre><code class="language-js">describe('user', () =&gt; {
  beforeEach(() =&gt; jest.clearAllMocks());

  it('cria', async () =&gt; {
    const u = await create({ email: 'a@b.com' });
    expect(u).toMatchObject({ email: 'a@b.com' });
  });

  it.todo('valida email');
  it.skip('feature em construção', () =&gt; {});
});</code></pre>`}} />
    </article>
  );
}

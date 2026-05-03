export default function Vitest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 6 min</div>
      <h1>Vitest</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Test runner rápido, compatível com Jest, com TS nativo via Vite. <strong>Recomendado em 2024+</strong>.</p><pre><code class="language-bash">npm i -D vitest</code></pre><pre><code class="language-js">// math.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('math', () =&gt; {
  it('soma', () =&gt; {
    expect(soma(2, 2)).toBe(4);
  });

  it('mock', () =&gt; {
    const fn = vi.fn().mockReturnValue(42);
    expect(fn()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('async', async () =&gt; {
    await expect(fetchUser(1)).resolves.toEqual({ id: 1 });
  });
});</code></pre><pre><code class="language-bash">npx vitest             # watch
npx vitest run         # 1x
npx vitest --coverage</code></pre>`}} />
    </article>
  );
}

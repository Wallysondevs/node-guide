export default function NodeTest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · iniciante · 6 min</div>
      <h1>node:test (built-in)</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Test runner nativo desde Node 18. Sem deps. Sem config. Use <code>--test</code>.</p><pre><code class="language-js">// math.test.js
import { test, describe, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

describe('soma', () =&gt; {
  test('positivos', () =&gt; {
    assert.equal(2 + 2, 4);
  });

  test('async', async () =&gt; {
    const r = await fetchUser(1);
    assert.deepEqual(r, { id: 1 });
  });
});</code></pre><pre><code class="language-bash">node --test
node --test --watch
node --test --experimental-test-coverage</code></pre>`}} />
    </article>
  );
}

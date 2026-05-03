export default function Mocks() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 6 min</div>
      <h1>Mocks, spies e fixtures</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { vi } from 'vitest';

// mock de módulo
vi.mock('../src/email.js', () =&gt; ({
  sendEmail: vi.fn().mockResolvedValue({ id: '1' }),
}));

// spy
const spy = vi.spyOn(console, 'log').mockImplementation(() =&gt; {});

// timers
vi.useFakeTimers();
vi.advanceTimersByTime(5000);
vi.useRealTimers();

// fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true, json: async () =&gt; ({ ok: true })
});</code></pre>`}} />
    </article>
  );
}

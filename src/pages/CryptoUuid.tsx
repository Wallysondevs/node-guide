export default function CryptoUuid() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · iniciante · 5 min</div>
      <h1>crypto e UUIDs</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import crypto from 'node:crypto';

crypto.randomUUID()                       // 'a3f...'
crypto.randomBytes(16).toString('hex')    // chave aleatória
crypto.createHash('sha256').update('senha').digest('hex')

// HMAC
crypto.createHmac('sha256', secret).update(payload).digest('hex')

// timing-safe compare
crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))</code></pre>`}} />
    </article>
  );
}

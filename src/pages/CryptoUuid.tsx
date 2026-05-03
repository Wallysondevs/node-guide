export default function CryptoUuid() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · iniciante · 7 min</div>
      <h1>crypto e UUIDs</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O módulo <code>node:crypto</code> dá acesso a primitivas criptográficas reais: hashes, HMAC, geração de bytes aleatórios seguros, derivação de chaves e UUIDs. Use sempre para qualquer coisa relacionada a tokens, identificadores únicos ou verificação de integridade — nunca <code>Math.random()</code>.</p>

<h2>Conceito</h2>
<p>As funções principais que você usa no dia a dia:</p>
<ul>
<li><code>randomUUID()</code> — UUID v4 conforme RFC 4122.</li>
<li><code>randomBytes(n)</code> — n bytes seguros (síncrono ou callback).</li>
<li><code>createHash(alg)</code> — SHA-256/512 para fingerprints, ETags.</li>
<li><code>createHmac(alg, key)</code> — assinatura simétrica (webhooks, sessions).</li>
<li><code>timingSafeEqual(a, b)</code> — comparação resistente a timing attacks.</li>
<li><code>scrypt</code>/<code>pbkdf2</code> — derivação de chave a partir de senha.</li>
</ul>

<h2>Exemplo prático</h2>
<pre><code class="language-js">import {
  randomUUID,
  randomBytes,
  createHash,
  createHmac,
  timingSafeEqual,
} from 'node:crypto';

// 1) IDs públicos: UUIDs v4
const orderId = randomUUID();           // '6f3b...-...-...'

// 2) Tokens opacos (URL-safe)
const token = randomBytes(32).toString('base64url');

// 3) Fingerprint de arquivo
const sha = createHash('sha256').update(buffer).digest('hex');

// 4) Assinar webhook
function sign(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

// 5) Comparar tokens com segurança
function safeCompare(a, b) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}</code></pre>

<p>Verificando assinatura de webhook (padrão Stripe/GitHub):</p>
<pre><code class="language-js">import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyWebhook(rawBody, headerSig, secret) {
  const expected = createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(headerSig);
  return a.length === b.length &amp;&amp; timingSafeEqual(a, b);
}</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>IDs primários públicos sem expor sequência (em vez de <code>id</code> autoincremental).</li>
<li>Tokens de reset de senha, magic links, API keys.</li>
<li>Validação de webhooks (HMAC).</li>
<li>ETags e cache busters (hash do conteúdo).</li>
<li>Idempotency keys para requests retryáveis.</li>
<li>Geração de salts para senhas (combine com bcrypt/scrypt).</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Nunca para senhas</div><div>SHA-256 é rápido demais — péssimo para hashing de senha. Use <code>scrypt</code>, <code>argon2</code> ou <code>bcrypt</code>, que são desenhados para serem lentos e parametrizáveis.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>UUID v4 não é ordenável</strong> — péssimo para chave primária em índices B-tree. Considere ULID/UUID v7 se precisar.</li>
<li><strong>Math.random()</strong> não é criptograficamente seguro — nunca para tokens.</li>
<li><strong>Comparar com <code>===</code></strong> tokens vaza informação por timing — use <code>timingSafeEqual</code>.</li>
<li><strong>Encoding</strong>: <code>'hex'</code> dobra o tamanho; <code>'base64url'</code> é mais compacto e URL-safe.</li>
<li><strong>randomBytes</strong> síncrono pode bloquear se o pool de entropia estiver baixo (raro em Linux moderno).</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">UUID v7 com biblioteca</div><div>Se precisa de UUIDs ordenáveis (melhores índices), use <code>uuid</code> npm com <code>v7()</code> ou <code>ulid</code>.</div></div>`}} />
    </article>
  );
}

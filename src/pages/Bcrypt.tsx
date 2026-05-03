export default function Bcrypt() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 7 min</div>
      <h1>Senhas com bcrypt</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><code>bcrypt</code> é um <em>password hash</em> propositadamente lento, com <em>salt</em> embutido e <em>cost factor</em> ajustável. É a baseline mínima para guardar senhas em qualquer aplicação web.</p>

<h2>Conceito</h2>
<p>Hash criptográfico genérico (SHA-256) é rápido demais — atacantes conseguem testar bilhões de senhas por segundo. Bcrypt aplica Blowfish em rodadas iterativas: dobrar o <code>cost</code> dobra o tempo. O salt aleatório evita rainbow tables; o resultado é uma string única tipo <code>$2b$12$...</code>.</p>
<pre><code class="language-bash">npm i bcrypt
# ou em ambientes sem build tools:
npm i bcryptjs</code></pre>

<h2>Exemplo prático: cadastro e login</h2>
<pre><code class="language-js">import bcrypt from 'bcrypt';

const COST = 12;   // ~250ms em CPU moderna; ajuste por benchmark

export async function register(email, plainPassword) {
  const hash = await bcrypt.hash(plainPassword, COST);
  await db.users.create({ email, password: hash });
}

export async function login(email, plainPassword) {
  const user = await db.users.findByEmail(email);
  if (!user) {
    // dummy compare contra timing attacks
    await bcrypt.compare(plainPassword, '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinv');
    throw new Error('credenciais inválidas');
  }
  const ok = await bcrypt.compare(plainPassword, user.password);
  if (!ok) throw new Error('credenciais inválidas');
  return user;
}</code></pre>

<h2>Migração de cost factor</h2>
<p>Quando hardware melhora, aumente o cost. Faça <em>rehash transparente</em> no próximo login bem-sucedido:</p>
<pre><code class="language-js">if (await bcrypt.compare(plain, user.password)) {
  const rounds = bcrypt.getRounds(user.password);
  if (rounds &lt; COST) {
    const novo = await bcrypt.hash(plain, COST);
    await db.users.update(user.id, { password: novo });
  }
}</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Toda autenticação local (email + senha).</li>
<li>API keys persistidas no banco (hash, não plaintext).</li>
<li>Tokens longos de "remember me" antes de gravar.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Use cost &gt;= 12 em 2024+. Benchmark localmente: <code>bcrypt.hash('test', N)</code>.</li>
<li>Nunca logue a senha em plaintext, nem o hash.</li>
<li>Limite tamanho da senha (ex.: 72 bytes — bcrypt trunca acima disso).</li>
<li>Considere <strong>argon2</strong> (vencedor PHC) para greenfield: melhor resistência GPU.</li>
<li>Combine com rate limit no endpoint de login para frear bruteforce.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Nunca use MD5/SHA1/SHA256 puro para senhas</div><div>São rápidos demais. Mesmo com salt, um atacante quebra milhões/segundo em GPU.</div></div>

<div class="callout callout-tip"><div class="callout-title">Argon2id</div><div><code>npm i argon2</code>. API parecida, mas mais resistente a ASIC/GPU. Recomendado pela OWASP em projetos novos.</div></div>`}} />
    </article>
  );
}

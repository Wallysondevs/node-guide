export default function Pg() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 8 min</div>
      <h1>PostgreSQL com pg</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>O pacote <code>pg</code> é o driver oficial do PostgreSQL para Node. Sem ORM no caminho: você escreve SQL puro e tem controle total. Em produção, sempre via <strong>connection pool</strong>.</p>

<h2>Conceito</h2>
<p>O Postgres aceita um número limitado de conexões (default 100). Abrir/fechar a cada query é caro. O <code>Pool</code> reutiliza conexões já abertas e enfileira requests quando todas estão ocupadas.</p>
<pre><code class="language-bash">npm i pg
npm i -D @types/pg     # se TypeScript</code></pre>

<h2>Setup do pool</h2>
<pre><code class="language-js">import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                       // conexões simultâneas
  idleTimeoutMillis: 30_000,     // fecha conexão ociosa
  connectionTimeoutMillis: 5_000 // erro se não conectar
});

pool.on('error', (err) =&gt; {
  console.error('pg pool error', err);
});</code></pre>

<h2>Queries parametrizadas</h2>
<pre><code class="language-js">// Sempre $1, $2 — NUNCA template literal com input do usuário
const { rows } = await pool.query(
  'select id, email from users where email = $1 and active = $2',
  [email, true]
);

// Insert retornando id
const r = await pool.query(
  'insert into posts (title, body) values ($1, $2) returning id',
  [title, body]
);
const id = r.rows[0].id;</code></pre>

<div class="callout callout-warn"><div class="callout-title">SQL injection</div><div>Nunca interpole string em SQL. Use placeholders <code>$N</code>. O driver faz escape correto baseado no tipo Postgres.</div></div>

<h2>Transações</h2>
<pre><code class="language-js">async function transferir(de, para, valor) {
  const client = await pool.connect();
  try {
    await client.query('begin');
    await client.query('update contas set saldo = saldo - $1 where id = $2', [valor, de]);
    await client.query('update contas set saldo = saldo + $1 where id = $2', [valor, para]);
    await client.query('commit');
  } catch (err) {
    await client.query('rollback');
    throw err;
  } finally {
    client.release();   // SEMPRE
  }
}</code></pre>

<h2>Streaming de resultados grandes</h2>
<pre><code class="language-js">import QueryStream from 'pg-query-stream';

const client = await pool.connect();
const query  = new QueryStream('select * from logs where data &gt; $1', [ontem]);
const stream = client.query(query);
stream.on('data', row =&gt; processar(row));
stream.on('end',  () =&gt; client.release());</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Microserviços que precisam de SQL otimizado e EXPLAIN à mão.</li>
<li>Aplicações com queries dinâmicas/relatórios complexos.</li>
<li>Workers que processam alto volume e precisam de COPY/streaming.</li>
<li>Quando ORM atrapalha mais do que ajuda (joins exóticos, CTEs).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Esquecer <code>client.release()</code> esgota o pool em poucos minutos.</li>
<li><code>BIGINT</code> retorna como <strong>string</strong> por padrão (precisão de 64 bits). Configure type parser se quiser number.</li>
<li><code>pool.query</code> usa um client diferente a cada chamada — não dá para abrir transação assim.</li>
<li>Em serverless (Lambda), prefira <code>pgbouncer</code> ou clientes específicos como <code>postgres</code> (porsager) — pool grande é antipattern.</li>
<li>Adicione <code>statement_timeout</code> no DSN para matar queries lentas: <code>?statement_timeout=10000</code>.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Alternativa</div><div>O pacote <code>postgres</code> (porsager) oferece API mais ergonômica, suporte a tagged templates seguros, e melhor performance. Vale considerar.</div></div>`}} />
    </article>
  );
}

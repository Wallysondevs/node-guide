export default function Pg() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 6 min</div>
      <h1>PostgreSQL com pg</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i pg</code></pre><pre><code class="language-js">import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 20 });

// query simples
const { rows } = await pool.query('select * from users where id = $1', [42]);

// transação
const client = await pool.connect();
try {
  await client.query('begin');
  await client.query('insert into ...');
  await client.query('update ...');
  await client.query('commit');
} catch (e) {
  await client.query('rollback');
  throw e;
} finally {
  client.release();
}</code></pre><div class="callout callout-warn"><div class="callout-title">Sempre parametrize</div><div>Nunca concatene strings em SQL — SQL injection. Use sempre <code>$1, $2</code>.</div></div>`}} />
    </article>
  );
}

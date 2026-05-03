export default function Mysql2() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 5 min</div>
      <h1>MySQL com mysql2</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i mysql2</code></pre><pre><code class="language-js">import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', user: 'root', database: 'app',
  waitForConnections: true, connectionLimit: 10,
});

const [rows] = await pool.query('select * from users where id = ?', [42]);

// prepared (mais rápido em loops)
const [r] = await pool.execute('select * from users where email = ?', [email]);</code></pre>`}} />
    </article>
  );
}

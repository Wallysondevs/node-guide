import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function c(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Banco de dados · intermediario · 7 min"}),e.jsx("h1",{children:"MySQL com mysql2"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p>O pacote <code>mysql2</code> é o driver de fato para MySQL/MariaDB em Node. Mais rápido que <code>mysql</code>, suporta prepared statements, Promises e streaming de resultados.</p>

        <h2>Conceito</h2>
        <p>Sempre use um <strong>pool de conexões</strong> em vez de abrir/fechar conexões a cada request. Pools reaproveitam sockets TCP e respeitam um limite (<code>connectionLimit</code>) para não derrubar o banco.</p>
        <pre><code class="language-bash">npm i mysql2</code></pre>

        <h2>Exemplo prático</h2>
        <pre><code class="language-js">import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// query simples (parametrizada — protege de SQL injection)
const [rows] = await pool.query(
  'select id, email from users where id = ?',
  [42]
);

// prepared statement (mais rápido em loops)
const [r] = await pool.execute(
  'select * from users where email = ?',
  [email]
);</code></pre>

        <h2>Transações</h2>
        <pre><code class="language-js">const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  await conn.execute('update accounts set balance = balance - ? where id = ?', [100, 1]);
  await conn.execute('update accounts set balance = balance + ? where id = ?', [100, 2]);
  await conn.commit();
} catch (e) {
  await conn.rollback();
  throw e;
} finally {
  conn.release();
}</code></pre>

        <h2>Streaming de resultados grandes</h2>
        <pre><code class="language-js">const conn = await pool.getConnection();
const stream = conn.query('select * from access_logs').stream();
for await (const row of stream) {
  process(row);
}
conn.release();</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>APIs CRUD tradicionais com schema relacional.</li>
          <li>Migrações de sistemas legados que já vivem em MySQL.</li>
          <li>Relatórios com joins complexos.</li>
          <li>Workers que processam grandes datasets via streaming.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Nunca concatene SQL com template literal — use <code>?</code> e arrays.</li>
          <li><code>pool.query</code> retorna <code>[rows, fields]</code>; esquecer o destructuring é erro comum.</li>
          <li>Conexões esquecidas no pool causam <em>queue timeout</em> sob carga.</li>
          <li>Datas voltam como <code>Date</code> JS ou string dependendo de <code>dateStrings</code>.</li>
          <li><code>BIGINT</code> volta como string; configure <code>supportBigNumbers</code>.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">ORM ou query builder?</div><div>Para projetos novos, considere <strong>Drizzle</strong> ou <strong>Kysely</strong> em cima do <code>mysql2</code>: você ganha tipos sem perder controle do SQL.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Pool sizing</div><div><code>connectionLimit</code> grande não é melhor — passe da capacidade do MySQL e cria <em>thundering herd</em>. Comece com 10 por instância.</div></div>
      `}})]})}export{c as default};

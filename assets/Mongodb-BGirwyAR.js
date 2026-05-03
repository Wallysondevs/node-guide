import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function s(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Banco de dados · intermediario · 8 min"}),e.jsx("h1",{children:"MongoDB"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
        <p>MongoDB é um banco <strong>document-oriented</strong>: cada registro é um documento BSON com schema flexível. O driver oficial <code>mongodb</code> é a forma mais idiomática de usar a partir do Node.</p>

        <h2>Conceito</h2>
        <p>Você se conecta a um <strong>cluster</strong>, escolhe um <strong>database</strong> e dentro dele uma <strong>collection</strong>. Cada documento tem <code>_id</code> automático (<code>ObjectId</code>). Operações são tipicamente assíncronas e voltam Promises.</p>
        <pre><code class="language-bash">npm i mongodb</code></pre>

        <h2>Exemplo prático: CRUD</h2>
        <pre><code class="language-js">import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
const db = client.db('app');
const users = db.collection('users');

// create
const { insertedId } = await users.insertOne({ name: 'Ana', age: 30 });

// read
const u = await users.findOne({ _id: insertedId });
const adultos = await users.find({ age: { $gte: 18 } }).toArray();

// update
await users.updateOne({ _id: insertedId }, { $set: { age: 31 } });

// delete
await users.deleteOne({ _id: insertedId });</code></pre>

        <h2>Aggregation pipeline</h2>
        <pre><code class="language-js">const top = await users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: '$city', total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]).toArray();</code></pre>

        <h2>Índices</h2>
        <pre><code class="language-js">await users.createIndex({ email: 1 }, { unique: true });
await users.createIndex({ createdAt: -1 });
// composto
await users.createIndex({ tenantId: 1, createdAt: -1 });</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Catálogos com schemas heterogêneos (e-commerce, CMS).</li>
          <li>Logs e telemetria (capped collections, time-series).</li>
          <li>Dados aninhados profundos que ficariam feios em SQL.</li>
          <li>Prototipação rápida sem migrations.</li>
          <li>Aplicações geo-espaciais (índices 2dsphere).</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li>Sem índice, queries fazem <em>collection scan</em> — fatal acima de algumas centenas de milhares.</li>
          <li><code>find().toArray()</code> em coleção grande explode memória; itere com <code>for await</code>.</li>
          <li>Operadores começam com <code>$</code> e diferenciam maiúsculas: <code>$gte</code> ≠ <code>$GTE</code>.</li>
          <li>Schema flexível ≠ ausência de schema: defina contratos com Zod ou Mongoose.</li>
          <li>Transações precisam de replica set, não funcionam em standalone.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Mongoose</div><div>Se você quer schemas, validação e middleware, considere <code>mongoose</code>. Para perfomance e controle máximo, fique com o driver oficial.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Atlas em produção</div><div>Use connection string com <code>retryWrites=true&amp;w=majority</code> e configure <code>maxPoolSize</code> condizente com seus workers.</div></div>
      `}})]})}export{s as default};

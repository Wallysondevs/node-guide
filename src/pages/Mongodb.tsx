export default function Mongodb() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Banco de dados · intermediario · 6 min</div>
      <h1>MongoDB</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i mongodb</code></pre><pre><code class="language-js">import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
const db = client.db('app');
const users = db.collection('users');

await users.insertOne({ name: 'Ana', age: 30 });
const u = await users.findOne({ name: 'Ana' });
await users.updateOne({ _id }, { $set: { age: 31 } });
await users.deleteOne({ _id });

// aggregation
const top = await users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: '$city', total: { $sum: 1 } } },
  { $sort: { total: -1 } },
]).toArray();</code></pre>`}} />
    </article>
  );
}

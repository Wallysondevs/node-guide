export default function ExpressSetup() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · iniciante · 6 min</div>
      <h1>Express: setup</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i express
npm i -D @types/express</code></pre><pre><code class="language-js">import express from 'express';

const app = express();
app.use(express.json());                  // parse application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =&gt; res.json({ ok: true }));

app.listen(3000, () =&gt; console.log('http://localhost:3000'));</code></pre><div class="callout callout-info"><div class="callout-title">Status atual</div><div>Express ainda é o framework mais popular. Pra alta performance considere Fastify ou Hono.</div></div>`}} />
    </article>
  );
}

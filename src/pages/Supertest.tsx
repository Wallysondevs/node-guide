export default function Supertest() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Testing · intermediario · 5 min</div>
      <h1>Supertest: testar HTTP</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i -D supertest</code></pre><pre><code class="language-js">import request from 'supertest';
import { app } from '../src/app.js';

it('GET /users', async () =&gt; {
  const r = await request(app).get('/users').expect(200);
  expect(r.body).toHaveLength(3);
});

it('POST /users 400 sem email', async () =&gt; {
  await request(app)
    .post('/users')
    .send({ name: 'x' })
    .expect(400);
});

it('auth', async () =&gt; {
  const login = await request(app).post('/login').send({ email, pass });
  const token = login.body.token;
  await request(app).get('/me').set('Authorization', \`Bearer \${token}\`).expect(200);
});</code></pre>`}} />
    </article>
  );
}

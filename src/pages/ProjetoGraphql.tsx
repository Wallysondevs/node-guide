export default function ProjetoGraphql() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · avancado · 11 min</div>
      <h1>Projeto: GraphQL</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>API GraphQL com <strong>graphql-yoga</strong>, schema-first, resolvers, DataLoader para resolver N+1, autenticação por JWT no contexto e subscriptions via SSE. Backend usando Prisma + Postgres.</p>

<h2>Estrutura</h2>
<pre><code class="language-bash">graphql-app/
├─ package.json
├─ prisma/schema.prisma
└─ src/
   ├─ index.js          # createYoga + http
   ├─ schema.js         # typeDefs + resolvers
   ├─ context.js        # auth + loaders
   └─ loaders.js        # DataLoader</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">npm i graphql graphql-yoga @prisma/client dataloader jsonwebtoken
npm i -D prisma
npx prisma init</code></pre>

<h2>Schema</h2>
<pre><code class="language-js">// src/schema.js
import { createSchema } from 'graphql-yoga';
import { prisma } from './db.js';

const typeDefs = /* GraphQL */ \\\`
  type User { id: ID!, email: String!, posts: [Post!]! }
  type Post { id: ID!, title: String!, body: String!, author: User! }
  type Query {
    me: User
    users(limit: Int = 20): [User!]!
    post(id: ID!): Post
  }
  type Mutation {
    signup(email: String!, password: String!): String!  # JWT
    createPost(title: String!, body: String!): Post!
  }
  type Subscription { postCreated: Post! }
\\\`;

const resolvers = {
  Query: {
    me: (_, __, ctx) =&gt; ctx.userId ? prisma.user.findUnique({ where: { id: ctx.userId } }) : null,
    users: (_, { limit }) =&gt; prisma.user.findMany({ take: limit }),
    post: (_, { id }) =&gt; prisma.post.findUnique({ where: { id: Number(id) } })
  },
  Mutation: {
    signup: async (_, { email, password }, ctx) =&gt; {
      const u = await prisma.user.create({ data: { email, password } });
      return ctx.signToken(u.id);
    },
    createPost: async (_, { title, body }, ctx) =&gt; {
      if (!ctx.userId) throw new Error('unauthenticated');
      const p = await prisma.post.create({ data: { title, body, userId: ctx.userId } });
      ctx.pubsub.publish('postCreated', { postCreated: p });
      return p;
    }
  },
  Subscription: {
    postCreated: {
      subscribe: (_, __, ctx) =&gt; ctx.pubsub.subscribe('postCreated')
    }
  },
  User: {
    posts: (parent, _, ctx) =&gt; ctx.loaders.postsByUser.load(parent.id)
  },
  Post: {
    author: (parent, _, ctx) =&gt; ctx.loaders.userById.load(parent.userId)
  }
};

export const schema = createSchema({ typeDefs, resolvers });</code></pre>

<h2>DataLoader (N+1)</h2>
<pre><code class="language-js">// src/loaders.js
import DataLoader from 'dataloader';
import { prisma } from './db.js';

export function makeLoaders() {
  return {
    userById: new DataLoader(async (ids) =&gt; {
      const rows = await prisma.user.findMany({ where: { id: { in: ids } } });
      const map = new Map(rows.map(r =&gt; [r.id, r]));
      return ids.map(id =&gt; map.get(id));
    }),
    postsByUser: new DataLoader(async (ids) =&gt; {
      const rows = await prisma.post.findMany({ where: { userId: { in: ids } } });
      return ids.map(id =&gt; rows.filter(r =&gt; r.userId === id));
    })
  };
}</code></pre>

<h2>Contexto e bootstrap</h2>
<pre><code class="language-js">// src/index.js
import { createYoga, createPubSub } from 'graphql-yoga';
import { createServer } from 'node:http';
import jwt from 'jsonwebtoken';
import { schema } from './schema.js';
import { makeLoaders } from './loaders.js';

const pubsub = createPubSub();
const SECRET = process.env.JWT_SECRET;

const yoga = createYoga({
  schema,
  context: ({ request }) =&gt; {
    let userId = null;
    const auth = request.headers.get('authorization');
    if (auth?.startsWith('Bearer ')) {
      try { userId = jwt.verify(auth.slice(7), SECRET).sub; } catch {}
    }
    return {
      userId,
      pubsub,
      loaders: makeLoaders(),
      signToken: (id) =&gt; jwt.sign({ sub: id }, SECRET, { expiresIn: '7d' })
    };
  }
});

createServer(yoga).listen(3000, () =&gt; console.log('GraphiQL em http://localhost:3000/graphql'));</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">DATABASE_URL=... JWT_SECRET=... node --watch src/index.js
# query exemplo no GraphiQL:
# query { users { email posts { title } } }</code></pre>

<div class="callout callout-warn"><div class="callout-title">N+1 silencioso</div><div>Sem DataLoader, listar 100 users com posts faz 101 queries. Loaders agrupam ids dentro de um tick e fazem <strong>uma</strong> query <code>WHERE id IN (...)</code>.</div></div>

<h2>Boas práticas</h2>
<ul>
  <li><strong>Loader por request</strong> — nunca compartilhe entre requests (cache vaza dados de outros usuários).</li>
  <li>Limite profundidade e complexidade da query (<code>graphql-depth-limit</code>, <code>graphql-cost-analysis</code>).</li>
  <li>Desabilite GraphiQL em produção ou proteja com auth.</li>
  <li>Subscriptions via SSE são mais simples que WebSocket — Yoga suporta nativamente.</li>
  <li>Para federation/microsserviços, considere Apollo Router ou Hive.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Tipos do schema</div><div>Use <code>graphql-codegen</code> para gerar tipos TS dos resolvers e do client — elimina drift entre schema e código.</div></div>`}} />
    </article>
  );
}

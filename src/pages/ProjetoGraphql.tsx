export default function ProjetoGraphql() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · avancado · 7 min</div>
      <h1>Projeto: GraphQL</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i graphql graphql-yoga</code></pre><pre><code class="language-js">import { createYoga, createSchema } from 'graphql-yoga';
import { createServer } from 'node:http';

const schema = createSchema({
  typeDefs: \`
    type User { id: ID!, email: String!, posts: [Post!]! }
    type Post { id: ID!, title: String! }
    type Query { users: [User!]!, user(id: ID!): User }
    type Mutation { createUser(email: String!): User! }
  \`,
  resolvers: {
    Query: {
      users: () =&gt; db.user.findMany({ include: { posts: true } }),
      user: (_, { id }) =&gt; db.user.findUnique({ where: { id }, include: { posts: true } }),
    },
    Mutation: {
      createUser: (_, { email }) =&gt; db.user.create({ data: { email } }),
    },
  },
});

createServer(createYoga({ schema })).listen(3000);
// GraphiQL em http://localhost:3000/graphql</code></pre>`}} />
    </article>
  );
}

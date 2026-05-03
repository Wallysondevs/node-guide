export default function FastifySchemas() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fastify · intermediario · 6 min</div>
      <h1>Schemas e validação</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Fastify usa JSON Schema (ou TypeBox/Zod) para validar e serializar — ganho de performance enorme.</p><pre><code class="language-js">app.post('/users', {
  schema: {
    body: {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string', format: 'email' },
        age: { type: 'integer', minimum: 13 }
      }
    },
    response: {
      201: { type: 'object', properties: { id: { type: 'string' } } }
    }
  },
  handler: async (req, reply) =&gt; {
    const u = await db.create(req.body);
    return reply.code(201).send({ id: u.id });
  }
});</code></pre>`}} />
    </article>
  );
}

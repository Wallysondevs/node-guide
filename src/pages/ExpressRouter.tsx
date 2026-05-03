export default function ExpressRouter() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · iniciante · 5 min</div>
      <h1>Router modular</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// routes/users.js
import { Router } from 'express';
const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);

export default router;

// app.js
import users from './routes/users.js';
app.use('/users', users);</code></pre><p>Routers podem ser aninhados, ter middleware próprio e error handlers. Excelente pra organizar APIs grandes.</p>`}} />
    </article>
  );
}

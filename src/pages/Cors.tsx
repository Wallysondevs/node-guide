export default function Cors() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · intermediario · 5 min</div>
      <h1>CORS detalhado</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import cors from 'cors';

// liberal — desenvolvimento
app.use(cors());

// restrito — produção
app.use(cors({
  origin: ['https://meusite.com', 'https://app.meusite.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,            // permite cookies cross-origin
  maxAge: 86400,
}));

// dinâmico
app.use(cors({
  origin: (origin, cb) =&gt; {
    const allowed = ['https://...'];
    cb(null, !origin || allowed.includes(origin));
  }
}));</code></pre>`}} />
    </article>
  );
}

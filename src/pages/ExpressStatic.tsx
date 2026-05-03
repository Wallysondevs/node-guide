export default function ExpressStatic() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Express · iniciante · 5 min</div>
      <h1>Static files e uploads</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">app.use(express.static('public'));
// public/style.css → /style.css

app.use('/assets', express.static('build', { maxAge: '1y', immutable: true }));</code></pre><h2>Uploads com multer</h2><pre><code class="language-js">import multer from 'multer';
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/avatar', upload.single('foto'), (req, res) =&gt; {
  console.log(req.file.path);
  res.json({ ok: true });
});</code></pre>`}} />
    </article>
  );
}

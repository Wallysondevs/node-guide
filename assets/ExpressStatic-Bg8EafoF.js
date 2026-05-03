import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function r(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Express · iniciante · 9 min"}),e.jsx("h1",{children:"Static files e uploads"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Express serve arquivos estáticos via <code>express.static</code> (built-in, baseado em <code>serve-static</code>) e recebe uploads via <code>multer</code>. Para tráfego pesado, prefira CDN ou nginx — mas em dev ou cargas leves, ambos resolvem.</p>

<h2>Servindo estáticos</h2>
<pre><code class="language-js">import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// /style.css → public/style.css
app.use(express.static(path.join(__dirname, 'public')));

// servido sob prefixo
app.use('/assets', express.static(path.join(__dirname, 'build'), {
  maxAge: '1y',
  immutable: true,
  etag: true,
  index: false,                      // não serve index.html automaticamente
  fallthrough: true,                 // se não achar, passa pro próximo middleware
}));</code></pre>

<h2>SPA fallback</h2>
<pre><code class="language-js">// serve a build do React/Vite
app.use(express.static('dist'));

// rotas da API antes
app.use('/api', apiRouter);

// fallback: qualquer outra rota retorna index.html
app.get('*', (req, res) =&gt; {
  res.sendFile(path.resolve('dist/index.html'));
});</code></pre>

<h2>Uploads com multer</h2>
<pre><code class="language-bash">npm i multer
npm i -D @types/multer</code></pre>
<pre><code class="language-js">import multer from 'multer';
import { randomUUID } from 'node:crypto';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) =&gt; {
    const ext = path.extname(file.originalname);
    cb(null, \\\`\\${randomUUID()}\\${ext}\\\`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },        // 5MB
  fileFilter: (req, file, cb) =&gt; {
    const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
    cb(ok ? null : new Error('tipo inválido'), ok);
  },
});

// um arquivo
app.post('/avatar', upload.single('foto'), (req, res) =&gt; {
  res.json({ url: \\\`/uploads/\\${req.file.filename}\\\` });
});

// vários arquivos
app.post('/gallery', upload.array('fotos', 10), (req, res) =&gt; {
  res.json({ files: req.files.map(f =&gt; f.filename) });
});

// campos mistos
app.post('/form', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'docs', maxCount: 5 },
]), (req, res) =&gt; {
  res.json({ files: req.files });
});</code></pre>

<h2>Upload direto pra S3 (memória)</h2>
<pre><code class="language-js">import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10_000_000 } });

app.post('/files', upload.single('file'), ah(async (req, res) =&gt; {
  const key = \\\`uploads/\\${randomUUID()}\\\`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }));
  res.json({ key });
}));</code></pre>

<h2>Quando usar</h2>
<ul>
<li><code>express.static</code> — assets de SPA, ícones, CSS, fontes em dev</li>
<li>Upload disco — arquivos pequenos a médios, único servidor</li>
<li>Upload memória — pequenos &lt; 10MB, quando vai re-encaminhar (S3, processamento)</li>
<li>Em escala, sempre delegue estáticos para CDN (Cloudflare, CloudFront)</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não sirva uploads do mesmo dir</div><div>Servir <code>uploads/</code> com <code>express.static</code> permite enumeração se filenames forem previsíveis. Use UUIDs e/ou autenticação no path.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li>Multer não respeita <code>fileFilter</code> async — faça checagens síncronas só</li>
<li>Validação real de tipo precisa ler magic bytes (<code>file-type</code>), não confiar em <code>mimetype</code></li>
<li>Em proxy nginx, configure <code>client_max_body_size</code> ou o upload morre antes do Express</li>
<li><code>express.static</code> seta <code>Last-Modified</code> automaticamente — mas em containers efêmeros use <code>etag: 'strong'</code></li>
<li>Para SPA fallback, ponha <code>app.get('*', ...)</code> DEPOIS de todas as rotas de API</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Alternativas robustas</div><div>Para uploads grandes (vídeos), use <code>tus-node-server</code> (resumable) ou pre-signed URLs do S3 — o cliente envia direto, sem passar pelo Express.</div></div>`}})]})}export{r as default};

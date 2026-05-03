import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Async · iniciante · 7 min"}),e.jsx("h1",{children:"Callbacks"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Callbacks são a forma mais antiga de assincronia em Node: você passa uma função que será chamada quando a operação terminar. A convenção <strong>error-first</strong> (<code>(err, result) =&gt; ...</code>) padronizou o modelo e ainda permeia APIs nativas e bibliotecas legadas.</p>

<h2>Conceito</h2>
<p>O primeiro argumento do callback é sempre o erro (ou <code>null</code>). O resultado vem depois. Se você esquecer de tratar o erro, falhas viram <em>silent bugs</em>.</p>
<pre><code class="language-js">import fs from 'node:fs';

fs.readFile('config.json', 'utf8', (err, data) =&gt; {
  if (err) return console.error('erro lendo:', err);
  try {
    const cfg = JSON.parse(data);
    console.log(cfg);
  } catch (e) {
    console.error('json inválido:', e);
  }
});</code></pre>

<h2>Exemplo prático: composição</h2>
<pre><code class="language-js">function carregaPerfil(id, cb) {
  db.user(id, (err, user) =&gt; {
    if (err) return cb(err);
    db.posts(user.id, (err, posts) =&gt; {
      if (err) return cb(err);
      cb(null, { user, posts });
    });
  });
}

carregaPerfil(42, (err, perfil) =&gt; {
  if (err) return console.error(err);
  console.log(perfil);
});</code></pre>

<h2>Promisify: ponte para async/await</h2>
<pre><code class="language-js">import { promisify } from 'node:util';
import fs from 'node:fs';

const readFileP = promisify(fs.readFile);

const data = await readFileP('config.json', 'utf8');

// alternativa nativa: importar o submódulo promises
import { readFile } from 'node:fs/promises';
const cfg = JSON.parse(await readFile('config.json', 'utf8'));</code></pre>

<h2>Convenções importantes</h2>
<ul>
<li>Sempre <strong>error-first</strong>: <code>(err, ...rest) =&gt; ...</code>.</li>
<li>Chame o callback <strong>uma única vez</strong>. Chamar duas vezes causa bugs sutis.</li>
<li>Sempre <code>return cb(err)</code> para evitar continuar executando.</li>
<li>Nunca lance exceção em código async — passe via <code>cb(err)</code>.</li>
</ul>

<h2>Quando ainda usar callbacks</h2>
<ul>
<li>APIs nativas que só têm versão callback (raras hoje).</li>
<li>Hot loops onde criar Promise por iteração custa caro.</li>
<li>Pacotes legados que não migraram para Promise.</li>
<li>EventEmitter (callbacks repetitivos, não terminam).</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Callback hell</strong>: aninhamento profundo. Refatore para Promises ou async/await.</li>
<li>Esquecer <code>return</code> faz o callback rodar duas vezes em caminhos de erro.</li>
<li>Funções <em>sync</em> chamando callback de forma assíncrona inconsistente — sempre adie com <code>queueMicrotask</code> se for caso.</li>
<li>Erros lançados <em>dentro</em> do callback (síncrono) não são capturados pela função externa.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Callback hell</div><div>Se sua função tem mais de 3 níveis de aninhamento, está na hora de quebrar em funções nomeadas ou migrar para async/await.</div></div>

<div class="callout callout-tip"><div class="callout-title">util.callbackify</div><div>Inverso do <code>promisify</code>: transforma uma função async em callback. Útil para integrar código novo com libs antigas.</div></div>`}})]})}export{i as default};

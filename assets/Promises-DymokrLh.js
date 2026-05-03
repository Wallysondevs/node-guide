import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Async · iniciante · 10 min"}),e.jsx("h1",{children:"Promises"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Uma <strong>Promise</strong> representa o resultado futuro de uma operação assíncrona. Ela substituiu callbacks aninhados (callback hell) e é a base de <code>async/await</code> no Node moderno.</p>

<h2>Conceito</h2>
<p>Toda Promise tem três estados: <strong>pending</strong>, <strong>fulfilled</strong> (resolveu com valor) ou <strong>rejected</strong> (rejeitou com erro). Uma vez assentada, ela não muda mais.</p>
<pre><code class="language-js">const p = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; resolve(42), 1000);
});

p.then(v =&gt; console.log(v))    // 42
 .catch(err =&gt; console.error(err))
 .finally(() =&gt; console.log('done'));</code></pre>

<h2>Encadeamento</h2>
<p>Cada <code>.then</code> retorna uma nova Promise; o valor retornado dentro do callback vira o valor da próxima. Se você retornar uma Promise, ela é "achatada" (chaining):</p>
<pre><code class="language-js">fetchUser(1)
  .then(user =&gt; fetchPosts(user.id))   // retorna Promise
  .then(posts =&gt; posts.length)          // valor síncrono
  .then(n =&gt; console.log(n + ' posts'))
  .catch(err =&gt; console.error(err));</code></pre>

<h2>Promisificar callbacks</h2>
<pre><code class="language-js">// manual
function readFileP(path) {
  return new Promise((resolve, reject) =&gt; {
    fs.readFile(path, 'utf8', (err, data) =&gt; err ? reject(err) : resolve(data));
  });
}

// utilitário oficial
import { promisify } from 'node:util';
const readFile = promisify(fs.readFile);
const data = await readFile('./x.txt', 'utf8');</code></pre>

<h2>async/await é açúcar</h2>
<pre><code class="language-js">// equivalentes
function withThen() {
  return fetchUser(1).then(u =&gt; u.email);
}

async function withAwait() {
  const u = await fetchUser(1);
  return u.email;
}</code></pre>

<h2>Quando usar</h2>
<ul>
  <li>I/O: rede, disco, banco, timers — qualquer coisa que envolva espera.</li>
  <li>Composição de operações em paralelo (<code>Promise.all</code>).</li>
  <li>Como retorno padrão de funções de biblioteca — APIs modernas usam Promise (fs/promises, fetch, undici).</li>
  <li>Para encapsular APIs antigas baseadas em callback.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
  <li><strong>Promise não é cancelável</strong>. Quando criada, executa até o fim. Use <code>AbortController</code> para cancelar a operação subjacente.</li>
  <li><strong>Esquecer <code>return</code></strong> em <code>.then</code> quebra o encadeamento e perde o valor: <code>.then(u =&gt; { fetchPosts(u.id) })</code> não passa nada para o próximo.</li>
  <li><strong>Promises rejeitadas sem <code>.catch</code></strong> emitem <code>unhandledRejection</code>. No Node 15+ derruba o processo por padrão.</li>
  <li><strong>Constructor antipattern</strong>: <code>new Promise((res) =&gt; { res(fetch(url)); })</code>. Já é Promise, retorne direto: <code>return fetch(url)</code>.</li>
  <li>Promises são <strong>microtarefas</strong> e rodam antes de I/O e timers — útil saber para entender ordem de execução.</li>
</ul>

<pre><code class="language-js">// captura global
process.on('unhandledRejection', (reason) =&gt; {
  console.error('unhandled:', reason);
});</code></pre>

<div class="callout callout-info"><div class="callout-title">Promise.resolve e Promise.reject</div><div>Atalhos para criar promises já assentadas. <code>Promise.resolve(v)</code> retorna a própria <code>v</code> se já for thenable — útil para normalizar valores síncronos/assíncronos.</div></div>

<div class="callout callout-tip"><div class="callout-title">Prefira async/await</div><div>Em código novo, use <code>async/await</code> — é mais legível e o stack trace fica completo. Reserve <code>.then</code> para encadeamentos pontuais ou estilo funcional.</div></div>`}})]})}export{t as default};

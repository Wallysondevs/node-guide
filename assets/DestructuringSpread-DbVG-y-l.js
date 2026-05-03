import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Fundamentos JS · iniciante · 7 min"}),e.jsx("h1",{children:"Destructuring e spread"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Destructuring e spread/rest são sintaxes de ES2015+ que dominam o código JS/Node moderno. Servem para extrair partes de objetos/arrays, copiar coleções e definir argumentos opcionais de forma legível.</p>

<h2>Conceito</h2>
<p><strong>Destructuring</strong> &quot;desempacota&quot; valores. <strong>Spread</strong> (<code>...</code> em chamadas/literais) &quot;expande&quot;. <strong>Rest</strong> (<code>...</code> em parâmetros/binding) &quot;agrupa&quot;.</p>

<pre><code class="language-js">// Objeto: extrair, renomear, default, rest
const user = { name: 'Ana', email: 'a@b.com', age: 30, role: 'admin' };
const { name, email: mail, age = 18, ...rest } = user;
// name='Ana', mail='a@b.com', age=30, rest={role:'admin'}

// Array: por posição
const [first, , third, ...tail] = [1, 2, 3, 4, 5];

// Aninhado
const resp = { data: { user: { id: 'u1' } }, status: 200 };
const { data: { user: { id } } } = resp;</code></pre>

<h2>Exemplo prático</h2>
<p>Padrão típico em rotas Express e funções utilitárias:</p>
<pre><code class="language-js">// Argumentos opcionais com defaults
function listUsers({ page = 1, limit = 20, sort = 'createdAt' } = {}) {
  // se chamada sem args, vira {} antes de destructurar
  return db.select().from(users).limit(limit).offset((page - 1) * limit);
}

// Atualização imutável de objeto
function updateUser(user, patch) {
  return { ...user, ...patch, updatedAt: new Date() };
}

// Remover campos sensíveis
function publicUser(user) {
  const { password, ...safe } = user;
  return safe;
}

// Concatenar arrays
const all = [...prev, ...next];

// Clonar (shallow)
const copy = [...arr];
const objCopy = { ...obj };

// Spread em chamadas
const args = [1, 2, 3];
Math.max(...args);              // 3</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>Extrair props/params de objetos de configuração e requests.</li>
<li>Construir novos objetos imutáveis (Redux-style).</li>
<li>Argumentos variádicos: <code>function log(...args)</code>.</li>
<li>Concatenar arrays sem mutar (<code>const merged = [...a, ...b]</code>).</li>
<li>Filtrar campos sensíveis antes de retornar JSON.</li>
<li>Chamar funções com array de argumentos: <code>fn(...lista)</code>.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">Ordem importa em spread de objeto</div><div><code>{ ...defaults, ...userInput }</code> — o último vence. Use isso a seu favor para sobrescrever defaults com input do usuário.</div></div>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Cópia rasa</strong>: spread copia só o primeiro nível. Objetos aninhados continuam compartilhados — use <code>structuredClone(x)</code> para cópia profunda.</li>
<li><strong>Default só em <code>undefined</code></strong>: <code>{ a = 1 } = { a: null }</code> resulta em <code>a = null</code>, não 1.</li>
<li><strong>Performance em arrays gigantes</strong>: <code>[...arr]</code> é O(n) e aloca novo array — evite em hot paths.</li>
<li><strong>Rest em parâmetros</strong> precisa ser o último: <code>function f(a, ...rest)</code>, nunca <code>(...rest, a)</code>.</li>
<li><strong>Symbol-keyed properties</strong> não são copiadas em alguns engines antigos — relevante em libs de baixo nível.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Tipagem em TS</div><div>O TS infere o tipo do <code>...rest</code> como <code>Omit&lt;T, K&gt;</code> automaticamente — útil para criar funções <code>publicUser</code> tipadas.</div></div>`}})]})}export{t as default};

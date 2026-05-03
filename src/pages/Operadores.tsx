export default function Operadores() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 8 min</div>
      <h1>Operadores</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>JavaScript tem operadores aritméticos, lógicos, de comparação, bitwise e os modernos <code>??</code>, <code>?.</code>, <code>??=</code>, <code>||=</code>, <code>&amp;&amp;=</code>. Dominar isso evita bugs sutis em código de produção.</p>

        <h2>Conceito</h2>
        <p>O ponto importante é entender quando ocorre <strong>coerção</strong> de tipos e o que conta como <em>truthy</em>/<em>falsy</em>. Falsy: <code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>''</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. Todo o resto é truthy — incluindo <code>'0'</code>, <code>'false'</code>, <code>[]</code> e <code>{}</code>.</p>

        <h2>Nullish, optional chaining e logical assignment</h2>
        <pre><code class="language-js">// nullish coalescing — só null ou undefined
const port = process.env.PORT ?? 3000;
0 ?? 'fallback'           // 0  (??: zero é valor!)
0 || 'fallback'           // 'fallback'  (||: zero é falsy)

// optional chaining
user?.profile?.email
fn?.()
arr?.[0]

// logical assignment (ES2021)
config.timeout ??= 5000   // só atribui se for nullish
opts.retries ||= 3        // só atribui se for falsy
flags.debug &amp;&amp;= true      // só atribui se já for truthy</code></pre>

        <h2>Equality</h2>
        <p>Use <code>===</code> sempre. <code>==</code> faz coerção bizarra e é fonte clássica de bugs:</p>
        <pre><code class="language-js">[] == false     // true
[0] == false    // true
'' == 0         // true
null == undefined // true
NaN === NaN     // false ← use Number.isNaN(x)
Object.is(NaN, NaN) // true</code></pre>

        <h2>Spread, rest e template</h2>
        <pre><code class="language-js">const a = [1, 2, 3];
const b = [...a, 4];          // spread
const { id, ...rest } = obj;  // rest

function sum(...nums) {       // rest em parâmetros
  return nums.reduce((x, y) =&gt; x + y, 0);
}

const url = 'https://api.com/users/' + id; // sem template literal aqui (regra do guia)</code></pre>

        <h2>Operadores bitwise (raros, mas úteis)</h2>
        <pre><code class="language-js">const flags = 0b0000;
const READ = 1, WRITE = 2, EXEC = 4;
const perms = READ | WRITE;       // OR
perms &amp; READ                      // AND, testa flag
perms ^ WRITE                     // XOR, alterna
~0                                // NOT, vira -1
5 &gt;&gt; 1                            // shift right (= 2)</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li><code>??</code> em config de envvars onde <code>0</code> é valor válido.</li>
          <li><code>?.</code> ao navegar respostas de APIs incertas.</li>
          <li><code>??=</code> para defaults preguiçosos sem reescrever objetos.</li>
          <li>Bitwise em flags de permissão ou parsers binários.</li>
          <li><code>...</code> para clonar/mesclar arrays e objetos imutavelmente.</li>
        </ul>

        <h2>Pegadinhas</h2>
        <ul>
          <li><code>typeof null === 'object'</code> — bug histórico, lembre-se.</li>
          <li><code>+'1'</code> converte para número, mas <code>+'abc'</code> dá <code>NaN</code> sem erro.</li>
          <li><code>{} + []</code> retorna <code>0</code> em alguns contextos. Não brinque.</li>
          <li>Spread é <em>shallow</em>: objetos aninhados continuam compartilhados.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Use <code>===</code> e ESLint</div><div>Habilite <code>eqeqeq</code> e <code>no-implicit-coercion</code> no ESLint. Em TS, esses bugs raramente aparecem porque o compilador reclama antes.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Cuidado com <code>||</code> em defaults</div><div>Migrar de <code>||</code> para <code>??</code> em flags de feature pode mudar comportamento — revise testes.</div></div>
      `}} />
    </article>
  );
}

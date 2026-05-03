export default function DestructuringSpread() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 5 min</div>
      <h1>Destructuring e spread</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Sintaxe para extrair e copiar dados — fundamental em código moderno.</p><pre><code class="language-js">const { name, age = 18, ...rest } = user;
const [first, second, ...tail] = arr;

// rename + nested
const { profile: { email } } = user;

// spread em arrays e objetos
const arr2 = [...arr, 99];
const obj2 = { ...obj, ativo: true };

// função com defaults
function fetchUsers({ page = 1, limit = 20 } = {}) {}</code></pre>`}} />
    </article>
  );
}

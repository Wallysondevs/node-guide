export default function TiposPrimitivos() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Fundamentos JS · iniciante · 7 min</div>
      <h1>Tipos primitivos</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>JS tem 7 tipos primitivos: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>symbol</code>, <code>bigint</code>. Tudo o mais é objeto.</p><pre><code class="language-js">typeof 'abc'        // 'string'
typeof 42           // 'number'
typeof 42n          // 'bigint'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object'  (bug histórico!)
typeof Symbol()     // 'symbol'
typeof {}           // 'object'</code></pre><h2>Number quirks</h2><p>JS usa IEEE-754 64-bit. <code>0.1 + 0.2 !== 0.3</code>. Para dinheiro, use centavos como inteiro ou bibliotecas como <code>decimal.js</code>.</p><pre><code class="language-js">0.1 + 0.2          // 0.30000000000000004
Number.MAX_SAFE_INTEGER  // 9007199254740991
2n ** 100n         // bigint para inteiros gigantes</code></pre>`}} />
    </article>
  );
}

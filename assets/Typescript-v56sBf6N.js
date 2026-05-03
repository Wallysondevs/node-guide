import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Build & TS · intermediario · 12 min"}),e.jsx("h1",{children:"TypeScript em Node"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`
<p>TypeScript é praticamente padrão em Node moderno. Adiciona tipagem estática, melhora autocomplete, pega bugs no editor e documenta intenção sem virar um peso burocrático.</p>

<h2>Conceito</h2>
<p>O fluxo é simples: você escreve <code>.ts</code>, o <code>tsc</code> (ou esbuild/swc) gera <code>.js</code>, e o Node executa. Em dev usa <code>tsx</code>/<code>ts-node</code> para pular o build. Tipos <strong>somem em runtime</strong> — não confie neles para validar entrada externa.</p>

<h3>Setup mínimo</h3>
<pre><code class="language-bash">npm i -D typescript @types/node tsx
npx tsc --init</code></pre>

<pre><code class="language-json">{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "declaration": true,
    "sourceMap": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["src"]
}</code></pre>

<h2>Exemplo prático</h2>
<pre><code class="language-ts">// src/user.ts
export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export function createUser(input: Omit&lt;User, 'id' | 'createdAt'&gt;): User {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...input,
  };
}

// src/index.ts
import { createUser } from './user.js'; // .js mesmo com NodeNext
const u = createUser({ email: 'a@b.com' });
console.log(u);</code></pre>

<pre><code class="language-bash">npx tsc                  # build em dist/
node dist/index.js        # rodar
npx tsx src/index.ts      # rodar TS direto
npx tsx watch src/server.ts</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Times com mais de uma pessoa.</li>
<li>APIs públicas onde tipos viram contrato.</li>
<li>Códigos de longa vida com refactors frequentes.</li>
<li>Integrações com bancos/HTTP onde a forma dos dados muda.</li>
</ul>

<h2>Boas práticas</h2>
<ul>
<li>Sempre <code>"strict": true</code>. Sem isso é só JS com sintaxe extra.</li>
<li>Evite <code>any</code>; prefira <code>unknown</code> e narrowing.</li>
<li>Use <code>zod</code> para validar entrada externa e inferir tipos.</li>
<li>Habilite <code>noUncheckedIndexedAccess</code> em código novo.</li>
<li>Para builds rápidos use <code>tsup</code> ou <code>esbuild</code>; deixe <code>tsc --noEmit</code> só para checar tipos no CI.</li>
</ul>

<div class="callout callout-info"><div class="callout-title">module: NodeNext</div><div>Espelha a resolução real do Node em ESM. Imports precisam terminar com <code>.js</code> mesmo apontando para arquivos <code>.ts</code>.</div></div>

<div class="callout callout-warn"><div class="callout-title">Tipos não existem em runtime</div><div>Validar request body com <code>interface</code> não funciona. Use <code>zod</code>/<code>valibot</code> para validar e tipar de uma vez.</div></div>
`}})]})}export{i as default};

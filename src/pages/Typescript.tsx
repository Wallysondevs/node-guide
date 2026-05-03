export default function Typescript() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Build & TS · intermediario · 7 min</div>
      <h1>TypeScript em Node</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i -D typescript @types/node tsx
npx tsc --init</code></pre><pre><code class="language-json">// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}</code></pre><pre><code class="language-bash">tsc                      # build
tsx src/index.ts          # rodar TS direto
tsx watch src/index.ts    # com hot-reload</code></pre>`}} />
    </article>
  );
}

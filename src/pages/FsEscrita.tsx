export default function FsEscrita() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · iniciante · 5 min</div>
      <h1>Escrevendo arquivos</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import { writeFile, appendFile, mkdir } from 'node:fs/promises';

await mkdir('logs', { recursive: true });   // cria pasta (sem erro se existir)

await writeFile('logs/out.txt', 'olá\\n');   // sobrescreve
await appendFile('logs/out.txt', 'mais uma linha\\n');

// JSON pretty
await writeFile('data.json', JSON.stringify(obj, null, 2));</code></pre><h2>Atomicidade</h2><p><code>writeFile</code> não é atômico. Se cair no meio, fica corrompido. Para escrita atômica: escreva em temp + <code>rename</code>.</p><pre><code class="language-js">import { writeFile, rename } from 'node:fs/promises';
await writeFile('data.json.tmp', payload);
await rename('data.json.tmp', 'data.json');   // atômico no mesmo FS</code></pre>`}} />
    </article>
  );
}

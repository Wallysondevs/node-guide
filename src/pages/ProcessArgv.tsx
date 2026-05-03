export default function ProcessArgv() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">process/env · iniciante · 5 min</div>
      <h1>process.argv</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">// node app.js --port 8080 user
process.argv
// [
//   '/usr/bin/node',
//   '/abs/app.js',
//   '--port', '8080', 'user'
// ]
process.argv.slice(2)   // ['--port', '8080', 'user']</code></pre><h2>Parsing moderno</h2><pre><code class="language-js">// Node 18.3+
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  options: {
    port: { type: 'string', short: 'p', default: '3000' },
    verbose: { type: 'boolean', short: 'v' },
  },
  allowPositionals: true,
});</code></pre>`}} />
    </article>
  );
}

export default function FsWatch() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">fs · intermediario · 7 min</div>
      <h1>fs.watch e --watch</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Observar mudanças em arquivos é a base de hot reload, sync de configs e build watchers. O Node oferece duas APIs nativas (<code>fs.watch</code> e <code>fs.watchFile</code>) e a flag de runtime <code>--watch</code>.</p>

<h2>Conceito</h2>
<p><code>fs.watch</code> usa eventos do SO (inotify no Linux, FSEvents no macOS, ReadDirectoryChangesW no Windows). É barato e rápido, mas as semânticas variam por plataforma. <code>fs.watchFile</code> faz polling — funciona em qualquer lugar (incluindo NFS) mas consome CPU.</p>
<pre><code class="language-js">import { watch } from 'node:fs/promises';

for await (const event of watch('src', { recursive: true })) {
  console.log(event.eventType, event.filename);
  // eventType: 'change' | 'rename'
}</code></pre>

<h2>Debounce: editores disparam vários eventos</h2>
<pre><code class="language-js">import { watch } from 'node:fs/promises';

const pending = new Map();
function schedule(name, fn) {
  clearTimeout(pending.get(name));
  pending.set(name, setTimeout(() =&gt; { pending.delete(name); fn(); }, 100));
}

for await (const ev of watch('.', { recursive: true })) {
  if (!ev.filename) continue;
  schedule(ev.filename, () =&gt; console.log('rebuild', ev.filename));
}</code></pre>

<h2>Hot reload nativo: node --watch</h2>
<pre><code class="language-bash">node --watch src/index.js
node --watch --watch-path=src --watch-path=config src/index.js
node --watch-preserve-output src/index.js</code></pre>
<p>Disponível desde Node 18.11 (estável em 20+). Substitui <code>nodemon</code> em scripts simples. Para TypeScript: <code>tsx watch src/index.ts</code>.</p>

<h2>Casos de uso</h2>
<ul>
<li>Recarregar configurações sem restart (feature flags em JSON).</li>
<li>Build watcher caseiro para projetos pequenos.</li>
<li>Sincronizar arquivos para um serviço remoto.</li>
<li>Disparar testes ao salvar.</li>
<li>Detectar logs novos para tail customizado.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><strong>Eventos duplicados</strong>: editores fazem write+rename atomicamente. Sempre debounce.</li>
<li><code>filename</code> pode vir <code>null</code> em alguns SOs.</li>
<li><strong>Limite de watches</strong>: Linux tem cota por usuário (<code>cat /proc/sys/fs/inotify/max_user_watches</code>). Projetos com node_modules estouram.</li>
<li><code>recursive: true</code> só funcionou nativamente em todos os SOs a partir do Node 20.</li>
<li>Após delete + recreate o watcher pode parar de receber eventos. Prefira observar o diretório pai.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Limites do SO</div><div>Em projetos grandes (monorepos) ajuste <code>sysctl -w fs.inotify.max_user_watches=524288</code>.</div></div>

<div class="callout callout-tip"><div class="callout-title">Em produção: não use</div><div>Watchers são para desenvolvimento. Em prod, prefira sinais (<code>SIGHUP</code> para reload de config) ou um endpoint de admin.</div></div>`}} />
    </article>
  );
}

export default function OsInfo() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">path/os/url · iniciante · 5 min</div>
      <h1>Informações do sistema</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-js">import os from 'node:os';

os.platform()      // 'linux' | 'darwin' | 'win32'
os.arch()          // 'x64' | 'arm64'
os.cpus().length   // núcleos lógicos
os.totalmem()      // bytes
os.freemem()
os.hostname()
os.userInfo()      // { username, homedir, shell }
os.tmpdir()        // diretório temp
os.networkInterfaces()</code></pre>`}} />
    </article>
  );
}

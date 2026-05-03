export default function Pm2() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Deploy · intermediario · 5 min</div>
      <h1>PM2</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Process manager para Node em servidores tradicionais (VPS). Restart automático, cluster mode, logs.</p><pre><code class="language-bash">npm i -g pm2

pm2 start dist/server.js --name api -i max   # cluster, 1 por core
pm2 list
pm2 logs api
pm2 restart api
pm2 reload api                                # zero-downtime
pm2 startup                                   # systemd
pm2 save</code></pre><pre><code class="language-json">// ecosystem.config.cjs
module.exports = { apps: [{
  name: 'api',
  script: 'dist/server.js',
  instances: 'max',
  exec_mode: 'cluster',
  env: { NODE_ENV: 'production', PORT: 3000 }
}]};</code></pre>`}} />
    </article>
  );
}

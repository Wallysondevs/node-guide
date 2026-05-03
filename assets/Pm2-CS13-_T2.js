import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Deploy · intermediario · 7 min"}),e.jsx("h1",{children:"PM2"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>PM2 é um <strong>process manager</strong> para Node em servidores tradicionais (VPS, bare-metal). Ele garante restart automático em crash, modo cluster (1 processo por core), logs centralizados e zero-downtime reload.</p>

<h2>Conceito</h2>
<p>Em produção, rodar <code>node server.js</code> direto é frágil: se cai, fica caído. PM2 vira um daemon que monitora seus processos, reinicia em falha e expõe métricas. Compete com systemd + cluster module.</p>
<pre><code class="language-bash">npm i -g pm2
pm2 --version</code></pre>

<h2>Comandos do dia-a-dia</h2>
<pre><code class="language-bash">pm2 start dist/server.js --name api -i max   # cluster, 1 por core
pm2 list                                      # status
pm2 logs api                                  # logs em tempo real
pm2 logs api --lines 200
pm2 restart api                               # downtime &lt; 1s
pm2 reload api                                # zero-downtime (recria workers)
pm2 stop api
pm2 delete api
pm2 monit                                     # dashboard interativo</code></pre>

<h2>Ecosystem file (recomendado)</h2>
<pre><code class="language-js">// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'api',
    script: 'dist/server.js',
    instances: 'max',          // 'max' ou número
    exec_mode: 'cluster',      // cluster | fork
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/api/err.log',
    out_file:   '/var/log/api/out.log',
    merge_logs: true,
    time: true
  }]
};</code></pre>
<pre><code class="language-bash">pm2 start ecosystem.config.cjs
pm2 reload ecosystem.config.cjs --env production</code></pre>

<h2>Persistir entre reboots</h2>
<pre><code class="language-bash">pm2 startup            # gera comando systemd para o seu OS — copie e execute
pm2 save               # snapshot dos processos atuais
# após reboot, PM2 ressuscita tudo automaticamente</code></pre>

<div class="callout callout-info"><div class="callout-title">Cluster mode</div><div><code>exec_mode: 'cluster'</code> usa o módulo <code>cluster</code> do Node por baixo: um master distribui sockets entre workers. Bom para CPU-bound; para I/O puro, fork mode + load balancer externo às vezes performa melhor.</div></div>

<h2>Logs e rotação</h2>
<pre><code class="language-bash">pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 50M
pm2 set pm2-logrotate:retain 14
pm2 set pm2-logrotate:compress true</code></pre>

<h2>Quando usar</h2>
<ul>
<li>Deploy em VPS sem orquestrador (DigitalOcean, Hetzner).</li>
<li>Sistemas legados onde Docker ainda não entrou.</li>
<li>Necessidade de cluster mode sem reescrever app.</li>
<li>Equipes pequenas que querem operação simples.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li>Em <strong>Docker/Kubernetes não use PM2</strong> — o orquestrador já faz restart e scaling. PM2 dentro do container quebra healthcheck e logs.</li>
<li><code>reload</code> só funciona em cluster mode; em fork há downtime.</li>
<li>Logs vão para <code>~/.pm2/logs</code> por padrão — sem rotação enchem o disco.</li>
<li><code>pm2 update</code> é necessário após upgrade do binário global; senão daemon antigo continua rodando.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Contêineres</div><div>Em container, rode <code>node dist/server.js</code> direto como PID 1. Use <code>tini</code> ou <code>--init</code> do Docker para receber sinais corretamente.</div></div>`}})]})}export{t as default};

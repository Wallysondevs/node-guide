import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function t(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"process/env · intermediario · 8 min"}),e.jsx("h1",{children:"Exit codes e signals"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Em produção, processos Node são monitorados pelo SO ou orquestrador. Exit codes corretos e graceful shutdown são <strong>essenciais</strong> para CI, healthchecks, e zero-downtime deploy.</p>

<h2>Conceito</h2>
<p>Quando o processo termina, ele retorna um inteiro de 0–255 ao SO. <strong>0 = sucesso</strong>, qualquer outro = falha. Sinais (SIGINT, SIGTERM) são notificações assíncronas do SO pedindo encerramento — você decide o que fazer.</p>
<pre><code class="language-js">process.exit(0);    // sucesso explícito
process.exit(1);    // erro genérico
process.exit(2);    // misuse / config inválida (convenção)
// 130 = SIGINT, 143 = SIGTERM (kernel codes)</code></pre>

<h2>Sinais comuns</h2>
<ul>
<li><strong>SIGINT</strong> — Ctrl+C no terminal.</li>
<li><strong>SIGTERM</strong> — pedido educado de shutdown (docker stop, k8s, systemd).</li>
<li><strong>SIGKILL</strong> — força morte; <em>não pode ser interceptado</em>.</li>
<li><strong>SIGHUP</strong> — terminal fechou; comum como "recarrega config".</li>
</ul>

<h2>Exemplo prático: graceful shutdown</h2>
<pre><code class="language-js">import { createServer } from 'node:http';

const server = createServer(handler);
server.listen(3000);

let shuttingDown = false;
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('recebido', signal, '— encerrando');

  // 1) para de aceitar novas conexões
  server.close(err =&gt; {
    if (err) { console.error(err); process.exit(1); }
  });

  // 2) finaliza recursos
  try {
    await prisma.$disconnect();
    await redis.quit();
  } catch (e) {
    console.error('erro no shutdown', e);
  }

  // 3) força saída se algo travar
  setTimeout(() =&gt; process.exit(1), 10_000).unref();
}

process.on('SIGINT',  () =&gt; shutdown('SIGINT'));
process.on('SIGTERM', () =&gt; shutdown('SIGTERM'));</code></pre>

<div class="callout callout-info"><div class="callout-title">Por que graceful?</div><div>Em Kubernetes, o pod recebe SIGTERM e tem <code>terminationGracePeriodSeconds</code> (default 30s) para sair. Se não fechar conexões em curso, usuários veem 502.</div></div>

<h2>uncaughtException e unhandledRejection</h2>
<pre><code class="language-js">process.on('uncaughtException', (err, origin) =&gt; {
  console.error('FATAL uncaughtException', err, origin);
  // estado pode estar corrompido: reinicie o processo
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) =&gt; {
  console.error('FATAL unhandledRejection', reason);
  process.exit(1);
});</code></pre>

<div class="callout callout-warn"><div class="callout-title">Não suprima</div><div>Ignorar <code>uncaughtException</code> deixa o processo num estado inconsistente. Logue, alerte, e saia. O orquestrador (PM2, k8s, systemd) vai reiniciar.</div></div>

<h2>beforeExit vs exit</h2>
<pre><code class="language-js">process.on('beforeExit', code =&gt; {
  // event loop esvaziou; ainda dá para agendar trabalho async
  console.log('beforeExit', code);
});

process.on('exit', code =&gt; {
  // SÍNCRONO apenas; processo já está saindo
  console.log('exit', code);
});</code></pre>

<h2>Casos de uso</h2>
<ul>
<li>APIs HTTP em containers — drenar requests antes de morrer.</li>
<li>Workers de fila — terminar job atual, devolver os outros à fila.</li>
<li>Scripts CLI — exit code certo para CI passar/falhar.</li>
<li>Processos cron — sair com 0 só se tudo OK.</li>
</ul>

<h2>Pegadinhas</h2>
<ul>
<li><code>process.exit()</code> mata <strong>imediatamente</strong> — buffers de stdout/log podem não flushar. Prefira deixar o event loop drenar.</li>
<li>Em PaaS (Heroku/Render), você tem &lt;30s entre SIGTERM e SIGKILL — não tente terminar trabalho longo.</li>
<li>Se o handler de sinal não chamar <code>process.exit</code>, o sinal default é cancelado e o processo segue rodando.</li>
<li>Erros num <code>setTimeout</code> sem try/catch viram <code>uncaughtException</code> — não <code>unhandledRejection</code>.</li>
<li>Em Windows não há SIGTERM real; use <code>process.exit</code> via mensagem IPC.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Healthcheck</div><div>Durante shutdown, retorne 503 no endpoint de readiness para o load balancer parar de mandar tráfego antes mesmo do close.</div></div>`}})]})}export{t as default};

export default function OQueENode() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Introdução · iniciante · 6 min</div>
      <h1>O que é Node.js</h1>
      <div dangerouslySetInnerHTML={{__html: `<p><strong>Node.js</strong> é um runtime JavaScript fora do browser, construído sobre o motor <strong>V8</strong> do Chrome. Ele permite rodar JS no servidor, em scripts CLI, em ferramentas de build e até em apps desktop.</p><p>Foi criado em 2009 por Ryan Dahl com uma ideia central: <strong>I/O não-bloqueante</strong> e orientado a eventos. Em vez de travar uma thread esperando o disco ou a rede, Node usa callbacks e o event loop para processar milhares de conexões em uma única thread.</p><h2>Onde Node brilha</h2><ul><li>APIs HTTP/REST e GraphQL de alta concorrência</li><li>Servidores realtime (WebSockets, chat, streaming)</li><li>Ferramentas de linha de comando e build (Vite, ESLint, Prettier)</li><li>Microserviços leves, BFFs e gateways</li><li>Scripts de automação e ETL</li></ul><h2>Onde NÃO é a melhor escolha</h2><p>Cargas <em>CPU-bound</em> pesadas (processamento numérico longo, ML treinamento) tendem a sofrer numa única thread. Para esses casos use <code>worker_threads</code>, processamento em fila ou outra linguagem.</p><div class="callout callout-info"><div class="callout-title">Versionamento</div><div>Use sempre versões <strong>LTS</strong> (números pares: 18, 20, 22) em produção. Versões ímpares são experimentais.</div></div>`}} />
    </article>
  );
}

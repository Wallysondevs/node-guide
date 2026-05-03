export default function TiposDeDeps() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · iniciante · 5 min</div>
      <h1>dependencies vs dev vs peer</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>dependencies</strong> — usado em runtime (express, pg, zod). Vai junto na instalação.</li><li><strong>devDependencies</strong> — só em build/test (typescript, vitest, eslint). Não instala em produção.</li><li><strong>peerDependencies</strong> — pacote espera que o usuário forneça (react, react-dom em libs).</li><li><strong>optionalDependencies</strong> — instalação tenta mas não falha se der erro.</li></ul><pre><code class="language-bash">npm ci --omit=dev          # instala só dependencies (produção)
npm install --save-prod
npm install --save-dev
npm install --save-peer</code></pre>`}} />
    </article>
  );
}

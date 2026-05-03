export default function NpmAudit() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · iniciante · 4 min</div>
      <h1>npm audit e Snyk</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm audit                       # lista vulnerabilidades
npm audit fix                   # corrige (não-breaking)
npm audit fix --force           # corrige (pode quebrar)
npm audit --production          # ignora dev deps</code></pre><pre><code class="language-bash"># Snyk (mais detalhado)
npx snyk test
npx snyk monitor</code></pre><div class="callout callout-tip"><div class="callout-title">Dependabot</div><div>Configure no GitHub: PRs automáticos pra atualizar deps inseguras.</div></div>`}} />
    </article>
  );
}

export default function Workspaces() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Módulos · intermediario · 8 min</div>
      <h1>Workspaces e monorepos</h1>
      <div dangerouslySetInnerHTML={{__html: `<p>Monorepo = vários pacotes num único repositório, compartilhando dependências e tooling. npm, pnpm e yarn suportam workspaces nativamente. <strong>pnpm</strong> é o mais eficiente.</p><pre><code class="language-json">// package.json raiz
{
  "name": "monorepo",
  "private": true,
  "workspaces": ["packages/*"]
}</code></pre><pre><code class="language-bash"># pnpm
pnpm-workspace.yaml:
  packages:
    - 'apps/*'
    - 'libs/*'

pnpm install
pnpm --filter api dev
pnpm --filter @org/utils build</code></pre><div class="callout callout-tip"><div class="callout-title">Por que monorepo</div><div>Compartilhar lib interna entre serviços, refactor atômico, builds incrementais. Use Turborepo ou Nx para builds em cache.</div></div>`}} />
    </article>
  );
}

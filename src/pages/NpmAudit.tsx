export default function NpmAudit() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · iniciante · 6 min</div>
      <h1>npm audit e Snyk</h1>
      <div dangerouslySetInnerHTML={{__html: `
        <p>Suas dependências são <strong>código que você não escreveu</strong> rodando dentro do seu processo. Auditá-las é parte mínima da higiene de segurança.</p>

        <h2>Conceito</h2>
        <p>O <code>npm audit</code> consulta o GitHub Advisory Database e cruza com seu <code>package-lock.json</code>, classificando vulnerabilidades em <em>low</em>, <em>moderate</em>, <em>high</em> e <em>critical</em>. Ferramentas como <strong>Snyk</strong> e <strong>OSV-Scanner</strong> oferecem cobertura adicional e melhores recomendações.</p>

        <h2>Comandos essenciais</h2>
        <pre><code class="language-bash">npm audit                       # lista vulnerabilidades
npm audit --json                # saída programática
npm audit --production          # ignora devDependencies
npm audit fix                   # corrige sem breaking changes
npm audit fix --force           # pode subir major (revise!)
npm audit signatures            # verifica integridade dos pacotes</code></pre>

        <h2>Snyk e OSV-Scanner</h2>
        <pre><code class="language-bash">npx snyk test                   # auditoria
npx snyk monitor                # registra snapshot no painel
npx snyk test --severity-threshold=high

# OSV (Google) — também cobre Go, Python, etc.
go install github.com/google/osv-scanner/cmd/osv-scanner@latest
osv-scanner -L package-lock.json</code></pre>

        <h2>Em CI</h2>
        <pre><code class="language-bash">npm audit --omit=dev --audit-level=high
# falha o build se achar high ou critical em deps de produção</code></pre>

        <h2>Casos de uso</h2>
        <ul>
          <li>Hook de pre-commit ou pre-push para travar deps vulneráveis.</li>
          <li>Job semanal de CI que abre PRs com correções.</li>
          <li>Compliance e auditoria (SOC2, ISO).</li>
          <li>Triagem de incidentes (foi só você ou o ecossistema todo?).</li>
        </ul>

        <h2>Boas práticas</h2>
        <ul>
          <li>Configure <strong>Dependabot</strong> ou <strong>Renovate</strong> para PRs automáticos de upgrade.</li>
          <li>Não rode <code>--force</code> sem ler o changelog — pode quebrar produção.</li>
          <li>Use <code>npm ci</code> em vez de <code>npm install</code> em CI para reproduzibilidade.</li>
          <li>Trate vulnerabilidade em devDep com calma; em prod com urgência.</li>
          <li>Considere <strong>SBOMs</strong> (CycloneDX) para rastreabilidade.</li>
        </ul>

        <div class="callout callout-tip"><div class="callout-title">Dependabot</div><div>Crie <code>.github/dependabot.yml</code> com agendamento semanal e o GitHub abre PRs automáticos de upgrade.</div></div>
        <div class="callout callout-warn"><div class="callout-title">Falsos positivos</div><div>Nem toda vulnerabilidade afeta seu uso. Avalie o vetor (apenas devDep? só em SSR?) antes de quebrar a build.</div></div>
      `}} />
    </article>
  );
}

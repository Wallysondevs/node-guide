export default function RateSecrets() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · intermediario · 5 min</div>
      <h1>Rate limit avançado e secrets</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>Rate por usuário</strong>: chave = <code>userId</code> em vez de IP</li><li><strong>Sliding window</strong>: mais preciso que fixed (use <code>rate-limit-redis</code>)</li><li><strong>Penalidades progressivas</strong>: bloqueio temporário em /login após N falhas</li><li><strong>Secret rotation</strong>: rotacione JWT_SECRET periodicamente, suportando 2 chaves no transition</li></ul><pre><code class="language-js">// secrets em prod: AWS Secrets Manager, Vault, Doppler, Infisical
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
const sm = new SecretsManager({});
const secret = JSON.parse((await sm.getSecretValue({ SecretId: 'prod/api' })).SecretString);</code></pre>`}} />
    </article>
  );
}

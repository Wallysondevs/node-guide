export default function Owasp() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Segurança · intermediario · 7 min</div>
      <h1>OWASP Top 10 em Node</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>Injection</strong>: SQL/NoSQL — sempre parametrize</li><li><strong>Auth quebrado</strong>: bcrypt, rate-limit em /login</li><li><strong>Exposição de dados</strong>: nunca retorne hash de senha</li><li><strong>XXE</strong>: desabilite parsing externo em XML</li><li><strong>Access control</strong>: cheque autorização em todo endpoint</li><li><strong>Misconfig</strong>: helmet, CORS apertado</li><li><strong>XSS</strong>: escape HTML, CSP</li><li><strong>Deserialization</strong>: nunca <code>JSON.parse</code> sem validar</li><li><strong>Vulneráveis deps</strong>: <code>npm audit</code>, dependabot</li><li><strong>Logs insuficientes</strong>: log access + auth events</li></ul>`}} />
    </article>
  );
}

export default function SessionsCookies() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Auth · intermediario · 5 min</div>
      <h1>Sessions vs JWT</h1>
      <div dangerouslySetInnerHTML={{__html: `<ul><li><strong>Sessions</strong>: estado no servidor (Redis). Cookie só com ID. Fácil revogar. Bom para web tradicional.</li><li><strong>JWT</strong>: estado no token. Stateless. Difícil revogar antes de expirar. Bom para SPA/mobile/microserviços.</li></ul><p>Para a maioria dos web apps modernos, <strong>sessions com cookie HttpOnly</strong> são mais seguras e simples que JWT.</p>`}} />
    </article>
  );
}

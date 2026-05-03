export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-6">
      <h1 className="text-7xl font-extrabold text-primary mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-6">Capítulo não encontrado.</p>
      <a href="#/" className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
        ← Voltar ao início
      </a>
    </div>
  );
}

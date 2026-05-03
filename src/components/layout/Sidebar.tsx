import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, X, Hexagon, Search, BookOpen, Code2, Package, FileText, FolderTree, Cog, Waves, Radio, Clock, Globe, Server, Zap, Database, Lock, Network, Wifi, TestTube, Hammer, Rocket, Gauge, Shield, Layers } from "lucide-react";

const NAV = [
  {
    section: "Introdução",
    icon: BookOpen,
    items: [
      { slug: "o-que-e-node", title: "O que é Node.js" },
      { slug: "event-loop", title: "O Event Loop" },
      { slug: "npm-cli", title: "npm, npx e pnpm" },
      { slug: "repl", title: "REPL e flags úteis" },
      { slug: "primeiro-projeto", title: "Primeiro projeto" }
    ],
  },
  {
    section: "Fundamentos JS",
    icon: Code2,
    items: [
      { slug: "tipos-primitivos", title: "Tipos primitivos" },
      { slug: "var-let-const", title: "var, let e const" },
      { slug: "operadores", title: "Operadores" },
      { slug: "funcoes", title: "Funções e arrow" },
      { slug: "this", title: "this, bind, call e apply" },
      { slug: "closures", title: "Closures" },
      { slug: "classes", title: "Classes ES2022+" },
      { slug: "destructuring-spread", title: "Destructuring e spread" }
    ],
  },
  {
    section: "Módulos",
    icon: Package,
    items: [
      { slug: "commonjs", title: "CommonJS (require)" },
      { slug: "esm", title: "ES Modules (import/export)" },
      { slug: "package-json", title: "package.json" },
      { slug: "exports-field", title: "Exports field" },
      { slug: "dual-package", title: "Dual ESM + CJS" },
      { slug: "tipos-de-deps", title: "dependencies vs dev vs peer" },
      { slug: "workspaces", title: "Workspaces e monorepos" }
    ],
  },
  {
    section: "fs",
    icon: FileText,
    items: [
      { slug: "fs-leitura", title: "Lendo arquivos" },
      { slug: "fs-escrita", title: "Escrevendo arquivos" },
      { slug: "fs-streams", title: "Streams de arquivo" },
      { slug: "fs-paths", title: "path: cross-platform" },
      { slug: "fs-watch", title: "fs.watch e --watch" },
      { slug: "fs-glob", title: "Glob e walk" },
      { slug: "fs-stat", title: "Stat, exists e tipo" }
    ],
  },
  {
    section: "path/os/url",
    icon: FolderTree,
    items: [
      { slug: "os-info", title: "Informações do sistema" },
      { slug: "url-whatwg", title: "URL e querystring" },
      { slug: "url-search-params", title: "URLSearchParams" },
      { slug: "path-avancado", title: "path: casos avançados" },
      { slug: "crypto-uuid", title: "crypto e UUIDs" }
    ],
  },
  {
    section: "process/env",
    icon: Cog,
    items: [
      { slug: "process-argv", title: "process.argv" },
      { slug: "process-env", title: "process.env e .env" },
      { slug: "process-exit", title: "Exit codes e signals" },
      { slug: "process-info", title: "Memória, PID, CWD" },
      { slug: "dotenv", title: "Múltiplos .env" }
    ],
  },
  {
    section: "Streams & Buffers",
    icon: Waves,
    items: [
      { slug: "buffer", title: "Buffer" },
      { slug: "encoding", title: "Encodings" },
      { slug: "readable-stream", title: "Readable streams" },
      { slug: "writable-stream", title: "Writable streams" },
      { slug: "transform", title: "Transform streams" },
      { slug: "pipeline", title: "pipe e pipeline" },
      { slug: "backpressure", title: "Backpressure" },
      { slug: "web-streams", title: "Web Streams" }
    ],
  },
  {
    section: "Eventos",
    icon: Radio,
    items: [
      { slug: "event-emitter", title: "EventEmitter" },
      { slug: "once-async", title: "once e async iteration" },
      { slug: "error-event", title: "O evento error" },
      { slug: "abort-controller", title: "AbortController" },
      { slug: "async-local-storage", title: "AsyncLocalStorage" }
    ],
  },
  {
    section: "Async",
    icon: Clock,
    items: [
      { slug: "callbacks", title: "Callbacks" },
      { slug: "promises", title: "Promises" },
      { slug: "async-await", title: "async/await" },
      { slug: "promise-all", title: "Promise.all/race/any/allSettled" },
      { slug: "queue-microtask", title: "Microtasks: nextTick e queueMicrotask" },
      { slug: "timers", title: "setTimeout, setInterval, setImmediate" },
      { slug: "abort-async", title: "Cancelando async" },
      { slug: "padroes-async", title: "Padrões: pool, sequential, retry" }
    ],
  },
  {
    section: "HTTP nativo",
    icon: Globe,
    items: [
      { slug: "http-server", title: "Servidor HTTP cru" },
      { slug: "http-client", title: "HTTP client (fetch)" },
      { slug: "headers-cookies", title: "Headers e cookies" },
      { slug: "https", title: "HTTPS e certificados" },
      { slug: "http2", title: "HTTP/2" },
      { slug: "undici", title: "Undici: client moderno" }
    ],
  },
  {
    section: "Express",
    icon: Server,
    items: [
      { slug: "express-setup", title: "Express: setup" },
      { slug: "express-routing", title: "Roteamento e parâmetros" },
      { slug: "express-middleware", title: "Middleware" },
      { slug: "express-router", title: "Router modular" },
      { slug: "express-validation", title: "Validação com Zod" },
      { slug: "express-static", title: "Static files e uploads" },
      { slug: "express-async", title: "Async handlers" },
      { slug: "express-error-handler", title: "Error handler" },
      { slug: "express-cors-helmet", title: "CORS, helmet, compression" },
      { slug: "express-sessions", title: "Sessions e cookies" },
      { slug: "express-vs-fastify", title: "Express vs Fastify" }
    ],
  },
  {
    section: "Fastify",
    icon: Zap,
    items: [
      { slug: "fastify-setup", title: "Fastify: setup" },
      { slug: "fastify-schemas", title: "Schemas e validação" },
      { slug: "fastify-hooks", title: "Hooks" },
      { slug: "fastify-plugins", title: "Plugins" },
      { slug: "fastify-decorators", title: "Decorators" },
      { slug: "fastify-performance", title: "Performance e produção" }
    ],
  },
  {
    section: "Banco de dados",
    icon: Database,
    items: [
      { slug: "pg", title: "PostgreSQL com pg" },
      { slug: "mysql2", title: "MySQL com mysql2" },
      { slug: "prisma-intro", title: "Prisma: schema e migrate" },
      { slug: "prisma-crud", title: "Prisma: CRUD" },
      { slug: "drizzle-intro", title: "Drizzle: setup" },
      { slug: "drizzle-crud", title: "Drizzle: queries" },
      { slug: "mongodb", title: "MongoDB" },
      { slug: "redis", title: "Redis com ioredis" }
    ],
  },
  {
    section: "Auth",
    icon: Lock,
    items: [
      { slug: "bcrypt", title: "Senhas com bcrypt" },
      { slug: "jwt", title: "JWT (JSON Web Tokens)" },
      { slug: "sessions-cookies", title: "Sessions vs JWT" },
      { slug: "oauth", title: "OAuth 2.0 com Google" },
      { slug: "passport", title: "Passport.js" },
      { slug: "helmet-csrf", title: "Helmet, CSRF, secure cookies" }
    ],
  },
  {
    section: "API design",
    icon: Network,
    items: [
      { slug: "rest", title: "Design REST" },
      { slug: "versioning", title: "Versionamento" },
      { slug: "validacao-zod", title: "Validação completa com Zod" },
      { slug: "paginacao", title: "Paginação" },
      { slug: "openapi", title: "OpenAPI / Swagger" },
      { slug: "rate-limit", title: "Rate limiting" }
    ],
  },
  {
    section: "Realtime",
    icon: Wifi,
    items: [
      { slug: "ws", title: "WebSocket com ws" },
      { slug: "socketio-setup", title: "Socket.IO: setup" },
      { slug: "socketio-rooms", title: "Rooms e namespaces" },
      { slug: "broadcast", title: "Broadcast e adapters" },
      { slug: "presence", title: "Presença online" }
    ],
  },
  {
    section: "Testing",
    icon: TestTube,
    items: [
      { slug: "node-test", title: "node:test (built-in)" },
      { slug: "vitest", title: "Vitest" },
      { slug: "jest", title: "Jest" },
      { slug: "supertest", title: "Supertest: testar HTTP" },
      { slug: "mocks", title: "Mocks, spies e fixtures" },
      { slug: "coverage", title: "Coverage e CI" }
    ],
  },
  {
    section: "Build & TS",
    icon: Hammer,
    items: [
      { slug: "typescript", title: "TypeScript em Node" },
      { slug: "tsx", title: "tsx, ts-node, swc" },
      { slug: "esbuild", title: "esbuild" },
      { slug: "tsup", title: "tsup" },
      { slug: "lint-prettier", title: "ESLint e Prettier" },
      { slug: "project-references", title: "Project references" }
    ],
  },
  {
    section: "Deploy",
    icon: Rocket,
    items: [
      { slug: "pm2", title: "PM2" },
      { slug: "docker", title: "Dockerizando Node" },
      { slug: "env-config", title: "Configuração por env" },
      { slug: "healthcheck", title: "Healthchecks" },
      { slug: "logs-prod", title: "Logs estruturados (Pino)" }
    ],
  },
  {
    section: "Performance",
    icon: Gauge,
    items: [
      { slug: "profiler", title: "Profiler embutido" },
      { slug: "clinic", title: "Clinic.js" },
      { slug: "memory-leak", title: "Caçando memory leaks" },
      { slug: "worker-threads", title: "Worker threads" },
      { slug: "cluster", title: "Cluster" },
      { slug: "caching", title: "Caching: in-memory e Redis" }
    ],
  },
  {
    section: "Segurança",
    icon: Shield,
    items: [
      { slug: "owasp", title: "OWASP Top 10 em Node" },
      { slug: "cors", title: "CORS detalhado" },
      { slug: "csrf", title: "CSRF" },
      { slug: "rate-secrets", title: "Rate limit avançado e secrets" },
      { slug: "npm-audit", title: "npm audit e Snyk" }
    ],
  },
  {
    section: "Projetos",
    icon: Layers,
    items: [
      { slug: "projeto-api-crud", title: "Projeto: API CRUD completa" },
      { slug: "projeto-cli", title: "Projeto: CLI tool" },
      { slug: "projeto-scraper", title: "Projeto: web scraper" },
      { slug: "projeto-chat", title: "Projeto: chat realtime" },
      { slug: "projeto-microservico", title: "Projeto: microserviço" },
      { slug: "projeto-graphql", title: "Projeto: GraphQL" },
      { slug: "projeto-queue", title: "Projeto: queue worker" }
    ],
  }
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useHashLocation();
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const s: Record<string, boolean> = {};
    NAV.forEach(n => { s[n.section] = true; });
    return s;
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return NAV;
    const q = search.toLowerCase();
    return NAV
      .map(s => ({
        ...s,
        items: s.items.filter(i => i.title.toLowerCase().includes(q) || i.slug.includes(q)),
      }))
      .filter(s => s.items.length > 0);
  }, [search]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-card border-r border-border flex flex-col transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-primary" />
            <span className="font-bold">Node Guide</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:bg-muted"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-3 border-b border-border shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar capítulo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {filtered.map(section => {
            const Icon = section.icon;
            const open = openSections[section.section] !== false;
            return (
              <div key={section.section}>
                <button
                  onClick={() => setOpenSections(s => ({ ...s, [section.section]: !open }))}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50"
                >
                  {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  <Icon className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wide">{section.section}</span>
                  <span className="ml-auto text-[10px] opacity-50">{section.items.length}</span>
                </button>
                {open && (
                  <div className="ml-4 mt-0.5 space-y-px border-l border-border/50 pl-2">
                    {section.items.map(item => {
                      const path = "/" + item.slug;
                      const active = location === path;
                      return (
                        <Link
                          key={item.slug}
                          href={path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block px-2 py-1 text-xs rounded-md transition-colors",
                            active
                              ? "bg-primary/15 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border text-[10px] text-muted-foreground shrink-0">
          141 capítulos · MIT · <a className="text-primary hover:underline" href="https://github.com/Wallysondevs/node-guide" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </aside>
    </>
  );
}

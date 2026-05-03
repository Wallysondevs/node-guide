import { BookOpen, Code2, Package, FileText, FolderTree, Cog, Waves, Radio, Clock, Globe, Server, Zap, Database, Lock, Network, Wifi, TestTube, Hammer, Rocket, Gauge, Shield, Layers, Hexagon, Github, Rocket, Coffee } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Hexagon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Node Guide</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          O livro completo de <strong>Node.js</strong> em português — do event loop a deploy em produção.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Coffee className="w-3 h-3" /> 141 capítulos</span>
          <span>·</span>
          <span>22 seções</span>
          <span>·</span>
          <a href="https://github.com/Wallysondevs/node-guide" className="flex items-center gap-1 hover:text-primary" target="_blank" rel="noreferrer">
            <Github className="w-3 h-3" /> GitHub
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        <a href="#/o-que-e-node" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Introdução</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">O que é Node.js · O Event Loop · npm, npx e pnpm</p>
        </a>
        <a href="#/tipos-primitivos" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Fundamentos JS</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">8</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Tipos primitivos · var, let e const · Operadores</p>
        </a>
        <a href="#/commonjs" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Módulos</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">7</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">CommonJS (require) · ES Modules (import/export) · package.json</p>
        </a>
        <a href="#/fs-leitura" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">fs</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">7</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Lendo arquivos · Escrevendo arquivos · Streams de arquivo</p>
        </a>
        <a href="#/os-info" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <FolderTree className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">path/os/url</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Informações do sistema · URL e querystring · URLSearchParams</p>
        </a>
        <a href="#/process-argv" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Cog className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">process/env</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">process.argv · process.env e .env · Exit codes e signals</p>
        </a>
        <a href="#/buffer" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Streams & Buffers</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">8</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Buffer · Encodings · Readable streams</p>
        </a>
        <a href="#/event-emitter" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Eventos</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">EventEmitter · once e async iteration · O evento error</p>
        </a>
        <a href="#/callbacks" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Async</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">8</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Callbacks · Promises · async/await</p>
        </a>
        <a href="#/http-server" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">HTTP nativo</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Servidor HTTP cru · HTTP client (fetch) · Headers e cookies</p>
        </a>
        <a href="#/express-setup" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Express</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">11</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Express: setup · Roteamento e parâmetros · Middleware</p>
        </a>
        <a href="#/fastify-setup" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Fastify</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Fastify: setup · Schemas e validação · Hooks</p>
        </a>
        <a href="#/pg" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Banco de dados</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">8</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">PostgreSQL com pg · MySQL com mysql2 · Prisma: schema e migrate</p>
        </a>
        <a href="#/bcrypt" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Auth</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Senhas com bcrypt · JWT (JSON Web Tokens) · Sessions vs JWT</p>
        </a>
        <a href="#/rest" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">API design</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Design REST · Versionamento · Validação completa com Zod</p>
        </a>
        <a href="#/ws" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Realtime</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">WebSocket com ws · Socket.IO: setup · Rooms e namespaces</p>
        </a>
        <a href="#/node-test" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Testing</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">node:test (built-in) · Vitest · Jest</p>
        </a>
        <a href="#/typescript" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Hammer className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Build & TS</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">TypeScript em Node · tsx, ts-node, swc · esbuild</p>
        </a>
        <a href="#/pm2" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Deploy</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">PM2 · Dockerizando Node · Configuração por env</p>
        </a>
        <a href="#/profiler" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Performance</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">6</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Profiler embutido · Clinic.js · Caçando memory leaks</p>
        </a>
        <a href="#/owasp" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Segurança</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">5</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">OWASP Top 10 em Node · CORS detalhado · CSRF</p>
        </a>
        <a href="#/projeto-api-crud" className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Projetos</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">7</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">Projeto: API CRUD completa · Projeto: CLI tool · Projeto: web scraper</p>
        </a>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <Rocket className="w-6 h-6 text-primary mx-auto mb-2" />
        <h2 className="font-semibold mb-1">Comece agora</h2>
        <p className="text-sm text-muted-foreground mb-4">Do zero ao deploy em capítulos curtos e práticos.</p>
        <a href="#/o-que-e-node" className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          Começar pelo capítulo 1 →
        </a>
      </div>
    </div>
  );
}

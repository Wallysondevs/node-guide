import { useState, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const OQueENode = lazy(() => import("@/pages/OQueENode"));
const EventLoop = lazy(() => import("@/pages/EventLoop"));
const NpmCli = lazy(() => import("@/pages/NpmCli"));
const Repl = lazy(() => import("@/pages/Repl"));
const PrimeiroProjeto = lazy(() => import("@/pages/PrimeiroProjeto"));
const TiposPrimitivos = lazy(() => import("@/pages/TiposPrimitivos"));
const VarLetConst = lazy(() => import("@/pages/VarLetConst"));
const Operadores = lazy(() => import("@/pages/Operadores"));
const Funcoes = lazy(() => import("@/pages/Funcoes"));
const This = lazy(() => import("@/pages/This"));
const Closures = lazy(() => import("@/pages/Closures"));
const Classes = lazy(() => import("@/pages/Classes"));
const DestructuringSpread = lazy(() => import("@/pages/DestructuringSpread"));
const Commonjs = lazy(() => import("@/pages/Commonjs"));
const Esm = lazy(() => import("@/pages/Esm"));
const PackageJson = lazy(() => import("@/pages/PackageJson"));
const ExportsField = lazy(() => import("@/pages/ExportsField"));
const DualPackage = lazy(() => import("@/pages/DualPackage"));
const TiposDeDeps = lazy(() => import("@/pages/TiposDeDeps"));
const Workspaces = lazy(() => import("@/pages/Workspaces"));
const FsLeitura = lazy(() => import("@/pages/FsLeitura"));
const FsEscrita = lazy(() => import("@/pages/FsEscrita"));
const FsStreams = lazy(() => import("@/pages/FsStreams"));
const FsPaths = lazy(() => import("@/pages/FsPaths"));
const FsWatch = lazy(() => import("@/pages/FsWatch"));
const FsGlob = lazy(() => import("@/pages/FsGlob"));
const FsStat = lazy(() => import("@/pages/FsStat"));
const OsInfo = lazy(() => import("@/pages/OsInfo"));
const UrlWhatwg = lazy(() => import("@/pages/UrlWhatwg"));
const UrlSearchParams = lazy(() => import("@/pages/UrlSearchParams"));
const PathAvancado = lazy(() => import("@/pages/PathAvancado"));
const CryptoUuid = lazy(() => import("@/pages/CryptoUuid"));
const ProcessArgv = lazy(() => import("@/pages/ProcessArgv"));
const ProcessEnv = lazy(() => import("@/pages/ProcessEnv"));
const ProcessExit = lazy(() => import("@/pages/ProcessExit"));
const ProcessInfo = lazy(() => import("@/pages/ProcessInfo"));
const Dotenv = lazy(() => import("@/pages/Dotenv"));
const Buffer = lazy(() => import("@/pages/Buffer"));
const Encoding = lazy(() => import("@/pages/Encoding"));
const ReadableStream = lazy(() => import("@/pages/ReadableStream"));
const WritableStream = lazy(() => import("@/pages/WritableStream"));
const Transform = lazy(() => import("@/pages/Transform"));
const Pipeline = lazy(() => import("@/pages/Pipeline"));
const Backpressure = lazy(() => import("@/pages/Backpressure"));
const WebStreams = lazy(() => import("@/pages/WebStreams"));
const EventEmitter = lazy(() => import("@/pages/EventEmitter"));
const OnceAsync = lazy(() => import("@/pages/OnceAsync"));
const ErrorEvent = lazy(() => import("@/pages/ErrorEvent"));
const AbortController = lazy(() => import("@/pages/AbortController"));
const AsyncLocalStorage = lazy(() => import("@/pages/AsyncLocalStorage"));
const Callbacks = lazy(() => import("@/pages/Callbacks"));
const Promises = lazy(() => import("@/pages/Promises"));
const AsyncAwait = lazy(() => import("@/pages/AsyncAwait"));
const PromiseAll = lazy(() => import("@/pages/PromiseAll"));
const QueueMicrotask = lazy(() => import("@/pages/QueueMicrotask"));
const Timers = lazy(() => import("@/pages/Timers"));
const AbortAsync = lazy(() => import("@/pages/AbortAsync"));
const PadroesAsync = lazy(() => import("@/pages/PadroesAsync"));
const HttpServer = lazy(() => import("@/pages/HttpServer"));
const HttpClient = lazy(() => import("@/pages/HttpClient"));
const HeadersCookies = lazy(() => import("@/pages/HeadersCookies"));
const Https = lazy(() => import("@/pages/Https"));
const Http2 = lazy(() => import("@/pages/Http2"));
const Undici = lazy(() => import("@/pages/Undici"));
const ExpressSetup = lazy(() => import("@/pages/ExpressSetup"));
const ExpressRouting = lazy(() => import("@/pages/ExpressRouting"));
const ExpressMiddleware = lazy(() => import("@/pages/ExpressMiddleware"));
const ExpressRouter = lazy(() => import("@/pages/ExpressRouter"));
const ExpressValidation = lazy(() => import("@/pages/ExpressValidation"));
const ExpressStatic = lazy(() => import("@/pages/ExpressStatic"));
const ExpressAsync = lazy(() => import("@/pages/ExpressAsync"));
const ExpressErrorHandler = lazy(() => import("@/pages/ExpressErrorHandler"));
const ExpressCorsHelmet = lazy(() => import("@/pages/ExpressCorsHelmet"));
const ExpressSessions = lazy(() => import("@/pages/ExpressSessions"));
const ExpressVsFastify = lazy(() => import("@/pages/ExpressVsFastify"));
const FastifySetup = lazy(() => import("@/pages/FastifySetup"));
const FastifySchemas = lazy(() => import("@/pages/FastifySchemas"));
const FastifyHooks = lazy(() => import("@/pages/FastifyHooks"));
const FastifyPlugins = lazy(() => import("@/pages/FastifyPlugins"));
const FastifyDecorators = lazy(() => import("@/pages/FastifyDecorators"));
const FastifyPerformance = lazy(() => import("@/pages/FastifyPerformance"));
const Pg = lazy(() => import("@/pages/Pg"));
const Mysql2 = lazy(() => import("@/pages/Mysql2"));
const PrismaIntro = lazy(() => import("@/pages/PrismaIntro"));
const PrismaCrud = lazy(() => import("@/pages/PrismaCrud"));
const DrizzleIntro = lazy(() => import("@/pages/DrizzleIntro"));
const DrizzleCrud = lazy(() => import("@/pages/DrizzleCrud"));
const Mongodb = lazy(() => import("@/pages/Mongodb"));
const Redis = lazy(() => import("@/pages/Redis"));
const Bcrypt = lazy(() => import("@/pages/Bcrypt"));
const Jwt = lazy(() => import("@/pages/Jwt"));
const SessionsCookies = lazy(() => import("@/pages/SessionsCookies"));
const Oauth = lazy(() => import("@/pages/Oauth"));
const Passport = lazy(() => import("@/pages/Passport"));
const HelmetCsrf = lazy(() => import("@/pages/HelmetCsrf"));
const Rest = lazy(() => import("@/pages/Rest"));
const Versioning = lazy(() => import("@/pages/Versioning"));
const ValidacaoZod = lazy(() => import("@/pages/ValidacaoZod"));
const Paginacao = lazy(() => import("@/pages/Paginacao"));
const Openapi = lazy(() => import("@/pages/Openapi"));
const RateLimit = lazy(() => import("@/pages/RateLimit"));
const Ws = lazy(() => import("@/pages/Ws"));
const SocketioSetup = lazy(() => import("@/pages/SocketioSetup"));
const SocketioRooms = lazy(() => import("@/pages/SocketioRooms"));
const Broadcast = lazy(() => import("@/pages/Broadcast"));
const Presence = lazy(() => import("@/pages/Presence"));
const NodeTest = lazy(() => import("@/pages/NodeTest"));
const Vitest = lazy(() => import("@/pages/Vitest"));
const Jest = lazy(() => import("@/pages/Jest"));
const Supertest = lazy(() => import("@/pages/Supertest"));
const Mocks = lazy(() => import("@/pages/Mocks"));
const Coverage = lazy(() => import("@/pages/Coverage"));
const Typescript = lazy(() => import("@/pages/Typescript"));
const Tsx = lazy(() => import("@/pages/Tsx"));
const Esbuild = lazy(() => import("@/pages/Esbuild"));
const Tsup = lazy(() => import("@/pages/Tsup"));
const LintPrettier = lazy(() => import("@/pages/LintPrettier"));
const ProjectReferences = lazy(() => import("@/pages/ProjectReferences"));
const Pm2 = lazy(() => import("@/pages/Pm2"));
const Docker = lazy(() => import("@/pages/Docker"));
const EnvConfig = lazy(() => import("@/pages/EnvConfig"));
const Healthcheck = lazy(() => import("@/pages/Healthcheck"));
const LogsProd = lazy(() => import("@/pages/LogsProd"));
const Profiler = lazy(() => import("@/pages/Profiler"));
const Clinic = lazy(() => import("@/pages/Clinic"));
const MemoryLeak = lazy(() => import("@/pages/MemoryLeak"));
const WorkerThreads = lazy(() => import("@/pages/WorkerThreads"));
const Cluster = lazy(() => import("@/pages/Cluster"));
const Caching = lazy(() => import("@/pages/Caching"));
const Owasp = lazy(() => import("@/pages/Owasp"));
const Cors = lazy(() => import("@/pages/Cors"));
const Csrf = lazy(() => import("@/pages/Csrf"));
const RateSecrets = lazy(() => import("@/pages/RateSecrets"));
const NpmAudit = lazy(() => import("@/pages/NpmAudit"));
const ProjetoApiCrud = lazy(() => import("@/pages/ProjetoApiCrud"));
const ProjetoCli = lazy(() => import("@/pages/ProjetoCli"));
const ProjetoScraper = lazy(() => import("@/pages/ProjetoScraper"));
const ProjetoChat = lazy(() => import("@/pages/ProjetoChat"));
const ProjetoMicroservico = lazy(() => import("@/pages/ProjetoMicroservico"));
const ProjetoGraphql = lazy(() => import("@/pages/ProjetoGraphql"));
const ProjetoQueue = lazy(() => import("@/pages/ProjetoQueue"));

function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <WouterRouter hook={useHashLocation}>
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/" component={Home} />
        <Route path="/o-que-e-node" component={OQueENode} />
        <Route path="/event-loop" component={EventLoop} />
        <Route path="/npm-cli" component={NpmCli} />
        <Route path="/repl" component={Repl} />
        <Route path="/primeiro-projeto" component={PrimeiroProjeto} />
        <Route path="/tipos-primitivos" component={TiposPrimitivos} />
        <Route path="/var-let-const" component={VarLetConst} />
        <Route path="/operadores" component={Operadores} />
        <Route path="/funcoes" component={Funcoes} />
        <Route path="/this" component={This} />
        <Route path="/closures" component={Closures} />
        <Route path="/classes" component={Classes} />
        <Route path="/destructuring-spread" component={DestructuringSpread} />
        <Route path="/commonjs" component={Commonjs} />
        <Route path="/esm" component={Esm} />
        <Route path="/package-json" component={PackageJson} />
        <Route path="/exports-field" component={ExportsField} />
        <Route path="/dual-package" component={DualPackage} />
        <Route path="/tipos-de-deps" component={TiposDeDeps} />
        <Route path="/workspaces" component={Workspaces} />
        <Route path="/fs-leitura" component={FsLeitura} />
        <Route path="/fs-escrita" component={FsEscrita} />
        <Route path="/fs-streams" component={FsStreams} />
        <Route path="/fs-paths" component={FsPaths} />
        <Route path="/fs-watch" component={FsWatch} />
        <Route path="/fs-glob" component={FsGlob} />
        <Route path="/fs-stat" component={FsStat} />
        <Route path="/os-info" component={OsInfo} />
        <Route path="/url-whatwg" component={UrlWhatwg} />
        <Route path="/url-search-params" component={UrlSearchParams} />
        <Route path="/path-avancado" component={PathAvancado} />
        <Route path="/crypto-uuid" component={CryptoUuid} />
        <Route path="/process-argv" component={ProcessArgv} />
        <Route path="/process-env" component={ProcessEnv} />
        <Route path="/process-exit" component={ProcessExit} />
        <Route path="/process-info" component={ProcessInfo} />
        <Route path="/dotenv" component={Dotenv} />
        <Route path="/buffer" component={Buffer} />
        <Route path="/encoding" component={Encoding} />
        <Route path="/readable-stream" component={ReadableStream} />
        <Route path="/writable-stream" component={WritableStream} />
        <Route path="/transform" component={Transform} />
        <Route path="/pipeline" component={Pipeline} />
        <Route path="/backpressure" component={Backpressure} />
        <Route path="/web-streams" component={WebStreams} />
        <Route path="/event-emitter" component={EventEmitter} />
        <Route path="/once-async" component={OnceAsync} />
        <Route path="/error-event" component={ErrorEvent} />
        <Route path="/abort-controller" component={AbortController} />
        <Route path="/async-local-storage" component={AsyncLocalStorage} />
        <Route path="/callbacks" component={Callbacks} />
        <Route path="/promises" component={Promises} />
        <Route path="/async-await" component={AsyncAwait} />
        <Route path="/promise-all" component={PromiseAll} />
        <Route path="/queue-microtask" component={QueueMicrotask} />
        <Route path="/timers" component={Timers} />
        <Route path="/abort-async" component={AbortAsync} />
        <Route path="/padroes-async" component={PadroesAsync} />
        <Route path="/http-server" component={HttpServer} />
        <Route path="/http-client" component={HttpClient} />
        <Route path="/headers-cookies" component={HeadersCookies} />
        <Route path="/https" component={Https} />
        <Route path="/http2" component={Http2} />
        <Route path="/undici" component={Undici} />
        <Route path="/express-setup" component={ExpressSetup} />
        <Route path="/express-routing" component={ExpressRouting} />
        <Route path="/express-middleware" component={ExpressMiddleware} />
        <Route path="/express-router" component={ExpressRouter} />
        <Route path="/express-validation" component={ExpressValidation} />
        <Route path="/express-static" component={ExpressStatic} />
        <Route path="/express-async" component={ExpressAsync} />
        <Route path="/express-error-handler" component={ExpressErrorHandler} />
        <Route path="/express-cors-helmet" component={ExpressCorsHelmet} />
        <Route path="/express-sessions" component={ExpressSessions} />
        <Route path="/express-vs-fastify" component={ExpressVsFastify} />
        <Route path="/fastify-setup" component={FastifySetup} />
        <Route path="/fastify-schemas" component={FastifySchemas} />
        <Route path="/fastify-hooks" component={FastifyHooks} />
        <Route path="/fastify-plugins" component={FastifyPlugins} />
        <Route path="/fastify-decorators" component={FastifyDecorators} />
        <Route path="/fastify-performance" component={FastifyPerformance} />
        <Route path="/pg" component={Pg} />
        <Route path="/mysql2" component={Mysql2} />
        <Route path="/prisma-intro" component={PrismaIntro} />
        <Route path="/prisma-crud" component={PrismaCrud} />
        <Route path="/drizzle-intro" component={DrizzleIntro} />
        <Route path="/drizzle-crud" component={DrizzleCrud} />
        <Route path="/mongodb" component={Mongodb} />
        <Route path="/redis" component={Redis} />
        <Route path="/bcrypt" component={Bcrypt} />
        <Route path="/jwt" component={Jwt} />
        <Route path="/sessions-cookies" component={SessionsCookies} />
        <Route path="/oauth" component={Oauth} />
        <Route path="/passport" component={Passport} />
        <Route path="/helmet-csrf" component={HelmetCsrf} />
        <Route path="/rest" component={Rest} />
        <Route path="/versioning" component={Versioning} />
        <Route path="/validacao-zod" component={ValidacaoZod} />
        <Route path="/paginacao" component={Paginacao} />
        <Route path="/openapi" component={Openapi} />
        <Route path="/rate-limit" component={RateLimit} />
        <Route path="/ws" component={Ws} />
        <Route path="/socketio-setup" component={SocketioSetup} />
        <Route path="/socketio-rooms" component={SocketioRooms} />
        <Route path="/broadcast" component={Broadcast} />
        <Route path="/presence" component={Presence} />
        <Route path="/node-test" component={NodeTest} />
        <Route path="/vitest" component={Vitest} />
        <Route path="/jest" component={Jest} />
        <Route path="/supertest" component={Supertest} />
        <Route path="/mocks" component={Mocks} />
        <Route path="/coverage" component={Coverage} />
        <Route path="/typescript" component={Typescript} />
        <Route path="/tsx" component={Tsx} />
        <Route path="/esbuild" component={Esbuild} />
        <Route path="/tsup" component={Tsup} />
        <Route path="/lint-prettier" component={LintPrettier} />
        <Route path="/project-references" component={ProjectReferences} />
        <Route path="/pm2" component={Pm2} />
        <Route path="/docker" component={Docker} />
        <Route path="/env-config" component={EnvConfig} />
        <Route path="/healthcheck" component={Healthcheck} />
        <Route path="/logs-prod" component={LogsProd} />
        <Route path="/profiler" component={Profiler} />
        <Route path="/clinic" component={Clinic} />
        <Route path="/memory-leak" component={MemoryLeak} />
        <Route path="/worker-threads" component={WorkerThreads} />
        <Route path="/cluster" component={Cluster} />
        <Route path="/caching" component={Caching} />
        <Route path="/owasp" component={Owasp} />
        <Route path="/cors" component={Cors} />
        <Route path="/csrf" component={Csrf} />
        <Route path="/rate-secrets" component={RateSecrets} />
        <Route path="/npm-audit" component={NpmAudit} />
        <Route path="/projeto-api-crud" component={ProjetoApiCrud} />
        <Route path="/projeto-cli" component={ProjetoCli} />
        <Route path="/projeto-scraper" component={ProjetoScraper} />
        <Route path="/projeto-chat" component={ProjetoChat} />
        <Route path="/projeto-microservico" component={ProjetoMicroservico} />
        <Route path="/projeto-graphql" component={ProjetoGraphql} />
        <Route path="/projeto-queue" component={ProjetoQueue} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </div>
    </WouterRouter>
  );
}

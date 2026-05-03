import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function i(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Deploy · intermediario · 10 min"}),e.jsx("h1",{children:"Dockerizando Node"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Containerizar uma app Node serve para garantir paridade entre dev/staging/prod, simplificar deploy (Kubernetes, ECS, Fly.io) e isolar dependências de SO. Imagens bem-feitas pesam &lt; 150 MB e bootam em segundos.</p>

<h2>Conceito</h2>
<p>Use <strong>multi-stage builds</strong>: um stage instala dependências e compila, outro só copia o resultado. Isso reduz tamanho final e elimina ferramentas de build da imagem de produção.</p>
<p>Outras práticas: rodar como usuário não-root, usar <code>npm ci</code> (não <code>install</code>), aproveitar cache de layers ordenando comandos do menos volátil ao mais volátil.</p>

<h2>Exemplo prático</h2>
<p>Estrutura típica de projeto:</p>
<pre><code class="language-bash">my-api/
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── src/</code></pre>

<p><code>.dockerignore</code> — fundamental para builds rápidos:</p>
<pre><code class="language-bash">node_modules
dist
.git
.env*
coverage
*.log</code></pre>

<p>Dockerfile multi-stage para TS:</p>
<pre><code class="language-dockerfile">FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=deps  /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node -e "fetch('http://localhost:3000/health').then(r=&gt;process.exit(r.ok?0:1)).catch(()=&gt;process.exit(1))"
CMD ["node", "dist/index.js"]</code></pre>

<p>Build e run:</p>
<pre><code class="language-bash">docker build -t minha-api:1.0 .
docker run --rm -p 3000:3000 \\
  -e DATABASE_URL=postgres://... \\
  -e NODE_ENV=production \\
  minha-api:1.0

# inspecionar tamanho
docker images minha-api</code></pre>

<p>Para desenvolvimento, <code>docker compose</code> sobe app + Postgres + Redis:</p>
<pre><code class="language-yaml">services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://app:app@db:5432/app
    depends_on: [db]
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:</code></pre>

<h2>Boas práticas</h2>
<ul>
<li><strong>Pin a versão</strong>: <code>node:20.11-alpine</code>, não <code>node:latest</code>.</li>
<li><strong>USER node</strong> — nunca rode como root em produção.</li>
<li><strong>Sinais</strong>: use <code>CMD ["node", ...]</code> em forma exec; isso permite que SIGTERM chegue ao processo.</li>
<li><strong>Layers</strong>: copie <code>package*.json</code> antes do código para cachear <code>npm ci</code>.</li>
<li><strong>Distroless</strong> (<code>gcr.io/distroless/nodejs20</code>) reduz superfície de ataque ainda mais.</li>
</ul>

<div class="callout callout-warn"><div class="callout-title">Não copie .env</div><div>Sempre coloque <code>.env*</code> no <code>.dockerignore</code>. Variáveis de produção vêm do orquestrador (compose, k8s secrets, ECS task def).</div></div>

<div class="callout callout-tip"><div class="callout-title">Imagens menores</div><div>Use <code>node:20-alpine</code> (~50 MB) ou imagens <code>distroless</code>. Para apps com binários nativos (<code>sharp</code>, <code>node-canvas</code>), pode ser preciso usar <code>node:20-slim</code>.</div></div>`}})]})}export{i as default};

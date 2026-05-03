export default function Docker() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Deploy · intermediario · 7 min</div>
      <h1>Dockerizando Node</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-docker"># multi-stage Dockerfile
FROM node:20-alpine AS deps
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
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]</code></pre><pre><code class="language-bash">docker build -t minha-api .
docker run -p 3000:3000 -e DATABASE_URL=... minha-api</code></pre><div class="callout callout-tip"><div class="callout-title">Imagens menores</div><div>Use <code>node:20-alpine</code> ou <code>distroless</code>. Evite copiar node_modules de dev.</div></div>`}} />
    </article>
  );
}

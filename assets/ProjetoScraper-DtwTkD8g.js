import{j as e}from"./index-DA-7IjJ5.js";import"./router-C1uOM3Rc.js";import"./vendor-t4EjNNdb.js";import"./icons-CF3mSuKt.js";function a(){return e.jsxs("article",{className:"chapter max-w-3xl mx-auto px-6 py-10",children:[e.jsx("div",{className:"text-xs text-muted-foreground mb-2 font-mono",children:"Projetos · intermediario · 11 min"}),e.jsx("h1",{children:"Projeto: web scraper"}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Scraper que faz crawl de um site, extrai títulos/links com <strong>cheerio</strong>, respeita <code>robots.txt</code>, controla concorrência com <code>p-limit</code>, persiste em SQLite e suporta retomada após falha.</p>

<h2>Estrutura</h2>
<pre><code class="language-bash">scraper/
├─ package.json
└─ src/
   ├─ index.js          # orquestrador
   ├─ fetcher.js        # fetch com retry
   ├─ parser.js         # cheerio
   ├─ robots.js         # robots.txt
   └─ store.js          # SQLite</code></pre>

<h2>Setup</h2>
<pre><code class="language-bash">npm i cheerio p-limit p-retry better-sqlite3 robots-parser</code></pre>

<h2>robots.txt</h2>
<pre><code class="language-js">// src/robots.js
import robotsParser from 'robots-parser';

const cache = new Map();
export async function allowed(url, userAgent = 'MyScraper/1.0') {
  const u = new URL(url);
  const robotsUrl = u.origin + '/robots.txt';
  if (!cache.has(u.origin)) {
    try {
      const txt = await (await fetch(robotsUrl)).text();
      cache.set(u.origin, robotsParser(robotsUrl, txt));
    } catch { cache.set(u.origin, null); }
  }
  const r = cache.get(u.origin);
  return r ? r.isAllowed(url, userAgent) : true;
}</code></pre>

<h2>Fetcher com retry</h2>
<pre><code class="language-js">// src/fetcher.js
import pRetry from 'p-retry';

export async function fetchHtml(url) {
  return pRetry(async () =&gt; {
    const r = await fetch(url, {
      headers: { 'user-agent': 'MyScraper/1.0 (+https://example.com)' },
      signal: AbortSignal.timeout(15_000)
    });
    if (r.status === 429 || r.status &gt;= 500) throw new Error('retryable ' + r.status);
    if (!r.ok) throw new pRetry.AbortError('status ' + r.status);
    return await r.text();
  }, { retries: 3, minTimeout: 1000, factor: 2 });
}</code></pre>

<h2>Parser</h2>
<pre><code class="language-js">// src/parser.js
import * as cheerio from 'cheerio';

export function parse(html, baseUrl) {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim();
  const headings = $('h1, h2').map((_, el) =&gt; $(el).text().trim()).get();
  const links = $('a[href]')
    .map((_, el) =&gt; $(el).attr('href'))
    .get()
    .map(href =&gt; { try { return new URL(href, baseUrl).toString(); } catch { return null; } })
    .filter(Boolean);
  return { title, headings, links };
}</code></pre>

<h2>Store (SQLite)</h2>
<pre><code class="language-js">// src/store.js
import Database from 'better-sqlite3';
const db = new Database('crawl.db');
db.exec(
  'CREATE TABLE IF NOT EXISTS pages(url TEXT PRIMARY KEY, title TEXT, headings TEXT, links TEXT, scraped_at INTEGER);' +
  'CREATE TABLE IF NOT EXISTS queue(url TEXT PRIMARY KEY, depth INTEGER, status TEXT DEFAULT "pending");'
);
export const upsertPage = db.prepare('INSERT OR REPLACE INTO pages VALUES (?,?,?,?,?)');
export const enqueue = db.prepare('INSERT OR IGNORE INTO queue(url, depth) VALUES (?,?)');
export const nextBatch = db.prepare('SELECT url, depth FROM queue WHERE status = "pending" LIMIT ?');
export const markDone = db.prepare('UPDATE queue SET status = "done" WHERE url = ?');
export const markFail = db.prepare('UPDATE queue SET status = "failed" WHERE url = ?');</code></pre>

<h2>Orquestrador</h2>
<pre><code class="language-js">// src/index.js
import pLimit from 'p-limit';
import { allowed } from './robots.js';
import { fetchHtml } from './fetcher.js';
import { parse } from './parser.js';
import { upsertPage, enqueue, nextBatch, markDone, markFail } from './store.js';

const SEED = process.argv[2] || 'https://example.com';
const MAX_DEPTH = 2;
const limit = pLimit(5);
const seedHost = new URL(SEED).host;

enqueue.run(SEED, 0);

async function processOne({ url, depth }) {
  try {
    if (!(await allowed(url))) return markDone.run(url);
    const html = await fetchHtml(url);
    const { title, headings, links } = parse(html, url);
    upsertPage.run(url, title, JSON.stringify(headings), JSON.stringify(links), Date.now());
    if (depth &lt; MAX_DEPTH) {
      for (const l of links) {
        try { if (new URL(l).host === seedHost) enqueue.run(l, depth + 1); } catch {}
      }
    }
    markDone.run(url);
    console.log('ok', url, '·', headings.length, 'h');
  } catch (e) {
    console.error('fail', url, e.message);
    markFail.run(url);
  }
}

while (true) {
  const batch = nextBatch.all(50);
  if (!batch.length) break;
  await Promise.all(batch.map(item =&gt; limit(() =&gt; processOne(item))));
}
console.log('done');</code></pre>

<h2>Como rodar</h2>
<pre><code class="language-bash">node src/index.js https://example.com
sqlite3 crawl.db 'SELECT count(*) FROM pages'</code></pre>

<div class="callout callout-warn"><div class="callout-title">Ética e legalidade</div><div>Respeite <code>robots.txt</code>, identifique-se no <code>User-Agent</code>, limite concorrência e taxa, e revise os termos de uso do site. Scraping agressivo pode violar leis (LGPD/CFAA).</div></div>

<h2>Boas práticas</h2>
<ul>
  <li><strong>Estado em disco</strong> (SQLite) permite retomar após crash sem reprocessar tudo.</li>
  <li>Defina <code>AbortSignal.timeout</code> em todo fetch — sites travam.</li>
  <li>Filtre por host para não escapar do domínio alvo.</li>
  <li>Backoff exponencial em 429/5xx; respeite <code>Retry-After</code>.</li>
  <li>Para sites SPA, use <strong>Playwright</strong> em vez de fetch + cheerio.</li>
</ul>

<div class="callout callout-tip"><div class="callout-title">Escala</div><div>Para milhões de URLs, troque o loop por uma fila distribuída (BullMQ/Redis) e múltiplos workers em containers.</div></div>`}})]})}export{a as default};

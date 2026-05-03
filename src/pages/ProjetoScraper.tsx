export default function ProjetoScraper() {
  return (
    <article className="chapter max-w-3xl mx-auto px-6 py-10">
      <div className="text-xs text-muted-foreground mb-2 font-mono">Projetos · intermediario · 7 min</div>
      <h1>Projeto: web scraper</h1>
      <div dangerouslySetInnerHTML={{__html: `<pre><code class="language-bash">npm i cheerio p-limit</code></pre><pre><code class="language-js">import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import { writeFile } from 'node:fs/promises';

const limit = pLimit(5);

async function scrapePage(url) {
  const html = await (await fetch(url)).text();
  const $ = cheerio.load(html);
  return {
    url,
    title: $('title').text(),
    headings: $('h1, h2').map((_, el) =&gt; $(el).text().trim()).get(),
    links: $('a[href]').map((_, el) =&gt; $(el).attr('href')).get(),
  };
}

const urls = ['https://example.com', /* ... */];
const results = await Promise.all(urls.map(u =&gt; limit(() =&gt; scrapePage(u))));
await writeFile('out.json', JSON.stringify(results, null, 2));</code></pre><div class="callout callout-warn"><div class="callout-title">Respeite robots.txt</div><div>E adicione delay entre requests. Scraping agressivo é eticamente e legalmente questionável.</div></div>`}} />
    </article>
  );
}

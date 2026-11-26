import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SERAPH_CDN_BASE,
  parseSeraphGamesHtml,
  getFallbackSeraphCatalog,
  normalizeSeraphGenre,
} from './seraphCatalog';

test('normalizeSeraphGenre standardizes genres cleanly', () => {
  assert.equal(normalizeSeraphGenre('arcade'), 'Arcade');
  assert.equal(normalizeSeraphGenre('platformer'), 'Platformer');
  assert.equal(normalizeSeraphGenre('mobile'), 'Mobile');
  assert.equal(normalizeSeraphGenre('simulation'), 'Simulation');
  assert.equal(normalizeSeraphGenre(''), 'Arcade');
});

test('parseSeraphGamesHtml extracts Seraph game entries with CDN URLs, thumbnails, and genres', () => {
  const sampleHtml = `
    <html>
      <body>
        <nav><a href="../index.html">Back</a></nav>
        <div class="button-container">
          <a href="slope/index.html"><div class="button" data-genre="platformer" style="background-image: url('../images/thumbnails/slope.jpg');"><h2>slope</h2></div></a>
          <a href="subwaysurfers/index.html"><div class="button" data-genre="Arcade" style="background-image: url('../images/thumbnails/subwaysurfers.jpeg');"><h2>subway surfers</h2></div></a>
          <a href="#top"><span>Top</span></a>
        </div>
      </body>
    </html>
  `;

  const parsed = parseSeraphGamesHtml(sampleHtml, SERAPH_CDN_BASE);
  assert.equal(parsed.length, 2);

  assert.equal(parsed[0].id, 'seraph:slope');
  assert.equal(parsed[0].provider, 'seraph');
  assert.equal(parsed[0].name, 'Slope');
  assert.equal(parsed[0].category, 'Platformer');
  assert.equal(parsed[0].url, `${SERAPH_CDN_BASE}/games/slope/index.html`);
  assert.equal(parsed[0].baseUrl, `${SERAPH_CDN_BASE}/games/slope/`);
  assert.equal(parsed[0].cover, `${SERAPH_CDN_BASE}/images/thumbnails/slope.jpg`);
  assert.equal(parsed[0].featured, true);

  assert.equal(parsed[1].id, 'seraph:subwaysurfers');
  assert.equal(parsed[1].name, 'Subway Surfers');
  assert.equal(parsed[1].category, 'Arcade');
});

test('getFallbackSeraphCatalog returns 40 valid Seraph games', () => {
  const catalog = getFallbackSeraphCatalog();
  assert.equal(catalog.length, 40);
  const slugs = new Set(catalog.map((g) => g.slug));
  assert.equal(slugs.size, 40);
  for (const item of catalog) {
    assert.equal(item.provider, 'seraph');
    assert.ok(item.url.startsWith(SERAPH_CDN_BASE));
    assert.ok(item.cover && item.cover.startsWith(SERAPH_CDN_BASE));
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { GAME_CATALOG } from '../data/gamesCatalog';
import { getBaseHrefDirectory, sanitizeGameHtml } from './adBlockerProxy';
import { buildDashboardBlobHtml } from './blobMenuBuilder';

test('GAME_CATALOG contains all 224 unique verified games', () => {
  assert.equal(GAME_CATALOG.length, 224);
  const uniqueSlugs = new Set(GAME_CATALOG.map((g) => g.slug));
  assert.equal(uniqueSlugs.size, 224);
  for (const game of GAME_CATALOG) {
    assert.ok(game.url.startsWith('https://cdn.jsdelivr.net/'), `Expected jsDelivr URL for ${game.slug}`);
  }
});

test('getBaseHrefDirectory extracts parent directory ending with slash', () => {
  assert.equal(
    getBaseHrefDirectory('https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/drivemad/index.html?v=1'),
    'https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/drivemad/'
  );
});

test('sanitizeGameHtml strips ad scripts and injects <base href> plus ad-blocker stubs', () => {
  const rawHtml = `<!DOCTYPE html><html><head>
    <title>Drive Mad</title>
    <script type="text/javascript" src="Jump_Gamemonetize.js"></script>
    <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script src="/js/all.js"></script>
    <script>window.dataLayer = []; function gtag(){}</script>
    <script src="webapp/fancade.js"></script>
  </head><body><ins class="adsbygoogle"></ins><canvas></canvas></body></html>`;

  const cleaned = sanitizeGameHtml(
    rawHtml,
    'https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/drivemad/index.html'
  );

  assert.match(cleaned, /<base href="https:\/\/cdn\.jsdelivr\.net\/gh\/selenite-cc\/selenite-old@main\/drivemad\/">/);
  assert.doesNotMatch(cleaned, /Jump_Gamemonetize\.js/);
  assert.doesNotMatch(cleaned, /googlesyndication\.com/);
  assert.doesNotMatch(cleaned, /\/js\/all\.js/);
  assert.doesNotMatch(cleaned, /<ins class="adsbygoogle">/);
  assert.match(cleaned, /webapp\/fancade\.js/);
  assert.match(cleaned, /window\.PokiSDK/);
  assert.match(cleaned, /window\.adBreak/);
});

test('sanitizeGameHtml preserves existing <base href> tag instead of overwriting it', () => {
  const rawHtml = `<html><head><base href="https://cdn.jsdelivr.net/gh/Replku/Ovo@abc/"><script src="patch/js/poki-sdk.js"></script></head><body></body></html>`;
  const cleaned = sanitizeGameHtml(rawHtml, 'https://cdn.jsdelivr.net/gh/freebuisness/html@main/1-fix2.html');

  assert.match(cleaned, /<base href="https:\/\/cdn\.jsdelivr\.net\/gh\/Replku\/Ovo@abc\/">/);
  assert.doesNotMatch(cleaned, /freebuisness\/html@main\//);
  assert.match(cleaned, /patch\/js\/poki-sdk\.js/);
});

test('buildDashboardBlobHtml sets title to Dashboard, embeds all 224 games, and disables popup sandbox', () => {
  const html = buildDashboardBlobHtml(GAME_CATALOG);
  assert.match(html, /<title>Dashboard<\/title>/);
  assert.match(html, /placeholder="Search 224 games\.\.\."/);
  assert.match(html, /sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"/);
  assert.doesNotMatch(html, /allow-popups/);
  for (const game of GAME_CATALOG) {
    assert.ok(html.includes(game.slug), `Missing slug ${game.slug}`);
  }
  // Ensure there is only one closing </script> and inline script isn't broken by raw </script>
  const scriptMatches = html.match(/<\/script>/g) || [];
  assert.equal(scriptMatches.length, 1);
});

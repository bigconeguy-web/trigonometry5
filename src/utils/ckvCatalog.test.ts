import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCkvTitle,
  parseCkvTree,
  getFallbackCkvCatalog,
  serializeCkvCache,
  deserializeCkvCache,
  CKV_CDN_BASE,
  FALLBACK_CKV_PATHS,
} from './ckvCatalog';

test('formatCkvTitle strips gamefiles/ and .html, replaces hyphens/underscores, and applies Title Case', () => {
  assert.equal(formatCkvTitle('gamefiles/example-game.html'), 'Example Game');
  assert.equal(formatCkvTitle('gamefiles/my_cool_game.html'), 'My Cool Game');
  assert.equal(formatCkvTitle('gamefiles/10 Minutes till Dawn.html'), '10 Minutes Till Dawn');
  assert.equal(formatCkvTitle('gamefiles/1v1.LoL.html'), '1v1.LoL');
});

test('parseCkvTree filters gamefiles/*.html, builds CDN URLs, and matches gameimages covers', () => {
  const sampleTree = [
    { path: 'README.md', type: 'blob' },
    { path: 'index.html', type: 'blob' },
    { path: 'gamefiles/example-game.html', type: 'blob' },
    { path: 'gamefiles/Basket Bros.html', type: 'blob' },
    { path: 'gamefiles/Unmatched Game.html', type: 'blob' },
    { path: 'gamefiles/assets/script.js', type: 'blob' },
    { path: 'gameimages/example-game.png', type: 'blob' },
    { path: 'gameimages/basketbros.jpg', type: 'blob' },
  ];

  const modules = parseCkvTree(sampleTree);
  assert.equal(modules.length, 3);

  const basket = modules.find((m) => m.name === 'Basket Bros');
  assert.ok(basket);
  assert.equal(basket.url, `${CKV_CDN_BASE}/gamefiles/Basket%20Bros.html`);
  assert.equal(basket.cover, `${CKV_CDN_BASE}/gameimages/basketbros.jpg`);

  const example = modules.find((m) => m.name === 'Example Game');
  assert.ok(example);
  assert.equal(example.url, `${CKV_CDN_BASE}/gamefiles/example-game.html`);
  assert.equal(example.cover, `${CKV_CDN_BASE}/gameimages/example-game.png`);

  const unmatched = modules.find((m) => m.name === 'Unmatched Game');
  assert.ok(unmatched);
  assert.equal(unmatched.cover, null);
});

test('getFallbackCkvCatalog provides 20 popular CKV modules with encoded CDN URLs', () => {
  assert.equal(FALLBACK_CKV_PATHS.length, 20);
  const fallback = getFallbackCkvCatalog();
  assert.equal(fallback.length, 20);
  for (const mod of fallback) {
    assert.equal(mod.provider, 'ckv');
    assert.ok(mod.url.startsWith(`${CKV_CDN_BASE}/gamefiles/`));
    assert.ok(mod.cover && mod.cover.startsWith(`${CKV_CDN_BASE}/gameimages/`));
    assert.equal(mod.featured, true);
  }
});

test('serializeCkvCache and deserializeCkvCache round-trip entries and respect TTL', () => {
  const fallback = getFallbackCkvCatalog();
  const now = 1_700_000_000_000;
  const serialized = serializeCkvCache(fallback, CKV_CDN_BASE, now);
  const valid = deserializeCkvCache(serialized, now + 60_000, 30 * 60_000);
  assert.ok(valid);
  assert.equal(valid.length, fallback.length);
  assert.equal(valid[0].url, fallback[0].url);
  assert.equal(valid[0].cover, fallback[0].cover);

  const expired = deserializeCkvCache(serialized, now + 31 * 60_000, 30 * 60_000);
  assert.equal(expired, null);
});

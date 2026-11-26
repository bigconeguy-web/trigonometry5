import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GMSHELF_TRUFFLED_CDN,
  GMSHELF_CKV_CDN,
  parseGmshelfManifest,
  inferGmshelfCategory,
  getFallbackGmshelfCatalog,
} from './gmshelfCatalog';

test('inferGmshelfCategory assigns accurate genres from titles and slugs', () => {
  assert.equal(inferGmshelfCategory('Slope', 'slope'), 'Sports & Racing');
  assert.equal(inferGmshelfCategory('2048', '2048'), 'Puzzle');
  assert.equal(inferGmshelfCategory('Celeste', 'celeste'), 'Platformer');
  assert.equal(inferGmshelfCategory('Cookie Clicker', 'cookieclicker'), 'Simulation');
  assert.equal(inferGmshelfCategory('1v1.LOL', '1v1lol'), 'Action');
});

test('parseGmshelfManifest parses both Truffled array and CKV object manifests', () => {
  const truffledSample = [
    { name: '1v1.lol', img: '/img/placeholder.png', url: '/truffled/1v1lol/1v1.html' },
    { name: '2048', img: '/covers/2048.webp', url: '/truffled/2048/index.html' },
    { name: 'Bad', img: '/img/placeholder.png', url: 'javascript:alert(1)' },
  ];

  const parsedTruffled = parseGmshelfManifest(truffledSample, 'truffled', GMSHELF_TRUFFLED_CDN);
  assert.equal(parsedTruffled.length, 2);
  assert.equal(parsedTruffled[0].provider, 'gmshelf');
  assert.equal(parsedTruffled[0].url, `${GMSHELF_TRUFFLED_CDN}/truffled/1v1lol/1v1.html`);
  assert.equal(parsedTruffled[0].cover, `${GMSHELF_TRUFFLED_CDN}/covers/1v1lol.webp`);
  assert.equal(parsedTruffled[1].category, 'Puzzle');

  const ckvSample = {
    games: [
      { url: '/ckv/10minutestilldawn.html', img: '/covers/10minutestilldawn.jpg', name: '10 Minutes Till Dawn' },
    ],
  };
  const parsedCkv = parseGmshelfManifest(ckvSample, 'ckv', GMSHELF_CKV_CDN);
  assert.equal(parsedCkv.length, 1);
  assert.equal(parsedCkv[0].id, 'gmshelf:ckv:10minutestilldawn');
  assert.equal(parsedCkv[0].cover, `${GMSHELF_CKV_CDN}/covers/10minutestilldawn.jpg`);
});

test('getFallbackGmshelfCatalog returns 40 valid GMShelf entries', () => {
  const list = getFallbackGmshelfCatalog();
  assert.equal(list.length, 40);
  const ids = new Set(list.map((g) => g.id));
  assert.equal(ids.size, 40);
  for (const item of list) {
    assert.equal(item.provider, 'gmshelf');
    assert.ok(item.url.startsWith(GMSHELF_TRUFFLED_CDN));
    assert.ok(item.cover && item.cover.startsWith(GMSHELF_TRUFFLED_CDN));
  }
});

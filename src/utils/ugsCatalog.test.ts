import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildUgsCdnUrl,
  formatUgsTitle,
  getFallbackUgsCatalog,
  mergeCatalogs,
  normalizeTitleKey,
  parseUgsTree,
  type GitHubTreeItem,
} from './ugsCatalog.ts';

test('formatUgsTitle formats compact, hyphenated, and camelCase slugs into uppercase titles', () => {
  assert.equal(formatUgsTitle('10minutestilldawn/index.html'), '10 MINUTES TILL DAWN');
  assert.equal(formatUgsTitle('BurritoBison-main/index.html'), 'BURRITO BISON');
  assert.equal(formatUgsTitle('adventure-capitalist/index.html'), 'ADVENTURE CAPITALIST');
  assert.equal(formatUgsTitle('retro bowl/new.html'), 'RETRO BOWL');
  assert.equal(formatUgsTitle('3dash/index.html'), '3 DASH');
  assert.equal(formatUgsTitle('monkey mart v6.3/index.html'), 'MONKEY MART V6.3');
});

test('parseUgsTree extracts valid modules, excludes asset/error HTMLs, and builds CDN URLs', () => {
  const tree: GitHubTreeItem[] = [
    { path: 'README.md', type: 'blob' },
    { path: 'FootballBros.js', type: 'blob' },
    { path: '10minutestilldawn/index.html', type: 'blob' },
    { path: '10minutestilldawn/icon.png', type: 'blob' },
    { path: 'retro bowl/new.html', type: 'blob' },
    { path: 'cookieclicker/index.html', type: 'blob' },
    { path: 'cookieclicker/img/index.html', type: 'blob' },
    { path: 'recoil/index.html', type: 'blob' },
    { path: 'recoil/404.html', type: 'blob' },
    { path: 'recoil/null.html', type: 'blob' },
    { path: 'scary-teacher-3D/index.html', type: 'blob' },
    { path: 'scary-teacher-3D/StreamingAssets/animators.html', type: 'blob' },
    { path: 'scary-teacher-3D/StreamingAssets/alllevel/index.html', type: 'blob' },
    { path: 'standalone-snake.html', type: 'blob' },
  ];

  const modules = parseUgsTree(tree);
  assert.equal(modules.length, 6);

  const dawn = modules.find((m) => m.folder === '10minutestilldawn');
  assert.ok(dawn);
  assert.equal(dawn.name, '10 MINUTES TILL DAWN');
  assert.equal(dawn.url, 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/10minutestilldawn/index.html');
  assert.equal(dawn.cover, 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/10minutestilldawn/icon.png');
  assert.equal(dawn.featured, true);

  const retro = modules.find((m) => m.folder === 'retro bowl');
  assert.ok(retro);
  assert.equal(retro.name, 'RETRO BOWL');
  assert.equal(retro.url, 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/retro%20bowl/new.html');
  assert.equal(retro.baseUrl, 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/retro%20bowl/');

  const snake = modules.find((m) => m.path === 'standalone-snake.html');
  assert.ok(snake);
  assert.equal(snake.name, 'STANDALONE SNAKE');
});

test('getFallbackUgsCatalog provides 15-20 valid popular modules with encoded jsDelivr URLs', () => {
  const fallback = getFallbackUgsCatalog();
  assert.ok(fallback.length >= 15 && fallback.length <= 25);
  const dawn = fallback.find((m) => m.folder === '10minutestilldawn');
  assert.ok(dawn);
  assert.equal(dawn.url, buildUgsCdnUrl('10minutestilldawn/index.html'));
});

test('mergeCatalogs combines primary and secondary games and deduplicates matching titles', () => {
  assert.equal(normalizeTitleKey('10 Minutes Till Dawn'), '10minutestilldawn');
  assert.equal(normalizeTitleKey('10 MINUTES TILL DAWN'), '10minutestilldawn');

  const primary = [
    {
      id: '10',
      numericId: 10,
      name: '10 Minutes Till Dawn',
      url: 'https://example.com/10.html',
      baseUrl: 'https://example.com/',
      cover: 'https://example.com/10.png',
      featured: true,
    },
  ];
  const secondary = [
    {
      id: 'ugs:10minutestilldawn',
      name: '10 MINUTES TILL DAWN',
      url: 'https://example.com/ugs/10/index.html',
      baseUrl: 'https://example.com/ugs/10/',
      cover: null,
      featured: true,
    },
    {
      id: 'ugs:1datedanger',
      name: '1 DATE DANGER',
      url: 'https://example.com/ugs/1dd/index.html',
      baseUrl: 'https://example.com/ugs/1dd/',
      cover: null,
      featured: false,
    },
  ];

  const merged = mergeCatalogs(primary, secondary);
  assert.equal(merged.length, 2);
  assert.equal(merged[0].id, '10');
  assert.equal(merged[1].id, 'ugs:1datedanger');
});

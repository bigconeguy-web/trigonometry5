import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDirectEmbedUrl,
  buildFallbackModuleFetchUrls,
  ensureBaseHref,
  getBlobStorageShimTag,
  getSafePerformanceTag
} from './studyRuntime';

test('ensureBaseHref rewrites relative or root base tags so blob iframes resolve to CDN', () => {
  const rootBase = '<html><head><base href="/"><title>Module</title></head><body></body></html>';
  const out = ensureBaseHref(rootBase, 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope/');
  assert.ok(out.includes('<base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope/">'));
  assert.ok(!out.includes('<base href="/">'));

  const validBase = '<html><head><base href="https://cdn.example.com/module/"></head><body></body></html>';
  assert.equal(ensureBaseHref(validBase, 'https://cdn.jsdelivr.net/other/'), validBase);

  const noBase = '<html><head><title>M</title></head><body></body></html>';
  assert.ok(
    ensureBaseHref(noBase, 'https://cdn.jsdelivr.net/gh/x/y@main/').includes(
      '<head><base href="https://cdn.jsdelivr.net/gh/x/y@main/">'
    )
  );
});

test('buildFallbackModuleFetchUrls generates raw.githubusercontent and rawcdn.githack mirrors for large files', () => {
  const urls = buildFallbackModuleFetchUrls(
    'https://cdn.jsdelivr.net/gh/freebuisness/html@main/123.html'
  );
  assert.equal(urls[0], 'https://cdn.jsdelivr.net/gh/freebuisness/html@main/123.html');
  assert.ok(urls.includes('https://fastly.jsdelivr.net/gh/freebuisness/html@main/123.html'));
  assert.ok(urls.includes('https://raw.githubusercontent.com/freebuisness/html/main/123.html'));
  assert.ok(urls.includes('https://rawcdn.githack.com/freebuisness/html/main/123.html'));
});

test('buildDirectEmbedUrl converts jsDelivr GitHub URLs to rawcdn.githack for iframe src fallback', () => {
  assert.equal(
    buildDirectEmbedUrl('https://cdn.jsdelivr.net/gh/WanoCapy/ChickenKingsVault@main/gamefiles/Tetris.html'),
    'https://rawcdn.githack.com/WanoCapy/ChickenKingsVault/main/gamefiles/Tetris.html'
  );
});

test('getBlobStorageShimTag and getSafePerformanceTag avoid overriding requestAnimationFrame', () => {
  const shim = getBlobStorageShimTag();
  assert.ok(shim.includes('localStorage'));
  assert.ok(shim.includes('sessionStorage'));
  assert.ok(shim.includes('PokiSDK'));

  const perf = getSafePerformanceTag();
  assert.ok(perf.includes('high-performance'));
  assert.ok(!perf.includes('window.requestAnimationFrame=function'));
});

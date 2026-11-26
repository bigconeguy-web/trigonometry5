import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_WISP_URL,
  PANIC_REDIRECT_URL,
  DEFAULT_BAREMUX_TRANSPORT,
  BAREMUX_TRANSPORT_PATHS,
  VALID_HOME_LAYOUTS,
  DEFAULT_APP_SHORTCUTS,
  normalizeShortcutUrl,
  sanitizeAppShortcuts,
  normalizeTransportMode,
  normalizeHomeLayout,
  normalizeWispUrl,
  resolveInitialWispUrl,
  isScramjetScope,
  mergeAllStudyCatalog,
  filterAndSortModules,
  isInsideStandaloneBlobFrame,
  isStandaloneControlKeyTrigger,
  STANDALONE_IFRAME_NAME,
  triggerPanicRedirect,
  type UnifiedStudyModule,
} from './valbrowseConfig.js';
import { EULER_STUDY_CATALOG } from '../data/studyCatalog.js';

test('DEFAULT_WISP_URL uses wss://wisp.mercurywork.shop/', () => {
  assert.equal(DEFAULT_WISP_URL, 'wss://wisp.mercurywork.shop/');
  assert.ok(DEFAULT_WISP_URL.startsWith('wss://'));
  assert.ok(DEFAULT_WISP_URL.endsWith('/'));
});

test('normalizeWispUrl normalizes empty, Mercury root, http/https, bare hosts, and /wisp/ suffix cleanly', () => {
  assert.equal(normalizeWispUrl(''), DEFAULT_WISP_URL);
  assert.equal(normalizeWispUrl('   '), DEFAULT_WISP_URL);
  assert.equal(normalizeWispUrl('wisp.mercurywork.shop'), 'wss://wisp.mercurywork.shop/');
  assert.equal(normalizeWispUrl('https://wisp.mercurywork.shop/'), 'wss://wisp.mercurywork.shop/');
  assert.equal(
    normalizeWispUrl('https://my-custom-wisp.onrender.com'),
    'wss://my-custom-wisp.onrender.com/wisp/'
  );
  assert.equal(
    normalizeWispUrl('wss://custom-wisp.example/custom'),
    'wss://custom-wisp.example/custom'
  );
  assert.equal(
    normalizeWispUrl('/wisp/', 'https:', 'valbrowse.app'),
    'wss://valbrowse.app/wisp/'
  );
});

test('resolveInitialWispUrl defaults to wss://wisp.mercurywork.shop/ and migrates legacy Render default', () => {
  assert.equal(resolveInitialWispUrl(null), DEFAULT_WISP_URL);
  assert.equal(resolveInitialWispUrl(''), DEFAULT_WISP_URL);
  assert.equal(resolveInitialWispUrl('wss://my-wisp-server-ocnq.onrender.com/wisp/'), DEFAULT_WISP_URL);
  assert.equal(
    resolveInitialWispUrl('wss://user-custom.onrender.com/wisp/'),
    'wss://user-custom.onrender.com/wisp/'
  );
});

test('isScramjetScope preserves /scram/ service worker scope during root cleanup', () => {
  assert.equal(isScramjetScope('https://example.com/scram/', 'https://example.com'), true);
  assert.equal(isScramjetScope('https://example.com/', 'https://example.com'), false);
  assert.equal(isScramjetScope('', 'https://example.com'), false);
});

test('mergeAllStudyCatalog combines gn-math, UGS, CKV, and built-in catalog without duplicates', () => {
  const gn: UnifiedStudyModule[] = [
    {
      id: 'gn:1',
      numericId: 1,
      provider: 'gn',
      name: 'Slope',
      url: 'https://cdn.jsdelivr.net/gh/freebuisness/html@main/198-fix2.html',
      baseUrl: 'https://cdn.jsdelivr.net/gh/freebuisness/html@main/',
      cover: 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main/198.png',
      featured: true,
    },
  ];
  const ugs: UnifiedStudyModule[] = [
    {
      id: 'ugs:slope',
      provider: 'ugs',
      name: 'SLOPE',
      url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope/index.html',
      baseUrl: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope/',
      cover: null,
      featured: false,
    },
    {
      id: 'ugs:3dash',
      provider: 'ugs',
      name: '3DASH',
      url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/3dash/index.html',
      baseUrl: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/3dash/',
      cover: null,
      featured: true,
    },
  ];
  const merged = mergeAllStudyCatalog(gn, ugs, [], EULER_STUDY_CATALOG);
  const slopes = merged.filter((m) => m.name.toLowerCase() === 'slope');
  assert.equal(slopes.length, 1);
  assert.equal(slopes[0].provider, 'gn');
  assert.ok(merged.some((m) => m.id === 'ugs:3dash'));
  assert.ok(merged.some((m) => m.provider === 'builtin'));
});

test('filterAndSortModules filters by provider, favorites, query, and sorts popularity', () => {
  const list: UnifiedStudyModule[] = [
    {
      id: 'gn:1',
      numericId: 1,
      provider: 'gn',
      name: 'Alpha Module',
      url: 'https://example.com/1.html',
      baseUrl: 'https://example.com/',
      cover: null,
      featured: false,
    },
    {
      id: 'ugs:2',
      provider: 'ugs',
      name: 'Beta Module',
      url: 'https://example.com/2.html',
      baseUrl: 'https://example.com/',
      cover: null,
      featured: true,
    },
    {
      id: 'gn:3',
      numericId: 3,
      provider: 'gn',
      name: 'Zeta Drift',
      url: 'https://example.com/3.html',
      baseUrl: 'https://example.com/',
      cover: null,
      featured: true,
    },
  ];

  const onlyGn = filterAndSortModules(list, { provider: 'gn', sort: 'popular', popularityMap: { 1: 5000, 3: 100 } });
  assert.deepEqual(
    onlyGn.map((m) => m.id),
    ['gn:1', 'gn:3']
  );

  const favOnly = filterAndSortModules(list, { provider: 'favorites', favorites: ['ugs:2'] });
  assert.deepEqual(
    favOnly.map((m) => m.id),
    ['ugs:2']
  );

  const searchRes = filterAndSortModules(list, { query: 'drift' });
  assert.equal(searchRes.length, 1);
  assert.equal(searchRes[0].id, 'gn:3');

  const gmshelfItem: UnifiedStudyModule = {
    id: 'gmshelf:truffled:balatro',
    provider: 'gmshelf',
    name: 'Balatro',
    url: 'https://cdn.jsdelivr.net/gh/gmshelf/truffled@main/truffled/balatro/index.html',
    baseUrl: 'https://cdn.jsdelivr.net/gh/gmshelf/truffled@main/truffled/balatro/',
    cover: null,
    featured: true,
  };
  const mergedWithGm = mergeAllStudyCatalog([], [], [], [], [], [gmshelfItem]);
  assert.equal(filterAndSortModules(mergedWithGm, { provider: 'gmshelf' }).length, 1);
});

test('triggerPanicRedirect hides document and calls location.replace(classroom.google.com)', () => {
  let replacedWith = '';
  let exitCalled = false;
  const mockDoc = {
    title: 'ValBrowse',
    fullscreenElement: {},
    exitFullscreen: async () => {
      exitCalled = true;
    },
    documentElement: { style: { display: 'block' } },
  } as unknown as Document;

  const mockWin = {
    location: {
      replace: (url: string) => {
        replacedWith = url;
      },
    },
  } as unknown as Window;

  triggerPanicRedirect(mockDoc, mockWin);
  assert.equal(exitCalled, true);
  assert.equal(mockDoc.title, 'Google Classroom');
  assert.equal((mockDoc.documentElement as unknown as { style: { display: string } }).style.display, 'none');
  assert.equal(replacedWith, PANIC_REDIRECT_URL);
});

test('BareMux transport uses Libcurl (/libcurl/index.mjs) instead of Epoxy', () => {
  assert.equal(DEFAULT_BAREMUX_TRANSPORT, 'libcurl');
  assert.equal(BAREMUX_TRANSPORT_PATHS.libcurl, '/libcurl/index.mjs');
  assert.equal(normalizeTransportMode(undefined), 'libcurl');
  assert.equal(normalizeTransportMode(''), 'libcurl');
  assert.equal(normalizeTransportMode('libcurl'), 'libcurl');
  assert.equal(normalizeTransportMode('EPOXY'), 'libcurl');
});

test('UI home layouts normalize cleanly across split, normal, side, and minimal arrangements', () => {
  assert.deepEqual([...VALID_HOME_LAYOUTS], ['split', 'normal', 'side', 'minimal']);
  assert.equal(normalizeHomeLayout(undefined), 'split');
  assert.equal(normalizeHomeLayout('unknown'), 'split');
  assert.equal(normalizeHomeLayout('normal'), 'normal');
  assert.equal(normalizeHomeLayout('SIDE'), 'side');
  assert.equal(normalizeHomeLayout('minimal'), 'minimal');
});

test('DEFAULT_APP_SHORTCUTS provides Discord, Snapchat, Kick, Twitch, Reddit, and Roblox (nowgg.fun)', () => {
  const labels = DEFAULT_APP_SHORTCUTS.map((s) => s.label);
  assert.deepEqual(labels, ['Discord', 'Snapchat', 'Kick', 'Twitch', 'Reddit', 'Roblox']);
  const roblox = DEFAULT_APP_SHORTCUTS.find((s) => s.id === 'roblox');
  assert.ok(roblox);
  assert.equal(roblox.url, 'https://nowgg.fun');
  assert.equal(roblox.subtitle, 'nowgg.fun');
});

test('normalizeShortcutUrl and sanitizeAppShortcuts validate custom shortcuts and block unsafe schemes', () => {
  assert.equal(normalizeShortcutUrl('nowgg.fun'), 'https://nowgg.fun/');
  assert.equal(normalizeShortcutUrl('https://youtube.com'), 'https://youtube.com/');
  assert.equal(normalizeShortcutUrl('javascript:alert(1)'), null);
  assert.equal(normalizeShortcutUrl('not a domain'), null);

  const sanitized = sanitizeAppShortcuts([
    { label: 'Spotify', url: 'open.spotify.com' },
    { label: 'Bad', url: 'javascript:evil()' },
    { label: 'Duplicate', url: 'https://open.spotify.com/' },
  ]);
  assert.equal(sanitized.length, 1);
  assert.equal(sanitized[0].label, 'Spotify');
  assert.equal(sanitized[0].subtitle, 'open.spotify.com');
});

test('isStandaloneControlKeyTrigger fires only for standalone non-repeat Control key press', () => {
  assert.equal(isStandaloneControlKeyTrigger({ key: 'Control', repeat: false }), true);
  assert.equal(isStandaloneControlKeyTrigger({ key: 'Control', repeat: true }), false);
  assert.equal(isStandaloneControlKeyTrigger({ key: 'Control', altKey: true }), false);
  assert.equal(isStandaloneControlKeyTrigger({ key: 'Control', shiftKey: true }), false);
  assert.equal(isStandaloneControlKeyTrigger({ key: 'Control', metaKey: true }), false);
  assert.equal(isStandaloneControlKeyTrigger({ key: 'e' }), false);
  assert.equal(isStandaloneControlKeyTrigger({ key: 'Escape' }), false);
  assert.equal(isStandaloneControlKeyTrigger(null), false);
});

test('isInsideStandaloneBlobFrame requires both ?vb=1 and STANDALONE_IFRAME_NAME so main math site never renders inline proxy', () => {
  assert.equal(isInsideStandaloneBlobFrame('?vb=1', STANDALONE_IFRAME_NAME), true);
  assert.equal(isInsideStandaloneBlobFrame('?foo=1&vb=1', STANDALONE_IFRAME_NAME), true);
  assert.equal(isInsideStandaloneBlobFrame('?vb=1', ''), false);
  assert.equal(isInsideStandaloneBlobFrame('?vb=1', 'otherFrame'), false);
  assert.equal(isInsideStandaloneBlobFrame('', STANDALONE_IFRAME_NAME), false);
  assert.equal(isInsideStandaloneBlobFrame('?vb=0', STANDALONE_IFRAME_NAME), false);
});

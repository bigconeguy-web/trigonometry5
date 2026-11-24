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
  mergeAllGamesCatalog,
  filterAndSortGames,
  triggerPanicRedirect,
  type UnifiedPortalGame,
} from './valbrowseConfig.js';
import { GAME_CATALOG } from '../data/gamesCatalog.js';

test('DEFAULT_WISP_URL uses wss:// and ends with /wisp/', () => {
  assert.equal(DEFAULT_WISP_URL, 'wss://my-wisp-server-ocnq.onrender.com/wisp/');
  assert.ok(DEFAULT_WISP_URL.startsWith('wss://'));
  assert.ok(DEFAULT_WISP_URL.endsWith('/wisp/'));
});

test('normalizeWispUrl normalizes empty, http/https, bare hosts, and /wisp/ suffix cleanly', () => {
  assert.equal(normalizeWispUrl(''), DEFAULT_WISP_URL);
  assert.equal(normalizeWispUrl('   '), DEFAULT_WISP_URL);
  assert.equal(
    normalizeWispUrl('https://my-wisp-server-ocnq.onrender.com'),
    'wss://my-wisp-server-ocnq.onrender.com/wisp/'
  );
  assert.equal(
    normalizeWispUrl('my-wisp-server-ocnq.onrender.com'),
    'wss://my-wisp-server-ocnq.onrender.com/wisp/'
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

test('resolveInitialWispUrl defaults to permanent Render Wisp when storage is empty', () => {
  assert.equal(resolveInitialWispUrl(null), DEFAULT_WISP_URL);
  assert.equal(resolveInitialWispUrl(''), DEFAULT_WISP_URL);
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

test('mergeAllGamesCatalog combines gn-math, UGS, CKV, and built-in catalog without duplicates', () => {
  const gn: UnifiedPortalGame[] = [
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
  const ugs: UnifiedPortalGame[] = [
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
  const merged = mergeAllGamesCatalog(gn, ugs, [], GAME_CATALOG);
  const slopes = merged.filter((g) => g.name.toLowerCase() === 'slope');
  assert.equal(slopes.length, 1);
  assert.equal(slopes[0].provider, 'gn');
  assert.ok(merged.some((g) => g.id === 'ugs:3dash'));
  assert.ok(merged.some((g) => g.provider === 'builtin'));
});

test('filterAndSortGames filters by provider, favorites, query, and sorts popularity', () => {
  const list: UnifiedPortalGame[] = [
    {
      id: 'gn:1',
      numericId: 1,
      provider: 'gn',
      name: 'Alpha Game',
      url: 'https://example.com/1.html',
      baseUrl: 'https://example.com/',
      cover: null,
      featured: false,
    },
    {
      id: 'ugs:2',
      provider: 'ugs',
      name: 'Beta Game',
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

  const onlyGn = filterAndSortGames(list, { provider: 'gn', sort: 'popular', popularityMap: { 1: 5000, 3: 100 } });
  assert.deepEqual(
    onlyGn.map((g) => g.id),
    ['gn:1', 'gn:3']
  );

  const favOnly = filterAndSortGames(list, { provider: 'favorites', favorites: ['ugs:2'] });
  assert.deepEqual(
    favOnly.map((g) => g.id),
    ['ugs:2']
  );

  const searchRes = filterAndSortGames(list, { query: 'drift' });
  assert.equal(searchRes.length, 1);
  assert.equal(searchRes[0].id, 'gn:3');
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

test('BareMux transport defaults to Libcurl (/libcurl/index.mjs) and validates Epoxy toggle', () => {
  assert.equal(DEFAULT_BAREMUX_TRANSPORT, 'libcurl');
  assert.equal(BAREMUX_TRANSPORT_PATHS.libcurl, '/libcurl/index.mjs');
  assert.equal(BAREMUX_TRANSPORT_PATHS.epoxy, '/epoxy/index.mjs');
  assert.equal(normalizeTransportMode(undefined), 'libcurl');
  assert.equal(normalizeTransportMode(''), 'libcurl');
  assert.equal(normalizeTransportMode('libcurl'), 'libcurl');
  assert.equal(normalizeTransportMode('EPOXY'), 'epoxy');
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

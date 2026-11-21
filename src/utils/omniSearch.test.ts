import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectOmniIntent,
  normalizeOmniUrl,
  buildDuckDuckGoApiUrl,
  buildWikipediaSearchApiUrl,
  buildWikipediaExtractApiUrl,
  buildDictionaryApiUrl,
  buildExternalSearchUrls,
  stripHtmlSnippet,
  resolveDuckDuckGoImageUrl,
  addRecentSearchItem,
  searchMyPortalData
} from './omniSearch.js';

test('normalizeOmniUrl prepends https:// to domains while ignoring decimals and search phrases', () => {
  assert.equal(normalizeOmniUrl('en.m.wikipedia.org'), 'https://en.m.wikipedia.org/');
  assert.equal(normalizeOmniUrl('https://example.com/docs'), 'https://example.com/docs');
  assert.equal(normalizeOmniUrl('localhost:3000'), 'http://localhost:3000/');
  assert.equal(normalizeOmniUrl('3.14159'), null);
  assert.equal(normalizeOmniUrl('photosynthesis'), null);
  assert.equal(normalizeOmniUrl('quantum physics basics'), null);
});

test('detectOmniIntent classifies URLs, math expressions, single dictionary words, and multi-word searches', () => {
  const urlIntent = detectOmniIntent('en.m.wikipedia.org');
  assert.equal(urlIntent.type, 'url');
  if (urlIntent.type === 'url') {
    assert.equal(urlIntent.url, 'https://en.m.wikipedia.org/');
  }

  const mathIntent = detectOmniIntent('(15 + 5) / 4');
  assert.equal(mathIntent.type, 'math');
  if (mathIntent.type === 'math') {
    assert.equal(mathIntent.math.answer, '5');
  }

  const wordIntent = detectOmniIntent('Serendipity');
  assert.equal(wordIntent.type, 'search');
  if (wordIntent.type === 'search') {
    assert.equal(wordIntent.isSingleWord, true);
  }

  const multiIntent = detectOmniIntent('how photosynthesis works');
  assert.equal(multiIntent.type, 'search');
  if (multiIntent.type === 'search') {
    assert.equal(multiIntent.isSingleWord, false);
  }
});

test('API URL builders produce CORS-ready endpoints for DuckDuckGo, Wikipedia, Dictionary, and fallbacks', () => {
  assert.equal(
    buildDuckDuckGoApiUrl('albert einstein'),
    'https://api.duckduckgo.com/?q=albert%20einstein&format=json&no_html=1&skip_disambig=1'
  );
  assert.equal(
    buildWikipediaSearchApiUrl('solar system', 10),
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=solar%20system&srlimit=10&format=json&origin=*'
  );
  assert.equal(
    buildWikipediaExtractApiUrl('Solar System'),
    'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=Solar%20System&format=json&origin=*'
  );
  assert.equal(
    buildDictionaryApiUrl(' Ephemeral '),
    'https://api.dictionaryapi.dev/api/v2/entries/en/ephemeral'
  );
  const ext = buildExternalSearchUrls('calculus derivatives');
  assert.ok(ext.duckduckgo.startsWith('https://duckduckgo.com/?q='));
  assert.ok(ext.google.startsWith('https://www.google.com/search?q='));
  assert.ok(ext.images.includes('iax=images'));
});

test('stripHtmlSnippet and resolveDuckDuckGoImageUrl clean snippets and relative paths safely', () => {
  assert.equal(
    stripHtmlSnippet('<span class="searchmatch">Photosynthesis</span> &amp; plant &quot;energy&quot;'),
    'Photosynthesis & plant "energy"'
  );
  assert.equal(
    resolveDuckDuckGoImageUrl('/i/5c1a2f.png'),
    'https://duckduckgo.com/i/5c1a2f.png'
  );
});

test('addRecentSearchItem deduplicates case-insensitively and searchMyPortalData aggregates local hits', () => {
  const updated = addRecentSearchItem(['Physics', 'Slope'], 'physics', 10);
  assert.deepEqual(updated, ['physics', 'Slope']);

  const portalHits = searchMyPortalData('slope', {
    notes: [{ id: 'n1', title: 'Algebra Notes', body: 'Slope formula is rise over run.' }],
    games: [{ id: 'g1', name: 'Slope 3D', provider: 'gn', author: 'Y8' }],
    flashcards: [{ id: 'f1', front: 'Slope-Intercept', back: 'y = mx + b' }],
    tasks: [{ id: 't1', title: 'Practice slope homework', col: 'todo' }],
    calcHistory: [{ expr: '10/2', res: '5' }]
  });
  assert.equal(portalHits.length, 4);
  assert.deepEqual(
    portalHits.map(h => h.source),
    ['note', 'flashcard', 'task', 'game']
  );
});

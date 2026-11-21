import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BUILTIN_UTILITY_APPS,
  getHighlightSegments,
  detectOfflineMathOrUnit,
  searchLocalWorkspace,
  addRecentSearchItem
} from './omniSearch.js';

test('detectOfflineMathOrUnit solves equations, functions, and unit conversions offline while ignoring plain numbers', () => {
  const mul = detectOfflineMathOrUnit('48 * 19');
  assert.equal(mul.matched, true);
  assert.equal(mul.answer, '912');

  const root = detectOfflineMathOrUnit('sqrt(256)');
  assert.equal(root.matched, true);
  assert.equal(root.answer, '16');

  const miles = detectOfflineMathOrUnit('10 miles to km');
  assert.equal(miles.matched, true);
  assert.equal(miles.answer, '16.09344 km');

  const temp = detectOfflineMathOrUnit('72 f to c');
  assert.equal(temp.matched, true);
  assert.ok((temp.answer || '').startsWith('22.222222'));
  assert.ok((temp.answer || '').endsWith('°C'));

  const plainNum = detectOfflineMathOrUnit('2026');
  assert.equal(plainNum.matched, false);
});

test('getHighlightSegments splits text into safe matched and unmatched spans case-insensitively', () => {
  const segs = getHighlightSegments('Chlorophyll absorbs sunlight for Photosynthesis', 'chloro sun');
  const matchedTexts = segs.filter((s) => s.match).map((s) => s.text.toLowerCase());
  assert.deepEqual(matchedTexts, ['chloro', 'sun']);
  assert.equal(segs.map((s) => s.text).join(''), 'Chlorophyll absorbs sunlight for Photosynthesis');

  // Regex special characters should not throw or over-match
  const regexSafe = getHighlightSegments('Evaluate (15 + 5)', '(15 + 5)');
  assert.equal(regexSafe.some((s) => s.match && s.text === '(15 + 5)'), true);
});

test('searchLocalWorkspace indexes Notepad, Flashcards, Calculator History, Built-In Apps, Tasks, and Games in real time', () => {
  const sources = {
    notes: [
      { id: 'n1', title: 'Biology Lab Notes', body: 'Chlorophyll absorbs blue and red light during photosynthesis.' },
      { id: 'n2', title: 'Algebra Formulas', body: 'Slope formula is rise over run.' }
    ],
    flashcards: [
      { id: 'f1', front: 'Photosynthesis', back: 'Plants convert sunlight and CO2 into glucose.' },
      { id: 'f2', front: 'Slope-Intercept', back: 'y = mx + b' }
    ],
    calcHistory: [
      { expr: '48*19', result: '912' },
      { expr: 'sqrt(256)', result: '16' }
    ],
    tasks: [{ id: 't1', title: 'Practice slope homework', col: 'todo' }],
    games: [{ id: 'g1', name: 'Slope 3D', provider: 'gn', author: 'Y8' }]
  };

  // Query across notes + flashcards
  const photoHits = searchLocalWorkspace('photosynthesis', sources);
  assert.deepEqual(
    photoHits.map((h) => h.source),
    ['flashcard', 'note']
  );

  // Query across built-in utility apps by keyword alias
  const pomoHits = searchLocalWorkspace('pomodoro', sources);
  assert.equal(pomoHits[0]?.source, 'app');
  assert.equal(pomoHits[0]?.actionPayload, 'timer');

  // Query across calculator history result or expression
  const calcHits = searchLocalWorkspace('912', sources);
  assert.equal(calcHits.some((h) => h.source === 'calc' && h.title === '48*19 = 912'), true);

  // Query matching notes, flashcards, tasks, and games
  const slopeHits = searchLocalWorkspace('slope', sources);
  assert.equal(slopeHits.some((h) => h.source === 'note'), true);
  assert.equal(slopeHits.some((h) => h.source === 'flashcard'), true);
  assert.equal(slopeHits.some((h) => h.source === 'task'), true);
  assert.equal(slopeHits.some((h) => h.source === 'game'), true);

  // Built-in catalog includes all key tools
  assert.ok(BUILTIN_UTILITY_APPS.some((a) => a.key === 'calculator'));
  assert.ok(BUILTIN_UTILITY_APPS.some((a) => a.key === 'notepad'));
  assert.ok(BUILTIN_UTILITY_APPS.some((a) => a.key === 'flashcards'));
  assert.ok(BUILTIN_UTILITY_APPS.some((a) => a.key === 'stopwatch'));
});

test('addRecentSearchItem deduplicates case-insensitively and preserves cap', () => {
  const updated = addRecentSearchItem(['Physics', 'Slope', '48 * 19'], 'physics', 3);
  assert.deepEqual(updated, ['physics', 'Slope', '48 * 19']);
});

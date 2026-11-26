import test from 'node:test';
import assert from 'node:assert/strict';
import { FUN_FACTS, pickRandomFunFact } from './funFacts';
import {
  ANIMATED_BG_PRESETS,
  ANIMATED_BG_CATEGORIES,
  DYNAMIC_COLOR_BG_PRESETS,
  DYNAMIC_COLOR_BG_CATEGORIES,
  FONT_LIBRARY_CATALOG,
  FONT_CATEGORIES,
  LAYOUT_PRESETS,
} from './studioCatalogs';

test('FUN_FACTS provides 100+ unique fun facts and pickRandomFunFact selects one cleanly', () => {
  assert.ok(FUN_FACTS.length >= 100, `Expected >= 100 fun facts, got ${FUN_FACTS.length}`);
  const unique = new Set(FUN_FACTS.map((f) => f.trim()));
  assert.equal(unique.size, FUN_FACTS.length, 'Every fun fact should be unique');

  const sample = pickRandomFunFact();
  assert.ok(typeof sample === 'string' && sample.length > 10);
  assert.ok(FUN_FACTS.includes(sample));
});

test('ANIMATED_BG_PRESETS provides 100 unique presets across all 6 categories', () => {
  assert.equal(ANIMATED_BG_PRESETS.length, 100);
  const ids = new Set(ANIMATED_BG_PRESETS.map((p) => p.id));
  assert.equal(ids.size, 100);

  for (const cat of ANIMATED_BG_CATEGORIES) {
    const count = ANIMATED_BG_PRESETS.filter((p) => p.category === cat).length;
    assert.ok(count >= 14, `Expected >= 14 presets in ${cat}, got ${count}`);
  }
});

test('DYNAMIC_COLOR_BG_PRESETS provides 100 unique color-shifting presets across all 6 mood categories', () => {
  assert.equal(DYNAMIC_COLOR_BG_PRESETS.length, 100);
  const ids = new Set(DYNAMIC_COLOR_BG_PRESETS.map((p) => p.id));
  assert.equal(ids.size, 100);

  for (const cat of DYNAMIC_COLOR_BG_CATEGORIES) {
    const count = DYNAMIC_COLOR_BG_PRESETS.filter((p) => p.category === cat).length;
    assert.ok(count >= 14, `Expected >= 14 color shifts in ${cat}, got ${count}`);
  }
});

test('FONT_LIBRARY_CATALOG provides 250+ unique Google Fonts across 6 categories', () => {
  assert.ok(
    FONT_LIBRARY_CATALOG.length >= 250,
    `Expected >= 250 fonts, got ${FONT_LIBRARY_CATALOG.length}`
  );
  const families = new Set(FONT_LIBRARY_CATALOG.map((f) => f.family));
  assert.equal(families.size, FONT_LIBRARY_CATALOG.length, 'Every font family must be unique');

  for (const cat of FONT_CATEGORIES) {
    const count = FONT_LIBRARY_CATALOG.filter((f) => f.category === cat).length;
    assert.ok(count >= 25, `Expected >= 25 fonts in ${cat}, got ${count}`);
  }

  assert.ok(FONT_CATEGORIES.includes('Cursive & Calligraphy'));
  const cursiveFonts = FONT_LIBRARY_CATALOG.filter((f) => f.category === 'Cursive & Calligraphy');
  assert.ok(cursiveFonts.length >= 30, `Expected >= 30 cursive fonts, got ${cursiveFonts.length}`);
  const cursiveNames = new Set(cursiveFonts.map((f) => f.name));
  for (const req of [
    'Dancing Script',
    'Great Vibes',
    'Pacifico',
    'Sacramento',
    'Allura',
    'Alex Brush',
    'Caveat',
    'Kaushan Script',
    'Lobster',
    'Satisfy',
  ]) {
    assert.ok(cursiveNames.has(req), `Missing cursive font ${req}`);
  }
});

test('LAYOUT_PRESETS provides 25+ unique switchable workspace layouts', () => {
  assert.ok(LAYOUT_PRESETS.length >= 25, `Expected >= 25 layouts, got ${LAYOUT_PRESETS.length}`);
  const ids = new Set(LAYOUT_PRESETS.map((l) => l.id));
  assert.equal(ids.size, LAYOUT_PRESETS.length);

  const navPositions = new Set(LAYOUT_PRESETS.map((l) => l.navPosition));
  for (const pos of ['left', 'right', 'top', 'dock', 'zen'] as const) {
    assert.ok(navPositions.has(pos), `Expected layout presets for navPosition="${pos}"`);
  }
});

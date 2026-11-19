import test from 'node:test';
import assert from 'node:assert/strict';
import { THEMES, getTheme } from './theme';

test('THEMES contains 10 distinct academic themes', () => {
  assert.equal(THEMES.length, 10);
  const ids = THEMES.map((t) => t.id);
  assert.equal(ids.length, 10);
  assert.ok(ids.includes('oxford'));
  assert.ok(ids.includes('midnight'));
});

test('getTheme returns correct theme by id and defaults safely', () => {
  const oxford = getTheme('oxford');
  assert.equal(oxford.name, 'Oxford Slate');
  assert.equal(oxford.isDark, false);

  const midnight = getTheme('midnight');
  assert.equal(midnight.name, 'Midnight Archive');
  assert.equal(midnight.isDark, true);

  // Fallback test
  const fallback = getTheme('non-existent' as any);
  assert.equal(fallback.id, 'oxford');
});

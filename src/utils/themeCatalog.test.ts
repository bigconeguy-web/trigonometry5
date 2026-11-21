import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEMES_CATALOG,
  THEME_CATEGORIES,
  resolveThemeById,
  buildThemeCssVariables,
} from './themeCatalog';

test('THEMES_CATALOG includes exactly 24 unique themes (8 per category)', () => {
  assert.equal(THEMES_CATALOG.length, 24);
  const ids = new Set(THEMES_CATALOG.map((t) => t.id));
  assert.equal(ids.size, 24);

  for (const cat of THEME_CATEGORIES) {
    const count = THEMES_CATALOG.filter((t) => t.category === cat).length;
    assert.equal(count, 8, `Expected 8 themes in category ${cat}`);
  }

  const requiredNames = [
    'Midnight OLED',
    'Cyber Neon Green',
    'Dracula Purple',
    'Synthwave Sunset',
    'Crimson Red',
    'Electric Cobalt',
    'Emerald Matrix',
    'Amber Terminal',
    'Catppuccin Mocha',
    'Nord Frost',
    'Tokyo Night',
    'Lavender Dusk',
    'Matcha Latte',
    'Peach Blossom',
    'Rose Pine',
    'Mint Breeze',
    'Pure Paper Light',
    'Solarized Light',
    'Solarized Dark',
    'Arctic Ice',
    'Desert Sand',
    'Slate Graphite',
    'Royal Gold',
    'Deep Ocean',
  ];
  const catalogNames = new Set(THEMES_CATALOG.map((t) => t.name));
  for (const name of requiredNames) {
    assert.equal(catalogNames.has(name), true, `Missing required theme "${name}"`);
  }
});

test('all 24 themes specify valid hex tokens for required CSS properties', () => {
  const hexRegex = /^#[0-9a-f]{6}$/i;
  for (const t of THEMES_CATALOG) {
    assert.match(t.bgPrimary, hexRegex);
    assert.match(t.bgSecondary, hexRegex);
    assert.match(t.bgCard, hexRegex);
    assert.match(t.textPrimary, hexRegex);
    assert.match(t.textMuted, hexRegex);
    assert.match(t.accent, hexRegex);
    assert.match(t.border, hexRegex);
  }
});

test('resolveThemeById migrates legacy theme IDs and falls back cleanly', () => {
  assert.equal(resolveThemeById('midnight').id, 'midnight-oled');
  assert.equal(resolveThemeById('forest').id, 'emerald-matrix');
  assert.equal(resolveThemeById('ocean').id, 'deep-ocean');
  assert.equal(resolveThemeById('light').id, 'pure-paper-light');
  assert.equal(resolveThemeById('dracula-purple').id, 'dracula-purple');
  assert.equal(resolveThemeById('nonexistent').id, 'midnight-oled');
});

test('buildThemeCssVariables emits all 7 CSS properties with optional custom accent override', () => {
  const baseVars = buildThemeCssVariables('catppuccin-mocha');
  assert.equal(baseVars['--bg-primary'], '#1e1e2e');
  assert.equal(baseVars['--bg-secondary'], '#181825');
  assert.equal(baseVars['--bg-card'], '#28283d');
  assert.equal(baseVars['--text-primary'], '#cdd6f4');
  assert.equal(baseVars['--text-muted'], '#9399b2');
  assert.equal(baseVars['--accent'], '#cba6f7');
  assert.equal(baseVars['--border'], '#3b3b58');

  const overridden = buildThemeCssVariables('catppuccin-mocha', '#FF6600');
  assert.equal(overridden['--accent'], '#ff6600');
});

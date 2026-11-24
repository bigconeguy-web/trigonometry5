import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEMES_CATALOG,
  THEME_CATEGORIES,
  resolveThemeById,
  buildThemeCssVariables,
  contrastRatio,
  getContrastInk,
} from './themeCatalog';

test('THEMES_CATALOG includes 124 unique themes (24 original + 100 new)', () => {
  assert.equal(THEMES_CATALOG.length, 124);
  const ids = new Set(THEMES_CATALOG.map((t) => t.id));
  const names = new Set(THEMES_CATALOG.map((t) => t.name));
  assert.equal(ids.size, 124, 'Every theme must have a unique id');
  assert.equal(names.size, 124, 'Every theme must have a unique name');

  for (const cat of THEME_CATEGORIES) {
    const count = THEMES_CATALOG.filter((t) => t.category === cat).length;
    assert.ok(count >= 40, `Expected >= 40 themes in category ${cat}, got ${count}`);
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
    'Neon Coral',
    'Sakura Petal',
    'Swiss Ivory',
  ];
  for (const name of requiredNames) {
    assert.equal(names.has(name), true, `Missing required theme "${name}"`);
  }
});

test('all 124 themes specify valid hex tokens and meet WCAG AA contrast', () => {
  const hexRegex = /^#[0-9a-f]{6}$/i;
  for (const t of THEMES_CATALOG) {
    assert.match(t.bgPrimary, hexRegex);
    assert.match(t.bgSecondary, hexRegex);
    assert.match(t.bgCard, hexRegex);
    assert.match(t.textPrimary, hexRegex);
    assert.match(t.textMuted, hexRegex);
    assert.match(t.accent, hexRegex);
    assert.match(t.border, hexRegex);

    const primaryBgContrast = contrastRatio(t.textPrimary, t.bgPrimary);
    const primaryCardContrast = contrastRatio(t.textPrimary, t.bgCard);
    const mutedBgContrast = contrastRatio(t.textMuted, t.bgPrimary);
    assert.ok(
      primaryBgContrast >= 4.5,
      `${t.id} textPrimary vs bgPrimary contrast too low: ${primaryBgContrast.toFixed(2)}`
    );
    assert.ok(
      primaryCardContrast >= 4.5,
      `${t.id} textPrimary vs bgCard contrast too low: ${primaryCardContrast.toFixed(2)}`
    );
    assert.ok(
      mutedBgContrast >= 3.0,
      `${t.id} textMuted vs bgPrimary contrast too low: ${mutedBgContrast.toFixed(2)}`
    );
  }
});

test('getContrastInk selects dark ink on bright accents and white ink on dark accents', () => {
  assert.equal(getContrastInk('#00ff88'), '#09090b');
  assert.equal(getContrastInk('#facc15'), '#09090b');
  assert.equal(getContrastInk('#1d4ed8'), '#ffffff');
  assert.equal(getContrastInk('#7c3aed'), '#ffffff');
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

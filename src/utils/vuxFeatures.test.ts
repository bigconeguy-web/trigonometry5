import test from 'node:test';
import assert from 'node:assert/strict';
import {
  VUX_AUDIO_STATIONS,
  VUX_AMBIENT_LAYERS,
  formatAudioTime,
  normalizeCustomMp3Url,
} from '../data/vuxAudioCatalog';
import {
  VUX_CHAT_CHANNELS,
  getInitialVuxChatMessages,
  sanitizeChatText,
  encodeVuxShareCode,
  decodeVuxShareCode,
  updateDailyStreak,
  evaluateVuxBadges,
} from './vuxFeatures';

test('VUX_AUDIO_STATIONS & ambient layers provide 6 StudyHub stations and 4 ambient mixers', () => {
  assert.equal(VUX_AUDIO_STATIONS.length, 6);
  const titles = VUX_AUDIO_STATIONS.map((s) => s.title);
  for (const expected of [
    'Lofi Study Beats',
    'Synthwave Night',
    'Deep Focus Ambient',
    'Chill Piano',
    'Gaming Bass',
    'Nature Rain',
  ]) {
    assert.ok(titles.includes(expected), `Missing station ${expected}`);
  }

  assert.equal(VUX_AMBIENT_LAYERS.length, 4);
  assert.equal(formatAudioTime(0), '0:00');
  assert.equal(formatAudioTime(125), '2:05');
  assert.equal(normalizeCustomMp3Url('https://cdn.example.com/track.mp3'), 'https://cdn.example.com/track.mp3');
  assert.equal(normalizeCustomMp3Url('javascript:alert(1)'), null);
});

test('encodeVuxShareCode and decodeVuxShareCode round-trip custom themes, fonts, and custom CSS safely', () => {
  const code = encodeVuxShareCode({
    presetId: 'dracula-purple',
    customAccent: '#ff5c7c',
    animBgId: 'anim-particle-nebula-1',
    dynBgId: 'dcbg-aurora-1',
    fontId: 'dancing-script',
    layoutId: 'top-horizontal-tabs',
    cursorTrail: 'glow',
    customCss: '.card { border-radius: 16px; }',
  });
  assert.ok(code.startsWith('VUX1:'));
  const decoded = decodeVuxShareCode(code);
  assert.ok(decoded);
  assert.equal(decoded?.presetId, 'dracula-purple');
  assert.equal(decoded?.fontId, 'dancing-script');
  assert.equal(decoded?.cursorTrail, 'glow');
  assert.equal(decoded?.customCss, '.card { border-radius: 16px; }');
  assert.equal(decodeVuxShareCode('invalid-code'), null);
});

test('Discord-style chat channels and streak/badge evaluation work deterministically', () => {
  assert.deepEqual(
    VUX_CHAT_CHANNELS.map((c) => c.id),
    ['general', 'games', 'movies', 'links-and-themes']
  );
  const seed = getInitialVuxChatMessages(1000000);
  assert.ok(seed.length >= 5);
  assert.equal(sanitizeChatText('  hello \u0007 world  '), 'hello  world');

  const day1 = updateDailyStreak(
    {
      streakDays: 0,
      lastVisitDate: '',
      tabsOpened: 5,
      gamesLaunched: 3,
      themesTried: 3,
      messagesSent: 3,
      tracksPlayed: 1,
    },
    '2026-11-25'
  );
  assert.equal(day1.streakDays, 1);

  const day2 = updateDailyStreak(day1, '2026-11-26');
  assert.equal(day2.streakDays, 2);

  const badges = evaluateVuxBadges({ ...day2, streakDays: 3 });
  assert.ok(badges.includes('first-launch'));
  assert.ok(badges.includes('tab-explorer'));
  assert.ok(badges.includes('arcade-regular'));
  assert.ok(badges.includes('style-architect'));
  assert.ok(badges.includes('chatterbox'));
  assert.ok(badges.includes('audiophile'));
  assert.ok(badges.includes('streak-3'));
});

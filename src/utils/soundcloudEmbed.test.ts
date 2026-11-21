import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CURATED_SOUNDCLOUD_STATIONS,
  normalizeSoundCloudUrl,
  buildSoundCloudWidgetUrl,
  suggestTrackLabelFromUrl,
  sanitizePlaylistItems,
} from './soundcloudEmbed.ts';

test('normalizeSoundCloudUrl accepts tracks, playlists, and artist profiles while rejecting invalid URLs', () => {
  const valid = normalizeSoundCloudUrl('  https://soundcloud.com/lofi_girl/synthwave-radio  ');
  assert.equal(valid.ok, true);
  if (valid.ok) {
    assert.equal(valid.url, 'https://soundcloud.com/lofi_girl/synthwave-radio');
  }

  const profileUrl = normalizeSoundCloudUrl('https://soundcloud.com/chillhopdotcom');
  assert.equal(profileUrl.ok, true);
  if (profileUrl.ok) {
    assert.equal(profileUrl.url, 'https://soundcloud.com/chillhopdotcom');
  }

  const noScheme = normalizeSoundCloudUrl('soundcloud.com/artist/sets/study-mix');
  assert.equal(noScheme.ok, true);
  if (noScheme.ok) {
    assert.equal(noScheme.url, 'https://soundcloud.com/artist/sets/study-mix');
  }

  const shortUrl = normalizeSoundCloudUrl('https://on.soundcloud.com/abc123');
  assert.equal(shortUrl.ok, true);

  const nonSc = normalizeSoundCloudUrl('https://example.com/music.mp3');
  assert.equal(nonSc.ok, false);

  const xss = normalizeSoundCloudUrl('javascript:alert(1)');
  assert.equal(xss.ok, false);
});

test('buildSoundCloudWidgetUrl constructs full playlist widget URL with exact required flags', () => {
  const userUrl = 'https://soundcloud.com/monstercat/sets/rocket-league-x-monstercat';
  const widgetUrl = buildSoundCloudWidgetUrl(userUrl);
  assert.equal(
    widgetUrl,
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(userUrl)}&color=%2322c55e&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`
  );
});

test('CURATED_SOUNDCLOUD_STATIONS ships valid SoundCloud URLs for all 5 station categories', () => {
  assert.equal(CURATED_SOUNDCLOUD_STATIONS.length, 5);
  for (const station of CURATED_SOUNDCLOUD_STATIONS) {
    const check = normalizeSoundCloudUrl(station.url);
    assert.equal(check.ok, true);
    assert.ok(station.label.length > 0);
  }
});

test('suggestTrackLabelFromUrl produces readable title from track, set, or profile slug', () => {
  assert.equal(
    suggestTrackLabelFromUrl('https://soundcloud.com/artist/midnight-study-beats'),
    'Midnight Study Beats'
  );
  assert.equal(
    suggestTrackLabelFromUrl('https://soundcloud.com/lofi_girl'),
    'Lofi Girl'
  );
});

test('sanitizePlaylistItems filters invalid entries and deduplicates URLs', () => {
  const raw = JSON.stringify([
    { id: '1', name: 'Focus Mix', url: 'https://soundcloud.com/a/focus-mix' },
    { id: '2', name: 'Duplicate', url: 'https://soundcloud.com/a/focus-mix' },
    { id: '3', name: 'Bad Host', url: 'https://evil.test/track' },
    { id: '4', name: '', url: 'https://soundcloud.com/b/late-night' },
  ]);
  const cleaned = sanitizePlaylistItems(raw);
  assert.equal(cleaned.length, 2);
  assert.equal(cleaned[0].name, 'Focus Mix');
  assert.equal(cleaned[1].name, 'Late Night');
});

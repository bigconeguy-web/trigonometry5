export interface SoundCloudPlaylistEntry {
  id: string;
  name: string;
  url: string;
}

export type NormalizeSoundCloudResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

const SOUNDCLOUD_HOST_RE = /^(?:(?:www|m|on|w)\.)?soundcloud\.com$/i;

export function normalizeSoundCloudUrl(rawInput: string): NormalizeSoundCloudResult {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed) {
    return { ok: false, error: 'Please paste a SoundCloud track or playlist URL.' };
  }

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : /^[a-z0-9.-]+\.[a-z]{2,}/i.test(trimmed)
      ? `https://${trimmed}`
      : '';

  if (!withScheme) {
    return {
      ok: false,
      error: 'Please enter a valid https://soundcloud.com/... track or playlist URL.',
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return {
      ok: false,
      error: 'Please enter a valid https://soundcloud.com/... URL.',
    };
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { ok: false, error: 'Only HTTP/HTTPS SoundCloud links are supported.' };
  }

  if (!SOUNDCLOUD_HOST_RE.test(parsed.hostname)) {
    return {
      ok: false,
      error: 'URL must be a soundcloud.com link (e.g. https://soundcloud.com/artist/track).',
    };
  }

  if (parsed.hostname.toLowerCase() === 'w.soundcloud.com' && parsed.searchParams.has('url')) {
    const inner = parsed.searchParams.get('url') || '';
    if (inner) return normalizeSoundCloudUrl(inner);
  }

  const normalized = parsed.toString();
  return { ok: true, url: normalized };
}

export interface CuratedStationPreset {
  id: string;
  label: string;
  artist: string;
  url: string;
}

export const CURATED_SOUNDCLOUD_STATIONS: CuratedStationPreset[] = [
  { id: 'lofi', label: 'Lo-Fi Beats', artist: 'Lofi Girl', url: 'https://soundcloud.com/lofi_girl' },
  { id: 'synthwave', label: 'Synthwave', artist: 'NewRetroWave', url: 'https://soundcloud.com/newretrowave' },
  { id: 'vgm', label: 'Video Game OSTs', artist: 'OverClocked ReMix', url: 'https://soundcloud.com/ocremix' },
  { id: 'chillhop', label: 'Chillhop', artist: 'Chillhop Music', url: 'https://soundcloud.com/chillhopdotcom' },
  { id: 'electronic', label: 'Electronic', artist: 'NCS', url: 'https://soundcloud.com/nocopyrightsounds' },
];

export type SoundCloudArtistCategory = 'rap' | 'pop' | 'kpop';

export interface SoundCloudArtistExample {
  id: string;
  name: string;
  handle: string;
  category: SoundCloudArtistCategory;
  genreLabel: string;
  url: string;
}

export const SOUNDCLOUD_ARTIST_EXAMPLES: SoundCloudArtistExample[] = [
  // 10 Rappers
  { id: 'rap-kendrick', name: 'Kendrick Lamar', handle: 'kendrick-lamar-music', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/kendrick-lamar-music' },
  { id: 'rap-drake', name: 'Drake (OVO)', handle: 'octobersveryown', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/octobersveryown' },
  { id: 'rap-travis', name: 'Travis Scott', handle: 'travisscott-2', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/travisscott-2' },
  { id: 'rap-jcole', name: 'J. Cole', handle: 'j-cole', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/j-cole' },
  { id: 'rap-tyler', name: 'Tyler, The Creator', handle: 'tylerthecreator', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/tylerthecreator' },
  { id: 'rap-future', name: 'Future', handle: 'futureisnow', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/futureisnow' },
  { id: 'rap-carti', name: 'Playboi Carti', handle: 'playboicarti', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/playboicarti' },
  { id: 'rap-metro', name: 'Metro Boomin', handle: 'metroboomin', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/metroboomin' },
  { id: 'rap-21', name: '21 Savage', handle: '21savage', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/21savage' },
  { id: 'rap-ye', name: 'Kanye West', handle: 'kanyewest', category: 'rap', genreLabel: 'Rap', url: 'https://soundcloud.com/kanyewest' },

  // Famous Pop
  { id: 'pop-weeknd', name: 'The Weeknd', handle: 'theweeknd', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/theweeknd' },
  { id: 'pop-taylor', name: 'Taylor Swift', handle: 'taylorswiftofficial', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/taylorswiftofficial' },
  { id: 'pop-billie', name: 'Billie Eilish', handle: 'billieeilish', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/billieeilish' },
  { id: 'pop-ariana', name: 'Ariana Grande', handle: 'arianagrande', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/arianagrande' },
  { id: 'pop-dualipa', name: 'Dua Lipa', handle: 'dualipa', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/dualipa' },
  { id: 'pop-bruno', name: 'Bruno Mars', handle: 'brunomars', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/brunomars' },
  { id: 'pop-olivia', name: 'Olivia Rodrigo', handle: 'oliviarodrigo', category: 'pop', genreLabel: 'Pop', url: 'https://soundcloud.com/oliviarodrigo' },

  // K-Pop
  { id: 'kpop-bts', name: 'BTS (BANGTAN)', handle: 'bangtan', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/bangtan' },
  { id: 'kpop-blackpink', name: 'BLACKPINK', handle: 'blackpinkofficial', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/blackpinkofficial' },
  { id: 'kpop-newjeans', name: 'NewJeans', handle: 'newjeans-music', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/newjeans-music' },
  { id: 'kpop-straykids', name: 'Stray Kids', handle: 'straykidsofficial', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/straykidsofficial' },
  { id: 'kpop-twice', name: 'TWICE', handle: 'twiceofficial', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/twiceofficial' },
  { id: 'kpop-seventeen', name: 'SEVENTEEN', handle: 'seventeen17', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/seventeen17' },
  { id: 'kpop-aespa', name: 'aespa', handle: 'aespa-official', category: 'kpop', genreLabel: 'K-Pop', url: 'https://soundcloud.com/aespa-official' },
];

export function buildSoundCloudWidgetUrl(userUrl: string): string {
  const check = normalizeSoundCloudUrl(userUrl);
  const cleanUrl = check.ok ? check.url : String(userUrl || '').trim();
  return (
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}` +
    `&color=%2322c55e&auto_play=true&hide_related=false&show_comments=false` +
    `&show_user=true&show_reposts=false&show_teaser=true`
  );
}

export function suggestTrackLabelFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'SoundCloud Track';
    const rawSlug = segments[segments.length - 1] === 'sets' && segments.length > 1
      ? segments[segments.length - 2]
      : segments[segments.length - 1];
    const words = decodeURIComponent(rawSlug)
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!words) return 'SoundCloud Track';
    return words
      .split(' ')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
      .join(' ');
  } catch {
    return 'SoundCloud Track';
  }
}

export function sanitizePlaylistItems(rawJson: string | null | undefined): SoundCloudPlaylistEntry[] {
  if (!rawJson) return [];
  try {
    const parsed = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return [];
    const seenUrls = new Set<string>();
    const clean: SoundCloudPlaylistEntry[] = [];
    for (const item of parsed) {
      if (!item || typeof item.url !== 'string') continue;
      const check = normalizeSoundCloudUrl(item.url);
      if (!check.ok || seenUrls.has(check.url)) continue;
      seenUrls.add(check.url);
      const name = typeof item.name === 'string' && item.name.trim()
        ? item.name.trim()
        : suggestTrackLabelFromUrl(check.url);
      const id = typeof item.id === 'string' && item.id.trim()
        ? item.id.trim()
        : `sc_${clean.length + 1}`;
      clean.push({ id, name, url: check.url });
    }
    return clean;
  } catch {
    return [];
  }
}

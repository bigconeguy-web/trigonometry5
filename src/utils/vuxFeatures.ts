export interface VuxSharePayload {
  presetId?: string;
  customAccent?: string | null;
  animBgId?: string;
  dynBgId?: string;
  fontId?: string;
  layoutId?: string;
  cursorTrail?: string;
  customCss?: string;
}

export interface VuxChatChannel {
  id: 'general' | 'games' | 'movies' | 'links-and-themes';
  name: string;
  topic: string;
}

export interface VuxChatMessage {
  id: string;
  channelId: VuxChatChannel['id'];
  author: string;
  avatarColor: string;
  text: string;
  timestamp: number;
  replyToAuthor?: string;
  replyToSnippet?: string;
  reactions: Record<string, number>;
}

export interface VuxUserStats {
  streakDays: number;
  lastVisitDate: string;
  tabsOpened: number;
  gamesLaunched: number;
  themesTried: number;
  messagesSent: number;
  tracksPlayed: number;
}

export interface VuxBadgeDef {
  id: string;
  name: string;
  description: string;
  check: (stats: VuxUserStats) => boolean;
}

export const VUX_CHAT_CHANNELS: readonly VuxChatChannel[] = [
  { id: 'general', name: 'general', topic: 'Hangout, chill & share Vux tips' },
  { id: 'games', name: 'games', topic: 'Discuss gn-math, Seraph high scores & co-op links' },
  { id: 'movies', name: 'movies', topic: 'Cinema watchlists, embeds & show recommendations' },
  { id: 'links-and-themes', name: 'links-and-themes', topic: 'Share VUX1 theme codes & proxy bookmarks' },
];

export const VUX_BADGE_DEFS: readonly VuxBadgeDef[] = [
  { id: 'first-launch', name: 'First Launch', description: 'Opened the isolated Vux workspace', check: () => true },
  { id: 'tab-explorer', name: 'Tab Explorer', description: 'Opened 5+ proxy tabs', check: (s) => s.tabsOpened >= 5 },
  { id: 'arcade-regular', name: 'Arcade Regular', description: 'Launched 3+ games', check: (s) => s.gamesLaunched >= 3 },
  { id: 'style-architect', name: 'Style Architect', description: 'Tried 3+ themes or backgrounds', check: (s) => s.themesTried >= 3 },
  { id: 'chatterbox', name: 'Chatterbox', description: 'Sent 3+ messages in Vux Chat', check: (s) => s.messagesSent >= 3 },
  { id: 'audiophile', name: 'Audiophile', description: 'Played music in StudyHub MP3 Player', check: (s) => s.tracksPlayed >= 1 },
  { id: 'streak-3', name: '3-Day Streak', description: 'Visited Vux 3 days in a row', check: (s) => s.streakDays >= 3 },
  { id: 'power-user', name: 'Vux Power User', description: '10+ combined tabs & games launched', check: (s) => s.tabsOpened + s.gamesLaunched >= 10 },
];

export function encodeVuxShareCode(payload: VuxSharePayload): string {
  const clean: VuxSharePayload = {
    presetId: payload.presetId || 'coral-default',
    customAccent: payload.customAccent || null,
    animBgId: payload.animBgId || 'off',
    dynBgId: payload.dynBgId || 'off',
    fontId: payload.fontId || 'plus-jakarta-sans',
    layoutId: payload.layoutId || 'left-collapsible-default',
    cursorTrail: payload.cursorTrail || 'off',
    customCss: String(payload.customCss || '').slice(0, 1800),
  };
  const json = JSON.stringify(clean);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 1) {
    bin += String.fromCharCode(bytes[i]);
  }
  const b64 = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `VUX1:${b64}`;
}

export function decodeVuxShareCode(code: string | null | undefined): VuxSharePayload | null {
  const raw = String(code || '').trim();
  if (!raw.startsWith('VUX1:')) return null;
  const b64Part = raw.slice(5).replace(/-/g, '+').replace(/_/g, '/');
  if (!b64Part) return null;
  try {
    const padded = b64Part + '='.repeat((4 - (b64Part.length % 4)) % 4);
    const bin = atob(padded);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) {
      bytes[i] = bin.charCodeAt(i);
    }
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      presetId: typeof parsed.presetId === 'string' ? parsed.presetId : undefined,
      customAccent: typeof parsed.customAccent === 'string' ? parsed.customAccent : null,
      animBgId: typeof parsed.animBgId === 'string' ? parsed.animBgId : undefined,
      dynBgId: typeof parsed.dynBgId === 'string' ? parsed.dynBgId : undefined,
      fontId: typeof parsed.fontId === 'string' ? parsed.fontId : undefined,
      layoutId: typeof parsed.layoutId === 'string' ? parsed.layoutId : undefined,
      cursorTrail: typeof parsed.cursorTrail === 'string' ? parsed.cursorTrail : undefined,
      customCss: typeof parsed.customCss === 'string' ? parsed.customCss.slice(0, 1800) : '',
    };
  } catch {
    return null;
  }
}

export function sanitizeChatText(raw: string | null | undefined): string {
  return String(raw || '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, 500);
}

export function getInitialVuxChatMessages(nowMs: number = Date.now()): VuxChatMessage[] {
  return [
    {
      id: 'seed-gen-1',
      channelId: 'general',
      author: 'VuxBot',
      avatarColor: '#ff5c7c',
      text: 'Welcome to #general! Messages sync live across your open Vux tabs. Press Ctrl+K anytime for instant search.',
      timestamp: nowMs - 420000,
      reactions: { '👋': 4, '🔥': 3 },
    },
    {
      id: 'seed-gen-2',
      channelId: 'general',
      author: 'Nova',
      avatarColor: '#38bdf8',
      text: 'Try picking a Cursive & Calligraphy font or turning on Cursor Trails in Studio Settings — looks awesome over the Nebula canvas.',
      timestamp: nowMs - 180000,
      reactions: { '❤️': 2 },
    },
    {
      id: 'seed-games-1',
      channelId: 'games',
      author: 'Kai',
      avatarColor: '#34d399',
      text: 'Seraph + gn-math catalogs are both loaded. You can pop any game into the PiP mini-window while chatting here!',
      timestamp: nowMs - 300000,
      reactions: { '🎮': 5 },
    },
    {
      id: 'seed-movies-1',
      channelId: 'movies',
      author: 'Elena',
      avatarColor: '#a855f7',
      text: 'Internet Archive full public-domain classics play right inside the Cinema Theater player.',
      timestamp: nowMs - 240000,
      reactions: { '👍': 3 },
    },
    {
      id: 'seed-themes-1',
      channelId: 'links-and-themes',
      author: 'Milo',
      avatarColor: '#f59e0b',
      text: 'Drop your exported VUX1:... theme codes or favorite Speed-Dial links here to back them up.',
      timestamp: nowMs - 120000,
      reactions: { '🔥': 2 },
    },
  ];
}

export function updateDailyStreak(stats: VuxUserStats, todayIso: string): VuxUserStats {
  const prev = stats.lastVisitDate;
  if (prev === todayIso) return stats;
  let nextStreak = 1;
  if (prev) {
    const prevMs = Date.parse(`${prev}T00:00:00Z`);
    const curMs = Date.parse(`${todayIso}T00:00:00Z`);
    if (Number.isFinite(prevMs) && Number.isFinite(curMs)) {
      const diffDays = Math.round((curMs - prevMs) / 86400000);
      if (diffDays === 1) nextStreak = Math.max(1, stats.streakDays + 1);
    }
  }
  return {
    ...stats,
    streakDays: nextStreak,
    lastVisitDate: todayIso,
  };
}

export function evaluateVuxBadges(stats: VuxUserStats): string[] {
  return VUX_BADGE_DEFS.filter((b) => b.check(stats)).map((b) => b.id);
}

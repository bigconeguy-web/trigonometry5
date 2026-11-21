import { solveMathOrUnit, type MathSolveResult } from './studyHelper.js';

export type LocalSourceType = 'note' | 'flashcard' | 'calc' | 'app' | 'task' | 'game';

export interface BuiltinUtilityApp {
  key: string;
  title: string;
  category: string;
  description: string;
  keywords: string[];
}

export interface HighlightSegment {
  text: string;
  match: boolean;
}

export interface LocalSearchMatch {
  source: LocalSourceType;
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  score: number;
  actionPayload?: unknown;
}

export interface LocalWorkspaceSources {
  notes?: Array<{ id: string; title?: string; body?: string }>;
  flashcards?: Array<{ id: string; front: string; back: string; mastered?: boolean }>;
  calcHistory?: Array<{ expr: string; result?: string; res?: string }>;
  tasks?: Array<{ id: string; title: string; col?: string; priority?: string }>;
  games?: Array<{ id: string; name: string; provider?: string; author?: string }>;
  apps?: BuiltinUtilityApp[];
}

export const BUILTIN_UTILITY_APPS: BuiltinUtilityApp[] = [
  {
    key: 'calculator',
    title: 'Calculator',
    category: 'Study & Tools',
    description: 'Standard & scientific calculator with calculation history and DEG/RAD modes',
    keywords: ['math', 'scientific', 'trig', 'sin', 'cos', 'tan', 'sqrt', 'history', 'compute']
  },
  {
    key: 'notepad',
    title: 'Notepad',
    category: 'Study & Tools',
    description: 'Multi-note scratchpad with word count, local persistence, and .txt export',
    keywords: ['notes', 'text', 'editor', 'writing', 'document', 'scratchpad', 'export']
  },
  {
    key: 'flashcards',
    title: 'Flashcard Studio',
    category: 'Study & Tools',
    description: 'Interactive flip-cards, mastery tracking, and Term: Definition note import',
    keywords: ['study', 'cards', 'deck', 'quiz', 'memorize', 'flip', 'review']
  },
  {
    key: 'converter',
    title: 'Unit Converter',
    category: 'Study & Tools',
    description: 'Instant length, mass, temperature, data, speed, and time conversions',
    keywords: ['units', 'miles', 'km', 'celsius', 'fahrenheit', 'kg', 'pounds', 'bytes', 'convert']
  },
  {
    key: 'stopwatch',
    title: 'Stopwatch',
    category: 'Study & Tools',
    description: 'High-precision lap timer with split tracking',
    keywords: ['timer', 'lap', 'split', 'milliseconds', 'chronograph', 'time']
  },
  {
    key: 'timer',
    title: 'Focus Timer',
    category: 'Study & Tools',
    description: 'Pomodoro presets and custom countdown with Web Audio chime',
    keywords: ['pomodoro', 'countdown', 'alarm', 'focus', 'break', 'bell', 'clock']
  },
  {
    key: 'tasks',
    title: 'Task Board',
    category: 'Study & Tools',
    description: 'Visual To Do, In Progress, and Done Kanban board saved locally',
    keywords: ['kanban', 'todo', 'checklist', 'homework', 'assignments', 'planner']
  },
  {
    key: 'music',
    title: 'SoundCloud Hub',
    category: 'Play & Media',
    description: 'Curated stations, playlists, artist profiles, and persistent background audio',
    keywords: ['music', 'player', 'soundcloud', 'lofi', 'audio', 'playlist', 'beats', 'sound']
  },
  {
    key: 'games',
    title: 'Games & Links',
    category: 'Play & Media',
    description: 'Browse all games across GN-Math, UGS, and CKV libraries in multi-tab windows',
    keywords: ['play', 'arcade', 'gn', 'ugs', 'ckv', 'library', 'favorites']
  },
  {
    key: 'ckv',
    title: 'CKV Library',
    category: 'Play & Media',
    description: 'Browse ChickenKingsVault titles with cover art and fullscreen player',
    keywords: ['games', 'vault', 'ckv', 'thumbnails']
  },
  {
    key: 'palette',
    title: 'Color Studio',
    category: 'Customize',
    description: 'Generate color harmonies, copy HEX codes, and build live CSS gradients',
    keywords: ['colors', 'hex', 'gradient', 'design', 'harmony', 'swatch']
  },
  {
    key: 'settings',
    title: 'Settings',
    category: 'Customize',
    description: '24 color themes, background FX presets, typography, FPS, and Tab Cloak',
    keywords: ['themes', 'appearance', 'dark', 'light', 'cloak', 'background', 'stars', 'backup', 'export']
  }
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractQueryTokens(query: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const trimmed = String(query || '').trim();
  if (!trimmed) return out;
  const raw = trimmed.split(/\s+/).filter(Boolean);
  if (raw.length > 1) {
    seen.add(trimmed.toLowerCase());
    out.push(trimmed);
  }
  for (const tk of raw) {
    const low = tk.toLowerCase();
    if (!seen.has(low)) {
      seen.add(low);
      out.push(tk);
    }
  }
  return out;
}

export function getHighlightSegments(text: string, query: string): HighlightSegment[] {
  const rawText = String(text || '');
  if (!rawText) return [];
  const tokens = extractQueryTokens(query).sort((a, b) => b.length - a.length);
  if (tokens.length === 0) return [{ text: rawText, match: false }];

  const pattern = new RegExp(`(${tokens.map(escapeRegex).join('|')})`, 'gi');
  const parts = rawText.split(pattern);
  const tokenSet = new Set(tokens.map((t) => t.toLowerCase()));
  const segments: HighlightSegment[] = [];

  for (const part of parts) {
    if (!part) continue;
    segments.push({
      text: part,
      match: tokenSet.has(part.toLowerCase())
    });
  }
  return segments;
}

export function detectOfflineMathOrUnit(rawInput: string): MathSolveResult {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed) return { matched: false, steps: [] };

  // Avoid treating plain standalone numbers (e.g., "42" or "2026") as math answers
  const hasMathSignal =
    /[+\-*/^%()=×÷−√]|\b(?:to|in|into|of|off|on|sqrt|abs|sin|cos|tan|log|ln|round|floor|ceil|solve|convert|what\s+is|calculate)\b/i.test(
      trimmed
    );
  if (!hasMathSignal) {
    return { matched: false, steps: [] };
  }

  return solveMathOrUnit(trimmed);
}

function scoreFieldMatch(field: string, fullQueryLower: string, tokens: string[]): number {
  const low = String(field || '').toLowerCase();
  if (!low) return 0;
  let score = 0;
  if (low === fullQueryLower) score += 120;
  else if (low.startsWith(fullQueryLower)) score += 70;
  else if (low.includes(fullQueryLower)) score += 40;

  for (const tk of tokens) {
    const tkLow = tk.toLowerCase();
    if (low === tkLow) score += 25;
    else if (low.includes(tkLow)) score += 12;
  }
  return score;
}

function buildSnippet(body: string, tokens: string[], maxLen = 135): string {
  const compact = String(body || '').replace(/\s+/g, ' ').trim();
  if (!compact) return '';
  if (compact.length <= maxLen) return compact;

  const lower = compact.toLowerCase();
  let firstIdx = -1;
  for (const tk of tokens) {
    const idx = lower.indexOf(tk.toLowerCase());
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
      firstIdx = idx;
    }
  }

  if (firstIdx <= 30) {
    return compact.slice(0, maxLen - 3).trimEnd() + '...';
  }
  const start = Math.max(0, firstIdx - 32);
  const end = Math.min(compact.length, start + maxLen - 6);
  return (start > 0 ? '...' : '') + compact.slice(start, end).trim() + (end < compact.length ? '...' : '');
}

export function searchLocalWorkspace(
  query: string,
  sources: LocalWorkspaceSources
): LocalSearchMatch[] {
  const trimmed = String(query || '').trim();
  const qLower = trimmed.toLowerCase();
  if (!qLower) return [];

  const tokens = extractQueryTokens(trimmed).map((t) => t.toLowerCase());
  const matchesAll = (haystack: string): boolean => {
    const low = haystack.toLowerCase();
    return tokens.every((tk) => low.includes(tk));
  };

  const results: LocalSearchMatch[] = [];

  // 1. Built-In Utility Apps
  const apps = sources.apps || BUILTIN_UTILITY_APPS;
  apps.forEach((app) => {
    const keywordText = (app.keywords || []).join(' ');
    const combined = `${app.title} ${app.category} ${app.description} ${keywordText}`;
    if (matchesAll(combined)) {
      const score =
        scoreFieldMatch(app.title, qLower, tokens) * 2 +
        scoreFieldMatch(keywordText, qLower, tokens) +
        scoreFieldMatch(app.description, qLower, tokens) +
        15;
      results.push({
        source: 'app',
        id: 'app_' + app.key,
        title: app.title,
        subtitle: app.description,
        meta: `Built-In App · ${app.category}`,
        score,
        actionPayload: app.key
      });
    }
  });

  // 2. Notepad Documents
  (sources.notes || []).forEach((note) => {
    const title = (note.title || 'Untitled Note').trim();
    const body = (note.body || '').trim();
    const combined = `${title} ${body}`;
    if (matchesAll(combined)) {
      const words = body ? body.split(/\s+/).filter(Boolean).length : 0;
      const score =
        scoreFieldMatch(title, qLower, tokens) * 2 +
        scoreFieldMatch(body, qLower, tokens) +
        20;
      results.push({
        source: 'note',
        id: note.id,
        title,
        subtitle: buildSnippet(body, tokens) || 'Empty note document',
        meta: `Notepad · ${words} ${words === 1 ? 'word' : 'words'}`,
        score,
        actionPayload: note.id
      });
    }
  });

  // 3. Saved Flashcards
  (sources.flashcards || []).forEach((card, index) => {
    const front = (card.front || '').trim();
    const back = (card.back || '').trim();
    if (matchesAll(`${front} ${back}`)) {
      const score =
        scoreFieldMatch(front, qLower, tokens) * 2 +
        scoreFieldMatch(back, qLower, tokens) +
        18;
      results.push({
        source: 'flashcard',
        id: card.id || `fc_${index}`,
        title: front,
        subtitle: buildSnippet(back, tokens) || 'No back text',
        meta: `Flashcard Studio · ${card.mastered ? 'Mastered' : 'Active Deck'}`,
        score,
        actionPayload: { id: card.id, index }
      });
    }
  });

  // 4. Calculator History
  (sources.calcHistory || []).forEach((item, idx) => {
    const expr = String(item.expr || '').trim();
    const resVal = String(item.result ?? item.res ?? '').trim();
    if (!expr && !resVal) return;
    if (matchesAll(`${expr} ${resVal}`)) {
      const score =
        scoreFieldMatch(expr, qLower, tokens) +
        scoreFieldMatch(resVal, qLower, tokens) +
        14;
      results.push({
        source: 'calc',
        id: 'calc_' + idx,
        title: `${expr} = ${resVal}`,
        subtitle: 'Click to open Calculator with this entry',
        meta: 'Calculator History',
        score,
        actionPayload: { expr, result: resVal }
      });
    }
  });

  // 5. Task Board Items
  (sources.tasks || []).forEach((task) => {
    const title = (task.title || '').trim();
    const colLabel =
      task.col === 'doing' ? 'In Progress' : task.col === 'done' ? 'Done' : 'To Do';
    if (matchesAll(`${title} ${colLabel}`)) {
      const score = scoreFieldMatch(title, qLower, tokens) * 1.5 + 10;
      results.push({
        source: 'task',
        id: task.id,
        title,
        subtitle: `Status: ${colLabel}`,
        meta: 'Task Board',
        score,
        actionPayload: task.id
      });
    }
  });

  // 6. Cached In-Memory Games (capped cleanly, 0 network requests)
  let gameHits = 0;
  for (const game of sources.games || []) {
    if (gameHits >= 12) break;
    const provider = (game.provider || 'game').toUpperCase();
    if (matchesAll(`${game.name || ''} ${game.author || ''} ${provider}`)) {
      const score = scoreFieldMatch(game.name || '', qLower, tokens) + 5;
      results.push({
        source: 'game',
        id: game.id,
        title: game.name,
        subtitle: game.author ? `By ${game.author}` : 'Launch in new game tab',
        meta: `Library · ${provider}`,
        score,
        actionPayload: game
      });
      gameHits++;
    }
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

export function addRecentSearchItem(
  existing: string[],
  nextQuery: string,
  maxItems = 12
): string[] {
  const clean = String(nextQuery || '').trim();
  if (!clean) return existing.slice(0, maxItems);
  const filtered = existing.filter((item) => item.toLowerCase() !== clean.toLowerCase());
  return [clean, ...filtered].slice(0, maxItems);
}

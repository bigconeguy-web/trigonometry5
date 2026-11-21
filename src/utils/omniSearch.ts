import { solveMathOrUnit, type MathSolveResult } from './studyHelper.js';

export type OmniIntent =
  | { type: 'empty' }
  | { type: 'url'; url: string; host: string }
  | { type: 'math'; query: string; math: MathSolveResult; isSingleWord: boolean }
  | { type: 'search'; query: string; isSingleWord: boolean };

export interface OmniBookmark {
  id: string;
  label: string;
  value: string;
  kind: 'url' | 'query';
}

export interface PortalSearchMatch {
  source: 'game' | 'note' | 'calc' | 'flashcard' | 'task';
  id: string;
  title: string;
  subtitle: string;
  actionPayload?: unknown;
}

const KNOWN_MULTI_WORD_BLOCK = /\s/;
const DOMAIN_HOST_RE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,18}(?::\d{1,5})?(?:[/?#].*)?$/i;
const LOCAL_HOST_RE = /^(?:localhost|127\.0\.0\.1)(?::\d{1,5})?(?:[/?#].*)?$/i;

export function normalizeOmniUrl(rawInput: string): string | null {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed || KNOWN_MULTI_WORD_BLOCK.test(trimmed)) return null;

  let candidate = '';
  if (/^https?:\/\//i.test(trimmed)) {
    candidate = trimmed;
  } else if (LOCAL_HOST_RE.test(trimmed)) {
    candidate = 'http://' + trimmed;
  } else if (DOMAIN_HOST_RE.test(trimmed)) {
    candidate = 'https://' + trimmed;
  } else {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (!parsed.hostname) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function isSingleDictionaryWord(rawInput: string): boolean {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed || /\s/.test(trimmed)) return false;
  return /^[a-zA-Z]{2,}(?:-[a-zA-Z]+)?$/.test(trimmed);
}

export function detectOmniIntent(rawInput: string): OmniIntent {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed) return { type: 'empty' };

  const normalizedUrl = normalizeOmniUrl(trimmed);
  if (normalizedUrl) {
    let host = trimmed;
    try {
      host = new URL(normalizedUrl).hostname;
    } catch {}
    return { type: 'url', url: normalizedUrl, host };
  }

  const math = solveMathOrUnit(trimmed);
  if (math && math.matched) {
    return {
      type: 'math',
      query: trimmed,
      math,
      isSingleWord: false
    };
  }

  return {
    type: 'search',
    query: trimmed,
    isSingleWord: isSingleDictionaryWord(trimmed)
  };
}

export function buildDuckDuckGoApiUrl(query: string): string {
  return (
    'https://api.duckduckgo.com/?q=' +
    encodeURIComponent(String(query || '').trim()) +
    '&format=json&no_html=1&skip_disambig=1'
  );
}

export function buildWikipediaSearchApiUrl(query: string, limit = 10): string {
  return (
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
    encodeURIComponent(String(query || '').trim()) +
    '&srlimit=' +
    Math.max(1, Math.min(20, limit)) +
    '&format=json&origin=*'
  );
}

export function buildWikipediaExtractApiUrl(title: string): string {
  return (
    'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=' +
    encodeURIComponent(String(title || '').trim()) +
    '&format=json&origin=*'
  );
}

export function buildDictionaryApiUrl(word: string): string {
  return 'https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(String(word || '').trim().toLowerCase());
}

export function buildExternalSearchUrls(query: string): {
  duckduckgo: string;
  google: string;
  images: string;
} {
  const q = encodeURIComponent(String(query || '').trim());
  return {
    duckduckgo: `https://duckduckgo.com/?q=${q}`,
    google: `https://www.google.com/search?q=${q}`,
    images: `https://duckduckgo.com/?q=${q}&iax=images&ia=images`
  };
}

export function stripHtmlSnippet(htmlText: string): string {
  return String(htmlText || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function resolveDuckDuckGoImageUrl(imagePath: string): string {
  const clean = String(imagePath || '').trim();
  if (!clean) return '';
  if (/^https?:\/\//i.test(clean)) return clean;
  if (clean.startsWith('//')) return 'https:' + clean;
  if (clean.startsWith('/')) return 'https://duckduckgo.com' + clean;
  return clean;
}

export function addRecentSearchItem(
  existing: string[],
  nextQuery: string,
  maxItems = 12
): string[] {
  const clean = String(nextQuery || '').trim();
  if (!clean) return existing.slice(0, maxItems);
  const filtered = existing.filter(item => item.toLowerCase() !== clean.toLowerCase());
  return [clean, ...filtered].slice(0, maxItems);
}

export function searchMyPortalData(
  query: string,
  sources: {
    notes?: Array<{ id: string; title?: string; body?: string }>;
    calcHistory?: Array<{ expr: string; res: string }>;
    games?: Array<{ id: string; name: string; provider?: string; author?: string }>;
    flashcards?: Array<{ id: string; front: string; back: string }>;
    tasks?: Array<{ id: string; title: string; col?: string }>;
  }
): PortalSearchMatch[] {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const matchesAll = (haystack: string): boolean => {
    const low = haystack.toLowerCase();
    return tokens.every(tk => low.includes(tk));
  };

  const results: PortalSearchMatch[] = [];

  (sources.notes || []).forEach(note => {
    const title = (note.title || 'Untitled Note').trim();
    const body = (note.body || '').trim();
    if (matchesAll(title + ' ' + body)) {
      results.push({
        source: 'note',
        id: note.id,
        title,
        subtitle: body.slice(0, 120) || 'Empty note',
        actionPayload: note.id
      });
    }
  });

  (sources.calcHistory || []).forEach((item, idx) => {
    if (matchesAll(item.expr + ' ' + item.res)) {
      results.push({
        source: 'calc',
        id: 'calc_' + idx,
        title: `${item.expr} = ${item.res}`,
        subtitle: 'Saved calculation',
        actionPayload: item.expr
      });
    }
  });

  (sources.flashcards || []).forEach(card => {
    if (matchesAll(card.front + ' ' + card.back)) {
      results.push({
        source: 'flashcard',
        id: card.id,
        title: card.front,
        subtitle: card.back.slice(0, 120),
        actionPayload: card.id
      });
    }
  });

  (sources.tasks || []).forEach(task => {
    if (matchesAll(task.title)) {
      results.push({
        source: 'task',
        id: task.id,
        title: task.title,
        subtitle: 'Task Board · ' + (task.col === 'doing' ? 'In Progress' : task.col === 'done' ? 'Done' : 'To Do'),
        actionPayload: task.id
      });
    }
  });

  let gameHits = 0;
  for (const game of sources.games || []) {
    if (gameHits >= 12) break;
    if (matchesAll((game.name || '') + ' ' + (game.author || '') + ' ' + (game.provider || ''))) {
      results.push({
        source: 'game',
        id: game.id,
        title: game.name,
        subtitle: [(game.provider || 'game').toUpperCase(), game.author || ''].filter(Boolean).join(' · '),
        actionPayload: game
      });
      gameHits++;
    }
  }

  return results;
}

import {
  ensureBaseHref,
  buildFallbackGameFetchUrls,
  getBlobStorageShimTag,
  getSafePerformanceTag,
} from './gameRuntime';
import {
  parseUgsTree,
  getFallbackUgsCatalog,
  UGS_CDN_BASE,
  type GitHubTreeItem,
} from './ugsCatalog';
import {
  parseCkvTree,
  getFallbackCkvCatalog,
  serializeCkvCache,
  deserializeCkvCache,
  CKV_CDN_BASE,
} from './ckvCatalog';
import type { UnifiedPortalGame } from './valbrowseConfig';

export const GN_COVER_URL = 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main';
export const GN_HTML_URL = 'https://cdn.jsdelivr.net/gh/freebuisness/html@main';
export const GN_SCRIPT_PORTAL_URLS = [
  'https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html',
  'https://fastly.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html',
  'https://gcore.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html',
  'https://raw.githubusercontent.com/gn-math/gn-math.github.io/main/index.html',
];

const GN_ZONES_MIRRORS = [
  'https://cdn.jsdelivr.net/gh/freebuisness/assets@main/zones.json',
  'https://fastly.jsdelivr.net/gh/freebuisness/assets@main/zones.json',
  'https://gcore.jsdelivr.net/gh/freebuisness/assets@master/zones.json',
];

const UGS_TREE_URLS = [
  { branch: 'main', url: 'https://api.github.com/repos/bubbls/UGS-Assets/git/trees/main?recursive=1' },
  { branch: 'master', url: 'https://api.github.com/repos/bubbls/UGS-Assets/git/trees/master?recursive=1' },
];

const CKV_TREE_URLS = [
  { branch: 'main', url: 'https://api.github.com/repos/WanoCapy/ChickenKingsVault/git/trees/main?recursive=1' },
  { branch: 'master', url: 'https://api.github.com/repos/WanoCapy/ChickenKingsVault/git/trees/master?recursive=1' },
];

export type PopularityPeriod = 'day' | 'week' | 'month' | 'year';

export interface CuratedMovieItem {
  id: string;
  title: string;
  genre: string;
  desc: string;
  thumb: string;
}

export const CURATED_MOVIES: CuratedMovieItem[] = [
  {
    id: 'night_of_the_living_dead',
    title: 'Night of the Living Dead (1968)',
    genre: 'sci-fi',
    desc: 'Classic horror sci-fi feature directed by George A. Romero.',
    thumb: 'https://archive.org/services/img/night_of_the_living_dead',
  },
  {
    id: 'SteamboatWillie',
    title: 'Steamboat Willie (1928)',
    genre: 'animation',
    desc: 'Historic classic black-and-white animated short.',
    thumb: 'https://archive.org/services/img/SteamboatWillie',
  },
  {
    id: 'superman_1941',
    title: 'Superman: The Mad Scientist (1941)',
    genre: 'animation',
    desc: 'Fleischer Studios classic animated sci-fi short.',
    thumb: 'https://archive.org/services/img/superman_1941',
  },
  {
    id: 'House_on_Haunted_Hill_1959',
    title: 'House on Haunted Hill (1959)',
    genre: 'noir',
    desc: 'Vincent Price stars in this classic suspense mystery.',
    thumb: 'https://archive.org/services/img/House_on_Haunted_Hill_1959',
  },
  {
    id: 'The_General_1926',
    title: 'The General (1926)',
    genre: 'comedy',
    desc: 'Buster Keaton silent comedy action masterpiece.',
    thumb: 'https://archive.org/services/img/The_General_1926',
  },
  {
    id: 'Charade_1963',
    title: 'Charade (1963)',
    genre: 'noir',
    desc: 'Cary Grant & Audrey Hepburn classic thriller.',
    thumb: 'https://archive.org/services/img/Charade_1963',
  },
  {
    id: 'Plan_9_from_Outer_Space_1959',
    title: 'Plan 9 from Outer Space (1959)',
    genre: 'sci-fi',
    desc: 'Cult classic retro sci-fi space adventure.',
    thumb: 'https://archive.org/services/img/Plan_9_from_Outer_Space_1959',
  },
  {
    id: 'GulliversTravels1939',
    title: "Gulliver's Travels (1939)",
    genre: 'animation',
    desc: 'Full-length Fleischer Studios Technicolor animated feature.',
    thumb: 'https://archive.org/services/img/GulliversTravels1939',
  },
];

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 7000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function cleanAuthor(raw: unknown): string | undefined {
  const val = String(raw || '').trim();
  if (!val) return undefined;
  if (/gn[\s._-]*math|freebuisness|bubbls|ugs|ckv|wanocapy|chickenkingsvault|jsdelivr|github/i.test(val)) {
    return undefined;
  }
  return val;
}

export async function fetchGnMathZones(): Promise<{ ok: boolean; items: UnifiedPortalGame[] }> {
  const mirrors = [...GN_ZONES_MIRRORS];

  try {
    const shaRes = await fetchWithTimeout(
      `https://api.github.com/repos/freebuisness/assets/commits?t=${Date.now()}`,
      {},
      4500
    );
    if (shaRes.ok) {
      const shaJson = await shaRes.json();
      const sha = Array.isArray(shaJson) && shaJson[0]?.sha;
      if (sha) {
        mirrors.unshift(`https://cdn.jsdelivr.net/gh/freebuisness/assets@${sha}/zones.json`);
      }
    }
  } catch {
    try {
      const txtRes = await fetchWithTimeout(
        `https://raw.githubusercontent.com/freebuisness/xml/refs/heads/main/sha.txt?t=${Date.now()}`,
        {},
        3500
      );
      if (txtRes.ok) {
        const sha = (await txtRes.text()).trim();
        if (sha) {
          mirrors.unshift(`https://cdn.jsdelivr.net/gh/freebuisness/assets@${sha}/zones.json`);
        }
      }
    } catch {
      // fall through to default mirrors
    }
  }

  for (const url of mirrors) {
    try {
      const res = await fetchWithTimeout(`${url}?t=${Date.now()}`, {}, 7500);
      if (!res.ok) continue;
      const json = await res.json();
      if (!Array.isArray(json)) continue;

      const items: UnifiedPortalGame[] = json
        .filter(
          (z) =>
            z &&
            typeof z.id === 'number' &&
            z.id >= 0 &&
            typeof z.url === 'string' &&
            z.url.includes('{HTML_URL}') &&
            !/discord\.gg|suggest games/i.test(z.name || '')
        )
        .map((z, idx) => ({
          id: `gn:${z.id}`,
          numericId: z.id,
          provider: 'gn' as const,
          name: String(z.name || 'Untitled').trim(),
          author: cleanAuthor(z.author),
          special: Array.isArray(z.special) ? z.special : [],
          url: String(z.url).replace('{COVER_URL}', GN_COVER_URL).replace('{HTML_URL}', GN_HTML_URL),
          baseUrl: `${GN_HTML_URL}/`,
          cover: z.cover
            ? String(z.cover).replace('{COVER_URL}', GN_COVER_URL).replace('{HTML_URL}', GN_HTML_URL)
            : null,
          featured: Boolean(z.featured) || idx < 12,
        }));

      if (items.length > 0) {
        return { ok: true, items };
      }
    } catch {
      // try next mirror
    }
  }

  return { ok: false, items: [] };
}

export async function fetchGnMathPopularity(
  _period: PopularityPeriod
): Promise<Record<number, number>> {
  return {};
}

export async function fetchUgsGames(forceRefresh = false): Promise<{ ok: boolean; items: UnifiedPortalGame[] }> {
  const CACHE_KEY = 'valbrowse_ugs_cache_v1';
  if (!forceRefresh) {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.savedAt === 'number' &&
          Date.now() - parsed.savedAt < 30 * 60 * 1000 &&
          Array.isArray(parsed.items) &&
          parsed.items.length > 0
        ) {
          return { ok: true, items: parsed.items };
        }
      }
    } catch {
      // ignore cache errors
    }
  }

  for (const entry of UGS_TREE_URLS) {
    try {
      const res = await fetchWithTimeout(
        entry.url,
        { headers: { Accept: 'application/vnd.github+json' } },
        6500
      );
      if (!res.ok) continue;
      const json = await res.json();
      if (json && Array.isArray(json.tree)) {
        const cdnBase = `https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@${entry.branch}`;
        const parsed = parseUgsTree(json.tree as GitHubTreeItem[], cdnBase).map((g) => ({
          id: g.id,
          provider: 'ugs' as const,
          name: g.name,
          url: g.url,
          baseUrl: g.baseUrl,
          cover: g.cover,
          featured: g.featured,
        }));
        if (parsed.length > 0) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), items: parsed }));
          } catch {
            // ignore quota errors
          }
          return { ok: true, items: parsed };
        }
      }
    } catch {
      // try next branch
    }
  }

  return {
    ok: false,
    items: getFallbackUgsCatalog(UGS_CDN_BASE).map((g) => ({
      id: g.id,
      provider: 'ugs' as const,
      name: g.name,
      url: g.url,
      baseUrl: g.baseUrl,
      cover: g.cover,
      featured: g.featured,
    })),
  };
}

export async function fetchCkvGames(forceRefresh = false): Promise<{ ok: boolean; items: UnifiedPortalGame[] }> {
  const CACHE_KEY = 'valbrowse_ckv_cache_v1';
  if (!forceRefresh) {
    try {
      const cached = deserializeCkvCache(localStorage.getItem(CACHE_KEY));
      if (cached && cached.length > 0) {
        return {
          ok: true,
          items: cached.map((g) => ({
            id: g.id,
            provider: 'ckv' as const,
            name: g.name,
            url: g.url,
            baseUrl: g.baseUrl,
            cover: g.cover,
            featured: g.featured,
          })),
        };
      }
    } catch {
      // ignore
    }
  }

  for (const entry of CKV_TREE_URLS) {
    try {
      const res = await fetchWithTimeout(
        entry.url,
        { headers: { Accept: 'application/vnd.github+json' } },
        6500
      );
      if (!res.ok) continue;
      const json = await res.json();
      if (json && Array.isArray(json.tree)) {
        const cdnBase = `https://cdn.jsdelivr.net/gh/WanoCapy/ChickenKingsVault@${entry.branch}`;
        const parsed = parseCkvTree(json.tree as GitHubTreeItem[], cdnBase);
        if (parsed.length > 0) {
          try {
            localStorage.setItem(CACHE_KEY, serializeCkvCache(parsed, cdnBase));
          } catch {
            // ignore
          }
          return {
            ok: true,
            items: parsed.map((g) => ({
              id: g.id,
              provider: 'ckv' as const,
              name: g.name,
              url: g.url,
              baseUrl: g.baseUrl,
              cover: g.cover,
              featured: g.featured,
            })),
          };
        }
      }
    } catch {
      // try next branch
    }
  }

  return {
    ok: false,
    items: getFallbackCkvCatalog(CKV_CDN_BASE).map((g) => ({
      id: g.id,
      provider: 'ckv' as const,
      name: g.name,
      url: g.url,
      baseUrl: g.baseUrl,
      cover: g.cover,
      featured: g.featured,
    })),
  };
}

function getEscapeForwarderTag(): string {
  return `<script data-valbrowse-panic="1">(function(){if(window.__valbrowsePanicBound)return;window.__valbrowsePanicBound=true;window.addEventListener("keydown",function(e){if(e&&e.key==="Escape"){try{window.parent.postMessage({type:"valbrowse-panic"},"*");}catch(_e){}try{if(window.top)window.top.location.replace("https://classroom.google.com");}catch(_e){}}},true);})();<\/script>`;
}

export async function fetchGameDocumentHtml(
  primaryUrl: string,
  baseUrl: string
): Promise<string | null> {
  const candidates = buildFallbackGameFetchUrls(primaryUrl);
  for (const candidate of candidates) {
    try {
      const res = await fetchWithTimeout(candidate, {}, 9000);
      if (!res.ok) continue;
      const html = await res.text();
      if (!html || html.length < 40) continue;
      const withBase = ensureBaseHref(html, baseUrl);
      const injections = `${getBlobStorageShimTag()}${getSafePerformanceTag()}${getEscapeForwarderTag()}`;
      if (/<head\b[^>]*>/i.test(withBase)) {
        return withBase.replace(/(<head\b[^>]*>)/i, `$1${injections}`);
      }
      return `${injections}${withBase}`;
    } catch {
      // try next mirror
    }
  }
  return null;
}

export async function fetchUpstreamGnMathHtml(): Promise<string | null> {
  for (const url of GN_SCRIPT_PORTAL_URLS) {
    try {
      const res = await fetchWithTimeout(`${url}?t=${Date.now()}`, {}, 9000);
      if (!res.ok) continue;
      const html = await res.text();
      if (!html || html.length < 200) continue;
      const withBase = ensureBaseHref(
        html,
        'https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/'
      );
      const injections = `${getBlobStorageShimTag()}${getEscapeForwarderTag()}`;
      if (/<head\b[^>]*>/i.test(withBase)) {
        return withBase.replace(/(<head\b[^>]*>)/i, `$1${injections}`);
      }
      return `${injections}${withBase}`;
    } catch {
      // try next mirror
    }
  }
  return null;
}

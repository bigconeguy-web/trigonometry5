import type { StudyModuleItem } from '../data/studyCatalog.js';
import { normalizeTitleKey } from './ugsCatalog.js';

export const DEFAULT_WISP_URL = 'wss://wisp.mercurywork.shop/';
export const RENDER_WISP_URL = 'wss://my-wisp-server-ocnq.onrender.com/wisp/';
export const VUX_AI_TARGET_URL = 'https://duck.ai';
export const LEGACY_DEFAULT_WISP_URLS = [
  'wss://my-wisp-server-ocnq.onrender.com/wisp/',
  'wss://my-wisp-server-ocnq.onrender.com/',
];
export const PANIC_REDIRECT_URL = 'https://classroom.google.com';
export const CLASSROOM_FAVICON_URL = 'https://ssl.gstatic.com/classroom/ic_product_classroom_144.png';
export const STANDALONE_WINDOW_NAME = 'VALemStandalone';
export const STANDALONE_IFRAME_NAME = 'VALemStandaloneFrame';
export const STANDALONE_WINDOW_FEATURES =
  'popup=yes,width=1280,height=800,left=100,top=100,menubar=no,toolbar=no,location=no,status=no,resizable=yes';

export interface KeyboardTriggerLike {
  key?: string;
  repeat?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}

export function isStandaloneControlKeyTrigger(e: KeyboardTriggerLike | null | undefined): boolean {
  if (!e) return false;
  return e.key === 'Control' && !e.repeat && !e.altKey && !e.shiftKey && !e.metaKey;
}

export function isInsideStandaloneBlobFrame(
  search: string | null | undefined,
  windowName: string | null | undefined
): boolean {
  try {
    const params = new URLSearchParams(String(search || ''));
    return params.get('vb') === '1' && String(windowName || '') === STANDALONE_IFRAME_NAME;
  } catch {
    return false;
  }
}

export const VALBROWSE_WISP_STORAGE_KEY = 'valbrowse_wisp_url';
export const LEGACY_WISP_STORAGE_KEY = 'gn_scramjet_wisp';
export const EULER_FAVS_KEY = 'euler_favs';

export type BareMuxTransportMode = 'libcurl';
export const DEFAULT_BAREMUX_TRANSPORT: BareMuxTransportMode = 'libcurl';
export const BAREMUX_TRANSPORT_STORAGE_KEY = 'valem_baremux_transport';
export const BAREMUX_TRANSPORT_PATHS: Record<BareMuxTransportMode, string> = {
  libcurl: '/libcurl/index.mjs',
};

export function normalizeTransportMode(_raw: string | null | undefined): BareMuxTransportMode {
  return 'libcurl';
}

export type ValemHomeLayout = 'split' | 'normal' | 'side' | 'minimal';
export const DEFAULT_HOME_LAYOUT: ValemHomeLayout = 'split';
export const VALID_HOME_LAYOUTS: readonly ValemHomeLayout[] = ['split', 'normal', 'side', 'minimal'];

export function normalizeHomeLayout(raw: string | null | undefined): ValemHomeLayout {
  const val = String(raw || '').trim().toLowerCase();
  if (val === 'normal' || val === 'side' || val === 'minimal') return val;
  return 'split';
}

export interface AppShortcutItem {
  id: string;
  label: string;
  subtitle: string;
  url: string;
  iconKey: string;
}

export const VALEM_SHORTCUTS_STORAGE_KEY = 'valem_user_shortcuts';

export const DEFAULT_APP_SHORTCUTS: readonly AppShortcutItem[] = [
  { id: 'discord', label: 'Discord', subtitle: 'discord.com', url: 'https://discord.com/app', iconKey: 'discord' },
  { id: 'snapchat', label: 'Snapchat', subtitle: 'web.snapchat.com', url: 'https://web.snapchat.com', iconKey: 'snapchat' },
  { id: 'kick', label: 'Kick', subtitle: 'kick.com', url: 'https://kick.com', iconKey: 'kick' },
  { id: 'twitch', label: 'Twitch', subtitle: 'twitch.tv', url: 'https://www.twitch.tv', iconKey: 'twitch' },
  { id: 'reddit', label: 'Reddit', subtitle: 'reddit.com', url: 'https://www.reddit.com', iconKey: 'reddit' },
  { id: 'roblox', label: 'Roblox', subtitle: 'nowgg.fun', url: 'https://nowgg.fun', iconKey: 'roblox' },
];

export function normalizeShortcutUrl(raw: string | null | undefined): string | null {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return null;
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) return null;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (!parsed.hostname || !parsed.hostname.includes('.')) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function sanitizeAppShortcuts(rawList: unknown): AppShortcutItem[] {
  if (!Array.isArray(rawList)) return DEFAULT_APP_SHORTCUTS.map((s) => ({ ...s }));
  const out: AppShortcutItem[] = [];
  const seenUrls = new Set<string>();
  for (const item of rawList) {
    if (!item || typeof item !== 'object') continue;
    const rec = item as Partial<AppShortcutItem>;
    const label = String(rec.label || '').trim().slice(0, 28);
    const url = normalizeShortcutUrl(rec.url);
    if (!label || !url || seenUrls.has(url)) continue;
    seenUrls.add(url);
    let host = '';
    try {
      host = new URL(url).hostname.replace(/^www\./, '');
    } catch {
      host = url;
    }
    out.push({
      id: String(rec.id || '').trim() || `custom_${out.length + 1}`,
      label,
      subtitle: String(rec.subtitle || '').trim() || host,
      url,
      iconKey: String(rec.iconKey || '').trim() || 'globe',
    });
  }
  return out;
}

export type StudyProviderTag = 'gn' | 'ugs' | 'ckv' | 'seraph' | 'gmshelf' | 'builtin';

export interface UnifiedStudyModule {
  id: string;
  numericId?: number;
  provider: StudyProviderTag;
  name: string;
  category?: string;
  author?: string;
  special?: string[];
  url: string;
  baseUrl: string;
  cover: string | null;
  featured: boolean;
}

export function normalizeWispUrl(
  raw: string | null | undefined,
  originProtocol: string = 'https:',
  originHost: string = 'localhost:3000'
): string {
  const val = String(raw || '').trim();
  if (!val) return DEFAULT_WISP_URL;

  const wsProto = originProtocol === 'http:' ? 'ws:' : 'wss:';
  let candidate = val;
  const hadExplicitRootSlash = /\/\/[^/]+\/$/.test(val);

  if (candidate.startsWith('/')) {
    candidate = `${wsProto}//${originHost}${candidate}`;
  } else if (/^https?:\/\//i.test(candidate)) {
    candidate = candidate.replace(/^http/i, 'ws');
  } else if (!/^wss?:\/\//i.test(candidate)) {
    candidate = `wss://${candidate}`;
  }

  try {
    const parsed = new URL(candidate);
    const host = parsed.hostname.toLowerCase();
    if (!parsed.pathname || parsed.pathname === '/') {
      if (host === 'wisp.mercurywork.shop' || hadExplicitRootSlash) {
        parsed.pathname = '/';
      } else {
        parsed.pathname = '/wisp/';
      }
    }
    return parsed.toString();
  } catch {
    return candidate;
  }
}

export function resolveInitialWispUrl(
  savedValbrowseUrl: string | null | undefined,
  originProtocol: string = 'https:',
  originHost: string = 'localhost:3000'
): string {
  const clean = String(savedValbrowseUrl || '').trim();
  if (!clean || LEGACY_DEFAULT_WISP_URLS.includes(clean)) return DEFAULT_WISP_URL;
  return normalizeWispUrl(clean, originProtocol, originHost);
}

export function isScramjetScope(scope: string | null | undefined, origin: string): boolean {
  const cleanScope = String(scope || '').trim();
  if (!cleanScope) return false;
  const cleanOrigin = String(origin || '').replace(/\/+$/, '');
  return cleanScope === `${cleanOrigin}/scram/` || cleanScope.endsWith('/scram/');
}

export function buildScramjetThemeParams(): string {
  const params = new URLSearchParams({
    bg: '#0b0608',
    bgSec: '#080406',
    surface: '#140a0e',
    text: '#fdf2f4',
    muted: '#9f878f',
    border: 'rgba(255,255,255,0.08)',
    primary: '#ff5c7c',
    light: '0',
  });
  return params.toString();
}

export function deriveBaseUrlFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/');
    parts.pop();
    return `${parsed.origin}${parts.join('/')}/`;
  } catch {
    return url;
  }
}

export function mergeAllStudyCatalog(
  gnModules: UnifiedStudyModule[],
  ugsModules: UnifiedStudyModule[],
  ckvModules: UnifiedStudyModule[],
  staticCatalog: StudyModuleItem[],
  seraphModules: UnifiedStudyModule[] = [],
  gmshelfModules: UnifiedStudyModule[] = []
): UnifiedStudyModule[] {
  const seen = new Set<string>();
  const merged: UnifiedStudyModule[] = [];

  const pushUnique = (item: UnifiedStudyModule) => {
    if (!item || !item.name || !item.url) return;
    const key = normalizeTitleKey(item.name);
    if (key && seen.has(key)) return;
    if (key) seen.add(key);
    merged.push(item);
  };

  for (const g of gnModules) pushUnique(g);
  for (const g of seraphModules) pushUnique(g);
  for (const g of gmshelfModules) pushUnique(g);
  for (const g of ugsModules) pushUnique(g);
  for (const g of ckvModules) pushUnique(g);

  for (const s of staticCatalog) {
    pushUnique({
      id: `builtin:${s.slug}`,
      provider: 'builtin',
      name: s.title,
      category: s.category,
      url: s.url,
      baseUrl: deriveBaseUrlFromUrl(s.url),
      cover: null,
      featured: true,
    });
  }

  return merged;
}

export type StudyFilterProvider = 'all' | StudyProviderTag | 'featured' | 'favorites';
export type StudySortOrder = 'featured' | 'az' | 'za' | 'popular';

export interface FilterModulesOptions {
  query?: string;
  provider?: StudyFilterProvider;
  sort?: StudySortOrder;
  favorites?: string[];
  popularityMap?: Record<number, number>;
}

export function filterAndSortModules(
  modules: UnifiedStudyModule[],
  options: FilterModulesOptions = {}
): UnifiedStudyModule[] {
  const query = String(options.query || '').trim().toLowerCase();
  const provider = options.provider || 'all';
  const sort = options.sort || 'featured';
  const favSet = new Set(options.favorites || []);
  const pop = options.popularityMap || {};

  let list = modules.slice();

  if (provider === 'favorites') {
    list = list.filter((g) => favSet.has(g.id) || favSet.has(g.name));
  } else if (provider === 'featured') {
    list = list.filter((g) => g.featured);
  } else if (
    provider === 'gn' ||
    provider === 'ugs' ||
    provider === 'ckv' ||
    provider === 'seraph' ||
    provider === 'gmshelf' ||
    provider === 'builtin'
  ) {
    list = list.filter((g) => g.provider === provider);
  }

  if (query) {
    list = list.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        (g.author && g.author.toLowerCase().includes(query)) ||
        (g.category && g.category.toLowerCase().includes(query))
    );
  }

  list.sort((a, b) => {
    const aFav = favSet.has(a.id) || favSet.has(a.name) ? 1 : 0;
    const bFav = favSet.has(b.id) || favSet.has(b.name) ? 1 : 0;
    if (provider !== 'favorites' && aFav !== bFav) {
      return bFav - aFav;
    }
    if (sort === 'az') return a.name.localeCompare(b.name);
    if (sort === 'za') return b.name.localeCompare(a.name);
    if (sort === 'popular') {
      const aHits = typeof a.numericId === 'number' ? pop[a.numericId] ?? -1 : -1;
      const bHits = typeof b.numericId === 'number' ? pop[b.numericId] ?? -1 : -1;
      if (aHits !== bHits) return bHits - aHits;
    }
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return a.name.localeCompare(b.name);
  });

  return list;
}

export function buildValBrowseOriginUrl(currentHref: string): string {
  try {
    const parsed = new URL(currentHref);
    parsed.searchParams.set('vb', '1');
    return parsed.toString();
  } catch {
    const clean = String(currentHref || '').split('#')[0];
    if (!clean) return '/?vb=1';
    return clean.includes('?') ? `${clean}&vb=1` : `${clean}?vb=1`;
  }
}

export function buildStandaloneBlobWrapperHtml(
  targetFrameUrl: string,
  panicTargetUrl: string = PANIC_REDIRECT_URL
): string {
  const safeSrc = String(targetFrameUrl || '/?vb=1')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const safePanicJson = JSON.stringify(panicTargetUrl).replace(/<\//g, '<\\/');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home - Classroom</title>
  <link rel="icon" type="image/png" href="${CLASSROOM_FAVICON_URL}" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0b0608;
    }
    iframe {
      width: 100vw;
      height: 100vh;
      border: none;
      display: block;
    }
  </style>
</head>
<body>
  <iframe
    name="${STANDALONE_IFRAME_NAME}"
    src="${safeSrc}"
    title="Home - Classroom"
    allow="autoplay; gamepad; fullscreen; clipboard-read; clipboard-write"
    allowfullscreen
  ></iframe>
  <script>
    (function () {
      var panicUrl = ${safePanicJson};
      function panicNow() {
        try {
          if (document.documentElement) document.documentElement.style.display = 'none';
        } catch (_e) {}
        try {
          if (window.top && window.top.opener && typeof window.top.close === 'function') {
            window.top.close();
          }
        } catch (_e) {}
        try {
          if (window.top && window.top !== window) {
            window.top.location.replace(panicUrl);
            return;
          }
        } catch (_e) {}
        try {
          window.location.replace(panicUrl);
        } catch (_e) {}
      }
      window.addEventListener('keydown', function (e) {
        if (e && e.key === 'Escape') {
          e.preventDefault();
          panicNow();
        }
      }, true);
      window.addEventListener('message', function (ev) {
        if (ev && ev.data && ev.data.type === 'valbrowse-panic') {
          panicNow();
        }
      });
    })();
  </script>
</body>
</html>`;
}

export function triggerPanicRedirect(
  doc?: Document,
  win?: Window,
  targetUrl: string = PANIC_REDIRECT_URL
): void {
  try {
    if (doc) {
      if (doc.fullscreenElement && typeof doc.exitFullscreen === 'function') {
        doc.exitFullscreen().catch(() => {});
      }
      doc.title = 'Google Classroom';
      if (doc.documentElement) {
        doc.documentElement.style.display = 'none';
      }
    }
  } catch {
    // ignore DOM minimization errors
  }

  try {
    if (win && win.parent && win.parent !== win) {
      win.parent.postMessage({ type: 'valbrowse-panic' }, '*');
    }
  } catch {
    // ignore postMessage errors
  }

  try {
    if (win) {
      const topWin = win.top && win.top !== win ? win.top : win;
      if (topWin.opener && typeof topWin.close === 'function') {
        try {
          topWin.close();
        } catch {
          // ignore window.close refusal
        }
      }
      topWin.location.replace(targetUrl);
      return;
    }
  } catch {
    // cross-origin top fallback
  }

  try {
    if (win && win.location) {
      win.location.replace(targetUrl);
    }
  } catch {
    // ignore
  }
}

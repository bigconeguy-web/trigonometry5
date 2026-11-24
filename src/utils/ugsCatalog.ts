export interface GitHubTreeItem {
  path: string;
  type: string;
  mode?: string;
  sha?: string;
  size?: number;
}

export interface UgsStudyEntry {
  id: string;
  name: string;
  folder: string;
  path: string;
  url: string;
  baseUrl: string;
  cover: string | null;
  featured: boolean;
}

export const UGS_CDN_BASE = 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main';

const EXCLUDED_PATH_SEGMENTS = new Set([
  'assets',
  'streamingassets',
  'cdn-cgi',
  'loc',
  'snd',
  'img',
  'images',
  'patch',
  'api',
  'releases',
  '.vscode',
  '.github',
  'node_modules',
  'build',
  'templateData'.toLowerCase(),
]);

const EXCLUDED_HTML_NAMES = new Set([
  '404.html',
  '408.html',
  'null.html',
  'about.html',
  'font_test.html',
  'sdk.html',
  'speculation.html',
  'guide.html',
  'notes.html',
  'lobby.html',
  'exists_by_casino.html',
  'drop_campaigns.html',
  'games235.html',
  'ubg235.html',
  'frame.html',
  'depression.html',
  'n.html',
  'json-editor.html',
  'login-buttons.html',
]);

const POPULAR_SLUGS = new Set([
  '10minutestilldawn',
  'slope 3',
  'slope 2 player',
  'retro bowl',
  'cookieclicker',
  'drift-hunters',
  'snow-rider',
  'monkey mart v6.3',
  'stickman hook',
  'burritobison-main',
  'doodle jump',
  'big 2048',
  'basketball-superstars',
  'bouncy basketball',
  'adventure-capitalist',
  '3dash',
  '2doom',
  'russian-buckshot',
  'ovomod',
  'ages of conflict',
]);

const COMPOUND_CATALOG_WORDS = [
  'adventures', 'adventure',
  'capitalist', 'basketball', 'superstars',
  'minutes', 'minute',
  'till', 'dawn',
  'cookie', 'clicker',
  'subway', 'surfers', 'surfer',
  'burrito', 'bison',
  'stickman', 'hunters', 'hunter',
  'ducklife', 'bitlife',
  'polytrack', 'snowrider',
  'retro', 'bowl',
  'doodle', 'jump',
  'bouncy', 'motors',
  'smash', 'karts',
  'drift', 'boss',
  'paper', 'hole',
  'block', 'miner', 'post',
  'clash', 'duel',
  'tower', 'defense',
  'idle', 'tycoon',
  'space', 'alien',
  'dash', 'doom',
  'card', 'poker',
  'ball', 'balls',
  'rush', 'run',
  'date', 'danger',
  'buckshot', 'russian',
  'football', 'soccer',
  'weird', 'gun', 'game',
  'tiny', 'fishing',
  'bad', 'monday',
  'pizza', 'tower',
  'geometry',
  'monkey', 'mart',
  'one', 'bit',
  'endacopia',
  'quake',
].sort((a, b) => b.length - a.length);

function splitCompoundToken(token: string): string[] {
  const lower = token.toLowerCase();
  if (lower.length < 7 || /[^a-z]/i.test(token)) {
    return [token];
  }
  const n = lower.length;
  const dp: (string[] | null)[] = new Array(n + 1).fill(null);
  dp[0] = [];
  for (let i = 0; i < n; i++) {
    if (!dp[i]) continue;
    for (const word of COMPOUND_CATALOG_WORDS) {
      if (lower.startsWith(word, i)) {
        const end = i + word.length;
        const candidate = [...dp[i]!, word];
        if (!dp[end] || candidate.length < dp[end]!.length) {
          dp[end] = candidate;
        }
      }
    }
  }
  if (dp[n] && dp[n]!.length > 1) {
    return dp[n]!;
  }
  return [token];
}

export function formatUgsTitle(folderOrPath: string): string {
  let raw = (folderOrPath || '').trim();
  if (!raw) return 'UNTITLED MODULE';

  if (raw.includes('/')) {
    raw = raw.split('/')[0];
  } else {
    raw = raw.replace(/\.html?$/i, '');
  }

  raw = raw
    .replace(/([_-](?:main|master|gh-pages|branch))$/i, '')
    .replace(/[_/]+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, (full, digit, letter, offset, src) => {
      const rest = src.slice(offset + 1);
      // Preserve ordinal / dimension / version tokens like 3D, 2D, 3rd, v6
      if (/^(?:d\b|st\b|nd\b|rd\b|th\b|x\b)/i.test(rest)) return full;
      return `${digit} ${letter}`;
    })
    .replace(/([a-zA-Z])(\d)/g, (full, letter, digit, offset, src) => {
      const before = src.slice(Math.max(0, offset - 1), offset + 1);
      if (/^v$/i.test(letter)) return full;
      if (before.length === 2 && /\s/.test(before[0])) return full;
      return `${letter} ${digit}`;
    });

  const tokens = raw.split(/\s+/).filter(Boolean);
  const expanded: string[] = [];
  for (const tok of tokens) {
    expanded.push(...splitCompoundToken(tok));
  }
  return expanded.join(' ').replace(/\s+/g, ' ').trim().toUpperCase();
}

export function encodeCdnPath(repoPath: string): string {
  return repoPath
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

export function buildUgsCdnUrl(repoPath: string, cdnBase: string = UGS_CDN_BASE): string {
  const cleanBase = cdnBase.replace(/\/+$/, '');
  const cleanPath = repoPath.replace(/^\/+/, '');
  return `${cleanBase}/${encodeCdnPath(cleanPath)}`;
}

function getFolderBaseUrl(repoPath: string, cdnBase: string = UGS_CDN_BASE): string {
  const parts = repoPath.replace(/^\/+/, '').split('/');
  if (parts.length <= 1) {
    return `${cdnBase.replace(/\/+$/, '')}/`;
  }
  parts.pop();
  return `${cdnBase.replace(/\/+$/, '')}/${encodeCdnPath(parts.join('/'))}/`;
}

function scoreEntryHtml(repoPath: string): number {
  const parts = repoPath.split('/');
  const filename = parts[parts.length - 1].toLowerCase();
  const depth = parts.length;
  let score = 0;
  if (depth === 2 && (filename === 'index.html' || filename === 'index.htm')) score += 1000;
  else if (filename === 'index.html' || filename === 'index.htm') score += 500;
  else if (filename === 'play.html') score += 300;
  else if (filename === 'game.html') score += 280;
  else if (filename === 'new.html' || filename === 'fun.html') score += 240;
  else if (filename.startsWith('index')) score += 220;
  else score += 100;
  score -= depth * 20;
  return score;
}

function scoreCoverAsset(repoPath: string): number {
  const filename = repoPath.split('/').pop()!.toLowerCase();
  let score = 0;
  if (filename.startsWith('cover.')) score += 50;
  else if (filename.startsWith('thumb')) score += 40;
  else if (filename.startsWith('logo.')) score += 35;
  else if (filename.startsWith('icon.')) score += 30;
  else if (filename.startsWith('favicon.')) score += 15;
  if (filename.endsWith('.png') || filename.endsWith('.webp') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
    score += 10;
  }
  return score;
}

export function parseUgsTree(
  treeItems: GitHubTreeItem[],
  cdnBase: string = UGS_CDN_BASE
): UgsStudyEntry[] {
  if (!Array.isArray(treeItems)) return [];

  const coverMap = new Map<string, { path: string; score: number }>();
  const candidatesByFolder = new Map<string, { path: string; score: number }[]>();
  const standaloneEntries: UgsStudyEntry[] = [];

  for (const item of treeItems) {
    if (!item || item.type !== 'blob' || typeof item.path !== 'string') continue;
    const p = item.path.replace(/^\/+/, '');
    if (!p) continue;

    // Index top-level folder cover/icon assets in the same pass
    const coverMatch = p.match(/^([^/]+)\/(?:icon|logo|cover|thumb|thumbnail|favicon)\.(?:png|jpe?g|webp|svg|ico)$/i);
    if (coverMatch) {
      const folder = coverMatch[1];
      const sc = scoreCoverAsset(p);
      const prev = coverMap.get(folder);
      if (!prev || sc > prev.score) {
        coverMap.set(folder, { path: p, score: sc });
      }
      continue;
    }

    if (!/\.html?$/i.test(p)) continue;

    const parts = p.split('/');
    const filename = parts[parts.length - 1].toLowerCase();
    if (EXCLUDED_HTML_NAMES.has(filename)) continue;

    // Exclude paths under non-module utility/asset subdirectories
    const subdirs = parts.slice(1, -1);
    if (subdirs.some((dir) => EXCLUDED_PATH_SEGMENTS.has(dir.toLowerCase()) || dir.toLowerCase() === 'old')) {
      continue;
    }
    const topFolder = parts[0];
    if (EXCLUDED_PATH_SEGMENTS.has(topFolder.toLowerCase())) continue;

    if (parts.length === 1) {
      // Standalone root-level .html module file
      const name = formatUgsTitle(p);
      standaloneEntries.push({
        id: `ugs:${p}`,
        name,
        folder: p.replace(/\.html?$/i, ''),
        path: p,
        url: buildUgsCdnUrl(p, cdnBase),
        baseUrl: getFolderBaseUrl(p, cdnBase),
        cover: null,
        featured: POPULAR_SLUGS.has(p.replace(/\.html?$/i, '').toLowerCase()),
      });
      continue;
    }

    const list = candidatesByFolder.get(topFolder) || [];
    list.push({ path: p, score: scoreEntryHtml(p) });
    candidatesByFolder.set(topFolder, list);
  }

  const modules: UgsStudyEntry[] = [...standaloneEntries];
  for (const [folder, candidates] of candidatesByFolder.entries()) {
    candidates.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
    const best = candidates[0];
    const coverEntry = coverMap.get(folder);
    modules.push({
      id: `ugs:${folder}`,
      name: formatUgsTitle(folder),
      folder,
      path: best.path,
      url: buildUgsCdnUrl(best.path, cdnBase),
      baseUrl: getFolderBaseUrl(best.path, cdnBase),
      cover: coverEntry ? buildUgsCdnUrl(coverEntry.path, cdnBase) : null,
      featured: POPULAR_SLUGS.has(folder.toLowerCase()),
    });
  }

  modules.sort((a, b) => a.name.localeCompare(b.name));
  return modules;
}

export function normalizeTitleKey(title: string): string {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export interface UnifiedStudyEntry {
  id: string;
  numericId?: number;
  name: string;
  url: string;
  baseUrl: string;
  cover: string | null;
  author?: string;
  special?: string[];
  featured: boolean;
}

export function mergeCatalogs(
  primaryModules: UnifiedStudyEntry[],
  secondaryModules: UnifiedStudyEntry[]
): UnifiedStudyEntry[] {
  const seen = new Set<string>();
  const merged: UnifiedStudyEntry[] = [];

  for (const item of primaryModules) {
    if (!item || !item.name || !item.url) continue;
    const key = normalizeTitleKey(item.name);
    if (key) seen.add(key);
    merged.push(item);
  }

  for (const item of secondaryModules) {
    if (!item || !item.name || !item.url) continue;
    const key = normalizeTitleKey(item.name);
    if (key && seen.has(key)) continue;
    if (key) seen.add(key);
    merged.push(item);
  }

  return merged;
}

export const FALLBACK_UGS_PATHS: Array<{ path: string; cover?: string }> = [
  { path: '10minutestilldawn/index.html', cover: '10minutestilldawn/icon.png' },
  { path: 'slope 3/index.html' },
  { path: 'slope 2 player/index.html' },
  { path: 'retro bowl/new.html' },
  { path: 'cookieclicker/index.html' },
  { path: 'drift-hunters/index.html', cover: 'drift-hunters/favicon.ico' },
  { path: 'snow-rider/index.html' },
  { path: 'monkey mart v6.3/index.html' },
  { path: 'stickman hook/index.html' },
  { path: 'BurritoBison-main/index.html' },
  { path: 'doodle jump/index.html', cover: 'doodle jump/favicon.ico' },
  { path: 'big 2048/index.html', cover: 'big 2048/favicon.ico' },
  { path: 'basketball-superstars/index.html' },
  { path: 'bouncy basketball/index.html' },
  { path: 'adventure-capitalist/index.html', cover: 'adventure-capitalist/logo.webp' },
  { path: '3dash/index.html', cover: '3dash/logo.png' },
  { path: '2doom/index.html' },
  { path: 'russian-buckshot/index.html' },
  { path: 'ovomod/index.html' },
  { path: 'ages of conflict/index.html' },
];

export function getFallbackUgsCatalog(cdnBase: string = UGS_CDN_BASE): UgsStudyEntry[] {
  return FALLBACK_UGS_PATHS.map((item) => {
    const folder = item.path.split('/')[0];
    return {
      id: `ugs:${folder}`,
      name: formatUgsTitle(folder),
      folder,
      path: item.path,
      url: buildUgsCdnUrl(item.path, cdnBase),
      baseUrl: getFolderBaseUrl(item.path, cdnBase),
      cover: item.cover ? buildUgsCdnUrl(item.cover, cdnBase) : null,
      featured: true,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

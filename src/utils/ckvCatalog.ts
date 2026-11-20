import type { GitHubTreeItem } from './ugsCatalog';

export interface CkvGameEntry {
  id: string;
  provider: 'ckv';
  name: string;
  path: string;
  url: string;
  baseUrl: string;
  cover: string | null;
  featured: boolean;
}

export const CKV_CDN_BASE = 'https://cdn.jsdelivr.net/gh/WanoCapy/ChickenKingsVault@main';

const CKV_POPULAR_STEMS = new Set([
  '2048',
  '1v1lol',
  'retrobowl',
  'cookieclicker',
  'basketrandom',
  'driftboss',
  'drifthunters',
  'snowrider3d',
  'stickmanhook',
  'monkeymart',
  'subwaysurfers',
  'run3',
  'motox3m',
  'geometrydash',
  'chessclassic',
  'drivemad',
  'crossyroad',
  'flappybird',
  'doodlejump',
  'tetris',
]);

export function encodeCkvCdnPath(repoPath: string): string {
  return String(repoPath || '')
    .replace(/^\/+/, '')
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

export function buildCkvCdnUrl(repoPath: string, cdnBase: string = CKV_CDN_BASE): string {
  const cleanBase = cdnBase.replace(/\/+$/, '');
  return `${cleanBase}/${encodeCkvCdnPath(repoPath)}`;
}

export function getCkvBaseUrl(cdnBase: string = CKV_CDN_BASE): string {
  return `${cdnBase.replace(/\/+$/, '')}/gamefiles/`;
}

export function formatCkvTitle(repoPath: string): string {
  let raw = String(repoPath || '').trim();
  if (!raw) return 'Untitled Game';

  raw = raw
    .replace(/^gamefiles\//i, '')
    .replace(/\.html?$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!raw) return 'Untitled Game';

  return raw
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
    .join(' ');
}

function normalizeStem(stem: string): string {
  return String(stem || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function scoreImageExt(path: string): number {
  const lower = path.toLowerCase();
  if (lower.endsWith('.png')) return 5;
  if (lower.endsWith('.webp')) return 4;
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 3;
  if (lower.endsWith('.avif')) return 2;
  return 1;
}

export function parseCkvTree(
  treeItems: GitHubTreeItem[],
  cdnBase: string = CKV_CDN_BASE
): CkvGameEntry[] {
  if (!Array.isArray(treeItems)) return [];

  const exactImageMap = new Map<string, string>();
  const normImageMap = new Map<string, string>();

  for (const item of treeItems) {
    if (!item || item.type !== 'blob' || typeof item.path !== 'string') continue;
    const p = item.path.replace(/^\/+/, '');
    if (!/^gameimages\/.+\.(?:png|jpe?g|webp|avif|jfif|gif|svg|ico)$/i.test(p)) continue;

    const stem = p.slice('gameimages/'.length).replace(/\.[^.]+$/, '');
    const exactKey = stem.toLowerCase();
    const prevExact = exactImageMap.get(exactKey);
    if (!prevExact || scoreImageExt(p) > scoreImageExt(prevExact)) {
      exactImageMap.set(exactKey, p);
    }

    const normKey = normalizeStem(stem);
    if (normKey) {
      const prevNorm = normImageMap.get(normKey);
      if (!prevNorm || scoreImageExt(p) > scoreImageExt(prevNorm)) {
        normImageMap.set(normKey, p);
      }
    }
  }

  const baseUrl = getCkvBaseUrl(cdnBase);
  const entries: CkvGameEntry[] = [];

  for (const item of treeItems) {
    if (!item || item.type !== 'blob' || typeof item.path !== 'string') continue;
    const p = item.path.replace(/^\/+/, '');
    if (!/^gamefiles\/.+\.html?$/i.test(p)) continue;

    const stem = p.slice('gamefiles/'.length).replace(/\.html?$/i, '');
    const exactKey = stem.toLowerCase();
    const normKey = normalizeStem(stem);
    const matchedImagePath = exactImageMap.get(exactKey) || (normKey ? normImageMap.get(normKey) : undefined);

    entries.push({
      id: `ckv:${p}`,
      provider: 'ckv',
      name: formatCkvTitle(p),
      path: p,
      url: buildCkvCdnUrl(p, cdnBase),
      baseUrl,
      cover: matchedImagePath ? buildCkvCdnUrl(matchedImagePath, cdnBase) : null,
      featured: CKV_POPULAR_STEMS.has(normKey),
    });
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));
  return entries;
}

export const FALLBACK_CKV_PATHS: Array<{ path: string; cover?: string }> = [
  { path: 'gamefiles/2048 Merge Run.html', cover: 'gameimages/2048mergerun.png' },
  { path: 'gamefiles/1v1.LoL.html', cover: 'gameimages/1v1.lol.webp' },
  { path: 'gamefiles/Retro Bowl.html', cover: 'gameimages/retrobowl.png' },
  { path: 'gamefiles/Cookie Clicker.html', cover: 'gameimages/cookieclicker.png' },
  { path: 'gamefiles/Basket Random.html', cover: 'gameimages/basketrandom.png' },
  { path: 'gamefiles/Drift Boss.html', cover: 'gameimages/driftboss.jpg' },
  { path: 'gamefiles/Drift Hunters.html', cover: 'gameimages/drifthunters.png' },
  { path: 'gamefiles/Snow Rider 3D.html', cover: 'gameimages/snowrider3d.webp' },
  { path: 'gamefiles/Stickman Hook.html', cover: 'gameimages/stickmanhook.jfif' },
  { path: 'gamefiles/Monkey Mart.html', cover: 'gameimages/monkeymart.jpg' },
  { path: 'gamefiles/Subway Surfers.html', cover: 'gameimages/subwaysurfers.png' },
  { path: 'gamefiles/Run 3.html', cover: 'gameimages/run3.jpg' },
  { path: 'gamefiles/Moto X3M.html', cover: 'gameimages/motox3m.png' },
  { path: 'gamefiles/Geometry Dash.html', cover: 'gameimages/geometrydash.png' },
  { path: 'gamefiles/Chess Classic.html', cover: 'gameimages/chessclassic.png' },
  { path: 'gamefiles/Drive Mad.html', cover: 'gameimages/drivemad.png' },
  { path: 'gamefiles/Crossy Road.html', cover: 'gameimages/crossyroad.jpg' },
  { path: 'gamefiles/Flappy Bird.html', cover: 'gameimages/flappybird.jpg' },
  { path: 'gamefiles/Doodle Jump.html', cover: 'gameimages/doodlejump.jpg' },
  { path: 'gamefiles/Tetris.html', cover: 'gameimages/tetris.png' },
];

export function getFallbackCkvCatalog(cdnBase: string = CKV_CDN_BASE): CkvGameEntry[] {
  const baseUrl = getCkvBaseUrl(cdnBase);
  return FALLBACK_CKV_PATHS.map((item) => {
    const stem = item.path.slice('gamefiles/'.length).replace(/\.html?$/i, '');
    const coverPath = item.cover || `gameimages/${stem}.png`;
    return {
      id: `ckv:${item.path}`,
      provider: 'ckv' as const,
      name: formatCkvTitle(item.path),
      path: item.path,
      url: buildCkvCdnUrl(item.path, cdnBase),
      baseUrl,
      cover: buildCkvCdnUrl(coverPath, cdnBase),
      featured: true,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export interface CompactCkvCacheRecord {
  savedAt: number;
  cdnBase: string;
  items: Array<{ p: string; i?: string | null }>;
}

export function serializeCkvCache(
  entries: CkvGameEntry[],
  cdnBase: string = CKV_CDN_BASE,
  nowMs: number = Date.now()
): string {
  const cleanBase = cdnBase.replace(/\/+$/, '') + '/';
  const compactItems = entries.map((entry) => {
    let coverRel: string | null = null;
    if (entry.cover && entry.cover.startsWith(cleanBase)) {
      coverRel = entry.cover
        .slice(cleanBase.length)
        .split('/')
        .map((s) => decodeURIComponent(s))
        .join('/');
    }
    return coverRel ? { p: entry.path, i: coverRel } : { p: entry.path };
  });
  return JSON.stringify({ savedAt: nowMs, cdnBase, items: compactItems });
}

export function deserializeCkvCache(
  rawJson: string | null | undefined,
  nowMs: number = Date.now(),
  ttlMs: number = 30 * 60 * 1000
): CkvGameEntry[] | null {
  if (!rawJson) return null;
  try {
    const parsed = JSON.parse(rawJson) as CompactCkvCacheRecord;
    if (!parsed || typeof parsed.savedAt !== 'number' || !Array.isArray(parsed.items)) return null;
    if (nowMs - parsed.savedAt > ttlMs) return null;
    const cdnBase = parsed.cdnBase || CKV_CDN_BASE;
    const baseUrl = getCkvBaseUrl(cdnBase);
    return parsed.items
      .filter((row) => row && typeof row.p === 'string')
      .map((row) => {
        const stem = row.p.slice('gamefiles/'.length).replace(/\.html?$/i, '');
        return {
          id: `ckv:${row.p}`,
          provider: 'ckv' as const,
          name: formatCkvTitle(row.p),
          path: row.p,
          url: buildCkvCdnUrl(row.p, cdnBase),
          baseUrl,
          cover: row.i ? buildCkvCdnUrl(row.i, cdnBase) : null,
          featured: CKV_POPULAR_STEMS.has(normalizeStem(stem)),
        };
      });
  } catch {
    return null;
  }
}

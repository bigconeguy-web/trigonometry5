export type GmshelfCategory =
  | 'All'
  | 'Action'
  | 'Platformer'
  | 'Arcade'
  | 'Puzzle'
  | 'Sports & Racing'
  | 'Simulation';

export interface GmshelfStudyEntry {
  id: string;
  provider: 'gmshelf';
  name: string;
  slug: string;
  collection: 'truffled' | 'ckv' | 'ugs' | 'seraph';
  category: Exclude<GmshelfCategory, 'All'>;
  url: string;
  baseUrl: string;
  cover: string | null;
  featured: boolean;
}

export interface GmshelfManifestSource {
  collection: 'truffled' | 'ckv' | 'ugs' | 'seraph';
  cdnBase: string;
  manifestUrls: readonly string[];
}

export const GMSHELF_TRUFFLED_CDN = 'https://cdn.jsdelivr.net/gh/gmshelf/truffled@main';
export const GMSHELF_CKV_CDN = 'https://cdn.jsdelivr.net/gh/gmshelf/ckv@main';
export const GMSHELF_UGS_CDN = 'https://cdn.jsdelivr.net/gh/gmshelf/ugs@main';
export const GMSHELF_SERAPH_CDN = 'https://cdn.jsdelivr.net/gh/gmshelf/seraph@main';

export const GMSHELF_SOURCES: readonly GmshelfManifestSource[] = [
  {
    collection: 'truffled',
    cdnBase: GMSHELF_TRUFFLED_CDN,
    manifestUrls: [
      `${GMSHELF_TRUFFLED_CDN}/truffled.json`,
      'https://fastly.jsdelivr.net/gh/gmshelf/truffled@main/truffled.json',
      'https://gcore.jsdelivr.net/gh/gmshelf/truffled@main/truffled.json',
    ],
  },
  {
    collection: 'ckv',
    cdnBase: GMSHELF_CKV_CDN,
    manifestUrls: [
      `${GMSHELF_CKV_CDN}/ckv.json`,
      'https://fastly.jsdelivr.net/gh/gmshelf/ckv@main/ckv.json',
    ],
  },
  {
    collection: 'ugs',
    cdnBase: GMSHELF_UGS_CDN,
    manifestUrls: [
      `${GMSHELF_UGS_CDN}/ugs.json`,
      'https://fastly.jsdelivr.net/gh/gmshelf/ugs@main/ugs.json',
    ],
  },
];

const GMSHELF_POPULAR_SLUGS = new Set([
  '10minutestilldawn',
  '1v1lol',
  '2048',
  'asmallworldcup',
  'angrybirdsonline',
  'animalcrossingwildworld',
  'antonblast',
  'balatro',
  'basketballstars',
  'bitlife',
  'celeste',
  'clusterrush',
  'cookieclicker',
  'crossyroad',
  'cuphead',
  'deltarune',
  'doom',
  'drifthunters',
  'drivemad',
  'ducklife4',
  'fnaf',
  'fridaynightfunkin',
  'geometrydash',
  'hollowknight',
  'hotlinemiami',
  'minecraft',
  'monkeymart',
  'motox3m',
  'omori',
  'ovo',
  'papaspizzaria',
  'retrobowl',
  'run3',
  'slope',
  'smashkarts',
  'subwaysurfers',
  'sm64',
  'terraria',
  'undertale',
  'vampiresurvivors',
]);

export function inferGmshelfCategory(name: string, slug: string): Exclude<GmshelfCategory, 'All'> {
  const s = `${name} ${slug}`.toLowerCase();
  if (/soccer|basket|bowl|football|drift|drive|moto|racing|kart|golf|baseball|hockey|cup|slope/.test(s)) {
    return 'Sports & Racing';
  }
  if (/2048|chess|sudoku|puzzle|tetris|minesweeper|wordle|portal|unblock|mahjong|cut the rope/.test(s)) {
    return 'Puzzle';
  }
  if (/mario|celeste|ovo|run 3|run3|geometry|subway|stickman|platform|climbing|happy wheels|antonblast|hollow/.test(s)) {
    return 'Platformer';
  }
  if (/bitlife|papa|cookie|mart|tycoon|craft|sim|animal crossing|stardew|farming|capitalist|clicker/.test(s)) {
    return 'Simulation';
  }
  if (/1v1|dawn|doom|fnaf|undertale|deltarune|cuphead|hotline|smash|sniper|shooter|vampire|gun|combat|knight|roguelike/.test(s)) {
    return 'Action';
  }
  return 'Arcade';
}

function cleanGmshelfName(raw: string): string {
  const cleaned = String(raw || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return 'Untitled Game';
  if (/^-[a-z0-9]$/i.test(cleaned)) {
    return cleaned.slice(1).toUpperCase();
  }
  return cleaned;
}

function extractGmshelfSlug(rawUrl: string, fallbackName: string): string {
  const cleanUrl = String(rawUrl || '').split('?')[0].split('#')[0];
  const parts = cleanUrl.split('/').filter(Boolean);
  if (parts.length >= 2) {
    const candidate = parts[1].replace(/\.html?$/i, '').toLowerCase();
    if (candidate) return candidate;
  }
  return fallbackName.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'game';
}

function deriveGmshelfBaseUrl(gameUrl: string): string {
  try {
    const u = new URL(gameUrl);
    const parts = u.pathname.split('/');
    parts.pop();
    return `${u.origin}${parts.join('/')}/`;
  } catch {
    return `${GMSHELF_TRUFFLED_CDN}/`;
  }
}

export function resolveGmshelfUrl(rawPath: string, cdnBase: string): string {
  const cleanBase = String(cdnBase || GMSHELF_TRUFFLED_CDN).replace(/\/+$/, '');
  const trimmed = String(rawPath || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return `${cleanBase}${trimmed}`;
  return `${cleanBase}/${trimmed.replace(/^\.\//, '')}`;
}

export function parseGmshelfManifest(
  rawJson: unknown,
  collection: 'truffled' | 'ckv' | 'ugs' | 'seraph' = 'truffled',
  cdnBase: string = GMSHELF_TRUFFLED_CDN
): GmshelfStudyEntry[] {
  let items: unknown[] = [];
  if (Array.isArray(rawJson)) {
    items = rawJson;
  } else if (rawJson && typeof rawJson === 'object' && Array.isArray((rawJson as { games?: unknown[] }).games)) {
    items = (rawJson as { games: unknown[] }).games;
  }

  const out: GmshelfStudyEntry[] = [];
  const seen = new Set<string>();

  for (const rawItem of items) {
    if (!rawItem || typeof rawItem !== 'object') continue;
    const rec = rawItem as { name?: unknown; url?: unknown; img?: unknown };
    const rawUrl = String(rec.url || '').trim();
    if (!rawUrl || /^(javascript|data|mailto):/i.test(rawUrl)) continue;

    const name = cleanGmshelfName(String(rec.name || ''));
    const slug = extractGmshelfSlug(rawUrl, name);
    if (!name || name === 'Untitled Game' || seen.has(slug)) continue;
    seen.add(slug);

    const url = resolveGmshelfUrl(rawUrl, cdnBase);
    if (!url) continue;

    const rawImg = String(rec.img || '').trim();
    let cover: string | null = null;
    if (rawImg && !/placeholder\./i.test(rawImg)) {
      cover = resolveGmshelfUrl(rawImg, cdnBase);
    } else if (collection === 'truffled' || collection === 'seraph') {
      cover = `${cdnBase.replace(/\/+$/, '')}/covers/${encodeURIComponent(slug)}.webp`;
    }

    out.push({
      id: `gmshelf:${collection}:${slug}`,
      provider: 'gmshelf',
      name,
      slug,
      collection,
      category: inferGmshelfCategory(name, slug),
      url,
      baseUrl: deriveGmshelfBaseUrl(url),
      cover,
      featured: GMSHELF_POPULAR_SLUGS.has(slug),
    });
  }

  return out;
}

const FALLBACK_GMSHELF_ITEMS: ReadonlyArray<{
  slug: string;
  name: string;
  entryFile?: string;
  coverFile?: string;
}> = [
  { slug: '10minutestilldawn', name: '10 Minutes Till Dawn', coverFile: '10.webp' },
  { slug: '1v1lol', name: '1v1.LOL', entryFile: '1v1.html', coverFile: '1v1.webp' },
  { slug: '2048', name: '2048', coverFile: '2048.webp' },
  { slug: 'asmallworldcup', name: 'A Small World Cup', entryFile: 'aswc.html' },
  { slug: 'angrybirdsonline', name: 'Angry Birds Online', entryFile: 'angrybirdsonline.html' },
  { slug: 'animalcrossingwildworld', name: 'Animal Crossing Wild World', entryFile: 'acww.html' },
  { slug: 'antonblast', name: 'Antonblast', entryFile: 'anton.html' },
  { slug: 'balatro', name: 'Balatro' },
  { slug: 'basketballstars', name: 'Basketball Stars' },
  { slug: 'bitlife', name: 'BitLife' },
  { slug: 'celeste', name: 'Celeste' },
  { slug: 'clusterrush', name: 'Cluster Rush' },
  { slug: 'cookieclicker', name: 'Cookie Clicker' },
  { slug: 'crossyroad', name: 'Crossy Road' },
  { slug: 'cuphead', name: 'Cuphead' },
  { slug: 'deltarune', name: 'Deltarune' },
  { slug: 'doom', name: 'DOOM' },
  { slug: 'drifthunters', name: 'Drift Hunters' },
  { slug: 'drivemad', name: 'Drive Mad' },
  { slug: 'ducklife4', name: 'Duck Life 4' },
  { slug: 'fnaf', name: "Five Nights at Freddy's" },
  { slug: 'fridaynightfunkin', name: "Friday Night Funkin'" },
  { slug: 'geometrydash', name: 'Geometry Dash' },
  { slug: 'hollowknight', name: 'Hollow Knight' },
  { slug: 'hotlinemiami', name: 'Hotline Miami' },
  { slug: 'minecraft', name: 'Minecraft Classic' },
  { slug: 'monkeymart', name: 'Monkey Mart' },
  { slug: 'motox3m', name: 'Moto X3M' },
  { slug: 'omori', name: 'OMORI' },
  { slug: 'ovo', name: 'OvO' },
  { slug: 'papaspizzaria', name: "Papa's Pizzeria" },
  { slug: 'retrobowl', name: 'Retro Bowl' },
  { slug: 'run3', name: 'Run 3' },
  { slug: 'slope', name: 'Slope' },
  { slug: 'smashkarts', name: 'Smash Karts' },
  { slug: 'subwaysurfers', name: 'Subway Surfers' },
  { slug: 'sm64', name: 'Super Mario 64' },
  { slug: 'terraria', name: 'Terraria' },
  { slug: 'undertale', name: 'Undertale' },
  { slug: 'vampiresurvivors', name: 'Vampire Survivors' },
];

export function getFallbackGmshelfCatalog(
  cdnBase: string = GMSHELF_TRUFFLED_CDN
): GmshelfStudyEntry[] {
  const cleanBase = cdnBase.replace(/\/+$/, '');
  return FALLBACK_GMSHELF_ITEMS.map((item) => {
    const file = item.entryFile || 'index.html';
    const url = `${cleanBase}/truffled/${item.slug}/${file}`;
    const coverFile = item.coverFile || `${item.slug}.webp`;
    return {
      id: `gmshelf:truffled:${item.slug}`,
      provider: 'gmshelf' as const,
      name: item.name,
      slug: item.slug,
      collection: 'truffled' as const,
      category: inferGmshelfCategory(item.name, item.slug),
      url,
      baseUrl: `${cleanBase}/truffled/${item.slug}/`,
      cover: `${cleanBase}/covers/${coverFile}`,
      featured: true,
    };
  });
}

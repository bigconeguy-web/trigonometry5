export type SeraphGenre =
  | 'all'
  | 'adventure'
  | 'arcade'
  | 'mobile'
  | 'platformer'
  | 'puzzle'
  | 'simulation';

export interface SeraphStudyEntry {
  id: string;
  provider: 'seraph';
  name: string;
  slug: string;
  category: string;
  url: string;
  baseUrl: string;
  cover: string | null;
  featured: boolean;
}

export const SERAPH_CDN_BASE = 'https://cdn.jsdelivr.net/gh/a456pur/seraph@main';
export const SERAPH_GAMES_INDEX_URL = `${SERAPH_CDN_BASE}/games/index.html`;
export const SERAPH_INDEX_MIRRORS: readonly string[] = [
  'https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games/index.html',
  'https://fastly.jsdelivr.net/gh/a456pur/seraph@main/games/index.html',
  'https://gcore.jsdelivr.net/gh/a456pur/seraph@main/games/index.html',
];

const SERAPH_POPULAR_SLUGS = new Set([
  'slope',
  'subwaysurfers',
  'flappy',
  'papaspizzaria',
  'papasburgeria',
  'sm64',
  'run3',
  '1v1lol',
  '2048',
  'bitlife',
  'retrobowl',
  'cookieclicker',
  'drifthunters',
  'drivemad',
  'geometrydash',
  'motox3m',
  'minecraft',
  'amongus',
  'basketrandom',
  'stickmanhook',
  'monkeymart',
  'undertale',
  'celeste',
  'hollowknight',
  'teraria',
  'terraria',
  'fnaf',
  'ovo',
  'tetris',
  'pacman',
]);

function titleCaseSeraphName(raw: string): string {
  const clean = String(raw || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return 'Untitled Game';
  return clean
    .split(' ')
    .map((word) => {
      if (!word) return '';
      if (/^[0-9]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function resolveSeraphAssetUrl(relPath: string, baseSubdir: 'games' | 'root', cdnBase: string): string {
  const cleanBase = cdnBase.replace(/\/+$/, '');
  const trimmed = String(relPath || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) {
    return `${cleanBase}${trimmed}`;
  }
  if (trimmed.startsWith('../')) {
    return `${cleanBase}/${trimmed.replace(/^(\.\.\/)+/, '')}`;
  }
  return baseSubdir === 'games'
    ? `${cleanBase}/games/${trimmed.replace(/^\.\//, '')}`
    : `${cleanBase}/${trimmed.replace(/^\.\//, '')}`;
}

function deriveSeraphBaseUrl(gameUrl: string): string {
  try {
    const u = new URL(gameUrl);
    const parts = u.pathname.split('/');
    parts.pop();
    return `${u.origin}${parts.join('/')}/`;
  } catch {
    return `${SERAPH_CDN_BASE}/games/`;
  }
}

export function normalizeSeraphGenre(raw: string | null | undefined): string {
  const val = String(raw || '').trim().toLowerCase();
  if (!val) return 'Arcade';
  if (val === 'mobile') return 'Mobile';
  if (val === 'platformer') return 'Platformer';
  if (val === 'adventure') return 'Adventure';
  if (val === 'puzzle') return 'Puzzle';
  if (val === 'simulation') return 'Simulation';
  if (val === 'arcade') return 'Arcade';
  return val.charAt(0).toUpperCase() + val.slice(1);
}

/**
 * Parses Seraph's `games/index.html` markup inside `<div class="button-container">`.
 */
export function parseSeraphGamesHtml(
  html: string,
  cdnBase: string = SERAPH_CDN_BASE
): SeraphStudyEntry[] {
  if (!html || typeof html !== 'string') return [];

  const containerStart = html.indexOf('button-container');
  const slice = containerStart !== -1 ? html.slice(containerStart) : html;
  const anchorRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

  const entries: SeraphStudyEntry[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = anchorRe.exec(slice)) !== null) {
    const href = String(match[1] || '').trim();
    const inner = match[2] || '';
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('..')) {
      continue;
    }
    if (!/\.html?$/i.test(href)) continue;

    const titleMatch = inner.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
    if (!titleMatch || !titleMatch[1]) continue;

    const rawName = titleMatch[1];
    const name = titleCaseSeraphName(rawName);
    const slug = href.split('/')[0].toLowerCase();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);

    const genreMatch = inner.match(/data-genre=["']([^"']+)["']/i);
    const category = normalizeSeraphGenre(genreMatch ? genreMatch[1] : 'arcade');

    const bgMatch = inner.match(/background-image\s*:\s*url\(\s*['"]?([^'")]+)['"]?\s*\)/i);
    const cover = bgMatch && bgMatch[1]
      ? resolveSeraphAssetUrl(bgMatch[1], 'games', cdnBase)
      : null;

    const url = resolveSeraphAssetUrl(href, 'games', cdnBase);
    entries.push({
      id: `seraph:${slug}`,
      provider: 'seraph',
      name,
      slug,
      category,
      url,
      baseUrl: deriveSeraphBaseUrl(url),
      cover,
      featured: SERAPH_POPULAR_SLUGS.has(slug),
    });
  }

  return entries;
}

const FALLBACK_SERAPH_ITEMS: ReadonlyArray<{
  slug: string;
  name: string;
  category: string;
  thumb: string;
}> = [
  { slug: 'slope', name: 'Slope', category: 'Platformer', thumb: 'images/thumbnails/slope.jpg' },
  { slug: 'subwaysurfers', name: 'Subway Surfers', category: 'Platformer', thumb: 'images/thumbnails/subwaysurfers.jpeg' },
  { slug: 'flappy', name: 'Flappy Bird', category: 'Mobile', thumb: 'images/thumbnails/flappybird.jpg' },
  { slug: 'papaspizzaria', name: "Papa's Pizzaria", category: 'Simulation', thumb: 'images/thumbnails/papaspizzeria.jpg' },
  { slug: 'papasburgeria', name: "Papa's Burgeria", category: 'Simulation', thumb: 'images/thumbnails/papasburgeria.jpg' },
  { slug: 'sm64', name: 'Super Mario 64', category: 'Platformer', thumb: 'images/thumbnails/sm64.jpg' },
  { slug: 'run3', name: 'Run 3', category: 'Platformer', thumb: 'images/thumbnails/run3.jpg' },
  { slug: '1v1lol', name: '1v1.LOL', category: 'Arcade', thumb: 'images/thumbnails/1v1lol.jpg' },
  { slug: '2048', name: '2048', category: 'Puzzle', thumb: 'images/thumbnails/2048.png' },
  { slug: 'bitlife', name: 'BitLife', category: 'Simulation', thumb: 'images/thumbnails/bitlife.jpg' },
  { slug: 'retrobowl', name: 'Retro Bowl', category: 'Arcade', thumb: 'images/thumbnails/retrobowl.jpg' },
  { slug: 'cookieclicker', name: 'Cookie Clicker', category: 'Simulation', thumb: 'images/thumbnails/cookieclicker.png' },
  { slug: 'drifthunters', name: 'Drift Hunters', category: 'Arcade', thumb: 'images/thumbnails/drifthunters.jpg' },
  { slug: 'drivemad', name: 'Drive Mad', category: 'Arcade', thumb: 'images/thumbnails/drivemad.jpg' },
  { slug: 'geometrydash', name: 'Geometry Dash', category: 'Platformer', thumb: 'images/thumbnails/geometrydash.png' },
  { slug: 'motox3m', name: 'Moto X3M', category: 'Arcade', thumb: 'images/thumbnails/motox3m.jpg' },
  { slug: 'amongus', name: 'Among Us', category: 'Adventure', thumb: 'images/thumbnails/amongus.png' },
  { slug: 'basketrandom', name: 'Basket Random', category: 'Arcade', thumb: 'images/thumbnails/basketrandom.jpeg' },
  { slug: 'stickmanhook', name: 'Stickman Hook', category: 'Platformer', thumb: 'images/thumbnails/stickmanhook.jpg' },
  { slug: 'monkeymart', name: 'Monkey Mart', category: 'Simulation', thumb: 'images/thumbnails/monkeymart.png' },
  { slug: '10minutestilldawn', name: '10 Minutes Till Dawn', category: 'Arcade', thumb: 'images/thumbnails/10minutestilldawn.png' },
  { slug: 'adofai', name: 'A Dance of Fire and Ice', category: 'Arcade', thumb: 'images/thumbnails/adofai.png' },
  { slug: 'adventurecapitalist', name: 'AdVenture Capitalist', category: 'Simulation', thumb: 'images/thumbnails/adventurecapitalist.jpg' },
  { slug: 'ageofwar', name: 'Age of War', category: 'Adventure', thumb: 'images/thumbnails/ageofwar.jpg' },
  { slug: 'baldisbasics', name: "Baldi's Basics", category: 'Adventure', thumb: 'images/thumbnails/baldisbasics.jpg' },
  { slug: 'burritobison', name: 'Burrito Bison', category: 'Arcade', thumb: 'images/thumbnails/burritobison.jpg' },
  { slug: 'chess', name: 'Chess', category: 'Puzzle', thumb: 'images/thumbnails/chess.png' },
  { slug: 'crossyroad', name: 'Crossy Road', category: 'Arcade', thumb: 'images/thumbnails/crossyroad.jpg' },
  { slug: 'doodlejump', name: 'Doodle Jump', category: 'Mobile', thumb: 'images/thumbnails/doodlejump.png' },
  { slug: 'ducklife4', name: 'Duck Life 4', category: 'Adventure', thumb: 'images/thumbnails/ducklife4.png' },
  { slug: 'fnaf', name: "Five Nights at Freddy's", category: 'Adventure', thumb: 'images/thumbnails/fnaf.jpg' },
  { slug: 'fruitninja', name: 'Fruit Ninja', category: 'Mobile', thumb: 'images/thumbnails/fruitninja.png' },
  { slug: 'happywheels', name: 'Happy Wheels', category: 'Platformer', thumb: 'images/thumbnails/happywheels.jpg' },
  { slug: 'jetpackjoyride', name: 'Jetpack Joyride', category: 'Mobile', thumb: 'images/thumbnails/jetpackjoyride.jpg' },
  { slug: 'minesweeper', name: 'Minesweeper', category: 'Puzzle', thumb: 'images/thumbnails/minesweeper.png' },
  { slug: 'ovo', name: 'OvO', category: 'Platformer', thumb: 'images/thumbnails/ovo.png' },
  { slug: 'pacman', name: 'Pac-Man', category: 'Arcade', thumb: 'images/thumbnails/pacman.jpg' },
  { slug: 'rooftopsnipers', name: 'Rooftop Snipers', category: 'Arcade', thumb: 'images/thumbnails/rooftopsnipers.jpg' },
  { slug: 'tetris', name: 'Tetris', category: 'Puzzle', thumb: 'images/thumbnails/tetris.png' },
  { slug: 'tinyfishing', name: 'Tiny Fishing', category: 'Mobile', thumb: 'images/thumbnails/tinyfishing.jpg' },
];

export function getFallbackSeraphCatalog(cdnBase: string = SERAPH_CDN_BASE): SeraphStudyEntry[] {
  const cleanBase = cdnBase.replace(/\/+$/, '');
  return FALLBACK_SERAPH_ITEMS.map((item) => {
    const url = `${cleanBase}/games/${item.slug}/index.html`;
    return {
      id: `seraph:${item.slug}`,
      provider: 'seraph' as const,
      name: item.name,
      slug: item.slug,
      category: item.category,
      url,
      baseUrl: `${cleanBase}/games/${item.slug}/`,
      cover: `${cleanBase}/${item.thumb}`,
      featured: true,
    };
  });
}

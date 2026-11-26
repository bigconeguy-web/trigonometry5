export type CinemaCategory =
  | 'all'
  | 'trending'
  | 'action'
  | 'sci-fi'
  | 'comedy'
  | 'anime'
  | 'public-domain';

export type CinemaSourceType = 'tvmaze' | 'archive' | 'tmdb';

export interface CinemaEpisodeItem {
  id: number;
  season: number;
  number: number;
  name: string;
  runtime: number | null;
  airdate: string;
  summary: string;
  url: string;
}

export interface CinemaTitleItem {
  id: string;
  externalId: string;
  source: CinemaSourceType;
  title: string;
  year: string;
  rating: number | null;
  genres: string[];
  categoryTags: CinemaCategory[];
  summary: string;
  poster: string | null;
  backdrop: string | null;
  networkOrStudio: string;
  cast: string[];
  embedUrl: string;
  watchPageUrl: string;
  isFullMovie: boolean;
  youtubeKey?: string | null;
  imdbId?: string | null;
}

export const TVMAZE_SHOWS_URL = 'https://api.tvmaze.com/shows?page=0';
export const TVMAZE_SEARCH_URL = 'https://api.tvmaze.com/search/shows?q=';
export const ARCHIVE_FEATURE_FILMS_URL =
  'https://archive.org/advancedsearch.php?q=collection:(feature_films)+AND+mediatype:(movies)&fl[]=identifier,title,description,year&rows=30&output=json';

export function stripHtmlTags(raw: unknown): string {
  return String(raw || '')
    .replace(/<\/?(?:b|i|em|strong|span|u)\b[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
}

export function classifyGenresToTags(
  genres: string[],
  source: CinemaSourceType,
  showType?: string,
  language?: string,
  rating?: number | null
): CinemaCategory[] {
  const tags = new Set<CinemaCategory>(['all']);
  if (source === 'archive') {
    tags.add('public-domain');
  }
  if (source === 'tmdb' || (typeof rating === 'number' && rating >= 7.8)) {
    tags.add('trending');
  }
  const lowerGenres = genres.map((g) => g.toLowerCase());
  const lowerType = String(showType || '').toLowerCase();
  const lowerLang = String(language || '').toLowerCase();

  if (lowerGenres.some((g) => g.includes('action') || g.includes('adventure') || g.includes('thriller'))) {
    tags.add('action');
  }
  if (lowerGenres.some((g) => g.includes('science-fiction') || g.includes('sci-fi') || g.includes('fantasy') || g.includes('supernatural'))) {
    tags.add('sci-fi');
  }
  if (lowerGenres.some((g) => g.includes('comedy'))) {
    tags.add('comedy');
  }
  if (
    lowerGenres.some((g) => g.includes('anime')) ||
    (lowerType.includes('animation') && lowerLang === 'japanese')
  ) {
    tags.add('anime');
  }
  return Array.from(tags);
}

export function normalizeTvMazeShow(show: any): CinemaTitleItem | null {
  if (!show || !show.id || !show.name) return null;
  const genres: string[] = Array.isArray(show.genres) ? show.genres.map(String) : [];
  const rating: number | null =
    show.rating && typeof show.rating.average === 'number' ? show.rating.average : null;
  const yearMatch = String(show.premiered || '').match(/^(\d{4})/);
  const year = yearMatch ? yearMatch[1] : '';
  const networkName =
    (show.network && show.network.name) ||
    (show.webChannel && show.webChannel.name) ||
    'TV Network';
  const poster =
    (show.image && (show.image.medium || show.image.original)) || null;
  const backdrop =
    (show.image && (show.image.original || show.image.medium)) || null;
  const officialSite = typeof show.officialSite === 'string' ? show.officialSite.trim() : '';
  const tvmazeUrl = typeof show.url === 'string' ? show.url.trim() : `https://www.tvmaze.com/shows/${show.id}`;

  return {
    id: `tvmaze:${show.id}`,
    externalId: String(show.id),
    source: 'tvmaze',
    title: String(show.name).trim(),
    year,
    rating,
    genres,
    categoryTags: classifyGenresToTags(genres, 'tvmaze', show.type, show.language, rating),
    summary: stripHtmlTags(show.summary) || 'No synopsis available for this series.',
    poster,
    backdrop,
    networkOrStudio: networkName,
    cast: [],
    embedUrl: '',
    watchPageUrl: officialSite || tvmazeUrl,
    isFullMovie: false,
    imdbId: show.externals && show.externals.imdb ? String(show.externals.imdb).trim() : null,
  };
}

export function normalizeArchiveMovieDoc(doc: any): CinemaTitleItem | null {
  if (!doc || !doc.identifier) return null;
  const id = String(doc.identifier).trim();
  const title = Array.isArray(doc.title)
    ? String(doc.title[0] || id).trim()
    : String(doc.title || id).trim();
  const descRaw = Array.isArray(doc.description) ? doc.description[0] : doc.description;
  const yearRaw = Array.isArray(doc.year) ? doc.year[0] : doc.year;
  const year = yearRaw ? String(yearRaw).slice(0, 4) : '';
  const lower = `${title} ${String(descRaw || '')}`.toLowerCase();

  const genres: string[] = ['Public Domain'];
  const extraTags: CinemaCategory[] = ['all', 'public-domain'];
  if (/comedy|keaton|chaplin|laurel|hardy/.test(lower)) {
    genres.push('Comedy');
    extraTags.push('comedy');
  }
  if (/sci-fi|space|plan 9|living dead|scientist|superman|monster|alien/.test(lower)) {
    genres.push('Sci-Fi');
    extraTags.push('sci-fi');
  }
  if (/action|adventure|western|war|general/.test(lower)) {
    genres.push('Action');
    extraTags.push('action');
  }

  return {
    id: `archive:${id}`,
    externalId: id,
    source: 'archive',
    title,
    year,
    rating: null,
    genres,
    categoryTags: Array.from(new Set(extraTags)),
    summary: stripHtmlTags(descRaw) || 'Complete legal public-domain feature film on Internet Archive.',
    poster: `https://archive.org/services/img/${encodeURIComponent(id)}`,
    backdrop: `https://archive.org/services/img/${encodeURIComponent(id)}`,
    networkOrStudio: 'Internet Archive Cinema',
    cast: ['Public Domain Feature'],
    embedUrl: `https://archive.org/embed/${encodeURIComponent(id)}`,
    watchPageUrl: `https://archive.org/details/${encodeURIComponent(id)}`,
    isFullMovie: true,
  };
}

export function normalizeTmdbMovie(movie: any): CinemaTitleItem | null {
  if (!movie || !movie.id || !(movie.title || movie.name)) return null;
  const title = String(movie.title || movie.name).trim();
  const release = String(movie.release_date || movie.first_air_date || '');
  const year = release ? release.slice(0, 4) : '';
  const rating =
    typeof movie.vote_average === 'number' && movie.vote_average > 0
      ? Number(movie.vote_average.toFixed(1))
      : null;

  return {
    id: `tmdb:${movie.id}`,
    externalId: String(movie.id),
    source: 'tmdb',
    title,
    year,
    rating,
    genres: ['TMDB Trending'],
    categoryTags: ['all', 'trending'],
    summary: String(movie.overview || '').trim() || 'Trending title from TMDB.',
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : null,
    networkOrStudio: 'TMDB Discovery',
    cast: [],
    embedUrl: '',
    watchPageUrl: `https://www.themoviedb.org/movie/${movie.id}`,
    isFullMovie: false,
  };
}

export function normalizeTvMazeEpisode(ep: any): CinemaEpisodeItem | null {
  if (!ep || !ep.id) return null;
  return {
    id: Number(ep.id),
    season: Number(ep.season || 1),
    number: Number(ep.number || 1),
    name: String(ep.name || `Episode ${ep.number || 1}`).trim(),
    runtime: typeof ep.runtime === 'number' ? ep.runtime : null,
    airdate: String(ep.airdate || ''),
    summary: stripHtmlTags(ep.summary) || 'Episode synopsis unavailable.',
    url: String(ep.url || ''),
  };
}

export function filterCinemaCatalog(
  items: CinemaTitleItem[],
  category: CinemaCategory,
  query: string
): CinemaTitleItem[] {
  const q = String(query || '').trim().toLowerCase();
  return items.filter((item) => {
    if (category !== 'all' && !item.categoryTags.includes(category)) {
      return false;
    }
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.genres.some((g) => g.toLowerCase().includes(q)) ||
      item.networkOrStudio.toLowerCase().includes(q)
    );
  });
}

export function buildArchiveMovieFallbackList(): CinemaTitleItem[] {
  const seeds = [
    {
      identifier: 'night_of_the_living_dead',
      title: 'Night of the Living Dead',
      year: '1968',
      description: 'George A. Romero’s landmark sci-fi horror feature following strangers trapped inside a Pennsylvania farmhouse.',
    },
    {
      identifier: 'Charade_1963',
      title: 'Charade',
      year: '1963',
      description: 'Cary Grant and Audrey Hepburn star in Stanley Donen’s acclaimed Parisian mystery thriller.',
    },
    {
      identifier: 'The_General_1926',
      title: 'The General',
      year: '1926',
      description: 'Buster Keaton’s iconic silent action comedy masterpiece centered on a daring locomotive chase.',
    },
    {
      identifier: 'House_on_Haunted_Hill_1959',
      title: 'House on Haunted Hill',
      year: '1959',
      description: 'Vincent Price invites five guests to survive one night in a locked hillside mansion for $10,000.',
    },
    {
      identifier: 'GulliversTravels1939',
      title: "Gulliver's Travels",
      year: '1939',
      description: 'Fleischer Studios’ full-length Technicolor animated adventure adapting Jonathan Swift’s classic.',
    },
    {
      identifier: 'Plan_9_from_Outer_Space_1959',
      title: 'Plan 9 from Outer Space',
      year: '1959',
      description: 'Cult-classic 1950s retro sci-fi feature involving flying saucers over Southern California.',
    },
    {
      identifier: 'HisGirlFriday1940',
      title: 'His Girl Friday',
      year: '1940',
      description: 'Howard Hawks’ fast-talking screwball comedy starring Cary Grant and Rosalind Russell.',
    },
    {
      identifier: 'superman_1941',
      title: 'Superman: The Mad Scientist',
      year: '1941',
      description: 'Fleischer Studios’ acclaimed 1941 animated sci-fi action theatrical short.',
    },
  ];
  return seeds
    .map((s) => normalizeArchiveMovieDoc(s))
    .filter((item): item is CinemaTitleItem => Boolean(item));
}

export function buildTvFallbackCatalog(): CinemaTitleItem[] {
  return [
    {
      id: 'tvmaze:82',
      externalId: '82',
      source: 'tvmaze',
      title: 'Game of Thrones',
      year: '2011',
      rating: 8.9,
      genres: ['Drama', 'Adventure', 'Fantasy'],
      categoryTags: ['all', 'trending', 'action', 'sci-fi'],
      summary: 'Nine noble families fight for control over the mythical lands of Westeros while an ancient enemy returns.',
      poster: 'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
      backdrop: 'https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg',
      networkOrStudio: 'HBO',
      cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
      embedUrl: '',
      watchPageUrl: 'https://www.tvmaze.com/shows/82/game-of-thrones',
      isFullMovie: false,
    },
    {
      id: 'tvmaze:169',
      externalId: '169',
      source: 'tvmaze',
      title: 'Breaking Bad',
      year: '2008',
      rating: 9.2,
      genres: ['Drama', 'Crime', 'Thriller'],
      categoryTags: ['all', 'trending', 'action'],
      summary: 'A high school chemistry teacher diagnosed with terminal cancer turns to manufacturing to secure his family’s future.',
      poster: 'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
      backdrop: 'https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg',
      networkOrStudio: 'AMC',
      cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
      embedUrl: '',
      watchPageUrl: 'https://www.tvmaze.com/shows/169/breaking-bad',
      isFullMovie: false,
    },
    {
      id: 'tvmaze:216',
      externalId: '216',
      source: 'tvmaze',
      title: 'Rick and Morty',
      year: '2013',
      rating: 8.8,
      genres: ['Comedy', 'Adventure', 'Science-Fiction'],
      categoryTags: ['all', 'trending', 'comedy', 'sci-fi', 'action'],
      summary: 'An eccentric scientist drags his anxious grandson on chaotic interdimensional adventures across the multiverse.',
      poster: 'https://static.tvmaze.com/uploads/images/medium_portrait/477/1194843.jpg',
      backdrop: 'https://static.tvmaze.com/uploads/images/original_untouched/477/1194843.jpg',
      networkOrStudio: 'Adult Swim',
      cast: ['Ian Cardoni', 'Harry Belden', 'Chris Parnell'],
      embedUrl: '',
      watchPageUrl: 'https://www.tvmaze.com/shows/216/rick-and-morty',
      isFullMovie: false,
    },
    {
      id: 'tvmaze:1505',
      externalId: '1505',
      source: 'tvmaze',
      title: 'One-Punch Man',
      year: '2015',
      rating: 8.5,
      genres: ['Action', 'Comedy', 'Anime'],
      categoryTags: ['all', 'trending', 'action', 'comedy', 'anime'],
      summary: 'Saitama is a hero so overwhelmingly strong he defeats every opponent with a single punch and seeks a worthy rival.',
      poster: 'https://static.tvmaze.com/uploads/images/medium_portrait/464/1160027.jpg',
      backdrop: 'https://static.tvmaze.com/uploads/images/original_untouched/464/1160027.jpg',
      networkOrStudio: 'TV Tokyo',
      cast: ['Makoto Furukawa', 'Kaito Ishikawa'],
      embedUrl: '',
      watchPageUrl: 'https://www.tvmaze.com/shows/1505/one-punch-man',
      isFullMovie: false,
    },
  ];
}

export type CinemaPlayerSourceMode = 'trailer' | 'archive' | 'custom';

const DIRECT_EMBED_HOSTS = [
  'youtube.com',
  'youtu.be',
  'youtube-nocookie.com',
  'archive.org',
  'vimeo.com',
  'dailymotion.com',
  'twitch.tv',
  'soundcloud.com',
  'streamable.com',
];

function stripScramPrefixIfAny(rawUrl: string): string {
  const trimmed = String(rawUrl || '').trim();
  const scramIdx = trimmed.indexOf('/scram/');
  if (scramIdx !== -1) {
    const after = trimmed.slice(scramIdx + '/scram/'.length);
    try {
      const decoded = decodeURIComponent(after);
      if (/^https?:\/\//i.test(decoded)) return decoded;
    } catch {
      if (/^https?:\/\//i.test(after)) return after;
    }
  }
  return trimmed;
}

export function shouldBypassProxyForEmbed(rawUrl: string | null | undefined): boolean {
  const candidate = stripScramPrefixIfAny(String(rawUrl || ''));
  if (!candidate) return false;
  try {
    const parsed = new URL(/^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (DIRECT_EMBED_HOSTS.some((d) => host === d || host.endsWith(`.${d}`))) {
      return true;
    }
    const lowerPath = parsed.pathname.toLowerCase();
    if (lowerPath.includes('/embed') || /\.(mp4|webm|m3u8|ogv)(\?|$)/i.test(lowerPath)) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function extractYouTubeVideoId(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = parsed.pathname.replace(/^\/+/, '').split('/')[0];
      return id || null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v') || null;
      }
      const m = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
      if (m && m[1]) return m[1];
    }
  } catch {
    // ignore invalid URL
  }
  return null;
}

export function normalizeDirectEmbedUrl(rawUrl: string | null | undefined): string {
  const stripped = stripScramPrefixIfAny(String(rawUrl || ''));
  if (!stripped || /^(javascript|data|vbscript|file):/i.test(stripped)) {
    return '';
  }
  const withProto = /^https?:\/\//i.test(stripped) ? stripped : `https://${stripped}`;
  try {
    const parsed = new URL(withProto);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';

    const ytId = extractYouTubeVideoId(parsed.toString());
    if (ytId) {
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(ytId)}?autoplay=1&rel=0`;
    }

    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'archive.org') {
      const detailsMatch = parsed.pathname.match(/^\/details\/([^/?#]+)/);
      if (detailsMatch && detailsMatch[1]) {
        return `https://archive.org/embed/${encodeURIComponent(decodeURIComponent(detailsMatch[1]))}`;
      }
      const embedMatch = parsed.pathname.match(/^\/embed\/([^/?#]+)/);
      if (embedMatch && embedMatch[1]) {
        return `https://archive.org/embed/${encodeURIComponent(decodeURIComponent(embedMatch[1]))}`;
      }
    }

    if (host === 'vimeo.com') {
      const vimeoMatch = parsed.pathname.match(/^\/(\d+)/);
      if (vimeoMatch && vimeoMatch[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      }
    }

    if (host === 'dailymotion.com' || host === 'dai.ly' || host === 'geo.dailymotion.com') {
      if (host === 'dai.ly') {
        const dmShort = parsed.pathname.replace(/^\/+/, '').split('/')[0];
        if (dmShort) return `https://www.dailymotion.com/embed/video/${encodeURIComponent(dmShort)}?autoplay=1`;
      }
      if (host === 'geo.dailymotion.com') {
        const vidParam = parsed.searchParams.get('video');
        if (vidParam) return `https://www.dailymotion.com/embed/video/${encodeURIComponent(vidParam)}?autoplay=1`;
      }
      const dmMatch = parsed.pathname.match(/^\/(?:embed\/)?video\/([^/?#_]+)/);
      if (dmMatch && dmMatch[1]) {
        return `https://www.dailymotion.com/embed/video/${encodeURIComponent(dmMatch[1])}?autoplay=1`;
      }
    }

    return parsed.toString();
  } catch {
    return '';
  }
}

export function pickBestArchiveMovieIdentifier(
  docs: Array<{ identifier?: string; title?: string | string[] }>,
  showTitle: string
): string | null {
  if (!Array.isArray(docs) || docs.length === 0) return null;
  const cleanTitle = String(showTitle || '').toLowerCase().trim();
  let bestId: string | null = null;
  let bestScore = -999;

  for (const d of docs) {
    if (!d || !d.identifier) continue;
    const id = String(d.identifier).trim();
    const rawTitle = Array.isArray(d.title) ? d.title[0] : d.title;
    const t = String(rawTitle || id).toLowerCase();
    const lowId = id.toLowerCase();
    let score = 0;

    if (cleanTitle && t.includes(cleanTitle)) score += 6;
    if (/trailer|promo|teaser|intro|clip|episode|feature|film|movie/.test(t)) score += 4;
    if (lowId.startsWith('youtube-') || t.includes('video')) score += 1;
    if (/podcast|soundtrack|score|audio|mp3|radio|coptx-/.test(`${lowId} ${t}`)) score -= 10;
    if (/essay|review|disaster|promotes|violence|explained|analysis|reaction|debate/.test(t)) score -= 6;

    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }
  }
  return bestId;
}

export function pickBestDailymotionTrailerId(
  videos: Array<{ id?: string; title?: string; duration?: number }>,
  showTitle: string
): string | null {
  if (!Array.isArray(videos) || videos.length === 0) return null;
  const cleanTitle = String(showTitle || '').toLowerCase().trim();
  const titleTokens = cleanTitle.split(/\s+/).filter((t) => t.length >= 3);
  let bestId: string | null = null;
  let bestScore = -1;

  for (const v of videos) {
    if (!v || !v.id) continue;
    const vidTitle = String(v.title || '').toLowerCase();
    const dur = typeof v.duration === 'number' ? v.duration : 0;
    let score = 0;
    if (dur >= 25 && dur <= 360) score += 4;
    else if (dur > 0 && dur <= 600) score += 2;
    if (vidTitle.includes('trailer') || vidTitle.includes('teaser')) score += 3;
    if (vidTitle.includes('official')) score += 2;
    if (cleanTitle && vidTitle.includes(cleanTitle)) score += 4;
    else if (titleTokens.some((tok) => vidTitle.includes(tok))) score += 2;
    if (score > bestScore) {
      bestScore = score;
      bestId = String(v.id).trim();
    }
  }
  return bestId;
}

export function resolveTemplateEmbedUrl(
  template: string | null | undefined,
  externalId: string,
  season: number = 1,
  episode: number = 1,
  imdbId?: string | null
): string {
  const raw = String(template || '').trim();
  if (!raw) return '';
  const replaced = raw
    .replace(/\{id\}/gi, encodeURIComponent(String(externalId || '')))
    .replace(/\{imdb\}/gi, encodeURIComponent(String(imdbId || externalId || '')))
    .replace(/\{season\}/gi, String(season || 1))
    .replace(/\{episode\}/gi, String(episode || 1));
  return normalizeDirectEmbedUrl(replaced);
}

export interface PlayerSourceCandidates {
  defaultSource: CinemaPlayerSourceMode;
  trailerUrl: string;
  archiveUrl: string;
  customUrl: string;
  newTabUrl: string;
}

export function buildPlayerSourceCandidates(
  item: Pick<CinemaTitleItem, 'source' | 'externalId' | 'title' | 'embedUrl' | 'watchPageUrl' | 'youtubeKey'>,
  options: { embedTemplate?: string; customUrl?: string; season?: number; episode?: number } = {}
): PlayerSourceCandidates {
  const trailerUrl = item.youtubeKey
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeKey)}?autoplay=1&rel=0`
    : '';
  const archiveUrl =
    item.source === 'archive'
      ? `https://archive.org/embed/${encodeURIComponent(item.externalId)}`
      : normalizeDirectEmbedUrl(item.embedUrl).includes('archive.org/embed/')
        ? normalizeDirectEmbedUrl(item.embedUrl)
        : '';
  const customFromOption = normalizeDirectEmbedUrl(options.customUrl);
  const customFromTemplate = resolveTemplateEmbedUrl(
    options.embedTemplate,
    item.externalId,
    options.season ?? 1,
    options.episode ?? 1
  );
  const customUrl = customFromOption || customFromTemplate;

  let defaultSource: CinemaPlayerSourceMode = 'trailer';
  if (archiveUrl && item.source === 'archive') {
    defaultSource = 'archive';
  } else if (customUrl) {
    defaultSource = 'custom';
  } else if (trailerUrl) {
    defaultSource = 'trailer';
  } else if (archiveUrl) {
    defaultSource = 'archive';
  }

  const activeUrl =
    defaultSource === 'archive'
      ? archiveUrl
      : defaultSource === 'custom'
        ? customUrl
        : trailerUrl;

  const newTabUrl =
    activeUrl ||
    item.watchPageUrl ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(`${item.title} trailer`)}`;

  return {
    defaultSource,
    trailerUrl,
    archiveUrl,
    customUrl,
    newTabUrl,
  };
}


import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ARCHIVE_FEATURE_FILMS_URL,
  TVMAZE_SEARCH_URL,
  TVMAZE_SHOWS_URL,
  buildArchiveMovieFallbackList,
  buildPlayerSourceCandidates,
  buildTvFallbackCatalog,
  classifyGenresToTags,
  filterCinemaCatalog,
  normalizeArchiveMovieDoc,
  normalizeDirectEmbedUrl,
  normalizeTmdbMovie,
  normalizeTvMazeEpisode,
  normalizeTvMazeShow,
  pickBestArchiveMovieIdentifier,
  pickBestDailymotionTrailerId,
  resolveTemplateEmbedUrl,
  shouldBypassProxyForEmbed,
  stripHtmlTags,
} from './cinemaCatalog';

test('stripHtmlTags removes HTML tags and normalizes whitespace', () => {
  assert.equal(stripHtmlTags('<p>Hello &amp; <b>world</b>!</p>'), 'Hello & world!');
});

test('normalizeTvMazeShow maps poster, rating, genres, network, and anime/trending tags cleanly', () => {
  const item = normalizeTvMazeShow({
    id: 1505,
    name: 'One-Punch Man',
    type: 'Animation',
    language: 'Japanese',
    genres: ['Action', 'Comedy', 'Anime'],
    premiered: '2015-10-05',
    rating: { average: 8.5 },
    network: { name: 'TV Tokyo' },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/1.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original/1.jpg',
    },
    summary: '<p>A hero who wins in one punch.</p>',
    url: 'https://www.tvmaze.com/shows/1505/one-punch-man',
  });
  assert.ok(item);
  assert.equal(item.id, 'tvmaze:1505');
  assert.equal(item.year, '2015');
  assert.equal(item.rating, 8.5);
  assert.equal(item.networkOrStudio, 'TV Tokyo');
  assert.ok(item.categoryTags.includes('anime'));
  assert.ok(item.categoryTags.includes('trending'));
  assert.ok(item.categoryTags.includes('action'));
  assert.equal(item.isFullMovie, false);
});

test('normalizeArchiveMovieDoc creates full-length legal Archive.org embed URL and public-domain tag', () => {
  const movie = normalizeArchiveMovieDoc({
    identifier: 'night_of_the_living_dead',
    title: 'Night of the Living Dead',
    year: '1968',
    description: 'Classic sci-fi survival feature film.',
  });
  assert.ok(movie);
  assert.equal(movie.source, 'archive');
  assert.equal(movie.isFullMovie, true);
  assert.equal(movie.embedUrl, 'https://archive.org/embed/night_of_the_living_dead');
  assert.ok(movie.categoryTags.includes('public-domain'));
  assert.ok(movie.categoryTags.includes('sci-fi'));
});

test('normalizeTmdbMovie and normalizeTvMazeEpisode handle missing fields gracefully', () => {
  const tmdb = normalizeTmdbMovie({
    id: 550,
    title: 'Fight Club',
    release_date: '1999-10-15',
    vote_average: 8.43,
    overview: 'An insomniac office worker.',
    poster_path: '/poster.jpg',
  });
  assert.ok(tmdb);
  assert.equal(tmdb.source, 'tmdb');
  assert.equal(tmdb.year, '1999');
  assert.equal(tmdb.rating, 8.4);

  const ep = normalizeTvMazeEpisode({
    id: 101,
    season: 2,
    number: 4,
    name: 'Signal',
    runtime: 45,
    airdate: '2020-04-01',
    summary: '<p>Episode plot</p>',
  });
  assert.ok(ep);
  assert.equal(ep.season, 2);
  assert.equal(ep.number, 4);
  assert.equal(ep.summary, 'Episode plot');
});

test('filterCinemaCatalog filters by category pills and search query', () => {
  const combined = [...buildTvFallbackCatalog(), ...buildArchiveMovieFallbackList()];
  const publicDomainOnly = filterCinemaCatalog(combined, 'public-domain', '');
  assert.ok(publicDomainOnly.length >= 6);
  assert.ok(publicDomainOnly.every((item) => item.categoryTags.includes('public-domain')));

  const keaton = filterCinemaCatalog(combined, 'comedy', 'general');
  assert.equal(keaton.length, 1);
  assert.equal(keaton[0].externalId, 'The_General_1926');

  assert.ok(TVMAZE_SHOWS_URL.includes('api.tvmaze.com/shows'));
  assert.ok(TVMAZE_SEARCH_URL.includes('api.tvmaze.com/search/shows'));
  assert.ok(ARCHIVE_FEATURE_FILMS_URL.includes('collection:(feature_films)'));
  assert.deepEqual(
    classifyGenresToTags(['Comedy', 'Science-Fiction'], 'tvmaze', 'Scripted', 'English', 7.2).sort(),
    ['all', 'comedy', 'sci-fi']
  );
});

test('shouldBypassProxyForEmbed and normalizeDirectEmbedUrl load video embeds directly without /scram/', () => {
  assert.equal(shouldBypassProxyForEmbed('https://archive.org/embed/Charade_1963'), true);
  assert.equal(shouldBypassProxyForEmbed('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'), true);
  assert.equal(shouldBypassProxyForEmbed('https://example.org/watch/embed/123'), true);
  assert.equal(shouldBypassProxyForEmbed('https://news.ycombinator.com/'), false);

  assert.equal(
    normalizeDirectEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0'
  );
  assert.equal(
    normalizeDirectEmbedUrl('https://youtu.be/abc123XYZ'),
    'https://www.youtube-nocookie.com/embed/abc123XYZ?autoplay=1&rel=0'
  );
  assert.equal(
    normalizeDirectEmbedUrl('https://archive.org/details/The_General_1926'),
    'https://archive.org/embed/The_General_1926'
  );
  assert.equal(
    normalizeDirectEmbedUrl('/scram/https%3A%2F%2Farchive.org%2Fembed%2FCharade_1963'),
    'https://archive.org/embed/Charade_1963'
  );
  assert.equal(normalizeDirectEmbedUrl('javascript:alert(1)'), '');

  const resolved = resolveTemplateEmbedUrl(
    'https://player.example.com/embed/{id}?s={season}&e={episode}',
    '82',
    3,
    9
  );
  assert.equal(resolved, 'https://player.example.com/embed/82?s=3&e=9');

  const arcCandidates = buildPlayerSourceCandidates({
    source: 'archive',
    externalId: 'Charade_1963',
    title: 'Charade',
    embedUrl: 'https://archive.org/embed/Charade_1963',
    watchPageUrl: 'https://archive.org/details/Charade_1963',
  });
  assert.equal(arcCandidates.defaultSource, 'archive');
  assert.equal(arcCandidates.archiveUrl, 'https://archive.org/embed/Charade_1963');
  assert.equal(arcCandidates.newTabUrl, 'https://archive.org/embed/Charade_1963');

  const tmdbCandidates = buildPlayerSourceCandidates({
    source: 'tmdb',
    externalId: '550',
    title: 'Fight Club',
    embedUrl: '',
    watchPageUrl: 'https://www.themoviedb.org/movie/550',
    youtubeKey: 'SUXWAEX2jlg',
  });
  assert.equal(tmdbCandidates.defaultSource, 'trailer');
  assert.equal(
    tmdbCandidates.trailerUrl,
    'https://www.youtube-nocookie.com/embed/SUXWAEX2jlg?autoplay=1&rel=0'
  );

  assert.equal(
    normalizeDirectEmbedUrl('https://www.dailymotion.com/video/x2p817f'),
    'https://www.dailymotion.com/embed/video/x2p817f?autoplay=1'
  );
  assert.equal(
    normalizeDirectEmbedUrl('https://dai.ly/x2p817f'),
    'https://www.dailymotion.com/embed/video/x2p817f?autoplay=1'
  );
  assert.equal(
    pickBestDailymotionTrailerId(
      [
        { id: 'x111', title: 'Random review 1 hour', duration: 3600 },
        { id: 'x2p817f', title: 'True Detective: Official Trailer (HBO)', duration: 105 },
      ],
      'True Detective'
    ),
    'x2p817f'
  );
  assert.equal(
    pickBestArchiveMovieIdentifier(
      [
        { identifier: 'truedetectiveseasononescore', title: 'True Detective Soundtrack' },
        { identifier: 'coptx-podcast-1', title: 'True Detective Podcast' },
        { identifier: 'funny_or_die_video_7becba1362', title: 'Funny or Die: Rust Cohle (True Detective)' },
      ],
      'True Detective'
    ),
    'funny_or_die_video_7becba1362'
  );
});

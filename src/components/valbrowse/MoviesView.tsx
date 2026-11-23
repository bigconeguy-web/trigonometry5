import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Film, Play, Maximize2, X, Globe, Loader2 } from 'lucide-react';
import { CURATED_MOVIES, type CuratedMovieItem } from '../../utils/gnMathService';

interface MoviesViewProps {
  onOpenInProxy: (url: string) => void;
}

const GENRES = [
  { id: 'featured', label: 'Featured' },
  { id: 'sci-fi', label: 'Sci-Fi' },
  { id: 'animation', label: 'Animation' },
  { id: 'noir', label: 'Film Noir' },
  { id: 'comedy', label: 'Comedy' },
];

export const MoviesView: React.FC<MoviesViewProps> = ({ onOpenInProxy }) => {
  const [genre, setGenre] = useState('featured');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CuratedMovieItem[]>(CURATED_MOVIES);
  const [status, setStatus] = useState('Public-domain cinema library ready to stream.');
  const [searching, setSearching] = useState(false);

  const [activeMovie, setActiveMovie] = useState<CuratedMovieItem | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [streamMeta, setStreamMeta] = useState('');
  const [loadingStream, setLoadingStream] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const selectGenre = (nextGenre: string) => {
    setGenre(nextGenre);
    setQuery('');
    const list =
      nextGenre === 'featured'
        ? CURATED_MOVIES
        : CURATED_MOVIES.filter((m) => m.genre === nextGenre);
    setResults(list);
    setStatus(`Showing ${list.length} films (${nextGenre})`);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) {
      selectGenre('featured');
      return;
    }
    setSearching(true);
    setStatus(`Searching Internet Archive for "${clean}"...`);
    try {
      const apiUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
        `${clean} AND mediatype:movies AND (collection:feature_films OR collection:classic_cartoons OR collection:SciFi_Horror)`
      )}&fl[]=identifier,title,description&rows=24&page=1&output=json`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const docs = (data?.response?.docs || []) as Array<{
        identifier: string;
        title?: string;
        description?: string | string[];
      }>;
      const mapped: CuratedMovieItem[] = docs.map((d) => ({
        id: d.identifier,
        title: d.title || d.identifier,
        genre: 'cinema',
        desc: Array.isArray(d.description)
          ? d.description[0] || ''
          : d.description || 'Public domain film on Internet Archive.',
        thumb: `https://archive.org/services/img/${encodeURIComponent(d.identifier)}`,
      }));
      setResults(mapped);
      setStatus(
        mapped.length
          ? `Found ${mapped.length} titles matching "${clean}"`
          : `No Archive.org films matched "${clean}"`
      );
    } catch {
      setStatus('Archive search unavailable; showing featured cinema.');
      selectGenre('featured');
    } finally {
      setSearching(false);
    }
  };

  const openTheater = async (movie: CuratedMovieItem) => {
    setActiveMovie(movie);
    setStreamUrl(null);
    setEmbedUrl(null);
    setLoadingStream(true);
    setStreamMeta(`Resolving MP4 stream for "${movie.title}"...`);

    try {
      const res = await fetch(`https://archive.org/metadata/${encodeURIComponent(movie.id)}`);
      if (res.ok) {
        const meta = await res.json();
        const files = Array.isArray(meta?.files) ? meta.files : [];
        const mp4 =
          files.find(
            (f: { name?: string }) =>
              f?.name && /\.mp4$/i.test(f.name) && !/_archive\.mp4$/i.test(f.name)
          ) || files.find((f: { name?: string }) => f?.name && /\.mp4$/i.test(f.name));
        if (mp4) {
          const url = `https://archive.org/download/${encodeURIComponent(movie.id)}/${String(
            mp4.name
          )
            .split('/')
            .map(encodeURIComponent)
            .join('/')}`;
          setStreamUrl(url);
          setStreamMeta(`${movie.title} · Direct MP4 Stream`);
          setLoadingStream(false);
          return;
        }
      }
    } catch {
      // fall through to embed
    }

    setEmbedUrl(`https://archive.org/embed/${encodeURIComponent(movie.id)}`);
    setStreamMeta(`${movie.title} · Archive Theater Embed`);
    setLoadingStream(false);
  };

  const closeTheater = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // ignore
      }
    }
    setActiveMovie(null);
    setStreamUrl(null);
    setEmbedUrl(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="h-full overflow-y-auto px-5 py-5 lg:px-7"
    >
      <div className="max-w-[1440px] mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.07] pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-indigo-400">
              gn-math Cinema · Archive.org Theater
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-50 mt-1">
              Movies &amp; Stream
            </h1>
          </div>
          <span className="font-mono text-xs text-slate-400">{status}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => selectGenre(g.id)}
                className={`h-8 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  genre === g.id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-[#101521] text-slate-400 hover:text-white border border-white/[0.07]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Archive.org films..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#0d121c] border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="h-9 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer disabled:opacity-60"
            >
              {searching ? 'Searching...' : 'Find'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => openTheater(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openTheater(movie);
                }
              }}
              className="group rounded-xl bg-[#0e131e] hover:bg-[#141b2b] border border-white/[0.07] hover:border-indigo-500/45 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-video bg-[#080b12] overflow-hidden">
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#121828] via-[#0d121d] to-[#080b12] text-slate-400 px-4 text-center">
                  <Film className="w-7 h-7 text-indigo-400/75" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {movie.genre} · Archive Cinema
                  </span>
                </div>
                <img
                  src={movie.thumb}
                  alt={movie.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="relative z-10 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-lg bg-indigo-500 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </span>
                </div>
              </div>
              <div className="p-3.5 space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <h3 className="text-sm font-semibold text-slate-100 truncate">{movie.title}</h3>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {String(movie.desc || '').replace(/<[^>]+>/g, '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movie Theater Overlay */}
      <AnimatePresence>
        {activeMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#05070c] flex flex-col"
          >
            <div className="h-13 px-4 bg-[#0c1018] border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[11px] uppercase px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Cinema
                </span>
                <span className="text-sm font-bold text-slate-100 truncate">{activeMovie.title}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const target = `https://archive.org/details/${encodeURIComponent(activeMovie.id)}`;
                    closeTheater();
                    onOpenInProxy(target);
                  }}
                  className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Open in Proxy</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = videoRef.current;
                    if (target && target.requestFullscreen) target.requestFullscreen().catch(() => {});
                  }}
                  className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </button>
                <button
                  type="button"
                  onClick={closeTheater}
                  className="h-8 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3 min-h-0">
              {loadingStream ? (
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
                  <span className="text-xs font-mono">{streamMeta}</span>
                </div>
              ) : streamUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={streamUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-w-[1100px] max-h-[calc(100vh-140px)] rounded-xl bg-black border border-white/[0.08]"
                  />
                  <span className="text-xs font-mono text-slate-400">{streamMeta}</span>
                </>
              ) : embedUrl ? (
                <iframe
                  title={activeMovie.title}
                  src={embedUrl}
                  allow="autoplay; fullscreen"
                  className="w-full h-full border-0 rounded-lg bg-black"
                />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

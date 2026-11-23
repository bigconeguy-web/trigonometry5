import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, Loader2, X, Globe } from 'lucide-react';

interface BooksViewProps {
  onOpenInProxy: (url: string) => void;
}

interface GutendexBook {
  id: number;
  title: string;
  authors: Array<{ name: string }>;
  subjects?: string[];
  download_count?: number;
  formats?: Record<string, string>;
}

const PRESET_TOPICS = ['Sherlock Holmes', 'Dracula', 'Frankenstein', 'Alice', 'Jules Verne'];

const FALLBACK_GUTENBERG_BOOKS: GutendexBook[] = [
  {
    id: 1661,
    title: 'The Adventures of Sherlock Holmes',
    authors: [{ name: 'Doyle, Arthur Conan' }],
    subjects: ['Detective and mystery stories', 'Holmes, Sherlock (Fictitious character)'],
    download_count: 68420,
    formats: {
      'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/1661.txt.utf-8',
      'text/html': 'https://www.gutenberg.org/ebooks/1661.html.images',
    },
  },
  {
    id: 345,
    title: 'Dracula',
    authors: [{ name: 'Stoker, Bram' }],
    subjects: ['Horror tales', 'Vampires -- Fiction'],
    download_count: 54120,
    formats: {
      'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/345.txt.utf-8',
      'text/html': 'https://www.gutenberg.org/ebooks/345.html.images',
    },
  },
  {
    id: 84,
    title: 'Frankenstein; Or, The Modern Prometheus',
    authors: [{ name: 'Shelley, Mary Wollstonecraft' }],
    subjects: ['Science fiction', 'Gothic fiction'],
    download_count: 89210,
    formats: {
      'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/84.txt.utf-8',
      'text/html': 'https://www.gutenberg.org/ebooks/84.html.images',
    },
  },
  {
    id: 11,
    title: "Alice's Adventures in Wonderland",
    authors: [{ name: 'Carroll, Lewis' }],
    subjects: ['Fantasy fiction', "Children's stories"],
    download_count: 47890,
    formats: {
      'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/11.txt.utf-8',
      'text/html': 'https://www.gutenberg.org/ebooks/11.html.images',
    },
  },
  {
    id: 1342,
    title: 'Pride and Prejudice',
    authors: [{ name: 'Austen, Jane' }],
    subjects: ['Courtship -- Fiction', 'England -- Social life and customs'],
    download_count: 91300,
    formats: {
      'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/1342.txt.utf-8',
      'text/html': 'https://www.gutenberg.org/ebooks/1342.html.images',
    },
  },
  {
    id: 164,
    title: 'Twenty Thousand Leagues under the Sea',
    authors: [{ name: 'Verne, Jules' }],
    subjects: ['Adventure stories', 'Submarines (Ships) -- Fiction'],
    download_count: 29450,
    formats: {
      'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/164.txt.utf-8',
      'text/html': 'https://www.gutenberg.org/ebooks/164.html.images',
    },
  },
];

async function fetchTextWithFallback(url: string): Promise<string> {
  const attempts = [
    url,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  ];
  for (const candidate of attempts) {
    try {
      const res = await fetch(candidate);
      if (res.ok) {
        const txt = await res.text();
        if (txt && txt.length > 80) return txt;
      }
    } catch {
      // next mirror
    }
  }
  return '';
}

export const BooksView: React.FC<BooksViewProps> = ({ onOpenInProxy }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<GutendexBook[]>(FALLBACK_GUTENBERG_BOOKS);
  const [status, setStatus] = useState('Featured Gutenberg classics · syncing live index...');
  const [loading, setLoading] = useState(false);

  const [readerTitle, setReaderTitle] = useState<string | null>(null);
  const [readerText, setReaderText] = useState('');
  const [readerLoading, setReaderLoading] = useState(false);
  const [fontSize, setFontSize] = useState(17);

  const runSearch = async (override?: string) => {
    const term = (typeof override === 'string' ? override : query).trim() || 'classic';
    setLoading(true);
    setStatus(`Searching Gutendex for "${term}"...`);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(term)}`, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data?.results) ? (data.results.slice(0, 18) as GutendexBook[]) : [];
      if (items.length > 0) {
        setBooks(items);
        setStatus(`Found ${items.length} readable titles`);
      } else {
        setBooks(FALLBACK_GUTENBERG_BOOKS);
        setStatus(`No live matches for "${term}"; showing Gutenberg classics.`);
      }
    } catch {
      const lower = term.toLowerCase();
      const localMatches =
        lower === 'classic'
          ? FALLBACK_GUTENBERG_BOOKS
          : FALLBACK_GUTENBERG_BOOKS.filter(
              (b) =>
                b.title.toLowerCase().includes(lower) ||
                b.authors.some((a) => a.name.toLowerCase().includes(lower))
            );
      setBooks(localMatches.length > 0 ? localMatches : FALLBACK_GUTENBERG_BOOKS);
      setStatus('Showing offline Gutenberg classics library.');
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    runSearch('classic');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openReader = async (book: GutendexBook) => {
    const textUrl =
      book.formats?.['text/plain; charset=utf-8'] ||
      book.formats?.['text/plain; charset=us-ascii'] ||
      book.formats?.['text/plain'] ||
      '';
    const htmlUrl =
      book.formats?.['text/html'] || book.formats?.['text/html; charset=utf-8'] || '';

    setReaderTitle(book.title);
    setReaderLoading(true);
    setReaderText('');

    if (textUrl) {
      const text = await fetchTextWithFallback(textUrl);
      if (text) {
        setReaderText(text.slice(0, 180000));
        setReaderLoading(false);
        return;
      }
    }

    if (htmlUrl) {
      setReaderTitle(null);
      setReaderLoading(false);
      onOpenInProxy(htmlUrl);
      return;
    }

    setReaderText('No plain-text edition was provided for this title.');
    setReaderLoading(false);
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
              gn-math Library · Gutendex Reader
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-50 mt-1">
              Books &amp; Manga
            </h1>
          </div>
          <span className="font-mono text-xs text-slate-400">{status}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {PRESET_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setQuery(topic);
                  runSearch(topic);
                }}
                className="h-8 px-3 rounded-lg bg-[#101521] hover:bg-[#192235] border border-white/[0.07] text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
            className="flex items-center gap-2 w-full lg:w-auto"
          >
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books or authors..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#0d121c] border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-9 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {loading && books.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            <span className="text-xs font-mono">Fetching Gutendex books...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {books.map((book) => {
              const cover = book.formats?.['image/jpeg'];
              const authors = (book.authors || []).map((a) => a.name).join(', ') || 'Unknown Author';
              const subjects = (book.subjects || []).slice(0, 2).join(' · ');
              const gutenbergUrl = `https://www.gutenberg.org/ebooks/${book.id}`;

              return (
                <div
                  key={book.id}
                  className="rounded-xl bg-[#0e131e] border border-white/[0.07] p-3.5 flex gap-3.5 hover:border-indigo-500/40 transition-colors"
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={book.title}
                      loading="lazy"
                      className="w-16 h-24 object-cover rounded-md bg-[#080b12] shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-24 rounded-md bg-[#121826] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-slate-500" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug">
                        {book.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-1 truncate">
                        {authors} · {(book.download_count || 0).toLocaleString()} reads
                      </div>
                      {subjects && (
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{subjects}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => openReader(book)}
                        className="h-7 px-3 rounded-md bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer"
                      >
                        Read in App
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenInProxy(gutenbergUrl)}
                        className="h-7 px-2.5 rounded-md bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-300 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Globe className="w-3 h-3 text-indigo-400" />
                        <span>Proxy</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Book Reader Modal */}
      <AnimatePresence>
        {readerTitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#07090e] flex flex-col"
          >
            <div className="h-13 px-4 bg-[#0c1018] border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-[11px] uppercase px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Reader
                </span>
                <span className="text-sm font-bold text-slate-100 truncate">{readerTitle}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(13, s - 1))}
                  className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-mono font-semibold text-slate-200 cursor-pointer"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.min(26, s + 1))}
                  className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-mono font-semibold text-slate-200 cursor-pointer"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setReaderTitle(null)}
                  className="h-8 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-8">
              {readerLoading ? (
                <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                  <span className="text-xs font-mono">Loading book text...</span>
                </div>
              ) : (
                <pre
                  style={{ fontSize: `${fontSize}px` }}
                  className="max-w-[740px] mx-auto whitespace-pre-wrap font-sans leading-[1.82] text-slate-200"
                >
                  {readerText}
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

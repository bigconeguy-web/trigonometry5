import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Star, RefreshCw, Play } from 'lucide-react';
import {
  filterAndSortModules,
  type StudyFilterProvider,
  type StudySortOrder,
  type UnifiedStudyModule,
} from '../../utils/valbrowseConfig';

interface StudyHubViewProps {
  modules: UnifiedStudyModule[];
  loading: boolean;
  favorites: string[];
  popularityMap: Record<number, number>;
  onToggleFavorite: (moduleId: string) => void;
  onLaunchModule: (modItem: UnifiedStudyModule) => void;
  onRefresh: () => void;
}

const PROVIDER_TABS: Array<{ id: StudyFilterProvider; label: string }> = [
  { id: 'all', label: 'All Games' },
  { id: 'gn', label: 'gn-math' },
  { id: 'ugs', label: 'UGS' },
  { id: 'ckv', label: 'CKV' },
  { id: 'builtin', label: 'Built-In' },
  { id: 'featured', label: 'Featured' },
  { id: 'favorites', label: 'Favorites' },
];

function getInitials(title: string): string {
  const words = String(title || '').split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return String(title || 'GM').slice(0, 2).toUpperCase();
}

export const StudyHubView: React.FC<StudyHubViewProps> = ({
  modules,
  loading,
  favorites,
  popularityMap,
  onToggleFavorite,
  onLaunchModule,
  onRefresh,
}) => {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState<StudyFilterProvider>('all');
  const [sort, setSort] = useState<StudySortOrder>('featured');
  const [visibleCount, setVisibleCount] = useState(72);

  const favSet = useMemo(() => new Set(favorites), [favorites]);

  const filtered = useMemo(
    () =>
      filterAndSortModules(modules, {
        query,
        provider,
        sort,
        favorites,
        popularityMap,
      }),
    [modules, query, provider, sort, favorites, popularityMap]
  );

  const displayed = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="h-full overflow-y-auto px-5 py-5 lg:px-7"
    >
      <div className="max-w-[1440px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.07] pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-indigo-400">
              Combined Library · gn-math + UGS + CKV + Arcade
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-50 mt-1">
              All Games
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-slate-400">
              {loading && modules.length === 0 ? 'Syncing libraries...' : `${filtered.length} titles`}
            </span>
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="h-8 px-3 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {PROVIDER_TABS.map((tab) => {
              const active = provider === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setProvider(tab.id);
                    setVisibleCount(72);
                  }}
                  className={`h-8 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-indigo-500 text-white'
                      : 'bg-[#101521] text-slate-400 hover:text-slate-100 border border-white/[0.07]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(72);
                }}
                placeholder="Search unified games catalog..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#0d121c] border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as StudySortOrder)}
              aria-label="Sort games"
              className="h-9 px-3 rounded-lg bg-[#0d121c] border border-white/[0.08] text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="featured">Featured First</option>
              <option value="popular">Most Popular</option>
              <option value="az">Title A–Z</option>
              <option value="za">Title Z–A</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading && modules.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-[#0e131e] border border-white/[0.06] overflow-hidden animate-pulse"
              >
                <div className="aspect-[16/10] bg-white/[0.04]" />
                <div className="p-3 space-y-2">
                  <div className="h-3.5 bg-white/[0.06] rounded w-3/4" />
                  <div className="h-2.5 bg-white/[0.04] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="rounded-xl bg-[#0d121c] border border-white/[0.07] p-10 text-center space-y-3">
            <p className="text-sm text-slate-300">
              {provider === 'favorites'
                ? 'No favorited games yet. Click the star icon on any game card to pin it here.'
                : 'No titles matched your current search or filter.'}
            </p>
            {(query || provider !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setProvider('all');
                }}
                className="h-8 px-3.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3.5">
              {displayed.map((modItem) => {
                const isFav = favSet.has(modItem.id) || favSet.has(modItem.name);
                return (
                  <div
                    key={modItem.id}
                    onClick={() => onLaunchModule(modItem)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onLaunchModule(modItem);
                      }
                    }}
                    className="group relative rounded-xl bg-[#0e131e] hover:bg-[#141b2b] border border-white/[0.07] hover:border-indigo-500/45 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[16/10] bg-[#080b12] overflow-hidden">
                      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#121828] to-[#0a0e17] text-slate-400">
                        <span className="text-lg font-extrabold tracking-tight text-slate-200">
                          {getInitials(modItem.name)}
                        </span>
                      </div>

                      {modItem.cover ? (
                        <img
                          src={modItem.cover}
                          alt={modItem.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="relative z-10 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                        />
                      ) : null}

                      <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 rounded-lg bg-indigo-500 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(modItem.id);
                        }}
                        aria-label={isFav ? `Unfavorite ${modItem.name}` : `Favorite ${modItem.name}`}
                        className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-md flex items-center justify-center border transition-colors cursor-pointer ${
                          isFav
                            ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                            : 'bg-black/55 border-white/10 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-white'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between gap-1 bg-[#0e131e]">
                      <h3 className="text-[13px] font-semibold text-slate-100 truncate">
                        {modItem.name}
                      </h3>
                      <div className="text-[11px] font-mono text-slate-500 truncate">
                        {modItem.provider === 'gn'
                          ? 'gn-math'
                          : modItem.provider === 'ugs'
                            ? 'UGS'
                            : modItem.provider === 'ckv'
                              ? 'CKV'
                              : modItem.category || 'Arcade'}
                        {modItem.author ? ` · ${modItem.author}` : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {visibleCount < filtered.length && (
              <div className="flex justify-center pt-2 pb-6">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + 72)}
                  className="h-9 px-5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Load More ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

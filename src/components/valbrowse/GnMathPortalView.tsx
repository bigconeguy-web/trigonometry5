import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Star, TrendingUp, Code2, Globe, RotateCw, Loader2, ExternalLink, Play } from 'lucide-react';
import {
  filterAndSortModules,
  type UnifiedStudyModule,
} from '../../utils/valbrowseConfig';
import {
  fetchUpstreamGnMathHtml,
  type PopularityPeriod,
} from '../../utils/gnMathService';

interface GnMathPortalViewProps {
  gnZones: UnifiedStudyModule[];
  loading: boolean;
  favorites: string[];
  popularityByPeriod: Record<PopularityPeriod, Record<number, number>>;
  onLoadPeriod: (period: PopularityPeriod) => void;
  onToggleFavorite: (id: string) => void;
  onLaunchModule: (modItem: UnifiedStudyModule) => void;
  onOpenInProxy: (url: string) => void;
}

export const GnMathPortalView: React.FC<GnMathPortalViewProps> = ({
  gnZones,
  loading,
  favorites,
  popularityByPeriod,
  onLoadPeriod,
  onToggleFavorite,
  onLaunchModule,
  onOpenInProxy,
}) => {
  const [mode, setMode] = useState<'zones' | 'script'>('zones');
  const [period, setPeriod] = useState<PopularityPeriod>('week');
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [scriptHtml, setScriptHtml] = useState<string | null>(null);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [scriptNonce, setScriptNonce] = useState(0);

  const favSet = useMemo(() => new Set(favorites), [favorites]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const z of gnZones) {
      if (Array.isArray(z.special)) {
        for (const t of z.special) tags.add(t);
      }
    }
    return Array.from(tags).sort();
  }, [gnZones]);

  const currentPopularity = popularityByPeriod[period] || {};

  const filteredZones = useMemo(() => {
    const base =
      selectedTag === 'all'
        ? gnZones
        : gnZones.filter((z) => Array.isArray(z.special) && z.special.includes(selectedTag));
    return filterAndSortModules(base, {
      query,
      provider: 'gn',
      sort: 'popular',
      favorites,
      popularityMap: currentPopularity,
    });
  }, [gnZones, selectedTag, query, favorites, currentPopularity]);

  useEffect(() => {
    onLoadPeriod(period);
  }, [period, onLoadPeriod]);

  useEffect(() => {
    if (mode !== 'script') return;
    if (scriptHtml && scriptNonce === 0) return;

    let cancelled = false;
    setScriptLoading(true);
    setScriptError(null);
    fetchUpstreamGnMathHtml()
      .then((html) => {
        if (cancelled) return;
        if (html) {
          setScriptHtml(html);
        } else {
          setScriptError('Unable to fetch upstream gn-math script from jsDelivr mirrors.');
        }
        setScriptLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setScriptError('Unable to fetch upstream gn-math script right now.');
        setScriptLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [mode, scriptNonce, scriptHtml]);

  const openScriptInBlob = () => {
    if (!scriptHtml) return;
    const url = URL.createObjectURL(new Blob([scriptHtml], { type: 'text/html;charset=utf-8' }));
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex flex-col overflow-hidden"
    >
      {/* Header Bar */}
      <div className="px-5 py-4 lg:px-7 border-b border-white/[0.07] bg-[#090d16]/70 shrink-0">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-indigo-400">
              Main Provider · freebuisness/assets &amp; gn-math.github.io
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-50 mt-0.5">
              gn-math Script &amp; Live Zones
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex p-1 rounded-lg bg-[#0d121c] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setMode('zones')}
                className={`h-7 px-3 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  mode === 'zones' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Zones ({gnZones.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('script')}
                className={`h-7 px-3 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  mode === 'script' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Authentic gn-math Script</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onOpenInProxy('https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html')}
              className="h-9 px-3 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Open in ValBrowse</span>
            </button>
          </div>
        </div>
      </div>

      {mode === 'zones' ? (
        <div className="flex-1 overflow-y-auto px-5 py-5 lg:px-7">
          <div className="max-w-[1440px] mx-auto space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['day', 'week', 'month', 'year'] as PopularityPeriod[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`h-8 px-3 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-colors ${
                      period === p
                        ? 'bg-indigo-500 text-white'
                        : 'bg-[#101521] text-slate-400 hover:text-white border border-white/[0.07]'
                    }`}
                  >
                    Top {p}
                  </button>
                ))}

                {availableTags.length > 0 && (
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    aria-label="Filter gn-math tags"
                    className="h-8 px-2.5 rounded-lg bg-[#101521] border border-white/[0.08] text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Tags</option>
                    {availableTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search gn-math zones.json..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#0d121c] border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {loading && gnZones.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                <span className="text-xs font-mono">Loading gn-math zones.json from jsDelivr...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3.5">
                {filteredZones.slice(0, 120).map((zone) => {
                  const isFav = favSet.has(zone.id) || favSet.has(zone.name);
                  const hits = typeof zone.numericId === 'number' ? currentPopularity[zone.numericId] : undefined;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => onLaunchModule(zone)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onLaunchModule(zone);
                        }
                      }}
                      className="group relative rounded-xl bg-[#0e131e] hover:bg-[#141b2b] border border-white/[0.07] hover:border-indigo-500/45 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-[16/10] bg-[#080b12] overflow-hidden">
                        {zone.cover && (
                          <img
                            src={zone.cover}
                            alt={zone.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(zone.id);
                          }}
                          className={`absolute top-2 right-2 w-7 h-7 rounded-md flex items-center justify-center border cursor-pointer ${
                            isFav
                              ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                              : 'bg-black/55 border-white/10 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-white'
                          }`}
                          aria-label={`Favorite ${zone.name}`}
                        >
                          <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="p-2.5 bg-[#0e131e]">
                        <h3 className="text-[13px] font-semibold text-slate-100 truncate">{zone.name}</h3>
                        <div className="text-[11px] font-mono tabular-nums text-slate-500 truncate mt-0.5">
                          #{zone.numericId}
                          {typeof hits === 'number' && hits > 0 ? ` · ${hits.toLocaleString()} plays` : ''}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 bg-[#07090e]">
          <div className="px-5 py-2.5 bg-[#0c1018] border-b border-white/[0.07] flex items-center justify-between gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-400 truncate">
              Source: cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setScriptNonce((n) => n + 1)}
                className="h-7 px-2.5 rounded-md bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
                <span>Reload</span>
              </button>
              {scriptHtml && (
                <button
                  type="button"
                  onClick={openScriptInBlob}
                  className="h-7 px-2.5 rounded-md bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Blob Tab</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative flex-1 min-h-0">
            {scriptLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#07090e]">
                <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                <p className="text-xs font-mono text-slate-400">
                  Loading authentic gn-math portal script...
                </p>
              </div>
            )}

            {scriptError ? (
              <div className="p-8 text-center space-y-3">
                <p className="text-sm text-rose-300">{scriptError}</p>
                <button
                  type="button"
                  onClick={() => setScriptNonce((n) => n + 1)}
                  className="h-8 px-4 rounded-lg bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
                >
                  Retry Load
                </button>
              </div>
            ) : scriptHtml ? (
              <iframe
                key={`gn-upstream-${scriptNonce}`}
                title="Authentic gn-math Script Portal"
                srcDoc={scriptHtml}
                allow="autoplay; gamepad; fullscreen"
                referrerPolicy="no-referrer"
                className="w-full h-full border-0 block bg-black"
              />
            ) : null}
          </div>
        </div>
      )}
    </motion.div>
  );
};

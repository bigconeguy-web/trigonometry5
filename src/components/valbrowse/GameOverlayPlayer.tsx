import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, RotateCw, X, Globe, Loader2 } from 'lucide-react';
import type { UnifiedPortalGame } from '../../utils/valbrowseConfig';
import { buildDirectEmbedUrl } from '../../utils/gameRuntime';
import { fetchGameDocumentHtml } from '../../utils/gnMathService';

interface GameOverlayPlayerProps {
  game: UnifiedPortalGame | null;
  onClose: () => void;
  onOpenInProxy?: (url: string) => void;
}

export const GameOverlayPlayer: React.FC<GameOverlayPlayerProps> = ({
  game,
  onClose,
  onOpenInProxy,
}) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [srcDocHtml, setSrcDocHtml] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);

  useEffect(() => {
    if (!game) {
      setSrcDocHtml(null);
      setFallbackUrl(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setSrcDocHtml(null);
    setFallbackUrl(null);

    fetchGameDocumentHtml(game.url, game.baseUrl)
      .then((html) => {
        if (cancelled) return;
        if (html) {
          setSrcDocHtml(html);
        } else {
          setFallbackUrl(buildDirectEmbedUrl(game.url));
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setFallbackUrl(buildDirectEmbedUrl(game.url));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [game, reloadNonce]);

  const handleFullscreen = () => {
    const el = frameRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#07090e] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${game.name}`}
        >
          <div className="h-13 px-4 bg-[#0c1018] border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shrink-0">
                {game.provider === 'gn'
                  ? 'gn-math'
                  : game.provider === 'ugs'
                    ? 'UGS'
                    : game.provider === 'ckv'
                      ? 'CKV'
                      : 'Arcade'}
              </span>
              <h2 className="text-sm font-bold text-slate-100 truncate">{game.name}</h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenInProxy && (
                <button
                  type="button"
                  onClick={() => {
                    const target = game.url;
                    onClose();
                    onOpenInProxy(target);
                  }}
                  className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#1a2234] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Proxy Tab</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setReloadNonce((n) => n + 1)}
                className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#1a2234] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reload</span>
              </button>
              <button
                type="button"
                onClick={handleFullscreen}
                className="h-8 px-2.5 rounded-lg bg-[#121826] hover:bg-[#1a2234] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-8 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 bg-black">
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#07090e]">
                <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
                <p className="text-xs font-medium text-slate-400">
                  Loading {game.name} into local memory...
                </p>
              </div>
            )}

            {srcDocHtml ? (
              <iframe
                ref={frameRef}
                key={`doc-${game.id}-${reloadNonce}`}
                title={game.name}
                srcDoc={srcDocHtml}
                allow="autoplay; gamepad; fullscreen"
                referrerPolicy="no-referrer"
                className="w-full h-full border-0 block bg-black"
              />
            ) : fallbackUrl ? (
              <iframe
                ref={frameRef}
                key={`url-${game.id}-${reloadNonce}`}
                title={game.name}
                src={fallbackUrl}
                allow="autoplay; gamepad; fullscreen"
                referrerPolicy="no-referrer"
                className="w-full h-full border-0 block bg-black"
              />
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

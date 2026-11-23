import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ExternalLink, ShieldAlert, X } from 'lucide-react';
import { GAME_CATALOG } from './data/gamesCatalog';
import { buildValBrowseBlobHtml } from './utils/valbrowseBlobHtml';
import {
  buildStandaloneBlobWrapperHtml,
  buildValBrowseOriginUrl,
  STANDALONE_WINDOW_FEATURES,
  STANDALONE_WINDOW_NAME,
  triggerPanicRedirect,
} from './utils/valbrowseConfig';
import { EulerPathPortal } from './components/EulerPathPortal';

export default function App() {
  const isStandaloneVbFrame = useMemo(() => {
    try {
      return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('vb') === '1';
    } catch {
      return false;
    }
  }, []);

  const [valbrowseOpen, setValbrowseOpen] = useState<boolean>(isStandaloneVbFrame);
  const [popupBlockedToast, setPopupBlockedToast] = useState(false);

  const valbrowseDocHtml = useMemo(() => {
    if (!valbrowseOpen) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return buildValBrowseBlobHtml(origin, GAME_CATALOG);
  }, [valbrowseOpen]);

  const handleOpenStandaloneBlob = useCallback(() => {
    setPopupBlockedToast(false);
    const targetUrl = buildValBrowseOriginUrl(window.location.origin);
    const html = buildStandaloneBlobWrapperHtml(targetUrl);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, STANDALONE_WINDOW_NAME, STANDALONE_WINDOW_FEATURES);
    if (!win) {
      setPopupBlockedToast(true);
    } else {
      setValbrowseOpen(false);
    }
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  }, []);

  const handleReturnToMathSite = useCallback(() => {
    setValbrowseOpen(false);
    try {
      const current = new URL(window.location.href);
      if (current.searchParams.has('vb')) {
        current.searchParams.delete('vb');
        window.history.replaceState({}, '', `${current.pathname}${current.search}${current.hash}`);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!popupBlockedToast) return;
    const timer = window.setTimeout(() => setPopupBlockedToast(false), 7000);
    return () => window.clearTimeout(timer);
  }, [popupBlockedToast]);

  // Global Ctrl+E secret toggle, Escape panic close/redirect, & postMessage panic bridge
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setValbrowseOpen(true);
        return;
      }
      if (valbrowseOpen && e.key === 'Escape') {
        e.preventDefault();
        triggerPanicRedirect(document, window);
      }
    };

    const onMessage = (ev: MessageEvent) => {
      if (ev?.data?.type === 'valbrowse-panic') {
        triggerPanicRedirect(document, window);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('message', onMessage);
    };
  }, [valbrowseOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <EulerPathPortal />

      {/* Secret Workspace (triggered via Ctrl+E or ?vb=1 inside standalone blob popup) */}
      {valbrowseOpen && valbrowseDocHtml && (
        <div
          className="fixed inset-0 z-50 bg-[#080406] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="ValBrowse Workspace"
        >
          {!isStandaloneVbFrame && (
            <div className="h-10 px-2.5 sm:px-3 bg-[#080406] border-b border-white/[0.08] flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#ff5c7c] shrink-0" />
                <span className="text-xs font-bold text-[#fdf2f4] truncate">
                  valbrowse
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  data-testid="open-standalone-blob-btn"
                  onClick={handleOpenStandaloneBlob}
                  className="h-7 px-2 sm:px-2.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[11px] font-semibold text-zinc-200 inline-flex items-center gap-1 cursor-pointer transition whitespace-nowrap"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="sm:hidden">:blob Window</span>
                  <span className="hidden sm:inline">Open Standalone :blob</span>
                </button>
                <button
                  type="button"
                  data-testid="valbrowse-panic-btn"
                  onClick={() => triggerPanicRedirect(document, window)}
                  className="h-7 px-2 sm:px-2.5 rounded-md bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[11px] font-semibold text-rose-200 inline-flex items-center gap-1 cursor-pointer transition whitespace-nowrap"
                  title="Panic (Esc) — Close or Redirect to Google Classroom"
                >
                  <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
                  <span className="sm:hidden">Panic</span>
                  <span className="hidden sm:inline">Panic (Esc)</span>
                </button>
                <button
                  type="button"
                  data-testid="close-blob-overlay"
                  onClick={handleReturnToMathSite}
                  className="h-7 px-2 sm:px-2.5 rounded-md bg-[#ff5c7c] hover:bg-[#ff456b] text-[11px] font-bold text-[#19070d] inline-flex items-center gap-1 cursor-pointer transition whitespace-nowrap"
                >
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span className="sm:hidden">Back</span>
                  <span className="hidden sm:inline">Return to Math</span>
                </button>
              </div>
            </div>
          )}

          <iframe
            data-testid="valbrowse-blob-iframe"
            srcDoc={valbrowseDocHtml}
            title="ValBrowse Workspace"
            allow="autoplay; gamepad; fullscreen"
            className="w-full flex-1 border-0 bg-[#0b0608]"
          />
        </div>
      )}

      {/* Popup-Blocked Floating Toast */}
      {popupBlockedToast && (
        <div
          role="status"
          data-testid="popup-blocked-toast"
          className="fixed bottom-4 right-4 z-[70] max-w-sm rounded-xl bg-zinc-900 border border-amber-500/40 shadow-2xl px-4 py-3 text-xs text-zinc-100 flex items-start gap-2.5"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            Popup blocked — click the popup icon in Chrome&apos;s address bar to allow popups, then click{' '}
            <strong>Open Standalone :blob</strong> again.
          </div>
          <button
            type="button"
            onClick={() => setPopupBlockedToast(false)}
            className="text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Dismiss popup notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

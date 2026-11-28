import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { EULER_STUDY_CATALOG } from './data/studyCatalog';
import { buildValBrowseBlobHtml } from './utils/valbrowseBlobHtml';
import {
  buildStandaloneBlobWrapperHtml,
  buildValBrowseOriginUrl,
  isInsideStandaloneBlobFrame,
  isStandaloneControlKeyTrigger,
  STANDALONE_WINDOW_FEATURES,
  STANDALONE_WINDOW_NAME,
  triggerPanicRedirect,
} from './utils/valbrowseConfig';
import { EulerPathPortal } from './components/EulerPathPortal';

export default function App() {
  const isInsideBlob = useMemo(() => {
    try {
      return typeof window !== 'undefined' && isInsideStandaloneBlobFrame(window.location.search, window.name);
    } catch {
      return false;
    }
  }, []);

  const [popupBlockedToast, setPopupBlockedToast] = useState(false);

  const valbrowseDocHtml = useMemo(() => {
    if (!isInsideBlob) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return buildValBrowseBlobHtml(origin, EULER_STUDY_CATALOG);
  }, [isInsideBlob]);

  const handleOpenStandaloneBlob = useCallback(() => {
    setPopupBlockedToast(false);
    const targetUrl = buildValBrowseOriginUrl(window.location.href);
    const html = buildStandaloneBlobWrapperHtml(targetUrl);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, STANDALONE_WINDOW_NAME, STANDALONE_WINDOW_FEATURES);
    if (!win) {
      setPopupBlockedToast(true);
    }
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  }, []);

  useEffect(() => {
    if (!popupBlockedToast) return;
    const timer = window.setTimeout(() => setPopupBlockedToast(false), 7000);
    return () => window.clearTimeout(timer);
  }, [popupBlockedToast]);

  // Press Control on the main math site to open the standalone :blob popup; Escape inside blob triggers panic redirect
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isInsideBlob && isStandaloneControlKeyTrigger(e)) {
        handleOpenStandaloneBlob();
        return;
      }
      if (isInsideBlob && e.key === 'Escape') {
        e.preventDefault();
        triggerPanicRedirect(document, window);
      }
    };

    const onMessage = (ev: MessageEvent) => {
      if (isInsideBlob && ev?.data?.type === 'valbrowse-panic') {
        triggerPanicRedirect(document, window);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('message', onMessage);
    };
  }, [isInsideBlob, handleOpenStandaloneBlob]);

  if (isInsideBlob && valbrowseDocHtml) {
    return (
      <div
        className="fixed inset-0 z-50 bg-[#000000] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Vux Workspace"
      >
        <iframe
          data-testid="valbrowse-blob-iframe"
          srcDoc={valbrowseDocHtml}
          title="Vux Workspace"
          allow="autoplay; gamepad; fullscreen; clipboard-read; clipboard-write"
          className="w-full h-full border-0 bg-[#000000]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <EulerPathPortal />

      {/* Popup-Blocked Floating Toast (no inline non-blob fallback) */}
      {popupBlockedToast && (
        <div
          role="status"
          data-testid="popup-blocked-toast"
          className="fixed bottom-4 right-4 z-[70] max-w-sm rounded-xl bg-zinc-900 border border-amber-500/40 shadow-2xl px-4 py-3 text-xs text-zinc-100 flex items-start gap-2.5"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            Popup blocked — allow popups for this site in your browser&apos;s address bar, then press{' '}
            <strong>Control</strong> again.
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

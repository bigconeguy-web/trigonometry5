import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Upload, Shield, ExternalLink } from 'lucide-react';
import { DEFAULT_WISP_URL, VALBROWSE_FAVS_KEY, VALBROWSE_WISP_STORAGE_KEY } from '../../utils/valbrowseConfig';

interface CloakSettingsModalProps {
  open: boolean;
  onClose: () => void;
  favorites: string[];
  onImportFavorites: (favs: string[]) => void;
}

const CLOAK_PRESETS = [
  {
    id: 'classroom',
    label: 'Google Classroom',
    title: 'Home - Classroom',
    icon: 'https://ssl.gstatic.com/classroom/ic_product_classroom_144.png',
  },
  {
    id: 'docs',
    label: 'Google Docs',
    title: 'Untitled document - Google Docs',
    icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
  },
  {
    id: 'drive',
    label: 'Google Drive',
    title: 'My Drive - Google Drive',
    icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
  },
  {
    id: 'reset',
    label: 'ValBrowse Default',
    title: 'ValBrowse',
    icon: '',
  },
];

export const CloakSettingsModal: React.FC<CloakSettingsModalProps> = ({
  open,
  onClose,
  favorites,
  onImportFavorites,
}) => {
  const [backupMessage, setBackupMessage] = useState('');

  const applyCloak = (title: string, iconHref: string) => {
    document.title = title;
    let link = document.querySelector('link[rel~="icon"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    if (iconHref) {
      link.href = iconHref;
    } else {
      link.href =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%236366f1'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='800' font-size='34'%3EV%3C/text%3E%3C/svg%3E";
    }
    setBackupMessage(`Tab cloaked as "${title}"`);
  };

  const launchAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      setBackupMessage('Pop-up blocked — allow pop-ups to open an about:blank stealth window.');
      return;
    }
    try {
      const doc = win.document;
      doc.open();
      doc.write(
        `<!DOCTYPE html><html><head><title>Home - Classroom</title><style>html,body,iframe{margin:0;padding:0;width:100%;height:100%;border:0;overflow:hidden;background:#07090e;}</style></head><body><iframe src="${window.location.href}" allow="autoplay;fullscreen;gamepad;keyboard"></iframe></body></html>`
      );
      doc.close();
    } catch {
      setBackupMessage('Unable to populate about:blank window.');
    }
  };

  const handleExportBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      favorites,
      wispUrl: localStorage.getItem(VALBROWSE_WISP_STORAGE_KEY) || DEFAULT_WISP_URL,
      playlist: JSON.parse(localStorage.getItem('valbrowse_sc_playlist') || '[]'),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valbrowse-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMessage('Backup exported cleanly.');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'));
        if (Array.isArray(parsed.favorites)) {
          localStorage.setItem(VALBROWSE_FAVS_KEY, JSON.stringify(parsed.favorites));
          onImportFavorites(parsed.favorites);
        }
        if (typeof parsed.wispUrl === 'string' && parsed.wispUrl.trim()) {
          localStorage.setItem(VALBROWSE_WISP_STORAGE_KEY, parsed.wispUrl.trim());
        }
        if (Array.isArray(parsed.playlist)) {
          localStorage.setItem('valbrowse_sc_playlist', JSON.stringify(parsed.playlist));
        }
        setBackupMessage('Backup restored.');
      } catch {
        setBackupMessage('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-2xl bg-[#0e131e] border border-white/[0.1] shadow-2xl p-5 space-y-5 z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Cloak and Data Settings"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3.5">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-indigo-400" />
                <h2 className="text-base font-bold text-slate-50">Tab Cloak &amp; Backup</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Tab Cloak Presets
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CLOAK_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyCloak(p.title, p.icon)}
                    className="h-9 px-3 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 text-left truncate cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Stealth Launcher &amp; Panic Key
              </div>
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#090d16] border border-white/[0.07]">
                <div className="text-xs text-slate-300">
                  Press <kbd className="font-mono px-1.5 py-0.5 rounded bg-black/50 border border-white/15">Esc</kbd> anytime to exit to Google Classroom.
                </div>
                <button
                  type="button"
                  onClick={launchAboutBlank}
                  className="h-8 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>about:blank</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Data Backup ({favorites.length} Favorites)
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="h-9 px-3.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Export JSON</span>
                </button>
                <label className="h-9 px-3.5 rounded-lg bg-[#121826] hover:bg-[#192235] border border-white/[0.08] text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Import JSON</span>
                  <input type="file" accept=".json,application/json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>
              {backupMessage && <p className="text-xs font-mono text-indigo-300">{backupMessage}</p>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import {
  X,
  Settings as SettingsIcon,
  ShieldAlert,
  Volume2,
  VolumeX,
  Timer,
  Download,
  Upload,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { AcademicTheme, PortalSettings } from '../types/curriculum';

interface SettingsModalProps {
  onClose: () => void;
  settings: PortalSettings;
  onUpdateSettings: (newSettings: PortalSettings) => void;
  theme: AcademicTheme;
  onExportData: () => void;
  onImportData: (jsonStr: string) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  settings,
  onUpdateSettings,
  theme,
  onExportData,
  onImportData,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'stealth' | 'display' | 'pomodoro' | 'data'>('stealth');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const update = (partial: Partial<PortalSettings>) => {
    onUpdateSettings({ ...settings, ...partial });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportData(content);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
          theme.isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${theme.borderMuted}`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${theme.accentBadge}`}>
              <SettingsIcon className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Portal Configuration &amp; Stealth Settings</h2>
              <p className={`text-xs ${theme.textSecondary}`}>
                Adjust emergency hotkeys, lecture disguises, research timers, and curriculum backups
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition ${
              theme.isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className={`flex border-b text-xs font-semibold px-6 ${theme.borderMuted} ${
          theme.isDark ? 'bg-zinc-950/40' : 'bg-zinc-50/70'
        }`}>
          <button
            onClick={() => setActiveTab('stealth')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'stealth'
                ? theme.isDark ? 'border-indigo-400 text-white font-bold' : 'border-zinc-900 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Emergency Stealth</span>
          </button>
          <button
            onClick={() => setActiveTab('display')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'display'
                ? theme.isDark ? 'border-indigo-400 text-white font-bold' : 'border-zinc-900 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Display &amp; Audio</span>
          </button>
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'pomodoro'
                ? theme.isDark ? 'border-indigo-400 text-white font-bold' : 'border-zinc-900 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Pomodoro Cadence</span>
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'data'
                ? theme.isDark ? 'border-indigo-400 text-white font-bold' : 'border-zinc-900 text-zinc-950 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Archive &amp; Backup</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* TAB 1: STEALTH & EMERGENCY */}
          {activeTab === 'stealth' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-500 mb-1">
                      Emergency Instant Screen Flip
                    </h3>
                    <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
                      Hitting your panic hotkey instantly masks all games and practicums behind high-fidelity university lecture notes, complete with formulas, Cornell outlines, and syllabus exam checklists.
                    </p>
                  </div>
                </div>
              </div>

              {/* Panic Key Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Emergency Panic Hotkey
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'Escape', label: 'Esc Key' },
                    { key: '`', label: 'Tilde / ` Key' },
                    { key: 'F2', label: 'F2 Key' },
                    { key: 'b', label: 'Key "B"' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => update({ panicKey: item.key })}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition flex items-center justify-between ${
                        settings.panicKey === item.key
                          ? theme.isDark
                            ? 'bg-zinc-800 border-indigo-500 text-indigo-400 font-bold'
                            : 'bg-zinc-100 border-zinc-900 text-zinc-900 font-bold'
                          : theme.isDark
                          ? 'border-zinc-800 hover:bg-zinc-800/60'
                          : 'border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {settings.panicKey === item.key && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fake Lecture Subject */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Disguise Lecture Curriculum
                </label>
                <select
                  value={settings.panicTarget}
                  onChange={(e) => update({ panicTarget: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border text-xs font-medium outline-none ${
                    theme.isDark
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                >
                  <option value="biology">BIOL 201: Cell Biology &amp; Glycolysis (Dr. Thorne)</option>
                  <option value="calculus">MATH 2940: Multivariable Stokes' Theorem (Prof. Gauss)</option>
                  <option value="physics">PHYS 3318: Quantum Wave Equations &amp; Hamiltonians (Dr. Schrödinger)</option>
                  <option value="economics">ECON 1110: Macroeconomic Equilibrium &amp; Monetary Policy (Prof. Keynes)</option>
                </select>
              </div>

              {/* Auto Mute on Blur */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/60">
                <div>
                  <span className="font-semibold text-xs block">Auto-Mute on Background / Window Blur</span>
                  <span className={`text-[11px] ${theme.textSecondary}`}>
                    Automatically silences all simulation audio when switching windows or tabs
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoMuteOnBlur}
                  onChange={(e) => update({ autoMuteOnBlur: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DISPLAY & AUDIO */}
          {activeTab === 'display' && (
            <div className="space-y-5">
              {/* Audio Master Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/60">
                <div className="flex items-center gap-3">
                  {settings.audioFxEnabled ? (
                    <Volume2 className="w-4 h-4 text-indigo-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-zinc-400" />
                  )}
                  <div>
                    <span className="font-semibold text-xs block">Practicum Web Audio Synthesis</span>
                    <span className={`text-[11px] ${theme.textSecondary}`}>
                      Real-time sine wave tones, bounce impulses, and chord harmonies
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.audioFxEnabled}
                  onChange={(e) => update({ audioFxEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {/* Font Size Scaling */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Scholarly Text Typography Scale
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'standard', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => update({ fontSize: size })}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center capitalize transition flex items-center justify-center gap-1.5 ${
                        settings.fontSize === size
                          ? theme.isDark
                            ? 'bg-zinc-800 border-indigo-500 text-indigo-400'
                            : 'bg-zinc-100 border-zinc-900 text-zinc-900'
                          : theme.isDark
                          ? 'border-zinc-800 hover:bg-zinc-800/60'
                          : 'border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      <span>{size}</span>
                      {settings.fontSize === size && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Course Codes */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200/60">
                <div>
                  <span className="font-semibold text-xs block">Display Rigorous Course Codes</span>
                  <span className={`text-[11px] ${theme.textSecondary}`}>
                    Show badges like "MATH-2048", "PHYS-310" prominently on each syllabus card
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showCourseCodes}
                  onChange={(e) => update({ showCourseCodes: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: POMODORO */}
          {activeTab === 'pomodoro' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                <div className="flex items-start gap-3">
                  <Timer className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-500 mb-1">
                      Analytical Study Cadence (Pomodoro)
                    </h3>
                    <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
                      Research demonstrates that sustained cognitive retention peaks during 25-minute concentrated inquiry intervals followed by 5-minute reflective recesses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Research Interval (Minutes)
                  </label>
                  <select
                    value={settings.pomodoroWorkMinutes}
                    onChange={(e) => update({ pomodoroWorkMinutes: parseInt(e.target.value, 10) })}
                    className={`w-full p-2.5 rounded-lg border text-xs font-medium outline-none ${
                      theme.isDark
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <option value="15">15 Minutes (Sprint Drill)</option>
                    <option value="20">20 Minutes</option>
                    <option value="25">25 Minutes (Standard Pomodoro)</option>
                    <option value="30">30 Minutes</option>
                    <option value="50">50 Minutes (Colloquium Block)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Recess Interval (Minutes)
                  </label>
                  <select
                    value={settings.pomodoroBreakMinutes}
                    onChange={(e) => update({ pomodoroBreakMinutes: parseInt(e.target.value, 10) })}
                    className={`w-full p-2.5 rounded-lg border text-xs font-medium outline-none ${
                      theme.isDark
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  >
                    <option value="3">3 Minutes</option>
                    <option value="5">5 Minutes (Standard)</option>
                    <option value="10">10 Minutes (Extended Refresh)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DATA & BACKUP */}
          {activeTab === 'data' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider">Data Portability &amp; Backups</h4>
                <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
                  All your high honors scores, customized practicums, bookmarked syllabi, and research lab notes are stored locally in client localStorage. You can export a JSON archive to transfer to another device or restore at any time.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={onExportData}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                      theme.isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Scholastic Backup (.json)</span>
                  </button>

                  <label
                    className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      theme.isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Restore from Backup</span>
                    <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {copiedNotification && (
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Backup restored successfully! Refreshing view...</span>
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-rose-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-rose-500 block">Reset Study Records &amp; Scores</span>
                    <span className={`text-[11px] ${theme.textSecondary}`}>
                      Wipes all personal records, student notes, and bookmarked syllabi
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you certain you wish to wipe all local research records and bookmarks?')) {
                        onResetData();
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition"
                  >
                    Reset Portal Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-end ${theme.borderMuted} ${
          theme.isDark ? 'bg-zinc-950/40' : 'bg-zinc-50/70'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${theme.primaryBtn}`}
          >
            Apply &amp; Return to Portal
          </button>
        </div>
      </div>
    </div>
  );
};

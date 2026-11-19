import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ShieldAlert,
  EyeOff,
  Plus,
  Settings as SettingsIcon,
  Timer,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { AcademicTheme, ThemeId, PortalSettings } from '../types/curriculum';
import { ThemeSelector } from './ThemeSelector';

interface HeaderProps {
  onOpenImport: () => void;
  onOpenCloak: () => void;
  onOpenSettings: () => void;
  onTriggerStealth: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  bookmarkedCount: number;
  currentTheme: AcademicTheme;
  onSelectTheme: (id: ThemeId) => void;
  settings: PortalSettings;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenImport,
  onOpenCloak,
  onOpenSettings,
  onTriggerStealth,
  activeNav,
  setActiveNav,
  bookmarkedCount,
  currentTheme,
  onSelectTheme,
  settings,
}) => {
  // Global Pomodoro Timer state
  const [pomodoroSeconds, setPomodoroSeconds] = useState(settings.pomodoroWorkMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

  // Update timer if settings change when not running
  useEffect(() => {
    if (!isTimerRunning) {
      setPomodoroSeconds(
        timerMode === 'work' ? settings.pomodoroWorkMinutes * 60 : settings.pomodoroBreakMinutes * 60
      );
    }
  }, [settings.pomodoroWorkMinutes, settings.pomodoroBreakMinutes, timerMode, isTimerRunning]);

  // Pomodoro tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && pomodoroSeconds === 0) {
      setIsTimerRunning(false);
      // Mode switch
      if (timerMode === 'work') {
        setTimerMode('break');
        setPomodoroSeconds(settings.pomodoroBreakMinutes * 60);
      } else {
        setTimerMode('work');
        setPomodoroSeconds(settings.pomodoroWorkMinutes * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, pomodoroSeconds, timerMode, settings]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors ${currentTheme.headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveNav('catalog')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Scholastica Academic Portal Home"
          >
            <div className={`w-8 h-8 rounded text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs ${currentTheme.primaryBtn}`}>
              ∑
            </div>
            <div>
              <span className={`font-bold text-base tracking-tight block leading-tight ${currentTheme.textPrimary}`}>
                Scholastica
              </span>
              <span className={`text-[10px] font-medium tracking-wide uppercase block ${currentTheme.textMuted}`}>
                Academic Curriculum Portal
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-6 text-sm font-medium ${
          currentTheme.isDark ? 'text-zinc-300' : 'text-zinc-600'
        }`}>
          <button
            onClick={() => setActiveNav('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentTheme.isDark ? 'hover:text-white' : 'hover:text-zinc-900'
            } ${
              activeNav === 'catalog'
                ? currentTheme.isDark
                  ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-400'
                  : 'text-zinc-950 font-semibold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Curriculum Catalog
          </button>
          <button
            onClick={() => setActiveNav('releases')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTheme.isDark ? 'hover:text-white' : 'hover:text-zinc-900'
            } ${
              activeNav === 'releases'
                ? currentTheme.isDark
                  ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-400'
                  : 'text-zinc-950 font-semibold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            New Releases
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              v2.4
            </span>
          </button>
          <button
            onClick={() => setActiveNav('bookmarked')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTheme.isDark ? 'hover:text-white' : 'hover:text-zinc-900'
            } ${
              activeNav === 'bookmarked'
                ? currentTheme.isDark
                  ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-400'
                  : 'text-zinc-950 font-semibold underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            Bookmarked Syllabi
            {bookmarkedCount > 0 && (
              <span className={`text-xs font-mono ${currentTheme.isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                ({bookmarkedCount})
              </span>
            )}
          </button>
          <button
            onClick={onOpenImport}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              currentTheme.isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Import Practicum
          </button>
          <button
            onClick={onOpenCloak}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTheme.isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            Tab Disguise
          </button>
        </nav>

        {/* Zone 3: Actions + Pomodoro HUD + Settings */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Integrated Pomodoro Study HUD */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-mono transition ${
              currentTheme.isDark
                ? 'bg-zinc-900/90 border-zinc-800 text-zinc-200'
                : 'bg-zinc-100/90 border-zinc-200 text-zinc-800'
            }`}
            title={`Analytical Cadence Timer (${timerMode === 'work' ? 'Research Interval' : 'Recess'})`}
          >
            <Timer className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-indigo-500 animate-pulse' : 'text-zinc-400'}`} />
            <span className="font-bold tabular-nums">{formatTime(pomodoroSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded transition"
              aria-label={isTimerRunning ? 'Pause timer' : 'Start timer'}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setPomodoroSeconds(settings.pomodoroWorkMinutes * 60);
                setTimerMode('work');
              }}
              className="p-1 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-zinc-600"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Theme Selector */}
          <ThemeSelector
            currentTheme={currentTheme}
            onSelectTheme={onSelectTheme}
          />

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className={`p-1.5 border rounded-md transition-colors ${
              currentTheme.isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
            }`}
            title="Portal Settings & Stealth Configurations"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          {/* Emergency Panic Mode Button */}
          <button
            onClick={onTriggerStealth}
            className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-zinc-400 ${
              currentTheme.isDark
                ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                : 'bg-zinc-100/80 border-zinc-200 text-zinc-800 hover:bg-zinc-200'
            }`}
            title={`Press ${settings.panicKey} at any time to instantly mask behind university lecture notes`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="hidden md:inline">Emergency Mode</span>
            <kbd className={`hidden sm:inline-block ml-0.5 px-1 py-0.2 text-[10px] border rounded font-mono ${
              currentTheme.isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-white border-zinc-300 text-zinc-500'
            }`}>
              {settings.panicKey}
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Sub-bar */}
      <div className={`lg:hidden px-4 py-2 border-t flex items-center gap-4 text-xs overflow-x-auto ${currentTheme.borderMuted} ${
        currentTheme.isDark ? 'text-zinc-300' : 'text-zinc-600'
      }`}>
        <button
          onClick={() => setActiveNav('catalog')}
          className={`whitespace-nowrap shrink-0 transition-colors ${
            activeNav === 'catalog'
              ? currentTheme.isDark
                ? 'text-white font-semibold underline underline-offset-4 decoration-2 decoration-indigo-400'
                : 'text-zinc-950 font-semibold underline underline-offset-4 decoration-2'
              : ''
          }`}
        >
          Curriculum Catalog
        </button>
        <button
          onClick={() => setActiveNav('releases')}
          className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
            activeNav === 'releases'
              ? currentTheme.isDark
                ? 'text-white font-semibold underline underline-offset-4 decoration-2 decoration-indigo-400'
                : 'text-zinc-950 font-semibold underline underline-offset-4 decoration-2'
              : ''
          }`}
        >
          <span>New Releases</span>
          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            v2.4
          </span>
        </button>
        <button
          onClick={() => setActiveNav('bookmarked')}
          className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
            activeNav === 'bookmarked'
              ? currentTheme.isDark
                ? 'text-white font-semibold underline underline-offset-4 decoration-2 decoration-indigo-400'
                : 'text-zinc-950 font-semibold underline underline-offset-4 decoration-2'
              : ''
          }`}
        >
          <span>Bookmarked</span>
          {bookmarkedCount > 0 && <span className="font-mono">({bookmarkedCount})</span>}
        </button>
        <button
          onClick={onOpenImport}
          className="whitespace-nowrap shrink-0 transition-colors hover:text-zinc-900 dark:hover:text-white"
        >
          + Import
        </button>
        <button
          onClick={onOpenCloak}
          className="whitespace-nowrap shrink-0 transition-colors hover:text-zinc-900 dark:hover:text-white"
        >
          Disguise
        </button>
      </div>
    </header>
  );
};

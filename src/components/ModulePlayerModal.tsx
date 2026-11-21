import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  BookOpen,
  Timer,
  FileText,
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import { AcademicModule } from '../types/curriculum';
import { resolveIframeSrc } from '../utils/curriculumLogic';

interface ModulePlayerModalProps {
  module: AcademicModule;
  onClose: () => void;
  onSavePersonalRecord?: (moduleId: string, score: number) => void;
}

export const ModulePlayerModal: React.FC<ModulePlayerModalProps> = ({
  module,
  onClose,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'timer' | 'directives'>('directives');
  const [iframeKey, setIframeKey] = useState(0);

  // Popup blocking control: if module sets blockPopups=true, popups are strictly disabled in sandbox
  const [popupsBlocked, setPopupsBlocked] = useState<boolean>(() => {
    return module.blockPopups !== undefined ? module.blockPopups : false;
  });

  const sandboxPolicy = React.useMemo(() => {
    if (module.sandboxFlags && !popupsBlocked) return module.sandboxFlags;
    if (popupsBlocked) {
      // Omitting 'allow-popups' and 'allow-popups-to-escape-sandbox' blocks all window.open & popups natively
      return 'allow-scripts allow-same-origin allow-forms allow-pointer-lock';
    }
    return 'allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-storage-access-by-user-activation allow-pointer-lock';
  }, [popupsBlocked, module.sandboxFlags]);

  const resolvedSrc = React.useMemo(() => resolveIframeSrc(module.iframeSrc), [module.iframeSrc]);

  // Notes persistence
  const notesKey = `scholastica_notes_${module.id}`;
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem(notesKey) || '';
    } catch {
      return '';
    }
  });

  // Pomodoro Study Timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'recess'>('focus');

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to exit or trigger stealth mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Pomodoro timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      // Toggle mode
      if (timerMode === 'focus') {
        setTimerMode('recess');
        setTimerSeconds(5 * 60);
      } else {
        setTimerMode('focus');
        setTimerSeconds(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds, timerMode]);

  const handleNotesChange = (val: string) => {
    setNotes(val);
    try {
      localStorage.setItem(notesKey, val);
    } catch {}
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const reloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-2 sm:p-4"
    >
      <div className="w-full max-w-6xl h-full max-h-[92vh] bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col">
        {/* Top Academic Toolbar */}
        <div className="h-14 px-4 bg-zinc-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              {module.courseCode}
            </span>
            <h2 className="text-sm font-semibold tracking-tight truncate text-zinc-100">
              {module.title}
            </h2>
            <span className="hidden md:inline-block text-xs text-zinc-400">·</span>
            <span className="hidden md:inline-block text-xs text-zinc-400 truncate">
              {module.department}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Popup Shield Indicator / Toggle */}
            <button
              onClick={() => {
                setPopupsBlocked((prev) => !prev);
                setIframeKey((prev) => prev + 1);
              }}
              title={popupsBlocked ? 'Popups are strictly blocked (sandbox enforces no window.open)' : 'Popups are allowed'}
              className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition ${
                popupsBlocked
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
              }`}
              aria-label={popupsBlocked ? 'Popups disabled' : 'Popups enabled'}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{popupsBlocked ? 'Popups Blocked' : 'Popups Allowed'}</span>
            </button>

            {/* Reload Practicum */}
            <button
              onClick={reloadIframe}
              title="Reinitialize Practicum Sandbox"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition"
              aria-label="Reload iframe"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Popout in isolated tab */}
            <a
              href={resolvedSrc}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Isolated Window"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition inline-flex items-center justify-center"
              aria-label="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Full Immersion Mode'}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Toggle Side Drawer */}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              title="Toggle Academic Research Drawer"
              className={`p-1.5 rounded transition ${
                isDrawerOpen ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
              aria-label="Toggle study drawer"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-zinc-700 mx-1" />

            {/* Close */}
            <button
              onClick={onClose}
              title="Conclude Session"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-rose-900/40 rounded transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Iframe Sandbox */}
          <div className="flex-1 bg-zinc-100 relative flex items-center justify-center overflow-hidden">
            <iframe
              key={iframeKey}
              id="innerFrame"
              name="innerFrame"
              src={resolvedSrc}
              title={module.title}
              className="w-full h-full border-0 bg-white"
              sandbox={sandboxPolicy}
              allow="autoplay; fullscreen; focus-without-user-activation; pointer-lock"
              allowFullScreen
              loading="eager"
              style={{ overflow: 'auto' }}
            />
          </div>

          {/* Academic Research Drawer */}
          {isDrawerOpen && (
            <div className="w-80 md:w-96 border-l border-zinc-200 bg-white flex flex-col shrink-0">
              {/* Tab navigation */}
              <div className="flex items-center border-b border-zinc-200 text-xs font-medium text-zinc-600 bg-zinc-50/50">
                <button
                  onClick={() => setActiveTab('directives')}
                  className={`flex-1 py-2.5 text-center transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'directives'
                      ? 'bg-white text-zinc-900 border-b-2 border-zinc-900 font-semibold'
                      : 'hover:text-zinc-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Directives</span>
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-2.5 text-center transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'notes'
                      ? 'bg-white text-zinc-900 border-b-2 border-zinc-900 font-semibold'
                      : 'hover:text-zinc-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Study Notes</span>
                </button>
                <button
                  onClick={() => setActiveTab('timer')}
                  className={`flex-1 py-2.5 text-center transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'timer'
                      ? 'bg-white text-zinc-900 border-b-2 border-zinc-900 font-semibold'
                      : 'hover:text-zinc-900'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>Study Timer</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                {activeTab === 'directives' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
                        Instrument Directives
                      </h4>
                      <p className="text-xs text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100 font-mono leading-relaxed">
                        {module.instrumentDirectives}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
                        Academic Objective
                      </h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {module.academicObjective}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                        Learning Outcomes
                      </h4>
                      <ul className="space-y-1.5">
                        {module.learningOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-500">
                      <div className="flex justify-between py-1">
                        <span>Course Department:</span>
                        <span className="font-medium text-zinc-800">{module.department}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Academic Level:</span>
                        <span className="font-medium text-zinc-800">{module.level}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Honor Roll Index:</span>
                        <span className="font-mono font-medium text-zinc-800">
                          {module.defaultHonorsIndex.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                        Scholarly Observations
                      </span>
                      <span className="text-[10px] text-zinc-400">Auto-saved to device</span>
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => handleNotesChange(e.target.value)}
                      placeholder="Record empirical observations, algorithm strategies, and experimental notes here..."
                      className="flex-1 w-full p-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none font-mono leading-relaxed"
                    />
                  </div>
                )}

                {activeTab === 'timer' && (
                  <div className="text-center py-6 space-y-4">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      {timerMode === 'focus' ? 'Academic Study Period' : 'Recess & Reflection'}
                    </span>
                    <div className="text-4xl font-mono font-bold text-zinc-900 tracking-tight">
                      {formatTimer(timerSeconds)}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className={`px-4 py-2 text-xs font-semibold rounded-md transition ${
                          timerRunning
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-zinc-900 text-white hover:bg-zinc-800'
                        }`}
                      >
                        {timerRunning ? 'Suspend Period' : 'Begin Period'}
                      </button>
                      <button
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
                        }}
                        className="px-3 py-2 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md transition"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                      Standard Pomodoro cadence: 25 minutes focused analytical study, followed by 5 minutes cognitive recess.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

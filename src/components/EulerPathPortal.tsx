import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Compass,
  HelpCircle,
  RefreshCw,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  analyzeEquation,
  checkPracticeAnswer,
  EquationMode,
  EquationParams,
  FORMULA_SHEET_ITEMS,
  generatePracticeProblem,
} from '../utils/mathPortalLogic';

type EulerTab = 'graph' | 'practice' | 'formulas' | 'progress';

interface ProgressState {
  attempted: number;
  correct: number;
  streak: number;
  solvedIds: string[];
}

const PROGRESS_KEY = 'eulerpath_progress_v1';

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { attempted: 0, correct: 0, streak: 0, solvedIds: [] };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      attempted: Number(parsed.attempted) || 0,
      correct: Number(parsed.correct) || 0,
      streak: Number(parsed.streak) || 0,
      solvedIds: Array.isArray(parsed.solvedIds) ? parsed.solvedIds : [],
    };
  } catch {
    return { attempted: 0, correct: 0, streak: 0, solvedIds: [] };
  }
}

export const EulerPathPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EulerTab>('graph');
  const [eqParams, setEqParams] = useState<EquationParams>({
    mode: 'linear',
    m: 1.5,
    b: 1,
    c: 0,
  });

  const [problemIndex, setProblemIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'correct' | 'wrong' | 'invalid'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [formulaFilter, setFormulaFilter] = useState<string>('All');
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage quota errors
    }
  }, [progress]);

  const analysis = useMemo(() => analyzeEquation(eqParams), [eqParams]);
  const activeProblem = useMemo(() => generatePracticeProblem(problemIndex), [problemIndex]);

  const svgWidth = 520;
  const svgHeight = 360;
  const pad = 28;
  const xMin = -10;
  const xMax = 10;
  const yMin = -10;
  const yMax = 10;

  const toSvgX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * pad);
  const toSvgY = (y: number) => svgHeight - pad - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * pad);

  const curvePath = useMemo(() => {
    let d = '';
    let drawing = false;
    for (const pt of analysis.points) {
      if (pt.y < yMin - 4 || pt.y > yMax + 4 || !Number.isFinite(pt.y)) {
        drawing = false;
        continue;
      }
      const sx = toSvgX(pt.x).toFixed(1);
      const sy = toSvgY(pt.y).toFixed(1);
      d += drawing ? ` L ${sx} ${sy}` : `M ${sx} ${sy}`;
      drawing = true;
    }
    return d;
  }, [analysis.points]);

  const handleNewProblem = () => {
    setProblemIndex((prev) => prev + 1);
    setAnswerInput('');
    setShowHint(false);
    setFeedback({ type: 'idle', message: '' });
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkPracticeAnswer(activeProblem, answerInput);
    if (!res.isValidNumber) {
      setFeedback({ type: 'invalid', message: 'Enter a numeric value to verify your step.' });
      return;
    }
    if (res.isCorrect) {
      setFeedback({ type: 'correct', message: `Correct! ${activeProblem.steps[activeProblem.steps.length - 1]}` });
      setProgress((prev) => ({
        attempted: prev.attempted + 1,
        correct: prev.correct + 1,
        streak: prev.streak + 1,
        solvedIds: prev.solvedIds.includes(activeProblem.id) ? prev.solvedIds : [...prev.solvedIds, activeProblem.id],
      }));
    } else {
      setFeedback({
        type: 'wrong',
        message: 'Not quite. Review the hint or compare your substitution steps below.',
      });
      setProgress((prev) => ({
        ...prev,
        attempted: prev.attempted + 1,
        streak: 0,
      }));
    }
  };

  const gridTicks = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];
  const formulaCategories = ['All', 'Linear & Coordinate', 'Quadratics', 'Trigonometry', 'Calculus'];
  const visibleFormulas =
    formulaFilter === 'All'
      ? FORMULA_SHEET_ITEMS
      : FORMULA_SHEET_ITEMS.filter((f) => f.category === formulaFilter);

  const accuracy = progress.attempted > 0 ? Math.round((progress.correct / progress.attempted) * 100) : 100;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Academic Navigation matching EulerPath Reference */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('graph')}
            className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">EulerPath</span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600" aria-label="Primary Math Navigation">
            {(
              [
                ['graph', 'Interactive Graph'],
                ['practice', 'Practice Set'],
                ['formulas', 'Formula Sheet'],
                ['progress', 'Progress'],
              ] as Array<[EulerTab, string]>
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`py-1 transition-colors cursor-pointer ${
                  activeTab === id
                    ? 'text-[#1d4ed8] font-semibold border-b-2 border-[#1d4ed8]'
                    : 'hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              handleNewProblem();
              if (activeTab === 'formulas' || activeTab === 'progress') {
                setActiveTab('practice');
              }
            }}
            className="px-4 py-2 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer whitespace-nowrap"
          >
            New Problem
          </button>
        </div>

        {/* Mobile Sub-nav */}
        <div className="md:hidden px-4 py-2 border-t border-slate-200 flex items-center gap-4 text-xs overflow-x-auto bg-white">
          {(
            [
              ['graph', 'Interactive Graph'],
              ['practice', 'Practice Set'],
              ['formulas', 'Formula Sheet'],
              ['progress', 'Progress'],
            ] as Array<[EulerTab, string]>
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === id ? 'text-[#1d4ed8] font-bold' : 'text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        {/* Interactive Graph Frontpage */}
        {activeTab === 'graph' && (
          <>
            <section className="space-y-3 max-w-3xl">
              <div className="text-xs font-semibold text-[#1d4ed8] tracking-wide">
                Unit 3 · Analytic Geometry &amp; Functions
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Explore Equations Visually and Check Every Step
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Adjust coefficients on the coordinate plane, solve targeted algebra problems, and check how slopes,
                intercepts, and ratios respond in real time.
              </p>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Cartesian Coordinate Graph */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="font-mono text-base sm:text-lg font-bold text-slate-900">
                    {analysis.equationText}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(
                      [
                        ['linear', 'Linear'],
                        ['quadratic', 'Quadratic'],
                        ['sine', 'Sine'],
                      ] as Array<[EquationMode, string]>
                    ).map(([mode, label]) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() =>
                          setEqParams((prev) => ({
                            ...prev,
                            mode,
                            m: mode === 'quadratic' ? 0.5 : mode === 'sine' ? 4 : 1.5,
                            b: mode === 'quadratic' ? -1 : mode === 'sine' ? 0.8 : 1,
                            c: mode === 'quadratic' ? -2 : 0,
                          }))
                        }
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                          eqParams.mode === mode
                            ? 'bg-blue-50 text-[#1d4ed8] border border-blue-200'
                            : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/40 overflow-hidden">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-auto block"
                    role="img"
                    aria-label={`Coordinate plane plotting ${analysis.equationText}`}
                  >
                    <defs>
                      <clipPath id="euler-grid-clip">
                        <rect
                          x={pad}
                          y={pad}
                          width={svgWidth - 2 * pad}
                          height={svgHeight - 2 * pad}
                        />
                      </clipPath>
                    </defs>

                    {/* Gridlines */}
                    {gridTicks.map((t) => (
                      <g key={t}>
                        <line
                          x1={toSvgX(t)}
                          y1={pad}
                          x2={toSvgX(t)}
                          y2={svgHeight - pad}
                          stroke={t === 0 ? '#64748b' : '#e2e8f0'}
                          strokeWidth={t === 0 ? 1.5 : 1}
                        />
                        <line
                          x1={pad}
                          y1={toSvgY(t)}
                          x2={svgWidth - pad}
                          y2={toSvgY(t)}
                          stroke={t === 0 ? '#64748b' : '#e2e8f0'}
                          strokeWidth={t === 0 ? 1.5 : 1}
                        />
                        {t !== 0 && (
                          <text
                            x={toSvgX(t)}
                            y={toSvgY(0) + 14}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#64748b"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {t}
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Plotted Curve */}
                    <path
                      d={curvePath}
                      fill="none"
                      stroke="#1d4ed8"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      clipPath="url(#euler-grid-clip)"
                    />

                    {/* y-intercept point */}
                    <circle
                      cx={toSvgX(0)}
                      cy={toSvgY(eqParams.mode === 'linear' ? eqParams.b : eqParams.c)}
                      r="4.5"
                      fill="#2563eb"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      clipPath="url(#euler-grid-clip)"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">y-intercept</span>
                    <span className="font-mono font-bold text-slate-900">{analysis.yIntercept}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">x-intercept(s)</span>
                    <span className="font-mono font-bold text-slate-900 truncate block">{analysis.xIntercepts}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">Derivative</span>
                    <span className="font-mono font-bold text-slate-900 truncate block">{analysis.derivativeText}</span>
                  </div>
                </div>
              </div>

              {/* Right Parameter Controls & Quick Problem Check */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-900">Coefficient Controls</h2>
                    <button
                      type="button"
                      onClick={() => setEqParams({ mode: 'linear', m: 1.5, b: 1, c: 0 })}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <label className="block space-y-1.5">
                      <div className="flex justify-between font-medium text-slate-700">
                        <span>{eqParams.mode === 'linear' ? 'Slope (m)' : eqParams.mode === 'quadratic' ? 'Leading Coefficient (a)' : 'Amplitude (a)'}</span>
                        <span className="font-mono font-bold text-[#1d4ed8]">{eqParams.m}</span>
                      </div>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.25"
                        value={eqParams.m}
                        onChange={(e) => setEqParams((p) => ({ ...p, m: Number(e.target.value) }))}
                        className="w-full accent-[#1d4ed8]"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <div className="flex justify-between font-medium text-slate-700">
                        <span>{eqParams.mode === 'linear' ? 'y-Intercept (b)' : eqParams.mode === 'quadratic' ? 'Linear Term (b)' : 'Frequency (b)'}</span>
                        <span className="font-mono font-bold text-[#1d4ed8]">{eqParams.b}</span>
                      </div>
                      <input
                        type="range"
                        min="-8"
                        max="8"
                        step="0.5"
                        value={eqParams.b}
                        onChange={(e) => setEqParams((p) => ({ ...p, b: Number(e.target.value) }))}
                        className="w-full accent-[#1d4ed8]"
                      />
                    </label>

                    {eqParams.mode !== 'linear' && (
                      <label className="block space-y-1.5">
                        <div className="flex justify-between font-medium text-slate-700">
                          <span>Vertical Shift (c)</span>
                          <span className="font-mono font-bold text-[#1d4ed8]">{eqParams.c}</span>
                        </div>
                        <input
                          type="range"
                          min="-8"
                          max="8"
                          step="0.5"
                          value={eqParams.c}
                          onChange={(e) => setEqParams((p) => ({ ...p, c: Number(e.target.value) }))}
                          className="w-full accent-[#1d4ed8]"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Inline Step-Check Problem Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]">
                      {activeProblem.unit}
                    </span>
                    <button
                      type="button"
                      onClick={handleNewProblem}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Next
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {activeProblem.prompt}
                  </p>

                  <form onSubmit={handleCheckAnswer} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="Enter numeric answer..."
                      aria-label="Step check numeric answer"
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3.5 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold cursor-pointer"
                    >
                      Check Step
                    </button>
                  </form>

                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setShowHint((h) => !h)}
                      className="text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                    </button>
                    <span className="font-mono text-slate-500">Streak: {progress.streak}</span>
                  </div>

                  {showHint && (
                    <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-700">
                      {activeProblem.hint}
                    </div>
                  )}

                  {feedback.type !== 'idle' && (
                    <div
                      className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                        feedback.type === 'correct'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}
                    >
                      {feedback.type === 'correct' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span>{feedback.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Practice Set View */}
        {activeTab === 'practice' && (
          <section className="max-w-3xl space-y-5">
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-[#1d4ed8]">{activeProblem.unit}</div>
              <h1 className="text-2xl font-extrabold text-slate-900">Worked Practice Problem</h1>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <p className="text-base font-semibold text-slate-900">{activeProblem.prompt}</p>

              <form onSubmit={handleCheckAnswer} className="flex flex-wrap items-center gap-2.5">
                <input
                  type="text"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Enter exact value..."
                  aria-label="Practice problem answer"
                  className="flex-1 min-w-[180px] h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="h-10 px-4 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-semibold cursor-pointer"
                >
                  Verify Answer
                </button>
                <button
                  type="button"
                  onClick={handleNewProblem}
                  className="h-10 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
                >
                  Next Problem
                </button>
              </form>

              {feedback.type !== 'idle' && (
                <div
                  className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    feedback.type === 'correct'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="font-semibold">{feedback.message}</div>
                  {feedback.type === 'correct' && (
                    <ol className="list-decimal list-inside space-y-0.5 text-emerald-800">
                      {activeProblem.steps.map((st, idx) => (
                        <li key={idx}>{st}</li>
                      ))}
                    </ol>
                  )}
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Method Hint: </span>
                {activeProblem.hint}
              </div>
            </div>
          </section>
        )}

        {/* Formula Sheet View */}
        {activeTab === 'formulas' && (
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#1d4ed8]">Quick Reference</div>
                <h1 className="text-2xl font-extrabold text-slate-900">Mathematics Formula Sheet</h1>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {formulaCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormulaFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      formulaFilter === cat
                        ? 'bg-[#1d4ed8] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleFormulas.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 space-y-2 shadow-2xs"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]">
                    {item.category}
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">{item.name}</h2>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm font-bold text-slate-900">
                    {item.expression}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.notes}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Progress View */}
        {activeTab === 'progress' && (
          <section className="max-w-3xl space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#1d4ed8]">Mastery Telemetry</div>
                <h1 className="text-2xl font-extrabold text-slate-900">Student Progress Overview</h1>
              </div>
              <button
                type="button"
                onClick={() => setProgress({ attempted: 0, correct: 0, streak: 0, solvedIds: [] })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Reset Progress
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500">Problems Checked</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{progress.attempted}</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500">Correct Solutions</div>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">{progress.correct}</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500">Accuracy</div>
                <div className="text-2xl font-extrabold text-[#1d4ed8] mt-1 tabular-nums">{accuracy}%</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs text-slate-500">Current Streak</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{progress.streak}</div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

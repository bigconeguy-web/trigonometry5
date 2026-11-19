import React, { useState } from 'react';
import {
  Rocket,
  Calendar,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  ArrowRight,
  Clock,
  Layers,
  Award,
  Filter,
  Check,
  RotateCw,
  ExternalLink,
} from 'lucide-react';
import { AcademicModule, AcademicTheme } from '../types/curriculum';

interface CurriculumActivitiesViewProps {
  theme: AcademicTheme;
  modules: AcademicModule[];
  onLaunchModule: (module: AcademicModule) => void;
  onBookmarkModule: (moduleId: string) => void;
  bookmarkedIds: Set<string>;
  onGoToCatalog: () => void;
}

interface ActivityItem {
  id: string;
  day: string;
  timeSlot: string;
  title: string;
  department: string;
  courseCode: string;
  moduleId: string;
  objective: string;
  deliverable: string;
}

const SCHEDULED_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    day: 'Monday / Applied Math Lab',
    timeSlot: '09:00 - 10:30',
    title: 'Binary Matrix Reduction & Exponential Summation (2048)',
    department: 'Applied Mathematics',
    courseCode: 'MATH-2048',
    moduleId: 'matrix-2048',
    objective: 'Consolidate discrete matrix cells along orthogonal axes to synthesize 2,048 without boundary exhaustion.',
    deliverable: 'Achieve a scalar matrix synthesis index of 2,048 points with balanced corner packing.',
  },
  {
    id: 'act-2',
    day: 'Tuesday / Gradient Optimization',
    timeSlot: '13:30 - 14:45',
    title: 'Multivariable Gradient Descent & Loss Manifold Navigation',
    department: 'Applied Mathematics',
    courseCode: 'CALC-340',
    moduleId: 'gradient-runner',
    objective: 'Steer optimization state vector along descending loss surfaces while avoiding mathematical singularities.',
    deliverable: 'Navigate beyond 3,500 distance coordinate strata without barrier collision.',
  },
  {
    id: 'act-3',
    day: 'Wednesday / Spatial Geometry',
    timeSlot: '14:00 - 15:15',
    title: 'Orthogonal Polyomino Tessellation & Planar Packing',
    department: 'Spatial Geometry',
    courseCode: 'GEOM-101',
    moduleId: 'tessellation-tetris',
    objective: 'Apply 90-degree rotational transformations to eliminate completed horizontal strata with minimal voids.',
    deliverable: 'Attain an honor score index exceeding 12,500 target points.',
  },
  {
    id: 'act-4',
    day: 'Thursday / Recursion Seminar',
    timeSlot: '11:00 - 12:30',
    title: 'Recursive Disjoint Permutations & Inductive Stacks (Hanoi)',
    department: 'Algorithmic Logic',
    courseCode: 'CS-210',
    moduleId: 'hanoi-recursion',
    objective: 'Execute minimal recursive stack transfers (2ⁿ - 1) without violating stratum order invariants.',
    deliverable: 'Transfer complete 6-stratum stack to target Rod γ in under 65 moves.',
  },
  {
    id: 'act-5',
    day: 'Friday / Astrophysics Lab',
    timeSlot: '15:00 - 16:30',
    title: 'Orbital Momentum & Toroidal Inertial Navigation',
    department: 'Astrophysics & Celestial Mechanics',
    courseCode: 'ASTRO-240',
    moduleId: 'orbital-asteroids',
    objective: 'Calibrate Newtonian thrusters and directed electron pulses across frictionless toroidal vacuum space.',
    deliverable: 'Clear 4,200+ points across descending cosmic debris wave fronts.',
  },
  {
    id: 'act-6',
    day: 'Sunday / Condensed Matter',
    timeSlot: '16:00 - 17:30',
    title: 'Harmonic Lattice Degradation & Elastic Impulse',
    department: 'Condensed Matter Physics',
    courseCode: 'PHYS-310',
    moduleId: 'elastic-breakout',
    objective: 'Sustain elastic projectile momentum to dislodge multi-tier crystalline strata without containment failure.',
    deliverable: 'Achieve 1,840+ kinetic restitution index across lattice strata.',
  },
];

export const CurriculumActivitiesView: React.FC<CurriculumActivitiesViewProps> = ({
  theme,
  modules,
  onLaunchModule,
  onBookmarkModule,
  bookmarkedIds,
  onGoToCatalog,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'releases' | 'activities' | 'changelog'>('all');

  // Track completed activities in localStorage
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('scholastica_completed_activities');
      return saved ? new Set(JSON.parse(saved)) : new Set(['act-1']);
    } catch {
      return new Set(['act-1']);
    }
  });

  const toggleActivityCompletion = (id: string) => {
    setCompletedActivities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('scholastica_completed_activities', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  // Featured new release spotlight: Multivariable Gradient Descent (CALC-340)
  const featuredModule = modules.find((m) => m.id === 'gradient-runner') || modules[0];

  const completionPercentage = Math.round(
    (completedActivities.size / SCHEDULED_ACTIVITIES.length) * 100
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* View Header / Intro */}
      <div className={`p-6 sm:p-8 rounded-2xl ${theme.heroGradient} transition-all`}>
        <div className="flex items-center gap-2 text-xs font-mono mb-2 flex-wrap">
          <span className={theme.textMuted}>DISPATCH ARCHIVE</span>
          <span aria-hidden="true" className={theme.textMuted}>·</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">RELEASE V2.4.0 ACTIVE</span>
          <span aria-hidden="true" className={theme.textMuted}>·</span>
          <span className={theme.textMuted}>{SCHEDULED_ACTIVITIES.length} CURRICULUM PRACTICUMS SCHEDULED</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${theme.textPrimary}`}>
              New Releases &amp; Curriculum Activities
            </h1>
            <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
              Comprehensive repository dispatch detailing newly deployed analytical simulations, weekly laboratory practicums, academic directives, and engine changelogs.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={onGoToCatalog}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-xs ${
                theme.isDark
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700'
                  : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse Full Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Release Spotlight Card */}
      {featuredModule && (
        <section aria-labelledby="featured-release-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span id="featured-release-heading">Featured New Release (Version 2.4)</span>
            </div>
            <span className={`text-xs ${theme.textMuted}`}>Deployed October 2026</span>
          </div>

          <div className={`p-6 sm:p-7 rounded-xl border ${theme.cardBorder} ${theme.cardBg} shadow-xs transition-all`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {featuredModule.courseCode}
                  </span>
                  <span className={theme.textMuted}>·</span>
                  <span className={`font-medium ${theme.textSecondary}`}>{featuredModule.department}</span>
                  <span className={theme.textMuted}>·</span>
                  <span className={theme.textMuted}>{featuredModule.level}</span>
                  <span className={theme.textMuted}>·</span>
                  <span className={`font-mono ${theme.textMuted}`}>{featuredModule.estimatedDuration}</span>
                </div>

                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${theme.textPrimary}`}>
                    {featuredModule.title}
                  </h2>
                  <p className={`text-sm leading-relaxed ${theme.textSecondary}`}>
                    {featuredModule.description}
                  </p>
                </div>

                <div className={`p-3.5 rounded-lg border ${theme.borderMuted} ${theme.isDark ? 'bg-zinc-900/60' : 'bg-zinc-50'} text-xs space-y-2`}>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-500 shrink-0">Directives:</span>
                    <span className={`font-mono ${theme.textPrimary}`}>{featuredModule.instrumentDirectives}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-emerald-500 shrink-0">Academic Target:</span>
                    <span className={theme.textSecondary}>{featuredModule.academicObjective}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <button
                    onClick={() => onLaunchModule(featuredModule)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm ${theme.primaryBtn}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch New Practicum</span>
                  </button>
                  <button
                    onClick={() => onBookmarkModule(featuredModule.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all border ${
                      bookmarkedIds.has(featuredModule.id)
                        ? 'border-amber-400 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                        : `${theme.borderMuted} ${theme.textSecondary} hover:bg-zinc-100 dark:hover:bg-zinc-800`
                    }`}
                  >
                    {bookmarkedIds.has(featuredModule.id) ? '★ Bookmarked in Syllabi' : '☆ Bookmark Syllabi'}
                  </button>
                  <span className={`text-xs font-mono tabular-nums ${theme.textMuted}`}>
                    Target Honors: {featuredModule.defaultHonorsIndex.toLocaleString()} pts
                  </span>
                </div>
              </div>

              {/* Graphic / Module Metric Card */}
              <div className="lg:col-span-4">
                <div className={`p-5 rounded-xl border ${theme.borderMuted} ${theme.isDark ? 'bg-zinc-900' : 'bg-zinc-100'} space-y-4`}>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={theme.textMuted}>SIMULATION ENGINE</span>
                    <span className="text-emerald-500 font-semibold">ONLINE</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className={theme.textMuted}>Optimization Model:</span>
                      <span className={`font-mono font-medium ${theme.textPrimary}`}>Continuous Gradient Flow</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={theme.textMuted}>Collision Solver:</span>
                      <span className={`font-mono font-medium ${theme.textPrimary}`}>Singularity Boundary Check</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={theme.textMuted}>Frame Delivery:</span>
                      <span className={`font-mono font-medium ${theme.textPrimary}`}>Local HTML5 Canvas</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={theme.textMuted}>Module Code:</span>
                      <span className={`font-mono font-semibold ${theme.textPrimary}`}>{featuredModule.courseCode}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 leading-normal">
                    This self-contained interactive simulation teaches multivariable optimization descent and lateral inertia control in an offline-ready local sandbox.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Filter Tabs for this View */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b pb-3 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === 'all'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setFilterType('activities')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === 'activities'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Weekly Curriculum Activities
          </button>
          <button
            onClick={() => setFilterType('releases')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === 'releases'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Module Release History
          </button>
          <button
            onClick={() => setFilterType('changelog')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === 'changelog'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Platform Changelog
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className={theme.textMuted}>Term Progress:</span>
          <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="font-mono font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Section 1: Weekly Curriculum Activities Schedule */}
      {(filterType === 'all' || filterType === 'activities') && (
        <section aria-labelledby="schedule-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="schedule-heading" className={`text-lg font-bold ${theme.textPrimary}`}>
                Structured Curriculum Activity Schedule
              </h2>
              <p className={`text-xs ${theme.textSecondary}`}>
                Weekly scheduled practicums designed for progressive analytical and cognitive mastery. Mark each laboratory session complete upon achieving target metrics.
              </p>
            </div>
            <span className={`text-xs font-mono tabular-nums ${theme.textMuted}`}>
              {completedActivities.size}/{SCHEDULED_ACTIVITIES.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCHEDULED_ACTIVITIES.map((act) => {
              const isDone = completedActivities.has(act.id);
              const relatedModule = modules.find((m) => m.id === act.moduleId);

              return (
                <div
                  key={act.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    isDone
                      ? `${theme.cardBg} border-emerald-500/30 opacity-90`
                      : `${theme.cardBg} ${theme.cardBorder} hover:border-zinc-400 dark:hover:border-zinc-700`
                  } shadow-xs`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
                        <span className="font-semibold text-indigo-500">{act.day}</span>
                        <span>·</span>
                        <span>{act.timeSlot}</span>
                        <span>·</span>
                        <span className="font-bold">{act.courseCode}</span>
                      </div>
                      <h3 className={`text-sm font-bold leading-snug ${theme.textPrimary}`}>
                        {act.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleActivityCompletion(act.id)}
                      className={`p-1.5 rounded-lg border transition shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-200'
                      }`}
                      title={isDone ? 'Mark as incomplete' : 'Mark activity as complete'}
                      aria-label={isDone ? 'Mark as incomplete' : 'Mark activity as complete'}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className={`text-xs leading-relaxed mb-3 ${theme.textSecondary}`}>
                    {act.objective}
                  </p>

                  <div className={`p-2.5 rounded-lg text-xs border ${theme.borderMuted} ${theme.isDark ? 'bg-zinc-900/50' : 'bg-zinc-50'} mb-3`}>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-0.5">Required Deliverable:</span>
                    <span className={theme.textMuted}>{act.deliverable}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className={`text-[11px] font-mono ${theme.textMuted}`}>
                      {act.department}
                    </span>

                    {relatedModule ? (
                      <button
                        onClick={() => onLaunchModule(relatedModule)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                          theme.isDark
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Open Lab</span>
                      </button>
                    ) : (
                      <button
                        onClick={onGoToCatalog}
                        className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
                      >
                        <span>View Syllabus</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Section 2: Recent Module Release Timeline */}
      {(filterType === 'all' || filterType === 'releases') && (
        <section aria-labelledby="releases-heading" className="space-y-4">
          <div>
            <h2 id="releases-heading" className={`text-lg font-bold ${theme.textPrimary}`}>
              Practicum Deployment Timeline
            </h2>
            <p className={`text-xs ${theme.textSecondary}`}>
              Chronological ledger of interactive practicum releases, mathematical testbeds, and academic enhancements.
            </p>
          </div>

          <div className="space-y-3">
            {/* Release Item 1: ECON-101, TRAF-201, MATH-204 */}
            <div className={`p-4 sm:p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} shadow-xs`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    SELF-CONTAINED · NEW RELEASE · V2.4.3
                  </span>
                  <span className="font-mono font-semibold text-zinc-500">ECON-101 / TRAF-201</span>
                  <span className={theme.textMuted}>·</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>Compounding Capital &amp; Discrete Path Traversal Labs</span>
                </div>
                <span className={`text-xs font-mono ${theme.textMuted}`}>October 2026</span>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${theme.textSecondary}`}>
                Added custom self-contained HTML5 simulations for exponential capital compounding (ECON-101), discrete traffic lane traversal (TRAF-201), and minimax matrix strategy (MATH-204) with zero external network dependencies.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {modules.find((m) => m.id === 'compounding-capital-cookie') && (
                  <button
                    onClick={() => onLaunchModule(modules.find((m) => m.id === 'compounding-capital-cookie')!)}
                    className="text-xs font-semibold text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    <span>Launch ECON-101 Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                <span className={theme.textMuted}>·</span>
                <span className={`text-xs ${theme.textMuted}`}>Tags: Applied Math, Algorithmic Logic, Local Canvas</span>
              </div>
            </div>

            {/* Release Item 2: CALC-340 */}
            <div className={`p-4 sm:p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} shadow-xs`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    NEW RELEASE · V2.4.1
                  </span>
                  <span className="font-mono font-semibold text-zinc-500">CALC-340</span>
                  <span className={theme.textMuted}>·</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>Multivariable Gradient Descent &amp; Slope Navigation</span>
                </div>
                <span className={`text-xs font-mono ${theme.textMuted}`}>October 2026</span>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${theme.textSecondary}`}>
                High-velocity 3D simulation of a gradient descent optimizer navigating a steep continuous loss surface around mathematical singularities.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {modules.find((m) => m.id === 'gradient-runner') && (
                  <button
                    onClick={() => onLaunchModule(modules.find((m) => m.id === 'gradient-runner')!)}
                    className="text-xs font-semibold text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    <span>Launch CALC-340 Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                <span className={theme.textMuted}>·</span>
                <span className={`text-xs ${theme.textMuted}`}>Tags: Applied Math, Gradient Descent, Loss Manifolds</span>
              </div>
            </div>

            {/* Release Item 3: ASTRO-240 */}
            <div className={`p-4 sm:p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} shadow-xs`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    NEW RELEASE · V2.4
                  </span>
                  <span className="font-mono font-semibold text-zinc-500">ASTRO-240</span>
                  <span className={theme.textMuted}>·</span>
                  <span className={`font-semibold ${theme.textPrimary}`}>Orbital Momentum &amp; Inertial Navigation</span>
                </div>
                <span className={`text-xs font-mono ${theme.textMuted}`}>October 2026</span>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${theme.textSecondary}`}>
                Newtonian celestial mechanics simulation testing heading rotation, inertial drift damping, and particulate interception in microgravity.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {modules.find((m) => m.id === 'orbital-asteroids') && (
                  <button
                    onClick={() => onLaunchModule(modules.find((m) => m.id === 'orbital-asteroids')!)}
                    className="text-xs font-semibold text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    <span>Launch ASTRO-240 Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                <span className={theme.textMuted}>·</span>
                <span className={`text-xs ${theme.textMuted}`}>Tags: Astrophysics, Newtonian Kinematics, Inertial Drift</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Platform Architecture & Changelog */}
      {(filterType === 'all' || filterType === 'changelog') && (
        <section aria-labelledby="changelog-heading" className="space-y-4">
          <div>
            <h2 id="changelog-heading" className={`text-lg font-bold ${theme.textPrimary}`}>
              Platform Changelog &amp; Architecture Notes
            </h2>
            <p className={`text-xs ${theme.textSecondary}`}>
              Technical specifications regarding sandbox permissions, offline compliance, and stealth security.
            </p>
          </div>

          <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} space-y-5 text-xs`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono font-semibold">
                <span className="text-emerald-500 dark:text-emerald-400">Release 2.4.0 — Complete 19-Module Local Simulation Suite</span>
                <span className={theme.textMuted}>Latest Release</span>
              </div>
              <ul className={`list-disc list-inside space-y-1 ${theme.textSecondary} pl-1`}>
                <li>All 19 interactive simulations run 100% locally via self-contained HTML5 Canvas packages in ./modules/.</li>
                <li>Integrated Research Drawer with live Scholarly Observations scratchpad and Pomodoro timer inside ModulePlayerModal.</li>
                <li>Zero external trackers or remote requests required for core practicums.</li>
              </ul>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono font-semibold">
                <span className={theme.textPrimary}>Release 2.3.0 — Academic Stealth &amp; Tab Cloaking Engine</span>
                <span className={theme.textMuted}>Prior Release</span>
              </div>
              <ul className={`list-disc list-inside space-y-1 ${theme.textSecondary} pl-1`}>
                <li>Emergency Stealth hotkey (Escape / ~ / configurable key) immediately overlays authentic AP Biology lecture notes.</li>
                <li>Tab cloak switcher allows instantaneous impersonation of Canvas LMS, Google Classroom, Google Docs, or Wikipedia.</li>
                <li>Built-in analytical Pomodoro timer supporting configurable research/recess intervals.</li>
                <li>Integrated 10 university-inspired academic color themes with dark and parchment modes.</li>
              </ul>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono font-semibold">
                <span className={theme.textPrimary}>Release 2.2.0 — Custom UBG Import &amp; JSON Portability</span>
                <span className={theme.textMuted}>Prior Release</span>
              </div>
              <ul className={`list-disc list-inside space-y-1 ${theme.textSecondary} pl-1`}>
                <li>Universal HTML5 / UBG module importer with instant schema validation and local persistence.</li>
                <li>Export and import full curriculum backups in JSON format.</li>
                <li>Dual-view layout: Interactive Card Grid and Academic Course Syllabus listing.</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

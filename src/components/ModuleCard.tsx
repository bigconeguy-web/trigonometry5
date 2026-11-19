import React from 'react';
import { Star, Clock, ArrowUpRight, Tag } from 'lucide-react';
import { AcademicModule, AcademicTheme } from '../types/curriculum';

interface ModuleCardProps {
  module: AcademicModule;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onLaunch: (module: AcademicModule) => void;
  viewMode: 'grid' | 'syllabus';
  personalRecord?: number;
  theme?: AcademicTheme;
  onTagClick?: (tag: string) => void;
  showCourseCodes?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isBookmarked,
  onToggleBookmark,
  onLaunch,
  viewMode,
  personalRecord,
  theme,
  onTagClick,
  showCourseCodes = true,
}) => {
  const cardBg = theme?.cardBg || 'bg-white';
  const cardBorder = theme?.cardBorder || 'border-zinc-200/90';
  const cardHover = theme?.cardHover || 'hover:border-zinc-300 hover:shadow-xs';
  const primaryBtn = theme?.primaryBtn || 'bg-zinc-900 hover:bg-zinc-800 text-white';
  const accentBadge = theme?.accentBadge || 'bg-zinc-100 text-zinc-900 border-zinc-200';
  const textPrimary = theme?.textPrimary || 'text-zinc-900';
  const textSecondary = theme?.textSecondary || 'text-zinc-600';
  const textMuted = theme?.textMuted || 'text-zinc-400';

  if (viewMode === 'syllabus') {
    return (
      <div className={`${cardBg} border ${cardBorder} rounded-xl p-4.5 ${cardHover} transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
        <div className="flex-1 min-w-0">
          {/* Metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-xs mb-1.5 flex-wrap">
            {showCourseCodes && (
              <span className={`font-mono font-semibold px-1.5 py-0.5 rounded text-[11px] ${accentBadge}`}>
                {module.courseCode}
              </span>
            )}
            <span aria-hidden="true" className={textMuted}>·</span>
            <span className={`font-medium ${textSecondary}`}>{module.department}</span>
            <span aria-hidden="true" className={textMuted}>·</span>
            <span className={textSecondary}>{module.level}</span>
            <span aria-hidden="true" className={textMuted}>·</span>
            <span className={`flex items-center gap-1 ${textMuted}`}>
              <Clock className="w-3 h-3" />
              {module.estimatedDuration}
            </span>
          </div>

          <h3 className={`text-base font-bold tracking-tight mb-1 truncate ${textPrimary}`}>
            {module.title}
          </h3>

          <p className={`text-xs line-clamp-1 max-w-3xl mb-2 ${textSecondary}`}>
            {module.description}
          </p>

          {/* Tags */}
          {module.tags && module.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {module.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick?.(tag)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition ${
                    theme?.isDark
                      ? 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          {personalRecord !== undefined && personalRecord > 0 && (
            <div className="text-right">
              <span className={`text-[10px] uppercase tracking-wider block font-semibold ${textMuted}`}>
                High Honor
              </span>
              <span className={`text-xs font-mono font-bold ${textPrimary}`}>
                {personalRecord.toLocaleString()}
              </span>
            </div>
          )}

          <button
            onClick={() => onToggleBookmark(module.id)}
            aria-label={isBookmarked ? 'Remove syllabus bookmark' : 'Bookmark syllabus'}
            className="p-2 rounded-md hover:bg-zinc-100/50 text-zinc-400 hover:text-amber-500 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-amber-400 text-amber-500' : ''
              }`}
            />
          </button>

          <button
            onClick={() => onLaunch(module)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${primaryBtn}`}
          >
            <span>Launch Practicum</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className={`${cardBg} border ${cardBorder} rounded-xl p-5 ${cardHover} transition-all flex flex-col justify-between group`}>
      <div>
        {/* Top bar with unboxed course code and bookmark */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs">
            {showCourseCodes && (
              <span className={`font-mono font-semibold px-1.5 py-0.5 rounded text-[11px] ${accentBadge}`}>
                {module.courseCode}
              </span>
            )}
            <span aria-hidden="true" className={textMuted}>·</span>
            <span className={`truncate max-w-[140px] font-medium ${textSecondary}`}>{module.department}</span>
          </div>

          <button
            onClick={() => onToggleBookmark(module.id)}
            aria-label={isBookmarked ? 'Remove syllabus bookmark' : 'Bookmark syllabus'}
            className="p-1 rounded hover:bg-zinc-100/50 text-zinc-400 hover:text-amber-500 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-amber-400 text-amber-500' : ''
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className={`text-base font-bold tracking-tight mb-2 ${textPrimary}`}>
          {module.title}
        </h3>

        {/* Scholarly Description */}
        <p className={`text-xs line-clamp-2 leading-relaxed mb-3.5 ${textSecondary}`}>
          {module.description}
        </p>

        {/* Academic Objective Callout with subtle gradient background */}
        <div className={`rounded-lg p-2.5 mb-3.5 text-[11px] border ${
          theme?.isDark
            ? 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300'
            : 'bg-zinc-50/80 border-zinc-100 text-zinc-700'
        }`}>
          <span className={`font-semibold block mb-0.5 ${textPrimary}`}>Academic Objective:</span>
          <span className={`line-clamp-2 ${textSecondary}`}>{module.academicObjective}</span>
        </div>

        {/* Tags */}
        {module.tags && module.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {module.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition ${
                  theme?.isDark
                    ? 'bg-zinc-800/60 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Unboxed Metadata Footer */}
        <div className={`flex items-center justify-between text-xs pt-3 border-t ${theme?.borderMuted || 'border-zinc-100'} mb-3.5`}>
          <div className={`flex items-center gap-1.5 ${textMuted}`}>
            <Clock className="w-3 h-3" />
            <span>{module.estimatedDuration}</span>
          </div>

          <div className="text-right">
            <span className={`text-[10px] block font-medium ${textMuted}`}>Honor Index</span>
            <span className={`font-mono font-semibold ${textPrimary}`}>
              {module.defaultHonorsIndex.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Launch Button with smooth gradient */}
        <button
          onClick={() => onLaunch(module)}
          className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-xs ${primaryBtn}`}
        >
          <span>Launch Practicum</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

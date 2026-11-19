import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { ViewMode, AcademicTheme } from '../types/curriculum';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'code-asc' | 'code-desc' | 'honors-desc' | 'title-asc';
  onSortChange: (sort: 'code-asc' | 'code-desc' | 'honors-desc' | 'title-asc') => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  theme?: AcademicTheme;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
  theme,
}) => {
  const isDark = theme?.isDark;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search curriculum title, course code (e.g. MATH-2048), or keyword..."
          className={`w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-2xs ${
            isDark
              ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 placeholder-zinc-500'
              : 'bg-white border-zinc-200 text-zinc-800 placeholder-zinc-400'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-xs ${
              isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Clear
          </button>
        )}
      </div>

      {/* Controls Strip */}
      <div className="flex items-center gap-3 justify-between sm:justify-end">
        <span className={`text-xs tabular-nums ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {totalCount} {totalCount === 1 ? 'Practicum' : 'Practicums'} Available
        </span>

        {/* Sort selector */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="sort-select" className="sr-only">
            Sort Syllabi
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className={`text-xs py-1.5 px-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer border ${
              isDark
                ? 'bg-zinc-900 border-zinc-800 text-zinc-200'
                : 'bg-white border-zinc-200 text-zinc-700'
            }`}
          >
            <option value="code-asc">Course Code (A → Z)</option>
            <option value="code-desc">Course Code (Z → A)</option>
            <option value="honors-desc">Top Honors Index</option>
            <option value="title-asc">Title (A → Z)</option>
          </select>
        </div>

        {/* View mode toggle */}
        <div className={`flex items-center border rounded-md p-0.5 ${
          isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-50'
        }`}>
          <button
            onClick={() => onViewModeChange('grid')}
            aria-label="Grid layout"
            className={`p-1.5 rounded transition ${
              viewMode === 'grid'
                ? isDark ? 'bg-zinc-800 text-white shadow-xs' : 'bg-white text-zinc-900 shadow-xs'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange('syllabus')}
            aria-label="Syllabus catalog layout"
            className={`p-1.5 rounded transition ${
              viewMode === 'syllabus'
                ? isDark ? 'bg-zinc-800 text-white shadow-xs' : 'bg-white text-zinc-900 shadow-xs'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

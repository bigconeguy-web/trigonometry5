import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { AcademicTheme, ThemeId } from '../types/curriculum';
import { THEMES } from '../utils/theme';

interface ThemeSelectorProps {
  currentTheme: AcademicTheme;
  onSelectTheme: (id: ThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all flex items-center gap-2 ${
          currentTheme.isDark
            ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
            : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
        }`}
        aria-label="Switch academic theme"
        aria-expanded={isOpen}
      >
        <div className="flex -space-x-1 items-center">
          <span
            className="w-2.5 h-2.5 rounded-full ring-1 ring-white/50"
            style={{ backgroundColor: currentTheme.swatchColors[0] }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full ring-1 ring-white/50"
            style={{ backgroundColor: currentTheme.swatchColors[1] }}
          />
        </div>
        <span className="hidden sm:inline font-semibold">{currentTheme.name}</span>
        <Palette className="w-3.5 h-3.5 text-zinc-400" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-72 rounded-xl shadow-xl border p-2 z-50 backdrop-blur-md transition-all ${
            currentTheme.isDark
              ? 'bg-zinc-900/95 border-zinc-800 text-zinc-100'
              : 'bg-white/95 border-zinc-200 text-zinc-800'
          }`}
        >
          <div className="px-3 py-2 border-b border-zinc-200/50 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Scholastic Themes &amp; Gradients
            </span>
            <span className="text-[11px] text-zinc-500">
              Customize portal color balance &amp; aesthetic palette
            </span>
          </div>

          <div className="space-y-1">
            {THEMES.map((theme) => {
              const isSelected = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs transition flex items-center justify-between group ${
                    isSelected
                      ? currentTheme.isDark
                        ? 'bg-zinc-800 font-semibold'
                        : 'bg-zinc-100 font-semibold'
                      : currentTheme.isDark
                      ? 'hover:bg-zinc-800/60'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex -space-x-1 shrink-0">
                      <span
                        className="w-3 h-3 rounded-full ring-1 ring-white/60 shadow-2xs"
                        style={{ backgroundColor: theme.swatchColors[0] }}
                      />
                      <span
                        className="w-3 h-3 rounded-full ring-1 ring-white/60 shadow-2xs"
                        style={{ backgroundColor: theme.swatchColors[1] }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-medium truncate">{theme.name}</span>
                      <span className="text-[10px] text-zinc-400 block truncate">
                        {theme.departmentFocus}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

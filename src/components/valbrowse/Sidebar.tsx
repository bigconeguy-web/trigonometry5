import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Gamepad2,
  Sigma,
  Film,
  BookOpen,
  Music,
  ShieldAlert,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';

export type ValBrowseSection =
  | 'browser'
  | 'modules'
  | 'gnmath'
  | 'movies'
  | 'books'
  | 'music';

interface SidebarProps {
  activeSection: ValBrowseSection;
  onSelectSection: (section: ValBrowseSection) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenUtilities: () => void;
  onTriggerPanic: () => void;
  totalModulesCount: number;
  gnMathCount: number;
}

interface NavItemConfig {
  id: ValBrowseSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  onOpenUtilities,
  onTriggerPanic,
  totalModulesCount,
  gnMathCount,
}) => {
  const primaryItems: NavItemConfig[] = [
    { id: 'browser', label: 'ValBrowse', icon: Globe },
    { id: 'modules', label: 'Games', icon: Gamepad2, count: totalModulesCount > 0 ? totalModulesCount : undefined },
  ];

  const gnMathItems: NavItemConfig[] = [
    { id: 'gnmath', label: 'gn-math Script', icon: Sigma, count: gnMathCount > 0 ? gnMathCount : undefined },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'books', label: 'Books & Manga', icon: BookOpen },
    { id: 'music', label: 'Music', icon: Music },
  ];

  const renderNavItem = (item: NavItemConfig, isMobile = false) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    const showLabel = isMobile || !collapsed;

    return (
      <button
        key={item.id}
        type="button"
        data-sidebar-nav={item.id}
        onClick={() => {
          onSelectSection(item.id);
          if (isMobile) onCloseMobile();
        }}
        title={!showLabel ? item.label : undefined}
        className={`group relative w-full flex items-center gap-3 px-2.5 h-10 rounded-lg text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer ${
          isActive
            ? 'bg-indigo-500/15 text-white border border-indigo-500/35'
            : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.045] border border-transparent'
        }`}
      >
        <Icon
          className={`w-[18px] h-[18px] shrink-0 transition-colors duration-150 ${
            isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
          }`}
        />
        {showLabel && (
          <span className="flex-1 text-left truncate">{item.label}</span>
        )}
        {showLabel && typeof item.count === 'number' && (
          <span className="font-mono text-[11px] tabular-nums text-slate-500 group-hover:text-slate-300">
            {item.count}
          </span>
        )}
      </button>
    );
  };

  const renderInner = (isMobile: boolean) => {
    const showLabels = isMobile || !collapsed;

    return (
      <div className="flex flex-col h-full bg-[#0b0f18]/90 backdrop-blur-xl border-r border-white/[0.08] select-none">
        {/* Brand Header */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-white/[0.07] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-[0_6px_18px_rgba(99,102,241,0.3)]">
              V
            </div>
            {showLabels && (
              <div className="min-w-0">
                <div className="text-[15px] font-bold tracking-tight text-slate-50 leading-none">
                  Val<span className="text-indigo-400">Browse</span>
                </div>
                <div className="text-[10.5px] font-mono text-slate-500 mt-1 leading-none">
                  Scramjet v2
                </div>
              </div>
            )}
          </div>

          {isMobile ? (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close navigation menu"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleCollapse}
              data-testid="sidebar-collapse-btn"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
            >
              {collapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-5">
          <div>
            {showLabels && (
              <div className="px-2.5 mb-2 text-[10.5px] font-mono font-semibold uppercase tracking-[0.08em] text-slate-500">
                Workspace
              </div>
            )}
            <div className="space-y-1">
              {primaryItems.map((item) => renderNavItem(item, isMobile))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            {showLabels && (
              <div className="px-2.5 mb-2 flex items-center justify-between">
                <span className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.08em] text-slate-500">
                  gn-math
                </span>
                <span className="text-[10px] font-mono text-indigo-400/80">Provider</span>
              </div>
            )}
            <div className="space-y-1">
              {gnMathItems.map((item) => renderNavItem(item, isMobile))}
            </div>
          </div>
        </div>

        {/* Footer System Controls */}
        <div className="p-2.5 border-t border-white/[0.07] space-y-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              onOpenUtilities();
              if (isMobile) onCloseMobile();
            }}
            title={!showLabels ? 'Cloak & Data Backup' : undefined}
            className="w-full flex items-center gap-3 px-2.5 h-9 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-100 hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 shrink-0" />
            {showLabels && <span className="truncate">Cloak &amp; Data</span>}
          </button>

          <button
            type="button"
            onClick={onTriggerPanic}
            data-testid="sidebar-panic-btn"
            title="Panic (Esc) — Open Google Classroom"
            className="w-full flex items-center gap-3 px-2.5 h-9 rounded-lg text-[13px] font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            {showLabels && (
              <>
                <span className="flex-1 text-left truncate">Panic</span>
                <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-black/30 text-rose-200 border border-rose-400/20">
                  Esc
                </kbd>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 68 : 244 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block shrink-0 h-full overflow-hidden z-30"
        aria-label="ValBrowse Sidebar"
      >
        {renderInner(false)}
      </motion.aside>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[252px] h-full z-10"
              aria-label="Mobile Navigation"
            >
              {renderInner(true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

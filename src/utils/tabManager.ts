export const MAX_OPEN_TABS = 8;

export type WorkspaceTabKind = 'library' | 'game' | 'utility';

export interface WorkspaceTab {
  id: string;
  kind: WorkspaceTabKind;
  title: string;
  pinned?: boolean;
  appKey?: string;
  gameId?: string;
}

export interface TabManagerState {
  tabs: WorkspaceTab[];
  activeTabId: string;
}

export function createInitialTabState(): TabManagerState {
  return {
    tabs: [
      {
        id: 'home',
        kind: 'library',
        title: 'Home · Library',
        pinned: true,
        appKey: 'games',
      },
    ],
    activeTabId: 'home',
  };
}

export function canOpenAnotherTab(state: TabManagerState): boolean {
  return state.tabs.length < MAX_OPEN_TABS;
}

export function openTab(
  state: TabManagerState,
  tab: WorkspaceTab
): { state: TabManagerState; added: boolean; error: string | null } {
  if (!canOpenAnotherTab(state)) {
    return {
      state,
      added: false,
      error: `Maximum ${MAX_OPEN_TABS} simultaneous tabs reached. Close a tab (×) to open another.`,
    };
  }
  return {
    state: {
      tabs: [...state.tabs, { ...tab, pinned: false }],
      activeTabId: tab.id,
    },
    added: true,
    error: null,
  };
}

export function activateTab(state: TabManagerState, tabId: string): TabManagerState {
  if (!state.tabs.some((t) => t.id === tabId)) return state;
  return {
    ...state,
    activeTabId: tabId,
  };
}

export function closeTab(
  state: TabManagerState,
  tabId: string
): { state: TabManagerState; closed: boolean } {
  const idx = state.tabs.findIndex((t) => t.id === tabId);
  if (idx === -1) return { state, closed: false };
  const target = state.tabs[idx];
  if (target.pinned) return { state, closed: false };

  const nextTabs = state.tabs.filter((t) => t.id !== tabId);
  let nextActiveId = state.activeTabId;
  if (state.activeTabId === tabId) {
    const fallback = nextTabs[Math.min(idx, nextTabs.length - 1)] || nextTabs[0];
    nextActiveId = fallback ? fallback.id : 'home';
  }
  return {
    state: {
      tabs: nextTabs,
      activeTabId: nextActiveId,
    },
    closed: true,
  };
}

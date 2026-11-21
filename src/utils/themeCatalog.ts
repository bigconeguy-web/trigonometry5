export type ThemeCategory = 'Dark & Neon' | 'Cozy & Pastel' | 'High-Contrast & Light';

export interface ThemeSpec {
  id: string;
  name: string;
  category: ThemeCategory;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  border: string;
  isLight?: boolean;
}

export const THEME_CATEGORIES: ThemeCategory[] = [
  'Dark & Neon',
  'Cozy & Pastel',
  'High-Contrast & Light',
];

export const THEMES_CATALOG: ThemeSpec[] = [
  // Dark & Neon (8)
  {
    id: 'midnight-oled',
    name: 'Midnight OLED',
    category: 'Dark & Neon',
    bgPrimary: '#05070b',
    bgSecondary: '#0b0f17',
    bgCard: '#121824',
    textPrimary: '#f1f5f9',
    textMuted: '#8a9bb0',
    accent: '#34d399',
    border: '#1f2937',
  },
  {
    id: 'cyber-neon-green',
    name: 'Cyber Neon Green',
    category: 'Dark & Neon',
    bgPrimary: '#060c09',
    bgSecondary: '#0a140f',
    bgCard: '#101f17',
    textPrimary: '#ecfdf5',
    textMuted: '#78b392',
    accent: '#00ff88',
    border: '#1c3b2a',
  },
  {
    id: 'dracula-purple',
    name: 'Dracula Purple',
    category: 'Dark & Neon',
    bgPrimary: '#191a24',
    bgSecondary: '#21222c',
    bgCard: '#282a36',
    textPrimary: '#f8f8f2',
    textMuted: '#9aa2c4',
    accent: '#bd93f9',
    border: '#3e4157',
  },
  {
    id: 'synthwave-sunset',
    name: 'Synthwave Sunset',
    category: 'Dark & Neon',
    bgPrimary: '#160b24',
    bgSecondary: '#1f1033',
    bgCard: '#291542',
    textPrimary: '#fdf2f8',
    textMuted: '#c084fc',
    accent: '#ff4ecd',
    border: '#47216b',
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    category: 'Dark & Neon',
    bgPrimary: '#12080a',
    bgSecondary: '#1b0c10',
    bgCard: '#261116',
    textPrimary: '#fef2f2',
    textMuted: '#c4868e',
    accent: '#f43f5e',
    border: '#421c24',
  },
  {
    id: 'electric-cobalt',
    name: 'Electric Cobalt',
    category: 'Dark & Neon',
    bgPrimary: '#070d1b',
    bgSecondary: '#0c152b',
    bgCard: '#121f3d',
    textPrimary: '#eff6ff',
    textMuted: '#89a7d6',
    accent: '#3b82f6',
    border: '#1e3666',
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    category: 'Dark & Neon',
    bgPrimary: '#040e08',
    bgSecondary: '#08170e',
    bgCard: '#0d2215',
    textPrimary: '#dcfce7',
    textMuted: '#6da882',
    accent: '#22c55e',
    border: '#173d25',
  },
  {
    id: 'amber-terminal',
    name: 'Amber Terminal',
    category: 'Dark & Neon',
    bgPrimary: '#100c05',
    bgSecondary: '#181208',
    bgCard: '#221a0b',
    textPrimary: '#fef3c7',
    textMuted: '#b89456',
    accent: '#f59e0b',
    border: '#3d2e14',
  },

  // Cozy & Pastel (8)
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    category: 'Cozy & Pastel',
    bgPrimary: '#1e1e2e',
    bgSecondary: '#181825',
    bgCard: '#28283d',
    textPrimary: '#cdd6f4',
    textMuted: '#9399b2',
    accent: '#cba6f7',
    border: '#3b3b58',
  },
  {
    id: 'nord-frost',
    name: 'Nord Frost',
    category: 'Cozy & Pastel',
    bgPrimary: '#242933',
    bgSecondary: '#2e3440',
    bgCard: '#3b4252',
    textPrimary: '#eceff4',
    textMuted: '#a6b3c7',
    accent: '#88c0d0',
    border: '#4c566a',
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    category: 'Cozy & Pastel',
    bgPrimary: '#16161e',
    bgSecondary: '#1a1b26',
    bgCard: '#24283b',
    textPrimary: '#c0caf5',
    textMuted: '#7882ad',
    accent: '#7aa2f7',
    border: '#343b58',
  },
  {
    id: 'lavender-dusk',
    name: 'Lavender Dusk',
    category: 'Cozy & Pastel',
    bgPrimary: '#1b1826',
    bgSecondary: '#231f31',
    bgCard: '#2d2840',
    textPrimary: '#f3efff',
    textMuted: '#a79cc9',
    accent: '#a78bfa',
    border: '#443d5e',
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'Cozy & Pastel',
    bgPrimary: '#f2f5eb',
    bgSecondary: '#e7ecdc',
    bgCard: '#fbfcf7',
    textPrimary: '#1f2d1b',
    textMuted: '#586e51',
    accent: '#5b8c51',
    border: '#cfd8be',
    isLight: true,
  },
  {
    id: 'peach-blossom',
    name: 'Peach Blossom',
    category: 'Cozy & Pastel',
    bgPrimary: '#fcf2ed',
    bgSecondary: '#f6e4db',
    bgCard: '#fffaf7',
    textPrimary: '#361f18',
    textMuted: '#825d52',
    accent: '#e07a5f',
    border: '#e8cbc0',
    isLight: true,
  },
  {
    id: 'rose-pine',
    name: 'Rose Pine',
    category: 'Cozy & Pastel',
    bgPrimary: '#191724',
    bgSecondary: '#1f1d2e',
    bgCard: '#26233a',
    textPrimary: '#e0def4',
    textMuted: '#908caa',
    accent: '#ebbcba',
    border: '#403d52',
  },
  {
    id: 'mint-breeze',
    name: 'Mint Breeze',
    category: 'Cozy & Pastel',
    bgPrimary: '#ebf7f3',
    bgSecondary: '#dcf0e9',
    bgCard: '#f7fcfa',
    textPrimary: '#102a23',
    textMuted: '#477064',
    accent: '#14b8a6',
    border: '#bfe2d6',
    isLight: true,
  },

  // High-Contrast & Light (8)
  {
    id: 'pure-paper-light',
    name: 'Pure Paper Light',
    category: 'High-Contrast & Light',
    bgPrimary: '#f8fafc',
    bgSecondary: '#ffffff',
    bgCard: '#ffffff',
    textPrimary: '#0f172a',
    textMuted: '#475569',
    accent: '#059669',
    border: '#cbd5e1',
    isLight: true,
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    category: 'High-Contrast & Light',
    bgPrimary: '#fdf6e3',
    bgSecondary: '#eee8d5',
    bgCard: '#fffdf7',
    textPrimary: '#073642',
    textMuted: '#586e75',
    accent: '#268bd2',
    border: '#d8cfb8',
    isLight: true,
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    category: 'High-Contrast & Light',
    bgPrimary: '#002b36',
    bgSecondary: '#073642',
    bgCard: '#0c4352',
    textPrimary: '#fdf6e3',
    textMuted: '#93a1a1',
    accent: '#2aa198',
    border: '#195463',
  },
  {
    id: 'arctic-ice',
    name: 'Arctic Ice',
    category: 'High-Contrast & Light',
    bgPrimary: '#eef6fc',
    bgSecondary: '#e1effa',
    bgCard: '#ffffff',
    textPrimary: '#0a2540',
    textMuted: '#476a8a',
    accent: '#0284c7',
    border: '#c2dbf0',
    isLight: true,
  },
  {
    id: 'desert-sand',
    name: 'Desert Sand',
    category: 'High-Contrast & Light',
    bgPrimary: '#f7f1e3',
    bgSecondary: '#ece2cd',
    bgCard: '#fcf9f2',
    textPrimary: '#2c2214',
    textMuted: '#6e5c43',
    accent: '#c26d1f',
    border: '#d9cbb0',
    isLight: true,
  },
  {
    id: 'slate-graphite',
    name: 'Slate Graphite',
    category: 'High-Contrast & Light',
    bgPrimary: '#111318',
    bgSecondary: '#191c24',
    bgCard: '#222631',
    textPrimary: '#f8fafc',
    textMuted: '#9ca3af',
    accent: '#e2e8f0',
    border: '#374151',
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    category: 'High-Contrast & Light',
    bgPrimary: '#0d0b14',
    bgSecondary: '#151121',
    bgCard: '#1e1930',
    textPrimary: '#fefce8',
    textMuted: '#a69dc2',
    accent: '#eab308',
    border: '#3b325c',
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    category: 'High-Contrast & Light',
    bgPrimary: '#06101c',
    bgSecondary: '#0a1829',
    bgCard: '#10233a',
    textPrimary: '#f0f9ff',
    textMuted: '#7ea6cc',
    accent: '#38bdf8',
    border: '#1c3b5c',
  },
];

const LEGACY_THEME_MAP: Record<string, string> = {
  midnight: 'midnight-oled',
  forest: 'emerald-matrix',
  ocean: 'deep-ocean',
  light: 'pure-paper-light',
};

export function resolveThemeById(id: string | null | undefined): ThemeSpec {
  const key = (id && LEGACY_THEME_MAP[id]) || id || 'midnight-oled';
  return THEMES_CATALOG.find((t) => t.id === key) || THEMES_CATALOG[0];
}

export function buildThemeCssVariables(
  themeId: string,
  customAccent?: string | null
): Record<string, string> {
  const theme = resolveThemeById(themeId);
  const accent =
    customAccent && /^#[0-9a-f]{6}$/i.test(customAccent)
      ? customAccent.toLowerCase()
      : theme.accent.toLowerCase();

  return {
    '--bg-primary': theme.bgPrimary,
    '--bg-secondary': theme.bgSecondary,
    '--bg-card': theme.bgCard,
    '--text-primary': theme.textPrimary,
    '--text-muted': theme.textMuted,
    '--accent': accent,
    '--border': theme.border,
  };
}

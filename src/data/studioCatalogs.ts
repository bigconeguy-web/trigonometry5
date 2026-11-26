export type AnimatedBgCategory =
  | 'Hypnotic Waves'
  | 'Sacred Geometry'
  | 'Particle Nebula'
  | 'Matrix & Cyber'
  | 'Liquid Gradients'
  | 'Minimalist Flow';

export type AnimatedBgAlgo =
  | 'waves'
  | 'sacred'
  | 'nebula'
  | 'matrix'
  | 'cybergrid'
  | 'liquid'
  | 'flow'
  | 'tunnel'
  | 'constellation'
  | 'rings'
  | 'caustics'
  | 'minimal';

export interface AnimatedBgPreset {
  id: string;
  name: string;
  category: AnimatedBgCategory;
  algo: AnimatedBgAlgo;
  speedMul: number;
  density: number;
  hueOffset: number;
  paramA: number;
  paramB: number;
}

export const ANIMATED_BG_CATEGORIES: readonly AnimatedBgCategory[] = [
  'Hypnotic Waves',
  'Sacred Geometry',
  'Particle Nebula',
  'Matrix & Cyber',
  'Liquid Gradients',
  'Minimalist Flow',
];

const ANIMATED_BG_NAMES: Record<AnimatedBgCategory, readonly string[]> = {
  'Hypnotic Waves': [
    'Sine Harmonics',
    'Oceanic Swell',
    'Resonant Ribbon',
    'Tidal Whisper',
    'Acoustic Drift',
    'Standing Wave',
    'Phase Interference',
    'Boreal Currents',
    'Silk Undulation',
    'Pendulum Echo',
    'Chorus Ribbons',
    'Subharmonic Flow',
    'Prism Oscillations',
    'Spectral Crest',
    'Zenith Tide',
    'Drift Horizon',
    'Harmonic Cascade',
  ],
  'Sacred Geometry': [
    'Flower of Life',
    'Metatron Orbits',
    'Golden Mandala',
    'Fibonacci Spiral',
    'HexaLattice Spin',
    'Rosette Bloom',
    'Astral Compass',
    'Polyhedral Prism',
    'Vesica Rings',
    'Lissajous Lotus',
    'Octagon Kaleido',
    'Spirograph Crown',
    'Euclidean Orbit',
    'Harmonic Mandala',
    'Celestial Astrolabe',
    'Infinite Knot',
    'Solar Spiro',
  ],
  'Particle Nebula': [
    'Constellation Mesh',
    'Supernova Dust',
    'Orion Drift',
    'Firefly Canopy',
    'Galaxy Core',
    'Biolume Spores',
    'Comet Shower',
    'Gravity Well',
    'Pulsar Halo',
    'Deep Starfield',
    'Stardust Veil',
    'Orbital Cluster',
    'Photosphere',
    'Photon Drift',
    'Nebula Filament',
    'Ion Cloud',
    'Quasar Bloom',
  ],
  'Matrix & Cyber': [
    'Emerald Rain',
    'Synth Horizon Grid',
    'Cyber Tunnel',
    'Oscilloscope Trace',
    'Hex Stream',
    'Radar Telemetry',
    'Circuit Pulse',
    'Neon Vector Floor',
    'Laser Lattice',
    'Wireframe Peaks',
    'Subroutine Waterfall',
    'Sonar Sweep',
    'Binary Mist',
    'Retro CRT Scan',
    'Fiber Matrix',
    'Telemetry Orbit',
  ],
  'Liquid Gradients': [
    'Mercury Caustics',
    'Plasma Veil',
    'Velvet Smoke',
    'Oil Prism',
    'Lava Drift',
    'Silk Aurora',
    'Thermal Plume',
    'Liquid Gold',
    'Chroma Tide',
    'Glass Refraction',
    'Obsidian Ripple',
    'Molten Coral',
    'Mist Cauldron',
    'Ether Flow',
    'Fluid Bloom',
    'Pearl Current',
    'Iridescent Gel',
  ],
  'Minimalist Flow': [
    'Whisper Mist',
    'Topo Contours',
    'Breathable Dots',
    'Fine Horizon',
    'Calm Vector',
    'Zen Ripples',
    'Monolith Grid',
    'Soft Breath',
    'Paper Grain Drift',
    'Silent Isobar',
    'Nordic Fog',
    'Cloud Contour',
    'Quiet Meridian',
    'Subtle Spark',
    'Dusk Horizon',
    'Linen Drift',
  ],
};

const ALGO_BY_ANIM_CAT: Record<AnimatedBgCategory, readonly AnimatedBgAlgo[]> = {
  'Hypnotic Waves': ['waves', 'flow', 'rings'],
  'Sacred Geometry': ['sacred', 'rings', 'tunnel'],
  'Particle Nebula': ['nebula', 'constellation', 'tunnel'],
  'Matrix & Cyber': ['matrix', 'cybergrid', 'tunnel'],
  'Liquid Gradients': ['liquid', 'caustics', 'flow'],
  'Minimalist Flow': ['minimal', 'flow', 'rings'],
};

export const ANIMATED_BG_PRESETS: readonly AnimatedBgPreset[] = (() => {
  const out: AnimatedBgPreset[] = [];
  let idx = 0;
  for (const category of ANIMATED_BG_CATEGORIES) {
    const names = ANIMATED_BG_NAMES[category];
    const algos = ALGO_BY_ANIM_CAT[category];
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      out.push({
        id: `abg-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}`,
        name,
        category,
        algo: algos[i % algos.length],
        speedMul: Number((0.65 + ((idx % 7) * 0.14)).toFixed(2)),
        density: 16 + ((idx * 7) % 44),
        hueOffset: (idx * 23) % 360,
        paramA: 2 + (i % 7),
        paramB: 1.1 + ((i % 5) * 0.35),
      });
      idx += 1;
    }
  }
  return out;
})();

export type DynamicColorBgCategory =
  | 'Aurora'
  | 'Sunset'
  | 'Cyber Neon'
  | 'Deep Ocean'
  | 'Pastel Calm'
  | 'Midnight';

export interface DynamicColorBgPreset {
  id: string;
  name: string;
  category: DynamicColorBgCategory;
  colors: readonly [string, string, string];
  angle: number;
  mode: 'shift' | 'pulse' | 'conic';
}

export const DYNAMIC_COLOR_BG_CATEGORIES: readonly DynamicColorBgCategory[] = [
  'Aurora',
  'Sunset',
  'Cyber Neon',
  'Deep Ocean',
  'Pastel Calm',
  'Midnight',
];

const DYNAMIC_COLOR_NAMES: Record<DynamicColorBgCategory, readonly string[]> = {
  Aurora: [
    'Borealis Curtain', 'Polar Mint', 'Glacial Emerald', 'Solar Wind Veil', 'Arctic Glow',
    'Nordic Ribbon', 'Ionized Sky', 'Tundra Shimmer', 'Magnetosphere', 'Fjord Haze',
    'Frostfire Drift', 'Aurora Teal', 'Spectral Zenith', 'Luminous Ice', 'Starlight Veil',
    'Subarctic Wave', 'Emerald Solstice',
  ],
  Sunset: [
    'Amber Horizon', 'Tangerine Dusk', 'Crimson Sundown', 'Coral Flamingo', 'Desert Mirage',
    'Golden Hour', 'Volcanic Dusk', 'Terracotta Fade', 'Peach Mirage', 'Saffron Glow',
    'Caldera Ember', 'Canyon Twilight', 'Rosy Alpenglow', 'Honeyed Dusk', 'Apricot Breeze',
    'Copper Skyline', 'Velvet Sundown',
  ],
  'Cyber Neon': [
    'Synthwave Drive', 'Plasma Arc', 'Laser Grid', 'Hyper Cyan', 'Electric Orchid',
    'Neon Tokyo', 'Overdrive Violet', 'Voltage Lime', 'Hologram Pulse', 'Arcade Flash',
    'Ion Magenta', 'Circuit Blue', 'Chromic Flux', 'Turbo Ultraviolet', 'Matrix Glow',
    'Vector Beam', 'Cybernetic Bloom',
  ],
  'Deep Ocean': [
    'Mariana Trench', 'Bioluminescent Bay', 'Cobalt Abyss', 'Coral Reef Drift', 'Pacific Swell',
    'Kelp Shadow', 'Pelagic Blue', 'Lagoon Tide', 'Midnight Atoll', 'Sunken Pearl',
    'Aegean Depth', 'Tidal Basin', 'Seafoam Mist', 'Nautilus Deep', 'Glacier Current',
    'Harbor Dusk', 'Azure Current',
  ],
  'Pastel Calm': [
    'Lavender Mist', 'Sakura Breeze', 'Matcha Cloud', 'Cotton Candy', 'Mint Sorbet',
    'Peach Milk', 'Cloud Nine', 'Iris Silk', 'Vanilla Sky', 'Periwinkle Soft',
    'Powder Rose', 'Pistachio Dream', 'Lilac Dew', 'Morning Blossom', 'Misty Apricot',
    'Soft Horizon',
  ],
  Midnight: [
    'Obsidian Velvet', 'Nocturne Plum', 'Eclipse Shadow', 'Dark Sapphire', 'Moonlit Slate',
    'Starless Void', 'Inkwell Indigo', 'Shadow Onyx', 'Deep Garnet', 'Charcoal Nebula',
    'Carbon Frost', 'Twilight Charcoal', 'Dusk Espresso', 'Blackberry Night', 'Umbra Glow',
    'Phantom Blue',
  ],
};

const DYNAMIC_BASE_PALETTES: Record<DynamicColorBgCategory, ReadonlyArray<readonly [string, string, string]>> = {
  Aurora: [
    ['#042f2e', '#059669', '#22d3ee'],
    ['#0f172a', '#10b981', '#818cf8'],
    ['#022c22', '#2dd4bf', '#a78bfa'],
    ['#064e3b', '#34d399', '#38bdf8'],
  ],
  Sunset: [
    ['#431407', '#ea580c', '#fb7185'],
    ['#4c0519', '#f43f5e', '#f59e0b'],
    ['#3b0764', '#ec4899', '#fb923c'],
    ['#27272a', '#d97706', '#f43f5e'],
  ],
  'Cyber Neon': [
    ['#1e1b4b', '#e879f9', '#22d3ee'],
    ['#052e16', '#00ff88', '#06b6d4'],
    ['#2e1065', '#ff4ecd', '#3b82f6'],
    ['#09090b', '#f43f5e', '#8b5cf6'],
  ],
  'Deep Ocean': [
    ['#020617', '#0369a1', '#06b6d4'],
    ['#082f49', '#0284c7', '#2dd4bf'],
    ['#0c0a2a', '#1d4ed8', '#38bdf8'],
    ['#042f2e', '#0e7490', '#6366f1'],
  ],
  'Pastel Calm': [
    ['#1e1b2e', '#c4b5fd', '#fbcfe8'],
    ['#1c1926', '#99f6e4', '#a5f3fc'],
    ['#231b22', '#fda4af', '#fed7aa'],
    ['#19212a', '#bae6fd', '#ddd6fe'],
  ],
  Midnight: [
    ['#050508', '#1e1b4b', '#312e81'],
    ['#09090b', '#27272a', '#3f3f46'],
    ['#0b0608', '#3b0764', '#4c0519'],
    ['#020617', '#0f172a', '#1e3a5f'],
  ],
};

function rotateHexHue(hex: string, shiftDeg: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  const nh = (((h * 360 + shiftDeg) % 360) + 360) % 360 / 360;
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const rr = Math.round(hue2rgb(p, q, nh + 1 / 3) * 255);
  const gg = Math.round(hue2rgb(p, q, nh) * 255);
  const bb = Math.round(hue2rgb(p, q, nh - 1 / 3) * 255);
  return `#${[rr, gg, bb].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

export const DYNAMIC_COLOR_BG_PRESETS: readonly DynamicColorBgPreset[] = (() => {
  const out: DynamicColorBgPreset[] = [];
  const modes: readonly ('shift' | 'pulse' | 'conic')[] = ['shift', 'pulse', 'conic'];
  let idx = 0;
  for (const category of DYNAMIC_COLOR_BG_CATEGORIES) {
    const names = DYNAMIC_COLOR_NAMES[category];
    const palettes = DYNAMIC_BASE_PALETTES[category];
    for (let i = 0; i < names.length; i++) {
      const base = palettes[i % palettes.length];
      const hueJitter = (i * 11) % 36;
      out.push({
        id: `dcbg-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}`,
        name: names[i],
        category,
        colors: [
          rotateHexHue(base[0], hueJitter),
          rotateHexHue(base[1], hueJitter),
          rotateHexHue(base[2], hueJitter),
        ],
        angle: (115 + idx * 17) % 360,
        mode: modes[idx % modes.length],
      });
      idx += 1;
    }
  }
  return out;
})();

export type FontCategory =
  | 'Modern Sans'
  | 'Geometric'
  | 'Monospace & Code'
  | 'Futuristic & Tech'
  | 'Serif & Editorial'
  | 'Cursive & Calligraphy'
  | 'Handwritten & Display';

export interface FontPreset {
  id: string;
  name: string;
  category: FontCategory;
  family: string;
  fallback: 'sans-serif' | 'monospace' | 'serif' | 'cursive';
}

export const FONT_CATEGORIES: readonly FontCategory[] = [
  'Modern Sans',
  'Geometric',
  'Monospace & Code',
  'Futuristic & Tech',
  'Serif & Editorial',
  'Cursive & Calligraphy',
  'Handwritten & Display',
];

const FONT_NAMES_BY_CAT: Record<FontCategory, readonly string[]> = {
  'Modern Sans': [
    'Plus Jakarta Sans', 'DM Sans', 'Manrope', 'Public Sans', 'Work Sans', 'Rubik', 'Nunito',
    'Nunito Sans', 'Mulish', 'Karla', 'Barlow', 'Quicksand', 'Raleway', 'Poppins', 'Figtree',
    'Sora', 'Albert Sans', 'Hanken Grotesk', 'Onest', 'Red Hat Display', 'Red Hat Text',
    'Lexend', 'Lexend Deca', 'Atkinson Hyperlegible', 'Lato', 'Open Sans', 'Noto Sans',
    'Source Sans 3', 'IBM Plex Sans', 'Fira Sans', 'Cabin', 'Hind', 'Heebo', 'Assistant',
    'Catamaran', 'Dosis', 'Exo', 'Titillium Web', 'Overpass', 'Signika', 'Asap',
    'Varela Round', 'Chivo', 'Prompt', 'Kanit', 'Sarabun', 'Instrument Sans', 'Schibsted Grotesk',
    'Bricolage Grotesque', 'Golos Text',
  ],
  Geometric: [
    'Outfit', 'Urbanist', 'Jost', 'Josefin Sans', 'Montserrat', 'Questrial', 'Comfortaa',
    'Syncopate', 'Syne', 'Archivo', 'Epilogue', 'Kumbh Sans', 'Readex Pro', 'Be Vietnam Pro',
    'Sen', 'Viga', 'Righteous', 'Didact Gothic', 'Monda', 'Niramit', 'K2D', 'Kodchasan',
    'KoHo', 'Bai Jamjuree', 'Thasadith', 'Fahkwang', 'Palanquin', 'Alegreya Sans',
    'Oxygen', 'Cantarell', 'Gudea', 'Pontano Sans', 'Telex', 'Voltaire', 'Paytone One',
    'Francois One', 'Yanone Kaffeesatz', 'Oswald', 'Barlow Condensed', 'Antonio',
    'Big Shoulders Display', 'Staatliches', 'Bebas Neue',
  ],
  'Monospace & Code': [
    'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro', 'Space Mono',
    'Inconsolata', 'Roboto Mono', 'DM Mono', 'Ubuntu Mono', 'Azeret Mono', 'Anonymous Pro',
    'VT323', 'Share Tech Mono', 'Victor Mono', 'Martian Mono', 'Spline Sans Mono',
    'Courier Prime', 'Cousine', 'Nanum Gothic Coding', 'Overpass Mono', 'Oxygen Mono',
    'PT Mono', 'Red Hat Mono', 'Syne Mono', 'Xanh Mono', 'Major Mono Display',
    'Nova Mono', 'Cutive Mono', 'B612 Mono', 'Fira Mono', 'Chivo Mono', 'Sono',
    'Fragment Mono', 'Georama', 'Lilex',
  ],
  'Futuristic & Tech': [
    'Orbitron', 'Exo 2', 'Rajdhani', 'Chakra Petch', 'Michroma', 'Audiowide', 'Saira',
    'Saira Condensed', 'Oxanium', 'Jura', 'Electrolize', 'Quantico', 'Teko', 'Iceland',
    'Bruno Ace', 'Bruno Ace SC', 'Tektur', 'Silkscreen', 'Press Start 2P', 'Russo One',
    'Black Ops One', 'Bungee', 'Bungee Inline', 'Aldrich', 'Wallpoet', 'Keania One',
    'Share Tech', 'Turret Road', 'Goldman', 'Space Grotesk', 'Nova Square', 'Geo',
    'Wire One', 'Megrim', 'Codystar', 'Rationale', 'offside', 'Krona One', 'Genos',
    'Tourney', 'MuseoModerno', 'Gruppo',
  ],
  'Serif & Editorial': [
    'Playfair Display', 'Fraunces', 'Cormorant Garamond', 'Bodoni Moda', 'Cinzel',
    'Lora', 'Source Serif 4', 'Merriweather', 'Libre Baskerville', 'Crimson Pro',
    'EB Garamond', 'Spectral', 'Bitter', 'Cardo', 'Vollkorn', 'DM Serif Display',
    'DM Serif Text', 'Prata', 'Marcellus', 'Yeseva One', 'Cinzel Decorative',
    'Cormorant', 'Alegreya', 'Arvo', 'Domine', 'Frank Ruhl Libre', 'Gelasio',
    'Hepta Slab', 'Josefin Slab', 'Literata', 'Lusitana', 'Neuton', 'Noticia Text',
    'Old Standard TT', 'Philosopher', 'Podkova', 'Quattrocento', 'Rokkitt',
    'Rufina', 'Sorts Mill Goudy', 'Tinos', 'Unna', 'Vidaloka', 'Zilla Slab',
    'Newsreader', 'Instrument Serif',
  ],
  'Cursive & Calligraphy': [
    'Dancing Script', 'Great Vibes', 'Pacifico', 'Sacramento', 'Allura',
    'Alex Brush', 'Caveat', 'Kaushan Script', 'Lobster', 'Satisfy',
    'Parisienne', 'Tangerine', 'Marck Script', 'Pinyon Script', 'Mr De Haviland',
    'Petit Formal Script', 'Herr Von Muellerhoff', 'Italianno', 'Courgette', 'Yellowtail',
    'Cookie', 'Damion', 'Bad Script', 'La Belle Aurore', 'Kristi',
    'Cedarville Cursive', 'Homemade Apple', 'Zeyada', 'Bilbo Swash Caps', 'Seaweed Script',
    'Niconne', 'Yesteryear', 'Rouge Script', 'Grand Hotel',
  ],
  'Handwritten & Display': [
    'Shadows Into Light', 'Indie Flower', 'Permanent Marker', 'Kalam', 'Patrick Hand',
    'Abril Fatface', 'Anton', 'Bangers', 'Alfa Slab One', 'Unbounded',
    'Fredoka', 'Amatic SC', 'Architects Daughter', 'Berkshire Swash', 'Boogaloo',
    'Chewy', 'Covered By Your Grace', 'Creepster', 'Gloria Hallelujah', 'Handlee',
    'Leckerli One', 'Lilita One', 'Lobster Two', 'Luckiest Guy', 'Merienda',
    'Nothing You Could Do', 'Orbit', 'Poiret One', 'Reenie Beanie', 'Rock Salt',
    'Titan One', 'Shrikhand',
  ],
};

function toCleanTitle(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export const FONT_LIBRARY_CATALOG: readonly FontPreset[] = (() => {
  const seen = new Set<string>();
  const out: FontPreset[] = [];
  for (const category of FONT_CATEGORIES) {
    const fallback: FontPreset['fallback'] =
      category === 'Monospace & Code'
        ? 'monospace'
        : category === 'Serif & Editorial'
          ? 'serif'
          : category === 'Handwritten & Display' || category === 'Cursive & Calligraphy'
            ? 'cursive'
            : 'sans-serif';
    for (const rawName of FONT_NAMES_BY_CAT[category]) {
      const name = toCleanTitle(rawName);
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({
        id,
        name,
        category,
        family: name,
        fallback,
      });
    }
  }
  return out;
})();

export type StudioNavPosition = 'left' | 'right' | 'top' | 'dock' | 'zen';
export type StudioRailMode = 'expanded' | 'compact' | 'hidden';
export type StudioHomeArrangement = 'split' | 'normal' | 'side' | 'minimal';

export interface StudioLayoutPreset {
  id: string;
  name: string;
  description: string;
  navPosition: StudioNavPosition;
  railMode: StudioRailMode;
  homeLayout: StudioHomeArrangement;
  radius: number;
  density: 'cozy' | 'compact' | 'spacious';
}

export const LAYOUT_PRESETS: readonly StudioLayoutPreset[] = [
  {
    id: 'left-collapsible-default',
    name: 'Left Collapsible Sidebar',
    description: 'Classic left glass rail paired with split hero start page.',
    navPosition: 'left',
    railMode: 'expanded',
    homeLayout: 'split',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'right-sidebar-split',
    name: 'Right Sidebar',
    description: 'Moves the primary navigation rail to the right edge.',
    navPosition: 'right',
    railMode: 'expanded',
    homeLayout: 'split',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'top-horizontal-tabs',
    name: 'Top Horizontal Tabs',
    description: 'Full-width top navigation bar with clean horizontal tabs.',
    navPosition: 'top',
    railMode: 'expanded',
    homeLayout: 'normal',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'floating-dock',
    name: 'Floating Dock',
    description: 'Centered bottom glassmorphic dock inspired by macOS.',
    navPosition: 'dock',
    railMode: 'compact',
    homeLayout: 'normal',
    radius: 16,
    density: 'spacious',
  },
  {
    id: 'compact-icon-rail',
    name: 'Compact Icon Rail',
    description: 'Slim 58px icon-only left navigation for maximum viewport width.',
    navPosition: 'left',
    railMode: 'compact',
    homeLayout: 'split',
    radius: 10,
    density: 'compact',
  },
  {
    id: 'right-compact-rail',
    name: 'Right Compact Rail',
    description: 'Slim icon-only navigation anchored on the right side.',
    navPosition: 'right',
    railMode: 'compact',
    homeLayout: 'side',
    radius: 10,
    density: 'compact',
  },
  {
    id: 'dual-pane-split',
    name: 'Dual-Pane Split',
    description: 'Side-by-side command rail with balanced search and launchpad.',
    navPosition: 'left',
    railMode: 'expanded',
    homeLayout: 'side',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'minimalist-zen',
    name: 'Minimalist Zen Mode',
    description: 'Auto-hidden chrome with floating menu button and quiet start page.',
    navPosition: 'zen',
    railMode: 'hidden',
    homeLayout: 'minimal',
    radius: 14,
    density: 'spacious',
  },
  {
    id: 'side-shortcuts-bar',
    name: 'Side Shortcuts Bar',
    description: 'Expanded sidebar paired with side-aligned social shortcuts.',
    navPosition: 'left',
    railMode: 'expanded',
    homeLayout: 'side',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'top-bar-split-hero',
    name: 'Top Bar + Split Hero',
    description: 'Horizontal header navigation over the 2-column launchpad.',
    navPosition: 'top',
    railMode: 'expanded',
    homeLayout: 'split',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'top-bar-minimal',
    name: 'Top Bar Minimalist',
    description: 'Sleek top navigation strip with distraction-free minimal search.',
    navPosition: 'top',
    railMode: 'compact',
    homeLayout: 'minimal',
    radius: 10,
    density: 'compact',
  },
  {
    id: 'dock-split-launchpad',
    name: 'Floating Dock + Launchpad',
    description: 'Bottom floating dock combined with full app shortcuts grid.',
    navPosition: 'dock',
    railMode: 'compact',
    homeLayout: 'split',
    radius: 16,
    density: 'cozy',
  },
  {
    id: 'dock-zen-focus',
    name: 'Dock Focus Mode',
    description: 'Bottom glass dock over minimal center search.',
    navPosition: 'dock',
    railMode: 'compact',
    homeLayout: 'minimal',
    radius: 18,
    density: 'spacious',
  },
  {
    id: 'right-normal-engine',
    name: 'Right Rail Search Engine',
    description: 'Right sidebar with classic centered search engine homepage.',
    navPosition: 'right',
    railMode: 'expanded',
    homeLayout: 'normal',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'right-zen-minimal',
    name: 'Right Rail Minimal',
    description: 'Right sidebar paired with minimal omnibar start screen.',
    navPosition: 'right',
    railMode: 'compact',
    homeLayout: 'minimal',
    radius: 10,
    density: 'compact',
  },
  {
    id: 'sharp-command-deck',
    name: 'Terminal Command Deck',
    description: 'Crisp 6px corners and compact rail for dense power browsing.',
    navPosition: 'left',
    railMode: 'compact',
    homeLayout: 'normal',
    radius: 6,
    density: 'compact',
  },
  {
    id: 'soft-glass-studio',
    name: 'Soft Glass Studio',
    description: 'Rounded 18px containers with roomy top navigation bar.',
    navPosition: 'top',
    railMode: 'expanded',
    homeLayout: 'side',
    radius: 18,
    density: 'spacious',
  },
  {
    id: 'wide-cinema-frame',
    name: 'Wide Cinema Focus',
    description: 'Zen auto-hide chrome for full-bleed games, movies, and browsing.',
    navPosition: 'zen',
    railMode: 'hidden',
    homeLayout: 'split',
    radius: 12,
    density: 'cozy',
  },
  {
    id: 'arcade-cabinet',
    name: 'Arcade Command Frame',
    description: 'Top navigation bar with high-density shortcut launchpad.',
    navPosition: 'top',
    railMode: 'expanded',
    homeLayout: 'side',
    radius: 8,
    density: 'compact',
  },
  {
    id: 'editorial-left-normal',
    name: 'Editorial Left + Search',
    description: 'Full left sidebar paired with centered search engine layout.',
    navPosition: 'left',
    railMode: 'expanded',
    homeLayout: 'normal',
    radius: 10,
    density: 'spacious',
  },
  {
    id: 'floating-side-dock',
    name: 'Dock + Side Shortcuts',
    description: 'Bottom floating dock paired with side-column shortcuts.',
    navPosition: 'dock',
    railMode: 'compact',
    homeLayout: 'side',
    radius: 16,
    density: 'cozy',
  },
  {
    id: 'ultra-compact-left',
    name: 'Ultra-Compact Rail',
    description: 'Icon-only left rail with minimal center search.',
    navPosition: 'left',
    railMode: 'compact',
    homeLayout: 'minimal',
    radius: 8,
    density: 'compact',
  },
  {
    id: 'zen-normal-search',
    name: 'Zen Classic Search',
    description: 'Hidden rail with clean classic search engine view.',
    navPosition: 'zen',
    railMode: 'hidden',
    homeLayout: 'normal',
    radius: 12,
    density: 'spacious',
  },
  {
    id: 'zen-side-panel',
    name: 'Zen Side Launchpad',
    description: 'Hidden rail with split side-by-side shortcuts.',
    navPosition: 'zen',
    railMode: 'hidden',
    homeLayout: 'side',
    radius: 14,
    density: 'cozy',
  },
  {
    id: 'top-compact-pill',
    name: 'Compact Top Ribbon',
    description: 'Sleek single-row header with sharp 6px controls.',
    navPosition: 'top',
    railMode: 'compact',
    homeLayout: 'split',
    radius: 6,
    density: 'compact',
  },
  {
    id: 'balanced-studio-left',
    name: 'Balanced Studio Shell',
    description: 'Soft 16px corners, expanded left rail, and minimal focus.',
    navPosition: 'left',
    railMode: 'expanded',
    homeLayout: 'minimal',
    radius: 16,
    density: 'spacious',
  },
];

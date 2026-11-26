import type { StudyModuleItem } from '../data/studyCatalog.js';
import {
  AD_BLOCK_PRELUDE_HTML,
  AD_SCRIPT_SRC_BLOCKLIST,
  INLINE_AD_SCRIPT_PATTERNS,
} from './adBlockerProxy.js';
import {
  THEMES_CATALOG,
  STUDIO_THEME_CATEGORIES,
  resolveStudioThemeCategory,
} from './themeCatalog.js';
import {
  CLASSROOM_FAVICON_URL,
  DEFAULT_WISP_URL,
  PANIC_REDIRECT_URL,
  RENDER_WISP_URL,
  STANDALONE_WINDOW_FEATURES,
  STANDALONE_WINDOW_NAME,
  VUX_AI_TARGET_URL,
  buildScramjetThemeParams,
} from './valbrowseConfig.js';
import {
  GN_COVER_URL,
  GN_HTML_URL,
  GN_SCRIPT_PORTAL_URLS,
} from './gnMathService.js';
import {
  ARCHIVE_FEATURE_FILMS_URL,
  TVMAZE_SEARCH_URL,
  TVMAZE_SHOWS_URL,
  buildArchiveMovieFallbackList,
  buildTvFallbackCatalog,
} from './cinemaCatalog.js';
import {
  VUX_AUDIO_STATIONS,
  VUX_AMBIENT_LAYERS,
} from '../data/vuxAudioCatalog.js';
import {
  VUX_CHAT_CHANNELS,
  VUX_BADGE_DEFS,
  getInitialVuxChatMessages,
} from './vuxFeatures.js';
import { getFallbackUgsCatalog, UGS_CDN_BASE } from './ugsCatalog.js';
import { getFallbackCkvCatalog, CKV_CDN_BASE } from './ckvCatalog.js';
import {
  SERAPH_CDN_BASE,
  SERAPH_INDEX_MIRRORS,
  getFallbackSeraphCatalog,
} from './seraphCatalog.js';
import {
  GMSHELF_SOURCES,
  getFallbackGmshelfCatalog,
} from './gmshelfCatalog.js';
import { FUN_FACTS } from '../data/funFacts.js';
import {
  ANIMATED_BG_CATEGORIES,
  ANIMATED_BG_PRESETS,
  DYNAMIC_COLOR_BG_CATEGORIES,
  DYNAMIC_COLOR_BG_PRESETS,
  FONT_CATEGORIES,
  FONT_LIBRARY_CATALOG,
  LAYOUT_PRESETS,
} from '../data/studioCatalogs.js';

const VUX_CREST_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:76%;height:76%;display:block;" aria-hidden="true"><defs><linearGradient id="vuxPrismG" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff6b8b"/><stop offset="55%" stop-color="#ff3b6b"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><path d="M18 2.5L31.5 10.2V25.8L18 33.5L4.5 25.8V10.2L18 2.5Z" fill="url(#vuxPrismG)" fill-opacity="0.22" stroke="url(#vuxPrismG)" stroke-width="1.8"/><path d="M9.8 11.8L18 27L26.2 11.8H22L18 19.6L14 11.8H9.8Z" fill="#ffffff"/><path d="M18 19.6L22 11.8H26.2L18 27V19.6Z" fill="url(#vuxPrismG)" fill-opacity="0.9"/><circle cx="18" cy="7.8" r="1.4" fill="#ffffff"/></svg>`;

const VUX_AI_CREST_SVG = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="vuxAiCoreG" x1="3" y1="3" x2="25" y2="25" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff5c7c"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient></defs><polygon points="14,2.2 24.5,8.2 24.5,19.8 14,25.8 3.5,19.8 3.5,8.2" stroke="url(#vuxAiCoreG)" stroke-width="1.8" fill="url(#vuxAiCoreG)" fill-opacity="0.16"/><path d="M8.6 9.5L14 19.5L19.4 9.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="8.2" r="1.5" fill="url(#vuxAiCoreG)"/></svg>`;

function serializeSafe(value: unknown): string {
  return JSON.stringify(value).replace(/<\//g, '<\\/');
}

export function buildValBrowseBlobHtml(
  appOrigin: string,
  staticModules: StudyModuleItem[]
): string {
  const cleanOrigin = String(appOrigin || '').replace(/\/+$/, '');
  const scramjetSrc = `${cleanOrigin}/scramjet-browser.html?${buildScramjetThemeParams()}`;

  const dataPayload = serializeSafe({
    origin: cleanOrigin,
    originUrl: cleanOrigin,
    scramjetSrc,
    defaultWisp: DEFAULT_WISP_URL,
    renderWispUrl: RENDER_WISP_URL,
    vuxAiTargetUrl: VUX_AI_TARGET_URL,
    panicUrl: PANIC_REDIRECT_URL,
    classroomFavicon: CLASSROOM_FAVICON_URL,
    standaloneWindowName: STANDALONE_WINDOW_NAME,
    standaloneWindowFeatures: STANDALONE_WINDOW_FEATURES,
    themePresets: THEMES_CATALOG.map((t) => ({
      ...t,
      studioCategory: resolveStudioThemeCategory(t),
    })),
    studioThemeCategories: STUDIO_THEME_CATEGORIES,
    funFacts: FUN_FACTS,
    animatedBgPresets: ANIMATED_BG_PRESETS,
    animatedBgCategories: ANIMATED_BG_CATEGORIES,
    dynamicColorBgPresets: DYNAMIC_COLOR_BG_PRESETS,
    dynamicColorBgCategories: DYNAMIC_COLOR_BG_CATEGORIES,
    fontLibrary: FONT_LIBRARY_CATALOG,
    fontCategories: FONT_CATEGORIES,
    layoutPresets: LAYOUT_PRESETS,
    gnCoverUrl: GN_COVER_URL,
    gnHtmlUrl: GN_HTML_URL,
    gnScriptUrls: GN_SCRIPT_PORTAL_URLS,
    staticModules: staticModules.map((m) => ({
      id: 'builtin:' + m.slug,
      provider: 'builtin',
      name: m.title,
      category: m.category,
      url: m.url.startsWith('/') ? `${cleanOrigin}${m.url}` : m.url,
      featured: true,
    })),
    fallbackUgs: getFallbackUgsCatalog(UGS_CDN_BASE).map((g) => ({ ...g, provider: 'ugs' })),
    fallbackCkv: getFallbackCkvCatalog(CKV_CDN_BASE).map((g) => ({ ...g, provider: 'ckv' })),
    seraphCdnBase: SERAPH_CDN_BASE,
    seraphIndexMirrors: SERAPH_INDEX_MIRRORS,
    fallbackSeraph: getFallbackSeraphCatalog(SERAPH_CDN_BASE),
    gmshelfSources: GMSHELF_SOURCES,
    fallbackGmshelf: getFallbackGmshelfCatalog(),
    tvmazeShowsUrl: TVMAZE_SHOWS_URL,
    tvmazeSearchUrl: TVMAZE_SEARCH_URL,
    archiveFeatureFilmsUrl: ARCHIVE_FEATURE_FILMS_URL,
    cinemaFallbackShows: buildTvFallbackCatalog(),
    cinemaFallbackMovies: buildArchiveMovieFallbackList(),
    audioStations: VUX_AUDIO_STATIONS,
    ambientLayers: VUX_AMBIENT_LAYERS,
    chatChannels: VUX_CHAT_CHANNELS,
    badgeDefs: VUX_BADGE_DEFS,
    initialChatMessages: getInitialVuxChatMessages(),
    adPrelude: AD_BLOCK_PRELUDE_HTML,
    srcBlocklist: AD_SCRIPT_SRC_BLOCKLIST.map((r) => ({ source: r.source, flags: r.flags })),
    inlineBlocklist: INLINE_AD_SCRIPT_PATTERNS.map((r) => ({ source: r.source, flags: r.flags })),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vux — Isolated Workspace</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0b0608;
      --rail: #080406;
      --surface: #140b0e;
      --surface-2: #1b0f13;
      --text: #fdf2f4;
      --muted: #9f878f;
      --accent: #ff5c7c;
      --accent-hover: #ff456b;
      --accent-text: #19070d;
      --accent-soft: rgba(255, 92, 124, 0.14);
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --ui-radius: 12px;
      --glow-strength: 1;
      --glass-blur: 14px;
      --font-scale: 1;
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
      --ease-spring: cubic-bezier(0.34, 1.45, 0.64, 1);
      --font-display: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-ui: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg);
    }

    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: transparent;
      color: var(--text);
      font-family: var(--font-ui);
      -webkit-font-smoothing: antialiased;
    }

    body[data-reduced-motion="1"] *,
    body[data-reduced-motion="1"] *::before,
    body[data-reduced-motion="1"] *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }

    .app-shell {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      background: var(--bg);
      position: relative;
    }

    /* Collapsible Left Glassmorphic Sidebar Rail (Expanded -> Compact -> Hidden) */
    .rail {
      width: 232px;
      height: 100%;
      background: color-mix(in srgb, var(--rail) 94%, transparent);
      backdrop-filter: blur(var(--glass-blur));
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      flex-shrink: 0;
      z-index: 40;
      transition: width 0.24s var(--ease), margin-left 0.24s var(--ease), padding 0.24s var(--ease), opacity 0.2s var(--ease);
      overflow: hidden;
    }

    .rail.compact {
      width: 58px;
      padding: 10px 8px;
    }

    .rail.hidden-rail {
      width: 232px;
      margin-left: -232px;
      opacity: 0;
      pointer-events: none;
    }

    .rail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 2px 2px 8px;
      margin-bottom: 4px;
      border-bottom: 1px solid var(--border);
      min-height: 40px;
    }

    .rail.compact .rail-header {
      justify-content: center;
      padding: 2px 0 8px;
    }

    .rail-brand {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      overflow: hidden;
    }

    .rail.compact .rail-brand {
      display: none;
    }

    .rail-logo-mark {
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: color-mix(in srgb, var(--accent) 14%, var(--surface));
      border: 1px solid color-mix(in srgb, var(--accent) 44%, transparent);
      box-shadow: 0 4px 14px var(--accent-soft);
      color: var(--text);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .rail-logo-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 16px;
      letter-spacing: -0.03em;
      color: var(--text);
      white-space: nowrap;
    }

    .rail-collapse-btn {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s var(--ease), color 0.15s var(--ease), border-color 0.15s var(--ease), transform 0.2s var(--ease);
    }

    .rail-collapse-btn:hover {
      border-color: var(--accent);
      color: var(--text);
      background: var(--surface-2);
    }

    .rail.compact .rail-collapse-btn svg {
      transform: rotate(180deg);
    }

    .rail-reopen-btn {
      position: fixed;
      top: 52px;
      left: 10px;
      z-index: 45;
      height: 32px;
      padding: 0 11px;
      border-radius: 9px;
      border: 1px solid var(--border-strong);
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      backdrop-filter: blur(12px);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 12px;
      font-weight: 700;
      display: none;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      transition: border-color 0.15s var(--ease), transform 0.15s var(--ease);
    }

    .rail-reopen-btn.visible {
      display: inline-flex;
    }

    .rail-reopen-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateY(-1px);
    }

    .rail-top, .rail-bottom {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .rail-group-label {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--muted);
      padding: 8px 10px 3px;
      white-space: nowrap;
      opacity: 0.78;
      height: auto;
      overflow: hidden;
      transition: opacity 0.18s var(--ease), height 0.18s var(--ease), padding 0.18s var(--ease);
    }

    .rail.compact .rail-group-label {
      opacity: 0;
      height: 0;
      padding: 0;
    }

    .rail-divider {
      height: 1px;
      background: var(--border);
      margin: 5px 4px;
    }

    .rail-btn {
      width: 100%;
      height: 37px;
      padding: 0 10px;
      border-radius: calc(var(--ui-radius) - 2px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      font-family: var(--font-ui);
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 11px;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.16s var(--ease), color 0.16s var(--ease), border-color 0.16s var(--ease);
    }

    .rail-btn svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .rail-btn:hover {
      background: var(--accent-soft);
      color: var(--text);
    }

    .rail-btn.active {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent);
    }

    .rail-btn.panic {
      color: #f43f5e;
    }

    .rail-btn.panic:hover {
      background: rgba(244, 63, 94, 0.16);
      border-color: rgba(244, 63, 94, 0.45);
      color: #fb7185;
    }

    .rail-label {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 1;
      transition: opacity 0.16s var(--ease);
    }

    .rail.compact .rail-label {
      opacity: 0;
      width: 0;
    }

    .rail-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      padding: 2px 6px;
      border-radius: 6px;
      background: var(--surface-2);
      color: var(--muted);
      display: inline-block;
    }

    .rail.compact .rail-badge {
      display: none;
    }

    /* Main Stage */
    .stage-wrap {
      flex: 1;
      min-width: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      background: var(--bg);
    }

    .mobile-bar {
      display: none;
      height: 42px;
      padding: 0 12px;
      background: var(--rail);
      border-bottom: 1px solid var(--border);
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-shrink: 0;
    }

    .view-panel {
      position: relative;
      flex: 1;
      min-height: 0;
      display: none;
      overflow: hidden;
    }

    .view-panel.active {
      display: flex;
      flex-direction: column;
      animation: vuxPanelIn 0.32s var(--ease);
    }

    @keyframes vuxPanelIn {
      from { opacity: 0; transform: translateY(8px) scale(0.994); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .view-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 20px 24px 36px;
      background-color: var(--bg);
      background-image:
        radial-gradient(ellipse 68% 50% at 14% 8%, color-mix(in srgb, var(--accent) calc(16% * var(--glow-strength)), transparent), transparent 72%),
        radial-gradient(ellipse 52% 46% at 88% 82%, color-mix(in srgb, var(--accent) calc(11% * var(--glow-strength)), transparent), transparent 74%),
        linear-gradient(to right, color-mix(in srgb, var(--text) 3.5%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--text) 3.5%, transparent) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
    }

    body[data-bg-style="topo"] .view-scroll {
      background-image:
        radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--accent) calc(15% * var(--glow-strength)), transparent), transparent 55%),
        repeating-radial-gradient(circle at 18% 85%, transparent 0 36px, color-mix(in srgb, var(--text) 4%, transparent) 36px 37px);
      background-size: 100% 100%, 100% 100%;
    }

    body[data-bg-style="glass"] .view-scroll {
      background-image:
        radial-gradient(ellipse 75% 42% at 50% 0%, color-mix(in srgb, var(--accent) calc(20% * var(--glow-strength)), transparent), transparent 72%),
        linear-gradient(160deg, var(--bg) 0%, var(--rail) 100%);
      background-size: 100% 100%, 100% 100%;
    }

    body[data-bg-style="grid"] .view-scroll {
      background-image:
        linear-gradient(to right, color-mix(in srgb, var(--accent) 7%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--accent) 7%, transparent) 1px, transparent 1px);
      background-size: 32px 32px, 32px 32px;
    }

    body[data-bg-style="matte"] .view-scroll {
      background-image: none;
    }

    .container {
      max-width: 1420px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    @keyframes vbFade {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .section-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
    }

    .eyebrow {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .h1 {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.025em;
      color: var(--text);
      margin-top: 3px;
    }

    .sub {
      font-size: 12px;
      color: var(--muted);
    }

    /* Controls & Pills */
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .pill-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .pill-btn {
      height: 32px;
      padding: 0 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      font-family: var(--font-ui);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s var(--ease), color 0.15s var(--ease), border-color 0.15s var(--ease);
    }

    .pill-btn:hover {
      background: var(--surface-2);
      color: var(--text);
    }

    .pill-btn.active {
      background: var(--accent);
      border-color: transparent;
      color: var(--accent-text);
      font-weight: 700;
    }

    .btn {
      height: 34px;
      padding: 0 12px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
      text-decoration: none;
      transition: background 0.15s var(--ease), border-color 0.15s var(--ease);
    }

    .btn:hover {
      background: var(--surface-2);
      border-color: var(--border-strong);
    }

    .btn-primary {
      background: var(--accent);
      border-color: transparent;
      color: var(--accent-text);
      font-weight: 700;
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      color: var(--accent-text);
    }

    .input, .select {
      height: 34px;
      padding: 0 12px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 13px;
      outline: none;
    }

    .input:focus, .select:focus {
      border-color: var(--accent);
    }

    /* Card Grids */
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
      gap: 12px;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
      gap: 14px;
    }

    .cinema-poster-wrap {
      position: relative;
      aspect-ratio: 2 / 3;
      background: var(--bg);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cinema-poster-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.24s var(--ease);
    }

    .card:hover .cinema-poster-wrap img {
      transform: scale(1.045);
    }

    .rating-chip {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 3;
      padding: 2px 7px;
      border-radius: 6px;
      background: rgba(8, 4, 6, 0.86);
      border: 1px solid rgba(251, 191, 36, 0.45);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      color: #fcd34d;
    }

    .theater-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 20px 28px;
      background: var(--bg);
    }

    .theater-inner {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .overlay.theater-wide .theater-inner {
      max-width: 100%;
    }

    .theater-source-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
    }

    .theater-player-box {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      max-height: 50vh;
      flex-shrink: 0;
      background: #000;
      border-radius: 14px;
      border: 1px solid var(--border-strong);
      overflow: hidden;
    }

    .overlay.theater-wide .theater-player-box {
      max-height: 66vh;
    }

    .theater-player-box iframe,
    .theater-player-box video {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    .theater-fallback {
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
      text-align: center;
      background: radial-gradient(circle at center, rgba(255, 92, 124, 0.08), rgba(8, 4, 6, 0.96));
      z-index: 4;
    }

    .theater-fallback.open {
      display: flex;
    }

    .episodes-strip {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 8px;
      max-height: 220px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .episode-btn {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 9px 11px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      text-align: left;
      cursor: pointer;
      transition: border-color 0.14s var(--ease), background 0.14s var(--ease);
    }

    .episode-btn:hover {
      border-color: var(--accent);
    }

    .episode-btn.active {
      border-color: var(--accent);
      background: var(--accent-soft);
    }

    .artist-dir-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
      gap: 8px;
      max-height: 220px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .artist-chip-btn {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 10px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      text-align: left;
      cursor: pointer;
      transition: border-color 0.14s var(--ease), transform 0.12s var(--ease);
    }

    .artist-chip-btn:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .artist-chip-btn.active {
      border-color: var(--accent);
      background: var(--accent-soft);
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 14px;
    }

    .card {
      position: relative;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: transform 0.16s var(--ease), border-color 0.16s var(--ease), background 0.16s var(--ease);
    }

    .card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
      background: var(--surface-2);
    }

    .thumb-wrap {
      position: relative;
      aspect-ratio: 16 / 10;
      background: var(--bg);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.22s var(--ease);
    }

    .card:hover .thumb-wrap img {
      transform: scale(1.04);
    }

    .thumb-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      background: linear-gradient(135deg, var(--surface-2) 0%, var(--bg) 100%);
      padding: 10px;
      text-align: center;
    }

    .provider-chip {
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 3;
      padding: 2px 7px;
      border-radius: 6px;
      background: var(--rail);
      border: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      color: var(--accent);
    }

    .fav-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 3;
      width: 28px;
      height: 28px;
      border-radius: 7px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(8, 4, 6, 0.78);
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
    }

    .fav-btn.is-fav {
      color: #fbbf24;
      border-color: rgba(251, 191, 36, 0.45);
      background: rgba(251, 191, 36, 0.16);
    }

    .card-body {
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-meta {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Fullscreen Overlays (Study Module Player, Movie Theater, Book Reader, Settings) */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 90;
      background: #070405;
      display: none;
      flex-direction: column;
    }

    .overlay.open {
      display: flex;
    }

    .overlay-bar {
      height: 48px;
      padding: 0 14px;
      background: var(--rail);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }

    .overlay-stage {
      position: relative;
      flex: 1;
      min-height: 0;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .overlay-stage iframe, .overlay-stage video {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    .overlay-status {
      position: absolute;
      inset: 0;
      background: rgba(11, 6, 8, 0.94);
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 20px;
      text-align: center;
      z-index: 5;
    }

    .overlay-status.open {
      display: flex;
    }

    .spinner {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid var(--accent-soft);
      border-top-color: var(--accent);
      animation: vbSpin 0.75s linear infinite;
    }

    @keyframes vbSpin { to { transform: rotate(360deg); } }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 95;
      background: rgba(5, 2, 3, 0.78);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal-card {
      width: 100%;
      max-width: 760px;
      max-height: 88vh;
      overflow-y: auto;
      background: var(--surface);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 24px 56px rgba(0, 0, 0, 0.65);
    }

    .settings-nav {
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
      flex-wrap: wrap;
    }

    .settings-pane {
      display: none;
      flex-direction: column;
      gap: 14px;
    }

    .settings-pane.active {
      display: flex;
    }

    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      flex-wrap: wrap;
    }

    .setting-row-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .setting-row-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text);
    }

    .setting-row-desc {
      font-size: 11px;
      color: var(--muted);
    }

    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
      gap: 8px;
      max-height: 250px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .preset-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.15s var(--ease), transform 0.12s var(--ease);
    }

    .preset-item:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .preset-item.active {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-soft);
    }

    .preset-swatches {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    .preset-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      border: 1px solid rgba(128, 128, 128, 0.45);
    }

    .preset-dot + .preset-dot {
      margin-left: -4px;
    }

    .vb-toast {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 120;
      max-width: 390px;
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--accent);
      color: var(--text);
      font-size: 12px;
      line-height: 1.45;
      box-shadow: 0 18px 42px rgba(0, 0, 0, 0.55);
      display: none;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .vb-toast.open {
      display: flex;
    }

    .music-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
    }

    .panel-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .book-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      gap: 12px;
    }

    .book-cover {
      width: 66px;
      height: 98px;
      border-radius: 8px;
      object-fit: cover;
      background: #080406;
      flex-shrink: 0;
    }

    @media (max-width: 760px) {
      .rail {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);
        width: 232px;
      }
      .rail.mobile-open {
        transform: translateX(0);
      }
      .rail.mobile-open .rail-label { opacity: 1; }
      .rail.mobile-open .rail-group-label { opacity: 0.78; height: auto; }
      .rail.mobile-open .rail-badge { display: inline-block; }
      .mobile-bar { display: flex; }
    }

    /* ---------------- ANIMATED CANVAS & DYNAMIC COLOR BACKGROUND LAYERS ---------------- */
    .vb-dynamic-bg {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.45s ease;
    }

    body[data-dyn-bg-on="1"] .vb-dynamic-bg {
      opacity: var(--dyn-bg-opacity, 0.72);
    }

    .vb-bg-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    body[data-anim-bg-on="1"] .vb-bg-canvas {
      opacity: var(--anim-bg-opacity, 0.72);
    }

    .app-shell {
      z-index: 3;
      background: transparent;
    }

    .stage-wrap {
      background: transparent;
    }

    body[data-anim-bg-on="1"] .view-scroll,
    body[data-dyn-bg-on="1"] .view-scroll {
      background-color: color-mix(in srgb, var(--bg) 52%, transparent);
      background-image: none;
    }

    /* ---------------- 5-POSITION STUDIO LAYOUT MODES ---------------- */
    body[data-nav-pos="right"] .app-shell {
      flex-direction: row-reverse;
    }
    body[data-nav-pos="right"] .rail {
      border-right: none;
      border-left: 1px solid var(--border);
    }
    body[data-nav-pos="right"] .rail.hidden-rail {
      margin-left: 0;
      margin-right: -232px;
    }
    body[data-nav-pos="right"] .rail-reopen-btn {
      left: auto;
      right: 10px;
    }

    body[data-nav-pos="top"] .app-shell {
      flex-direction: column;
    }
    body[data-nav-pos="top"] .rail {
      width: 100% !important;
      height: 48px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 4px 10px;
      border-right: none;
      border-bottom: 1px solid var(--border);
      gap: 6px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: thin;
    }
    body[data-nav-pos="top"] .rail::-webkit-scrollbar { height: 3px; }
    body[data-nav-pos="top"] .rail-top,
    body[data-nav-pos="top"] .rail-bottom {
      flex-direction: row;
      align-items: center;
      gap: 3px;
      flex-shrink: 0;
    }
    body[data-nav-pos="top"] .rail-header {
      border-bottom: none;
      margin-bottom: 0;
      padding: 0 6px 0 0;
      min-height: 32px;
    }
    body[data-nav-pos="top"] .rail-group-label,
    body[data-nav-pos="top"] .rail-divider,
    body[data-nav-pos="top"] .rail-ai-quick-wrap,
    body[data-nav-pos="top"] .rail-collapse-btn,
    body[data-nav-pos="top"] #btn-rail-hide {
      display: none !important;
    }
    body[data-nav-pos="top"] .rail-btn {
      width: auto;
      height: 30px;
      padding: 0 8px;
      gap: 5px;
      font-size: 11px;
      flex-shrink: 0;
    }
    body[data-nav-pos="top"] .rail-btn svg {
      width: 14px;
      height: 14px;
    }
    body[data-nav-pos="top"] .rail-label {
      opacity: 1 !important;
      width: auto !important;
    }
    body[data-nav-pos="top"] .rail-badge {
      display: none !important;
    }

    body[data-nav-pos="dock"] .rail {
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: auto !important;
      max-width: calc(100vw - 24px);
      height: 56px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 6px 10px;
      border: 1px solid var(--border-strong);
      border-radius: calc(var(--ui-radius) + 6px);
      box-shadow: 0 22px 52px rgba(0, 0, 0, 0.58);
      z-index: 65;
      gap: 5px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    body[data-nav-pos="dock"] .rail::-webkit-scrollbar { display: none; }
    body[data-nav-pos="dock"] .rail-top,
    body[data-nav-pos="dock"] .rail-bottom {
      flex-direction: row;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    body[data-nav-pos="dock"] .rail-header,
    body[data-nav-pos="dock"] .rail-group-label,
    body[data-nav-pos="dock"] .rail-divider,
    body[data-nav-pos="dock"] .rail-label,
    body[data-nav-pos="dock"] .rail-badge {
      display: none !important;
    }
    body[data-nav-pos="dock"] .rail-btn {
      width: 40px;
      height: 40px;
      padding: 0;
      justify-content: center;
      border-radius: calc(var(--ui-radius));
      flex-shrink: 0;
    }

    body[data-nav-pos="zen"] .rail {
      width: 232px;
      margin-left: -232px;
      opacity: 0;
      pointer-events: none;
    }
    body[data-nav-pos="zen"] .rail-reopen-btn {
      display: inline-flex;
    }

    body[data-density="compact"] .view-scroll { padding: 14px 16px 26px; }
    body[data-density="compact"] .container { gap: 12px; }
    body[data-density="spacious"] .view-scroll { padding: 28px 34px 48px; }
    body[data-density="spacious"] .container { gap: 22px; }

    /* ---------------- VUX.AI DEDICATED GLASSMORPHIC WORKSPACE ---------------- */
    .vux-ai-shell {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 12px 14px 14px;
      gap: 10px;
      min-height: 0;
    }
    .vux-ai-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding: 10px 14px;
      border-radius: calc(var(--ui-radius) + 2px);
      background: color-mix(in srgb, var(--surface) 84%, transparent);
      backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--border-strong);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
    }
    .vux-ai-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .vux-ai-crest-box {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent) 16%, var(--surface-2));
      border: 1px solid color-mix(in srgb, var(--accent) 42%, transparent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px var(--accent-soft);
    }
    .vux-ai-crest-box svg {
      width: 22px;
      height: 22px;
    }
    .vux-ai-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 8px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
    }
    .vux-ai-stage {
      flex: 1;
      min-height: 0;
      position: relative;
      border-radius: calc(var(--ui-radius) + 4px);
      border: 1px solid var(--border-strong);
      background: color-mix(in srgb, var(--surface) 78%, #070408 22%);
      backdrop-filter: blur(var(--glass-blur));
      overflow: hidden;
      box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
    }
    .vux-ai-stage iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
      background: #0d090f;
    }

    /* ---------------- ANIMATED LOADING SCREEN & WELCOME OVERLAY ---------------- */
    .vb-loader {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      transition: opacity 0.42s var(--ease), visibility 0.42s ease;
    }
    .vb-loader.done {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .vb-loader-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .vb-loader-card {
      position: relative;
      z-index: 2;
      width: min(560px, 100%);
      padding: 26px 24px;
      border-radius: 18px;
      background: color-mix(in srgb, var(--surface) 88%, transparent);
      backdrop-filter: blur(18px);
      border: 1px solid var(--border-strong);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.65);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .vb-loader-bar-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .vb-loader-bar-fill {
      width: 12%;
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #ffffff));
      transition: width 0.25s ease;
    }
    .vb-loader-fact-box {
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .vb-welcome-backdrop {
      position: fixed;
      inset: 0;
      z-index: 180;
      background: rgba(5, 2, 3, 0.76);
      backdrop-filter: blur(10px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 18px;
    }
    .vb-welcome-backdrop.open {
      display: flex;
    }
    .vb-welcome-card {
      width: min(680px, 100%);
      max-height: 90vh;
      overflow-y: auto;
      padding: 24px;
      border-radius: 18px;
      background: var(--surface);
      border: 1px solid var(--border-strong);
      box-shadow: 0 28px 72px rgba(0, 0, 0, 0.72);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .vb-welcome-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }
    .vb-welcome-tile {
      padding: 12px;
      border-radius: 12px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 4px;
      text-align: left;
      cursor: pointer;
      color: var(--text);
      font-family: var(--font-ui);
      transition: border-color 0.15s var(--ease), transform 0.14s var(--ease);
    }
    .vb-welcome-tile:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    /* ---------------- STUDIO GRIDS ---------------- */
    .studio-modal-card {
      max-width: 940px;
    }
    .studio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
      gap: 8px;
      max-height: 330px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .studio-card-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 9px 11px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      text-align: left;
      cursor: pointer;
      transition: border-color 0.15s var(--ease), transform 0.12s var(--ease);
    }
    .studio-card-btn:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .studio-card-btn.active {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-soft);
    }
    .dyn-swatch-bar {
      width: 100%;
      height: 18px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.14);
    }

    /* ---------------- SMOOTH MICRO-INTERACTIONS & GLASS OVERHAUL ---------------- */
    .card, .panel-box, .studio-card-btn, .preset-item {
      transition: transform 0.24s var(--ease-spring), border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.24s var(--ease);
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.34);
    }
    .modal-backdrop.open .modal-card,
    .vb-welcome-backdrop.open .vb-welcome-card {
      animation: vuxModalPop 0.28s var(--ease-spring);
    }
    @keyframes vuxModalPop {
      from { opacity: 0; transform: scale(0.955) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    body[data-has-fx="1"] .rail {
      background: color-mix(in srgb, var(--rail) 78%, transparent);
    }
    body[data-has-fx="1"] .panel-box,
    body[data-has-fx="1"] .card {
      background: color-mix(in srgb, var(--surface) 74%, transparent);
      backdrop-filter: blur(var(--glass-blur));
    }

    /* ---------------- ONLINE STATUS & LIVE PERF PILL ---------------- */
    .vux-online-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 5px 9px;
      margin: 2px 0 4px;
      border-radius: 9px;
      background: color-mix(in srgb, #10b981 12%, var(--surface));
      border: 1px solid rgba(16, 185, 129, 0.32);
      font-size: 11px;
      font-weight: 700;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
    }
    .rail.compact .vux-online-badge,
    body[data-nav-pos="top"] .vux-online-badge,
    body[data-nav-pos="dock"] .vux-online-badge {
      display: none !important;
    }
    .vux-online-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.85);
      animation: vuxPulseDot 1.9s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes vuxPulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.28); opacity: 0.72; }
    }
    .vux-perf-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 6px 8px;
      border-radius: 9px;
      background: var(--surface);
      border: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--muted);
      margin-bottom: 2px;
    }
    .rail.compact .vux-perf-pill,
    body[data-nav-pos="top"] .vux-perf-pill,
    body[data-nav-pos="dock"] .vux-perf-pill {
      display: none !important;
    }
    .vux-wake-btn {
      border: 1px solid var(--border-strong);
      background: var(--accent-soft);
      color: var(--accent);
      border-radius: 6px;
      padding: 2px 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.16s ease, transform 0.14s ease;
    }
    .vux-wake-btn:hover { background: var(--accent); color: var(--accent-text); }

    /* ---------------- VUX CHAT (DISCORD STYLE) ---------------- */
    .vux-chat-shell {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 224px minmax(0, 1fr);
      height: 100%;
    }
    @media (max-width: 820px) {
      .vux-chat-shell { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); }
    }
    .chat-sidebar {
      background: color-mix(in srgb, var(--rail) 84%, transparent);
      backdrop-filter: blur(var(--glass-blur));
      border-right: 1px solid var(--border);
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      overflow-y: auto;
    }
    .chat-ch-btn {
      width: 100%;
      padding: 8px 10px;
      border-radius: 9px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      font-family: var(--font-ui);
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      text-align: left;
      transition: background 0.16s var(--ease), color 0.16s var(--ease), border-color 0.16s var(--ease);
    }
    .chat-ch-btn:hover { background: var(--surface-2); color: var(--text); }
    .chat-ch-btn.active { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }
    .chat-main {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      background: color-mix(in srgb, var(--bg) 60%, transparent);
      backdrop-filter: blur(6px);
    }
    .chat-topbar {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      background: color-mix(in srgb, var(--surface) 78%, transparent);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .chat-messages {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .chat-msg {
      position: relative;
      display: flex;
      gap: 12px;
      padding: 8px 10px;
      border-radius: 11px;
      border: 1px solid transparent;
      transition: background 0.15s ease, border-color 0.15s ease;
      animation: vbFade 0.2s var(--ease);
    }
    .chat-msg:hover {
      background: color-mix(in srgb, var(--surface) 76%, transparent);
      border-color: var(--border);
    }
    .chat-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 14px;
      color: #fff;
      flex-shrink: 0;
    }
    .chat-msg-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .chat-msg-head { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
    .chat-msg-user { font-size: 13px; font-weight: 700; color: var(--text); }
    .chat-msg-time { font-family: var(--font-mono); font-size: 10px; color: var(--muted); }
    .chat-reply-quote {
      font-size: 11px;
      color: var(--muted);
      padding: 4px 8px;
      border-left: 2px solid var(--accent);
      background: var(--surface-2);
      border-radius: 4px;
    }
    .chat-msg-text { font-size: 13px; line-height: 1.48; color: var(--text); word-break: break-word; }
    .chat-reactions { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 2px; }
    .chat-react-pill {
      padding: 2px 7px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 11px;
      cursor: pointer;
    }
    .chat-react-pill:hover { border-color: var(--accent); background: var(--accent-soft); }
    .chat-hover-tools {
      position: absolute;
      top: 6px;
      right: 8px;
      display: flex;
      gap: 4px;
      opacity: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2px 4px;
      transition: opacity 0.14s ease;
    }
    .chat-msg:hover .chat-hover-tools { opacity: 1; }
    .chat-tool-btn {
      border: none;
      background: transparent;
      color: var(--muted);
      font-size: 12px;
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 5px;
    }
    .chat-tool-btn:hover { background: var(--accent-soft); color: var(--text); }
    .chat-composer-wrap {
      padding: 10px 16px 14px;
      border-top: 1px solid var(--border);
      background: color-mix(in srgb, var(--surface) 84%, transparent);
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    /* ---------------- STUDYHUB ALL-IN-ONE MP3 PLAYER & AMBIENT MIXER ---------------- */
    .mp3-station-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 10px;
    }
    .mp3-station-card {
      padding: 11px 12px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: transform 0.2s var(--ease-spring), border-color 0.18s ease, background 0.18s ease;
    }
    .mp3-station-card:hover { border-color: var(--accent); transform: translateY(-2px); }
    .mp3-station-card.active {
      border-color: var(--accent);
      background: var(--accent-soft);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
    }
    .ambient-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--surface-2);
      border: 1px solid var(--border);
    }

    /* ---------------- COMMAND PALETTE, PIP, NOTES, BADGES, CURSOR ---------------- */
    .vux-cursor-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 160;
      pointer-events: none;
    }
    .vux-cmd-backdrop {
      position: fixed;
      inset: 0;
      z-index: 190;
      background: rgba(5, 2, 3, 0.72);
      backdrop-filter: blur(8px);
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: 9vh 16px 20px;
    }
    .vux-cmd-backdrop.open { display: flex; }
    .vux-cmd-card {
      width: min(620px, 100%);
      background: color-mix(in srgb, var(--surface) 96%, transparent);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      box-shadow: 0 28px 72px rgba(0, 0, 0, 0.72);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: vuxModalPop 0.22s var(--ease-spring);
    }
    .vux-cmd-results { max-height: 360px; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .vux-cmd-item {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      text-align: left;
      font-family: var(--font-ui);
    }
    .vux-cmd-item:hover, .vux-cmd-item.selected { background: var(--accent-soft); border-color: var(--accent); }

    .vux-notes-drawer {
      position: fixed;
      top: 14px;
      right: 14px;
      bottom: 14px;
      width: min(360px, 92vw);
      z-index: 84;
      background: color-mix(in srgb, var(--surface) 95%, transparent);
      backdrop-filter: blur(18px);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      box-shadow: 0 22px 54px rgba(0, 0, 0, 0.65);
      display: flex;
      flex-direction: column;
      padding: 14px;
      gap: 10px;
      transform: translateX(115%);
      transition: transform 0.28s var(--ease);
      pointer-events: none;
    }
    .vux-notes-drawer.open { transform: translateX(0); pointer-events: auto; }

    .vux-pip-widget {
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 440px;
      height: 300px;
      min-width: 280px;
      min-height: 180px;
      max-width: 92vw;
      max-height: 84vh;
      resize: both;
      overflow: hidden;
      z-index: 150;
      border-radius: 14px;
      background: var(--surface);
      border: 1px solid var(--accent);
      box-shadow: 0 26px 64px rgba(0, 0, 0, 0.7);
      display: none;
      flex-direction: column;
    }
    .vux-pip-widget.open { display: flex; animation: vuxModalPop 0.24s var(--ease-spring); }
    .vux-pip-widget.minimized { height: 40px !important; min-height: 40px !important; resize: none; }
    .vux-pip-head {
      height: 40px;
      padding: 0 10px;
      background: var(--rail);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: move;
      user-select: none;
      flex-shrink: 0;
    }
    .vux-pip-body { flex: 1; min-height: 0; background: #000; position: relative; }
    .vux-pip-body iframe { width: 100%; height: 100%; border: 0; display: block; background: #fff; }
  </style>
  <style id="vux-user-custom-css"></style>
</head>
<body>
  <div class="vb-dynamic-bg" id="vb-dynamic-bg" aria-hidden="true"></div>
  <canvas class="vb-bg-canvas" id="vb-bg-canvas" aria-hidden="true"></canvas>
  <canvas class="vux-cursor-canvas" id="vux-cursor-canvas" aria-hidden="true"></canvas>

  <div class="app-shell">
    <button type="button" class="rail-reopen-btn" id="btn-rail-reopen" aria-label="Show Sidebar Menu">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Vux Menu</span>
    </button>

    <!-- Collapsible Glassmorphic Sidebar Rail -->
    <aside class="rail" id="rail" aria-label="Vux Navigation">
      <div class="rail-top">
        <div class="rail-header">
          <div class="rail-brand">
            <span class="rail-logo-mark">${VUX_CREST_SVG}</span>
            <span class="rail-logo-name">Vux</span>
          </div>
          <button type="button" class="rail-collapse-btn" id="btn-rail-toggle" aria-expanded="true" aria-label="Collapse or Expand Sidebar" title="Collapse / Expand Sidebar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>

        <div class="vux-online-badge" id="vux-online-badge" title="Active Vux browser sessions">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span class="vux-online-dot" aria-hidden="true"></span>
            <span>Online Now</span>
          </span>
          <span id="vux-online-count" style="font-family:var(--font-mono);color:#4ade80;">1 active</span>
        </div>

        <button type="button" class="rail-btn" id="btn-rail-cmdk" aria-label="Quick Command Search (Ctrl+K)" title="Quick Search (Ctrl+K)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span class="rail-label">Command Search</span>
          <span class="rail-badge">Ctrl+K</span>
        </button>

        <button type="button" class="rail-btn active" data-view="browser" aria-label="Vux Proxy Browser" title="Vux Proxy Browser">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="rail-label">Vux Browser</span>
        </button>

        <button type="button" class="rail-btn" data-view="chat" aria-label="Vux Discord Community Chat" title="Vux Chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span class="rail-label">Vux Chat</span>
          <span class="rail-badge" id="badge-chat">4 ch</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-ai" data-view="ai" aria-label="Vux.ai (duck.ai via Wisp)" title="Vux.ai (duck.ai via Render Wisp)">
          ${VUX_AI_CREST_SVG}
          <span class="rail-label">Vux.ai</span>
          <span class="rail-badge">WISP</span>
        </button>

        <div class="rail-group-label">Arcade Hub</div>

        <button type="button" class="rail-btn" data-view="modules" aria-label="All Games Hub" title="All Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>
          <span class="rail-label">All Games</span>
          <span class="rail-badge" id="badge-modules">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="seraph" aria-label="Seraph Games Library" title="Seraph Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span class="rail-label">Seraph Games</span>
          <span class="rail-badge" id="badge-seraph">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="gmshelf" aria-label="GMShelf Games Library" title="GMShelf Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><line x1="7" y1="7" x2="11" y2="7"/><line x1="7" y1="17" x2="13" y2="17"/></svg>
          <span class="rail-label">GMShelf</span>
          <span class="rail-badge" id="badge-gmshelf">0</span>
        </button>

        <div class="rail-divider"></div>
        <div class="rail-group-label">Media &amp; Library</div>

        <button type="button" class="rail-btn" data-view="gnmath" aria-label="gn-math Script and Zones" title="gn-math Script">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span class="rail-label">gn-math Script</span>
          <span class="rail-badge" id="badge-gn">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="movies" aria-label="Movies and TV" title="Movies & TV">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span class="rail-label">Movies &amp; TV</span>
        </button>

        <button type="button" class="rail-btn" data-view="books" aria-label="Books and Manga" title="Books & Manga">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span class="rail-label">Books &amp; Manga</span>
        </button>

        <button type="button" class="rail-btn" data-view="music" aria-label="Vux StudyHub MP3 Player" title="MP3 &amp; Ambient Player">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span class="rail-label">MP3 &amp; Ambient</span>
        </button>
      </div>

      <div class="rail-bottom">
        <div class="rail-divider"></div>
        <div class="vux-perf-pill" id="vux-perf-pill">
          <span id="vux-fps-text">60 FPS</span>
          <span id="vux-ping-text">Wisp: --</span>
          <button type="button" class="vux-wake-btn" id="btn-wake-wisp" title="Ping Mercury &amp; Render Wisp servers">Wake</button>
        </div>

        <button type="button" class="rail-btn" id="btn-rail-notes" aria-label="Open Scratchpad Notes" title="Scratchpad Notes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <span class="rail-label">Scratchpad</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-badges" aria-label="Daily Streak and Badges" title="Streak &amp; Badges">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          <span class="rail-label">Streak &amp; Badges</span>
          <span class="rail-badge" id="badge-streak-days">1d</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-standalone-blob" aria-label="Open Standalone :blob Window" title="Open Standalone :blob Window">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span class="rail-label">Standalone :blob</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-hide" aria-label="Auto-Hide Sidebar" title="Hide Sidebar for Fullscreen Width">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span class="rail-label">Hide Sidebar</span>
        </button>

        <button type="button" class="rail-btn" id="btn-open-settings" aria-label="Vux Customization Studio &amp; ${THEMES_CATALOG.length} Themes" title="Vux Customization Studio (${THEMES_CATALOG.length} Themes, ${FONT_LIBRARY_CATALOG.length}+ Fonts)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span class="rail-label">Studio Settings</span>
          <span class="rail-badge">${THEMES_CATALOG.length}</span>
        </button>

        <button type="button" class="rail-btn panic" id="btn-rail-panic" aria-label="Panic Redirect to Google Classroom (Esc)" title="Panic (Esc) — Google Classroom">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span class="rail-label">Panic (Esc)</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Stage -->
    <div class="stage-wrap">
      <div class="mobile-bar">
        <button type="button" class="btn" id="btn-mobile-menu" aria-label="Open Navigation Menu">Menu</button>
        <span style="font-weight:800;color:var(--accent);font-size:15px;font-family:var(--font-display);">Vux</span>
        <button type="button" class="btn" id="btn-mobile-panic" style="border-color:rgba(244,63,94,0.4);color:#fda4af;">Panic (Esc)</button>
      </div>

      <!-- 1. Vux Scramjet v2 Frontpage -->
      <section class="view-panel active" id="view-browser" aria-label="Vux Proxy Browser">
        <iframe
          id="valbrowse-proxy-frame"
          title="Vux Scramjet v2 Browser"
          src="${scramjetSrc.replace(/"/g, '&quot;')}"
          allow="autoplay; gamepad; fullscreen"
          allowtransparency="true"
          referrerpolicy="no-referrer"
          style="width:100%;height:100%;border:0;display:block;background:transparent;"
        ></iframe>
      </section>

      <!-- 1B. Built-In Discord-Styled Community Chat (Vux Chat) -->
      <section class="view-panel" id="view-chat" aria-label="Vux Community Chat Room">
        <div class="vux-chat-shell">
          <div class="chat-sidebar">
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px;">
                <span class="eyebrow">Vux Chat Channels</span>
                <span class="sub" id="chat-sync-status">Live Sync</span>
              </div>
              <div id="chat-channel-list" style="display:flex;flex-direction:column;gap:4px;"></div>
            </div>
            <div class="panel-box" style="padding:10px;gap:8px;">
              <span class="eyebrow">Chat Identity</span>
              <input type="text" class="input" id="chat-profile-name" placeholder="Nickname..." maxlength="20" style="height:30px;font-size:12px;" />
              <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                <span class="sub">Avatar Color</span>
                <div id="chat-color-swatches" style="display:flex;gap:4px;"></div>
              </div>
            </div>
          </div>

          <div class="chat-main">
            <div class="chat-topbar">
              <div>
                <div style="font-family:var(--font-display);font-size:16px;font-weight:800;" id="chat-active-channel-title">#general</div>
                <div class="sub" id="chat-active-channel-topic">Hang out, share links, and chat across tabs</div>
              </div>
              <div class="pill-row">
                <button type="button" class="btn" id="chat-clear-channel-btn" style="height:28px;font-size:11px;">Reset Room</button>
              </div>
            </div>

            <div class="chat-messages" id="chat-messages" aria-live="polite"></div>

            <form class="chat-composer-wrap" id="chat-composer-form">
              <div id="chat-reply-banner" style="display:none;align-items:center;justify-content:space-between;padding:4px 8px;border-radius:7px;background:var(--surface-2);font-size:11px;color:var(--muted);">
                <span id="chat-reply-preview">Replying...</span>
                <button type="button" class="btn" id="chat-reply-cancel" style="height:20px;padding:0 6px;font-size:10px;">Cancel</button>
              </div>
              <div class="pill-row" style="width:100%;">
                <input type="text" class="input" id="chat-message-input" placeholder="Message #general..." maxlength="420" style="flex:1;height:36px;" autocomplete="off" />
                <button type="submit" class="btn btn-primary" style="height:36px;padding:0 16px;">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- 1C. Vux.ai Full-Height Proxied Workspace (duck.ai via Render Wisp) -->
      <section class="view-panel" id="view-ai" aria-label="Vux.ai">
        <div class="vux-ai-shell">
          <div class="vux-ai-topbar">
            <div class="vux-ai-brand">
              <span class="vux-ai-crest-box">${VUX_AI_CREST_SVG}</span>
              <div>
                <div style="font-family:var(--font-display);font-size:17px;font-weight:800;letter-spacing:-0.025em;display:flex;align-items:center;gap:8px;">
                  <span>Vux.ai</span>
                  <span class="vux-ai-status-pill" id="ai-panel-status">duck.ai · Render Wisp</span>
                </div>
                <div class="sub">Private AI chat routed through Scramjet v2 &amp; ${RENDER_WISP_URL}</div>
              </div>
            </div>
            <div class="pill-row">
              <button type="button" class="btn btn-primary" id="ai-panel-reload" style="height:31px;padding:0 12px;">Reload Vux.ai</button>
              <button type="button" class="btn" id="ai-panel-open-tab" style="height:31px;padding:0 11px;">Open in Browser</button>
              <button type="button" class="btn" id="ai-panel-fs" style="height:31px;padding:0 11px;">Fullscreen</button>
            </div>
          </div>

          <div class="vux-ai-stage" id="ai-panel-stage">
            <iframe
              id="ai-panel-frame"
              title="Vux.ai Proxied Chat"
              allow="autoplay; fullscreen; clipboard-read; clipboard-write"
            ></iframe>
            <div class="overlay-status" id="ai-panel-loading">
              <div class="vux-ai-crest-box" style="width:44px;height:44px;margin-bottom:4px;">${VUX_AI_CREST_SVG}</div>
              <div class="spinner"></div>
              <div id="ai-panel-loading-msg" style="font-size:13px;font-weight:600;">Connecting Vux.ai (duck.ai) via Render Wisp...</div>
              <button type="button" class="btn" id="ai-panel-dismiss-load" style="height:28px;font-size:11px;">Dismiss Loader</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Combined Study Modules Hub -->
      <section class="view-panel" id="view-modules" aria-label="Games Hub">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Combined Library · Built-In + gn-math + Seraph + GMShelf + UGS + CKV</div>
                <h1 class="h1">All Games (<span id="modules-total-count">0</span>)</h1>
              </div>
              <button type="button" class="btn" id="btn-refresh-modules">Refresh Live Catalogs</button>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="modules-filter-pills">
                <button type="button" class="pill-btn active" data-mfilter="all">All</button>
                <button type="button" class="pill-btn" data-mfilter="gn">gn-math</button>
                <button type="button" class="pill-btn" data-mfilter="seraph">Seraph</button>
                <button type="button" class="pill-btn" data-mfilter="gmshelf">GMShelf</button>
                <button type="button" class="pill-btn" data-mfilter="ugs">UGS</button>
                <button type="button" class="pill-btn" data-mfilter="ckv">CKV</button>
                <button type="button" class="pill-btn" data-mfilter="builtin">Built-In</button>
                <button type="button" class="pill-btn" data-mfilter="favorites">Favorites</button>
              </div>

              <div class="pill-row">
                <input type="text" class="input" id="modules-search" placeholder="Search all games..." style="width:220px;" />
                <select class="select" id="modules-sort" aria-label="Sort games">
                  <option value="featured">Featured First</option>
                  <option value="popular">Most Popular</option>
                  <option value="az">Name (A-Z)</option>
                  <option value="za">Name (Z-A)</option>
                </select>
              </div>
            </div>

            <div class="modules-grid" id="modules-grid"></div>
          </div>
        </div>
      </section>

      <!-- 2B. Seraph Games Provider -->
      <section class="view-panel" id="view-seraph" aria-label="Seraph Games Provider">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Dedicated Games Provider · a456pur/seraph</div>
                <h1 class="h1">Seraph Games (<span id="seraph-total-count">0</span>)</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="seraph-status">Syncing live Seraph catalog...</span>
                <button type="button" class="btn" id="btn-refresh-seraph">Sync Seraph</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="seraph-genre-pills">
                <button type="button" class="pill-btn active" data-sgenre="All">All</button>
                <button type="button" class="pill-btn" data-sgenre="Arcade">Arcade</button>
                <button type="button" class="pill-btn" data-sgenre="Platformer">Platformer</button>
                <button type="button" class="pill-btn" data-sgenre="Adventure">Adventure</button>
                <button type="button" class="pill-btn" data-sgenre="Puzzle">Puzzle</button>
                <button type="button" class="pill-btn" data-sgenre="Simulation">Simulation</button>
                <button type="button" class="pill-btn" data-sgenre="Mobile">Mobile</button>
              </div>
              <input type="text" class="input" id="seraph-search" placeholder="Search Seraph catalog..." style="width:240px;" />
            </div>

            <div class="modules-grid" id="seraph-grid"></div>
          </div>
        </div>
      </section>

      <!-- 2C. GMShelf Games Provider -->
      <section class="view-panel" id="view-gmshelf" aria-label="GMShelf Games Provider">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Dedicated Games Provider · github.com/gmshelf</div>
                <h1 class="h1">GMShelf Games (<span id="gmshelf-total-count">0</span>)</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="gmshelf-status">Syncing live GMShelf catalog...</span>
                <button type="button" class="btn" id="btn-refresh-gmshelf">Sync GMShelf</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="gmshelf-genre-pills">
                <button type="button" class="pill-btn active" data-ggenre="All">All</button>
                <button type="button" class="pill-btn" data-ggenre="Action">Action</button>
                <button type="button" class="pill-btn" data-ggenre="Platformer">Platformer</button>
                <button type="button" class="pill-btn" data-ggenre="Arcade">Arcade</button>
                <button type="button" class="pill-btn" data-ggenre="Puzzle">Puzzle</button>
                <button type="button" class="pill-btn" data-ggenre="Sports &amp; Racing">Sports &amp; Racing</button>
                <button type="button" class="pill-btn" data-ggenre="Simulation">Simulation</button>
              </div>
              <input type="text" class="input" id="gmshelf-search" placeholder="Search GMShelf catalog..." style="width:240px;" />
            </div>

            <div class="modules-grid" id="gmshelf-grid"></div>
          </div>
        </div>
      </section>

      <!-- 3. Authentic gn-math Script & Ranked Zones -->
      <section class="view-panel" id="view-gnmath" aria-label="gn-math Script and Zones">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Main Provider · freebuisness/assets &amp; gn-math.github.io</div>
                <h1 class="h1">gn-math Script &amp; Live Zones</h1>
              </div>
              <div class="pill-row">
                <button type="button" class="pill-btn active" id="gn-tab-zones">Ranked Zones</button>
                <button type="button" class="pill-btn" id="gn-tab-script">Authentic gn-math Script</button>
                <button type="button" class="btn" id="gn-open-proxy">Open in Vux</button>
              </div>
            </div>

            <div id="gn-zones-pane" style="display:flex;flex-direction:column;gap:14px;">
              <div class="toolbar">
                <div class="pill-row" id="gn-period-pills">
                  <button type="button" class="pill-btn active" data-period="featured">Featured</button>
                  <button type="button" class="pill-btn" data-period="newest">Newest</button>
                  <button type="button" class="pill-btn" data-period="classic">Classic ID</button>
                  <button type="button" class="pill-btn" data-period="az">A-Z</button>
                </div>
                <input type="text" class="input" id="gn-search" placeholder="Filter gn-math zones.json..." style="width:240px;" />
              </div>
              <div class="modules-grid" id="gn-grid"></div>
            </div>

            <div id="gn-script-pane" style="display:none;flex-direction:column;gap:10px;">
              <div class="toolbar">
                <span class="sub" id="gn-script-status">Loading upstream cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html ...</span>
                <button type="button" class="btn" id="gn-reload-script">Reload Script</button>
              </div>
              <iframe
                id="gn-script-frame"
                title="Authentic gn-math Script"
                allow="autoplay; gamepad; fullscreen"
                style="width:100%;height:72vh;border:1px solid var(--border);border-radius:12px;background:#000;"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Movies & TV Catalog (TVMaze + Internet Archive + Optional TMDB) -->
      <section class="view-panel" id="view-movies" aria-label="Movies and TV">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">TVMaze Live API · Internet Archive Cinema · Optional TMDB</div>
                <h1 class="h1">Movies &amp; TV</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="movies-status">Loading live TVMaze &amp; Archive.org catalog...</span>
                <button type="button" class="btn" id="btn-movies-tmdb-shortcut" style="height:28px;font-size:11px;">TMDB Key</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="movie-genres">
                <button type="button" class="pill-btn active" data-genre="all">All</button>
                <button type="button" class="pill-btn" data-genre="trending">Trending</button>
                <button type="button" class="pill-btn" data-genre="action">Action</button>
                <button type="button" class="pill-btn" data-genre="sci-fi">Sci-Fi</button>
                <button type="button" class="pill-btn" data-genre="comedy">Comedy</button>
                <button type="button" class="pill-btn" data-genre="anime">Anime</button>
                <button type="button" class="pill-btn" data-genre="public-domain">Full Public-Domain Movies</button>
              </div>

              <form id="movies-search-form" class="pill-row">
                <input type="text" class="input" id="movies-query" placeholder="Search TVMaze shows, anime, or Archive films..." style="width:265px;" />
                <button type="submit" class="btn btn-primary">Search</button>
                <button type="button" class="btn" id="btn-movies-reset">Reset</button>
              </form>
            </div>

            <div class="media-grid" id="movies-grid"></div>
          </div>
        </div>
      </section>

      <!-- 5. Books & Manga -->
      <section class="view-panel" id="view-books" aria-label="Books and Manga">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Vux Library · Gutendex Reader</div>
                <h1 class="h1">Books &amp; Manga</h1>
              </div>
              <span class="sub" id="books-status">Searching Gutendex...</span>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="books-topics">
                <button type="button" class="pill-btn" data-topic="Sherlock Holmes">Sherlock Holmes</button>
                <button type="button" class="pill-btn" data-topic="Dracula">Dracula</button>
                <button type="button" class="pill-btn" data-topic="Frankenstein">Frankenstein</button>
                <button type="button" class="pill-btn" data-topic="Alice">Alice</button>
                <button type="button" class="pill-btn" data-topic="Jules Verne">Jules Verne</button>
              </div>
              <form id="books-search-form" class="pill-row">
                <input type="text" class="input" id="books-query" placeholder="Search books or authors..." style="width:230px;" />
                <button type="submit" class="btn btn-primary">Search</button>
              </form>
            </div>

            <div class="books-grid" id="books-grid"></div>
          </div>
        </div>
      </section>

      <!-- 6. StudyHub-Style All-in-One MP3 Player & Ambient Sound Mixer -->
      <section class="view-panel" id="view-music" aria-label="Vux Audio and Ambient Studio">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Persistent Audio Engine · Stations · Visualizer · Ambient Mixer</div>
                <h1 class="h1">Vux MP3 &amp; Ambient Studio</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="vux-audio-mode-badge">Ready</span>
              </div>
            </div>

            <audio id="vux-global-audio" crossorigin="anonymous" preload="metadata" style="display:none;"></audio>

            <div class="music-grid">
              <div class="panel-box" style="grid-column:span 1;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <div>
                    <div class="eyebrow" id="vux-audio-station-cat">STUDYHUB STATION</div>
                    <strong style="font-size:17px;font-family:var(--font-display);" id="vux-audio-track-title">Lofi Study Beats</strong>
                    <div class="sub" id="vux-audio-track-desc">Warm rhodes chords for study sessions</div>
                  </div>
                  <div class="pill-row">
                    <button type="button" class="pill-btn" id="vux-audio-shuffle" title="Shuffle Stations">Shuffle: Off</button>
                    <button type="button" class="pill-btn" id="vux-audio-repeat" title="Repeat Current Track">Repeat: Off</button>
                  </div>
                </div>

                <canvas id="vux-audio-viz" width="560" height="96" style="width:100%;height:96px;border-radius:10px;background:var(--bg);border:1px solid var(--border);"></canvas>

                <div style="display:flex;flex-direction:column;gap:6px;">
                  <input type="range" id="vux-audio-seek" min="0" max="100" value="0" style="width:100%;accent-color:var(--accent);" aria-label="Seek Audio Position" />
                  <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px;color:var(--muted);">
                    <span id="vux-audio-cur">0:00</span>
                    <span id="vux-audio-dur">3:00</span>
                  </div>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <div class="pill-row">
                    <button type="button" class="btn" id="vux-audio-prev">Prev</button>
                    <button type="button" class="btn btn-primary" id="vux-audio-play" style="min-width:86px;">Play</button>
                    <button type="button" class="btn" id="vux-audio-next">Next</button>
                  </div>
                  <div class="pill-row">
                    <span class="sub">Vol</span>
                    <input type="range" id="vux-audio-vol" min="0" max="100" value="80" style="width:110px;accent-color:var(--accent);" aria-label="Master Audio Volume" />
                  </div>
                </div>

                <div class="mp3-station-grid" id="vux-audio-stations"></div>

                <form id="vux-custom-mp3-form" class="pill-row" style="width:100%;padding-top:6px;border-top:1px solid var(--border);">
                  <input type="text" class="input" id="vux-custom-mp3-url" placeholder="Paste direct MP3 / OGG / WAV stream URL..." style="flex:1;min-width:180px;" />
                  <button type="submit" class="btn btn-primary">Load MP3</button>
                </form>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <span style="font-size:12px;font-weight:600;">Upload Local MP3 / Audio File</span>
                  <input type="file" id="local-audio-input" accept="audio/*" style="font-size:12px;color:var(--muted);" />
                </div>
              </div>

              <div class="panel-box" id="vux-ambient-mixer">
                <div>
                  <div class="eyebrow">Ambient Sound Mixer</div>
                  <strong style="font-size:15px;">Layer Atmospheric Noise Over Music</strong>
                  <p class="sub" style="margin-top:3px;">Mix gentle rain, warm fireplace crackle, cafe chatter &amp; mechanical clicks locally via Web Audio.</p>
                </div>
                <div id="vux-ambient-list" style="display:flex;flex-direction:column;gap:8px;"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Study Module Player Overlay -->
  <div class="overlay" id="module-overlay">
    <div class="overlay-bar">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="eyebrow" id="module-ov-provider">GAME</span>
        <strong id="module-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Loading...</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="module-ov-pip">PiP Window</button>
        <button type="button" class="btn" id="module-ov-proxy">Open in Vux</button>
        <button type="button" class="btn" id="module-ov-reload">Reload</button>
        <button type="button" class="btn" id="module-ov-fs">Fullscreen</button>
        <button type="button" class="btn btn-primary" id="module-ov-close">Close</button>
      </div>
    </div>
    <div class="overlay-stage" id="module-ov-stage">
      <iframe id="module-ov-frame" allow="autoplay; fullscreen; gamepad" sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"></iframe>
      <div class="overlay-status open" id="module-ov-status">
        <div class="spinner" id="module-ov-spinner"></div>
        <div id="module-ov-msg" style="font-size:13px;">Loading ad-blocked game package...</div>
      </div>
    </div>
  </div>

  <!-- Embedded Theater View Overlay -->
  <div class="overlay" id="movie-overlay" aria-label="Embedded Theater View">
    <div class="overlay-bar">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="eyebrow" id="movie-ov-source">CINEMA</span>
        <strong id="movie-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Cinema Theater</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="movie-ov-pip">PiP Window</button>
        <button type="button" class="btn" id="movie-ov-theater">Theater Mode</button>
        <button type="button" class="btn" id="movie-ov-fs">Fullscreen</button>
        <button type="button" class="btn" id="movie-ov-proxy">Open in Vux</button>
        <button type="button" class="btn btn-primary" id="movie-ov-close">Close</button>
      </div>
    </div>
    <div class="theater-body">
      <div class="theater-inner">
        <div class="theater-source-bar" id="cinema-source-bar">
          <div class="pill-row" id="cinema-source-switcher" role="tablist" aria-label="Player Source Switcher">
            <span class="eyebrow" style="margin-right:4px;">Player Source</span>
            <button type="button" class="pill-btn" data-player-source="trailer" id="src-btn-trailer">Trailer</button>
            <button type="button" class="pill-btn" data-player-source="archive" id="src-btn-archive">Internet Archive</button>
            <button type="button" class="pill-btn" data-player-source="custom" id="src-btn-custom">Custom Embed URL</button>
          </div>
          <a
            id="cinema-open-new-tab"
            class="btn"
            href="https://archive.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Open current player directly in a new tab if X-Frame-Options blocks embedding"
          >Open Player in New Tab</a>
        </div>

        <div class="theater-player-box" id="movie-ov-stage">
          <iframe
            id="cinema-player-frame"
            title="Vux Embedded Theater Player"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowfullscreen
            referrerpolicy="no-referrer"
          ></iframe>
          <div class="theater-fallback" id="cinema-player-fallback">
            <span class="eyebrow">Embedded Player Notice</span>
            <strong id="cinema-fallback-title" style="font-size:16px;color:var(--text);">No direct video stream attached to this metadata title</strong>
            <p class="sub" id="cinema-fallback-msg" style="max-width:520px;line-height:1.5;">
              TVMaze provides full episode guides, cast, and metadata without requiring an API key. Switch to Internet Archive, paste a custom embed URL below, or open the player directly in a new tab if the host blocks embedding.
            </p>
            <div class="pill-row" style="justify-content:center;">
              <button type="button" class="btn btn-primary" id="cinema-fallback-retry">Reload Embed</button>
              <a
                id="cinema-fallback-new-tab"
                class="btn"
                href="https://archive.org"
                target="_blank"
                rel="noopener noreferrer"
              >Open Player in New Tab</a>
              <button type="button" class="btn" id="cinema-fallback-proxy">Search Watch Page in Vux</button>
            </div>
          </div>
        </div>

        <form class="panel-box" id="cinema-embed-form" style="padding:12px 14px;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="eyebrow">Configurable Embed Player URL</span>
            <span class="sub" id="cinema-embed-hint">Supports Archive.org embeds, YouTube embeds, or custom player URLs</span>
          </div>
          <div class="pill-row" style="width:100%;">
            <input type="text" class="input" id="cinema-embed-input" placeholder="https://archive.org/embed/... or custom embed URL..." style="flex:1;min-width:220px;" />
            <button type="submit" class="btn btn-primary">Load Embed</button>
            <button type="button" class="btn" id="cinema-embed-auto">Auto Stream</button>
          </div>
        </form>

        <div class="panel-box" id="cinema-episodes-panel" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
            <div>
              <span class="eyebrow">TVMaze Episode Guide</span>
              <div style="font-size:14px;font-weight:700;margin-top:2px;" id="cinema-episodes-heading">Seasons &amp; Episodes</div>
            </div>
            <select id="cinema-season-select" class="select" aria-label="Select Season"></select>
          </div>
          <div class="episodes-strip" id="cinema-episodes-list"></div>
          <div class="sub" id="cinema-episode-detail" style="line-height:1.5;">Select an episode above to inspect its synopsis and runtime.</div>
        </div>

        <div class="panel-box" id="cinema-meta-panel">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span class="eyebrow" id="cinema-ov-network">Network</span>
              <span class="sub" id="cinema-ov-rating"></span>
            </div>
            <span class="sub" id="cinema-ov-genres"></span>
          </div>
          <p id="cinema-ov-synopsis" style="font-size:13px;line-height:1.62;color:var(--text);"></p>
          <div class="sub" id="cinema-ov-cast"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Book Reader Overlay -->
  <div class="overlay" id="book-overlay">
    <div class="overlay-bar">
      <strong id="book-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Reader</strong>
      <div class="pill-row">
        <button type="button" class="btn" id="book-font-down">A-</button>
        <button type="button" class="btn" id="book-font-up">A+</button>
        <button type="button" class="btn btn-primary" id="book-ov-close">Close</button>
      </div>
    </div>
    <div style="flex:1;overflow-y:auto;padding:28px 20px;background:var(--bg);">
      <pre id="book-ov-body" style="max-width:740px;margin:0 auto;white-space:pre-wrap;font-family:var(--font-ui);font-size:17px;line-height:1.82;color:var(--text);"></pre>
    </div>
  </div>

  <!-- Floating Quick Scratchpad / Notes Drawer -->
  <aside class="vux-notes-drawer" id="vux-notes-drawer" aria-label="Vux Quick Scratchpad Notes">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
      <div>
        <span class="eyebrow">Auto-Saved Notes</span>
        <div style="font-family:var(--font-display);font-size:15px;font-weight:800;">Scratchpad</div>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="vux-notes-copy" style="height:28px;">Copy</button>
        <button type="button" class="btn" id="vux-notes-clear" style="height:28px;">Clear</button>
        <button type="button" class="btn btn-primary" id="vux-notes-close" style="height:28px;">Close</button>
      </div>
    </div>
    <textarea id="vux-notes-textarea" class="input" placeholder="Jot down notes, links, study reminders, or chat drafts..." style="flex:1;resize:none;padding:12px;line-height:1.55;height:auto;"></textarea>
    <div class="sub" id="vux-notes-stats" style="font-family:var(--font-mono);">0 words · 0 chars</div>
  </aside>

  <!-- Floating Picture-in-Picture Draggable Mini Browser Widget -->
  <div class="vux-pip-widget" id="vux-pip-widget" role="dialog" aria-label="Vux Floating Mini Window">
    <div class="vux-pip-head" id="vux-pip-drag-handle">
      <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        <span class="rail-logo-mark" style="width:20px;height:20px;font-size:10px;">${VUX_CREST_SVG}</span>
        <strong id="vux-pip-title" style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Vux Mini Player</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="vux-pip-min" style="height:24px;padding:0 7px;font-size:11px;">Min</button>
        <button type="button" class="btn btn-primary" id="vux-pip-close" style="height:24px;padding:0 8px;font-size:11px;">&times;</button>
      </div>
    </div>
    <div class="vux-pip-body">
      <iframe id="vux-pip-frame" allow="autoplay; fullscreen; gamepad; encrypted-media; picture-in-picture" referrerpolicy="no-referrer"></iframe>
    </div>
  </div>

  <!-- Floating Command Palette (Ctrl+K) -->
  <div class="vux-cmd-backdrop" id="vux-cmd-palette" role="dialog" aria-modal="true" aria-label="Vux Command Palette">
    <div class="vux-cmd-card">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--border);">
        <span class="eyebrow">Vux</span>
        <input type="text" id="vux-cmd-input" class="input" placeholder="Search games, movies, chat channels, MP3 stations, themes, fonts, or enter URL..." style="flex:1;border:none;background:transparent;" autocomplete="off" />
        <button type="button" class="btn" id="vux-cmd-close" style="height:26px;font-size:11px;">Esc</button>
      </div>
      <div class="vux-cmd-results" id="vux-cmd-results"></div>
    </div>
  </div>

  <!-- Daily Streak & Achievement Badges Modal -->
  <div class="modal-backdrop" id="vux-badges-modal" role="dialog" aria-label="Vux Streak and Badges">
    <div class="modal-card" style="max-width:640px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <span class="eyebrow" id="vux-streak-eyebrow">1-Day Streak</span>
          <h3 style="font-family:var(--font-display);font-size:19px;font-weight:800;">Daily Streak &amp; Achievement Badges</h3>
        </div>
        <button type="button" class="btn" id="vux-badges-close">Close</button>
      </div>
      <div class="studio-grid" id="vux-badges-grid" style="max-height:360px;"></div>
    </div>
  </div>

  <!-- Customization Studio Modal (${THEMES_CATALOG.length} Themes, ${ANIMATED_BG_PRESETS.length} Animated BGs, ${DYNAMIC_COLOR_BG_PRESETS.length} Color Shifts, ${FONT_LIBRARY_CATALOG.length}+ Fonts, ${LAYOUT_PRESETS.length} Layouts) -->
  <div class="modal-backdrop" id="settings-modal">
    <div class="modal-card studio-modal-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>
          <strong style="font-size:17px;font-family:var(--font-display);">Vux Customization Studio</strong>
          <div class="sub">${THEMES_CATALOG.length} Themes · ${ANIMATED_BG_PRESETS.length} Animated BGs · ${DYNAMIC_COLOR_BG_PRESETS.length} Dynamic Gradients · ${FONT_LIBRARY_CATALOG.length}+ Fonts (incl. Cursive) · ${LAYOUT_PRESETS.length} Layouts</div>
        </div>
        <button type="button" class="btn" id="btn-close-settings">Close</button>
      </div>

      <div class="settings-nav" id="settings-tabs">
        <button type="button" class="pill-btn active" data-stab="appearance">${THEMES_CATALOG.length} Themes</button>
        <button type="button" class="pill-btn" data-stab="animbg">${ANIMATED_BG_PRESETS.length} Animated BGs</button>
        <button type="button" class="pill-btn" data-stab="dynbg">${DYNAMIC_COLOR_BG_PRESETS.length} Color Shifts</button>
        <button type="button" class="pill-btn" data-stab="fonts">${FONT_LIBRARY_CATALOG.length}+ Fonts</button>
        <button type="button" class="pill-btn" data-stab="layout">${LAYOUT_PRESETS.length}+ Layouts</button>
        <button type="button" class="pill-btn" data-stab="cloak">Cloak &amp; Share</button>
      </div>

      <!-- Pane 1: ${THEMES_CATALOG.length} UI Color Themes -->
      <div class="settings-pane active" id="spane-appearance">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="eyebrow">UI Color Themes (<span id="themes-count-shown">${THEMES_CATALOG.length}</span> / ${THEMES_CATALOG.length})</span>
            <div class="pill-row">
              <input type="text" class="input" id="preset-search" placeholder="Search ${THEMES_CATALOG.length} themes..." aria-label="Search color presets" style="height:28px;width:165px;font-size:11px;padding:0 9px;" />
              <button type="button" class="btn" id="btn-preset-random" style="height:28px;font-size:11px;padding:0 10px;">Random Theme</button>
              <button type="button" class="btn" id="btn-preset-reset-coral" style="height:28px;font-size:11px;padding:0 10px;">Default Coral</button>
            </div>
          </div>
          <div class="pill-row" id="preset-cat-pills">
            <button type="button" class="pill-btn active" data-pcat="All">All (${THEMES_CATALOG.length})</button>
            ${STUDIO_THEME_CATEGORIES.map((cat) => `<button type="button" class="pill-btn" data-pcat="${cat}">${cat.replace(/&/g, '&amp;')}</button>`).join('\n            ')}
          </div>
          <div class="preset-grid" id="color-presets-grid" style="max-height:290px;"></div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Cursor Trail &amp; Click Ripples</span>
            <span class="setting-row-desc">Smooth interactive cursor FX tinted with your active Vux theme</span>
          </div>
          <div class="pill-row" id="cursor-trail-pills">
            <button type="button" class="pill-btn" data-cursortrail="off">Off</button>
            <button type="button" class="pill-btn active" data-cursortrail="glow">Glow Trail</button>
            <button type="button" class="pill-btn" data-cursortrail="sparks">Spark Dots</button>
            <button type="button" class="pill-btn" data-cursortrail="stars">Starlight</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Static Fallback Texture</span>
            <span class="setting-row-desc">Used when Animated &amp; Dynamic Canvas backgrounds are off</span>
          </div>
          <div class="pill-row" id="bg-style-pills">
            <button type="button" class="pill-btn active" data-bgstyle="aurora">Aurora Mesh</button>
            <button type="button" class="pill-btn" data-bgstyle="topo">Topographic</button>
            <button type="button" class="pill-btn" data-bgstyle="glass">Midnight Glass</button>
            <button type="button" class="pill-btn" data-bgstyle="grid">Fine Grid</button>
            <button type="button" class="pill-btn" data-bgstyle="matte">Pure Matte</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Corner Shape &amp; Glow (<span id="glow-pct-val">100%</span>)</span>
            <span class="setting-row-desc">Fine-tune UI roundness, ambient glow, and frosted glass blur</span>
          </div>
          <div class="pill-row">
            <div class="pill-row" id="radius-pills">
              <button type="button" class="pill-btn" data-radius="6">Sharp</button>
              <button type="button" class="pill-btn active" data-radius="12">Balanced</button>
              <button type="button" class="pill-btn" data-radius="18">Soft</button>
            </div>
            <input type="range" id="custom-glow-range" min="0" max="150" value="100" style="accent-color:var(--accent);width:95px;" />
            <button type="button" class="pill-btn active" id="btn-toggle-blur">Glass Blur: On</button>
          </div>
        </div>
      </div>

      <!-- Pane 2: ${ANIMATED_BG_PRESETS.length} Animated Canvas Backgrounds -->
      <div class="settings-pane" id="spane-animbg">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Canvas FX (<span id="animbg-count-shown">${ANIMATED_BG_PRESETS.length}</span> / ${ANIMATED_BG_PRESETS.length})</span>
          <div class="pill-row">
            <input type="text" class="input" id="animbg-search" placeholder="Search ${ANIMATED_BG_PRESETS.length} canvas effects..." style="height:28px;width:185px;font-size:11px;padding:0 9px;" />
            <button type="button" class="btn" id="btn-animbg-off" style="height:28px;font-size:11px;padding:0 10px;">Turn Off</button>
          </div>
        </div>
        <div class="pill-row" id="animbg-cat-pills">
          <button type="button" class="pill-btn active" data-animcat="All">All (${ANIMATED_BG_PRESETS.length})</button>
          ${ANIMATED_BG_CATEGORIES.map((cat) => `<button type="button" class="pill-btn" data-animcat="${cat}">${cat.replace(/&/g, '&amp;')}</button>`).join('\n          ')}
        </div>
        <div class="studio-grid" id="animbg-grid"></div>
        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Animation Speed &amp; Opacity</span>
            <span class="setting-row-desc">GPU-throttled requestAnimationFrame visible globally behind homepage &amp; tabs</span>
          </div>
          <div class="pill-row">
            <label class="sub">Speed <span id="animbg-speed-val">1.0x</span></label>
            <input type="range" id="animbg-speed-range" min="20" max="250" value="100" style="accent-color:var(--accent);width:95px;" />
            <label class="sub">Opacity <span id="animbg-opacity-val">72%</span></label>
            <input type="range" id="animbg-opacity-range" min="15" max="100" value="72" style="accent-color:var(--accent);width:95px;" />
          </div>
        </div>
      </div>

      <!-- Pane 3: ${DYNAMIC_COLOR_BG_PRESETS.length} Dynamic Color-Changing Backgrounds -->
      <div class="settings-pane" id="spane-dynbg">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Color-Shifting Ambients (<span id="dynbg-count-shown">${DYNAMIC_COLOR_BG_PRESETS.length}</span> / ${DYNAMIC_COLOR_BG_PRESETS.length})</span>
          <div class="pill-row">
            <input type="text" class="input" id="dynbg-search" placeholder="Search ${DYNAMIC_COLOR_BG_PRESETS.length} mood shifts..." style="height:28px;width:185px;font-size:11px;padding:0 9px;" />
            <button type="button" class="btn" id="btn-dynbg-off" style="height:28px;font-size:11px;padding:0 10px;">Turn Off</button>
          </div>
        </div>
        <div class="pill-row" id="dynbg-cat-pills">
          <button type="button" class="pill-btn active" data-dyncat="All">All (${DYNAMIC_COLOR_BG_PRESETS.length})</button>
          ${DYNAMIC_COLOR_BG_CATEGORIES.map((cat) => `<button type="button" class="pill-btn" data-dyncat="${cat}">${cat.replace(/&/g, '&amp;')}</button>`).join('\n          ')}
        </div>
        <div class="studio-grid" id="dynbg-grid"></div>
        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Color Shift Speed &amp; Intensity</span>
            <span class="setting-row-desc">Smooth ambient hue modulation behind homepage, cards, and sidebars</span>
          </div>
          <div class="pill-row">
            <label class="sub">Speed <span id="dynbg-speed-val">1.0x</span></label>
            <input type="range" id="dynbg-speed-range" min="20" max="250" value="100" style="accent-color:var(--accent);width:95px;" />
            <label class="sub">Intensity <span id="dynbg-opacity-val">72%</span></label>
            <input type="range" id="dynbg-opacity-range" min="15" max="100" value="72" style="accent-color:var(--accent);width:95px;" />
          </div>
        </div>
      </div>

      <!-- Pane 4: ${FONT_LIBRARY_CATALOG.length}+ Curated Google Fonts -->
      <div class="settings-pane" id="spane-fonts">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Font Library (<span id="fonts-count-shown">${FONT_LIBRARY_CATALOG.length}</span> fonts · lazy loaded)</span>
          <div class="pill-row">
            <input type="text" class="input" id="font-preview-sample" value="The quick brown fox jumps — 12345" placeholder="Preview text..." style="height:28px;width:205px;font-size:11px;padding:0 9px;" />
            <input type="text" class="input" id="fonts-search" placeholder="Search ${FONT_LIBRARY_CATALOG.length}+ fonts..." style="height:28px;width:145px;font-size:11px;padding:0 9px;" />
            <button type="button" class="btn" id="btn-font-reset" style="height:28px;font-size:11px;padding:0 10px;">Default Font</button>
          </div>
        </div>
        <div class="pill-row" id="fonts-cat-pills">
          <button type="button" class="pill-btn active" data-fcat="All">All (${FONT_LIBRARY_CATALOG.length})</button>
          ${FONT_CATEGORIES.map((cat) => `<button type="button" class="pill-btn" data-fcat="${cat}">${cat.replace(/&/g, '&amp;')}</button>`).join('\n          ')}
        </div>
        <div class="studio-grid" id="fonts-grid"></div>
      </div>

      <!-- Pane 5: ${LAYOUT_PRESETS.length}+ Switchable Layout Presets -->
      <div class="settings-pane" id="spane-layout">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Workspace Layout Presets (${LAYOUT_PRESETS.length})</span>
          <input type="text" class="input" id="layouts-search" placeholder="Search ${LAYOUT_PRESETS.length} layouts..." style="height:28px;width:185px;font-size:11px;padding:0 9px;" />
        </div>
        <div class="studio-grid" id="layouts-grid" style="max-height:230px;"></div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Start Page &amp; Sidebar Controls</span>
            <span class="setting-row-desc">Fine-tune arrangement, sidebar rail mode, clock, launchpad &amp; scale</span>
          </div>
          <div class="pill-row" id="home-layout-pills">
            <button type="button" class="pill-btn active" data-homelayout="split">Split Hero</button>
            <button type="button" class="pill-btn" data-homelayout="normal">Normal Search</button>
            <button type="button" class="pill-btn" data-homelayout="side">Side Search</button>
            <button type="button" class="pill-btn" data-homelayout="minimal">Minimal</button>
          </div>
          <div class="pill-row" id="sidebar-mode-pills">
            <button type="button" class="pill-btn active" data-railmode="expanded">Expanded</button>
            <button type="button" class="pill-btn" data-railmode="compact">Compact Rail</button>
            <button type="button" class="pill-btn" data-railmode="hidden">Auto-Hide</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="pill-row">
            <button type="button" class="pill-btn active" id="btn-toggle-clock">Live Clock: On</button>
            <button type="button" class="pill-btn active" id="btn-toggle-shortcuts">Launchpad: On</button>
          </div>
          <div class="pill-row" id="font-scale-pills">
            <button type="button" class="pill-btn" data-fscale="0.92">Compact</button>
            <button type="button" class="pill-btn active" data-fscale="1">Default</button>
            <button type="button" class="pill-btn" data-fscale="1.08">Large</button>
            <button type="button" class="pill-btn" id="btn-toggle-motion">Motion: Smooth</button>
          </div>
        </div>
      </div>

      <!-- Pane 6: Cloak, Panic & VUX1 Theme Share / Custom CSS -->
      <div class="settings-pane" id="spane-cloak">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Custom Tab Title Cloak</span>
          <div class="pill-row">
            <input type="text" class="input" id="custom-cloak-title" placeholder="Enter custom tab title..." style="flex:1;min-width:190px;" />
            <button type="button" class="btn btn-primary" id="btn-apply-custom-cloak">Apply Title</button>
          </div>
          <div class="pill-row">
            <button type="button" class="btn" data-cloak="Home - Classroom">Google Classroom</button>
            <button type="button" class="btn" data-cloak="Dashboard | Canvas">Canvas LMS</button>
            <button type="button" class="btn" data-cloak="Study Notes - Google Docs">Google Docs</button>
            <button type="button" class="btn" data-cloak="Khan Academy | Free Online Courses">Khan Academy</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Panic Redirect Target (Esc Key)</span>
          <div class="pill-row">
            <select id="panic-url-select" class="select" style="flex:1;min-width:190px;">
              <option value="https://classroom.google.com">Google Classroom (Default)</option>
              <option value="https://drive.google.com">Google Drive</option>
              <option value="https://www.khanacademy.org">Khan Academy</option>
              <option value="https://clever.com">Clever Portal</option>
            </select>
            <button type="button" class="btn btn-primary" id="btn-modal-standalone-blob">Open Standalone :blob</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Theme Exporter / Importer (VUX1 Share Code)</span>
          <div class="pill-row">
            <input type="text" class="input" id="vux-share-code-input" placeholder="Click Generate or paste VUX1:... share code" style="flex:1;min-width:210px;font-family:var(--font-mono);font-size:11px;" />
            <button type="button" class="btn" id="btn-vux-export-code">Generate &amp; Copy</button>
            <button type="button" class="btn btn-primary" id="btn-vux-import-code">Import Code</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <span class="eyebrow">Live Custom CSS Snippet</span>
            <div class="pill-row">
              <button type="button" class="btn" id="btn-vux-clear-css" style="height:26px;font-size:11px;">Clear CSS</button>
              <button type="button" class="btn btn-primary" id="btn-vux-apply-css" style="height:26px;font-size:11px;">Apply CSS</button>
            </div>
          </div>
          <textarea id="vux-custom-css-input" class="input" placeholder="/* Example: .rail { border-right-color: var(--accent); } */" style="height:76px;padding:8px 10px;font-family:var(--font-mono);font-size:11px;resize:vertical;"></textarea>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Optional TMDB API Key (Movies &amp; YouTube Trailers)</span>
          <div class="pill-row">
            <input type="password" class="input" id="tmdb-api-key-input" placeholder="Paste optional TMDB v3 API key (saved in localStorage)..." style="flex:1;min-width:190px;" />
            <button type="button" class="btn btn-primary" id="btn-save-tmdb-key">Save Key</button>
            <button type="button" class="btn" id="btn-clear-tmdb-key">Clear</button>
          </div>
          <div class="sub" id="tmdb-key-status">Optional — leave blank to use free TVMaze + Internet Archive catalog with no key required.</div>
        </div>

        <div style="padding:10px 12px;border-radius:10px;background:var(--surface-2);border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--muted);display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
          <div>
            Active Default Wisp Endpoint:<br />
            <span style="color:var(--accent);">${DEFAULT_WISP_URL}</span>
          </div>
          <button type="button" class="btn" id="btn-replay-welcome" style="height:28px;font-size:11px;">Show Welcome Screen</button>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div class="sub">Press <code style="color:var(--text);">Esc</code> anywhere to immediately close or redirect to your Panic destination.</div>
          <button type="button" class="btn" id="btn-reset-all-custom">Reset All Settings</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Dismissible Welcome Overlay -->
  <div class="vb-welcome-backdrop" id="vb-welcome" role="dialog" aria-label="Welcome to Vux">
    <div class="vb-welcome-card">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>
          <span class="eyebrow" id="vb-welcome-streak-pill">Isolated Workspace Ready</span>
          <h2 style="font-family:var(--font-display);font-size:24px;font-weight:800;letter-spacing:-0.03em;margin-top:3px;">Welcome to Vux</h2>
          <p class="sub" style="margin-top:4px;line-height:1.5;">Scramjet v2 + Libcurl proxy, Vux.ai via Render Wisp, Discord-styled Vux Chat, GMShelf &amp; Seraph &amp; gn-math arcade, Movies &amp; TV, StudyHub MP3 + Ambient Mixer, and ${THEMES_CATALOG.length}+ Studio Themes.</p>
        </div>
        <button type="button" class="btn" id="vb-welcome-close-x" aria-label="Close welcome screen">Close</button>
      </div>

      <div class="vb-welcome-grid">
        <button type="button" class="vb-welcome-tile" data-welcome-go="browser">
          <strong style="font-size:13px;color:var(--accent);">Vux Proxy Browser</strong>
          <span class="sub">Multi-tab Libcurl + Wisp proxy with authentic shortcut logos &amp; PiP window.</span>
        </button>
        <button type="button" class="vb-welcome-tile" data-welcome-go="chat">
          <strong style="font-size:13px;color:var(--accent);">Vux Community Chat</strong>
          <span class="sub">Discord-styled #general, #games, #movies &amp; #links-and-themes rooms.</span>
        </button>
        <button type="button" class="vb-welcome-tile" data-welcome-go="ai">
          <strong style="font-size:13px;color:var(--accent);">Vux.ai (Render Wisp)</strong>
          <span class="sub">Private duck.ai workspace routed cleanly through Scramjet v2 + Render Wisp.</span>
        </button>
        <button type="button" class="vb-welcome-tile" data-welcome-go="gmshelf">
          <strong style="font-size:13px;color:var(--accent);">GMShelf &amp; Seraph Arcade</strong>
          <span class="sub">Play GMShelf, Seraph, gn-math &amp; classic games right inside Vux.</span>
        </button>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:6px;border-top:1px solid var(--border);">
        <label style="display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);cursor:pointer;">
          <input type="checkbox" id="vb-welcome-dont-show" style="accent-color:var(--accent);" />
          <span>Don&apos;t show welcome screen again</span>
        </label>
        <button type="button" class="btn btn-primary" id="vb-welcome-start">Get Started</button>
      </div>
    </div>
  </div>

  <!-- Soothing Animated Launch Loading Screen + Random Fun Fact -->
  <div class="vb-loader" id="vb-loader" role="status" aria-live="polite">
    <canvas class="vb-loader-canvas" id="vb-loader-canvas" aria-hidden="true"></canvas>
    <div class="vb-loader-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="rail-logo-mark" style="width:38px;height:38px;font-size:16px;">${VUX_CREST_SVG}</span>
          <div>
            <div style="font-family:var(--font-display);font-size:18px;font-weight:800;letter-spacing:-0.03em;">Vux</div>
            <div class="sub" id="vb-loader-status">Preparing isolated workspace &amp; themes...</div>
          </div>
        </div>
        <button type="button" class="btn" id="vb-loader-skip" style="height:30px;">Skip</button>
      </div>

      <div class="vb-loader-bar-track">
        <div class="vb-loader-bar-fill" id="vb-loader-bar-fill"></div>
      </div>

      <div class="vb-loader-fact-box">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="eyebrow">Did You Know? · Random Fun Fact</span>
          <button type="button" class="btn" id="vb-loader-next-fact" style="height:24px;padding:0 8px;font-size:10px;">New Fact</button>
        </div>
        <p id="vb-loader-fact" style="font-size:13px;line-height:1.55;color:var(--text);"></p>
      </div>
    </div>
  </div>

  <!-- Floating Popup-Blocked Toast -->
  <div class="vb-toast" id="vb-toast" role="status" aria-live="polite">
    <span id="vb-toast-msg">Popup blocked — allow popups for this site in Chrome&apos;s address bar, then click Open Standalone :blob again.</span>
    <button type="button" class="btn" id="vb-toast-close" style="height:26px;padding:0 8px;">OK</button>
  </div>

  <script>
    (function () {
      var CFG = ${dataPayload};

      function safeLSGet(key) {
        try { return window.localStorage ? window.localStorage.getItem(key) : null; } catch (_e) { return null; }
      }
      function safeLSSet(key, val) {
        try { if (window.localStorage) window.localStorage.setItem(key, val); } catch (_e) {}
      }

      function showToast(msg) {
        var el = document.getElementById('vb-toast');
        var msgEl = document.getElementById('vb-toast-msg');
        if (!el || !msgEl) return;
        msgEl.textContent = msg;
        el.classList.add('open');
        setTimeout(function () { el.classList.remove('open'); }, 6500);
      }

      document.getElementById('vb-toast-close').addEventListener('click', function () {
        document.getElementById('vb-toast').classList.remove('open');
      });

      /* ---------------- SYNCHRONOUS CHROME POPUP :BLOB LAUNCHER ---------------- */
      function openStandaloneBlobWindow() {
        var frameUrl = CFG.origin + '/?vb=1';
        var wrapperHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />' +
          '<meta name="viewport" content="width=device-width,initial-scale=1.0" />' +
          '<title>Home - Classroom</title>' +
          '<link rel="icon" type="image/png" href="' + CFG.classroomFavicon + '" />' +
          '<style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0b0608;}' +
          'iframe{width:100vw;height:100vh;border:none;display:block;}</style></head>' +
          '<body><iframe name="VALemStandaloneFrame" src="' + frameUrl.replace(/"/g, '&quot;') + '" title="Home - Classroom" ' +
          'allow="autoplay; gamepad; fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>' +
          '<script>(function(){var p=' + JSON.stringify(CFG.panicUrl) + ';' +
          'function go(){try{if(document.documentElement)document.documentElement.style.display="none";}catch(_e){}' +
          'try{if(window.top&&window.top.opener&&typeof window.top.close==="function")window.top.close();}catch(_e){}' +
          'try{(window.top||window).location.replace(p);}catch(_e){}}' +
          'window.addEventListener("keydown",function(e){if(e&&e.key==="Escape"){e.preventDefault();go();}},true);' +
          'window.addEventListener("message",function(ev){if(ev&&ev.data&&ev.data.type==="valbrowse-panic")go();});' +
          '})();<\\/script></body></html>';

        var blob = new Blob([wrapperHtml], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var win = window.open(url, CFG.standaloneWindowName, CFG.standaloneWindowFeatures);
        if (!win) {
          showToast('Popup blocked — click the popup icon in Chrome\\u2019s address bar to allow popups, then try again.');
        }
        setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
      }

      /* ---------------- PANIC REDIRECT (ESC -> CLOSE / GOOGLE CLASSROOM) ---------------- */
      function triggerPanic() {
        try {
          if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(function () {});
          }
        } catch (_e) {}
        try {
          document.title = 'Google Classroom';
          if (document.documentElement) document.documentElement.style.display = 'none';
        } catch (_e) {}
        try {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: 'valbrowse-panic' }, '*');
          }
        } catch (_e) {}
        try {
          if (window.top && window.top.opener && typeof window.top.close === 'function') {
            window.top.close();
          }
        } catch (_e) {}
        try {
          if (window.top && window.top !== window) {
            window.top.location.replace(CFG.panicUrl);
            return;
          }
        } catch (_e) {}
        try {
          window.location.replace(CFG.panicUrl);
        } catch (_e) {}
      }

      window.addEventListener('keydown', function (e) {
        if (e && e.key === 'Escape') {
          e.preventDefault();
          triggerPanic();
        }
      }, true);

      document.getElementById('btn-rail-panic').addEventListener('click', triggerPanic);
      document.getElementById('btn-mobile-panic').addEventListener('click', triggerPanic);
      document.getElementById('btn-rail-standalone-blob').addEventListener('click', openStandaloneBlobWindow);
      document.getElementById('btn-modal-standalone-blob').addEventListener('click', openStandaloneBlobWindow);

      /* ---------------- NAVIGATION & COLLAPSIBLE RAIL ---------------- */
      var railEl = document.getElementById('rail');
      var railToggleBtn = document.getElementById('btn-rail-toggle');
      var railHideBtn = document.getElementById('btn-rail-hide');
      var railReopenBtn = document.getElementById('btn-rail-reopen');
      var mobileMenuBtn = document.getElementById('btn-mobile-menu');
      var currentView = 'browser';
      var railMode = safeLSGet('valem_rail_mode') || 'expanded';

      function applyRailMode(mode) {
        if (mode !== 'expanded' && mode !== 'compact' && mode !== 'hidden') {
          mode = 'expanded';
        }
        railMode = mode;
        safeLSSet('valem_rail_mode', mode);
        railEl.classList.toggle('compact', mode === 'compact');
        railEl.classList.toggle('hidden-rail', mode === 'hidden');
        if (railReopenBtn) railReopenBtn.classList.toggle('visible', mode === 'hidden');
        if (railToggleBtn) {
          railToggleBtn.setAttribute('aria-expanded', mode === 'expanded' ? 'true' : 'false');
          railToggleBtn.title = mode === 'expanded' ? 'Collapse Sidebar' : 'Expand Sidebar';
        }
        document.querySelectorAll('#sidebar-mode-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-railmode') === mode);
        });
      }

      function switchView(viewId) {
        currentView = viewId;
        document.querySelectorAll('.view-panel').forEach(function (panel) {
          panel.classList.toggle('active', panel.id === 'view-' + viewId);
        });
        document.querySelectorAll('.rail-btn[data-view]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
        });
        railEl.classList.remove('mobile-open');
        if (viewId === 'ai' && typeof loadVuxAi === 'function') {
          var aiF = document.getElementById('ai-panel-frame');
          if (!aiF || !aiF.getAttribute('src')) loadVuxAi(false);
        }
        if (viewId === 'seraph' && !seraphFetchedOnce) {
          fetchSeraphCatalog();
        }
        if (viewId === 'gmshelf' && !gmshelfFetchedOnce) {
          fetchGmshelfCatalog();
        }
        if (viewId === 'books' && !booksLoadedOnce) {
          booksLoadedOnce = true;
          searchBooks('classic');
        }
        if (viewId === 'chat' && typeof renderChatView === 'function') {
          renderChatView();
        }
        if (viewId === 'music' && typeof drawAudioViz === 'function') {
          syncAudioVizLoop();
        }
      }

      document.querySelectorAll('.rail-btn[data-view]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          switchView(btn.getAttribute('data-view'));
        });
      });

      railToggleBtn.addEventListener('click', function () {
        applyRailMode(railMode === 'compact' ? 'expanded' : 'compact');
      });

      if (railHideBtn) {
        railHideBtn.addEventListener('click', function () {
          applyRailMode('hidden');
        });
      }

      if (railReopenBtn) {
        railReopenBtn.addEventListener('click', function () {
          if (customSettings && customSettings.navPosition === 'zen') {
            customSettings.navPosition = 'left';
            applyCustomSettings(customSettings);
          }
          applyRailMode('expanded');
        });
      }

      mobileMenuBtn.addEventListener('click', function () {
        railEl.classList.toggle('mobile-open');
      });

      window.addEventListener('message', function (ev) {
        if (!ev || !ev.data) return;
        if (ev.data.type === 'valbrowse-panic') {
          triggerPanic();
        } else if (ev.data.type === 'valem-open-settings') {
          openStudioModal('appearance');
        } else if (ev.data.type === 'valem-layout-sync' && typeof ev.data.homeLayout === 'string') {
          var nextL = ev.data.homeLayout;
          if (nextL === 'split' || nextL === 'normal' || nextL === 'side' || nextL === 'minimal') {
            customSettings.homeLayout = nextL;
            safeLSSet('valem_custom_settings', JSON.stringify(customSettings));
            document.querySelectorAll('#home-layout-pills .pill-btn').forEach(function (b) {
              b.classList.toggle('active', b.getAttribute('data-homelayout') === nextL);
            });
          }
        } else if (ev.data.type === 'gn-switch-tab' && typeof ev.data.tab === 'string') {
          var targetTab = ev.data.tab === 'games' ? 'modules' : ev.data.tab;
          var allowed = { browser: 1, chat: 1, ai: 1, modules: 1, seraph: 1, gmshelf: 1, gnmath: 1, movies: 1, books: 1, music: 1 };
          if (allowed[targetTab]) {
            switchView(targetTab);
          }
        } else if (ev.data.type === 'vux-open-pip') {
          if (typeof openVuxPip === 'function') {
            openVuxPip(ev.data.url || '', ev.data.title || 'Vux Mini Player', ev.data.proxy !== false);
          }
        } else if (ev.data.type === 'vux-audio-control') {
          if (typeof handleExternalAudioControl === 'function') {
            handleExternalAudioControl(ev.data.action);
          }
        } else if (ev.data.type === 'vux-tab-opened') {
          if (typeof recordVuxStat === 'function') {
            recordVuxStat('tabsOpened', 1);
          }
        }
      });

      function openInValBrowse(url) {
        switchView('browser');
        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({ type: 'omni-navigate', query: url, newTab: true }, '*');
          } catch (_e) {}
        }
      }

      /* ---------------- UNIFIED EULERPATH MODULES + GN-MATH CATALOGS ---------------- */
      var favorites = [];
      try {
        var rawFavs = safeLSGet('euler_favs') || safeLSGet('gn_favs');
        if (rawFavs) favorites = JSON.parse(rawFavs) || [];
      } catch (_e) {}

      function toggleFavorite(moduleId) {
        var idx = favorites.indexOf(moduleId);
        if (idx === -1) favorites.unshift(moduleId);
        else favorites.splice(idx, 1);
        safeLSSet('euler_favs', JSON.stringify(favorites));
        renderModulesGrid();
        renderSeraphGrid();
        renderGmshelfGrid();
        renderGnGrid();
      }

      var gnZones = [];
      var seraphModules = Array.isArray(CFG.fallbackSeraph) ? CFG.fallbackSeraph.slice() : [];
      var gmshelfModules = Array.isArray(CFG.fallbackGmshelf) ? CFG.fallbackGmshelf.slice() : [];
      var ugsModules = CFG.fallbackUgs.slice();
      var ckvModules = CFG.fallbackCkv.slice();
      var mergedModules = [];
      var activeModuleFilter = 'all';
      var activeSeraphGenre = 'All';
      var activeGmshelfGenre = 'All';
      var activePopularityPeriod = 'featured';
      var popularityMap = {};
      var gnZonesLoadedOnce = false;
      var seraphFetchedOnce = false;
      var gmshelfFetchedOnce = false;

      function normalizeKey(s) {
        return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      }

      function rebuildMergedModules() {
        var seen = Object.create(null);
        var out = [];
        function addList(arr) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (!item || !item.name || !item.url) continue;
            var k = normalizeKey(item.name);
            if (k && seen[k]) continue;
            if (k) seen[k] = true;
            out.push(item);
          }
        }
        addList(gnZones);
        addList(seraphModules);
        addList(gmshelfModules);
        addList(ugsModules);
        addList(ckvModules);
        addList(CFG.staticModules);
        mergedModules = out;
        document.getElementById('modules-total-count').textContent = String(mergedModules.length);
        document.getElementById('badge-modules').textContent = String(mergedModules.length);
        document.getElementById('badge-gn').textContent = String(gnZones.length);
        var seraphBadge = document.getElementById('badge-seraph');
        var seraphTotal = document.getElementById('seraph-total-count');
        if (seraphBadge) seraphBadge.textContent = String(seraphModules.length);
        if (seraphTotal) seraphTotal.textContent = String(seraphModules.length);
        var gmshelfBadge = document.getElementById('badge-gmshelf');
        var gmshelfTotal = document.getElementById('gmshelf-total-count');
        if (gmshelfBadge) gmshelfBadge.textContent = String(gmshelfModules.length);
        if (gmshelfTotal) gmshelfTotal.textContent = String(gmshelfModules.length);
        renderModulesGrid();
        renderSeraphGrid();
        renderGmshelfGrid();
        renderGnGrid();
      }

      function inferGmshelfCategoryClient(name, rawUrl) {
        var text = (String(name || '') + ' ' + String(rawUrl || '')).toLowerCase();
        if (/(mario|sonic|celeste|ovo|vex|parkour|platform|jump|geometry|run\\s*3|slope)/i.test(text)) return 'Platformer';
        if (/(soccer|basketball|fifa|drift|moto|car|rac|golf|football|baseball|boxing)/i.test(text)) return 'Sports & Racing';
        if (/(2048|chess|sudoku|tetris|puzzle|wordle|portal|cut the rope|mine|mahjong)/i.test(text)) return 'Puzzle';
        if (/(papa|tycoon|craft|sim|bitlife|cookie|idle|clicker|garden|farm)/i.test(text)) return 'Simulation';
        if (/(1v1|shoot|gun|zombie|war|battle|strike|sniper|fnaf|doom|quake|superhot|ultrakill|halo)/i.test(text)) return 'Action';
        return 'Arcade';
      }

      function resolveGmshelfUrlClient(rawPath, baseOrigin, fallbackBase) {
        var v = String(rawPath || '').trim();
        if (!v || /^(javascript|data|vbscript):/i.test(v)) return '';
        if (/^https?:\\/\\//i.test(v)) return v;
        if (v.charAt(0) === '/') return String(baseOrigin || '').replace(/\\/+$/, '') + v;
        return String(fallbackBase || baseOrigin || '').replace(/\\/+$/, '') + '/' + v.replace(/^\\.\\/+/, '');
      }

      function parseGmshelfManifestClient(rawJson, srcMeta) {
        var rows = Array.isArray(rawJson) ? rawJson : (rawJson && Array.isArray(rawJson.games) ? rawJson.games : []);
        if (!rows.length) return [];
        var out = [];
        var seen = Object.create(null);
        rows.forEach(function (row) {
          if (!row || !row.name || !row.url) return;
          var name = String(row.name).trim();
          var key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (!key || seen[key]) return;
          var gameUrl = resolveGmshelfUrlClient(row.url, srcMeta.siteBase, srcMeta.cdnBase);
          if (!gameUrl) return;
          seen[key] = true;
          var imgRaw = String(row.img || '').trim();
          var cover = null;
          if (imgRaw && imgRaw.indexOf('placeholder.png') === -1) {
            cover = resolveGmshelfUrlClient(imgRaw, srcMeta.cdnBase, srcMeta.cdnBase);
          } else if (srcMeta.id === 'truffled') {
            var m = String(row.url).match(/\\/([^/]+?)\\.html?$/i);
            if (m && m[1]) cover = srcMeta.cdnBase + '/covers/' + encodeURIComponent(m[1]) + '.webp';
          }
          out.push({
            id: 'gmshelf:' + srcMeta.id + ':' + key,
            provider: 'gmshelf',
            name: name,
            slug: key,
            category: inferGmshelfCategoryClient(name, row.url),
            url: gameUrl,
            baseUrl: gameUrl.slice(0, gameUrl.lastIndexOf('/') + 1),
            cover: cover,
            featured: out.length < 30
          });
        });
        return out;
      }

      async function fetchGmshelfCatalog() {
        gmshelfFetchedOnce = true;
        var stEl = document.getElementById('gmshelf-status');
        if (stEl) stEl.textContent = 'Syncing GMShelf catalog...';
        var sources = Array.isArray(CFG.gmshelfSources) ? CFG.gmshelfSources : [];
        var combined = [];
        var seen = Object.create(null);
        for (var i = 0; i < sources.length; i++) {
          var src = sources[i];
          try {
            var res = await fetch(src.manifestUrl + '?t=' + Date.now());
            if (!res.ok) continue;
            var json = await res.json();
            var parsed = parseGmshelfManifestClient(json, src);
            parsed.forEach(function (item) {
              var k = normalizeKey(item.name);
              if (k && !seen[k]) {
                seen[k] = true;
                item.featured = combined.length < 36;
                combined.push(item);
              }
            });
          } catch (_e) {}
        }
        if (combined.length > 0) {
          gmshelfModules = combined;
          rebuildMergedModules();
          if (stEl) stEl.textContent = 'Synced ' + combined.length + ' GMShelf games';
          return;
        }
        if (stEl) stEl.textContent = 'Showing ' + gmshelfModules.length + ' curated GMShelf games';
      }

      function parseSeraphHtmlClient(rawHtml, cdnBase) {
        if (!rawHtml) return [];
        var cleanBase = String(cdnBase || CFG.seraphCdnBase).replace(/\\/+$/, '');
        var out = [];
        var seen = Object.create(null);
        try {
          var doc = new DOMParser().parseFromString(rawHtml, 'text/html');
          var anchors = doc.querySelectorAll('.button-container a[href], a[href]');
          anchors.forEach(function (a) {
            var href = String(a.getAttribute('href') || '').trim();
            if (!href || href.charAt(0) === '#' || /^https?:/i.test(href) || href.indexOf('..') === 0) return;
            if (!/\\.html?$/i.test(href)) return;
            var h2 = a.querySelector('h2');
            if (!h2 || !h2.textContent) return;
            var slug = href.split('/')[0].toLowerCase();
            if (!slug || seen[slug]) return;
            seen[slug] = true;
            var btnDiv = a.querySelector('[data-genre]') || a.querySelector('.button');
            var rawGenre = btnDiv ? (btnDiv.getAttribute('data-genre') || 'arcade') : 'arcade';
            var genre = rawGenre.charAt(0).toUpperCase() + rawGenre.slice(1).toLowerCase();
            var styleAttr = btnDiv ? String(btnDiv.getAttribute('style') || '') : '';
            var bgMatch = styleAttr.match(/url\\(\\s*['"]?([^'")]+)['"]?\\s*\\)/i);
            var cover = null;
            if (bgMatch && bgMatch[1]) {
              var relCover = bgMatch[1].trim();
              if (/^https?:/i.test(relCover)) cover = relCover;
              else cover = cleanBase + '/' + relCover.replace(/^(\\.\\.\\/)+/, '').replace(/^\\.\\//, '');
            }
            var gameUrl = cleanBase + '/games/' + href.replace(/^\\.\\//, '');
            var baseUrl = gameUrl.slice(0, gameUrl.lastIndexOf('/') + 1);
            out.push({
              id: 'seraph:' + slug,
              provider: 'seraph',
              name: h2.textContent.replace(/\\s+/g, ' ').trim(),
              slug: slug,
              category: genre,
              url: gameUrl,
              baseUrl: baseUrl,
              cover: cover,
              featured: out.length < 30
            });
          });
        } catch (_e) {}
        return out;
      }

      async function fetchSeraphCatalog() {
        seraphFetchedOnce = true;
        var stEl = document.getElementById('seraph-status');
        if (stEl) stEl.textContent = 'Syncing Seraph catalog...';
        var mirrors = Array.isArray(CFG.seraphIndexMirrors) ? CFG.seraphIndexMirrors : [];
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i] + '?t=' + Date.now());
            if (!res.ok) continue;
            var html = await res.text();
            var parsed = parseSeraphHtmlClient(html, CFG.seraphCdnBase);
            if (parsed.length > 0) {
              seraphModules = parsed;
              rebuildMergedModules();
              if (stEl) stEl.textContent = 'Synced ' + parsed.length + ' Seraph games';
              return;
            }
          } catch (_e) {}
        }
        if (stEl) stEl.textContent = 'Showing ' + seraphModules.length + ' curated Seraph games';
      }

      async function fetchGnZones() {
        gnZonesLoadedOnce = true;
        var mirrors = [
          'https://cdn.jsdelivr.net/gh/freebuisness/assets@main/zones.json',
          'https://fastly.jsdelivr.net/gh/freebuisness/assets@main/zones.json',
          'https://gcore.jsdelivr.net/gh/freebuisness/assets@master/zones.json'
        ];
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i] + '?t=' + Date.now());
            if (!res.ok) continue;
            var json = await res.json();
            if (!Array.isArray(json)) continue;
            gnZones = json.filter(function (z) {
              return z && typeof z.id === 'number' && z.id >= 0 && typeof z.url === 'string' && z.url.indexOf('{HTML_URL}') !== -1 && !/discord\\.gg|suggest games/i.test(z.name || '');
            }).map(function (z, idx) {
              return {
                id: 'gn:' + z.id,
                numericId: z.id,
                provider: 'gn',
                name: String(z.name || 'Untitled').trim(),
                url: String(z.url).replace('{COVER_URL}', CFG.gnCoverUrl).replace('{HTML_URL}', CFG.gnHtmlUrl),
                baseUrl: CFG.gnHtmlUrl + '/',
                cover: z.cover ? String(z.cover).replace('{COVER_URL}', CFG.gnCoverUrl).replace('{HTML_URL}', CFG.gnHtmlUrl) : null,
                featured: Boolean(z.featured) || idx < 12
              };
            });
            rebuildMergedModules();
            return;
          } catch (_e) {}
        }
      }

      function createStudyCard(mod, hits) {
        var isFav = favorites.indexOf(mod.id) !== -1 || favorites.indexOf(mod.name) !== -1;
        var card = document.createElement('div');
        card.className = 'card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.onclick = function () { launchStudyModule(mod); };
        card.onkeydown = function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launchStudyModule(mod); }
        };

        var thumb = document.createElement('div');
        thumb.className = 'thumb-wrap';

        var fb = document.createElement('div');
        fb.className = 'thumb-fallback';
        fb.textContent = mod.name;
        thumb.appendChild(fb);

        if (mod.cover) {
          var img = document.createElement('img');
          img.src = mod.cover;
          img.alt = mod.name;
          img.loading = 'lazy';
          img.referrerPolicy = 'no-referrer';
          img.style.position = 'relative';
          img.style.zIndex = '2';
          img.onerror = function () { img.style.display = 'none'; };
          thumb.appendChild(img);
        }

        var prov = String(mod.provider || 'module');
        var chip = document.createElement('span');
        chip.className = 'provider-chip';
        chip.textContent = prov === 'gn' ? 'gn-math' : prov.toUpperCase();
        thumb.appendChild(chip);

        var favBtn = document.createElement('button');
        favBtn.type = 'button';
        favBtn.className = 'fav-btn' + (isFav ? ' is-fav' : '');
        favBtn.setAttribute('aria-label', 'Favorite ' + mod.name);
        favBtn.innerHTML = isFav ? '&#9733;' : '&#9734;';
        favBtn.onclick = function (e) {
          e.stopPropagation();
          toggleFavorite(mod.id);
        };
        thumb.appendChild(favBtn);

        var body = document.createElement('div');
        body.className = 'card-body';
        var title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = mod.name;
        var meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.textContent = (mod.category || (mod.numericId ? '#' + mod.numericId : prov.toUpperCase())) + (hits ? ' · ' + hits.toLocaleString() + ' plays' : '');
        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(thumb);
        card.appendChild(body);
        return card;
      }

      function renderModulesGrid() {
        var grid = document.getElementById('modules-grid');
        if (!grid) return;
        var q = (document.getElementById('modules-search').value || '').trim().toLowerCase();
        var sort = document.getElementById('modules-sort').value;
        var list = mergedModules.filter(function (m) {
          if (activeModuleFilter === 'favorites') {
            if (favorites.indexOf(m.id) === -1 && favorites.indexOf(m.name) === -1) return false;
          } else if (activeModuleFilter !== 'all' && m.provider !== activeModuleFilter) {
            return false;
          }
          if (q && m.name.toLowerCase().indexOf(q) === -1 && String(m.category || '').toLowerCase().indexOf(q) === -1) return false;
          return true;
        });

        list.sort(function (a, b) {
          if (sort === 'az') return a.name.localeCompare(b.name);
          if (sort === 'za') return b.name.localeCompare(a.name);
          if (sort === 'popular') {
            var ah = typeof a.numericId === 'number' ? (popularityMap[a.numericId] || -1) : -1;
            var bh = typeof b.numericId === 'number' ? (popularityMap[b.numericId] || -1) : -1;
            if (ah !== bh) return bh - ah;
          }
          return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
        });

        grid.innerHTML = '';
        list.slice(0, 150).forEach(function (m) {
          var hits = typeof m.numericId === 'number' ? popularityMap[m.numericId] : 0;
          grid.appendChild(createStudyCard(m, hits));
        });
      }

      function renderGnGrid() {
        var grid = document.getElementById('gn-grid');
        if (!grid) return;
        var q = (document.getElementById('gn-search').value || '').trim().toLowerCase();
        var list = gnZones.filter(function (m) {
          return !q || m.name.toLowerCase().indexOf(q) !== -1;
        });
        list.sort(function (a, b) {
          if (activePopularityPeriod === 'az') return a.name.localeCompare(b.name);
          if (activePopularityPeriod === 'newest') return Number(b.numericId || 0) - Number(a.numericId || 0);
          if (activePopularityPeriod === 'classic') return Number(a.numericId || 0) - Number(b.numericId || 0);
          return Number(b.featured) - Number(a.featured) || Number(a.numericId || 0) - Number(b.numericId || 0);
        });
        grid.innerHTML = '';
        if (list.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = 'Syncing gn-math zones.json...';
          grid.appendChild(empty);
          return;
        }
        list.slice(0, 120).forEach(function (m) {
          var hits = typeof m.numericId === 'number' ? popularityMap[m.numericId] : 0;
          grid.appendChild(createStudyCard(m, hits));
        });
      }

      function renderSeraphGrid() {
        var grid = document.getElementById('seraph-grid');
        if (!grid) return;
        var searchEl = document.getElementById('seraph-search');
        var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
        var list = seraphModules.filter(function (m) {
          var matchGenre = activeSeraphGenre === 'All' || String(m.category || '').toLowerCase() === activeSeraphGenre.toLowerCase();
          var matchQ = !q || m.name.toLowerCase().indexOf(q) !== -1 || String(m.category || '').toLowerCase().indexOf(q) !== -1;
          return matchGenre && matchQ;
        });
        grid.innerHTML = '';
        if (list.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = 'No Seraph games matched "' + q + '" in ' + activeSeraphGenre + '.';
          grid.appendChild(empty);
          return;
        }
        list.slice(0, 150).forEach(function (m) {
          grid.appendChild(createStudyCard(m, 0));
        });
      }

      function renderGmshelfGrid() {
        var grid = document.getElementById('gmshelf-grid');
        if (!grid) return;
        var searchEl = document.getElementById('gmshelf-search');
        var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
        var list = gmshelfModules.filter(function (m) {
          var matchGenre = activeGmshelfGenre === 'All' || String(m.category || '').toLowerCase() === activeGmshelfGenre.toLowerCase();
          var matchQ = !q || m.name.toLowerCase().indexOf(q) !== -1 || String(m.category || '').toLowerCase().indexOf(q) !== -1;
          return matchGenre && matchQ;
        });
        grid.innerHTML = '';
        if (list.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = 'No GMShelf games matched "' + q + '" in ' + activeGmshelfGenre + '.';
          grid.appendChild(empty);
          return;
        }
        list.slice(0, 150).forEach(function (m) {
          grid.appendChild(createStudyCard(m, 0));
        });
      }

      document.querySelectorAll('#seraph-genre-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeSeraphGenre = btn.getAttribute('data-sgenre') || 'All';
          document.querySelectorAll('#seraph-genre-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderSeraphGrid();
        });
      });

      document.querySelectorAll('#gmshelf-genre-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeGmshelfGenre = btn.getAttribute('data-ggenre') || 'All';
          document.querySelectorAll('#gmshelf-genre-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderGmshelfGrid();
        });
      });

      var seraphSearchEl = document.getElementById('seraph-search');
      if (seraphSearchEl) seraphSearchEl.addEventListener('input', renderSeraphGrid);
      var seraphRefreshBtn = document.getElementById('btn-refresh-seraph');
      if (seraphRefreshBtn) seraphRefreshBtn.addEventListener('click', fetchSeraphCatalog);

      var gmshelfSearchEl = document.getElementById('gmshelf-search');
      if (gmshelfSearchEl) gmshelfSearchEl.addEventListener('input', renderGmshelfGrid);
      var gmshelfRefreshBtn = document.getElementById('btn-refresh-gmshelf');
      if (gmshelfRefreshBtn) gmshelfRefreshBtn.addEventListener('click', fetchGmshelfCatalog);

      document.querySelectorAll('#modules-filter-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeModuleFilter = btn.getAttribute('data-mfilter');
          document.querySelectorAll('#modules-filter-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderModulesGrid();
        });
      });

      document.getElementById('modules-search').addEventListener('input', renderModulesGrid);
      document.getElementById('modules-sort').addEventListener('change', renderModulesGrid);
      document.getElementById('btn-refresh-modules').addEventListener('click', function () {
        fetchGnZones();
        fetchSeraphCatalog();
        fetchGmshelfCatalog();
      });
      document.getElementById('gn-search').addEventListener('input', renderGnGrid);

      document.querySelectorAll('#gn-period-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activePopularityPeriod = btn.getAttribute('data-period') || 'featured';
          document.querySelectorAll('#gn-period-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderGnGrid();
        });
      });

      /* ---------------- STUDY MODULE OVERLAY PLAYER (AD-BLOCKED + ESC PANIC) ---------------- */
      var SRC_RES = CFG.srcBlocklist.map(function (p) { return new RegExp(p.source, p.flags); });
      var INLINE_RES = CFG.inlineBlocklist.map(function (p) { return new RegExp(p.source, p.flags); });
      var ESCAPE_INJECT = '<script data-vb-panic="1">(function(){if(window.__vbEsc)return;window.__vbEsc=true;window.addEventListener("keydown",function(e){if(e&&e.key==="Escape"){try{window.parent.postMessage({type:"valbrowse-panic"},"*");}catch(_e){}try{if(window.top)window.top.location.replace(' + JSON.stringify(CFG.panicUrl) + ');}catch(_e){}}},true);})();<\\/script>';

      var activeModuleObj = null;
      var moduleOverlay = document.getElementById('module-overlay');
      var moduleFrame = document.getElementById('module-ov-frame');
      var moduleStatus = document.getElementById('module-ov-status');
      var moduleMsg = document.getElementById('module-ov-msg');
      var moduleSpinner = document.getElementById('module-ov-spinner');

      function getBaseDir(url) {
        var c = String(url || '').split('#')[0].split('?')[0];
        var idx = c.lastIndexOf('/');
        return idx === -1 ? c + '/' : c.slice(0, idx + 1);
      }

      function sanitizeAndInjectHtml(rawHtml, sourceUrl) {
        var html = rawHtml || '';
        html = html.replace(/<template\\b[^>]*data-ad-rail-template[^>]*>[\\s\\S]*?<\\/template>/gi, '');
        html = html.replace(/<ins\\b[^>]*class=["'][^"']*adsbygoogle[^"']*["'][^>]*>[\\s\\S]*?<\\/ins>/gi, '');
        html = html.replace(/<iframe\\b[^>]*src=["']([^"']+)["'][^>]*>[\\s\\S]*?<\\/iframe>/gi, function (m, s) {
          return SRC_RES.some(function (re) { return re.test(s); }) ? '' : m;
        });
        html = html.replace(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi, function (full, attrs, body) {
          var sm = attrs.match(/\\bsrc\\s*=\\s*["']([^"']+)["']/i);
          if (sm && sm[1]) return SRC_RES.some(function (re) { return re.test(sm[1]); }) ? '' : full;
          if (body && INLINE_RES.some(function (re) { return re.test(body); })) return '';
          return full;
        });
        var baseTag = /<base\\b[^>]*href=/i.test(html) ? '' : ('<base href="' + getBaseDir(sourceUrl) + '">');
        var inj = baseTag + '\\n' + CFG.adPrelude + '\\n' + ESCAPE_INJECT + '\\n';
        if (/<head\\b[^>]*>/i.test(html)) {
          return html.replace(/(<head\\b[^>]*>)/i, '$1\\n' + inj);
        }
        return '<!DOCTYPE html><html><head>' + inj + '</head><body>' + html + '</body></html>';
      }

      function buildMirrorUrls(url) {
        var out = [url];
        var m = String(url || '').match(/^https?:\\/\\/(?:cdn|fastly|gcore)\\.jsdelivr\\.net\\/gh\\/([^/]+)\\/([^/@]+)(?:@([^/]+))?\\/(.+)$/i);
        if (m) {
          out.push('https://fastly.jsdelivr.net/gh/' + m[1] + '/' + m[2] + '@' + (m[3] || 'main') + '/' + m[4]);
          out.push('https://raw.githubusercontent.com/' + m[1] + '/' + m[2] + '/' + (m[3] || 'main') + '/' + m[4]);
          out.push('https://rawcdn.githack.com/' + m[1] + '/' + m[2] + '/' + (m[3] || 'main') + '/' + m[4]);
        }
        return out;
      }

      async function launchStudyModule(moduleItem) {
        activeModuleObj = moduleItem;
        if (typeof recordVuxStat === 'function') recordVuxStat('gamesLaunched', 1);
        moduleOverlay.classList.add('open');
        document.getElementById('module-ov-provider').textContent = String(moduleItem.provider || 'module').toUpperCase();
        document.getElementById('module-ov-title').textContent = moduleItem.name;
        moduleStatus.classList.add('open');
        moduleSpinner.style.display = 'block';
        moduleMsg.textContent = 'Loading ' + moduleItem.name + ' (ads blocked)...';
        moduleFrame.removeAttribute('src');
        moduleFrame.removeAttribute('srcdoc');

        var mirrors = buildMirrorUrls(moduleItem.url);
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i]);
            if (!res.ok) continue;
            var txt = await res.text();
            if (!txt || txt.length < 40) continue;
            if (activeModuleObj !== moduleItem) return;
            moduleFrame.onload = function () { moduleStatus.classList.remove('open'); };
            moduleFrame.srcdoc = sanitizeAndInjectHtml(txt, moduleItem.baseUrl || moduleItem.url);
            return;
          } catch (_e) {}
        }
        try {
          moduleMsg.textContent = 'Routing ' + moduleItem.name + ' through Vux Scramjet proxy...';
          var scramRes = await resolveScramUrlViaBridge(moduleItem.url);
          if (activeModuleObj !== moduleItem) return;
          if (scramRes && scramRes.encodedUrl) {
            moduleFrame.onload = function () { moduleStatus.classList.remove('open'); };
            moduleFrame.src = scramRes.encodedUrl;
            setTimeout(function () { moduleStatus.classList.remove('open'); }, 3500);
            return;
          }
        } catch (_pe) {}
        moduleSpinner.style.display = 'none';
        moduleMsg.textContent = 'Unable to load module directly — click Open in Vux to launch in a proxied tab.';
      }

      document.getElementById('module-ov-close').addEventListener('click', function () {
        activeModuleObj = null;
        moduleFrame.removeAttribute('srcdoc');
        moduleFrame.removeAttribute('src');
        moduleOverlay.classList.remove('open');
      });
      var modPipBtn = document.getElementById('module-ov-pip');
      if (modPipBtn) {
        modPipBtn.addEventListener('click', function () {
          if (!activeModuleObj) return;
          var modSnap = activeModuleObj;
          var docHtml = moduleFrame.getAttribute('srcdoc') || '';
          document.getElementById('module-ov-close').click();
          if (docHtml && typeof openVuxPipSrcdoc === 'function') {
            openVuxPipSrcdoc(docHtml, modSnap.name);
          } else if (typeof openVuxPip === 'function') {
            openVuxPip(modSnap.url, modSnap.name, true);
          }
        });
      }
      document.getElementById('module-ov-reload').addEventListener('click', function () {
        if (activeModuleObj) launchStudyModule(activeModuleObj);
      });
      document.getElementById('module-ov-proxy').addEventListener('click', function () {
        if (activeModuleObj) {
          var u = activeModuleObj.url;
          document.getElementById('module-ov-close').click();
          openInValBrowse(u);
        }
      });
      document.getElementById('module-ov-fs').addEventListener('click', function () {
        var st = document.getElementById('module-ov-stage');
        if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
        else if (st.requestFullscreen) st.requestFullscreen().catch(function () {});
      });

      /* ---------------- AUTHENTIC GN-MATH SCRIPT TAB ---------------- */
      var gnScriptLoaded = false;
      async function loadGnScript(force) {
        if (gnScriptLoaded && !force) return;
        var st = document.getElementById('gn-script-status');
        st.textContent = 'Loading authentic gn-math portal script...';
        for (var i = 0; i < CFG.gnScriptUrls.length; i++) {
          try {
            var res = await fetch(CFG.gnScriptUrls[i] + '?t=' + Date.now());
            if (!res.ok) continue;
            var html = await res.text();
            if (!html || html.length < 200) continue;
            var frame = document.getElementById('gn-script-frame');
            frame.srcdoc = sanitizeAndInjectHtml(html, 'https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/');
            st.textContent = 'Source: cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html';
            gnScriptLoaded = true;
            return;
          } catch (_e) {}
        }
        st.textContent = 'Unable to reach jsDelivr right now — click Open in Vux to proxy gn-math.';
      }

      document.getElementById('gn-tab-zones').addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('gn-tab-script').classList.remove('active');
        document.getElementById('gn-zones-pane').style.display = 'flex';
        document.getElementById('gn-script-pane').style.display = 'none';
      });

      document.getElementById('gn-tab-script').addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('gn-tab-zones').classList.remove('active');
        document.getElementById('gn-zones-pane').style.display = 'none';
        document.getElementById('gn-script-pane').style.display = 'flex';
        loadGnScript(false);
      });

      document.getElementById('gn-reload-script').addEventListener('click', function () { loadGnScript(true); });
      document.getElementById('gn-open-proxy').addEventListener('click', function () {
        openInValBrowse('https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html');
      });

      /* ---------------- MOVIES & TV (TVMAZE + ARCHIVE.ORG + OPTIONAL TMDB) ---------------- */
      var movieGenre = 'all';
      var activeMovieObj = null;
      var activeMovieEpisodes = [];
      var activeSelectedEpisode = null;
      var tvMazeShowsCache = Array.isArray(CFG.cinemaFallbackShows) ? CFG.cinemaFallbackShows.slice() : [];
      var archiveMoviesCache = Array.isArray(CFG.cinemaFallbackMovies) ? CFG.cinemaFallbackMovies.slice() : [];
      var tmdbMoviesCache = [];
      var cinemaSearchResults = null;
      var cinemaLiveFetched = false;

      function stripHtmlClient(raw) {
        return String(raw || '')
          .replace(/<\\/?(?:b|i|em|strong|span|u)\\b[^>]*>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/&amp;/gi, '&')
          .replace(/&quot;/gi, '"')
          .replace(/&#39;/gi, "'")
          .replace(/\\s+/g, ' ')
          .replace(/\\s+([.,!?;:])/g, '$1')
          .trim();
      }

      function mapGenresClient(genres, source, showType, lang, rating) {
        var tags = ['all'];
        if (source === 'archive') tags.push('public-domain');
        if (source === 'tmdb' || (typeof rating === 'number' && rating >= 7.8)) tags.push('trending');
        var gs = (genres || []).map(function (g) { return String(g || '').toLowerCase(); });
        var st = String(showType || '').toLowerCase();
        var ln = String(lang || '').toLowerCase();
        if (gs.some(function (g) { return g.indexOf('action') !== -1 || g.indexOf('adventure') !== -1 || g.indexOf('thriller') !== -1; })) tags.push('action');
        if (gs.some(function (g) { return g.indexOf('science-fiction') !== -1 || g.indexOf('sci-fi') !== -1 || g.indexOf('fantasy') !== -1; })) tags.push('sci-fi');
        if (gs.some(function (g) { return g.indexOf('comedy') !== -1; })) tags.push('comedy');
        if (gs.some(function (g) { return g.indexOf('anime') !== -1; }) || (st.indexOf('animation') !== -1 && ln === 'japanese')) tags.push('anime');
        return tags;
      }

      function normalizeTvMazeClient(show) {
        if (!show || !show.id || !show.name) return null;
        var genres = Array.isArray(show.genres) ? show.genres : [];
        var rating = show.rating && typeof show.rating.average === 'number' ? show.rating.average : null;
        var ym = String(show.premiered || '').match(/^(\\d{4})/);
        var net = (show.network && show.network.name) || (show.webChannel && show.webChannel.name) || 'TV Network';
        return {
          id: 'tvmaze:' + show.id,
          externalId: String(show.id),
          source: 'tvmaze',
          title: String(show.name).trim(),
          year: ym ? ym[1] : '',
          rating: rating,
          genres: genres,
          categoryTags: mapGenresClient(genres, 'tvmaze', show.type, show.language, rating),
          summary: stripHtmlClient(show.summary) || 'No synopsis available.',
          poster: (show.image && (show.image.medium || show.image.original)) || null,
          backdrop: (show.image && (show.image.original || show.image.medium)) || null,
          networkOrStudio: net,
          cast: [],
          embedUrl: '',
          watchPageUrl: (show.officialSite && String(show.officialSite).trim()) || ('https://www.tvmaze.com/shows/' + show.id),
          isFullMovie: false,
          imdbId: show.externals && show.externals.imdb ? String(show.externals.imdb).trim() : null
        };
      }

      function normalizeArchiveClient(doc) {
        if (!doc || !doc.identifier) return null;
        var id = String(doc.identifier).trim();
        var title = Array.isArray(doc.title) ? String(doc.title[0] || id).trim() : String(doc.title || id).trim();
        var desc = stripHtmlClient(Array.isArray(doc.description) ? doc.description[0] : doc.description) || 'Complete legal public-domain feature film on Internet Archive.';
        var yr = Array.isArray(doc.year) ? doc.year[0] : doc.year;
        var low = (title + ' ' + desc).toLowerCase();
        var tags = ['all', 'public-domain'];
        var genres = ['Public Domain'];
        if (/comedy|keaton|chaplin|friday/.test(low)) { genres.push('Comedy'); tags.push('comedy'); }
        if (/sci-fi|space|living dead|plan 9|superman|scientist/.test(low)) { genres.push('Sci-Fi'); tags.push('sci-fi'); }
        if (/action|adventure|general|war|western/.test(low)) { genres.push('Action'); tags.push('action'); }
        return {
          id: 'archive:' + id,
          externalId: id,
          source: 'archive',
          title: title,
          year: yr ? String(yr).slice(0, 4) : '',
          rating: null,
          genres: genres,
          categoryTags: tags,
          summary: desc,
          poster: 'https://archive.org/services/img/' + encodeURIComponent(id),
          backdrop: 'https://archive.org/services/img/' + encodeURIComponent(id),
          networkOrStudio: 'Internet Archive Cinema',
          cast: ['Public Domain Feature'],
          embedUrl: 'https://archive.org/embed/' + encodeURIComponent(id),
          watchPageUrl: 'https://archive.org/details/' + encodeURIComponent(id),
          isFullMovie: true
        };
      }

      function normalizeTmdbClient(m) {
        if (!m || !m.id || !(m.title || m.name)) return null;
        var rel = String(m.release_date || m.first_air_date || '');
        var rating = typeof m.vote_average === 'number' && m.vote_average > 0 ? Number(m.vote_average.toFixed(1)) : null;
        return {
          id: 'tmdb:' + m.id,
          externalId: String(m.id),
          source: 'tmdb',
          title: String(m.title || m.name).trim(),
          year: rel ? rel.slice(0, 4) : '',
          rating: rating,
          genres: ['TMDB Trending'],
          categoryTags: ['all', 'trending'],
          summary: String(m.overview || '').trim() || 'Trending TMDB movie.',
          poster: m.poster_path ? ('https://image.tmdb.org/t/p/w500' + m.poster_path) : null,
          backdrop: m.backdrop_path ? ('https://image.tmdb.org/t/p/w780' + m.backdrop_path) : null,
          networkOrStudio: 'TMDB',
          cast: [],
          embedUrl: '',
          watchPageUrl: 'https://www.themoviedb.org/movie/' + m.id,
          isFullMovie: false
        };
      }

      function getActiveCinemaPool() {
        if (Array.isArray(cinemaSearchResults)) return cinemaSearchResults;
        var combined = [];
        var seen = {};
        function pushUnique(arr) {
          (arr || []).forEach(function (item) {
            if (!item || seen[item.id]) return;
            seen[item.id] = true;
            combined.push(item);
          });
        }
        if (movieGenre === 'public-domain') {
          pushUnique(archiveMoviesCache);
        } else {
          pushUnique(tmdbMoviesCache);
          pushUnique(tvMazeShowsCache);
          pushUnique(archiveMoviesCache);
        }
        return combined;
      }

      function renderMoviesFiltered() {
        var grid = document.getElementById('movies-grid');
        if (!grid) return;
        var q = (document.getElementById('movies-query').value || '').trim().toLowerCase();
        var pool = getActiveCinemaPool();
        var list = pool.filter(function (m) {
          if (movieGenre !== 'all' && (!m.categoryTags || m.categoryTags.indexOf(movieGenre) === -1)) return false;
          if (q && !Array.isArray(cinemaSearchResults)) {
            var hay = (m.title + ' ' + m.summary + ' ' + (m.genres || []).join(' ') + ' ' + m.networkOrStudio).toLowerCase();
            if (hay.indexOf(q) === -1) return false;
          }
          return true;
        });

        grid.innerHTML = '';
        if (list.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = 'No titles matched this filter. Try searching TVMaze or switching to All / Full Public-Domain Movies.';
          grid.appendChild(empty);
          return;
        }

        list.slice(0, 60).forEach(function (m) {
          var card = document.createElement('div');
          card.className = 'card';
          card.setAttribute('data-cinema-id', m.id);
          card.onclick = function () { openMovie(m); };

          var thumb = document.createElement('div');
          thumb.className = 'cinema-poster-wrap';

          var srcChip = document.createElement('span');
          srcChip.className = 'provider-chip';
          srcChip.textContent = m.source === 'archive' ? 'FULL MOVIE' : (m.source === 'tmdb' ? 'TMDB' : 'TVMAZE');
          thumb.appendChild(srcChip);

          if (typeof m.rating === 'number') {
            var rChip = document.createElement('span');
            rChip.className = 'rating-chip';
            rChip.textContent = '★ ' + m.rating.toFixed(1);
            thumb.appendChild(rChip);
          }

          var fb = document.createElement('div');
          fb.className = 'thumb-fallback';
          fb.textContent = m.title;
          thumb.appendChild(fb);

          if (m.poster) {
            var img = document.createElement('img');
            img.src = m.poster;
            img.alt = m.title;
            img.loading = 'lazy';
            img.referrerPolicy = 'no-referrer';
            img.style.position = 'relative';
            img.style.zIndex = '2';
            img.onerror = function () { img.style.display = 'none'; };
            thumb.appendChild(img);
          }

          var body = document.createElement('div');
          body.className = 'card-body';
          var t = document.createElement('div');
          t.className = 'card-title';
          t.textContent = m.title;
          var d = document.createElement('div');
          d.className = 'card-meta';
          d.textContent = (m.year ? m.year + ' · ' : '') + ((m.genres && m.genres.slice(0, 2).join(', ')) || m.networkOrStudio);
          body.appendChild(t);
          body.appendChild(d);

          card.appendChild(thumb);
          card.appendChild(body);
          grid.appendChild(card);
        });

        var statusEl = document.getElementById('movies-status');
        if (statusEl && cinemaLiveFetched) {
          statusEl.textContent = 'Showing ' + Math.min(list.length, 60) + ' of ' + list.length + ' titles';
        }
      }

      async function loadCinemaLiveCatalog() {
        var statusEl = document.getElementById('movies-status');
        if (statusEl) statusEl.textContent = 'Syncing TVMaze + Internet Archive cinema...';
        var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();

        var tasks = [
          fetch(CFG.tvmazeShowsUrl).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
          fetch(CFG.archiveFeatureFilmsUrl).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
          tmdbKey
            ? fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=' + encodeURIComponent(tmdbKey)).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
            : Promise.resolve(null)
        ];

        var results = await Promise.all(tasks);
        if (Array.isArray(results[0]) && results[0].length > 0) {
          tvMazeShowsCache = results[0].slice(0, 72).map(normalizeTvMazeClient).filter(Boolean);
        }
        if (results[1] && results[1].response && Array.isArray(results[1].response.docs) && results[1].response.docs.length > 0) {
          var liveArchive = results[1].response.docs.map(normalizeArchiveClient).filter(Boolean);
          archiveMoviesCache = liveArchive.concat(CFG.cinemaFallbackMovies || []).filter(function (item, idx, arr) {
            return arr.findIndex(function (x) { return x.id === item.id; }) === idx;
          });
        }
        if (results[2] && Array.isArray(results[2].results)) {
          tmdbMoviesCache = results[2].results.slice(0, 24).map(normalizeTmdbClient).filter(Boolean);
        } else {
          tmdbMoviesCache = [];
        }
        cinemaLiveFetched = true;
        renderMoviesFiltered();
      }

      var activePlayerSource = 'archive';
      var activePlayerSources = { trailer: '', archive: '', custom: '' };

      function normalizeDirectEmbedUrlClient(rawUrl) {
        var trimmed = String(rawUrl || '').trim();
        var scramIdx = trimmed.indexOf('/scram/');
        if (scramIdx !== -1) {
          var after = trimmed.slice(scramIdx + 7);
          try {
            var dec = decodeURIComponent(after);
            if (/^https?:\\/\\//i.test(dec)) trimmed = dec;
          } catch (_e) {
            if (/^https?:\\/\\//i.test(after)) trimmed = after;
          }
        }
        if (!trimmed || /^(javascript|data|vbscript|file):/i.test(trimmed)) return '';
        var withProto = /^https?:\\/\\//i.test(trimmed) ? trimmed : ('https://' + trimmed);
        try {
          var parsed = new URL(withProto);
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
          var host = parsed.hostname.toLowerCase().replace(/^www\\./, '');
          var ytId = '';
          if (host === 'youtu.be') {
            ytId = parsed.pathname.replace(/^\\/+/, '').split('/')[0] || '';
          } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
            if (parsed.pathname === '/watch') {
              ytId = parsed.searchParams.get('v') || '';
            } else {
              var ym = parsed.pathname.match(/^\\/(?:embed|shorts|live)\\/([^\\/?#]+)/);
              if (ym && ym[1]) ytId = ym[1];
            }
          }
          if (ytId) {
            return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(ytId) + '?autoplay=1&rel=0';
          }
          if (host === 'archive.org') {
            var am = parsed.pathname.match(/^\\/(?:details|embed)\\/([^\\/?#]+)/);
            if (am && am[1]) {
              return 'https://archive.org/embed/' + encodeURIComponent(decodeURIComponent(am[1]));
            }
          }
          if (host === 'vimeo.com') {
            var vm = parsed.pathname.match(/^\\/(\\d+)/);
            if (vm && vm[1]) {
              return 'https://player.vimeo.com/video/' + vm[1];
            }
          }
          if (host === 'dailymotion.com' || host === 'dai.ly' || host === 'geo.dailymotion.com') {
            if (host === 'dai.ly') {
              var dmShort = parsed.pathname.replace(/^\\/+/, '').split('/')[0];
              if (dmShort) return 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(dmShort) + '?autoplay=1';
            }
            if (host === 'geo.dailymotion.com') {
              var vidParam = parsed.searchParams.get('video');
              if (vidParam) return 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(vidParam) + '?autoplay=1';
            }
            var dmm = parsed.pathname.match(/^\\/(?:embed\\/)?video\\/([^\\/?#_]+)/);
            if (dmm && dmm[1]) {
              return 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(dmm[1]) + '?autoplay=1';
            }
          }
          return parsed.toString();
        } catch (_e) {
          return '';
        }
      }

      function pickBestArchiveMovieIdClient(docs, showTitle) {
        if (!Array.isArray(docs) || docs.length === 0) return null;
        var cleanTitle = String(showTitle || '').toLowerCase().trim();
        var bestId = null;
        var bestScore = -999;
        for (var i = 0; i < docs.length; i++) {
          var d = docs[i];
          if (!d || !d.identifier) continue;
          var id = String(d.identifier).trim();
          var rawTitle = Array.isArray(d.title) ? d.title[0] : d.title;
          var t = String(rawTitle || id).toLowerCase();
          var lowId = id.toLowerCase();
          var score = 0;
          if (cleanTitle && t.indexOf(cleanTitle) !== -1) score += 6;
          if (/trailer|promo|teaser|intro|clip|episode|feature|film|movie/.test(t)) score += 4;
          if (lowId.indexOf('youtube-') === 0 || t.indexOf('video') !== -1) score += 1;
          if (/podcast|soundtrack|score|audio|mp3|radio|coptx-/.test(lowId + ' ' + t)) score -= 10;
          if (/essay|review|disaster|promotes|violence|explained|analysis|reaction|debate/.test(t)) score -= 6;
          if (score > bestScore) {
            bestScore = score;
            bestId = id;
          }
        }
        return bestId;
      }

      function syncSourceSwitcherUi(mode) {
        activePlayerSource = mode;
        document.querySelectorAll('#cinema-source-switcher [data-player-source]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-player-source') === mode);
        });
      }

      function syncNewTabPlayerLinks(candidateUrl) {
        var fallbackSearch = activeMovieObj
          ? (activeMovieObj.watchPageUrl || ('https://www.youtube.com/results?search_query=' + encodeURIComponent(activeMovieObj.title + ' trailer')))
          : 'https://archive.org';
        var href = String(candidateUrl || '').trim() || fallbackSearch;
        var topLink = document.getElementById('cinema-open-new-tab');
        var fbLink = document.getElementById('cinema-fallback-new-tab');
        if (topLink) topLink.href = href;
        if (fbLink) fbLink.href = href;
      }

      function setTheaterIframeUrl(url, fallbackTitle, fallbackMsg) {
        var ifr = document.getElementById('cinema-player-frame');
        var fb = document.getElementById('cinema-player-fallback');
        var embedIn = document.getElementById('cinema-embed-input');
        var cleanUrl = normalizeDirectEmbedUrlClient(url);
        if (embedIn && cleanUrl) embedIn.value = cleanUrl;
        syncNewTabPlayerLinks(cleanUrl);
        if (!cleanUrl) {
          ifr.removeAttribute('src');
          document.getElementById('cinema-fallback-title').textContent = fallbackTitle || 'No direct embed stream selected';
          document.getElementById('cinema-fallback-msg').textContent = fallbackMsg || 'Use Internet Archive for full public-domain streams, paste a custom embed URL below, or click Open Player in New Tab.';
          fb.classList.add('open');
          return;
        }
        fb.classList.remove('open');
        ifr.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
        ifr.setAttribute('allowfullscreen', '');
        ifr.setAttribute('referrerpolicy', 'no-referrer');
        ifr.removeAttribute('sandbox');
        ifr.onerror = function () {
          document.getElementById('cinema-fallback-title').textContent = 'External embed blocked or unavailable';
          document.getElementById('cinema-fallback-msg').textContent = 'This host may block iframe embedding via X-Frame-Options. Click "Open Player in New Tab" or switch Player Source above.';
          fb.classList.add('open');
        };
        ifr.src = cleanUrl;
      }

      async function selectPlayerSource(mode) {
        syncSourceSwitcherUi(mode);
        if (!activeMovieObj) return;
        var m = activeMovieObj;

        if (mode === 'custom') {
          var embedIn = document.getElementById('cinema-embed-input');
          var rawIn = (embedIn && embedIn.value ? embedIn.value : '').trim();
          var candidate = activePlayerSources.custom || normalizeDirectEmbedUrlClient(rawIn);
          if (candidate) {
            activePlayerSources.custom = candidate;
            setTheaterIframeUrl(candidate);
          } else {
            setTheaterIframeUrl(
              '',
              'Paste a Custom Embed URL below',
              'Supports direct YouTube, youtube-nocookie, Archive.org, Vimeo, or custom embed URLs (never routed through /scram/).'
            );
            if (embedIn) embedIn.focus();
          }
          return;
        }

        if (mode === 'archive') {
          if (activePlayerSources.archive) {
            setTheaterIframeUrl(activePlayerSources.archive);
            return;
          }
          setTheaterIframeUrl('', 'Searching Internet Archive for "' + m.title + '"...', 'Looking up public-domain Archive.org embed stream...');
          try {
            var queries = [
              'title:("' + m.title + '") AND mediatype:(movies)',
              'title:(' + m.title + ') AND mediatype:(movies)',
              '("' + m.title + '") AND mediatype:(movies)'
            ];
            for (var qi = 0; qi < queries.length; qi++) {
              var arcRes = await fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(queries[qi]) + '&fl[]=identifier,title&rows=10&output=json');
              if (arcRes.ok && activeMovieObj === m) {
                var arcJson = await arcRes.json();
                var docs = (arcJson && arcJson.response && Array.isArray(arcJson.response.docs)) ? arcJson.response.docs : [];
                var pickedId = pickBestArchiveMovieIdClient(docs, m.title);
                if (pickedId) {
                  var foundUrl = 'https://archive.org/embed/' + encodeURIComponent(pickedId);
                  activePlayerSources.archive = foundUrl;
                  if (activePlayerSource === 'archive') setTheaterIframeUrl(foundUrl);
                  return;
                }
              }
            }
          } catch (_e) {}
          if (activeMovieObj === m && activePlayerSource === 'archive') {
            setTheaterIframeUrl(
              '',
              'No public-domain Internet Archive stream matched "' + m.title + '"',
              'Switch to Trailer or Custom Embed URL above, or click Open Player in New Tab.'
            );
          }
          return;
        }

        // Trailer mode: try TMDB (if key present), then Internet Archive video stream (zero 403/no-referrer issues), then /api/cinema/trailer fallback
        if (activePlayerSources.trailer) {
          setTheaterIframeUrl(activePlayerSources.trailer);
          return;
        }
        setTheaterIframeUrl('', 'Loading video stream for "' + m.title + '"...', 'Resolving playable theater embed...');
        var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();
        if (tmdbKey) {
          try {
            var tmdbVidEndpoint = '';
            if (m.source === 'tmdb') {
              tmdbVidEndpoint = 'https://api.themoviedb.org/3/movie/' + encodeURIComponent(m.externalId) + '/videos?api_key=' + encodeURIComponent(tmdbKey);
            } else {
              var sr = await fetch('https://api.themoviedb.org/3/search/tv?query=' + encodeURIComponent(m.title) + '&api_key=' + encodeURIComponent(tmdbKey));
              if (sr.ok) {
                var srJson = await sr.json();
                var firstMatch = srJson && Array.isArray(srJson.results) ? srJson.results[0] : null;
                if (firstMatch && firstMatch.id) {
                  tmdbVidEndpoint = 'https://api.themoviedb.org/3/tv/' + encodeURIComponent(firstMatch.id) + '/videos?api_key=' + encodeURIComponent(tmdbKey);
                }
              }
            }
            if (tmdbVidEndpoint) {
              var vRes = await fetch(tmdbVidEndpoint);
              if (vRes.ok && activeMovieObj === m) {
                var vJson = await vRes.json();
                var vids = Array.isArray(vJson && vJson.results) ? vJson.results : [];
                var tr = vids.find(function (v) { return v.site === 'YouTube' && v.type === 'Trailer' && v.key; }) ||
                         vids.find(function (v) { return v.site === 'YouTube' && v.key; });
                if (tr) {
                  var ytUrl = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(tr.key) + '?autoplay=1&rel=0';
                  activePlayerSources.trailer = ytUrl;
                  if (activePlayerSource === 'trailer') setTheaterIframeUrl(ytUrl);
                  return;
                }
              }
            }
          } catch (_e) {}
        }

        // Lookup matching video/trailer clip on Internet Archive (embeds reliably with referrerpolicy="no-referrer")
        try {
          var arcTrailerQueries = [
            'title:(' + m.title + ') AND mediatype:(movies)',
            '("' + m.title + '") AND mediatype:(movies)'
          ];
          for (var ati = 0; ati < arcTrailerQueries.length; ati++) {
            var fbArcRes = await fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(arcTrailerQueries[ati]) + '&fl[]=identifier,title&rows=10&output=json');
            if (fbArcRes.ok && activeMovieObj === m) {
              var fbArcJson = await fbArcRes.json();
              var fbDocs = (fbArcJson && fbArcJson.response && Array.isArray(fbArcJson.response.docs)) ? fbArcJson.response.docs : [];
              var bestArcId = pickBestArchiveMovieIdClient(fbDocs, m.title);
              if (bestArcId) {
                var fbArcUrl = 'https://archive.org/embed/' + encodeURIComponent(bestArcId);
                activePlayerSources.archive = fbArcUrl;
                activePlayerSources.trailer = fbArcUrl;
                if (activePlayerSource === 'trailer') setTheaterIframeUrl(fbArcUrl);
                return;
              }
            }
          }
        } catch (_e) {}

        // Server-side trailer ID fallback (sets both iframe & Open Player in New Tab URL)
        try {
          if (CFG.originUrl && /^https?:/i.test(CFG.originUrl)) {
            var srvRes = await fetch(CFG.originUrl + '/api/cinema/trailer?q=' + encodeURIComponent(m.title + (m.year ? ' ' + m.year : '') + ' official trailer'));
            if (srvRes.ok && activeMovieObj === m) {
              var srvJson = await srvRes.json();
              if (srvJson && srvJson.embedUrl) {
                activePlayerSources.trailer = srvJson.embedUrl;
                if (activePlayerSource === 'trailer') {
                  setTheaterIframeUrl(srvJson.embedUrl);
                  if (srvJson.watchUrl) syncNewTabPlayerLinks(srvJson.watchUrl);
                }
                return;
              }
            }
          }
        } catch (_e) {}

        if (activeMovieObj === m && activePlayerSource === 'trailer') {
          var ytSearchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(m.title + (m.year ? ' ' + m.year : '') + ' trailer');
          syncNewTabPlayerLinks(ytSearchUrl);
          document.getElementById('cinema-player-frame').removeAttribute('src');
          document.getElementById('cinema-fallback-title').textContent = m.title + ' — Trailer Ready in New Tab';
          document.getElementById('cinema-fallback-msg').textContent = 'Click Open Player in New Tab to watch "' + m.title + '" trailer directly, or paste a Custom Embed URL below.';
          document.getElementById('cinema-player-fallback').classList.add('open');
        }
      }

      function renderEpisodesForSeason(seasonNum) {
        var listWrap = document.getElementById('cinema-episodes-list');
        var detailEl = document.getElementById('cinema-episode-detail');
        listWrap.innerHTML = '';
        var eps = activeMovieEpisodes.filter(function (ep) { return Number(ep.season) === Number(seasonNum); });
        if (!eps.length) {
          detailEl.textContent = 'No episodes listed for this season.';
          return;
        }
        eps.forEach(function (ep, idx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'episode-btn' + (activeSelectedEpisode ? (activeSelectedEpisode.id === ep.id ? ' active' : '') : (idx === 0 ? ' active' : ''));
          var l1 = document.createElement('div');
          l1.style.cssText = 'font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          l1.textContent = 'S' + ep.season + 'E' + ep.number + ' · ' + ep.name;
          var l2 = document.createElement('div');
          l2.className = 'sub';
          l2.textContent = (ep.airdate || 'Episode') + (ep.runtime ? ' · ' + ep.runtime + 'm' : '');
          b.appendChild(l1);
          b.appendChild(l2);
          b.onclick = function () {
            activeSelectedEpisode = ep;
            listWrap.querySelectorAll('.episode-btn').forEach(function (x) { x.classList.remove('active'); });
            b.classList.add('active');
            detailEl.textContent = 'S' + ep.season + 'E' + ep.number + ' — ' + ep.name + ': ' + ep.summary;
            var tmpl = (safeLSGet('valem_embed_template') || '').trim();
            if (tmpl && activeMovieObj) {
              var resolved = tmpl
                .replace(/\\{id\\}/gi, encodeURIComponent(activeMovieObj.externalId))
                .replace(/\\{imdb\\}/gi, encodeURIComponent(activeMovieObj.imdbId || activeMovieObj.externalId))
                .replace(/\\{season\\}/gi, String(ep.season))
                .replace(/\\{episode\\}/gi, String(ep.number));
              activePlayerSources.custom = normalizeDirectEmbedUrlClient(resolved);
              syncSourceSwitcherUi('custom');
              setTheaterIframeUrl(activePlayerSources.custom);
            }
          };
          listWrap.appendChild(b);
        });
        var firstEp = activeSelectedEpisode && eps.some(function (e) { return e.id === activeSelectedEpisode.id; }) ? activeSelectedEpisode : eps[0];
        activeSelectedEpisode = firstEp;
        detailEl.textContent = 'S' + firstEp.season + 'E' + firstEp.number + ' — ' + firstEp.name + ': ' + firstEp.summary;
      }

      async function openMovie(m) {
        activeMovieObj = m;
        activeMovieEpisodes = [];
        activeSelectedEpisode = null;

        var tmpl = (safeLSGet('valem_embed_template') || '').trim();
        var templateUrl = tmpl
          ? normalizeDirectEmbedUrlClient(
              tmpl
                .replace(/\\{id\\}/gi, encodeURIComponent(m.externalId))
                .replace(/\\{imdb\\}/gi, encodeURIComponent(m.imdbId || m.externalId))
                .replace(/\\{season\\}/gi, '1')
                .replace(/\\{episode\\}/gi, '1')
            )
          : '';
        activePlayerSources = {
          trailer: m.youtubeKey ? ('https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m.youtubeKey) + '?autoplay=1&rel=0') : '',
          archive: m.source === 'archive' ? ('https://archive.org/embed/' + encodeURIComponent(m.externalId)) : '',
          custom: templateUrl
        };

        document.getElementById('movie-ov-title').textContent = m.title + (m.year ? ' (' + m.year + ')' : '');
        document.getElementById('movie-ov-source').textContent = m.source === 'archive' ? 'FULL PUBLIC-DOMAIN MOVIE' : (m.source === 'tmdb' ? 'TMDB DISCOVERY' : 'TVMAZE SERIES');
        document.getElementById('cinema-ov-network').textContent = m.networkOrStudio || 'Cinema';
        document.getElementById('cinema-ov-rating').textContent = typeof m.rating === 'number' ? ('Rating: ★ ' + m.rating.toFixed(1) + ' / 10') : '';
        document.getElementById('cinema-ov-genres').textContent = (m.genres || []).join(' · ');
        document.getElementById('cinema-ov-synopsis').textContent = m.summary || 'No synopsis available.';
        document.getElementById('cinema-ov-cast').textContent = (m.cast && m.cast.length) ? ('Cast: ' + m.cast.join(', ')) : '';
        var embedIn = document.getElementById('cinema-embed-input');
        if (embedIn) embedIn.value = activePlayerSources.archive || activePlayerSources.trailer || activePlayerSources.custom || '';

        var epPanel = document.getElementById('cinema-episodes-panel');
        epPanel.style.display = 'none';
        document.getElementById('movie-overlay').classList.add('open');

        if (m.source === 'archive') {
          await selectPlayerSource('archive');
          return;
        }

        if (m.source === 'tmdb') {
          await selectPlayerSource(activePlayerSources.custom ? 'custom' : 'trailer');
          return;
        }

        // TVMaze Show: auto-play live official trailer AND load episodes/cast concurrently
        var trailerTask = selectPlayerSource(activePlayerSources.custom ? 'custom' : 'trailer');

        try {
          var epRes = await fetch('https://api.tvmaze.com/shows/' + encodeURIComponent(m.externalId) + '?embed[]=episodes&embed[]=cast');
          if (epRes.ok && activeMovieObj === m) {
            var details = await epRes.json();
            var castArr = (details && details._embedded && Array.isArray(details._embedded.cast))
              ? details._embedded.cast.slice(0, 8).map(function (c) {
                  return c && c.person ? (c.person.name + (c.character && c.character.name ? ' (' + c.character.name + ')' : '')) : '';
                }).filter(Boolean)
              : [];
            if (castArr.length) {
              document.getElementById('cinema-ov-cast').textContent = 'Cast: ' + castArr.join(', ');
            }
            var epsRaw = (details && details._embedded && Array.isArray(details._embedded.episodes)) ? details._embedded.episodes : [];
            activeMovieEpisodes = epsRaw.map(function (ep) {
              return {
                id: ep.id,
                season: Number(ep.season || 1),
                number: Number(ep.number || 1),
                name: String(ep.name || ('Episode ' + (ep.number || 1))),
                runtime: typeof ep.runtime === 'number' ? ep.runtime : null,
                airdate: String(ep.airdate || ''),
                summary: stripHtmlClient(ep.summary) || 'Episode synopsis unavailable.'
              };
            });
            if (activeMovieEpisodes.length > 0) {
              var seasonNums = [];
              activeMovieEpisodes.forEach(function (ep) {
                if (seasonNums.indexOf(ep.season) === -1) seasonNums.push(ep.season);
              });
              seasonNums.sort(function (a, b) { return a - b; });
              var seasonSel = document.getElementById('cinema-season-select');
              seasonSel.innerHTML = '';
              seasonNums.forEach(function (sn) {
                var opt = document.createElement('option');
                opt.value = String(sn);
                opt.textContent = 'Season ' + sn;
                seasonSel.appendChild(opt);
              });
              document.getElementById('cinema-episodes-heading').textContent = m.title + ' · ' + activeMovieEpisodes.length + ' Episodes';
              epPanel.style.display = 'flex';
              renderEpisodesForSeason(seasonNums[0]);
            }
          }
        } catch (_e) {}
        await trailerTask;
      }

      document.querySelectorAll('#cinema-source-switcher [data-player-source]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var mode = btn.getAttribute('data-player-source') || 'trailer';
          selectPlayerSource(mode);
        });
      });

      document.getElementById('cinema-season-select').addEventListener('change', function () {
        renderEpisodesForSeason(Number(this.value) || 1);
      });

      document.getElementById('cinema-embed-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var raw = (document.getElementById('cinema-embed-input').value || '').trim();
        if (!raw) return;
        if (raw.indexOf('{id}') !== -1 || raw.indexOf('{imdb}') !== -1 || raw.indexOf('{season}') !== -1) {
          safeLSSet('valem_embed_template', raw);
          var ep = activeSelectedEpisode || { season: 1, number: 1 };
          var resolved = raw
            .replace(/\\{id\\}/gi, encodeURIComponent(activeMovieObj ? activeMovieObj.externalId : ''))
            .replace(/\\{imdb\\}/gi, encodeURIComponent(activeMovieObj ? (activeMovieObj.imdbId || activeMovieObj.externalId) : ''))
            .replace(/\\{season\\}/gi, String(ep.season))
            .replace(/\\{episode\\}/gi, String(ep.number));
          activePlayerSources.custom = normalizeDirectEmbedUrlClient(resolved);
          syncSourceSwitcherUi('custom');
          setTheaterIframeUrl(activePlayerSources.custom);
          showToast('Saved configurable embed URL template.');
        } else {
          var directUrl = normalizeDirectEmbedUrlClient(raw);
          activePlayerSources.custom = directUrl;
          syncSourceSwitcherUi('custom');
          setTheaterIframeUrl(directUrl);
        }
      });

      document.getElementById('cinema-embed-auto').addEventListener('click', function () {
        if (!activeMovieObj) return;
        if (activeMovieObj.source === 'archive') {
          selectPlayerSource('archive');
        } else {
          openMovie(activeMovieObj);
        }
      });

      document.getElementById('cinema-fallback-retry').addEventListener('click', function () {
        var cur = (document.getElementById('cinema-embed-input').value || '').trim();
        if (cur) {
          setTheaterIframeUrl(cur);
        } else if (activeMovieObj) {
          selectPlayerSource(activePlayerSource);
        }
      });

      document.getElementById('cinema-fallback-proxy').addEventListener('click', function () {
        if (!activeMovieObj) return;
        var target = activeMovieObj.watchPageUrl || ('https://search.brave.com/search?q=' + encodeURIComponent(activeMovieObj.title + ' watch'));
        document.getElementById('movie-ov-close').click();
        openInValBrowse(target);
      });

      document.getElementById('movie-ov-theater').addEventListener('click', function () {
        var ov = document.getElementById('movie-overlay');
        var wide = ov.classList.toggle('theater-wide');
        this.textContent = wide ? 'Standard Width' : 'Theater Mode';
      });

      document.getElementById('movie-ov-fs').addEventListener('click', function () {
        var st = document.getElementById('movie-ov-stage');
        if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
        else if (st && st.requestFullscreen) st.requestFullscreen().catch(function () {});
      });

      document.getElementById('movie-ov-close').addEventListener('click', function () {
        activeMovieObj = null;
        document.getElementById('cinema-player-frame').removeAttribute('src');
        document.getElementById('movie-overlay').classList.remove('open');
        document.getElementById('movie-overlay').classList.remove('theater-wide');
        document.getElementById('movie-ov-theater').textContent = 'Theater Mode';
      });

      var movPipBtn = document.getElementById('movie-ov-pip');
      if (movPipBtn) {
        movPipBtn.addEventListener('click', function () {
          if (!activeMovieObj) return;
          var frameUrl = document.getElementById('cinema-player-frame').getAttribute('src') || activeMovieObj.watchPageUrl || '';
          var movTitle = activeMovieObj.title;
          document.getElementById('movie-ov-close').click();
          if (frameUrl && typeof openVuxPip === 'function') {
            openVuxPip(frameUrl, movTitle, false);
          }
        });
      }

      document.getElementById('movie-ov-proxy').addEventListener('click', function () {
        if (activeMovieObj) {
          var u = activeMovieObj.watchPageUrl || ('https://search.brave.com/search?q=' + encodeURIComponent(activeMovieObj.title));
          document.getElementById('movie-ov-close').click();
          openInValBrowse(u);
        }
      });

      document.getElementById('btn-movies-tmdb-shortcut').addEventListener('click', function () {
        document.getElementById('btn-open-settings').click();
        var cloakTab = document.querySelector('#settings-tabs [data-stab="cloak"]');
        if (cloakTab) cloakTab.click();
        var ki = document.getElementById('tmdb-api-key-input');
        if (ki) setTimeout(function () { ki.focus(); }, 60);
      });

      document.querySelectorAll('#movie-genres .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          movieGenre = btn.getAttribute('data-genre') || 'all';
          document.querySelectorAll('#movie-genres .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderMoviesFiltered();
        });
      });

      document.getElementById('movies-query').addEventListener('input', function () {
        if (!this.value.trim()) cinemaSearchResults = null;
        renderMoviesFiltered();
      });

      document.getElementById('btn-movies-reset').addEventListener('click', function () {
        document.getElementById('movies-query').value = '';
        cinemaSearchResults = null;
        movieGenre = 'all';
        document.querySelectorAll('#movie-genres .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-genre') === 'all');
        });
        renderMoviesFiltered();
      });

      document.getElementById('movies-search-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        var q = (document.getElementById('movies-query').value || '').trim();
        if (!q) {
          cinemaSearchResults = null;
          renderMoviesFiltered();
          return;
        }
        document.getElementById('movies-status').textContent = 'Searching TVMaze & Internet Archive for "' + q + '"...';
        var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();
        try {
          var resArr = await Promise.all([
            fetch(CFG.tvmazeSearchUrl + encodeURIComponent(q)).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }),
            fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(q + ' AND mediatype:(movies) AND collection:(feature_films)') + '&fl[]=identifier,title,description,year&rows=20&output=json').then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
            tmdbKey
              ? fetch('https://api.themoviedb.org/3/search/movie?api_key=' + encodeURIComponent(tmdbKey) + '&query=' + encodeURIComponent(q)).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
              : Promise.resolve(null)
          ]);
          var mappedTv = Array.isArray(resArr[0]) ? resArr[0].map(function (entry) { return normalizeTvMazeClient(entry && entry.show); }).filter(Boolean) : [];
          var mappedArc = (resArr[1] && resArr[1].response && Array.isArray(resArr[1].response.docs))
            ? resArr[1].response.docs.map(normalizeArchiveClient).filter(Boolean)
            : [];
          var mappedTmdb = (resArr[2] && Array.isArray(resArr[2].results))
            ? resArr[2].results.slice(0, 12).map(normalizeTmdbClient).filter(Boolean)
            : [];
          var mergedSearch = mappedTmdb.concat(mappedTv).concat(mappedArc);
          if (mergedSearch.length > 0) {
            cinemaSearchResults = mergedSearch;
            renderMoviesFiltered();
            document.getElementById('movies-status').textContent = 'Found ' + mergedSearch.length + ' results for "' + q + '"';
          } else {
            cinemaSearchResults = null;
            renderMoviesFiltered();
            document.getElementById('movies-status').textContent = 'No live API hits — filtering local catalog';
          }
        } catch (_e) {
          cinemaSearchResults = null;
          renderMoviesFiltered();
        }
      });

      renderMoviesFiltered();
      loadCinemaLiveCatalog();

      /* ---------------- BOOKS & MANGA (GUTENDEX) ---------------- */
      var booksLoadedOnce = false;
      var bookFontSize = 17;
      var FALLBACK_BOOKS = [
        { id: 1661, title: 'The Adventures of Sherlock Holmes', authors: [{ name: 'Doyle, Arthur Conan' }], download_count: 68420, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/1661.txt.utf-8' } },
        { id: 345, title: 'Dracula', authors: [{ name: 'Stoker, Bram' }], download_count: 54120, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/345.txt.utf-8' } },
        { id: 84, title: 'Frankenstein; Or, The Modern Prometheus', authors: [{ name: 'Shelley, Mary' }], download_count: 89210, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/84.txt.utf-8' } },
        { id: 11, title: "Alice's Adventures in Wonderland", authors: [{ name: 'Carroll, Lewis' }], download_count: 47890, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/11.txt.utf-8' } }
      ];

      function renderBooks(list) {
        var grid = document.getElementById('books-grid');
        grid.innerHTML = '';
        list.forEach(function (b) {
          var card = document.createElement('div');
          card.className = 'book-card';
          if (b.formats && b.formats['image/jpeg']) {
            var img = document.createElement('img');
            img.className = 'book-cover';
            img.src = b.formats['image/jpeg'];
            img.alt = b.title;
            img.loading = 'lazy';
            card.appendChild(img);
          }
          var col = document.createElement('div');
          col.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:8px;';
          var t = document.createElement('div');
          t.innerHTML = '<div style="font-size:13px;font-weight:700;color:var(--text);"></div><div class="sub" style="margin-top:3px;"></div>';
          t.children[0].textContent = b.title;
          t.children[1].textContent = ((b.authors || []).map(function (a) { return a.name; }).join(', ') || 'Classic Author') + ' · ' + Number(b.download_count || 0).toLocaleString() + ' reads';
          var acts = document.createElement('div');
          acts.className = 'pill-row';
          var readBtn = document.createElement('button');
          readBtn.type = 'button';
          readBtn.className = 'btn btn-primary';
          readBtn.style.height = '28px';
          readBtn.textContent = 'Read';
          readBtn.onclick = function () { openBook(b); };
          var pxBtn = document.createElement('button');
          pxBtn.type = 'button';
          pxBtn.className = 'btn';
          pxBtn.style.height = '28px';
          pxBtn.textContent = 'Proxy';
          pxBtn.onclick = function () { openInValBrowse('https://www.gutenberg.org/ebooks/' + b.id); };
          acts.appendChild(readBtn);
          acts.appendChild(pxBtn);
          col.appendChild(t);
          col.appendChild(acts);
          card.appendChild(col);
          grid.appendChild(card);
        });
      }

      async function searchBooks(term) {
        var q = String(term || '').trim() || 'classic';
        document.getElementById('books-status').textContent = 'Searching Gutendex for "' + q + '"...';
        try {
          var res = await fetch('https://gutendex.com/books?search=' + encodeURIComponent(q));
          var data = await res.json();
          var items = Array.isArray(data && data.results) ? data.results.slice(0, 18) : [];
          renderBooks(items.length ? items : FALLBACK_BOOKS);
          document.getElementById('books-status').textContent = items.length ? ('Found ' + items.length + ' readable titles') : 'Showing classics';
        } catch (_e) {
          renderBooks(FALLBACK_BOOKS);
          document.getElementById('books-status').textContent = 'Showing offline Gutenberg classics';
        }
      }

      async function openBook(book) {
        var txtUrl = (book.formats && (book.formats['text/plain; charset=utf-8'] || book.formats['text/plain; charset=us-ascii'] || book.formats['text/plain'])) || '';
        document.getElementById('book-ov-title').textContent = book.title;
        var bodyEl = document.getElementById('book-ov-body');
        bodyEl.textContent = 'Loading book text...';
        document.getElementById('book-overlay').classList.add('open');
        if (!txtUrl) {
          document.getElementById('book-overlay').classList.remove('open');
          openInValBrowse('https://www.gutenberg.org/ebooks/' + book.id);
          return;
        }
        var urls = [txtUrl, 'https://corsproxy.io/?' + encodeURIComponent(txtUrl), 'https://api.allorigins.win/raw?url=' + encodeURIComponent(txtUrl)];
        for (var i = 0; i < urls.length; i++) {
          try {
            var res = await fetch(urls[i]);
            if (res.ok) {
              var txt = await res.text();
              if (txt && txt.length > 80) { bodyEl.textContent = txt.slice(0, 180000); return; }
            }
          } catch (_e) {}
        }
        bodyEl.textContent = 'Direct plain-text fetch blocked; click Close and use the Proxy button to read via Scramjet.';
      }

      document.getElementById('book-ov-close').addEventListener('click', function () {
        document.getElementById('book-overlay').classList.remove('open');
      });
      document.getElementById('book-font-down').addEventListener('click', function () {
        bookFontSize = Math.max(13, bookFontSize - 1);
        document.getElementById('book-ov-body').style.fontSize = bookFontSize + 'px';
      });
      document.getElementById('book-font-up').addEventListener('click', function () {
        bookFontSize = Math.min(26, bookFontSize + 1);
        document.getElementById('book-ov-body').style.fontSize = bookFontSize + 'px';
      });
      document.querySelectorAll('#books-topics .pill-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var topic = b.getAttribute('data-topic');
          document.getElementById('books-query').value = topic;
          searchBooks(topic);
        });
      });
      document.getElementById('books-search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        searchBooks(document.getElementById('books-query').value);
      });

      /* ---------------- STUDYHUB ALL-IN-ONE MP3 PLAYER & AMBIENT MIXER ---------------- */
      var audioStations = Array.isArray(CFG.audioStations) && CFG.audioStations.length ? CFG.audioStations : [];
      var ambientSpecs = Array.isArray(CFG.ambientLayers) && CFG.ambientLayers.length ? CFG.ambientLayers : [];
      var globalAudioEl = document.getElementById('vux-global-audio');
      var audioVizCanvas = document.getElementById('vux-audio-viz');
      var audioVizCtx = audioVizCanvas ? audioVizCanvas.getContext('2d') : null;
      var audioPlayBtn = document.getElementById('vux-audio-play');
      var audioPrevBtn = document.getElementById('vux-audio-prev');
      var audioNextBtn = document.getElementById('vux-audio-next');
      var audioShuffleBtn = document.getElementById('vux-audio-shuffle');
      var audioRepeatBtn = document.getElementById('vux-audio-repeat');
      var audioSeekEl = document.getElementById('vux-audio-seek');
      var audioVolEl = document.getElementById('vux-audio-vol');
      var audioCurEl = document.getElementById('vux-audio-cur');
      var audioDurEl = document.getElementById('vux-audio-dur');
      var audioTitleEl = document.getElementById('vux-audio-track-title');
      var audioDescEl = document.getElementById('vux-audio-track-desc');
      var audioCatEl = document.getElementById('vux-audio-station-cat');
      var audioBadgeEl = document.getElementById('vux-audio-mode-badge');

      var audioMode = 'station'; // 'station' | 'url' | 'file'
      var activeStationIdx = 0;
      var audioPlaying = false;
      var audioShuffle = false;
      var audioRepeat = false;
      var audioMasterVol = 0.8;
      var synthElapsed = 0;
      var synthStep = 0;
      var synthStepTimer = null;
      var synthSecTimer = null;
      var audioCtx = null;
      var audioMasterGain = null;
      var audioFilter = null;
      var audioAnalyser = null;
      var audioAnalyserData = null;
      var mediaElConnected = false;
      var audioVizRaf = 0;
      var ambientNodes = Object.create(null);
      var ambientVols = Object.create(null);
      try {
        var rawAmb = safeLSGet('vux_ambient_vols');
        if (rawAmb) ambientVols = JSON.parse(rawAmb) || Object.create(null);
      } catch (_e) {}

      function formatTrackTime(sec) {
        var s = Math.max(0, Math.floor(Number.isFinite(sec) ? sec : 0));
        return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
      }

      function ensureVuxAudioEngine() {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        if (!audioCtx) {
          audioCtx = new Ctx();
          audioMasterGain = audioCtx.createGain();
          audioMasterGain.gain.value = audioMasterVol;
          audioFilter = audioCtx.createBiquadFilter();
          audioFilter.type = 'lowpass';
          audioFilter.frequency.value = 1100;
          audioAnalyser = audioCtx.createAnalyser();
          audioAnalyser.fftSize = 64;
          audioAnalyserData = new Uint8Array(audioAnalyser.frequencyBinCount);
          audioFilter.connect(audioMasterGain);
          audioMasterGain.connect(audioAnalyser);
          audioAnalyser.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().catch(function () {});
        }
        return audioCtx;
      }

      function broadcastAudioState() {
        var st = audioStations[activeStationIdx];
        var title = audioMode === 'station' && st ? st.title : (audioTitleEl ? audioTitleEl.textContent : 'Vux Audio');
        var artist = audioMode === 'station' && st ? (st.artist + ' · ' + st.genre) : 'Custom Audio Stream';
        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({
              type: 'vux-audio-state',
              playing: audioPlaying,
              label: audioPlaying ? title : 'Nothing playing',
              title: title,
              artist: artist
            }, '*');
          } catch (_e) {}
        }
      }

      function updateAudioTimeUi() {
        if (audioMode === 'station') {
          var st = audioStations[activeStationIdx];
          var dur = st ? st.durationSec : 180;
          if (audioCurEl) audioCurEl.textContent = formatTrackTime(synthElapsed);
          if (audioDurEl) audioDurEl.textContent = formatTrackTime(dur);
          if (audioSeekEl) {
            audioSeekEl.max = String(dur);
            audioSeekEl.value = String(Math.min(dur, Math.floor(synthElapsed)));
          }
        } else if (globalAudioEl) {
          var elDur = Number.isFinite(globalAudioEl.duration) && globalAudioEl.duration > 0 ? globalAudioEl.duration : 0;
          if (audioCurEl) audioCurEl.textContent = formatTrackTime(globalAudioEl.currentTime || 0);
          if (audioDurEl) audioDurEl.textContent = elDur ? formatTrackTime(elDur) : '--:--';
          if (audioSeekEl && elDur) {
            audioSeekEl.max = String(Math.floor(elDur));
            audioSeekEl.value = String(Math.floor(globalAudioEl.currentTime || 0));
          }
        }
      }

      function stopStationTimers() {
        if (synthStepTimer) { clearInterval(synthStepTimer); synthStepTimer = null; }
        if (synthSecTimer) { clearInterval(synthSecTimer); synthSecTimer = null; }
      }

      function triggerStationChord() {
        var st = audioStations[activeStationIdx];
        if (!st || !audioCtx || !audioFilter || audioMode !== 'station' || !audioPlaying) return;
        if (synthStep % 4 === 0) {
          var chords = st.chords || [[261.63, 329.63, 392, 493.88]];
          var chord = chords[Math.floor(synthStep / 4) % chords.length];
          var now = audioCtx.currentTime;
          var durSec = (60 / (st.bpm || 76)) * 2.2;
          chord.forEach(function (freq) {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = st.waveform || 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.042, now + 0.09);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);
            osc.connect(gain);
            gain.connect(audioFilter);
            osc.start(now);
            osc.stop(now + durSec + 0.05);
          });
        }
        synthStep += 1;
      }

      function drawAudioViz() {
        audioVizRaf = 0;
        if (!audioVizCtx || !audioVizCanvas) return;
        var w = audioVizCanvas.width;
        var h = audioVizCanvas.height;
        audioVizCtx.clearRect(0, 0, w, h);
        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
        var bars = 32;
        var barW = (w - 16) / bars;
        if (audioAnalyser && audioAnalyserData && audioPlaying) {
          audioAnalyser.getByteFrequencyData(audioAnalyserData);
        }
        var t = performance.now() * 0.003;
        for (var i = 0; i < bars; i++) {
          var rawVal = (audioPlaying && audioAnalyserData) ? audioAnalyserData[i % audioAnalyserData.length] / 255 : 0;
          var waveFallback = audioPlaying ? (0.18 + 0.42 * Math.abs(Math.sin(t + i * 0.35))) : (0.08 + 0.04 * Math.sin(i * 0.4));
          var amp = Math.max(0.08, Math.min(0.95, rawVal * 0.85 + waveFallback * (rawVal > 0.02 ? 0.15 : 1)));
          var bh = Math.max(6, Math.round(amp * (h - 16)));
          var x = 8 + i * barW;
          var y = h - 8 - bh;
          audioVizCtx.fillStyle = accent;
          audioVizCtx.globalAlpha = audioPlaying ? (0.45 + amp * 0.55) : 0.24;
          audioVizCtx.fillRect(x, y, Math.max(3, barW - 4), bh);
        }
        audioVizCtx.globalAlpha = 1;
        if (currentView === 'music' && !document.hidden && (audioPlaying || hasAnyActiveAmbient())) {
          audioVizRaf = requestAnimationFrame(drawAudioViz);
        }
      }

      function syncAudioVizLoop() {
        if (audioVizRaf) { cancelAnimationFrame(audioVizRaf); audioVizRaf = 0; }
        if (currentView === 'music') {
          audioVizRaf = requestAnimationFrame(drawAudioViz);
        }
      }

      function renderAudioStations() {
        var wrap = document.getElementById('vux-audio-stations');
        if (!wrap) return;
        wrap.innerHTML = '';
        audioStations.forEach(function (st, idx) {
          var card = document.createElement('button');
          card.type = 'button';
          card.className = 'mp3-station-card' + (audioMode === 'station' && activeStationIdx === idx ? ' active' : '');
          card.setAttribute('data-station-id', st.id);
          var t = document.createElement('div');
          t.style.cssText = 'font-size:13px;font-weight:700;';
          t.textContent = st.title;
          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.textContent = st.genre + ' · ' + st.bpm + ' BPM';
          card.appendChild(t);
          card.appendChild(sub);
          card.onclick = function () {
            selectStation(idx, true);
          };
          wrap.appendChild(card);
        });
      }

      function pauseAudioPlayback() {
        audioPlaying = false;
        stopStationTimers();
        if (globalAudioEl && !globalAudioEl.paused) {
          try { globalAudioEl.pause(); } catch (_e) {}
        }
        if (audioPlayBtn) audioPlayBtn.textContent = 'Play';
        if (audioBadgeEl) audioBadgeEl.textContent = 'Paused';
        broadcastAudioState();
        syncAudioVizLoop();
      }

      function startAudioPlayback() {
        ensureVuxAudioEngine();
        audioPlaying = true;
        if (typeof recordVuxStat === 'function') recordVuxStat('tracksPlayed', 1);
        if (audioMode === 'station') {
          if (globalAudioEl && !globalAudioEl.paused) {
            try { globalAudioEl.pause(); } catch (_e) {}
          }
          var st = audioStations[activeStationIdx];
          if (audioFilter && audioCtx && st) {
            audioFilter.frequency.setTargetAtTime(st.filterHz || 1050, audioCtx.currentTime, 0.05);
          }
          stopStationTimers();
          synthStep = 0;
          triggerStationChord();
          var stepMs = Math.max(160, Math.round((60 / ((st && st.bpm) || 76) / 2) * 1000));
          synthStepTimer = setInterval(triggerStationChord, stepMs);
          synthSecTimer = setInterval(function () {
            if (!audioPlaying || audioMode !== 'station') return;
            synthElapsed += 1;
            var dur = (st && st.durationSec) || 180;
            if (synthElapsed >= dur) {
              if (audioRepeat) synthElapsed = 0;
              else stepStation(1);
            }
            updateAudioTimeUi();
          }, 1000);
        } else if (globalAudioEl) {
          stopStationTimers();
          if (!mediaElConnected && audioCtx && audioMasterGain) {
            try {
              var srcNode = audioCtx.createMediaElementSource(globalAudioEl);
              srcNode.connect(audioMasterGain);
              mediaElConnected = true;
            } catch (_e) {}
          }
          globalAudioEl.volume = audioMasterVol;
          globalAudioEl.play().catch(function () {});
        }
        if (audioPlayBtn) audioPlayBtn.textContent = 'Pause';
        if (audioBadgeEl) audioBadgeEl.textContent = 'Playing';
        broadcastAudioState();
        syncAudioVizLoop();
      }

      function selectStation(idx, autoPlay) {
        if (!audioStations.length) return;
        activeStationIdx = ((idx % audioStations.length) + audioStations.length) % audioStations.length;
        audioMode = 'station';
        synthElapsed = 0;
        var st = audioStations[activeStationIdx];
        if (audioCatEl) audioCatEl.textContent = 'STUDYHUB STATION · ' + st.genre.toUpperCase();
        if (audioTitleEl) audioTitleEl.textContent = st.title;
        if (audioDescEl) audioDescEl.textContent = st.artist + ' · ' + st.bpm + ' BPM';
        renderAudioStations();
        updateAudioTimeUi();
        if (autoPlay || audioPlaying) startAudioPlayback();
        else broadcastAudioState();
      }

      function stepStation(delta) {
        if (!audioStations.length) return;
        if (audioShuffle && audioStations.length > 1) {
          var nextIdx = activeStationIdx;
          while (nextIdx === activeStationIdx) {
            nextIdx = Math.floor(Math.random() * audioStations.length);
          }
          selectStation(nextIdx, true);
        } else {
          selectStation(activeStationIdx + delta, true);
        }
      }

      function handleExternalAudioControl(action) {
        if (action === 'prev') stepStation(-1);
        else if (action === 'next') stepStation(1);
        else if (action === 'toggle') {
          if (audioPlaying) pauseAudioPlayback();
          else startAudioPlayback();
        }
      }

      if (audioPlayBtn) {
        audioPlayBtn.addEventListener('click', function () {
          if (audioPlaying) pauseAudioPlayback();
          else startAudioPlayback();
        });
      }
      if (audioPrevBtn) audioPrevBtn.addEventListener('click', function () { stepStation(-1); });
      if (audioNextBtn) audioNextBtn.addEventListener('click', function () { stepStation(1); });
      if (audioShuffleBtn) {
        audioShuffleBtn.addEventListener('click', function () {
          audioShuffle = !audioShuffle;
          audioShuffleBtn.classList.toggle('active', audioShuffle);
          audioShuffleBtn.textContent = 'Shuffle: ' + (audioShuffle ? 'On' : 'Off');
        });
      }
      if (audioRepeatBtn) {
        audioRepeatBtn.addEventListener('click', function () {
          audioRepeat = !audioRepeat;
          audioRepeatBtn.classList.toggle('active', audioRepeat);
          audioRepeatBtn.textContent = 'Repeat: ' + (audioRepeat ? 'On' : 'Off');
          if (globalAudioEl) globalAudioEl.loop = audioRepeat;
        });
      }
      if (audioSeekEl) {
        audioSeekEl.addEventListener('input', function () {
          var v = Number(audioSeekEl.value) || 0;
          if (audioMode === 'station') {
            synthElapsed = v;
          } else if (globalAudioEl && Number.isFinite(globalAudioEl.duration)) {
            globalAudioEl.currentTime = v;
          }
          updateAudioTimeUi();
        });
      }
      if (audioVolEl) {
        audioVolEl.addEventListener('input', function () {
          audioMasterVol = Math.max(0, Math.min(1, Number(audioVolEl.value) / 100));
          if (audioMasterGain && audioCtx) {
            audioMasterGain.gain.setTargetAtTime(audioMasterVol, audioCtx.currentTime, 0.04);
          }
          if (globalAudioEl) globalAudioEl.volume = audioMasterVol;
        });
      }

      if (globalAudioEl) {
        globalAudioEl.addEventListener('timeupdate', updateAudioTimeUi);
        globalAudioEl.addEventListener('ended', function () {
          if (audioRepeat) {
            globalAudioEl.currentTime = 0;
            globalAudioEl.play().catch(function () {});
          } else {
            stepStation(1);
          }
        });
      }

      var mp3Form = document.getElementById('vux-custom-mp3-form');
      var mp3UrlIn = document.getElementById('vux-custom-mp3-url');
      if (mp3Form && mp3UrlIn && globalAudioEl) {
        mp3Form.addEventListener('submit', function (e) {
          e.preventDefault();
          var raw = (mp3UrlIn.value || '').trim();
          if (!raw || /^(javascript|data|vbscript|file):/i.test(raw)) return;
          audioMode = 'url';
          stopStationTimers();
          globalAudioEl.src = raw;
          if (audioCatEl) audioCatEl.textContent = 'CUSTOM STREAM';
          if (audioTitleEl) audioTitleEl.textContent = raw.split('/').pop().split('?')[0] || 'Custom MP3 Stream';
          if (audioDescEl) audioDescEl.textContent = raw;
          renderAudioStations();
          startAudioPlayback();
        });
      }

      var localAudioIn = document.getElementById('local-audio-input');
      if (localAudioIn && globalAudioEl) {
        localAudioIn.addEventListener('change', function (e) {
          var f = e.target.files && e.target.files[0];
          if (!f) return;
          audioMode = 'file';
          stopStationTimers();
          globalAudioEl.src = URL.createObjectURL(f);
          if (audioCatEl) audioCatEl.textContent = 'LOCAL AUDIO FILE';
          if (audioTitleEl) audioTitleEl.textContent = f.name;
          if (audioDescEl) audioDescEl.textContent = Math.round(f.size / 1024) + ' KB · Local Device';
          renderAudioStations();
          startAudioPlayback();
        });
      }

      /* ---------------- AMBIENT SOUND MIXER (RAIN, FIREPLACE, CAFE, KEYBOARD) ---------------- */
      function hasAnyActiveAmbient() {
        return Object.keys(ambientVols).some(function (k) { return Number(ambientVols[k]) > 0; });
      }

      function createNoiseBuffer(ctx, secs) {
        var len = Math.floor(ctx.sampleRate * secs);
        var buf = ctx.createBuffer(1, len, ctx.sampleRate);
        var out = buf.getChannelData(0);
        var last = 0;
        for (var i = 0; i < len; i++) {
          var white = Math.random() * 2 - 1;
          last = (last + 0.04 * white) / 1.04;
          out[i] = last * 3.2;
        }
        return buf;
      }

      function setAmbientLayerVolume(layerId, volPct) {
        var vol = Math.max(0, Math.min(100, Number(volPct) || 0));
        ambientVols[layerId] = vol;
        safeLSSet('vux_ambient_vols', JSON.stringify(ambientVols));
        if (vol <= 0) {
          if (ambientNodes[layerId]) {
            try {
              if (ambientNodes[layerId].gain && audioCtx) {
                ambientNodes[layerId].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
              }
            } catch (_e) {}
          }
          renderAmbientMixer();
          return;
        }
        var ctx = ensureVuxAudioEngine();
        if (!ctx || !audioAnalyser) return;
        if (!ambientNodes[layerId]) {
          var gainNode = ctx.createGain();
          gainNode.gain.value = (vol / 100) * 0.25;
          gainNode.connect(audioAnalyser);
          if (layerId === 'keyboard') {
            var kTimer = setInterval(function () {
              var curV = Number(ambientVols.keyboard || 0);
              if (curV <= 0 || !audioCtx || document.hidden) return;
              if (Math.random() < 0.65) {
                var o = audioCtx.createOscillator();
                var kg = audioCtx.createGain();
                o.type = 'triangle';
                o.frequency.setValueAtTime(420 + Math.random() * 340, audioCtx.currentTime);
                kg.gain.setValueAtTime(0.0001, audioCtx.currentTime);
                kg.gain.linearRampToValueAtTime((curV / 100) * 0.08, audioCtx.currentTime + 0.004);
                kg.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.032);
                o.connect(kg);
                kg.connect(gainNode);
                o.start();
                o.stop(audioCtx.currentTime + 0.036);
              }
            }, 145);
            ambientNodes[layerId] = { gain: gainNode, timer: kTimer };
          } else {
            var src = ctx.createBufferSource();
            src.buffer = createNoiseBuffer(ctx, 3);
            src.loop = true;
            var flt = ctx.createBiquadFilter();
            if (layerId === 'rain') { flt.type = 'bandpass'; flt.frequency.value = 1150; flt.Q.value = 0.6; }
            else if (layerId === 'fireplace') { flt.type = 'lowpass'; flt.frequency.value = 460; }
            else { flt.type = 'bandpass'; flt.frequency.value = 720; flt.Q.value = 1.1; }
            src.connect(flt);
            flt.connect(gainNode);
            src.start();
            ambientNodes[layerId] = { gain: gainNode, src: src, flt: flt };
          }
        } else {
          ambientNodes[layerId].gain.gain.setTargetAtTime((vol / 100) * 0.25, ctx.currentTime, 0.05);
        }
        renderAmbientMixer();
        syncAudioVizLoop();
      }

      function renderAmbientMixer() {
        var wrap = document.getElementById('vux-ambient-list');
        if (!wrap) return;
        wrap.innerHTML = '';
        ambientSpecs.forEach(function (spec) {
          var v = Math.max(0, Math.min(100, Number(ambientVols[spec.id] || 0)));
          var row = document.createElement('div');
          row.className = 'ambient-row';
          var meta = document.createElement('div');
          meta.style.minWidth = '130px';
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:13px;font-weight:700;';
          nm.textContent = spec.label;
          var ds = document.createElement('div');
          ds.className = 'sub';
          ds.textContent = spec.description;
          meta.appendChild(nm);
          meta.appendChild(ds);

          var ctrls = document.createElement('div');
          ctrls.className = 'pill-row';
          var sl = document.createElement('input');
          sl.type = 'range';
          sl.min = '0';
          sl.max = '100';
          sl.value = String(v);
          sl.style.cssText = 'width:100px;accent-color:var(--accent);';
          sl.setAttribute('aria-label', spec.label + ' ambient volume');
          sl.oninput = function () { setAmbientLayerVolume(spec.id, Number(sl.value)); };
          var tog = document.createElement('button');
          tog.type = 'button';
          tog.className = 'pill-btn' + (v > 0 ? ' active' : '');
          tog.style.height = '28px';
          tog.textContent = v > 0 ? (v + '%') : 'Off';
          tog.onclick = function () {
            setAmbientLayerVolume(spec.id, v > 0 ? 0 : 48);
          };
          ctrls.appendChild(sl);
          ctrls.appendChild(tog);
          row.appendChild(meta);
          row.appendChild(ctrls);
          wrap.appendChild(row);
        });
      }

      selectStation(0, false);
      renderAmbientMixer();

      /* ---------------- VUX.AI (DUCK.AI VIA RENDER WISP) ---------------- */
      var aiFrameEl = document.getElementById('ai-panel-frame');
      var aiLoadingEl = document.getElementById('ai-panel-loading');
      var aiLoadingMsgEl = document.getElementById('ai-panel-loading-msg');
      var aiStatusEl = document.getElementById('ai-panel-status');
      var aiRequestSeq = 1;
      var pendingScramResolvers = Object.create(null);

      window.addEventListener('message', function (ev) {
        if (!ev || !ev.data || ev.data.type !== 'valem-scram-url-ready') return;
        var resolver = pendingScramResolvers[ev.data.requestId];
        if (resolver) {
          delete pendingScramResolvers[ev.data.requestId];
          resolver(ev.data);
        }
      });

      function resolveScramUrlViaBridge(targetUrl, optionalWispUrl) {
        return new Promise(function (resolve) {
          var proxyFrame = document.getElementById('valbrowse-proxy-frame');
          var reqId = 'aireq_' + (aiRequestSeq++);
          var timer = setTimeout(function () {
            delete pendingScramResolvers[reqId];
            resolve({ ok: false, encodedUrl: CFG.origin + '/scram/' + encodeURIComponent(targetUrl), targetUrl: targetUrl, wispUrl: optionalWispUrl || CFG.defaultWisp });
          }, 8000);
          pendingScramResolvers[reqId] = function (data) {
            clearTimeout(timer);
            resolve(data);
          };
          try {
            if (proxyFrame && proxyFrame.contentWindow) {
              proxyFrame.contentWindow.postMessage({
                type: 'valem-resolve-scram-url',
                requestId: reqId,
                targetUrl: targetUrl,
                wispUrl: optionalWispUrl || ''
              }, '*');
            } else {
              clearTimeout(timer);
              delete pendingScramResolvers[reqId];
              resolve({ ok: false, encodedUrl: CFG.origin + '/scram/' + encodeURIComponent(targetUrl), targetUrl: targetUrl, wispUrl: optionalWispUrl || CFG.defaultWisp });
            }
          } catch (_e) {
            clearTimeout(timer);
            delete pendingScramResolvers[reqId];
            resolve({ ok: false, encodedUrl: CFG.origin + '/scram/' + encodeURIComponent(targetUrl), targetUrl: targetUrl, wispUrl: optionalWispUrl || CFG.defaultWisp });
          }
        });
      }

      function injectAiFrameThemeHarmony() {
        try {
          var doc = aiFrameEl && aiFrameEl.contentDocument;
          if (!doc || !doc.head) return;
          var st = doc.getElementById('vux-ai-harmony-css');
          if (!st) {
            st = doc.createElement('style');
            st.id = 'vux-ai-harmony-css';
            st.textContent = '::-webkit-scrollbar{width:7px;height:7px;}::-webkit-scrollbar-thumb{background:rgba(255,92,124,0.35);border-radius:99px;}body{color-scheme:dark;}';
            doc.head.appendChild(st);
          }
        } catch (_e) {}
      }

      async function loadVuxAi(forceReload) {
        var targetUrl = CFG.vuxAiTargetUrl || 'https://duck.ai';
        var renderWisp = CFG.renderWispUrl || 'wss://my-wisp-server-ocnq.onrender.com/wisp/';
        if (aiLoadingEl) aiLoadingEl.classList.add('open');
        if (aiLoadingMsgEl) aiLoadingMsgEl.textContent = forceReload
          ? 'Reloading Vux.ai (duck.ai) via Render Wisp...'
          : 'Connecting Vux.ai (duck.ai) via Render Wisp...';
        if (aiStatusEl) aiStatusEl.textContent = 'duck.ai · Connecting Render Wisp...';

        try {
          var wakeUrl = renderWisp.replace(/^ws:/i, 'http:').replace(/^wss:/i, 'https:');
          fetch(new URL(wakeUrl).origin + '/', { mode: 'no-cors' }).catch(function () {});
        } catch (_we) {}

        var res = await resolveScramUrlViaBridge(targetUrl, renderWisp);
        var nextSrc = (res && res.encodedUrl) || (CFG.origin + '/scram/' + encodeURIComponent(targetUrl));
        if (forceReload) {
          nextSrc += (nextSrc.indexOf('?') === -1 ? '?_vux=' : '&_vux=') + Date.now();
        }
        if (aiFrameEl) {
          aiFrameEl.onload = function () {
            if (aiLoadingEl) aiLoadingEl.classList.remove('open');
            injectAiFrameThemeHarmony();
          };
          aiFrameEl.src = nextSrc;
          setTimeout(function () {
            if (aiLoadingEl) aiLoadingEl.classList.remove('open');
          }, 3200);
        }
        if (aiStatusEl) {
          aiStatusEl.textContent = 'duck.ai · ' + ((res && res.wispUrl) || renderWisp);
        }
      }

      var aiDismissBtn = document.getElementById('ai-panel-dismiss-load');
      if (aiDismissBtn && aiLoadingEl) {
        aiDismissBtn.addEventListener('click', function () {
          aiLoadingEl.classList.remove('open');
        });
      }

      var aiReloadBtn = document.getElementById('ai-panel-reload');
      if (aiReloadBtn) {
        aiReloadBtn.addEventListener('click', function () {
          loadVuxAi(true);
        });
      }

      var aiOpenTabBtn = document.getElementById('ai-panel-open-tab');
      if (aiOpenTabBtn) {
        aiOpenTabBtn.addEventListener('click', function () {
          openInValBrowse(CFG.vuxAiTargetUrl || 'https://duck.ai');
        });
      }

      var aiFsBtn = document.getElementById('ai-panel-fs');
      if (aiFsBtn) {
        aiFsBtn.addEventListener('click', function () {
          var st = document.getElementById('ai-panel-stage');
          if (!st) return;
          if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
          else if (st.requestFullscreen) st.requestFullscreen().catch(function () {});
        });
      }

      /* ---------------- CUSTOMIZATION STUDIO STATE & ENGINES ---------------- */
      var settingsModal = document.getElementById('settings-modal');
      var activePresetCat = 'All';
      var presetSearchQuery = '';
      var activePresetId = safeLSGet('valbrowse_color_preset') || 'coral-default';

      var activeAnimCat = 'All';
      var animSearchQuery = '';
      var activeDynCat = 'All';
      var dynSearchQuery = '';
      var activeFontCat = 'All';
      var fontSearchQuery = '';
      var fontPreviewSample = 'The quick brown fox jumps — 12345';
      var layoutSearchQuery = '';

      var loadedGoogleFonts = Object.create(null);

      function buildGoogleFontHref(fontFamily) {
        var clean = String(fontFamily || '').replace(/['"]/g, '').trim();
        return 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(clean).replace(/%20/g, '+') + ':wght@400;600;700&display=swap';
      }

      function ensureGoogleFontLoaded(fontFamily) {
        var clean = String(fontFamily || '').replace(/['"]/g, '').trim();
        if (!clean || loadedGoogleFonts[clean]) return;
        loadedGoogleFonts[clean] = true;
        try {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = buildGoogleFontHref(clean);
          document.head.appendChild(link);
        } catch (_e) {}
      }

      function getContrastInk(hex) {
        var clean = String(hex || '').replace('#', '');
        if (!/^[0-9a-f]{6}$/i.test(clean)) return '#09090b';
        var toLin = function (v) {
          var s = v / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        var r = parseInt(clean.slice(0, 2), 16);
        var g = parseInt(clean.slice(2, 4), 16);
        var b = parseInt(clean.slice(4, 6), 16);
        var lum = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
        return lum > 0.24 ? '#09090b' : '#ffffff';
      }

      function applyColorPreset(presetId) {
        activePresetId = presetId || 'coral-default';
        safeLSSet('valbrowse_color_preset', activePresetId);

        var root = document.documentElement;
        var p = null;
        for (var i = 0; i < CFG.themePresets.length; i++) {
          if (CFG.themePresets[i].id === activePresetId) { p = CFG.themePresets[i]; break; }
        }

        var tokens;
        if (!p) {
          tokens = {
            bg: '#0b0608',
            bgSec: '#080406',
            surface: '#140b0e',
            surface2: '#1b0f13',
            text: '#fdf2f4',
            muted: '#9f878f',
            accent: '#ff5c7c',
            border: 'rgba(255, 255, 255, 0.08)',
            isLight: false
          };
        } else {
          tokens = {
            bg: p.bgPrimary,
            bgSec: p.bgSecondary,
            surface: p.bgCard,
            surface2: p.bgSecondary,
            text: p.textPrimary,
            muted: p.textMuted,
            accent: p.accent,
            border: p.border,
            isLight: Boolean(p.isLight)
          };
        }

        root.style.setProperty('--bg', tokens.bg);
        root.style.setProperty('--rail', tokens.bgSec);
        root.style.setProperty('--surface', tokens.surface);
        root.style.setProperty('--surface-2', tokens.surface2);
        root.style.setProperty('--text', tokens.text);
        root.style.setProperty('--muted', tokens.muted);
        root.style.setProperty('--accent', tokens.accent);
        root.style.setProperty('--accent-hover', tokens.accent);
        root.style.setProperty('--accent-text', getContrastInk(tokens.accent));
        root.style.setProperty('--accent-soft', 'color-mix(in srgb, ' + tokens.accent + ' 16%, transparent)');
        root.style.setProperty('--border', tokens.border);
        root.style.setProperty('--border-strong', tokens.accent);

        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({
              type: 'scramjet-theme',
              bg: tokens.bg,
              bgSec: tokens.bgSec,
              surface: tokens.surface,
              text: tokens.text,
              muted: tokens.muted,
              border: tokens.border,
              primary: tokens.accent,
              light: tokens.isLight ? '1' : '0'
            }, '*');
          } catch (_e) {}
        }

        renderColorPresetsGrid();
      }

      function renderColorPresetsGrid() {
        var grid = document.getElementById('color-presets-grid');
        var shownEl = document.getElementById('themes-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = String(presetSearchQuery || '').trim().toLowerCase();
        var filtered = CFG.themePresets.filter(function (t) {
          var matchCat = activePresetCat === 'All' || t.studioCategory === activePresetCat || t.category === activePresetCat;
          var matchQ = !q || t.name.toLowerCase().indexOf(q) !== -1 || String(t.studioCategory || t.category).toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (shownEl) shownEl.textContent = String(filtered.length);
        if (filtered.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.style.gridColumn = '1 / -1';
          empty.textContent = 'No themes matching "' + presetSearchQuery + '"';
          grid.appendChild(empty);
          return;
        }
        filtered.forEach(function (t) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'preset-item' + (t.id === activePresetId ? ' active' : '');
          b.setAttribute('data-preset-id', t.id);

          var sw = document.createElement('span');
          sw.className = 'preset-swatches';
          var d1 = document.createElement('span');
          d1.className = 'preset-dot';
          d1.style.background = t.bgPrimary;
          var d2 = document.createElement('span');
          d2.className = 'preset-dot';
          d2.style.background = t.bgCard;
          var d3 = document.createElement('span');
          d3.className = 'preset-dot';
          d3.style.background = t.accent;
          sw.appendChild(d1);
          sw.appendChild(d2);
          sw.appendChild(d3);

          var nm = document.createElement('span');
          nm.style.cssText = 'flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
          nm.textContent = t.name;

          b.appendChild(sw);
          b.appendChild(nm);
          b.addEventListener('click', function () {
            applyColorPreset(t.id);
          });
          grid.appendChild(b);
        });
      }

      document.querySelectorAll('#preset-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activePresetCat = btn.getAttribute('data-pcat') || 'All';
          document.querySelectorAll('#preset-cat-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderColorPresetsGrid();
        });
      });

      var presetSearchEl = document.getElementById('preset-search');
      if (presetSearchEl) {
        presetSearchEl.addEventListener('input', function () {
          presetSearchQuery = presetSearchEl.value || '';
          renderColorPresetsGrid();
        });
      }

      var presetRandomEl = document.getElementById('btn-preset-random');
      if (presetRandomEl) {
        presetRandomEl.addEventListener('click', function () {
          var pool = CFG.themePresets.filter(function (t) { return t.id !== activePresetId; });
          if (!pool.length) return;
          var pick = pool[Math.floor(Math.random() * pool.length)];
          applyColorPreset(pick.id);
          var activeBtn = document.querySelector('#color-presets-grid .preset-item.active');
          if (activeBtn && activeBtn.scrollIntoView) {
            activeBtn.scrollIntoView({ block: 'nearest' });
          }
        });
      }

      document.getElementById('btn-preset-reset-coral').addEventListener('click', function () {
        applyColorPreset('coral-default');
      });

      document.getElementById('valbrowse-proxy-frame').addEventListener('load', function () {
        applyColorPreset(activePresetId);
        applyCustomSettings(customSettings);
        if (typeof broadcastAudioState === 'function') broadcastAudioState();
      });

      /* ---------------- CUSTOM SETTINGS STATE (BG FX, COLOR SHIFTS, FONTS, LAYOUTS) ---------------- */
      var DEFAULT_CUSTOM_SETTINGS = {
        homeLayout: 'split',
        navPosition: 'left',
        density: 'cozy',
        layoutPresetId: 'left-collapsible-default',
        bgStyle: 'aurora',
        animatedBgId: 'abg-particle-nebula-1',
        animBgSpeed: 1,
        animBgOpacity: 0.72,
        dynamicBgId: 'off',
        dynBgSpeed: 1,
        dynBgOpacity: 0.72,
        fontFamily: '',
        uiRadius: 12,
        glowStrength: 1,
        glassBlur: 14,
        fontScale: 1,
        showClock: true,
        showShortcuts: true,
        reducedMotion: false,
        cursorTrail: 'glow',
        customCss: '',
        panicUrl: CFG.panicUrl
      };

      var customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS);
      try {
        var rawCustomSaved = safeLSGet('valem_custom_settings');
        if (rawCustomSaved) {
          customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, JSON.parse(rawCustomSaved));
        }
      } catch (_e) {}

      /* ---------------- ANIMATED CANVAS BACKGROUND ENGINE (100 PRESETS) ---------------- */
      var bgCanvasEl = document.getElementById('vb-bg-canvas');
      var bgCtx = bgCanvasEl ? bgCanvasEl.getContext('2d') : null;
      var animBgRafId = 0;
      var animLastTs = 0;
      var animPhase = 0;
      var animParticles = [];
      for (var pi = 0; pi < 56; pi++) {
        animParticles.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0014,
          vy: (Math.random() - 0.5) * 0.0014,
          r: 1.2 + Math.random() * 2.4,
          phase: Math.random() * Math.PI * 2
        });
      }

      function findAnimPreset(id) {
        if (!id || id === 'off') return null;
        var normId = id === 'anim-particle-nebula-1' ? 'abg-particle-nebula-1' : id;
        for (var i = 0; i < CFG.animatedBgPresets.length; i++) {
          if (CFG.animatedBgPresets[i].id === normId) return CFG.animatedBgPresets[i];
        }
        return null;
      }

      function resizeBgCanvas() {
        if (!bgCanvasEl) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        var w = Math.max(1, Math.floor(window.innerWidth * dpr));
        var h = Math.max(1, Math.floor(window.innerHeight * dpr));
        if (bgCanvasEl.width !== w || bgCanvasEl.height !== h) {
          bgCanvasEl.width = w;
          bgCanvasEl.height = h;
        }
      }
      window.addEventListener('resize', resizeBgCanvas);

      function drawAnimatedBgFrame(ts) {
        animBgRafId = 0;
        var preset = findAnimPreset(customSettings.animatedBgId);
        if (!preset || document.hidden || customSettings.reducedMotion || !bgCtx || !bgCanvasEl) {
          return;
        }
        resizeBgCanvas();
        var w = bgCanvasEl.width;
        var h = bgCanvasEl.height;
        var dt = animLastTs ? Math.min(0.06, (ts - animLastTs) / 1000) : 0.016;
        animLastTs = ts;
        var speed = (preset.speedMul || 1) * (customSettings.animBgSpeed || 1);
        animPhase += dt * speed;

        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
        bgCtx.clearRect(0, 0, w, h);

        var algo = preset.algo;
        var hueBase = (preset.hueOffset + animPhase * 14) % 360;
        var count = Math.max(8, Math.round(28 * (preset.density || 1)));

        if (algo === 'waves' || algo === 'minimal' || algo === 'flow') {
          var layers = algo === 'minimal' ? 4 : Math.min(9, Math.max(4, Math.round(preset.paramA || 5)));
          for (var li = 0; li < layers; li++) {
            bgCtx.beginPath();
            var yBase = h * (0.18 + (li / Math.max(1, layers - 1)) * 0.64);
            var amp = (algo === 'minimal' ? 18 : 34) * (preset.density || 1);
            bgCtx.strokeStyle = li % 2 === 0 ? accent : ('hsla(' + ((hueBase + li * 28) % 360) + ', 82%, 64%, 0.55)');
            bgCtx.lineWidth = algo === 'flow' ? 2.6 : 1.7;
            bgCtx.globalAlpha = algo === 'minimal' ? 0.35 : 0.52;
            for (var x = 0; x <= w; x += 24) {
              var nx = x / w;
              var y = yBase + Math.sin(nx * (4 + li * 0.45) + animPhase * (1 + li * 0.12)) * amp +
                Math.cos(nx * 2.5 - animPhase * 0.8 + li) * (amp * 0.4);
              if (x === 0) bgCtx.moveTo(x, y);
              else bgCtx.lineTo(x, y);
            }
            bgCtx.stroke();
          }
          bgCtx.globalAlpha = 1;
        } else if (algo === 'sacred' || algo === 'rings' || algo === 'tunnel') {
          var cx = w * 0.5;
          var cy = h * 0.5;
          var maxR = Math.min(w, h) * 0.44;
          var ringCount = algo === 'tunnel' ? 12 : Math.min(10, Math.max(4, Math.round(preset.paramA || 6)));
          for (var ri = 0; ri < ringCount; ri++) {
            var prog = ((ri / ringCount) + (algo === 'tunnel' ? (animPhase * 0.18) : 0)) % 1;
            var r = algo === 'tunnel' ? (prog * maxR) : (maxR * (0.2 + (ri / ringCount) * 0.78));
            var rot = animPhase * (ri % 2 === 0 ? 0.32 : -0.25);
            bgCtx.save();
            bgCtx.translate(cx, cy);
            bgCtx.rotate(rot);
            bgCtx.strokeStyle = ri % 2 === 0 ? accent : ('hsla(' + ((hueBase + ri * 32) % 360) + ', 85%, 65%, 0.55)');
            bgCtx.lineWidth = 1.4;
            bgCtx.globalAlpha = algo === 'tunnel' ? (1 - prog) * 0.72 : 0.45;
            if (algo === 'sacred') {
              var petals = Math.max(5, Math.round(preset.paramA || 6));
              for (var pt = 0; pt < petals; pt++) {
                var ang = (pt / petals) * Math.PI * 2;
                bgCtx.beginPath();
                bgCtx.arc(Math.cos(ang) * r * 0.5, Math.sin(ang) * r * 0.5, r * 0.5, 0, Math.PI * 2);
                bgCtx.stroke();
              }
            } else {
              bgCtx.beginPath();
              bgCtx.arc(0, 0, r, 0, Math.PI * 2);
              bgCtx.stroke();
            }
            bgCtx.restore();
          }
          bgCtx.globalAlpha = 1;
        } else if (algo === 'matrix' || algo === 'cybergrid') {
          if (algo === 'matrix') {
            var cols = Math.min(44, Math.max(16, count));
            var colW = w / cols;
            bgCtx.font = Math.max(11, Math.round(colW * 0.45)) + 'px monospace';
            for (var mc = 0; mc < cols; mc++) {
              var dropY = ((animPhase * 120 * (0.7 + (mc % 5) * 0.18) + mc * 67) % (h + 160)) - 80;
              bgCtx.fillStyle = mc % 3 === 0 ? accent : ('hsla(' + ((hueBase + mc * 6) % 360) + ', 88%, 62%, 0.65)');
              for (var trail = 0; trail < 6; trail++) {
                bgCtx.globalAlpha = Math.max(0.08, 0.72 - trail * 0.11);
                var ch = String.fromCharCode(48 + ((mc + trail + Math.floor(animPhase * 8)) % 42));
                bgCtx.fillText(ch, mc * colW + 4, dropY - trail * 18);
              }
            }
            bgCtx.globalAlpha = 1;
          } else {
            var horizon = h * 0.48;
            bgCtx.strokeStyle = accent;
            bgCtx.lineWidth = 1.2;
            bgCtx.globalAlpha = 0.42;
            for (var gx = -8; gx <= 8; gx++) {
              bgCtx.beginPath();
              bgCtx.moveTo(w * 0.5 + gx * (w * 0.03), horizon);
              bgCtx.lineTo(w * 0.5 + gx * (w * 0.16), h);
              bgCtx.stroke();
            }
            for (var gy = 0; gy < 10; gy++) {
              var gp = ((gy / 10) + (animPhase * 0.28)) % 1;
              var py = horizon + Math.pow(gp, 1.8) * (h - horizon);
              bgCtx.beginPath();
              bgCtx.moveTo(0, py);
              bgCtx.lineTo(w, py);
              bgCtx.stroke();
            }
            bgCtx.globalAlpha = 1;
          }
        } else if (algo === 'liquid' || algo === 'caustics') {
          var blobs = Math.min(7, Math.max(3, Math.round(preset.paramA || 4)));
          for (var bi = 0; bi < blobs; bi++) {
            var bx = w * (0.5 + 0.34 * Math.sin(animPhase * 0.55 + bi * 1.9));
            var by = h * (0.5 + 0.34 * Math.cos(animPhase * 0.42 + bi * 2.3));
            var br = Math.min(w, h) * (0.24 + 0.08 * Math.sin(animPhase + bi));
            var grad = bgCtx.createRadialGradient(bx, by, 10, bx, by, br);
            grad.addColorStop(0, 'hsla(' + ((hueBase + bi * 48) % 360) + ', 84%, 60%, 0.44)');
            grad.addColorStop(1, 'hsla(' + ((hueBase + bi * 48) % 360) + ', 84%, 50%, 0)');
            bgCtx.fillStyle = grad;
            bgCtx.beginPath();
            bgCtx.arc(bx, by, br, 0, Math.PI * 2);
            bgCtx.fill();
          }
        } else {
          // nebula / constellation with soft cosmic blooms + glowing stardust
          if (algo === 'nebula') {
            for (var ni = 0; ni < 3; ni++) {
              var nx = w * (0.22 + ni * 0.28 + 0.08 * Math.sin(animPhase * 0.45 + ni * 1.7));
              var ny = h * (0.3 + (ni % 2) * 0.36 + 0.09 * Math.cos(animPhase * 0.38 + ni * 2.1));
              var nr = Math.min(w, h) * (0.32 + 0.06 * Math.sin(animPhase + ni));
              var nGrad = bgCtx.createRadialGradient(nx, ny, 8, nx, ny, nr);
              nGrad.addColorStop(0, 'hsla(' + ((hueBase + ni * 42) % 360) + ', 88%, 62%, 0.24)');
              nGrad.addColorStop(0.55, 'hsla(' + ((hueBase + ni * 42 + 24) % 360) + ', 82%, 52%, 0.09)');
              nGrad.addColorStop(1, 'hsla(' + ((hueBase + ni * 42) % 360) + ', 82%, 45%, 0)');
              bgCtx.fillStyle = nGrad;
              bgCtx.beginPath();
              bgCtx.arc(nx, ny, nr, 0, Math.PI * 2);
              bgCtx.fill();
            }
          }
          var nCount = Math.min(animParticles.length, Math.max(24, count));
          for (var i1 = 0; i1 < nCount; i1++) {
            var p1 = animParticles[i1];
            p1.x = (p1.x + p1.vx * speed + 1) % 1;
            p1.y = (p1.y + p1.vy * speed + 1) % 1;
            var px1 = p1.x * w;
            var py1 = p1.y * h;
            var starR = p1.r * (0.95 + 0.35 * Math.sin(animPhase * 2 + p1.phase));
            var starColor = i1 % 4 === 0 ? accent : ('hsla(' + ((hueBase + i1 * 9) % 360) + ', 88%, 74%, 0.88)');

            if (i1 % 3 === 0) {
              bgCtx.fillStyle = i1 % 4 === 0 ? accent : ('hsla(' + ((hueBase + i1 * 9) % 360) + ', 88%, 72%, 0.22)');
              bgCtx.globalAlpha = 0.24;
              bgCtx.beginPath();
              bgCtx.arc(px1, py1, starR * 3.4, 0, Math.PI * 2);
              bgCtx.fill();
              bgCtx.globalAlpha = 1;
            }

            bgCtx.fillStyle = starColor;
            bgCtx.beginPath();
            bgCtx.arc(px1, py1, starR, 0, Math.PI * 2);
            bgCtx.fill();

            if (algo === 'constellation') {
              for (var i2 = i1 + 1; i2 < nCount; i2++) {
                var p2 = animParticles[i2];
                var dx = (p2.x - p1.x) * w;
                var dy = (p2.y - p1.y) * h;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 155) {
                  bgCtx.strokeStyle = 'hsla(' + hueBase + ', 82%, 70%, ' + ((1 - dist / 155) * 0.34).toFixed(3) + ')';
                  bgCtx.lineWidth = 1;
                  bgCtx.beginPath();
                  bgCtx.moveTo(px1, py1);
                  bgCtx.lineTo(p2.x * w, p2.y * h);
                  bgCtx.stroke();
                }
              }
            }
          }
        }

        animBgRafId = requestAnimationFrame(drawAnimatedBgFrame);
      }

      function syncAnimatedBgEngine() {
        var preset = findAnimPreset(customSettings.animatedBgId);
        var active = Boolean(preset && !customSettings.reducedMotion);
        document.body.setAttribute('data-anim-bg-on', active ? '1' : '0');
        document.documentElement.style.setProperty('--anim-bg-opacity', String(customSettings.animBgOpacity || 0.72));
        if (animBgRafId) {
          cancelAnimationFrame(animBgRafId);
          animBgRafId = 0;
        }
        if (active && !document.hidden) {
          animLastTs = 0;
          animBgRafId = requestAnimationFrame(drawAnimatedBgFrame);
        } else if (bgCtx && bgCanvasEl) {
          bgCtx.clearRect(0, 0, bgCanvasEl.width, bgCanvasEl.height);
        }
      }

      /* ---------------- DYNAMIC COLOR-CHANGING BACKGROUND ENGINE (100 PRESETS) ---------------- */
      var dynBgEl = document.getElementById('vb-dynamic-bg');
      var dynBgTimer = null;
      var dynPhase = 0;

      function findDynPreset(id) {
        if (!id || id === 'off') return null;
        for (var i = 0; i < CFG.dynamicColorBgPresets.length; i++) {
          if (CFG.dynamicColorBgPresets[i].id === id) return CFG.dynamicColorBgPresets[i];
        }
        return null;
      }

      function renderDynBgStep() {
        var preset = findDynPreset(customSettings.dynamicBgId);
        if (!preset || !dynBgEl || document.hidden || customSettings.reducedMotion) return;
        dynPhase += 0.04 * (customSettings.dynBgSpeed || 1);
        var ang = Math.round((preset.angle + dynPhase * 28) % 360);
        var shiftPct = Math.round(50 + Math.sin(dynPhase) * 28);
        if (preset.mode === 'conic') {
          dynBgEl.style.background = 'conic-gradient(from ' + ang + 'deg at ' + shiftPct + '% 50%, ' + preset.colors[0] + ', ' + preset.colors[1] + ', ' + preset.colors[2] + ', ' + preset.colors[0] + ')';
        } else if (preset.mode === 'pulse') {
          dynBgEl.style.background = 'radial-gradient(circle at ' + shiftPct + '% ' + (100 - shiftPct) + '%, ' + preset.colors[1] + ' 0%, ' + preset.colors[2] + ' 42%, ' + preset.colors[0] + ' 100%)';
        } else {
          dynBgEl.style.background = 'linear-gradient(' + ang + 'deg, ' + preset.colors[0] + ' 0%, ' + preset.colors[1] + ' ' + shiftPct + '%, ' + preset.colors[2] + ' 100%)';
        }
      }

      function syncDynamicColorEngine() {
        var preset = findDynPreset(customSettings.dynamicBgId);
        var active = Boolean(preset);
        document.body.setAttribute('data-dyn-bg-on', active ? '1' : '0');
        document.documentElement.style.setProperty('--dyn-bg-opacity', String(customSettings.dynBgOpacity || 0.72));
        if (dynBgTimer) {
          clearInterval(dynBgTimer);
          dynBgTimer = null;
        }
        if (active && dynBgEl) {
          renderDynBgStep();
          if (!customSettings.reducedMotion) {
            dynBgTimer = setInterval(renderDynBgStep, 80);
          }
        } else if (dynBgEl) {
          dynBgEl.style.background = 'none';
        }
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          if (animBgRafId) { cancelAnimationFrame(animBgRafId); animBgRafId = 0; }
        } else {
          syncAnimatedBgEngine();
        }
      });

      /* ---------------- STUDIO GRIDS RENDERERS ---------------- */
      function renderAnimBgGrid() {
        var grid = document.getElementById('animbg-grid');
        var countEl = document.getElementById('animbg-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = animSearchQuery.trim().toLowerCase();
        var list = CFG.animatedBgPresets.filter(function (p) {
          var matchCat = activeAnimCat === 'All' || p.category === activeAnimCat;
          var matchQ = !q || p.name.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1 || p.algo.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (countEl) countEl.textContent = String(list.length);
        list.forEach(function (p) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.animatedBgId === p.id ? ' active' : '');
          b.setAttribute('data-animbg-id', p.id);
          b.innerHTML = '<div style="font-size:12px;font-weight:700;"></div><div class="sub" style="font-family:var(--font-mono);font-size:10px;"></div>';
          b.children[0].textContent = p.name;
          b.children[1].textContent = p.category + ' · ' + p.algo;
          b.onclick = function () {
            customSettings.animatedBgId = p.id;
            applyCustomSettings(customSettings);
            renderAnimBgGrid();
          };
          grid.appendChild(b);
        });
      }

      function renderDynBgGrid() {
        var grid = document.getElementById('dynbg-grid');
        var countEl = document.getElementById('dynbg-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = dynSearchQuery.trim().toLowerCase();
        var list = CFG.dynamicColorBgPresets.filter(function (p) {
          var matchCat = activeDynCat === 'All' || p.category === activeDynCat;
          var matchQ = !q || p.name.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (countEl) countEl.textContent = String(list.length);
        list.forEach(function (p) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.dynamicBgId === p.id ? ' active' : '');
          b.setAttribute('data-dynbg-id', p.id);
          var bar = document.createElement('div');
          bar.className = 'dyn-swatch-bar';
          bar.style.background = 'linear-gradient(' + p.angle + 'deg, ' + p.colors[0] + ', ' + p.colors[1] + ', ' + p.colors[2] + ')';
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:12px;font-weight:700;margin-top:2px;';
          nm.textContent = p.name;
          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.style.cssText = 'font-family:var(--font-mono);font-size:10px;';
          sub.textContent = p.category + ' · ' + p.mode;
          b.appendChild(bar);
          b.appendChild(nm);
          b.appendChild(sub);
          b.onclick = function () {
            customSettings.dynamicBgId = p.id;
            applyCustomSettings(customSettings);
            renderDynBgGrid();
          };
          grid.appendChild(b);
        });
      }

      var fontCardObserver = null;
      if (typeof IntersectionObserver === 'function') {
        fontCardObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var fam = entry.target.getAttribute('data-font-family');
              if (fam) ensureGoogleFontLoaded(fam);
              fontCardObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
      }

      function renderFontsGrid() {
        var grid = document.getElementById('fonts-grid');
        var countEl = document.getElementById('fonts-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = fontSearchQuery.trim().toLowerCase();
        var list = CFG.fontLibrary.filter(function (f) {
          var matchCat = activeFontCat === 'All' || f.category === activeFontCat;
          var matchQ = !q || f.name.toLowerCase().indexOf(q) !== -1 || f.category.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (countEl) countEl.textContent = String(list.length);
        list.forEach(function (f) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.fontFamily === f.family ? ' active' : '');
          b.setAttribute('data-font-family', f.family);
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:12px;font-weight:700;';
          nm.textContent = f.name;
          var cat = document.createElement('div');
          cat.className = 'sub';
          cat.style.cssText = 'font-family:var(--font-mono);font-size:10px;';
          cat.textContent = f.category;
          var sample = document.createElement('div');
          sample.style.cssText = 'font-size:13px;color:var(--accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;margin-top:2px;';
          sample.style.fontFamily = "'" + f.family + "', " + f.fallback;
          sample.textContent = fontPreviewSample || 'The quick brown fox jumps — 12345';
          b.appendChild(nm);
          b.appendChild(cat);
          b.appendChild(sample);
          b.onclick = function () {
            ensureGoogleFontLoaded(f.family);
            customSettings.fontFamily = f.family;
            applyCustomSettings(customSettings);
            renderFontsGrid();
          };
          grid.appendChild(b);
          if (fontCardObserver) fontCardObserver.observe(b);
        });
      }

      function renderLayoutsGrid() {
        var grid = document.getElementById('layouts-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var q = layoutSearchQuery.trim().toLowerCase();
        var list = CFG.layoutPresets.filter(function (lp) {
          return !q || lp.name.toLowerCase().indexOf(q) !== -1 || lp.description.toLowerCase().indexOf(q) !== -1 || lp.navPosition.indexOf(q) !== -1;
        });
        list.forEach(function (lp) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.layoutPresetId === lp.id ? ' active' : '');
          b.setAttribute('data-layout-preset-id', lp.id);
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:12px;font-weight:700;';
          nm.textContent = lp.name;
          var meta = document.createElement('div');
          meta.className = 'eyebrow';
          meta.style.fontSize = '9px';
          meta.textContent = lp.navPosition.toUpperCase() + ' · ' + lp.homeLayout.toUpperCase() + ' · ' + lp.radius + 'px';
          var desc = document.createElement('div');
          desc.className = 'sub';
          desc.style.fontSize = '11px';
          desc.textContent = lp.description;
          b.appendChild(nm);
          b.appendChild(meta);
          b.appendChild(desc);
          b.onclick = function () {
            customSettings.layoutPresetId = lp.id;
            customSettings.navPosition = lp.navPosition;
            customSettings.homeLayout = lp.homeLayout;
            customSettings.uiRadius = lp.radius;
            customSettings.density = lp.density;
            applyRailMode(lp.railMode);
            applyCustomSettings(customSettings);
            renderLayoutsGrid();
          };
          grid.appendChild(b);
        });
      }

      function applyCustomSettings(next) {
        customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, next || {});
        if (
          customSettings.homeLayout !== 'normal' &&
          customSettings.homeLayout !== 'side' &&
          customSettings.homeLayout !== 'minimal'
        ) {
          customSettings.homeLayout = 'split';
        }
        if (
          customSettings.navPosition !== 'right' &&
          customSettings.navPosition !== 'top' &&
          customSettings.navPosition !== 'dock' &&
          customSettings.navPosition !== 'zen'
        ) {
          customSettings.navPosition = 'left';
        }
        safeLSSet('valem_custom_settings', JSON.stringify(customSettings));
        safeLSSet('valem_panic_url', customSettings.panicUrl || CFG.panicUrl);
        CFG.panicUrl = customSettings.panicUrl || 'https://classroom.google.com';

        var root = document.documentElement;
        document.body.setAttribute('data-bg-style', customSettings.bgStyle || 'aurora');
        document.body.setAttribute('data-home-layout', customSettings.homeLayout || 'split');
        document.body.setAttribute('data-nav-pos', customSettings.navPosition || 'left');
        document.body.setAttribute('data-density', customSettings.density || 'cozy');
        document.body.setAttribute('data-reduced-motion', customSettings.reducedMotion ? '1' : '0');
        root.style.setProperty('--ui-radius', (customSettings.uiRadius || 12) + 'px');
        root.style.setProperty('--glow-strength', String(typeof customSettings.glowStrength === 'number' ? customSettings.glowStrength : 1));
        root.style.setProperty('--glass-blur', (typeof customSettings.glassBlur === 'number' ? customSettings.glassBlur : 14) + 'px');
        root.style.setProperty('--font-scale', String(customSettings.fontScale || 1));

        var fontSpec = '';
        if (customSettings.fontFamily) {
          ensureGoogleFontLoaded(customSettings.fontFamily);
          var cleanFam = String(customSettings.fontFamily).replace(/['"]/g, '');
          fontSpec = encodeURIComponent(cleanFam).replace(/%20/g, '+') + ':wght@400;600;700';
          var fontStack = "'" + cleanFam + "', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif";
          root.style.setProperty('--font-ui', fontStack);
          root.style.setProperty('--font-display', fontStack);
        } else {
          root.style.setProperty('--font-ui', "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif");
          root.style.setProperty('--font-display', "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif");
        }

        document.querySelectorAll('#home-layout-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-homelayout') === customSettings.homeLayout);
        });
        document.querySelectorAll('#bg-style-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-bgstyle') === customSettings.bgStyle);
        });
        document.querySelectorAll('#radius-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', Number(b.getAttribute('data-radius')) === Number(customSettings.uiRadius));
        });
        document.querySelectorAll('#font-scale-pills .pill-btn[data-fscale]').forEach(function (b) {
          b.classList.toggle('active', Number(b.getAttribute('data-fscale')) === Number(customSettings.fontScale));
        });

        var glowRange = document.getElementById('custom-glow-range');
        var glowPctEl = document.getElementById('glow-pct-val');
        var pctVal = Math.round((typeof customSettings.glowStrength === 'number' ? customSettings.glowStrength : 1) * 100);
        if (glowRange) glowRange.value = String(pctVal);
        if (glowPctEl) glowPctEl.textContent = pctVal + '%';

        var animSpdEl = document.getElementById('animbg-speed-range');
        var animSpdVal = document.getElementById('animbg-speed-val');
        var animOpEl = document.getElementById('animbg-opacity-range');
        var animOpVal = document.getElementById('animbg-opacity-val');
        if (animSpdEl) animSpdEl.value = String(Math.round((customSettings.animBgSpeed || 1) * 100));
        if (animSpdVal) animSpdVal.textContent = Number(customSettings.animBgSpeed || 1).toFixed(1) + 'x';
        if (animOpEl) animOpEl.value = String(Math.round((customSettings.animBgOpacity || 0.72) * 100));
        if (animOpVal) animOpVal.textContent = Math.round((customSettings.animBgOpacity || 0.72) * 100) + '%';

        var dynSpdEl = document.getElementById('dynbg-speed-range');
        var dynSpdVal = document.getElementById('dynbg-speed-val');
        var dynOpEl = document.getElementById('dynbg-opacity-range');
        var dynOpVal = document.getElementById('dynbg-opacity-val');
        if (dynSpdEl) dynSpdEl.value = String(Math.round((customSettings.dynBgSpeed || 1) * 100));
        if (dynSpdVal) dynSpdVal.textContent = Number(customSettings.dynBgSpeed || 1).toFixed(1) + 'x';
        if (dynOpEl) dynOpEl.value = String(Math.round((customSettings.dynBgOpacity || 0.72) * 100));
        if (dynOpVal) dynOpVal.textContent = Math.round((customSettings.dynBgOpacity || 0.72) * 100) + '%';

        var blurBtn = document.getElementById('btn-toggle-blur');
        if (blurBtn) {
          var blurOn = Number(customSettings.glassBlur) > 0;
          blurBtn.classList.toggle('active', blurOn);
          blurBtn.textContent = 'Glass Blur: ' + (blurOn ? 'On' : 'Off');
        }
        var clockBtn = document.getElementById('btn-toggle-clock');
        if (clockBtn) {
          clockBtn.classList.toggle('active', Boolean(customSettings.showClock));
          clockBtn.textContent = 'Live Clock: ' + (customSettings.showClock ? 'On' : 'Off');
        }
        var scBtn = document.getElementById('btn-toggle-shortcuts');
        if (scBtn) {
          scBtn.classList.toggle('active', Boolean(customSettings.showShortcuts));
          scBtn.textContent = 'Launchpad: ' + (customSettings.showShortcuts ? 'On' : 'Off');
        }
        var motionBtn = document.getElementById('btn-toggle-motion');
        if (motionBtn) {
          motionBtn.classList.toggle('active', Boolean(customSettings.reducedMotion));
          motionBtn.textContent = 'Motion: ' + (customSettings.reducedMotion ? 'Reduced' : 'Smooth');
        }
        var panicSel = document.getElementById('panic-url-select');
        if (panicSel && customSettings.panicUrl) {
          panicSel.value = customSettings.panicUrl;
        }

        var hasGlobalFx = Boolean(
          (customSettings.animatedBgId !== 'off' || customSettings.dynamicBgId !== 'off') &&
          !customSettings.reducedMotion
        );
        document.body.setAttribute('data-has-fx', hasGlobalFx ? '1' : '0');

        document.querySelectorAll('#cursor-trail-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-cursortrail') === (customSettings.cursorTrail || 'glow'));
        });

        var userCssEl = document.getElementById('vux-user-custom-css');
        if (userCssEl) userCssEl.textContent = String(customSettings.customCss || '').slice(0, 1800);
        var customCssInput = document.getElementById('vux-custom-css-input');
        if (customCssInput && document.activeElement !== customCssInput) {
          customCssInput.value = String(customSettings.customCss || '');
        }

        syncAnimatedBgEngine();
        syncDynamicColorEngine();

        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({
              type: 'valem-custom-settings',
              settings: Object.assign({}, customSettings, {
                fontSpec: fontSpec,
                hasGlobalFx: hasGlobalFx
              })
            }, '*');
          } catch (_e) {}
        }
      }

      function activateSettingsTab(target) {
        document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-stab') === target);
        });
        document.querySelectorAll('.settings-pane').forEach(function (pane) {
          pane.classList.toggle('active', pane.id === 'spane-' + target);
        });
        if (target === 'appearance') renderColorPresetsGrid();
        else if (target === 'animbg') renderAnimBgGrid();
        else if (target === 'dynbg') renderDynBgGrid();
        else if (target === 'fonts') renderFontsGrid();
        else if (target === 'layout') renderLayoutsGrid();
      }

      function openStudioModal(initialTab) {
        activateSettingsTab(initialTab || 'appearance');
        settingsModal.classList.add('open');
      }

      document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function () {
          activateSettingsTab(tabBtn.getAttribute('data-stab'));
        });
      });

      document.querySelectorAll('#animbg-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeAnimCat = btn.getAttribute('data-animcat') || 'All';
          document.querySelectorAll('#animbg-cat-pills .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderAnimBgGrid();
        });
      });
      var animSearchEl = document.getElementById('animbg-search');
      if (animSearchEl) animSearchEl.addEventListener('input', function () { animSearchQuery = animSearchEl.value || ''; renderAnimBgGrid(); });
      var animOffBtn = document.getElementById('btn-animbg-off');
      if (animOffBtn) animOffBtn.addEventListener('click', function () { customSettings.animatedBgId = 'off'; applyCustomSettings(customSettings); renderAnimBgGrid(); });
      var animSpdRange = document.getElementById('animbg-speed-range');
      if (animSpdRange) animSpdRange.addEventListener('input', function () { customSettings.animBgSpeed = Number(animSpdRange.value) / 100; applyCustomSettings(customSettings); });
      var animOpRange = document.getElementById('animbg-opacity-range');
      if (animOpRange) animOpRange.addEventListener('input', function () { customSettings.animBgOpacity = Number(animOpRange.value) / 100; applyCustomSettings(customSettings); });

      document.querySelectorAll('#dynbg-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeDynCat = btn.getAttribute('data-dyncat') || 'All';
          document.querySelectorAll('#dynbg-cat-pills .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderDynBgGrid();
        });
      });
      var dynSearchEl = document.getElementById('dynbg-search');
      if (dynSearchEl) dynSearchEl.addEventListener('input', function () { dynSearchQuery = dynSearchEl.value || ''; renderDynBgGrid(); });
      var dynOffBtn = document.getElementById('btn-dynbg-off');
      if (dynOffBtn) dynOffBtn.addEventListener('click', function () { customSettings.dynamicBgId = 'off'; applyCustomSettings(customSettings); renderDynBgGrid(); });
      var dynSpdRange = document.getElementById('dynbg-speed-range');
      if (dynSpdRange) dynSpdRange.addEventListener('input', function () { customSettings.dynBgSpeed = Number(dynSpdRange.value) / 100; applyCustomSettings(customSettings); });
      var dynOpRange = document.getElementById('dynbg-opacity-range');
      if (dynOpRange) dynOpRange.addEventListener('input', function () { customSettings.dynBgOpacity = Number(dynOpRange.value) / 100; applyCustomSettings(customSettings); });

      document.querySelectorAll('#fonts-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeFontCat = btn.getAttribute('data-fcat') || 'All';
          document.querySelectorAll('#fonts-cat-pills .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderFontsGrid();
        });
      });
      var fontsSearchEl = document.getElementById('fonts-search');
      if (fontsSearchEl) fontsSearchEl.addEventListener('input', function () { fontSearchQuery = fontsSearchEl.value || ''; renderFontsGrid(); });
      var fontPreviewIn = document.getElementById('font-preview-sample');
      if (fontPreviewIn) fontPreviewIn.addEventListener('input', function () { fontPreviewSample = fontPreviewIn.value || ''; renderFontsGrid(); });
      var fontResetBtn = document.getElementById('btn-font-reset');
      if (fontResetBtn) fontResetBtn.addEventListener('click', function () { customSettings.fontFamily = ''; applyCustomSettings(customSettings); renderFontsGrid(); });

      var layoutsSearchEl = document.getElementById('layouts-search');
      if (layoutsSearchEl) layoutsSearchEl.addEventListener('input', function () { layoutSearchQuery = layoutsSearchEl.value || ''; renderLayoutsGrid(); });

      document.querySelectorAll('#bg-style-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.bgStyle = btn.getAttribute('data-bgstyle') || 'aurora';
          applyCustomSettings(customSettings);
        });
      });

      document.querySelectorAll('#radius-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.uiRadius = Number(btn.getAttribute('data-radius')) || 12;
          applyCustomSettings(customSettings);
        });
      });

      document.querySelectorAll('#font-scale-pills .pill-btn[data-fscale]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.fontScale = Number(btn.getAttribute('data-fscale')) || 1;
          applyCustomSettings(customSettings);
        });
      });

      document.querySelectorAll('#home-layout-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.homeLayout = btn.getAttribute('data-homelayout') || 'split';
          applyCustomSettings(customSettings);
          switchView('browser');
        });
      });

      document.querySelectorAll('#sidebar-mode-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyRailMode(btn.getAttribute('data-railmode') || 'expanded');
        });
      });

      var glowInput = document.getElementById('custom-glow-range');
      if (glowInput) {
        glowInput.addEventListener('input', function () {
          customSettings.glowStrength = Number(glowInput.value) / 100;
          applyCustomSettings(customSettings);
        });
      }

      var blurToggleBtn = document.getElementById('btn-toggle-blur');
      if (blurToggleBtn) {
        blurToggleBtn.addEventListener('click', function () {
          customSettings.glassBlur = Number(customSettings.glassBlur) > 0 ? 0 : 14;
          applyCustomSettings(customSettings);
        });
      }

      var clockToggleBtn = document.getElementById('btn-toggle-clock');
      if (clockToggleBtn) {
        clockToggleBtn.addEventListener('click', function () {
          customSettings.showClock = !customSettings.showClock;
          applyCustomSettings(customSettings);
        });
      }

      var scToggleBtn = document.getElementById('btn-toggle-shortcuts');
      if (scToggleBtn) {
        scToggleBtn.addEventListener('click', function () {
          customSettings.showShortcuts = !customSettings.showShortcuts;
          applyCustomSettings(customSettings);
        });
      }

      var motionToggleBtn = document.getElementById('btn-toggle-motion');
      if (motionToggleBtn) {
        motionToggleBtn.addEventListener('click', function () {
          customSettings.reducedMotion = !customSettings.reducedMotion;
          applyCustomSettings(customSettings);
        });
      }

      var customCloakInput = document.getElementById('custom-cloak-title');
      var applyCustomCloakBtn = document.getElementById('btn-apply-custom-cloak');
      if (applyCustomCloakBtn && customCloakInput) {
        applyCustomCloakBtn.addEventListener('click', function () {
          var nextTitle = (customCloakInput.value || '').trim();
          if (!nextTitle) return;
          document.title = nextTitle;
          safeLSSet('valem_cloak_title', nextTitle);
          showToast('Tab title cloaked as "' + nextTitle + '"');
        });
      }

      var panicSelectEl = document.getElementById('panic-url-select');
      if (panicSelectEl) {
        panicSelectEl.addEventListener('change', function () {
          customSettings.panicUrl = panicSelectEl.value || 'https://classroom.google.com';
          applyCustomSettings(customSettings);
        });
      }

      var tmdbKeyInput = document.getElementById('tmdb-api-key-input');
      var tmdbStatusEl = document.getElementById('tmdb-key-status');
      var saveTmdbBtn = document.getElementById('btn-save-tmdb-key');
      var clearTmdbBtn = document.getElementById('btn-clear-tmdb-key');

      function refreshTmdbUi() {
        var cur = (safeLSGet('valem_tmdb_api_key') || '').trim();
        if (tmdbKeyInput) tmdbKeyInput.value = cur;
        if (tmdbStatusEl) {
          tmdbStatusEl.textContent = cur
            ? 'TMDB API key saved in localStorage — trending TMDB movies & official YouTube trailers enabled.'
            : 'Optional — leave blank to use free TVMaze + Internet Archive catalog with no key required.';
        }
      }
      refreshTmdbUi();

      if (saveTmdbBtn && tmdbKeyInput) {
        saveTmdbBtn.addEventListener('click', function () {
          var key = (tmdbKeyInput.value || '').trim();
          safeLSSet('valem_tmdb_api_key', key);
          refreshTmdbUi();
          loadCinemaLiveCatalog();
          showToast(key ? 'TMDB API key saved — refreshing Movies & TV.' : 'TMDB key cleared.');
        });
      }

      if (clearTmdbBtn) {
        clearTmdbBtn.addEventListener('click', function () {
          safeLSSet('valem_tmdb_api_key', '');
          refreshTmdbUi();
          loadCinemaLiveCatalog();
          showToast('TMDB API key removed.');
        });
      }

      var resetAllCustomBtn = document.getElementById('btn-reset-all-custom');
      if (resetAllCustomBtn) {
        resetAllCustomBtn.addEventListener('click', function () {
          applyColorPreset('coral-default');
          applyRailMode('expanded');
          applyCustomSettings(DEFAULT_CUSTOM_SETTINGS);
          document.title = 'Vux — Isolated Workspace';
          showToast('All Vux custom settings restored to defaults.');
        });
      }

      document.querySelectorAll('#cursor-trail-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.cursorTrail = btn.getAttribute('data-cursortrail') || 'glow';
          applyCustomSettings(customSettings);
          if (typeof recordVuxStat === 'function') recordVuxStat('themesTried', 1);
        });
      });

      function encodeVuxShareCodeClient(payload) {
        var json = JSON.stringify(payload);
        var bytes = new TextEncoder().encode(json);
        var bin = '';
        for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return 'VUX1:' + btoa(bin).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
      }

      function decodeVuxShareCodeClient(raw) {
        var s = String(raw || '').trim();
        if (s.indexOf('VUX1:') !== 0) return null;
        var b64 = s.slice(5).replace(/-/g, '+').replace(/_/g, '/');
        if (!b64) return null;
        try {
          while (b64.length % 4) b64 += '=';
          var bin = atob(b64);
          var bytes = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          return JSON.parse(new TextDecoder().decode(bytes));
        } catch (_e) {
          return null;
        }
      }

      var exportCodeBtn = document.getElementById('btn-vux-export-code');
      var importCodeBtn = document.getElementById('btn-vux-import-code');
      var shareCodeInput = document.getElementById('vux-share-code-input');
      if (exportCodeBtn && shareCodeInput) {
        exportCodeBtn.addEventListener('click', function () {
          var code = encodeVuxShareCodeClient({
            presetId: activePresetId,
            animBgId: customSettings.animatedBgId,
            dynBgId: customSettings.dynamicBgId,
            fontId: customSettings.fontFamily || '',
            layoutId: customSettings.layoutPresetId,
            cursorTrail: customSettings.cursorTrail || 'glow',
            customCss: customSettings.customCss || ''
          });
          shareCodeInput.value = code;
          try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code); } catch (_e) {}
          showToast('VUX1 share code generated & copied!');
        });
      }
      if (importCodeBtn && shareCodeInput) {
        importCodeBtn.addEventListener('click', function () {
          var parsed = decodeVuxShareCodeClient(shareCodeInput.value);
          if (!parsed) {
            showToast('Invalid VUX1 share code.');
            return;
          }
          if (parsed.presetId) applyColorPreset(parsed.presetId);
          if (parsed.animBgId) customSettings.animatedBgId = parsed.animBgId;
          if (parsed.dynBgId) customSettings.dynamicBgId = parsed.dynBgId;
          if (typeof parsed.fontId === 'string') customSettings.fontFamily = parsed.fontId;
          if (parsed.layoutId) customSettings.layoutPresetId = parsed.layoutId;
          if (parsed.cursorTrail) customSettings.cursorTrail = parsed.cursorTrail;
          if (typeof parsed.customCss === 'string') customSettings.customCss = parsed.customCss.slice(0, 1800);
          applyCustomSettings(customSettings);
          if (typeof recordVuxStat === 'function') recordVuxStat('themesTried', 1);
          showToast('Imported Vux theme & settings!');
        });
      }

      var applyCssBtn = document.getElementById('btn-vux-apply-css');
      var clearCssBtn = document.getElementById('btn-vux-clear-css');
      var cssTextarea = document.getElementById('vux-custom-css-input');
      if (applyCssBtn && cssTextarea) {
        applyCssBtn.addEventListener('click', function () {
          customSettings.customCss = (cssTextarea.value || '').slice(0, 1800);
          applyCustomSettings(customSettings);
          showToast('Custom CSS applied to Vux.');
        });
      }
      if (clearCssBtn && cssTextarea) {
        clearCssBtn.addEventListener('click', function () {
          cssTextarea.value = '';
          customSettings.customCss = '';
          applyCustomSettings(customSettings);
          showToast('Custom CSS cleared.');
        });
      }

      document.getElementById('btn-open-settings').addEventListener('click', function () {
        openStudioModal('appearance');
      });
      document.getElementById('btn-close-settings').addEventListener('click', function () {
        settingsModal.classList.remove('open');
      });
      settingsModal.addEventListener('click', function (ev) {
        if (ev.target === settingsModal) {
          settingsModal.classList.remove('open');
        }
      });
      document.querySelectorAll('[data-cloak]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var t = btn.getAttribute('data-cloak');
          document.title = t;
          if (customCloakInput) customCloakInput.value = t;
          safeLSSet('valem_cloak_title', t);
        });
      });

      /* ---------------- LIVE ONLINE USERS COUNTER (MULTI-TAB PRESENCE) ---------------- */
      var onlineCountEl = document.getElementById('vux-online-count');
      var presenceTabId = 'vux_' + Math.random().toString(36).slice(2, 10);
      var presencePeers = Object.create(null);
      presencePeers[presenceTabId] = Date.now();
      var presenceChan = typeof BroadcastChannel === 'function' ? new BroadcastChannel('vux_presence_channel') : null;

      function updateOnlineBadgeCount() {
        var now = Date.now();
        presencePeers[presenceTabId] = now;
        var count = 0;
        Object.keys(presencePeers).forEach(function (id) {
          if (now - presencePeers[id] > 12000) delete presencePeers[id];
          else count += 1;
        });
        if (onlineCountEl) {
          onlineCountEl.textContent = Math.max(1, count) + ' active';
        }
      }
      if (presenceChan) {
        presenceChan.onmessage = function (ev) {
          if (!ev || !ev.data) return;
          if (ev.data.type === 'ping' && ev.data.id) {
            presencePeers[ev.data.id] = Date.now();
            updateOnlineBadgeCount();
          } else if (ev.data.type === 'bye' && ev.data.id) {
            delete presencePeers[ev.data.id];
            updateOnlineBadgeCount();
          }
        };
        setInterval(function () {
          try { presenceChan.postMessage({ type: 'ping', id: presenceTabId }); } catch (_e) {}
          updateOnlineBadgeCount();
        }, 3500);
        try { presenceChan.postMessage({ type: 'ping', id: presenceTabId }); } catch (_e) {}
        window.addEventListener('beforeunload', function () {
          try { presenceChan.postMessage({ type: 'bye', id: presenceTabId }); } catch (_e) {}
        });
      }
      updateOnlineBadgeCount();

      /* ---------------- LIVE FPS, PING & WAKE WISP STATUS PILL ---------------- */
      var fpsTextEl = document.getElementById('vux-fps-text');
      var pingTextEl = document.getElementById('vux-ping-text');
      var wakeWispBtn = document.getElementById('btn-wake-wisp');
      var fpsFrames = 0;
      var fpsLastSample = performance.now();

      function tickFpsMonitor(now) {
        fpsFrames += 1;
        if (now - fpsLastSample >= 950) {
          var fps = Math.round((fpsFrames * 1000) / Math.max(1, now - fpsLastSample));
          if (fpsTextEl) fpsTextEl.textContent = Math.min(240, Math.max(1, fps)) + ' FPS';
          fpsFrames = 0;
          fpsLastSample = now;
        }
        if (!document.hidden) requestAnimationFrame(tickFpsMonitor);
      }
      requestAnimationFrame(tickFpsMonitor);
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
          fpsFrames = 0;
          fpsLastSample = performance.now();
          requestAnimationFrame(tickFpsMonitor);
        }
      });

      function probeWispLatency(manualWake) {
        var activeWisp = (safeLSGet('valbrowse_wisp_url') || CFG.defaultWisp || 'wss://wisp.mercurywork.shop/').trim();
        var targets = [activeWisp];
        if (manualWake && targets.indexOf('https://my-wisp-server-ocnq.onrender.com/') === -1) {
          fetch('https://my-wisp-server-ocnq.onrender.com/', { mode: 'no-cors' }).catch(function () {});
        }
        var t0 = performance.now();
        if (pingTextEl) pingTextEl.textContent = 'Wisp: ...';
        try {
          var ws = new WebSocket(activeWisp);
          var done = false;
          var fallbackTimer = setTimeout(function () {
            if (done) return;
            done = true;
            try { ws.close(); } catch (_e) {}
            if (pingTextEl) pingTextEl.textContent = 'Wisp: Wait';
          }, 4500);
          ws.onopen = function () {
            if (done) return;
            done = true;
            clearTimeout(fallbackTimer);
            var ms = Math.max(1, Math.round(performance.now() - t0));
            if (pingTextEl) pingTextEl.textContent = 'Wisp: ' + ms + 'ms';
            if (manualWake) showToast('Wisp awake (' + ms + 'ms) — ' + activeWisp);
            try { ws.close(); } catch (_e) {}
          };
          ws.onerror = function () {
            if (done) return;
            done = true;
            clearTimeout(fallbackTimer);
            var ms = Math.max(1, Math.round(performance.now() - t0));
            if (pingTextEl) pingTextEl.textContent = 'Wisp: ' + ms + 'ms';
          };
        } catch (_e) {
          if (pingTextEl) pingTextEl.textContent = 'Wisp: Ready';
        }
      }
      if (wakeWispBtn) {
        wakeWispBtn.addEventListener('click', function () { probeWispLatency(true); });
      }
      setTimeout(function () { probeWispLatency(false); }, 1800);

      /* ---------------- BUILT-IN DISCORD-STYLED COMMUNITY CHAT (VUX CHAT) ---------------- */
      var chatChannels = Array.isArray(CFG.chatChannels) ? CFG.chatChannels : [{ id: 'general', name: 'general', topic: 'Vux chat' }];
      var activeChatChannel = 'general';
      var chatReplyState = null;
      var CHAT_COLORS = ['#ff5c7c', '#38bdf8', '#34d399', '#a855f7', '#f59e0b', '#ec4899'];
      var chatProfile = { name: 'Guest-' + Math.floor(100 + Math.random() * 899), color: CHAT_COLORS[0] };
      try {
        var savedProf = safeLSGet('vux_chat_profile');
        if (savedProf) chatProfile = Object.assign(chatProfile, JSON.parse(savedProf));
      } catch (_e) {}

      var chatMessages = [];
      try {
        var savedChat = safeLSGet('vux_chat_messages_v1');
        if (savedChat) chatMessages = JSON.parse(savedChat) || [];
      } catch (_e) {}
      if (!Array.isArray(chatMessages) || !chatMessages.length) {
        chatMessages = Array.isArray(CFG.initialChatMessages) ? CFG.initialChatMessages.slice() : [];
        safeLSSet('vux_chat_messages_v1', JSON.stringify(chatMessages));
      }

      var chatSyncChan = typeof BroadcastChannel === 'function' ? new BroadcastChannel('vux_chat_sync') : null;
      if (chatSyncChan) {
        chatSyncChan.onmessage = function (ev) {
          if (!ev || !ev.data || ev.data.type !== 'sync' || !Array.isArray(ev.data.messages)) return;
          chatMessages = ev.data.messages;
          safeLSSet('vux_chat_messages_v1', JSON.stringify(chatMessages));
          renderChatView();
        };
      }

      function persistAndBroadcastChat() {
        safeLSSet('vux_chat_messages_v1', JSON.stringify(chatMessages.slice(-240)));
        if (chatSyncChan) {
          try { chatSyncChan.postMessage({ type: 'sync', messages: chatMessages }); } catch (_e) {}
        }
      }

      function renderChatProfileControls() {
        var nameIn = document.getElementById('chat-profile-name');
        var swWrap = document.getElementById('chat-color-swatches');
        if (nameIn && document.activeElement !== nameIn) nameIn.value = chatProfile.name;
        if (swWrap) {
          swWrap.innerHTML = '';
          CHAT_COLORS.forEach(function (hex) {
            var b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = 'width:16px;height:16px;border-radius:50%;border:2px solid ' + (chatProfile.color === hex ? '#fff' : 'transparent') + ';background:' + hex + ';cursor:pointer;';
            b.title = 'Avatar color ' + hex;
            b.onclick = function () {
              chatProfile.color = hex;
              safeLSSet('vux_chat_profile', JSON.stringify(chatProfile));
              renderChatProfileControls();
            };
            swWrap.appendChild(b);
          });
        }
      }

      function renderChatView() {
        var chListEl = document.getElementById('chat-channel-list');
        var msgListEl = document.getElementById('chat-messages');
        var titleEl = document.getElementById('chat-active-channel-title');
        var topicEl = document.getElementById('chat-active-channel-topic');
        var msgInEl = document.getElementById('chat-message-input');
        if (!chListEl || !msgListEl) return;

        chListEl.innerHTML = '';
        var activeSpec = chatChannels[0];
        chatChannels.forEach(function (ch) {
          if (ch.id === activeChatChannel) activeSpec = ch;
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'chat-ch-btn' + (ch.id === activeChatChannel ? ' active' : '');
          btn.setAttribute('data-chat-channel', ch.id);
          btn.textContent = '# ' + ch.name;
          btn.onclick = function () {
            activeChatChannel = ch.id;
            renderChatView();
          };
          chListEl.appendChild(btn);
        });

        if (titleEl && activeSpec) titleEl.textContent = '#' + activeSpec.name;
        if (topicEl && activeSpec) topicEl.textContent = activeSpec.topic;
        if (msgInEl && activeSpec) msgInEl.placeholder = 'Message #' + activeSpec.name + '...';

        var roomMsgs = chatMessages.filter(function (m) { return m && m.channelId === activeChatChannel; });
        msgListEl.innerHTML = '';
        roomMsgs.forEach(function (m) {
          var row = document.createElement('div');
          row.className = 'chat-msg';

          var av = document.createElement('div');
          av.className = 'chat-avatar';
          av.style.background = m.avatarColor || '#ff5c7c';
          av.textContent = String(m.author || 'V').charAt(0).toUpperCase();

          var body = document.createElement('div');
          body.className = 'chat-msg-body';

          if (m.replyToAuthor) {
            var rep = document.createElement('div');
            rep.className = 'chat-reply-quote';
            rep.textContent = 'Replying to ' + m.replyToAuthor + ': ' + (m.replyToSnippet || '');
            body.appendChild(rep);
          }

          var meta = document.createElement('div');
          meta.style.cssText = 'display:flex;align-items:baseline;gap:8px;';
          var auth = document.createElement('span');
          auth.style.cssText = 'font-size:13px;font-weight:700;color:' + (m.avatarColor || 'var(--accent)') + ';';
          auth.textContent = m.author;
          var ts = document.createElement('span');
          ts.className = 'sub';
          ts.style.fontSize = '10px';
          ts.textContent = new Date(m.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          meta.appendChild(auth);
          meta.appendChild(ts);

          var txt = document.createElement('div');
          txt.style.cssText = 'font-size:13px;line-height:1.45;color:var(--text);word-break:break-word;';
          txt.textContent = m.text;

          var reacts = document.createElement('div');
          reacts.className = 'chat-reactions-row';
          var rxObj = m.reactions || {};
          Object.keys(rxObj).forEach(function (emoji) {
            if (!rxObj[emoji]) return;
            var pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'chat-react-pill';
            pill.textContent = emoji + ' ' + rxObj[emoji];
            pill.onclick = function () {
              m.reactions = m.reactions || {};
              m.reactions[emoji] = Number(m.reactions[emoji] || 0) + 1;
              persistAndBroadcastChat();
              renderChatView();
            };
            reacts.appendChild(pill);
          });

          var tools = document.createElement('div');
          tools.className = 'chat-hover-tools';
          ['🔥', '👍', '❤️', '🎮'].forEach(function (em) {
            var eb = document.createElement('button');
            eb.type = 'button';
            eb.className = 'chat-tool-btn';
            eb.textContent = em;
            eb.onclick = function () {
              m.reactions = m.reactions || {};
              m.reactions[em] = Number(m.reactions[em] || 0) + 1;
              persistAndBroadcastChat();
              renderChatView();
            };
            tools.appendChild(eb);
          });
          var repBtn = document.createElement('button');
          repBtn.type = 'button';
          repBtn.className = 'chat-tool-btn';
          repBtn.textContent = 'Reply';
          repBtn.onclick = function () {
            chatReplyState = { author: m.author, snippet: String(m.text || '').slice(0, 60) };
            var ban = document.getElementById('chat-reply-banner');
            var pre = document.getElementById('chat-reply-preview');
            if (ban && pre) {
              pre.textContent = 'Replying to ' + m.author + ': "' + chatReplyState.snippet + '"';
              ban.style.display = 'flex';
            }
            if (msgInEl) msgInEl.focus();
          };
          tools.appendChild(repBtn);

          body.appendChild(meta);
          body.appendChild(txt);
          if (reacts.children.length) body.appendChild(reacts);
          row.appendChild(av);
          row.appendChild(body);
          row.appendChild(tools);
          msgListEl.appendChild(row);
        });
        msgListEl.scrollTop = msgListEl.scrollHeight;
      }

      var chatNameIn = document.getElementById('chat-profile-name');
      if (chatNameIn) {
        chatNameIn.addEventListener('input', function () {
          chatProfile.name = (chatNameIn.value || '').trim().slice(0, 20) || 'Guest';
          safeLSSet('vux_chat_profile', JSON.stringify(chatProfile));
        });
      }
      var chatReplyCancel = document.getElementById('chat-reply-cancel');
      if (chatReplyCancel) {
        chatReplyCancel.addEventListener('click', function () {
          chatReplyState = null;
          var ban = document.getElementById('chat-reply-banner');
          if (ban) ban.style.display = 'none';
        });
      }
      var chatClearBtn = document.getElementById('chat-clear-channel-btn');
      if (chatClearBtn) {
        chatClearBtn.addEventListener('click', function () {
          var seeds = (CFG.initialChatMessages || []).filter(function (m) { return m.channelId === activeChatChannel; });
          chatMessages = chatMessages.filter(function (m) { return m.channelId !== activeChatChannel; }).concat(seeds);
          persistAndBroadcastChat();
          renderChatView();
          showToast('Reset #' + activeChatChannel + ' to starter messages.');
        });
      }
      var chatForm = document.getElementById('chat-composer-form');
      var chatInput = document.getElementById('chat-message-input');
      if (chatForm && chatInput) {
        chatForm.addEventListener('submit', function (e) {
          e.preventDefault();
          var text = (chatInput.value || '').trim().slice(0, 420);
          if (!text) return;
          chatMessages.push({
            id: 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            channelId: activeChatChannel,
            author: chatProfile.name || 'Guest',
            avatarColor: chatProfile.color || '#ff5c7c',
            text: text,
            timestamp: Date.now(),
            replyToAuthor: chatReplyState ? chatReplyState.author : undefined,
            replyToSnippet: chatReplyState ? chatReplyState.snippet : undefined,
            reactions: {}
          });
          chatInput.value = '';
          chatReplyState = null;
          var ban = document.getElementById('chat-reply-banner');
          if (ban) ban.style.display = 'none';
          persistAndBroadcastChat();
          renderChatView();
          if (typeof recordVuxStat === 'function') recordVuxStat('messagesSent', 1);
        });
      }
      renderChatProfileControls();
      renderChatView();

      /* ---------------- PICTURE-IN-PICTURE FLOATING BROWSER WIDGET ---------------- */
      var pipEl = document.getElementById('vux-pip-widget');
      var pipFrame = document.getElementById('vux-pip-frame');
      var pipTitleEl = document.getElementById('vux-pip-title');
      var pipDragHandle = document.getElementById('vux-pip-drag-handle');
      var pipMinBtn = document.getElementById('vux-pip-min');
      var pipCloseBtn = document.getElementById('vux-pip-close');

      async function openVuxPip(targetUrl, title, useProxy) {
        if (!pipEl || !pipFrame) return;
        if (pipTitleEl) pipTitleEl.textContent = title || 'Vux Mini Player';
        pipEl.classList.remove('minimized');
        pipEl.classList.add('open');
        pipFrame.removeAttribute('srcdoc');
        if (useProxy && /^https?:/i.test(String(targetUrl || ''))) {
          var res = await resolveScramUrlViaBridge(targetUrl);
          pipFrame.src = res.encodedUrl || (CFG.origin + '/scram/' + encodeURIComponent(targetUrl));
        } else {
          pipFrame.src = targetUrl;
        }
      }

      function openVuxPipSrcdoc(htmlStr, title) {
        if (!pipEl || !pipFrame) return;
        if (pipTitleEl) pipTitleEl.textContent = title || 'Vux Mini Window';
        pipEl.classList.remove('minimized');
        pipEl.classList.add('open');
        pipFrame.removeAttribute('src');
        pipFrame.srcdoc = htmlStr;
      }

      if (pipCloseBtn && pipEl && pipFrame) {
        pipCloseBtn.addEventListener('click', function () {
          pipEl.classList.remove('open');
          pipFrame.removeAttribute('srcdoc');
          pipFrame.removeAttribute('src');
        });
      }
      if (pipMinBtn && pipEl) {
        pipMinBtn.addEventListener('click', function () {
          var m = pipEl.classList.toggle('minimized');
          pipMinBtn.textContent = m ? 'Max' : 'Min';
        });
      }
      if (pipDragHandle && pipEl) {
        var dragOffX = 0, dragOffY = 0, draggingPip = false;
        pipDragHandle.addEventListener('pointerdown', function (e) {
          if (e.target && e.target.closest('button')) return;
          draggingPip = true;
          var rect = pipEl.getBoundingClientRect();
          dragOffX = e.clientX - rect.left;
          dragOffY = e.clientY - rect.top;
          pipEl.style.right = 'auto';
          pipEl.style.bottom = 'auto';
          pipEl.style.left = rect.left + 'px';
          pipEl.style.top = rect.top + 'px';
        });
        window.addEventListener('pointermove', function (e) {
          if (!draggingPip) return;
          var nx = Math.max(8, Math.min(window.innerWidth - 120, e.clientX - dragOffX));
          var ny = Math.max(8, Math.min(window.innerHeight - 48, e.clientY - dragOffY));
          pipEl.style.left = nx + 'px';
          pipEl.style.top = ny + 'px';
        });
        window.addEventListener('pointerup', function () { draggingPip = false; });
      }

      /* ---------------- FLOATING COMMAND PALETTE (CTRL+K) ---------------- */
      var cmdBackdrop = document.getElementById('vux-cmd-palette');
      var cmdInput = document.getElementById('vux-cmd-input');
      var cmdResultsEl = document.getElementById('vux-cmd-results');
      var cmdCloseBtn = document.getElementById('vux-cmd-close');
      var cmdSelIdx = 0;
      var cmdCurrentList = [];

      function buildCommandResults(query) {
        var q = String(query || '').trim().toLowerCase();
        var items = [];
        function add(title, category, action) {
          items.push({ title: title, category: category, action: action });
        }

        add('Vux Proxy Browser', 'View', function () { switchView('browser'); });
        add('Vux Community Chat (#general)', 'Chat', function () { activeChatChannel = 'general'; switchView('chat'); });
        add('Vux.ai (duck.ai via Render Wisp)', 'AI Tool', function () { switchView('ai'); });
        add('All Games Hub', 'Arcade', function () { switchView('modules'); });
        add('Seraph Games Provider', 'Arcade', function () { switchView('seraph'); });
        add('GMShelf Games Provider', 'Arcade', function () { switchView('gmshelf'); });
        add('gn-math Script & Zones', 'Arcade', function () { switchView('gnmath'); });
        add('Movies & TV Theater', 'Cinema', function () { switchView('movies'); });
        add('StudyHub MP3 & Ambient Studio', 'Audio', function () { switchView('music'); });
        add('Quick Scratchpad Notes', 'Utility', function () { toggleNotesDrawer(true); });
        add('Customization Studio Settings', 'Studio', function () { openStudioModal('appearance'); });
        add('Cursive & Calligraphy Fonts', 'Studio', function () { activeFontCat = 'Cursive & Calligraphy'; openStudioModal('fonts'); });
        add('Streak & Achievement Badges', 'Profile', function () { openBadgesModal(); });

        if (q) {
          if (q.indexOf('.') !== -1 || q.indexOf('http') === 0) {
            var direct = q.indexOf('http') === 0 ? q : ('https://' + q);
            add('Open "' + direct + '" in Vux Browser', 'Direct URL', function () { openInValBrowse(direct); });
          } else {
            add('Search "' + query.trim() + '" in Vux Browser', 'Web Search', function () { openInValBrowse(query.trim()); });
          }
          mergedModules.filter(function (m) { return m.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 5).forEach(function (m) {
            add(m.name, 'Game (' + String(m.provider || 'arcade').toUpperCase() + ')', function () { launchStudyModule(m); });
          });
          getActiveCinemaPool().filter(function (m) { return m.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 4).forEach(function (m) {
            add(m.title, 'Cinema', function () { openMovie(m); });
          });
          audioStations.filter(function (s) { return s.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 3).forEach(function (s, idx) {
            add('Play ' + s.title, 'Audio Station', function () { switchView('music'); selectStation(audioStations.indexOf(s) !== -1 ? audioStations.indexOf(s) : idx, true); });
          });
          CFG.themePresets.filter(function (t) { return t.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 4).forEach(function (t) {
            add('Apply Theme: ' + t.name, 'Studio Theme', function () { applyColorPreset(t.id); showToast('Theme: ' + t.name); });
          });
          CFG.fontLibrary.filter(function (f) { return f.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 4).forEach(function (f) {
            add('Apply Font: ' + f.name, 'Font (' + f.category + ')', function () {
              ensureGoogleFontLoaded(f.family);
              customSettings.fontFamily = f.family;
              applyCustomSettings(customSettings);
              showToast('Font: ' + f.name);
            });
          });
        } else {
          items = items.slice(0, 12);
        }

        if (q) {
          var staticMatched = items.filter(function (it) {
            return it.category.indexOf('URL') !== -1 || it.category.indexOf('Web') !== -1 ||
              it.category.indexOf('Game') !== -1 || it.category.indexOf('Cinema') !== -1 ||
              it.category.indexOf('Audio') !== -1 || it.category.indexOf('Theme') !== -1 ||
              it.category.indexOf('Font') !== -1 || it.title.toLowerCase().indexOf(q) !== -1 || it.category.toLowerCase().indexOf(q) !== -1;
          });
          return staticMatched.slice(0, 14);
        }
        return items;
      }

      function renderCmdResults() {
        if (!cmdResultsEl || !cmdInput) return;
        cmdCurrentList = buildCommandResults(cmdInput.value);
        if (cmdSelIdx >= cmdCurrentList.length) cmdSelIdx = 0;
        cmdResultsEl.innerHTML = '';
        cmdCurrentList.forEach(function (it, idx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'vux-cmd-item' + (idx === cmdSelIdx ? ' selected' : '');
          var t = document.createElement('span');
          t.style.cssText = 'font-size:13px;font-weight:600;';
          t.textContent = it.title;
          var c = document.createElement('span');
          c.className = 'eyebrow';
          c.style.fontSize = '10px';
          c.textContent = it.category;
          b.appendChild(t);
          b.appendChild(c);
          b.onclick = function () {
            closeCmdPalette();
            it.action();
          };
          cmdResultsEl.appendChild(b);
        });
      }

      function openCmdPalette() {
        if (!cmdBackdrop || !cmdInput) return;
        cmdBackdrop.classList.add('open');
        cmdInput.value = '';
        cmdSelIdx = 0;
        renderCmdResults();
        setTimeout(function () { cmdInput.focus(); }, 25);
      }

      function closeCmdPalette() {
        if (cmdBackdrop) cmdBackdrop.classList.remove('open');
      }

      var railCmdBtn = document.getElementById('btn-rail-cmdk');
      if (railCmdBtn) railCmdBtn.addEventListener('click', openCmdPalette);
      if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdPalette);
      if (cmdBackdrop) {
        cmdBackdrop.addEventListener('click', function (ev) {
          if (ev.target === cmdBackdrop) closeCmdPalette();
        });
      }
      if (cmdInput) {
        cmdInput.addEventListener('input', function () {
          cmdSelIdx = 0;
          renderCmdResults();
        });
        cmdInput.addEventListener('keydown', function (ev) {
          if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            cmdSelIdx = (cmdSelIdx + 1) % Math.max(1, cmdCurrentList.length);
            renderCmdResults();
          } else if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            cmdSelIdx = (cmdSelIdx - 1 + Math.max(1, cmdCurrentList.length)) % Math.max(1, cmdCurrentList.length);
            renderCmdResults();
          } else if (ev.key === 'Enter' && cmdCurrentList[cmdSelIdx]) {
            ev.preventDefault();
            var act = cmdCurrentList[cmdSelIdx].action;
            closeCmdPalette();
            act();
          }
        });
      }
      window.addEventListener('keydown', function (ev) {
        if (ev && (ev.ctrlKey || ev.metaKey) && String(ev.key || '').toLowerCase() === 'k') {
          ev.preventDefault();
          if (cmdBackdrop && cmdBackdrop.classList.contains('open')) closeCmdPalette();
          else openCmdPalette();
        }
      });

      /* ---------------- CUSTOM CURSOR TRAILS & CLICK RIPPLES ---------------- */
      var cursorCanvas = document.getElementById('vux-cursor-canvas');
      var cursorCtx = cursorCanvas ? cursorCanvas.getContext('2d') : null;
      var cursorPuffs = [];
      var cursorRipples = [];
      var cursorRaf = 0;

      function resizeCursorCanvas() {
        if (!cursorCanvas) return;
        if (cursorCanvas.width !== window.innerWidth || cursorCanvas.height !== window.innerHeight) {
          cursorCanvas.width = window.innerWidth;
          cursorCanvas.height = window.innerHeight;
        }
      }

      function tickCursorCanvas() {
        cursorRaf = 0;
        if (!cursorCtx || !cursorCanvas || document.hidden || customSettings.reducedMotion || (customSettings.cursorTrail || 'glow') === 'off') {
          if (cursorCtx && cursorCanvas) cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
          cursorPuffs = [];
          cursorRipples = [];
          return;
        }
        resizeCursorCanvas();
        var w = cursorCanvas.width;
        var h = cursorCanvas.height;
        cursorCtx.clearRect(0, 0, w, h);
        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
        for (var i = cursorPuffs.length - 1; i >= 0; i--) {
          var p = cursorPuffs[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.045;
          if (p.life <= 0) { cursorPuffs.splice(i, 1); continue; }
          cursorCtx.fillStyle = accent;
          cursorCtx.globalAlpha = p.life * 0.55;
          cursorCtx.beginPath();
          if (p.kind === 'stars') {
            cursorCtx.fillRect(p.x - p.r, p.y - 0.8, p.r * 2, 1.6);
            cursorCtx.fillRect(p.x - 0.8, p.y - p.r, 1.6, p.r * 2);
          } else {
            cursorCtx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            cursorCtx.fill();
          }
        }
        for (var j = cursorRipples.length - 1; j >= 0; j--) {
          var rp = cursorRipples[j];
          rp.r += 2.1;
          rp.life -= 0.04;
          if (rp.life <= 0) { cursorRipples.splice(j, 1); continue; }
          cursorCtx.strokeStyle = accent;
          cursorCtx.lineWidth = 1.6;
          cursorCtx.globalAlpha = rp.life * 0.65;
          cursorCtx.beginPath();
          cursorCtx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
          cursorCtx.stroke();
        }
        cursorCtx.globalAlpha = 1;
        if (cursorPuffs.length > 0 || cursorRipples.length > 0) {
          cursorRaf = requestAnimationFrame(tickCursorCanvas);
        }
      }

      window.addEventListener('pointermove', function (e) {
        if (customSettings.reducedMotion || (customSettings.cursorTrail || 'glow') === 'off') return;
        var kind = customSettings.cursorTrail || 'glow';
        cursorPuffs.push({
          x: e.clientX,
          y: e.clientY,
          vx: kind === 'sparks' ? (Math.random() - 0.5) * 1.8 : 0,
          vy: kind === 'sparks' ? (Math.random() - 0.5) * 1.8 : 0,
          r: kind === 'glow' ? 7 : 4.2,
          kind: kind,
          life: 1
        });
        if (cursorPuffs.length > 36) cursorPuffs.shift();
        if (!cursorRaf) cursorRaf = requestAnimationFrame(tickCursorCanvas);
      });
      window.addEventListener('pointerdown', function (e) {
        if (customSettings.reducedMotion || (customSettings.cursorTrail || 'glow') === 'off') return;
        cursorRipples.push({ x: e.clientX, y: e.clientY, r: 4, life: 1 });
        if (!cursorRaf) cursorRaf = requestAnimationFrame(tickCursorCanvas);
      });

      /* ---------------- QUICK SCRATCHPAD / NOTES DRAWER ---------------- */
      var notesDrawerEl = document.getElementById('vux-notes-drawer');
      var notesTextareaEl = document.getElementById('vux-notes-textarea');
      var notesStatsEl = document.getElementById('vux-notes-stats');
      var notesRailBtn = document.getElementById('btn-rail-notes');
      var notesCopyBtn = document.getElementById('vux-notes-copy');
      var notesClearBtn = document.getElementById('vux-notes-clear');
      var notesCloseBtn = document.getElementById('vux-notes-close');

      function updateNotesStats() {
        if (!notesTextareaEl || !notesStatsEl) return;
        var v = notesTextareaEl.value || '';
        var words = v.trim() ? v.trim().split(/\\s+/).length : 0;
        notesStatsEl.textContent = words + ' words · ' + v.length + ' chars';
      }
      function toggleNotesDrawer(forceOpen) {
        if (!notesDrawerEl) return;
        var open = typeof forceOpen === 'boolean' ? forceOpen : !notesDrawerEl.classList.contains('open');
        notesDrawerEl.classList.toggle('open', open);
        if (notesRailBtn) notesRailBtn.classList.toggle('active', open);
      }
      if (notesTextareaEl) {
        notesTextareaEl.value = safeLSGet('vux_scratchpad_notes') || '';
        updateNotesStats();
        notesTextareaEl.addEventListener('input', function () {
          safeLSSet('vux_scratchpad_notes', notesTextareaEl.value);
          updateNotesStats();
        });
      }
      if (notesRailBtn) notesRailBtn.addEventListener('click', function () { toggleNotesDrawer(); });
      if (notesCloseBtn) notesCloseBtn.addEventListener('click', function () { toggleNotesDrawer(false); });
      if (notesClearBtn && notesTextareaEl) {
        notesClearBtn.addEventListener('click', function () {
          notesTextareaEl.value = '';
          safeLSSet('vux_scratchpad_notes', '');
          updateNotesStats();
        });
      }
      if (notesCopyBtn && notesTextareaEl) {
        notesCopyBtn.addEventListener('click', function () {
          try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(notesTextareaEl.value || ''); } catch (_e) {}
          showToast('Scratchpad notes copied.');
        });
      }

      /* ---------------- DAILY STREAK & ACHIEVEMENT BADGES ---------------- */
      var badgesModal = document.getElementById('vux-badges-modal');
      var badgesGrid = document.getElementById('vux-badges-grid');
      var streakDaysEl = document.getElementById('badge-streak-days');
      var streakEyebrowEl = document.getElementById('vux-streak-eyebrow');
      var welcomeStreakPill = document.getElementById('vb-welcome-streak-pill');
      var userStats = {
        streakDays: 1,
        lastVisitDate: '',
        tabsOpened: 0,
        gamesLaunched: 0,
        themesTried: 0,
        messagesSent: 0,
        tracksPlayed: 0
      };
      try {
        var rawSt = safeLSGet('vux_user_stats');
        if (rawSt) userStats = Object.assign(userStats, JSON.parse(rawSt));
      } catch (_e) {}

      (function syncVisitStreak() {
        var today = new Date().toISOString().slice(0, 10);
        if (userStats.lastVisitDate !== today) {
          var nextStreak = 1;
          if (userStats.lastVisitDate) {
            var pMs = Date.parse(userStats.lastVisitDate + 'T00:00:00Z');
            var cMs = Date.parse(today + 'T00:00:00Z');
            if (Number.isFinite(pMs) && Number.isFinite(cMs) && Math.round((cMs - pMs) / 86400000) === 1) {
              nextStreak = Math.max(1, Number(userStats.streakDays || 1) + 1);
            }
          }
          userStats.streakDays = nextStreak;
          userStats.lastVisitDate = today;
          safeLSSet('vux_user_stats', JSON.stringify(userStats));
        }
      })();

      function isBadgeUnlocked(b) {
        if (b.id === 'first-launch') return true;
        if (b.id === 'tab-explorer') return userStats.tabsOpened >= 5;
        if (b.id === 'arcade-regular') return userStats.gamesLaunched >= 3;
        if (b.id === 'style-architect') return userStats.themesTried >= 3;
        if (b.id === 'chatterbox') return userStats.messagesSent >= 3;
        if (b.id === 'audiophile') return userStats.tracksPlayed >= 1;
        if (b.id === 'streak-3') return userStats.streakDays >= 3;
        if (b.id === 'power-user') return (userStats.tabsOpened + userStats.gamesLaunched) >= 10;
        return false;
      }

      function saveAndEvaluateBadges() {
        safeLSSet('vux_user_stats', JSON.stringify(userStats));
        var defs = Array.isArray(CFG.badgeDefs) ? CFG.badgeDefs : [];
        var unlockedCount = defs.filter(isBadgeUnlocked).length;
        if (streakDaysEl) streakDaysEl.textContent = userStats.streakDays + 'd';
        if (streakEyebrowEl) streakEyebrowEl.textContent = userStats.streakDays + '-Day Streak · ' + unlockedCount + '/' + defs.length + ' Unlocked';
        if (welcomeStreakPill) welcomeStreakPill.textContent = userStats.streakDays + '-Day Streak · ' + unlockedCount + '/' + defs.length + ' Badges Unlocked';
        if (badgesGrid) {
          badgesGrid.innerHTML = '';
          defs.forEach(function (b) {
            var ok = isBadgeUnlocked(b);
            var card = document.createElement('div');
            card.className = 'studio-card-btn' + (ok ? ' active' : '');
            card.style.cursor = 'default';
            var nm = document.createElement('div');
            nm.style.cssText = 'font-size:13px;font-weight:700;';
            nm.textContent = (ok ? '★ ' : '○ ') + b.name;
            var desc = document.createElement('div');
            desc.className = 'sub';
            desc.textContent = b.description;
            var st = document.createElement('div');
            st.className = 'eyebrow';
            st.style.fontSize = '9px';
            st.textContent = ok ? 'Unlocked' : 'Locked';
            card.appendChild(nm);
            card.appendChild(desc);
            card.appendChild(st);
            badgesGrid.appendChild(card);
          });
        }
      }

      function recordVuxStat(field, delta) {
        userStats[field] = Number(userStats[field] || 0) + (delta || 1);
        saveAndEvaluateBadges();
      }

      function openBadgesModal() {
        saveAndEvaluateBadges();
        if (badgesModal) badgesModal.classList.add('open');
      }
      var badgesRailBtn = document.getElementById('btn-rail-badges');
      var badgesCloseBtn = document.getElementById('vux-badges-close');
      if (badgesRailBtn) badgesRailBtn.addEventListener('click', openBadgesModal);
      if (badgesCloseBtn && badgesModal) badgesCloseBtn.addEventListener('click', function () { badgesModal.classList.remove('open'); });
      if (badgesModal) {
        badgesModal.addEventListener('click', function (ev) {
          if (ev.target === badgesModal) badgesModal.classList.remove('open');
        });
      }
      saveAndEvaluateBadges();

      /* ---------------- ANIMATED LOADING SCREEN & WELCOME OVERLAY ---------------- */
      var loaderEl = document.getElementById('vb-loader');
      var loaderCanvasEl = document.getElementById('vb-loader-canvas');
      var loaderBarFillEl = document.getElementById('vb-loader-bar-fill');
      var loaderFactEl = document.getElementById('vb-loader-fact');
      var loaderStatusEl = document.getElementById('vb-loader-status');
      var loaderNextFactBtn = document.getElementById('vb-loader-next-fact');
      var loaderSkipBtn = document.getElementById('vb-loader-skip');
      var welcomeEl = document.getElementById('vb-welcome');
      var welcomeDontShowEl = document.getElementById('vb-welcome-dont-show');
      var loaderDismissed = false;
      var loaderRafId = 0;

      function pickFunFact() {
        var facts = Array.isArray(CFG.funFacts) && CFG.funFacts.length ? CFG.funFacts : ['Vux isolates your browsing session with Scramjet v2 and Libcurl over Wisp.'];
        var picked = facts[Math.floor(Math.random() * facts.length)];
        if (loaderFactEl) loaderFactEl.textContent = picked;
      }

      function dismissWelcomeOverlay() {
        if (welcomeEl) welcomeEl.classList.remove('open');
        if (welcomeDontShowEl && welcomeDontShowEl.checked) {
          safeLSSet('valbrowse_hide_welcome', '1');
        }
      }

      function openWelcomeOverlay() {
        if (!welcomeEl) return;
        if (welcomeDontShowEl) {
          welcomeDontShowEl.checked = safeLSGet('valbrowse_hide_welcome') === '1';
        }
        welcomeEl.classList.add('open');
      }

      function finishLoadingScreen() {
        if (loaderDismissed) return;
        loaderDismissed = true;
        if (loaderBarFillEl) loaderBarFillEl.style.width = '100%';
        if (loaderEl) loaderEl.classList.add('done');
        if (loaderRafId) {
          cancelAnimationFrame(loaderRafId);
          loaderRafId = 0;
        }
        if (safeLSGet('valbrowse_hide_welcome') !== '1') {
          setTimeout(openWelcomeOverlay, 240);
        }
      }

      function runLoaderAnimation() {
        pickFunFact();
        var lCtx = loaderCanvasEl ? loaderCanvasEl.getContext('2d') : null;
        var startTs = performance.now();
        var durationMs = 1550;

        function tick(now) {
          if (loaderDismissed) return;
          var elapsed = now - startTs;
          var pct = Math.min(100, Math.max(12, Math.round((elapsed / durationMs) * 100)));
          if (loaderBarFillEl) loaderBarFillEl.style.width = pct + '%';
          if (loaderStatusEl) {
            if (pct < 40) loaderStatusEl.textContent = 'Warming Vux Scramjet + Libcurl Wisp engine...';
            else if (pct < 78) loaderStatusEl.textContent = 'Loading Vux.ai, GMShelf, Seraph & Customization Studio...';
            else loaderStatusEl.textContent = 'Ready — launching isolated Vux workspace...';
          }

          if (lCtx && loaderCanvasEl) {
            var w = loaderCanvasEl.width = window.innerWidth;
            var h = loaderCanvasEl.height = window.innerHeight;
            var t = now * 0.0012;
            var acc = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
            lCtx.clearRect(0, 0, w, h);
            for (var wave = 0; wave < 5; wave++) {
              lCtx.beginPath();
              lCtx.strokeStyle = acc;
              lCtx.globalAlpha = 0.14 + wave * 0.05;
              lCtx.lineWidth = 2;
              for (var x = 0; x <= w; x += 28) {
                var y = h * 0.5 + Math.sin(x * 0.005 + t * (1 + wave * 0.2) + wave) * (32 + wave * 12);
                if (x === 0) lCtx.moveTo(x, y);
                else lCtx.lineTo(x, y);
              }
              lCtx.stroke();
            }
            for (var dot = 0; dot < 24; dot++) {
              var dx = ((dot * 97 + t * 28) % w);
              var dy = h * (0.2 + 0.6 * Math.abs(Math.sin(dot + t * 0.5)));
              lCtx.fillStyle = acc;
              lCtx.globalAlpha = 0.26;
              lCtx.beginPath();
              lCtx.arc(dx, dy, 2.2, 0, Math.PI * 2);
              lCtx.fill();
            }
            lCtx.globalAlpha = 1;
          }

          if (elapsed >= durationMs) {
            finishLoadingScreen();
            return;
          }
          loaderRafId = requestAnimationFrame(tick);
        }
        loaderRafId = requestAnimationFrame(tick);
      }

      if (loaderNextFactBtn) loaderNextFactBtn.addEventListener('click', pickFunFact);
      if (loaderSkipBtn) loaderSkipBtn.addEventListener('click', finishLoadingScreen);
      var welcomeStartBtn = document.getElementById('vb-welcome-start');
      var welcomeCloseX = document.getElementById('vb-welcome-close-x');
      if (welcomeStartBtn) welcomeStartBtn.addEventListener('click', dismissWelcomeOverlay);
      if (welcomeCloseX) welcomeCloseX.addEventListener('click', dismissWelcomeOverlay);
      if (welcomeDontShowEl) {
        welcomeDontShowEl.addEventListener('change', function () {
          safeLSSet('valbrowse_hide_welcome', welcomeDontShowEl.checked ? '1' : '0');
        });
      }
      document.querySelectorAll('[data-welcome-go]').forEach(function (tile) {
        tile.addEventListener('click', function () {
          var dest = tile.getAttribute('data-welcome-go');
          dismissWelcomeOverlay();
          if (dest === 'ai') switchView('ai');
          else if (dest === 'studio') openStudioModal('appearance');
          else if (dest === 'chat') switchView('chat');
          else if (dest === 'gmshelf') switchView('gmshelf');
          else if (dest === 'seraph') switchView('seraph');
          else switchView('browser');
        });
      });
      var replayWelcomeBtn = document.getElementById('btn-replay-welcome');
      if (replayWelcomeBtn) {
        replayWelcomeBtn.addEventListener('click', function () {
          settingsModal.classList.remove('open');
          openWelcomeOverlay();
        });
      }

      /* ---------------- BOOT ---------------- */
      var savedCloak = safeLSGet('valem_cloak_title');
      if (savedCloak) document.title = savedCloak;
      applyRailMode(railMode);
      applyColorPreset(activePresetId);
      applyCustomSettings(customSettings);
      rebuildMergedModules();
      fetchGnZones();
      fetchSeraphCatalog();
      fetchGmshelfCatalog();
      runLoaderAnimation();
    })();
  </script>
</body>
</html>`;
}

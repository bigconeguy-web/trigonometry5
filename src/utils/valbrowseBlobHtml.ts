import type { GameCatalogItem } from '../data/gamesCatalog.js';
import {
  AD_BLOCK_PRELUDE_HTML,
  AD_SCRIPT_SRC_BLOCKLIST,
  INLINE_AD_SCRIPT_PATTERNS,
} from './adBlockerProxy.js';
import { THEMES_CATALOG } from './themeCatalog.js';
import {
  CLASSROOM_FAVICON_URL,
  DEFAULT_WISP_URL,
  PANIC_REDIRECT_URL,
  STANDALONE_WINDOW_FEATURES,
  STANDALONE_WINDOW_NAME,
  buildScramjetThemeParams,
} from './valbrowseConfig.js';
import {
  CURATED_MOVIES,
  GN_COVER_URL,
  GN_HTML_URL,
  GN_SCRIPT_PORTAL_URLS,
} from './gnMathService.js';
import { CURATED_SOUNDCLOUD_STATIONS } from './soundcloudEmbed.js';
import { getFallbackUgsCatalog, UGS_CDN_BASE } from './ugsCatalog.js';
import { getFallbackCkvCatalog, CKV_CDN_BASE } from './ckvCatalog.js';

function serializeSafe(value: unknown): string {
  return JSON.stringify(value).replace(/<\//g, '<\\/');
}

export function buildValBrowseBlobHtml(
  appOrigin: string,
  staticGames: GameCatalogItem[]
): string {
  const cleanOrigin = String(appOrigin || '').replace(/\/+$/, '');
  const scramjetSrc = `${cleanOrigin}/scramjet-browser.html?${buildScramjetThemeParams()}`;

  const dataPayload = serializeSafe({
    origin: cleanOrigin,
    scramjetSrc,
    defaultWisp: DEFAULT_WISP_URL,
    panicUrl: PANIC_REDIRECT_URL,
    classroomFavicon: CLASSROOM_FAVICON_URL,
    standaloneWindowName: STANDALONE_WINDOW_NAME,
    standaloneWindowFeatures: STANDALONE_WINDOW_FEATURES,
    themePresets: THEMES_CATALOG,
    gnCoverUrl: GN_COVER_URL,
    gnHtmlUrl: GN_HTML_URL,
    gnScriptUrls: GN_SCRIPT_PORTAL_URLS,
    staticGames: staticGames.map((g) => ({
      id: 'builtin:' + g.slug,
      provider: 'builtin',
      name: g.title,
      category: g.category,
      url: g.url.startsWith('/') ? `${cleanOrigin}${g.url}` : g.url,
      featured: true,
    })),
    fallbackUgs: getFallbackUgsCatalog(UGS_CDN_BASE).map((g) => ({ ...g, provider: 'ugs' })),
    fallbackCkv: getFallbackCkvCatalog(CKV_CDN_BASE).map((g) => ({ ...g, provider: 'ckv' })),
    curatedMovies: CURATED_MOVIES,
    scStations: CURATED_SOUNDCLOUD_STATIONS,
    adPrelude: AD_BLOCK_PRELUDE_HTML,
    srcBlocklist: AD_SCRIPT_SRC_BLOCKLIST.map((r) => ({ source: r.source, flags: r.flags })),
    inlineBlocklist: INLINE_AD_SCRIPT_PATTERNS.map((r) => ({ source: r.source, flags: r.flags })),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ValBrowse — Isolated Workspace</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
      --font-ui: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-ui);
      -webkit-font-smoothing: antialiased;
    }

    .app-shell {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      background: var(--bg);
    }

    /* Collapsible Left Glassmorphic Rail */
    .rail {
      width: 56px;
      height: 100%;
      background: var(--rail);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 8px;
      flex-shrink: 0;
      z-index: 40;
      transition: width 0.24s var(--ease);
      overflow: hidden;
    }

    .rail.expanded {
      width: 232px;
      padding: 10px 10px;
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
      opacity: 0;
      height: 0;
      overflow: hidden;
      transition: opacity 0.18s var(--ease), height 0.18s var(--ease);
    }

    .rail.expanded .rail-group-label {
      opacity: 0.78;
      height: auto;
    }

    .rail-divider {
      height: 1px;
      background: var(--border);
      margin: 6px 4px;
    }

    .rail-btn {
      width: 100%;
      height: 38px;
      padding: 0 10px;
      border-radius: 10px;
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
      opacity: 0;
      transition: opacity 0.16s var(--ease);
    }

    .rail.expanded .rail-label {
      opacity: 1;
    }

    .rail-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      padding: 2px 6px;
      border-radius: 6px;
      background: var(--surface-2);
      color: var(--muted);
      display: none;
    }

    .rail.expanded .rail-badge {
      display: inline-block;
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
    }

    .view-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 20px 24px 36px;
      background-color: var(--bg);
      background-image:
        radial-gradient(ellipse 60% 45% at 50% 0%, var(--accent-soft), transparent 70%),
        radial-gradient(var(--border) 1px, transparent 1px);
      background-size: 100% 100%, 24px 24px;
    }

    .container {
      max-width: 1420px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: vbFade 0.2s var(--ease);
    }

    @keyframes vbFade {
      from { opacity: 0; transform: translateY(5px); }
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
    .games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
      gap: 12px;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 14px;
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
      background: #0a0507;
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
      background: linear-gradient(135deg, #1b0f13 0%, #0d0609 100%);
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
      background: rgba(8, 4, 6, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      color: #ff99ae;
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

    /* Fullscreen Overlays (Game Player, Movie Theater, Book Reader, Settings) */
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
      border: 3px solid rgba(255, 92, 124, 0.2);
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
      max-width: 660px;
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

    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
      gap: 8px;
      max-height: 270px;
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
      border: 1px solid rgba(255, 255, 255, 0.35);
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
  </style>
</head>
<body>
  <div class="app-shell">
    <!-- Left Collapsible Glassmorphic Sidebar Rail -->
    <aside class="rail" id="rail" aria-label="ValBrowse Navigation">
      <div class="rail-top">
        <button type="button" class="rail-btn active" data-view="browser" aria-label="ValBrowse Proxy Browser" title="ValBrowse Proxy Browser">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="rail-label">ValBrowse</span>
        </button>

        <div class="rail-group-label">Combined</div>

        <button type="button" class="rail-btn" data-view="games" aria-label="All Games Hub" title="All Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>
          <span class="rail-label">Games</span>
          <span class="rail-badge" id="badge-games">0</span>
        </button>

        <div class="rail-divider"></div>
        <div class="rail-group-label">gn-math Provider</div>

        <button type="button" class="rail-btn" data-view="gnmath" aria-label="gn-math Script and Zones" title="gn-math Script">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span class="rail-label">gn-math Script</span>
          <span class="rail-badge" id="badge-gn">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="movies" aria-label="gn-math Movies" title="Movies">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span class="rail-label">Movies</span>
        </button>

        <button type="button" class="rail-btn" data-view="books" aria-label="gn-math Books and Manga" title="Books & Manga">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span class="rail-label">Books &amp; Manga</span>
        </button>

        <button type="button" class="rail-btn" data-view="music" aria-label="gn-math Music Studio" title="Music">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span class="rail-label">Music</span>
        </button>
      </div>

      <div class="rail-bottom">
        <div class="rail-divider"></div>
        <button type="button" class="rail-btn" id="btn-rail-standalone-blob" aria-label="Open Standalone :blob Window" title="Open Standalone :blob Window">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span class="rail-label">Standalone :blob</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-toggle" aria-label="Expand or Collapse Sidebar" title="Expand / Collapse Sidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span class="rail-label">Collapse Sidebar</span>
        </button>

        <button type="button" class="rail-btn" id="btn-open-settings" aria-label="Color Presets and Cloak Settings" title="Settings & 24 Color Presets">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span class="rail-label">Settings (24 Themes)</span>
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
        <span style="font-weight:800;color:#ff6b8b;font-size:14px;">valbrowse</span>
        <button type="button" class="btn" id="btn-mobile-panic" style="border-color:rgba(244,63,94,0.4);color:#fda4af;">Panic (Esc)</button>
      </div>

      <!-- 1. ValBrowse Scramjet v2 Frontpage -->
      <section class="view-panel active" id="view-browser" aria-label="ValBrowse Proxy Browser">
        <iframe
          id="valbrowse-proxy-frame"
          title="ValBrowse Scramjet v2 Browser"
          src="${scramjetSrc.replace(/"/g, '&quot;')}"
          allow="autoplay; gamepad; fullscreen"
          referrerpolicy="no-referrer"
          style="width:100%;height:100%;border:0;display:block;background:#0b0608;"
        ></iframe>
      </section>

      <!-- 2. Combined All Games Hub -->
      <section class="view-panel" id="view-games" aria-label="Games Hub">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Combined Library · Built-In + gn-math + UGS + CKV</div>
                <h1 class="h1">All Games (<span id="games-total-count">0</span>)</h1>
              </div>
              <button type="button" class="btn" id="btn-refresh-games">Refresh Live Catalogs</button>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="games-filter-pills">
                <button type="button" class="pill-btn active" data-gfilter="all">All</button>
                <button type="button" class="pill-btn" data-gfilter="gn">gn-math</button>
                <button type="button" class="pill-btn" data-gfilter="ugs">UGS</button>
                <button type="button" class="pill-btn" data-gfilter="ckv">CKV</button>
                <button type="button" class="pill-btn" data-gfilter="builtin">Built-In</button>
                <button type="button" class="pill-btn" data-gfilter="favorites">Favorites</button>
              </div>

              <div class="pill-row">
                <input type="text" class="input" id="games-search" placeholder="Search all games..." style="width:220px;" />
                <select class="select" id="games-sort" aria-label="Sort games">
                  <option value="featured">Featured First</option>
                  <option value="popular">Most Popular</option>
                  <option value="az">Name (A-Z)</option>
                  <option value="za">Name (Z-A)</option>
                </select>
              </div>
            </div>

            <div class="games-grid" id="games-grid"></div>
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
                <button type="button" class="btn" id="gn-open-proxy">Open in ValBrowse</button>
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
              <div class="games-grid" id="gn-grid"></div>
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

      <!-- 4. gn-math Movies Cinema -->
      <section class="view-panel" id="view-movies" aria-label="gn-math Movies">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">gn-math Cinema · Internet Archive Theater</div>
                <h1 class="h1">Movies &amp; Stream</h1>
              </div>
              <span class="sub" id="movies-status">Public-domain cinema ready</span>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="movie-genres">
                <button type="button" class="pill-btn active" data-genre="featured">Featured</button>
                <button type="button" class="pill-btn" data-genre="sci-fi">Sci-Fi</button>
                <button type="button" class="pill-btn" data-genre="animation">Animation</button>
                <button type="button" class="pill-btn" data-genre="noir">Film Noir</button>
                <button type="button" class="pill-btn" data-genre="comedy">Comedy</button>
              </div>

              <form id="movies-search-form" class="pill-row">
                <input type="text" class="input" id="movies-query" placeholder="Search Archive.org films..." style="width:230px;" />
                <button type="submit" class="btn btn-primary">Find</button>
              </form>
            </div>

            <div class="media-grid" id="movies-grid"></div>
          </div>
        </div>
      </section>

      <!-- 5. gn-math Books & Manga -->
      <section class="view-panel" id="view-books" aria-label="gn-math Books and Manga">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">gn-math Library · Gutendex Reader</div>
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

      <!-- 6. gn-math Music Studio -->
      <section class="view-panel" id="view-music" aria-label="gn-math Music">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">gn-math Audio · SoundCloud &amp; Offline Synth</div>
                <h1 class="h1">Music Studio</h1>
              </div>
            </div>

            <div class="music-grid">
              <div class="panel-box">
                <strong style="font-size:14px;">SoundCloud Player</strong>
                <form id="sc-form" class="pill-row" style="width:100%;">
                  <input type="text" class="input" id="sc-input" value="https://soundcloud.com/lofi_girl" placeholder="Paste soundcloud.com URL..." style="flex:1;" />
                  <button type="submit" class="btn btn-primary">Load</button>
                </form>
                <div class="pill-row" id="sc-stations"></div>
                <iframe
                  id="sc-frame"
                  title="SoundCloud Player"
                  width="100%"
                  height="280"
                  allow="autoplay"
                  style="border:1px solid var(--border);border-radius:10px;background:#000;"
                ></iframe>
              </div>

              <div class="panel-box">
                <strong style="font-size:14px;">Offline Lo-Fi Beat &amp; Chord Synth</strong>
                <p class="sub">100% Web Audio generator — works offline inside :blob with zero external requests.</p>
                <div class="pill-row">
                  <button type="button" class="btn btn-primary" id="synth-toggle">Start Lo-Fi Synth</button>
                </div>
                <label class="sub" style="display:flex;justify-content:space-between;">
                  <span>Tempo</span><span id="synth-bpm-val">76 BPM</span>
                </label>
                <input type="range" id="synth-bpm" min="60" max="110" value="76" style="accent-color:#ff5c7c;" />

                <label class="sub" style="display:flex;justify-content:space-between;">
                  <span>Warmth Filter</span><span id="synth-cut-val">1100 Hz</span>
                </label>
                <input type="range" id="synth-cut" min="350" max="2800" value="1100" style="accent-color:#ff5c7c;" />

                <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;flex-direction:column;gap:8px;">
                  <span style="font-size:12px;font-weight:600;">Local Audio File</span>
                  <input type="file" id="local-audio-input" accept="audio/*" style="font-size:12px;color:var(--muted);" />
                  <audio id="local-audio-player" controls style="display:none;width:100%;"></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Game Player Overlay -->
  <div class="overlay" id="game-overlay">
    <div class="overlay-bar">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="eyebrow" id="game-ov-provider">GAME</span>
        <strong id="game-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Loading...</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="game-ov-proxy">Open in ValBrowse</button>
        <button type="button" class="btn" id="game-ov-reload">Reload</button>
        <button type="button" class="btn" id="game-ov-fs">Fullscreen</button>
        <button type="button" class="btn btn-primary" id="game-ov-close">Close</button>
      </div>
    </div>
    <div class="overlay-stage" id="game-ov-stage">
      <iframe id="game-ov-frame" allow="autoplay; fullscreen; gamepad" sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"></iframe>
      <div class="overlay-status open" id="game-ov-status">
        <div class="spinner" id="game-ov-spinner"></div>
        <div id="game-ov-msg" style="font-size:13px;">Loading ad-blocked game package...</div>
      </div>
    </div>
  </div>

  <!-- Movie Theater Overlay -->
  <div class="overlay" id="movie-overlay">
    <div class="overlay-bar">
      <strong id="movie-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Cinema</strong>
      <div class="pill-row">
        <button type="button" class="btn" id="movie-ov-proxy">Open in ValBrowse</button>
        <button type="button" class="btn btn-primary" id="movie-ov-close">Close</button>
      </div>
    </div>
    <div class="overlay-stage" id="movie-ov-stage" style="padding:16px;"></div>
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
    <div style="flex:1;overflow-y:auto;padding:28px 20px;background:#0b0608;">
      <pre id="book-ov-body" style="max-width:740px;margin:0 auto;white-space:pre-wrap;font-family:var(--font-ui);font-size:17px;line-height:1.82;color:#f5dce1;"></pre>
    </div>
  </div>

  <!-- Settings & 24 Color Presets Modal -->
  <div class="modal-backdrop" id="settings-modal">
    <div class="modal-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <strong style="font-size:16px;">ValBrowse Settings &amp; 24 Color Presets</strong>
          <div class="sub">Pick a color preset, launch standalone :blob window, or configure tab cloak</div>
        </div>
        <button type="button" class="btn" id="btn-close-settings">Close</button>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Color Presets (24)</span>
          <button type="button" class="btn" id="btn-preset-reset-coral" style="height:26px;font-size:11px;">Reset Default Coral</button>
        </div>
        <div class="pill-row" id="preset-cat-pills">
          <button type="button" class="pill-btn active" data-pcat="All">All (24)</button>
          <button type="button" class="pill-btn" data-pcat="Dark & Neon">Dark &amp; Neon</button>
          <button type="button" class="pill-btn" data-pcat="Cozy & Pastel">Cozy &amp; Pastel</button>
          <button type="button" class="pill-btn" data-pcat="High-Contrast & Light">High-Contrast &amp; Light</button>
        </div>
        <div class="preset-grid" id="color-presets-grid"></div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        <span class="eyebrow">Window Tab Cloak &amp; Standalone Window</span>
        <div class="pill-row">
          <button type="button" class="btn" data-cloak="Home - Classroom">Google Classroom</button>
          <button type="button" class="btn" data-cloak="Dashboard | Canvas">Canvas LMS</button>
          <button type="button" class="btn" data-cloak="Study Notes - Google Docs">Google Docs</button>
          <button type="button" class="btn btn-primary" id="btn-modal-standalone-blob">Open Standalone :blob Window</button>
        </div>
      </div>

      <div style="padding:10px 12px;border-radius:10px;background:var(--surface-2);border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--muted);">
        Default Wisp Endpoint:<br />
        <span style="color:var(--accent);">${DEFAULT_WISP_URL}</span>
      </div>

      <div class="sub">Press <code style="color:var(--text);">Esc</code> anywhere to immediately close or redirect to Google Classroom.</div>
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
          '<body><iframe src="' + frameUrl.replace(/"/g, '&quot;') + '" title="Home - Classroom" ' +
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
      var mobileMenuBtn = document.getElementById('btn-mobile-menu');
      var currentView = 'browser';

      function switchView(viewId) {
        currentView = viewId;
        document.querySelectorAll('.view-panel').forEach(function (panel) {
          panel.classList.toggle('active', panel.id === 'view-' + viewId);
        });
        document.querySelectorAll('.rail-btn[data-view]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
        });
        railEl.classList.remove('mobile-open');
        if (viewId === 'books' && !booksLoadedOnce) {
          booksLoadedOnce = true;
          searchBooks('classic');
        }
        if (viewId === 'music' && !scLoadedOnce) {
          scLoadedOnce = true;
          setScUrl('https://soundcloud.com/lofi_girl');
        }
      }

      document.querySelectorAll('.rail-btn[data-view]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          switchView(btn.getAttribute('data-view'));
        });
      });

      railToggleBtn.addEventListener('click', function () {
        railEl.classList.toggle('expanded');
      });

      mobileMenuBtn.addEventListener('click', function () {
        railEl.classList.toggle('mobile-open');
      });

      window.addEventListener('message', function (ev) {
        if (!ev || !ev.data) return;
        if (ev.data.type === 'valbrowse-panic') {
          triggerPanic();
        } else if (ev.data.type === 'gn-switch-tab' && typeof ev.data.tab === 'string') {
          var allowed = { browser: 1, games: 1, gnmath: 1, movies: 1, books: 1, music: 1 };
          if (allowed[ev.data.tab]) {
            switchView(ev.data.tab);
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

      /* ---------------- UNIFIED GAMES + GN-MATH CATALOGS ---------------- */
      var favorites = [];
      try {
        var rawFavs = safeLSGet('gn_favs');
        if (rawFavs) favorites = JSON.parse(rawFavs) || [];
      } catch (_e) {}

      function toggleFavorite(gameId) {
        var idx = favorites.indexOf(gameId);
        if (idx === -1) favorites.unshift(gameId);
        else favorites.splice(idx, 1);
        safeLSSet('gn_favs', JSON.stringify(favorites));
        renderGamesGrid();
        renderGnGrid();
      }

      var gnZones = [];
      var ugsGames = CFG.fallbackUgs.slice();
      var ckvGames = CFG.fallbackCkv.slice();
      var mergedGames = [];
      var activeGameFilter = 'all';
      var activePopularityPeriod = 'featured';
      var popularityMap = {};
      var gnZonesLoadedOnce = false;

      function normalizeKey(s) {
        return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      }

      function rebuildMergedGames() {
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
        addList(ugsGames);
        addList(ckvGames);
        addList(CFG.staticGames);
        mergedGames = out;
        document.getElementById('games-total-count').textContent = String(mergedGames.length);
        document.getElementById('badge-games').textContent = String(mergedGames.length);
        document.getElementById('badge-gn').textContent = String(gnZones.length);
        renderGamesGrid();
        renderGnGrid();
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
            rebuildMergedGames();
            return;
          } catch (_e) {}
        }
      }

      function createGameCard(g, hits) {
        var isFav = favorites.indexOf(g.id) !== -1 || favorites.indexOf(g.name) !== -1;
        var card = document.createElement('div');
        card.className = 'card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.onclick = function () { playGame(g); };
        card.onkeydown = function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playGame(g); }
        };

        var thumb = document.createElement('div');
        thumb.className = 'thumb-wrap';

        var fb = document.createElement('div');
        fb.className = 'thumb-fallback';
        fb.textContent = g.name;
        thumb.appendChild(fb);

        if (g.cover) {
          var img = document.createElement('img');
          img.src = g.cover;
          img.alt = g.name;
          img.loading = 'lazy';
          img.referrerPolicy = 'no-referrer';
          img.style.position = 'relative';
          img.style.zIndex = '2';
          img.onerror = function () { img.style.display = 'none'; };
          thumb.appendChild(img);
        }

        var prov = String(g.provider || 'game');
        var chip = document.createElement('span');
        chip.className = 'provider-chip';
        chip.textContent = prov === 'gn' ? 'gn-math' : prov.toUpperCase();
        thumb.appendChild(chip);

        var favBtn = document.createElement('button');
        favBtn.type = 'button';
        favBtn.className = 'fav-btn' + (isFav ? ' is-fav' : '');
        favBtn.setAttribute('aria-label', 'Favorite ' + g.name);
        favBtn.innerHTML = isFav ? '&#9733;' : '&#9734;';
        favBtn.onclick = function (e) {
          e.stopPropagation();
          toggleFavorite(g.id);
        };
        thumb.appendChild(favBtn);

        var body = document.createElement('div');
        body.className = 'card-body';
        var title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = g.name;
        var meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.textContent = (g.category || (g.numericId ? '#' + g.numericId : prov.toUpperCase())) + (hits ? ' · ' + hits.toLocaleString() + ' plays' : '');
        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(thumb);
        card.appendChild(body);
        return card;
      }

      function renderGamesGrid() {
        var grid = document.getElementById('games-grid');
        if (!grid) return;
        var q = (document.getElementById('games-search').value || '').trim().toLowerCase();
        var sort = document.getElementById('games-sort').value;
        var list = mergedGames.filter(function (g) {
          if (activeGameFilter === 'favorites') {
            if (favorites.indexOf(g.id) === -1 && favorites.indexOf(g.name) === -1) return false;
          } else if (activeGameFilter !== 'all' && g.provider !== activeGameFilter) {
            return false;
          }
          if (q && g.name.toLowerCase().indexOf(q) === -1 && String(g.category || '').toLowerCase().indexOf(q) === -1) return false;
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
        list.slice(0, 150).forEach(function (g) {
          var hits = typeof g.numericId === 'number' ? popularityMap[g.numericId] : 0;
          grid.appendChild(createGameCard(g, hits));
        });
      }

      function renderGnGrid() {
        var grid = document.getElementById('gn-grid');
        if (!grid) return;
        var q = (document.getElementById('gn-search').value || '').trim().toLowerCase();
        var list = gnZones.filter(function (g) {
          return !q || g.name.toLowerCase().indexOf(q) !== -1;
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
        list.slice(0, 120).forEach(function (g) {
          var hits = typeof g.numericId === 'number' ? popularityMap[g.numericId] : 0;
          grid.appendChild(createGameCard(g, hits));
        });
      }

      document.querySelectorAll('#games-filter-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeGameFilter = btn.getAttribute('data-gfilter');
          document.querySelectorAll('#games-filter-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderGamesGrid();
        });
      });

      document.getElementById('games-search').addEventListener('input', renderGamesGrid);
      document.getElementById('games-sort').addEventListener('change', renderGamesGrid);
      document.getElementById('btn-refresh-games').addEventListener('click', fetchGnZones);
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

      /* ---------------- GAME OVERLAY PLAYER (AD-BLOCKED + ESC PANIC) ---------------- */
      var SRC_RES = CFG.srcBlocklist.map(function (p) { return new RegExp(p.source, p.flags); });
      var INLINE_RES = CFG.inlineBlocklist.map(function (p) { return new RegExp(p.source, p.flags); });
      var ESCAPE_INJECT = '<script data-vb-panic="1">(function(){if(window.__vbEsc)return;window.__vbEsc=true;window.addEventListener("keydown",function(e){if(e&&e.key==="Escape"){try{window.parent.postMessage({type:"valbrowse-panic"},"*");}catch(_e){}try{if(window.top)window.top.location.replace(' + JSON.stringify(CFG.panicUrl) + ');}catch(_e){}}},true);})();<\\/script>';

      var activeGameObj = null;
      var gameOverlay = document.getElementById('game-overlay');
      var gameFrame = document.getElementById('game-ov-frame');
      var gameStatus = document.getElementById('game-ov-status');
      var gameMsg = document.getElementById('game-ov-msg');
      var gameSpinner = document.getElementById('game-ov-spinner');

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

      async function playGame(game) {
        activeGameObj = game;
        gameOverlay.classList.add('open');
        document.getElementById('game-ov-provider').textContent = String(game.provider || 'game').toUpperCase();
        document.getElementById('game-ov-title').textContent = game.name;
        gameStatus.classList.add('open');
        gameSpinner.style.display = 'block';
        gameMsg.textContent = 'Loading ' + game.name + ' (ads blocked)...';
        gameFrame.removeAttribute('src');
        gameFrame.removeAttribute('srcdoc');

        var mirrors = buildMirrorUrls(game.url);
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i]);
            if (!res.ok) continue;
            var txt = await res.text();
            if (!txt || txt.length < 40) continue;
            if (activeGameObj !== game) return;
            gameFrame.onload = function () { gameStatus.classList.remove('open'); };
            gameFrame.srcdoc = sanitizeAndInjectHtml(txt, game.baseUrl || game.url);
            return;
          } catch (_e) {}
        }
        gameSpinner.style.display = 'none';
        gameMsg.textContent = 'Unable to fetch game package directly — click Open in ValBrowse to load via Scramjet proxy.';
      }

      document.getElementById('game-ov-close').addEventListener('click', function () {
        activeGameObj = null;
        gameFrame.removeAttribute('srcdoc');
        gameFrame.removeAttribute('src');
        gameOverlay.classList.remove('open');
      });
      document.getElementById('game-ov-reload').addEventListener('click', function () {
        if (activeGameObj) playGame(activeGameObj);
      });
      document.getElementById('game-ov-proxy').addEventListener('click', function () {
        if (activeGameObj) {
          var u = activeGameObj.url;
          document.getElementById('game-ov-close').click();
          openInValBrowse(u);
        }
      });
      document.getElementById('game-ov-fs').addEventListener('click', function () {
        var st = document.getElementById('game-ov-stage');
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
        st.textContent = 'Unable to reach jsDelivr right now — click Open in ValBrowse to proxy gn-math.';
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

      /* ---------------- MOVIES (ARCHIVE.ORG) ---------------- */
      var movieGenre = 'featured';
      var activeMovieObj = null;

      function renderMovies(list) {
        var grid = document.getElementById('movies-grid');
        grid.innerHTML = '';
        list.forEach(function (m) {
          var card = document.createElement('div');
          card.className = 'card';
          card.onclick = function () { openMovie(m); };

          var thumb = document.createElement('div');
          thumb.className = 'thumb-wrap';
          var fb = document.createElement('div');
          fb.className = 'thumb-fallback';
          fb.textContent = (m.genre || 'cinema').toUpperCase();
          thumb.appendChild(fb);

          var img = document.createElement('img');
          img.src = m.thumb;
          img.alt = m.title;
          img.loading = 'lazy';
          img.referrerPolicy = 'no-referrer';
          img.style.position = 'relative';
          img.style.zIndex = '2';
          img.onerror = function () { img.style.display = 'none'; };
          thumb.appendChild(img);

          var body = document.createElement('div');
          body.className = 'card-body';
          var t = document.createElement('div');
          t.className = 'card-title';
          t.textContent = m.title;
          var d = document.createElement('div');
          d.className = 'card-meta';
          d.textContent = String(m.desc || '').replace(/<[^>]+>/g, '');
          body.appendChild(t);
          body.appendChild(d);

          card.appendChild(thumb);
          card.appendChild(body);
          grid.appendChild(card);
        });
      }

      async function openMovie(m) {
        activeMovieObj = m;
        document.getElementById('movie-ov-title').textContent = m.title;
        var st = document.getElementById('movie-ov-stage');
        st.innerHTML = '<div class="sub">Resolving MP4 stream for ' + m.title + '...</div>';
        document.getElementById('movie-overlay').classList.add('open');
        try {
          var res = await fetch('https://archive.org/metadata/' + encodeURIComponent(m.id));
          if (res.ok) {
            var meta = await res.json();
            var files = Array.isArray(meta && meta.files) ? meta.files : [];
            var mp4 = files.find(function (f) { return f && f.name && /\\.mp4$/i.test(f.name) && !/_archive\\.mp4$/i.test(f.name); }) ||
                      files.find(function (f) { return f && f.name && /\\.mp4$/i.test(f.name); });
            if (mp4 && activeMovieObj === m) {
              var video = document.createElement('video');
              video.src = 'https://archive.org/download/' + encodeURIComponent(m.id) + '/' + String(mp4.name).split('/').map(encodeURIComponent).join('/');
              video.controls = true;
              video.autoplay = true;
              video.playsInline = true;
              video.style.maxWidth = '1100px';
              video.style.maxHeight = 'calc(100vh - 96px)';
              st.innerHTML = '';
              st.appendChild(video);
              return;
            }
          }
        } catch (_e) {}
        if (activeMovieObj === m) {
          var ifr = document.createElement('iframe');
          ifr.src = 'https://archive.org/embed/' + encodeURIComponent(m.id);
          ifr.allow = 'autoplay; fullscreen';
          st.innerHTML = '';
          st.appendChild(ifr);
        }
      }

      document.getElementById('movie-ov-close').addEventListener('click', function () {
        activeMovieObj = null;
        document.getElementById('movie-ov-stage').innerHTML = '';
        document.getElementById('movie-overlay').classList.remove('open');
      });
      document.getElementById('movie-ov-proxy').addEventListener('click', function () {
        if (activeMovieObj) {
          var u = 'https://archive.org/details/' + encodeURIComponent(activeMovieObj.id);
          document.getElementById('movie-ov-close').click();
          openInValBrowse(u);
        }
      });

      document.querySelectorAll('#movie-genres .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          movieGenre = btn.getAttribute('data-genre');
          document.querySelectorAll('#movie-genres .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          var list = movieGenre === 'featured' ? CFG.curatedMovies : CFG.curatedMovies.filter(function (m) { return m.genre === movieGenre; });
          renderMovies(list);
          document.getElementById('movies-status').textContent = 'Showing ' + list.length + ' films (' + movieGenre + ')';
        });
      });

      document.getElementById('movies-search-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        var q = (document.getElementById('movies-query').value || '').trim();
        if (!q) { renderMovies(CFG.curatedMovies); return; }
        document.getElementById('movies-status').textContent = 'Searching Archive.org for "' + q + '"...';
        try {
          var url = 'https://archive.org/advancedsearch.php?q=' + encodeURIComponent(q + ' AND mediatype:movies AND (collection:feature_films OR collection:classic_cartoons OR collection:SciFi_Horror)') + '&fl[]=identifier,title,description&rows=24&page=1&output=json';
          var res = await fetch(url);
          var data = await res.json();
          var docs = (data && data.response && data.response.docs) || [];
          var mapped = docs.map(function (d) {
            return {
              id: d.identifier,
              title: d.title || d.identifier,
              genre: 'cinema',
              desc: Array.isArray(d.description) ? (d.description[0] || '') : (d.description || 'Public domain film'),
              thumb: 'https://archive.org/services/img/' + encodeURIComponent(d.identifier)
            };
          });
          renderMovies(mapped);
          document.getElementById('movies-status').textContent = 'Found ' + mapped.length + ' films matching "' + q + '"';
        } catch (_e) {
          document.getElementById('movies-status').textContent = 'Archive search unavailable — showing curated cinema.';
          renderMovies(CFG.curatedMovies);
        }
      });

      renderMovies(CFG.curatedMovies);

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

      /* ---------------- MUSIC STUDIO (SOUNDCLOUD + SYNTH) ---------------- */
      var scLoadedOnce = false;
      function setScUrl(url) {
        document.getElementById('sc-input').value = url;
        document.getElementById('sc-frame').src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&color=%23ff5c7c&auto_play=false&hide_related=false&show_comments=false&show_user=true';
      }
      var stationsWrap = document.getElementById('sc-stations');
      CFG.scStations.forEach(function (st) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pill-btn';
        b.textContent = st.label;
        b.onclick = function () { scLoadedOnce = true; setScUrl(st.url); };
        stationsWrap.appendChild(b);
      });
      document.getElementById('sc-form').addEventListener('submit', function (e) {
        e.preventDefault();
        scLoadedOnce = true;
        setScUrl(document.getElementById('sc-input').value);
      });

      var synthOn = false;
      var sCtx = null, sFlt = null, sMaster = null, sTimer = null, sStep = 0;
      var S_CHORDS = [[261.63,329.63,392,493.88],[220,261.63,329.63,392],[174.61,220,261.63,329.63],[196,246.94,293.66,349.23]];
      function runBeat() {
        if (!sCtx || !sFlt) return;
        var bpm = Number(document.getElementById('synth-bpm').value) || 76;
        if (sStep % 8 === 0) {
          var chord = S_CHORDS[Math.floor(sStep / 8) % S_CHORDS.length];
          var now = sCtx.currentTime;
          chord.forEach(function (f) {
            var o = sCtx.createOscillator(), g = sCtx.createGain();
            o.type = 'triangle';
            o.frequency.setValueAtTime(f, now);
            g.gain.setValueAtTime(0.0001, now);
            g.gain.linearRampToValueAtTime(0.045, now + 0.08);
            g.gain.exponentialRampToValueAtTime(0.0001, now + (60 / bpm) * 3.8);
            o.connect(g); g.connect(sFlt);
            o.start(now); o.stop(now + (60 / bpm) * 3.9);
          });
        }
        sStep++;
      }
      document.getElementById('synth-toggle').addEventListener('click', function () {
        if (synthOn) {
          synthOn = false;
          if (sTimer) clearInterval(sTimer);
          if (sCtx) sCtx.suspend().catch(function () {});
          this.textContent = 'Start Lo-Fi Synth';
          return;
        }
        var C = window.AudioContext || window.webkitAudioContext;
        if (!C) return;
        if (!sCtx) {
          sCtx = new C();
          sMaster = sCtx.createGain(); sMaster.gain.value = 0.7;
          sFlt = sCtx.createBiquadFilter(); sFlt.type = 'lowpass'; sFlt.frequency.value = Number(document.getElementById('synth-cut').value) || 1100;
          sFlt.connect(sMaster); sMaster.connect(sCtx.destination);
        }
        sCtx.resume().catch(function () {});
        var bpm = Number(document.getElementById('synth-bpm').value) || 76;
        sStep = 0; runBeat();
        sTimer = setInterval(runBeat, Math.round((60 / bpm / 2) * 1000));
        synthOn = true;
        this.textContent = 'Stop Lo-Fi Synth';
      });
      document.getElementById('synth-bpm').addEventListener('input', function () {
        document.getElementById('synth-bpm-val').textContent = this.value + ' BPM';
        if (synthOn) {
          clearInterval(sTimer);
          sTimer = setInterval(runBeat, Math.round((60 / Number(this.value) / 2) * 1000));
        }
      });
      document.getElementById('synth-cut').addEventListener('input', function () {
        document.getElementById('synth-cut-val').textContent = this.value + ' Hz';
        if (sFlt && sCtx) sFlt.frequency.setTargetAtTime(Number(this.value), sCtx.currentTime, 0.05);
      });
      document.getElementById('local-audio-input').addEventListener('change', function (e) {
        var f = e.target.files && e.target.files[0];
        if (!f) return;
        var player = document.getElementById('local-audio-player');
        player.src = URL.createObjectURL(f);
        player.style.display = 'block';
        player.play().catch(function () {});
      });

      /* ---------------- CLOAK, 24 COLOR PRESETS & SETTINGS MODAL ---------------- */
      var settingsModal = document.getElementById('settings-modal');
      var activePresetCat = 'All';
      var activePresetId = safeLSGet('valbrowse_color_preset') || 'coral-default';

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
        root.style.setProperty('--accent-text', tokens.isLight ? '#ffffff' : '#09090b');
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
        if (!grid) return;
        grid.innerHTML = '';
        var filtered = CFG.themePresets.filter(function (t) {
          return activePresetCat === 'All' || t.category === activePresetCat;
        });
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
          d2.style.background = t.accent;
          sw.appendChild(d1);
          sw.appendChild(d2);

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

      document.getElementById('btn-preset-reset-coral').addEventListener('click', function () {
        applyColorPreset('coral-default');
      });

      document.getElementById('valbrowse-proxy-frame').addEventListener('load', function () {
        applyColorPreset(activePresetId);
      });

      document.getElementById('btn-open-settings').addEventListener('click', function () {
        renderColorPresetsGrid();
        settingsModal.classList.add('open');
      });
      document.getElementById('btn-close-settings').addEventListener('click', function () {
        settingsModal.classList.remove('open');
      });
      document.querySelectorAll('[data-cloak]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.title = btn.getAttribute('data-cloak');
        });
      });

      /* ---------------- BOOT ---------------- */
      applyColorPreset(activePresetId);
      rebuildMergedGames();
      fetchGnZones();
    })();
  </script>
</body>
</html>`;
}

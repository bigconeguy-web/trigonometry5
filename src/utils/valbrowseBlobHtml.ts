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
  CURATED_SOUNDCLOUD_STATIONS,
  SOUNDCLOUD_ARTIST_EXAMPLES,
} from './soundcloudEmbed.js';
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
    tvmazeShowsUrl: TVMAZE_SHOWS_URL,
    tvmazeSearchUrl: TVMAZE_SEARCH_URL,
    archiveFeatureFilmsUrl: ARCHIVE_FEATURE_FILMS_URL,
    cinemaFallbackShows: buildTvFallbackCatalog(),
    cinemaFallbackMovies: buildArchiveMovieFallbackList(),
    scStations: CURATED_SOUNDCLOUD_STATIONS,
    scArtists: SOUNDCLOUD_ARTIST_EXAMPLES,
    adPrelude: AD_BLOCK_PRELUDE_HTML,
    srcBlocklist: AD_SCRIPT_SRC_BLOCKLIST.map((r) => ({ source: r.source, flags: r.flags })),
    inlineBlocklist: INLINE_AD_SCRIPT_PATTERNS.map((r) => ({ source: r.source, flags: r.flags })),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VALem — Isolated Workspace</title>
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
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
      --font-display: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
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
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--accent);
      color: var(--accent-text);
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
  </style>
</head>
<body>
  <div class="app-shell">
    <button type="button" class="rail-reopen-btn" id="btn-rail-reopen" aria-label="Show Sidebar Menu">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      <span>VALem Menu</span>
    </button>

    <!-- Left Collapsible Glassmorphic Sidebar Rail -->
    <aside class="rail" id="rail" aria-label="VALem Navigation">
      <div class="rail-top">
        <div class="rail-header">
          <div class="rail-brand">
            <span class="rail-logo-mark">V</span>
            <span class="rail-logo-name">VALem</span>
          </div>
          <button type="button" class="rail-collapse-btn" id="btn-rail-toggle" aria-expanded="true" aria-label="Collapse or Expand Sidebar" title="Collapse / Expand Sidebar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>

        <button type="button" class="rail-btn active" data-view="browser" aria-label="VALem Proxy Browser" title="VALem Proxy Browser">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="rail-label">VALem Browser</span>
        </button>

        <div class="rail-group-label">Arcade Hub</div>

        <button type="button" class="rail-btn" data-view="games" aria-label="All Games Hub" title="All Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>
          <span class="rail-label">All Games</span>
          <span class="rail-badge" id="badge-games">0</span>
        </button>

        <div class="rail-divider"></div>
        <div class="rail-group-label">gn-math Library</div>

        <button type="button" class="rail-btn" data-view="gnmath" aria-label="gn-math Script and Zones" title="gn-math Script">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span class="rail-label">gn-math Script</span>
          <span class="rail-badge" id="badge-gn">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="movies" aria-label="Movies and TV" title="Movies & TV">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span class="rail-label">Movies &amp; TV</span>
        </button>

        <button type="button" class="rail-btn" data-view="books" aria-label="gn-math Books and Manga" title="Books & Manga">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span class="rail-label">Books &amp; Manga</span>
        </button>

        <button type="button" class="rail-btn" data-view="music" aria-label="gn-math Music Studio" title="Music">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span class="rail-label">Music Studio</span>
        </button>
      </div>

      <div class="rail-bottom">
        <div class="rail-divider"></div>
        <button type="button" class="rail-btn" id="btn-rail-standalone-blob" aria-label="Open Standalone :blob Window" title="Open Standalone :blob Window">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span class="rail-label">Standalone :blob</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-hide" aria-label="Auto-Hide Sidebar" title="Hide Sidebar for Fullscreen Width">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span class="rail-label">Hide Sidebar</span>
        </button>

        <button type="button" class="rail-btn" id="btn-open-settings" aria-label="Color Presets and Custom Settings" title="Custom Settings &amp; 124 Themes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span class="rail-label">Settings</span>
          <span class="rail-badge">124</span>
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
        <span style="font-weight:800;color:var(--accent);font-size:15px;font-family:var(--font-display);">VALem</span>
        <button type="button" class="btn" id="btn-mobile-panic" style="border-color:rgba(244,63,94,0.4);color:#fda4af;">Panic (Esc)</button>
      </div>

      <!-- 1. VALem Scramjet v2 Frontpage -->
      <section class="view-panel active" id="view-browser" aria-label="VALem Proxy Browser">
        <iframe
          id="valbrowse-proxy-frame"
          title="VALem Scramjet v2 Browser"
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
                <button type="button" class="btn" id="gn-open-proxy">Open in VALem</button>
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
                  <input type="text" class="input" id="sc-input" value="https://soundcloud.com/lofi_girl" placeholder="Paste soundcloud.com/artist or track URL..." style="flex:1;" />
                  <button type="submit" class="btn btn-primary">Load</button>
                </form>
                <div class="pill-row" id="sc-stations"></div>
                <iframe
                  id="sc-frame"
                  title="SoundCloud Player"
                  width="100%"
                  height="260"
                  allow="autoplay"
                  style="border:1px solid var(--border);border-radius:10px;background:#000;"
                ></iframe>

                <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;flex-direction:column;gap:8px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                    <span class="eyebrow">Artist SoundCloud Search Examples</span>
                    <span class="sub">Click any link to load or copy handle</span>
                  </div>
                  <div class="pill-row" id="sc-artist-cats">
                    <button type="button" class="pill-btn active" data-sc-cat="all">All</button>
                    <button type="button" class="pill-btn" data-sc-cat="rap">10 Rappers</button>
                    <button type="button" class="pill-btn" data-sc-cat="pop">Famous Pop</button>
                    <button type="button" class="pill-btn" data-sc-cat="kpop">K-Pop</button>
                  </div>
                  <div class="artist-dir-grid" id="sc-artist-grid"></div>
                </div>
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
                <input type="range" id="synth-bpm" min="60" max="110" value="76" style="accent-color:var(--accent);" />

                <label class="sub" style="display:flex;justify-content:space-between;">
                  <span>Warmth Filter</span><span id="synth-cut-val">1100 Hz</span>
                </label>
                <input type="range" id="synth-cut" min="350" max="2800" value="1100" style="accent-color:var(--accent);" />

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
        <button type="button" class="btn" id="game-ov-proxy">Open in VALem</button>
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

  <!-- Embedded Theater View Overlay -->
  <div class="overlay" id="movie-overlay" aria-label="Embedded Theater View">
    <div class="overlay-bar">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="eyebrow" id="movie-ov-source">CINEMA</span>
        <strong id="movie-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Cinema Theater</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="movie-ov-theater">Theater Mode</button>
        <button type="button" class="btn" id="movie-ov-fs">Fullscreen</button>
        <button type="button" class="btn" id="movie-ov-proxy">Open in VALem</button>
        <button type="button" class="btn btn-primary" id="movie-ov-close">Close</button>
      </div>
    </div>
    <div class="theater-body">
      <div class="theater-inner">
        <div class="theater-player-box" id="movie-ov-stage">
          <iframe
            id="cinema-player-frame"
            title="VALem Embedded Theater Player"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div class="theater-fallback" id="cinema-player-fallback">
            <span class="eyebrow">Embedded Player Notice</span>
            <strong id="cinema-fallback-title" style="font-size:16px;color:var(--text);">No direct video stream attached to this metadata title</strong>
            <p class="sub" id="cinema-fallback-msg" style="max-width:520px;line-height:1.5;">
              TVMaze provides full episode guides, cast, and metadata without requiring an API key. Paste a custom embed URL below, add your free TMDB key in Settings for official trailers, or switch to Full Public-Domain Movies to stream complete films.
            </p>
            <div class="pill-row" style="justify-content:center;">
              <button type="button" class="btn btn-primary" id="cinema-fallback-retry">Reload Embed</button>
              <button type="button" class="btn" id="cinema-fallback-proxy">Search Watch Page in VALem</button>
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

  <!-- Settings & ${THEMES_CATALOG.length} Color Presets Modal -->
  <div class="modal-backdrop" id="settings-modal">
    <div class="modal-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <strong style="font-size:16px;font-family:var(--font-display);">VALem Custom Settings &amp; ${THEMES_CATALOG.length} Color Presets</strong>
          <div class="sub">Customize themes, backgrounds, sidebar layout, home modules, tab cloak, and panic target</div>
        </div>
        <button type="button" class="btn" id="btn-close-settings">Close</button>
      </div>

      <div class="settings-nav" id="settings-tabs">
        <button type="button" class="pill-btn active" data-stab="appearance">Themes &amp; Background</button>
        <button type="button" class="pill-btn" data-stab="layout">Sidebar &amp; Layout</button>
        <button type="button" class="pill-btn" data-stab="cloak">Cloak &amp; Panic</button>
      </div>

      <!-- Pane 1: Themes & Background -->
      <div class="settings-pane active" id="spane-appearance">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="eyebrow">Color Presets (${THEMES_CATALOG.length})</span>
            <div class="pill-row">
              <input type="text" class="input" id="preset-search" placeholder="Search themes..." aria-label="Search color presets" style="height:28px;width:155px;font-size:11px;padding:0 9px;" />
              <button type="button" class="btn" id="btn-preset-random" style="height:28px;font-size:11px;padding:0 10px;">Random Theme</button>
              <button type="button" class="btn" id="btn-preset-reset-coral" style="height:28px;font-size:11px;padding:0 10px;">Default Coral</button>
            </div>
          </div>
          <div class="pill-row" id="preset-cat-pills">
            <button type="button" class="pill-btn active" data-pcat="All">All (${THEMES_CATALOG.length})</button>
            <button type="button" class="pill-btn" data-pcat="Dark & Neon">Dark &amp; Neon (${THEMES_CATALOG.filter((t) => t.category === 'Dark & Neon').length})</button>
            <button type="button" class="pill-btn" data-pcat="Cozy & Pastel">Cozy &amp; Pastel (${THEMES_CATALOG.filter((t) => t.category === 'Cozy & Pastel').length})</button>
            <button type="button" class="pill-btn" data-pcat="High-Contrast & Light">High-Contrast &amp; Light (${THEMES_CATALOG.filter((t) => t.category === 'High-Contrast & Light').length})</button>
          </div>
          <div class="preset-grid" id="color-presets-grid"></div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Canvas Background Style</span>
            <span class="setting-row-desc">Choose the ambient pattern behind VALem</span>
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
            <span class="setting-row-title">Corner Shape</span>
            <span class="setting-row-desc">Adjust card and input roundness</span>
          </div>
          <div class="pill-row" id="radius-pills">
            <button type="button" class="pill-btn" data-radius="6">Sharp (6px)</button>
            <button type="button" class="pill-btn active" data-radius="12">Balanced (12px)</button>
            <button type="button" class="pill-btn" data-radius="18">Soft (18px)</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Ambient Glow &amp; Backdrop Blur</span>
            <span class="setting-row-desc">Fine-tune mesh glow intensity (<span id="glow-pct-val">100%</span>)</span>
          </div>
          <div class="pill-row">
            <input type="range" id="custom-glow-range" min="0" max="150" value="100" style="accent-color:var(--accent);width:120px;" />
            <button type="button" class="pill-btn active" id="btn-toggle-blur">Glass Blur: On</button>
          </div>
        </div>
      </div>

      <!-- Pane 2: Sidebar & Layout -->
      <div class="settings-pane" id="spane-layout">
        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Start Page UI Layout</span>
            <span class="setting-row-desc">Arrange VALem as Split Hero, Normal Search Engine, Side Search Engine, or Minimal</span>
          </div>
          <div class="pill-row" id="home-layout-pills">
            <button type="button" class="pill-btn active" data-homelayout="split">Split Hero</button>
            <button type="button" class="pill-btn" data-homelayout="normal">Normal Search</button>
            <button type="button" class="pill-btn" data-homelayout="side">Side Search</button>
            <button type="button" class="pill-btn" data-homelayout="minimal">Minimal</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Sidebar Mode</span>
            <span class="setting-row-desc">Expanded labels, compact icon rail, or auto-hidden drawer</span>
          </div>
          <div class="pill-row" id="sidebar-mode-pills">
            <button type="button" class="pill-btn active" data-railmode="expanded">Expanded</button>
            <button type="button" class="pill-btn" data-railmode="compact">Compact Rail</button>
            <button type="button" class="pill-btn" data-railmode="hidden">Auto-Hide</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">VALem Home Modules</span>
            <span class="setting-row-desc">Toggle the live clock card and quick-launch tiles on start page</span>
          </div>
          <div class="pill-row">
            <button type="button" class="pill-btn active" id="btn-toggle-clock">Live Clock: On</button>
            <button type="button" class="pill-btn active" id="btn-toggle-shortcuts">Launchpad: On</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Text Scale &amp; Motion</span>
            <span class="setting-row-desc">Adjust browser start page scale and transition motion</span>
          </div>
          <div class="pill-row" id="font-scale-pills">
            <button type="button" class="pill-btn" data-fscale="0.92">Compact</button>
            <button type="button" class="pill-btn active" data-fscale="1">Default</button>
            <button type="button" class="pill-btn" data-fscale="1.08">Large</button>
            <button type="button" class="pill-btn" id="btn-toggle-motion">Motion: Smooth</button>
          </div>
        </div>
      </div>

      <!-- Pane 3: Cloak & Panic -->
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
          <span class="eyebrow">Optional TMDB API Key (Movies &amp; YouTube Trailers)</span>
          <div class="pill-row">
            <input type="password" class="input" id="tmdb-api-key-input" placeholder="Paste optional TMDB v3 API key (saved in localStorage)..." style="flex:1;min-width:190px;" />
            <button type="button" class="btn btn-primary" id="btn-save-tmdb-key">Save Key</button>
            <button type="button" class="btn" id="btn-clear-tmdb-key">Clear</button>
          </div>
          <div class="sub" id="tmdb-key-status">Optional — leave blank to use free TVMaze + Internet Archive catalog with no key required.</div>
        </div>

        <div style="padding:10px 12px;border-radius:10px;background:var(--surface-2);border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--muted);">
          Default Wisp Endpoint:<br />
          <span style="color:var(--accent);">${DEFAULT_WISP_URL}</span>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div class="sub">Press <code style="color:var(--text);">Esc</code> anywhere to immediately close or redirect to your Panic destination.</div>
          <button type="button" class="btn" id="btn-reset-all-custom">Reset All Settings</button>
        </div>
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
        applyRailMode(railMode === 'compact' ? 'expanded' : 'compact');
      });

      if (railHideBtn) {
        railHideBtn.addEventListener('click', function () {
          applyRailMode('hidden');
        });
      }

      if (railReopenBtn) {
        railReopenBtn.addEventListener('click', function () {
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
          renderColorPresetsGrid();
          settingsModal.classList.add('open');
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
        gameMsg.textContent = 'Unable to fetch game package directly — click Open in VALem to load via Scramjet proxy.';
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
        st.textContent = 'Unable to reach jsDelivr right now — click Open in VALem to proxy gn-math.';
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
          isFullMovie: false
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

      function setTheaterIframeUrl(url, fallbackTitle, fallbackMsg) {
        var ifr = document.getElementById('cinema-player-frame');
        var fb = document.getElementById('cinema-player-fallback');
        var embedIn = document.getElementById('cinema-embed-input');
        var cleanUrl = String(url || '').trim();
        if (embedIn) embedIn.value = cleanUrl;
        if (!cleanUrl) {
          ifr.removeAttribute('src');
          document.getElementById('cinema-fallback-title').textContent = fallbackTitle || 'No direct embed stream selected';
          document.getElementById('cinema-fallback-msg').textContent = fallbackMsg || 'Use Full Public-Domain Movies for complete full-length Archive.org streams, paste a custom embed URL below, or add an optional TMDB API key in Settings for trailers.';
          fb.classList.add('open');
          return;
        }
        fb.classList.remove('open');
        ifr.onerror = function () {
          document.getElementById('cinema-fallback-title').textContent = 'External embed failed to load';
          fb.classList.add('open');
        };
        ifr.src = cleanUrl;
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
                .replace(/\\{season\\}/gi, String(ep.season))
                .replace(/\\{episode\\}/gi, String(ep.number));
              setTheaterIframeUrl(resolved);
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

        document.getElementById('movie-ov-title').textContent = m.title + (m.year ? ' (' + m.year + ')' : '');
        document.getElementById('movie-ov-source').textContent = m.source === 'archive' ? 'FULL PUBLIC-DOMAIN MOVIE' : (m.source === 'tmdb' ? 'TMDB DISCOVERY' : 'TVMAZE SERIES');
        document.getElementById('cinema-ov-network').textContent = m.networkOrStudio || 'Cinema';
        document.getElementById('cinema-ov-rating').textContent = typeof m.rating === 'number' ? ('Rating: ★ ' + m.rating.toFixed(1) + ' / 10') : '';
        document.getElementById('cinema-ov-genres').textContent = (m.genres || []).join(' · ');
        document.getElementById('cinema-ov-synopsis').textContent = m.summary || 'No synopsis available.';
        document.getElementById('cinema-ov-cast').textContent = (m.cast && m.cast.length) ? ('Cast: ' + m.cast.join(', ')) : '';

        var epPanel = document.getElementById('cinema-episodes-panel');
        epPanel.style.display = 'none';
        document.getElementById('movie-overlay').classList.add('open');

        if (m.source === 'archive') {
          setTheaterIframeUrl('https://archive.org/embed/' + encodeURIComponent(m.externalId));
          return;
        }

        if (m.source === 'tmdb') {
          setTheaterIframeUrl('', 'Loading official TMDB YouTube trailer...', 'Fetching trailer metadata from TMDB.');
          var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();
          if (tmdbKey) {
            try {
              var vRes = await fetch('https://api.themoviedb.org/3/movie/' + encodeURIComponent(m.externalId) + '/videos?api_key=' + encodeURIComponent(tmdbKey));
              if (vRes.ok && activeMovieObj === m) {
                var vJson = await vRes.json();
                var vids = Array.isArray(vJson && vJson.results) ? vJson.results : [];
                var tr = vids.find(function (v) { return v.site === 'YouTube' && v.type === 'Trailer' && v.key; }) ||
                         vids.find(function (v) { return v.site === 'YouTube' && v.key; });
                if (tr) {
                  setTheaterIframeUrl('https://www.youtube.com/embed/' + encodeURIComponent(tr.key) + '?autoplay=1');
                  return;
                }
              }
            } catch (_e) {}
          }
          setTheaterIframeUrl('', 'No YouTube trailer returned by TMDB', 'Paste a custom embed URL below or open the TMDB page inside VALem Proxy.');
          return;
        }

        // TVMaze Show: fetch live episodes & cast without an API key
        var tmpl = (safeLSGet('valem_embed_template') || '').trim();
        var initialEmbed = tmpl
          ? tmpl.replace(/\\{id\\}/gi, encodeURIComponent(m.externalId)).replace(/\\{season\\}/gi, '1').replace(/\\{episode\\}/gi, '1')
          : '';
        setTheaterIframeUrl(
          initialEmbed,
          m.title + ' — Episode Guide Ready',
          'Select any Season & Episode below, paste a configurable embed player URL in the bar below, or click Open in VALem to search via Scramjet proxy.'
        );

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
      }

      document.getElementById('cinema-season-select').addEventListener('change', function () {
        renderEpisodesForSeason(Number(this.value) || 1);
      });

      document.getElementById('cinema-embed-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var raw = (document.getElementById('cinema-embed-input').value || '').trim();
        if (!raw) return;
        if (raw.indexOf('{id}') !== -1 || raw.indexOf('{season}') !== -1) {
          safeLSSet('valem_embed_template', raw);
          var ep = activeSelectedEpisode || { season: 1, number: 1 };
          var resolved = raw
            .replace(/\\{id\\}/gi, encodeURIComponent(activeMovieObj ? activeMovieObj.externalId : ''))
            .replace(/\\{season\\}/gi, String(ep.season))
            .replace(/\\{episode\\}/gi, String(ep.number));
          setTheaterIframeUrl(resolved);
          showToast('Saved configurable embed URL template.');
        } else {
          setTheaterIframeUrl(raw);
        }
      });

      document.getElementById('cinema-embed-auto').addEventListener('click', function () {
        if (!activeMovieObj) return;
        if (activeMovieObj.source === 'archive') {
          setTheaterIframeUrl('https://archive.org/embed/' + encodeURIComponent(activeMovieObj.externalId));
        } else {
          openMovie(activeMovieObj);
        }
      });

      document.getElementById('cinema-fallback-retry').addEventListener('click', function () {
        var cur = (document.getElementById('cinema-embed-input').value || '').trim();
        if (cur) setTheaterIframeUrl(cur);
        else if (activeMovieObj) openMovie(activeMovieObj);
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

      /* ---------------- MUSIC STUDIO (SOUNDCLOUD + ARTIST EXAMPLES + SYNTH) ---------------- */
      var scLoadedOnce = false;
      var activeArtistCat = 'all';
      var activeArtistId = '';

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

      function renderScArtistDirectory() {
        var grid = document.getElementById('sc-artist-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var list = (CFG.scArtists || []).filter(function (a) {
          return activeArtistCat === 'all' || a.category === activeArtistCat;
        });
        list.forEach(function (artist) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'artist-chip-btn' + (activeArtistId === artist.id ? ' active' : '');
          btn.setAttribute('data-sc-artist', artist.id);

          var top = document.createElement('div');
          top.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:6px;';
          var nm = document.createElement('span');
          nm.style.cssText = 'font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          nm.textContent = artist.name;
          var badge = document.createElement('span');
          badge.className = 'eyebrow';
          badge.style.fontSize = '9px';
          badge.textContent = artist.genreLabel;
          top.appendChild(nm);
          top.appendChild(badge);

          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.style.cssText = 'font-family:var(--font-mono);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          sub.textContent = 'soundcloud.com/' + artist.handle;

          btn.appendChild(top);
          btn.appendChild(sub);
          btn.onclick = function () {
            activeArtistId = artist.id;
            scLoadedOnce = true;
            setScUrl(artist.url);
            renderScArtistDirectory();
          };
          grid.appendChild(btn);
        });
      }

      document.querySelectorAll('#sc-artist-cats .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeArtistCat = btn.getAttribute('data-sc-cat') || 'all';
          document.querySelectorAll('#sc-artist-cats .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderScArtistDirectory();
        });
      });

      renderScArtistDirectory();

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

      /* ---------------- CLOAK, 124 COLOR PRESETS & SETTINGS MODAL ---------------- */
      var settingsModal = document.getElementById('settings-modal');
      var activePresetCat = 'All';
      var presetSearchQuery = '';
      var activePresetId = safeLSGet('valbrowse_color_preset') || 'coral-default';

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
        return lum > 0.34 ? '#09090b' : '#ffffff';
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
        if (!grid) return;
        grid.innerHTML = '';
        var q = String(presetSearchQuery || '').trim().toLowerCase();
        var filtered = CFG.themePresets.filter(function (t) {
          var matchCat = activePresetCat === 'All' || t.category === activePresetCat;
          var matchQ = !q || t.name.toLowerCase().indexOf(q) !== -1 || t.category.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
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
      });

      /* ---------------- CUSTOM SETTINGS ENGINE (LAYOUT, BG, CLOAK, PANIC) ---------------- */
      var DEFAULT_CUSTOM_SETTINGS = {
        homeLayout: 'split',
        bgStyle: 'aurora',
        uiRadius: 12,
        glowStrength: 1,
        glassBlur: 14,
        fontScale: 1,
        showClock: true,
        showShortcuts: true,
        reducedMotion: false,
        panicUrl: CFG.panicUrl
      };

      var customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS);
      try {
        var rawCustomSaved = safeLSGet('valem_custom_settings');
        if (rawCustomSaved) {
          customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, JSON.parse(rawCustomSaved));
        }
      } catch (_e) {}

      function applyCustomSettings(next) {
        customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, next || {});
        if (
          customSettings.homeLayout !== 'normal' &&
          customSettings.homeLayout !== 'side' &&
          customSettings.homeLayout !== 'minimal'
        ) {
          customSettings.homeLayout = 'split';
        }
        safeLSSet('valem_custom_settings', JSON.stringify(customSettings));
        safeLSSet('valem_panic_url', customSettings.panicUrl || CFG.panicUrl);
        CFG.panicUrl = customSettings.panicUrl || 'https://classroom.google.com';

        var root = document.documentElement;
        document.body.setAttribute('data-bg-style', customSettings.bgStyle || 'aurora');
        document.body.setAttribute('data-home-layout', customSettings.homeLayout || 'split');
        document.body.setAttribute('data-reduced-motion', customSettings.reducedMotion ? '1' : '0');
        root.style.setProperty('--ui-radius', (customSettings.uiRadius || 12) + 'px');
        root.style.setProperty('--glow-strength', String(typeof customSettings.glowStrength === 'number' ? customSettings.glowStrength : 1));
        root.style.setProperty('--glass-blur', (typeof customSettings.glassBlur === 'number' ? customSettings.glassBlur : 14) + 'px');
        root.style.setProperty('--font-scale', String(customSettings.fontScale || 1));

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

        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({ type: 'valem-custom-settings', settings: customSettings }, '*');
          } catch (_e) {}
        }
      }

      document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function () {
          var target = tabBtn.getAttribute('data-stab');
          document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === tabBtn);
          });
          document.querySelectorAll('.settings-pane').forEach(function (pane) {
            pane.classList.toggle('active', pane.id === 'spane-' + target);
          });
        });
      });

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
          document.title = 'VALem — Isolated Workspace';
          showToast('All VALem custom settings restored to defaults.');
        });
      }

      document.getElementById('btn-open-settings').addEventListener('click', function () {
        renderColorPresetsGrid();
        settingsModal.classList.add('open');
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

      /* ---------------- BOOT ---------------- */
      var savedCloak = safeLSGet('valem_cloak_title');
      if (savedCloak) document.title = savedCloak;
      applyRailMode(railMode);
      applyColorPreset(activePresetId);
      applyCustomSettings(customSettings);
      rebuildMergedGames();
      fetchGnZones();
    })();
  </script>
</body>
</html>`;
}

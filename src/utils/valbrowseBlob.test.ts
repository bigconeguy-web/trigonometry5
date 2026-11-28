import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { EULER_STUDY_CATALOG } from '../data/studyCatalog';
import { FUN_FACTS } from '../data/funFacts';
import {
  ANIMATED_BG_PRESETS,
  DYNAMIC_COLOR_BG_PRESETS,
  FONT_LIBRARY_CATALOG,
  LAYOUT_PRESETS,
} from '../data/studioCatalogs';
import { THEMES_CATALOG } from './themeCatalog';
import { buildValBrowseBlobHtml } from './valbrowseBlobHtml';
import { patchScramjetBundle } from './scramjetPatch.mjs';
import {
  buildStandaloneBlobWrapperHtml,
  buildValBrowseOriginUrl,
  CLASSROOM_FAVICON_URL,
  DEFAULT_WISP_URL,
  PANIC_REDIRECT_URL,
  STANDALONE_IFRAME_NAME,
  STANDALONE_WINDOW_FEATURES,
  STANDALONE_WINDOW_NAME,
} from './valbrowseConfig';

test('buildValBrowseBlobHtml embeds valid JS, Vux branding, Studio customization, Vux Chat, StudyHub MP3, AI sidebar, Seraph provider, loader & welcome screen, and 10 new features', () => {
  const html = buildValBrowseBlobHtml('https://example.org', EULER_STUDY_CATALOG);

  assert.match(html, /<title>Vux — Isolated Workspace<\/title>/);
  assert.ok(html.includes('https://example.org/scramjet-browser.html'));
  assert.ok(html.includes('#000000'));
  assert.ok(html.includes('amoled-black'));
  assert.ok(html.includes('Default AMOLED'));
  assert.ok(html.includes(DEFAULT_WISP_URL));
  assert.ok(html.includes(PANIC_REDIRECT_URL));
  assert.ok(html.includes(STANDALONE_WINDOW_NAME));
  assert.ok(html.includes(STANDALONE_IFRAME_NAME));
  assert.ok(html.includes(STANDALONE_WINDOW_FEATURES));
  assert.ok(html.includes('Vux Customization Studio'));
  assert.ok(html.includes('Welcome to Vux'));
  assert.ok(html.includes('id="vux-online-badge"'));
  assert.ok(html.includes('id="vux-online-count"'));
  assert.ok(html.includes('id="vux-perf-pill"'));
  assert.ok(html.includes('id="btn-wake-wisp"'));
  assert.ok(html.includes('id="btn-rail-toggle"'));
  assert.ok(html.includes('id="btn-rail-hide"'));
  assert.ok(html.includes('id="btn-rail-reopen"'));
  assert.ok(html.includes('id="bg-style-pills"'));
  assert.ok(html.includes('id="home-layout-pills"'));
  assert.ok(html.includes('id="sidebar-mode-pills"'));
  assert.ok(html.includes('id="custom-cloak-title"'));
  assert.ok(html.includes('id="panic-url-select"'));

  // Customization Studio (200 themes, 100 animated BGs, 100 dynamic color BGs, 280+ fonts w/ Cursive, 25+ layouts)
  assert.equal(THEMES_CATALOG.length, 200);
  for (const preset of THEMES_CATALOG) {
    assert.ok(html.includes(preset.id), `Expected color preset ${preset.id}`);
  }
  assert.ok(ANIMATED_BG_PRESETS.length >= 100);
  assert.ok(DYNAMIC_COLOR_BG_PRESETS.length >= 100);
  assert.ok(FONT_LIBRARY_CATALOG.length >= 280);
  assert.ok(html.includes('Cursive &amp; Calligraphy'));
  assert.ok(html.includes('Dancing Script'));
  assert.ok(LAYOUT_PRESETS.length >= 25);
  assert.ok(FUN_FACTS.length >= 100);
  assert.ok(html.includes('id="vb-bg-canvas"'));
  assert.ok(html.includes('id="vb-dynamic-bg"'));
  assert.ok(html.includes('id="vux-cursor-canvas"'));
  assert.ok(html.includes('id="cursor-trail-pills"'));
  assert.ok(html.includes('id="vux-share-code-input"'));
  assert.ok(html.includes('id="vux-custom-css-input"'));
  assert.ok(html.includes('id="animbg-grid"'));
  assert.ok(html.includes('id="dynbg-grid"'));
  assert.ok(html.includes('id="fonts-grid"'));
  assert.ok(html.includes('id="font-preview-sample"'));
  assert.ok(html.includes('id="layouts-grid"'));

  // Loading Screen & Welcome Overlay
  assert.ok(html.includes('id="vb-loader"'));
  assert.ok(html.includes('id="vb-loader-canvas"'));
  assert.ok(html.includes('id="vb-loader-fact"'));
  assert.ok(html.includes('id="vb-loader-skip"'));
  assert.ok(html.includes('id="vb-welcome"'));
  assert.ok(html.includes('id="vb-welcome-dont-show"'));
  assert.ok(html.includes('id="vb-welcome-start"'));

  // Vux Chat (Discord-style channels, MQTT live sync, avatar colors, reactions, replies)
  assert.ok(html.includes('id="view-chat"'));
  assert.ok(html.includes('id="chat-channel-list"'));
  assert.ok(html.includes('chat-ch-btn'));
  assert.ok(!html.includes('chat-channel-btn'));
  assert.ok(html.includes('id="chat-messages"'));
  assert.ok(html.includes('id="chat-composer-form"'));
  assert.ok(html.includes('id="chat-sync-status"'));
  assert.ok(html.includes('wss://broker.emqx.io:8084/mqtt'));
  assert.ok(html.includes('wss://broker.hivemq.com:8884/mqtt'));

  // Searchable Music Library + StudyHub All-in-One MP3 Player + Ambient Sound Mixer
  assert.ok(html.includes('id="vux-music-library-panel"'));
  assert.ok(html.includes('id="music-library-search-form"'));
  assert.ok(html.includes('id="music-genre-pills"'));
  assert.ok(html.includes('id="music-playlists-bar"'));
  assert.ok(html.includes('id="music-library-results"'));
  assert.ok(html.includes('https://discoveryprovider.audius.co/v1'));
  assert.ok(html.includes('https://archive.org/advancedsearch.php'));
  assert.ok(html.includes('id="vux-global-audio"'));
  assert.ok(html.includes('id="vux-audio-viz"'));
  assert.ok(html.includes('id="vux-audio-stations"'));
  assert.ok(html.includes('id="vux-ambient-mixer"'));
  assert.ok(html.includes('Lofi Study Beats'));
  assert.ok(!html.includes('id="sc-artist-grid"'), 'Removed legacy SoundCloud widget grid');
  assert.ok(!html.includes('w.soundcloud.com/player'), 'Removed broken SoundCloud iframe embed');

  // Command Palette, PiP Widget, Scratchpad, Streak Badges
  assert.ok(html.includes('id="vux-cmd-palette"'));
  assert.ok(html.includes('id="vux-pip-widget"'));
  assert.ok(html.includes('id="vux-notes-drawer"'));
  assert.ok(html.includes('id="vux-badges-modal"'));

  // 1-on-1 WebRTC Voice Calling, Right-Click Context Menu, Online Users & DMs
  assert.ok(html.includes('id="chat-online-users"'));
  assert.ok(html.includes('id="chat-dm-list"'));
  assert.ok(html.includes('id="vux-user-ctx-menu"'));
  assert.ok(html.includes('id="ctx-call-user"'));
  assert.ok(html.includes('id="ctx-dm-user"'));
  assert.ok(html.includes('id="ctx-copy-user"'));
  assert.ok(html.includes('id="vux-incoming-call-modal"'));
  assert.ok(html.includes('id="vux-inc-accept"'));
  assert.ok(html.includes('id="vux-inc-decline"'));
  assert.ok(html.includes('id="vux-call-dock"'));
  assert.ok(html.includes('id="vux-call-timer"'));
  assert.ok(html.includes('id="vux-call-mute"'));
  assert.ok(html.includes('id="vux-call-deafen"'));
  assert.ok(html.includes('id="vux-call-hangup"'));
  assert.ok(html.includes('RTCPeerConnection'));
  assert.ok(html.includes('stun:stun.l.google.com:19302'));

  // Auto-Cloak on Tab Switch
  assert.ok(html.includes('id="vux-favicon"'));
  assert.ok(html.includes('id="btn-toggle-auto-cloak"'));
  assert.ok(html.includes('id="auto-cloak-preset"'));
  assert.ok(html.includes('applyAutoCloakState'));

  // Split-Screen / Dual-View Mode
  assert.ok(html.includes('id="vux-workspace-bar"'));
  assert.ok(html.includes('id="btn-split-view-toggle"'));
  assert.ok(html.includes('id="stage-panes"'));
  assert.ok(html.includes('id="vux-split-divider"'));
  assert.ok(html.includes('id="split-left-select"'));
  assert.ok(html.includes('id="split-right-select"'));
  assert.ok(html.includes('id="btn-split-swap"'));

  // Retro Console Emulator (EmulatorJS)
  assert.ok(html.includes('data-view="retro"'));
  assert.ok(html.includes('id="view-retro"'));
  assert.ok(html.includes('id="retro-system-pills"'));
  assert.ok(html.includes('id="retro-rom-dropzone"'));
  assert.ok(html.includes('id="retro-rom-input"'));
  assert.ok(html.includes('id="retro-player-frame"'));
  assert.ok(html.includes('https://cdn.emulatorjs.org/stable/data/'));

  // Vux.ai Custom-Skinned Single Workspace (replaces multi-provider AI drawer)
  assert.ok(html.includes('id="btn-rail-ai"'));
  assert.ok(html.includes('data-view="ai"'));
  assert.ok(html.includes('id="view-ai"'));
  assert.ok(html.includes('id="ai-panel-newchat"'));
  assert.ok(html.includes('id="ai-model-indicator"'));
  assert.ok(html.includes('id="ai-panel-reload"'));
  assert.ok(html.includes('id="ai-panel-frame"'));
  assert.ok(html.includes('https://duck.ai'));
  assert.ok(html.includes('wss://my-wisp-server-ocnq.onrender.com/wisp/'));
  assert.ok(html.includes('injectAiFrameSkin'));
  assert.ok(html.includes('valem-resolve-scram-url'));
  assert.ok(html.includes('embed=ai'));
  assert.ok(html.includes('flushVisibleCatalogView'));
  assert.ok(!html.includes('id="ai-drawer"'), 'Legacy multi-AI drawer must be removed');
  assert.ok(!html.includes('id="ai-model-pills"'), 'Legacy multi-AI pills must be removed');
  assert.ok(!html.includes('id="rail-ai-quick-form"'), 'Legacy quick AI form must be removed');
  assert.ok(!html.includes('data-ai-provider='), 'Legacy multi-AI provider switcher must be removed');

  // Seraph, GMShelf & CKV Full Uncapped Games Providers
  assert.ok(html.includes('id="view-seraph"'));
  assert.ok(html.includes('id="badge-seraph"'));
  assert.ok(html.includes('data-mfilter="seraph"'));
  assert.ok(html.includes('id="seraph-search"'));
  assert.ok(html.includes('id="view-gmshelf"'));
  assert.ok(html.includes('id="badge-gmshelf"'));
  assert.ok(html.includes('data-mfilter="gmshelf"'));
  assert.ok(html.includes('id="gmshelf-search"'));
  assert.ok(html.includes('id="view-ckv"'));
  assert.ok(html.includes('id="badge-ckv"'));
  assert.ok(html.includes('data-mfilter="ckv"'));
  assert.ok(html.includes('id="ckv-search"'));
  assert.ok(html.includes('ckvTreeApiUrl'));
  assert.ok(html.includes('fetchCkvCatalog'));
  assert.ok(html.includes('fetchGmshelfCatalog'));
  assert.ok(html.includes('renderCardsChunked'));
  assert.ok(!html.includes('list.slice(0, 150)'), 'Must not truncate game catalogs to 150 items');
  assert.ok(!html.includes('list.slice(0, 120)'), 'Must not truncate gn-math catalog to 120 items');

  assert.ok(html.includes('hydrateCachedCatalogsFromStorage'));
  assert.ok(html.includes('gn-math Script'));
  assert.ok(html.includes('Movies &amp; TV'));
  assert.ok(html.includes('id="btn-launch-cineruv"'));
  assert.ok(html.includes('https://cineruv.website'));
  assert.ok(html.includes('data-genre="cineruv"'));
  assert.ok(html.includes('Full Public-Domain Movies'));
  assert.ok(html.includes('api.tvmaze.com/shows'));
  assert.ok(html.includes('id="tmdb-api-key-input"'));
  assert.ok(html.includes('id="cinema-player-frame"'));
  assert.ok(html.includes('referrerpolicy="no-referrer"'));
  assert.ok(!html.includes('allowfullscreen'), 'Must not include redundant allowfullscreen alongside allow="fullscreen"');
  assert.ok(html.includes('id="cinema-source-switcher"'));
  assert.ok(html.includes('id="cinema-open-new-tab"'));
  assert.ok(html.includes('id="cinema-fallback-new-tab"'));
  assert.ok(html.includes('youtube-nocookie.com/embed/'));
  assert.ok(html.includes('id="cinema-season-select"'));
  assert.ok(html.includes('Books &amp; Manga'));
  assert.ok(!html.includes('data.jsdelivr.net'), 'Should not fire dead data.jsdelivr.net requests');

  // Feature 1: Live Wallpaper Uploader (IndexedDB)
  assert.ok(html.includes('id="vb-live-wallpaper"'));
  assert.ok(html.includes('id="vb-wallpaper-video"'));
  assert.ok(html.includes('id="vb-wallpaper-img"'));
  assert.ok(html.includes('id="vux-wallpaper-input"'));
  assert.ok(html.includes('id="btn-wallpaper-upload"'));
  assert.ok(html.includes('id="btn-wallpaper-clear"'));
  assert.ok(html.includes('vux_wallpaper_db_v1'));

  // Feature 2: Built-In Utility Tools Drawer (Calculator, Whiteboard, Pomodoro Timer)
  assert.ok(html.includes('id="vux-tools-drawer"'));
  assert.ok(html.includes('id="btn-rail-tools"'));
  assert.ok(html.includes('id="btn-ws-tools"'));
  assert.ok(html.includes('id="vux-calc-grid"'));
  assert.ok(html.includes('id="vux-wb-canvas"'));
  assert.ok(html.includes('id="vux-pomo-display"'));
  assert.ok(html.includes('id="btn-pomo-start"'));

  // Feature 3: Rich Activity Status & Share-to-Chat Cards
  assert.ok(html.includes('id="chat-share-activity-btn"'));
  assert.ok(html.includes('setCurrentUserActivity'));
  assert.ok(html.includes('launchSharedActivity'));
  assert.ok(html.includes('chat-activity-card'));
  assert.ok(html.includes('chat-peer-activity'));

  // Feature 4: Built-In Adblocker & Custom Userscripts Manager
  assert.ok(html.includes('data-stab="scripts"'));
  assert.ok(html.includes('id="spane-scripts"'));
  assert.ok(html.includes('id="btn-toggle-adblock"'));
  assert.ok(html.includes('id="vux-us-name"'));
  assert.ok(html.includes('id="vux-us-match"'));
  assert.ok(html.includes('id="vux-us-code"'));
  assert.ok(html.includes('id="vux-us-list"'));
  assert.ok(html.includes('vux-proxy-extensions'));

  // Feature 5: Instant Fake Google Doc Boss Screen (Shift + Shift)
  assert.ok(html.includes('id="vux-boss-screen"'));
  assert.ok(html.includes('id="btn-ws-boss"'));
  assert.ok(html.includes('id="btn-boss-exit"'));
  assert.ok(html.includes('toggleBossScreen'));
  assert.ok(html.includes('AP Biology Unit 4 Study Guide'));

  for (const mod of EULER_STUDY_CATALOG.slice(0, 15)) {
    assert.ok(html.includes(mod.slug), `Expected built-in module slug ${mod.slug}`);
  }

  // Must only have a single closing script tag so inline HTML parser never terminates early
  const closingScripts = html.match(/<\/script>/gi) || [];
  assert.equal(closingScripts.length, 1);

  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch && scriptMatch[1], 'Expected inline <script> block in :blob HTML');
  assert.doesNotThrow(() => new vm.Script(scriptMatch[1], { filename: 'valbrowse-blob-inline.js' }));
});

test('buildValBrowseOriginUrl preserves origin and sets vb=1 without losing existing params', () => {
  assert.equal(buildValBrowseOriginUrl('https://my-app.vercel.app/'), 'https://my-app.vercel.app/?vb=1');
  assert.equal(buildValBrowseOriginUrl('http://localhost:3000/?foo=bar'), 'http://localhost:3000/?foo=bar&vb=1');
});

test('buildStandaloneBlobWrapperHtml renders Classroom-cloaked 100vw x 100vh named iframe with valid Escape close/redirect JS', () => {
  const wrapperHtml = buildStandaloneBlobWrapperHtml('https://my-app.vercel.app/?vb=1');
  assert.match(wrapperHtml, /<title>Home - Classroom<\/title>/);
  assert.ok(wrapperHtml.includes(CLASSROOM_FAVICON_URL));
  assert.ok(wrapperHtml.includes(`name="${STANDALONE_IFRAME_NAME}"`));
  assert.ok(wrapperHtml.includes('width: 100vw;'));
  assert.ok(wrapperHtml.includes('height: 100vh;'));
  assert.ok(wrapperHtml.includes('src="https://my-app.vercel.app/?vb=1"'));
  assert.ok(wrapperHtml.includes(PANIC_REDIRECT_URL));
  assert.ok(wrapperHtml.includes('window.top.close'));

  const scriptMatch = wrapperHtml.match(/<script>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch && scriptMatch[1]);
  assert.doesNotThrow(() => new vm.Script(scriptMatch[1], { filename: 'standalone-blob-wrapper.js' }));
});

test('index.html loads clean EulerPath math site without auto-launching :blob or inline proxy', () => {
  const indexPath = path.resolve(process.cwd(), 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  assert.match(html, /<title>EulerPath - Interactive Mathematics & Analytic Geometry<\/title>/);
  assert.ok(!html.includes('URL.createObjectURL'), 'Must not auto-launch blob URL on load');
  assert.ok(!html.includes('VALemStandalone'), 'Must not open standalone popup on initial load');
  assert.ok(!html.includes('Home - Classroom'), 'Main math page HTML must stay EulerPath');

  const appPath = path.resolve(process.cwd(), 'src/App.tsx');
  const appSrc = fs.readFileSync(appPath, 'utf8');
  assert.ok(!appSrc.includes('Open in Current Window Instead'), 'Must not provide inline non-blob fallback');
  assert.ok(!appSrc.includes('Return to Math'), 'Main math site must not render inline non-blob workspace header');
  assert.ok(!appSrc.includes('Ctrl+E'), 'Control key alone replaces Ctrl+E');
});

test('public/scramjet-browser.html inline script parses cleanly with Vux theme, translucent FX homepage, workspaces, bookmarks, PiP, Libcurl transport, and panic handler', () => {
  const filePath = path.resolve(process.cwd(), 'public/scramjet-browser.html');
  const html = fs.readFileSync(filePath, 'utf8');

  assert.ok(html.includes('<div class="home-logo">Vux</div>'));
  assert.ok(html.includes('valem_custom_settings'));
  assert.ok(html.includes('data-global-fx'));
  assert.ok(html.includes('id="btn-bookmark-tab"'));
  assert.ok(html.includes('id="btn-workspaces"'));
  assert.ok(html.includes('id="btn-pop-pip"'));
  assert.ok(html.includes('id="btn-wisp-render"'));
  assert.ok(html.includes('id="btn-wisp-mercury"'));
  assert.ok(html.includes('id="toolbar-transport-chip"'));
  assert.ok(html.includes('id="toolbar-wisp-chip"'));
  assert.ok(html.includes('id="btn-switch-epoxy"'));
  assert.ok(html.includes('id="btn-switch-mercury"'));
  assert.ok(html.includes('id="mini-player"'));
  assert.ok(html.includes('applyScramFontFamily'));
  assert.ok(html.includes('valem-resolve-scram-url'));
  assert.ok(html.includes('valem-scram-url-ready'));
  assert.ok(html.includes('wss://my-wisp-server-ocnq.onrender.com/wisp/'));
  assert.ok(html.includes('wss://wisp.mercurywork.shop/'));
  assert.ok(html.includes('/libcurl/index.mjs'));
  assert.ok(html.includes('/epoxy/index.mjs'));
  assert.ok(html.includes('switchTransportMode'));
  assert.ok(html.includes('id="transport-select"'));
  assert.ok(html.includes('id="layout-select"'));
  assert.ok(html.includes('valem_baremux_transport'));
  assert.ok(html.includes('data-home-layout="normal"'));
  assert.ok(html.includes('data-home-layout="side"'));
  assert.ok(html.includes('https://discord.com/app'));
  assert.ok(html.includes('https://web.snapchat.com'));
  assert.ok(html.includes('https://kick.com'));
  assert.ok(html.includes('https://www.twitch.tv'));
  assert.ok(html.includes('https://www.reddit.com'));
  assert.ok(html.includes('https://nowgg.fun'));
  assert.ok(html.includes('id="add-shortcut-modal"'));
  assert.ok(html.includes('btn-add-shortcut'));
  assert.ok(html.includes('tabsScrollEl.appendChild(newTabBtn)'));
  assert.ok(html.includes("var DEFAULT_SEARCH_ENGINE = 'https://search.brave.com/search?q=';"));
  assert.ok(html.includes('<option value="https://search.brave.com/search?q=" selected>Brave Search</option>'));
  assert.ok(html.includes('https://classroom.google.com'));
  assert.ok(html.includes('scramjet.encodeUrl'));
  assert.ok(html.includes('BareMuxConnection'));

  const scriptMatches = [...html.matchAll(/<script(?:\s+src="[^"]*")?>([\s\S]*?)<\/script>/gi)];
  const inlineBlocks = scriptMatches.map((m) => m[1].trim()).filter(Boolean);
  assert.ok(inlineBlocks.length >= 1, 'Expected inline script block in scramjet-browser.html');
  for (let i = 0; i < inlineBlocks.length; i++) {
    assert.doesNotThrow(
      () => new vm.Script(inlineBlocks[i], { filename: `scramjet-browser-${i}.js` }),
      `Syntax error in scramjet-browser inline script #${i}`
    );
  }
  assert.ok(html.includes('registration.update()'));
  assert.ok(html.includes('ensureLibcurlTransport'));
  assert.ok(html.includes('scramjet.createFrame'));
  assert.ok(html.includes('tab.readyPollId'));
  assert.ok(html.includes('embed-ai-mode'));
  assert.ok(html.includes('startEmbeddedAiSession'));
  assert.ok(html.includes('applyEmbeddedAiSkinToTab'));
  assert.ok(html.includes('id="btn-eruda-inspect"'));
  assert.ok(html.includes('https://cdn.jsdelivr.net/npm/eruda'));
  assert.ok(html.includes('id="tiktok-fallback-banner"'));
  assert.ok(html.includes('id="btn-tiktok-mobile"'));
  assert.ok(html.includes('id="btn-tiktok-viewer"'));
  assert.ok(html.includes('id="tiktok-viewer-modal"'));
  assert.ok(html.includes('https://www.tiktok.com/oembed'));
  assert.ok(html.includes('id="toolbar-adblock-chip"'));
  assert.ok(html.includes('id="btn-adblock-toggle"'));
  assert.ok(html.includes('injectUserscriptsIntoTab'));
  assert.ok(html.includes('vux-proxy-extensions'));
  assert.ok(html.includes('vux-boss-toggle'));
  assert.ok(!html.includes('Use Local /wisp/'), 'Must strictly use Mercury Wisp without local /wisp/ fallback');
});

test('public/sw.js bridges Scramjet traffic via BareMux with transport switching, frame header stripping, and adblocker', () => {
  const swPath = path.resolve(process.cwd(), 'public/sw.js');
  const swSrc = fs.readFileSync(swPath, 'utf8');

  assert.ok(swSrc.includes('importScripts("/baremux/index.js")'));
  assert.ok(swSrc.includes('new BareMux.BareClient("/baremux/worker.js")'));
  assert.ok(swSrc.includes('scramjet.initEpoxy = async ()'));
  assert.ok(swSrc.includes('bindLibcurlBridge()'));
  assert.ok(swSrc.includes('setTransportMode'));
  assert.ok(swSrc.includes('setAdblockEnabled'));
  assert.ok(swSrc.includes('getAdblockStats'));
  assert.ok(swSrc.includes('isBlockedAdHost'));
  assert.ok(swSrc.includes('sanitizeLibcurlHeaders'));
  assert.ok(swSrc.includes('normalizeResponseRawHeaders'));
  assert.ok(swSrc.includes('x-frame-options'));
  assert.ok(swSrc.includes('content-security-policy'));
  assert.ok(swSrc.includes('http2-settings'));
  assert.ok(swSrc.includes('tiktok.com'));
  assert.ok(swSrc.includes('sec-ch-ua'));
  assert.ok(!swSrc.includes('await scramjet.initEpoxy();\n            epoxyOk = true;'));
  assert.doesNotThrow(() => new vm.Script(swSrc, { filename: 'public-sw.js' }));
});

test('patchScramjetBundle guards Function constructor hooks against null/throwing eval in sandboxed iframes', () => {
  const rawAll = fs.readFileSync(
    path.resolve(process.cwd(), 'node_modules/@mercuryworkshop/scramjet/dist/scramjet.all.js'),
    'utf8'
  );
  const patched = patchScramjetBundle(rawAll);
  assert.notEqual(patched, rawAll);
  assert.ok(!patched.includes('natives.call("eval",null,"(function () {})").constructor'));
  assert.equal(patchScramjetBundle(patched), patched, 'Patch must be idempotent');

  const snippet = patched.match(
    /for\(const _sjSrc of\["\(function \(\) \{\}\)"[^\n]*?catch\(_sjErr\)\{\}\}/
  )?.[0];
  assert.ok(snippet, 'Expected patched loop in scramjet bundle');

  // Verify the patched loop never throws when eval returns null or throws EvalError
  const sandboxClient = {
    natives: { call: () => null },
    RawProxy: () => {},
  };
  const fnNull = new Function('A', 'I', snippet);
  assert.doesNotThrow(() => fnNull(sandboxClient, {}));

  const cspClient = {
    natives: {
      call: () => {
        throw new EvalError('Refused to evaluate a string as JavaScript');
      },
    },
    RawProxy: () => {},
  };
  assert.doesNotThrow(() => fnNull(cspClient, {}));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { EULER_STUDY_CATALOG } from '../data/studyCatalog';
import { THEMES_CATALOG } from './themeCatalog';
import { buildValBrowseBlobHtml } from './valbrowseBlobHtml';
import {
  buildStandaloneBlobWrapperHtml,
  buildValBrowseOriginUrl,
  CLASSROOM_FAVICON_URL,
  DEFAULT_WISP_URL,
  PANIC_REDIRECT_URL,
  STANDALONE_WINDOW_FEATURES,
  STANDALONE_WINDOW_NAME,
} from './valbrowseConfig';

test('buildValBrowseBlobHtml embeds valid JS, coral aesthetic, 124 color presets, collapsible sidebar, custom settings, Scramjet frontpage, modules, and gn-math sections', () => {
  const html = buildValBrowseBlobHtml('https://example.org', EULER_STUDY_CATALOG);

  assert.match(html, /<title>VALem — Isolated Workspace<\/title>/);
  assert.ok(html.includes('https://example.org/scramjet-browser.html'));
  assert.ok(html.includes('#ff5c7c'));
  assert.ok(html.includes(DEFAULT_WISP_URL));
  assert.ok(html.includes(PANIC_REDIRECT_URL));
  assert.ok(html.includes(STANDALONE_WINDOW_NAME));
  assert.ok(html.includes(STANDALONE_WINDOW_FEATURES));
  assert.ok(html.includes('124 Color Presets'));
  assert.ok(html.includes('id="btn-rail-toggle"'));
  assert.ok(html.includes('id="btn-rail-hide"'));
  assert.ok(html.includes('id="btn-rail-reopen"'));
  assert.ok(html.includes('id="bg-style-pills"'));
  assert.ok(html.includes('id="home-layout-pills"'));
  assert.ok(html.includes('id="sidebar-mode-pills"'));
  assert.ok(html.includes('id="custom-cloak-title"'));
  assert.ok(html.includes('id="panic-url-select"'));
  assert.equal(THEMES_CATALOG.length, 124);
  for (const preset of THEMES_CATALOG) {
    assert.ok(html.includes(preset.id), `Expected color preset ${preset.id}`);
  }
  assert.ok(html.includes('gn-math Script'));
  assert.ok(html.includes('Movies &amp; TV'));
  assert.ok(html.includes('Full Public-Domain Movies'));
  assert.ok(html.includes('api.tvmaze.com/shows'));
  assert.ok(html.includes('id="tmdb-api-key-input"'));
  assert.ok(html.includes('id="cinema-player-frame"'));
  assert.ok(html.includes('id="cinema-season-select"'));
  assert.ok(html.includes('id="sc-artist-grid"'));
  assert.ok(html.includes('kendrick-lamar-music'));
  assert.ok(html.includes('bangtan'));
  assert.ok(html.includes('Books &amp; Manga'));
  assert.ok(html.includes('Music Studio'));
  assert.ok(!html.includes('data.jsdelivr.net'), 'Should not fire dead data.jsdelivr.net requests');

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

test('buildStandaloneBlobWrapperHtml renders Classroom-cloaked 100vw x 100vh iframe with valid Escape close/redirect JS', () => {
  const wrapperHtml = buildStandaloneBlobWrapperHtml('https://my-app.vercel.app/?vb=1');
  assert.match(wrapperHtml, /<title>Home - Classroom<\/title>/);
  assert.ok(wrapperHtml.includes(CLASSROOM_FAVICON_URL));
  assert.ok(wrapperHtml.includes('width: 100vw;'));
  assert.ok(wrapperHtml.includes('height: 100vh;'));
  assert.ok(wrapperHtml.includes('src="https://my-app.vercel.app/?vb=1"'));
  assert.ok(wrapperHtml.includes(PANIC_REDIRECT_URL));
  assert.ok(wrapperHtml.includes('window.top.close'));

  const scriptMatch = wrapperHtml.match(/<script>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch && scriptMatch[1]);
  assert.doesNotThrow(() => new vm.Script(scriptMatch[1], { filename: 'standalone-blob-wrapper.js' }));
});

test('public/scramjet-browser.html inline script parses cleanly with VALem theme, Brave default search, Libcurl/Epoxy toggle, UI layouts, Wisp default, and panic handler', () => {
  const filePath = path.resolve(process.cwd(), 'public/scramjet-browser.html');
  const html = fs.readFileSync(filePath, 'utf8');

  assert.ok(html.includes('<div class="home-logo">VALem</div>'));
  assert.ok(html.includes('valem_custom_settings'));
  assert.ok(html.includes('wss://my-wisp-server-ocnq.onrender.com/wisp/'));
  assert.ok(html.includes('/libcurl/index.mjs'));
  assert.ok(html.includes('/epoxy/index.mjs'));
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
});

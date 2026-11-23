import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { GAME_CATALOG } from '../data/gamesCatalog';
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

test('buildValBrowseBlobHtml embeds valid JS, coral aesthetic, 24 color presets, Scramjet frontpage, games, and gn-math sections', () => {
  const html = buildValBrowseBlobHtml('https://example.org', GAME_CATALOG);

  assert.match(html, /<title>ValBrowse — Isolated Workspace<\/title>/);
  assert.ok(html.includes('https://example.org/scramjet-browser.html'));
  assert.ok(html.includes('#ff5c7c'));
  assert.ok(html.includes(DEFAULT_WISP_URL));
  assert.ok(html.includes(PANIC_REDIRECT_URL));
  assert.ok(html.includes(STANDALONE_WINDOW_NAME));
  assert.ok(html.includes(STANDALONE_WINDOW_FEATURES));
  assert.ok(html.includes('24 Color Presets'));
  assert.equal(THEMES_CATALOG.length, 24);
  for (const preset of THEMES_CATALOG) {
    assert.ok(html.includes(preset.id), `Expected color preset ${preset.id}`);
  }
  assert.ok(html.includes('gn-math Script'));
  assert.ok(html.includes('Movies &amp; Stream'));
  assert.ok(html.includes('Books &amp; Manga'));
  assert.ok(html.includes('Music Studio'));
  assert.ok(!html.includes('data.jsdelivr.net'), 'Should not fire dead data.jsdelivr.net requests');

  for (const game of GAME_CATALOG.slice(0, 15)) {
    assert.ok(html.includes(game.slug), `Expected built-in game slug ${game.slug}`);
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

test('public/scramjet-browser.html inline script parses cleanly with ValBrowse theme, Wisp default, and panic handler', () => {
  const filePath = path.resolve(process.cwd(), 'public/scramjet-browser.html');
  const html = fs.readFileSync(filePath, 'utf8');

  assert.ok(html.includes('<div class="home-logo">valbrowse</div>'));
  assert.ok(html.includes('wss://my-wisp-server-ocnq.onrender.com/wisp/'));
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

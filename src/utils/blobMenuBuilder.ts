import { GameCatalogItem } from '../data/gamesCatalog';
import {
  AD_BLOCK_PRELUDE_HTML,
  AD_SCRIPT_SRC_BLOCKLIST,
  INLINE_AD_SCRIPT_PATTERNS,
} from './adBlockerProxy';

function serializeForInlineScript(value: unknown): string {
  return JSON.stringify(value).replace(/<\//g, '<\\/');
}

export function buildDashboardBlobHtml(games: GameCatalogItem[]): string {
  const safeGamesJson = serializeForInlineScript(games);
  const safePreludeJson = serializeForInlineScript(AD_BLOCK_PRELUDE_HTML);
  const srcBlocklistSources = serializeForInlineScript(
    AD_SCRIPT_SRC_BLOCKLIST.map((re) => ({ source: re.source, flags: re.flags }))
  );
  const inlineBlocklistSources = serializeForInlineScript(
    INLINE_AD_SCRIPT_PATTERNS.map((re) => ({ source: re.source, flags: re.flags }))
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
      background: #0d0d10;
      color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
    }
    #hub {
      max-width: 1040px;
      margin: 0 auto;
      padding: 20px 16px 40px;
    }
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .badge {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      background: #18181b;
      border: 1px solid #27272a;
      color: #a1a1aa;
    }
    .badge-shield {
      color: #34d399;
      border-color: rgba(52, 211, 153, 0.25);
      background: rgba(16, 185, 129, 0.08);
    }
    #player-shell {
      display: none;
      margin-bottom: 18px;
      background: #141418;
      border: 1px solid #27272a;
      border-radius: 10px;
      overflow: hidden;
    }
    #player-shell.active {
      display: block;
    }
    .player-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 14px;
      background: #18181c;
      border-bottom: 1px solid #27272a;
    }
    .player-title {
      font-size: 13px;
      font-weight: 600;
      color: #fafafa;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .player-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .ctrl-btn {
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid #3f3f46;
      background: #27272a;
      color: #f4f4f5;
      cursor: pointer;
    }
    .ctrl-btn:hover {
      background: #3f3f46;
    }
    .ctrl-btn-close:hover {
      background: #7f1d1d;
      border-color: #991b1b;
    }
    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000000;
    }
    #frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background: #000000;
    }
    #loader, #error-box {
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: rgba(9, 9, 11, 0.92);
      color: #e4e4e7;
      z-index: 5;
      padding: 20px;
      text-align: center;
    }
    #loader.visible, #error-box.visible {
      display: flex;
    }
    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #27272a;
      border-top-color: #e4e4e7;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .controls-row {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    #search {
      flex: 1 1 260px;
      padding: 12px 14px;
      border-radius: 8px;
      border: 1px solid #27272a;
      background: #18181b;
      color: #ffffff;
      font-size: 14px;
      outline: none;
    }
    #search:focus {
      border-color: #52525b;
    }
    #category {
      padding: 12px 14px;
      border-radius: 8px;
      border: 1px solid #27272a;
      background: #18181b;
      color: #e4e4e7;
      font-size: 13px;
      outline: none;
      cursor: pointer;
    }
    #count-label {
      font-size: 12px;
      color: #a1a1aa;
      margin-bottom: 12px;
    }
    #grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
      gap: 10px;
    }
    .game-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 6px;
      padding: 13px 14px;
      background: #16161a;
      color: #fafafa;
      border: 1px solid #27272a;
      border-radius: 8px;
      text-align: left;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    }
    .game-btn:hover {
      background: #202026;
      border-color: #3f3f46;
      transform: translateY(-1px);
    }
    .game-btn.active {
      border-color: #34d399;
      background: #18221e;
    }
    .game-name {
      font-size: 13px;
      font-weight: 700;
      line-height: 1.3;
    }
    .game-cat {
      font-size: 11px;
      color: #a1a1aa;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div id="hub">
    <div class="topbar">
      <div class="brand">
        <span class="brand-title">Dashboard</span>
        <span class="badge" id="total-badge">${games.length} Games</span>
      </div>
      <span class="badge badge-shield">Ads &amp; Popups Disabled</span>
    </div>

    <div id="player-shell">
      <div class="player-bar">
        <span class="player-title" id="now-playing">Select a game</span>
        <div class="player-actions">
          <button type="button" class="ctrl-btn" id="reload-btn">Reload</button>
          <button type="button" class="ctrl-btn" id="fullscreen-btn">Fullscreen</button>
          <button type="button" class="ctrl-btn ctrl-btn-close" id="close-btn">Close</button>
        </div>
      </div>
      <div class="stage" id="stage">
        <iframe
          id="frame"
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          allow="autoplay; fullscreen; gamepad"
        ></iframe>
        <div id="loader">
          <div class="spinner"></div>
          <div id="loader-text">Loading game...</div>
        </div>
        <div id="error-box">
          <div id="error-text">Unable to load game package.</div>
          <button type="button" class="ctrl-btn" id="retry-btn">Retry</button>
        </div>
      </div>
    </div>

    <div class="controls-row">
      <input type="text" id="search" placeholder="Search ${games.length} games..." autocomplete="off" />
      <select id="category" aria-label="Filter by category">
        <option value="ALL">All Categories</option>
      </select>
    </div>

    <div id="count-label">Showing ${games.length} of ${games.length} games</div>
    <div id="grid"></div>
  </div>

  <script>
    (function () {
      var GAMES = ${safeGamesJson};
      var AD_PRELUDE = ${safePreludeJson};
      var SRC_PATTERNS = ${srcBlocklistSources}.map(function (p) { return new RegExp(p.source, p.flags); });
      var INLINE_PATTERNS = ${inlineBlocklistSources}.map(function (p) { return new RegExp(p.source, p.flags); });

      var grid = document.getElementById("grid");
      var searchInput = document.getElementById("search");
      var categorySelect = document.getElementById("category");
      var countLabel = document.getElementById("count-label");
      var playerShell = document.getElementById("player-shell");
      var stage = document.getElementById("stage");
      var frame = document.getElementById("frame");
      var loader = document.getElementById("loader");
      var loaderText = document.getElementById("loader-text");
      var errorBox = document.getElementById("error-box");
      var errorText = document.getElementById("error-text");
      var nowPlaying = document.getElementById("now-playing");
      var reloadBtn = document.getElementById("reload-btn");
      var fullscreenBtn = document.getElementById("fullscreen-btn");
      var closeBtn = document.getElementById("close-btn");
      var retryBtn = document.getElementById("retry-btn");

      var currentGame = null;
      var activeRequestId = 0;

      // Populate categories
      var catSet = {};
      GAMES.forEach(function (g) { catSet[g.category] = true; });
      Object.keys(catSet).sort().forEach(function (cat) {
        var opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
      });

      function getBaseDir(url) {
        var clean = url.split("#")[0].split("?")[0];
        var idx = clean.lastIndexOf("/");
        return idx === -1 ? clean + "/" : clean.slice(0, idx + 1);
      }

      function sanitizeGameHtml(rawHtml, sourceUrl) {
        var html = rawHtml || "";
        html = html.replace(/<template\\b[^>]*data-ad-rail-template[^>]*>[\\s\\S]*?<\\/template>/gi, "");
        html = html.replace(/<ins\\b[^>]*class=["'][^"']*adsbygoogle[^"']*["'][^>]*>[\\s\\S]*?<\\/ins>/gi, "");
        html = html.replace(/<iframe\\b[^>]*src=["']([^"']+)["'][^>]*>[\\s\\S]*?<\\/iframe>/gi, function (m, src) {
          return SRC_PATTERNS.some(function (re) { return re.test(src); }) ? "" : m;
        });
        html = html.replace(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi, function (full, attrs, body) {
          var srcMatch = attrs.match(/\\bsrc\\s*=\\s*["']([^"']+)["']/i);
          if (srcMatch && srcMatch[1]) {
            return SRC_PATTERNS.some(function (re) { return re.test(srcMatch[1]); }) ? "" : full;
          }
          if (body && INLINE_PATTERNS.some(function (re) { return re.test(body); })) {
            return "";
          }
          return full;
        });

        var hasBase = /<base\\b[^>]*href=/i.test(html);
        var baseTag = hasBase ? "" : '<base href="' + getBaseDir(sourceUrl) + '">';
        var injection = baseTag + "\\n" + AD_PRELUDE + "\\n";

        if (/<head\\b[^>]*>/i.test(html)) {
          if (hasBase) {
            html = html.replace(/(<base\\b[^>]*>)/i, "$1\\n" + AD_PRELUDE);
          } else {
            html = html.replace(/(<head\\b[^>]*>)/i, "$1\\n" + injection);
          }
        } else if (/<html\\b[^>]*>/i.test(html)) {
          html = html.replace(/(<html\\b[^>]*>)/i, "$1\\n<head>" + injection + "</head>");
        } else {
          html = "<!DOCTYPE html><html><head>" + injection + "</head><body>" + html + "</body></html>";
        }
        return html;
      }

      async function launchGame(game) {
        currentGame = game;
        var reqId = ++activeRequestId;
        playerShell.classList.add("active");
        nowPlaying.textContent = game.title;
        errorBox.classList.remove("visible");
        loaderText.textContent = "Loading " + game.title + " (ads disabled)...";
        loader.classList.add("visible");
        frame.removeAttribute("srcdoc");
        renderGrid();
        window.scrollTo({ top: 0, behavior: "smooth" });

        try {
          var res = await fetch(game.url);
          if (!res.ok) throw new Error("HTTP " + res.status);
          var raw = await res.text();
          if (reqId !== activeRequestId) return;
          var cleaned = sanitizeGameHtml(raw, game.url);
          frame.onload = function () {
            if (reqId === activeRequestId) {
              loader.classList.remove("visible");
            }
          };
          frame.srcdoc = cleaned;
        } catch (err) {
          if (reqId !== activeRequestId) return;
          loader.classList.remove("visible");
          errorText.textContent = "Failed to load " + game.title + ": " + (err && err.message ? err.message : "Network error");
          errorBox.classList.add("visible");
        }
      }

      function renderGrid() {
        var q = (searchInput.value || "").trim().toLowerCase();
        var cat = categorySelect.value;
        var filtered = GAMES.filter(function (g) {
          var matchesCat = cat === "ALL" || g.category === cat;
          var matchesQuery = !q || g.title.toLowerCase().includes(q) || g.slug.replace(/-/g, " ").includes(q) || g.category.toLowerCase().includes(q);
          return matchesCat && matchesQuery;
        });

        countLabel.textContent = "Showing " + filtered.length + " of " + GAMES.length + " games";
        grid.innerHTML = "";

        filtered.forEach(function (g) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "game-btn" + (currentGame && currentGame.slug === g.slug ? " active" : "");
          btn.dataset.slug = g.slug;

          var nameSpan = document.createElement("span");
          nameSpan.className = "game-name";
          nameSpan.textContent = g.title;

          var catSpan = document.createElement("span");
          catSpan.className = "game-cat";
          catSpan.textContent = g.category;

          btn.appendChild(nameSpan);
          btn.appendChild(catSpan);
          btn.onclick = function () { launchGame(g); };
          grid.appendChild(btn);
        });
      }

      searchInput.addEventListener("input", renderGrid);
      categorySelect.addEventListener("change", renderGrid);

      reloadBtn.addEventListener("click", function () {
        if (currentGame) launchGame(currentGame);
      });
      retryBtn.addEventListener("click", function () {
        if (currentGame) launchGame(currentGame);
      });
      fullscreenBtn.addEventListener("click", function () {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(function () {});
        } else if (stage.requestFullscreen) {
          stage.requestFullscreen().catch(function () {});
        }
      });
      closeBtn.addEventListener("click", function () {
        activeRequestId++;
        currentGame = null;
        frame.removeAttribute("srcdoc");
        playerShell.classList.remove("active");
        loader.classList.remove("visible");
        errorBox.classList.remove("visible");
        renderGrid();
      });

      renderGrid();
    })();
  </script>
</body>
</html>`;
}

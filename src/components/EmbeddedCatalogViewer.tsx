import React, { useMemo } from "react";

function buildEmbeddedPortalHtml(origin: string): string {
  const safeOrigin = origin.replace(/\/+$/, "");
  const scramjetSrc = safeOrigin ? `${safeOrigin}/scramjet-browser.html` : "/scramjet-browser.html";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>gn-math</title>
  <style>
    :root {
      --primary: #fc2651;
      --primary-hover: #e91e47;
      --primary-glow: rgba(252, 38, 81, 0.18);
      --accent: #8b5cf6;
      --bg: #090d16;
      --bg-secondary: #0f1624;
      --surface: #111827;
      --surface-hover: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: #1f2937;
      --radius: 12px;
      --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.22);
      --shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.38);
      --gradient-primary: linear-gradient(135deg, #fc2651 0%, #e91e47 100%);
    }

    body.light-mode {
      --bg: #f8fafc;
      --bg-secondary: #eef2f7;
      --surface: #ffffff;
      --surface-hover: #f1f5f9;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
      --shadow-lg: 0 10px 24px rgba(15, 23, 42, 0.1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.5;
    }

    header {
      background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg) 100%);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 60;
      backdrop-filter: blur(14px);
    }

    .nav-wrap {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0.75rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.9rem;
      flex-wrap: wrap;
    }

    .nav-left { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .brand { display: flex; align-items: center; gap: 0.55rem; font-size: 1.35rem; font-weight: 800; letter-spacing: -0.025em; cursor: pointer; }
    .brand-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gradient-primary); box-shadow: 0 0 12px var(--primary); }
    .brand span.pink { color: var(--primary); }

    .nav-tabs {
      display: flex;
      gap: 0.35rem;
      background: var(--surface);
      padding: 0.28rem;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      flex-wrap: wrap;
    }

    .nav-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.48rem 0.92rem;
      border-radius: 9px;
      font-weight: 600;
      font-size: 0.87rem;
      cursor: pointer;
    }

    .nav-btn:hover { color: var(--text); background: var(--surface-hover); }
    .nav-btn.active { background: var(--gradient-primary); color: #fff; box-shadow: 0 4px 12px var(--primary-glow); }

    .nav-right { display: flex; align-items: center; gap: 0.5rem; }
    .icon-btn { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 0.48rem 0.78rem; border-radius: 9px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
    .icon-btn:hover { border-color: var(--primary); background: var(--surface-hover); }

    main { max-width: 1320px; width: 100%; margin: 0 auto; padding: 1.35rem 1.25rem 4rem; flex: 1; }
    .view { display: none; }
    .view.active { display: block; }

    .section-banner {
      display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 0.95rem 1.15rem; margin-bottom: 1.15rem;
    }
    .section-banner h2 { font-size: 1.08rem; font-weight: 700; }
    .section-banner p { color: var(--text-muted); font-size: 0.84rem; margin-top: 0.15rem; }

    .toolbar { display: flex; gap: 0.65rem; margin-bottom: 1rem; flex-wrap: wrap; align-items: center; }
    input[type="text"], select {
      background: var(--surface); border: 1px solid var(--border); color: var(--text);
      padding: 0.65rem 0.95rem; border-radius: 10px; font-size: 0.92rem; outline: none;
    }
    input[type="text"] { flex: 1; min-width: 220px; }
    input[type="text"]:focus, select:focus { border-color: var(--primary); }

    .btn {
      background: var(--gradient-primary); color: #fff; border: none; padding: 0.65rem 1.1rem;
      border-radius: 10px; font-weight: 600; font-size: 0.88rem; cursor: pointer; white-space: nowrap;
    }
    .btn.secondary { background: var(--surface); border: 1px solid var(--border); color: var(--text); }
    .btn.secondary:hover { border-color: var(--primary); background: var(--surface-hover); }
    .btn.chip { padding: 0.42rem 0.82rem; font-size: 0.8rem; border-radius: 8px; }
    .btn.chip.active { background: var(--gradient-primary); border-color: transparent; color: #fff; }
    .pill-row { display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 1rem; }
    .status-text { color: var(--text-muted); font-size: 0.86rem; font-weight: 500; margin-bottom: 0.95rem; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 1rem; }
    .movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .card {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
      overflow: hidden; cursor: pointer; display: flex; flex-direction: column;
    }
    .card:hover { transform: translateY(-3px); border-color: var(--primary); }
    .card-thumb { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; background: var(--bg-secondary); }
    .movie-thumb { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; background: var(--bg-secondary); }
    .card-body { padding: 0.72rem 0.8rem; display: flex; align-items: center; justify-content: space-between; gap: 0.45rem; }
    .card-meta-col { padding: 0.8rem 0.9rem; display: flex; flex-direction: column; gap: 0.35rem; flex: 1; }
    .card-title { font-size: 0.9rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card-sub { font-size: 0.78rem; color: var(--text-muted); }
    .star { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.05rem; }
    .star.fav { color: #fbbf24; }

    .music-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 1.15rem; }
    @media (max-width: 860px) { .music-grid { grid-template-columns: 1fr; } }
    .panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.2rem; }
    .panel h3 { font-size: 1.02rem; margin-bottom: 0.75rem; font-weight: 700; }

    .result-list { display: flex; flex-direction: column; gap: 0.8rem; }
    .result-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.15rem; display: flex; gap: 1rem; }
    .book-cover-sm { width: 64px; height: 92px; object-fit: cover; border-radius: 8px; }
    .result-main { flex: 1; min-width: 0; }
    .result-item h4 { color: var(--text); font-size: 1rem; margin-bottom: 0.25rem; cursor: pointer; }
    .result-meta { font-size: 0.78rem; color: var(--primary); font-weight: 600; margin-bottom: 0.35rem; }
    .result-item p { color: var(--text-muted); font-size: 0.88rem; }

    .scramjet-frame-shell { width: 100%; height: calc(100vh - 180px); min-height: 520px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface); }
    #scramjetPortalFrame { width: 100%; height: 100%; border: none; display: block; background: var(--bg); }

    #overlay { position: fixed; inset: 0; background: var(--bg); z-index: 250; display: none; flex-direction: column; }
    .overlay-bar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 0.65rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
    .overlay-badge { font-size: 0.72rem; font-weight: 700; padding: 0.18rem 0.55rem; border-radius: 6px; background: var(--primary-glow); color: var(--primary); text-transform: uppercase; }
    .overlay-actions { display: flex; gap: 0.45rem; }
    #overlayFrame { flex: 1; width: 100%; border: none; background: #000; display: none; }
    #movieBox { flex: 1; background: #05070b; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 1rem; }
    #movieVideo { max-width: 1100px; width: 100%; max-height: calc(100vh - 150px); border-radius: 12px; }
    #readerBox { flex: 1; overflow-y: auto; display: none; padding: 2rem 1.25rem; }
    .reader-inner { max-width: 760px; margin: 0 auto; line-height: 1.82; white-space: pre-wrap; }
  </style>
</head>
<body>
  <header>
    <div class="nav-wrap">
      <div class="nav-left">
        <div class="brand" onclick="switchTab('modules')">
          <span class="brand-dot"></span>
          <span>gn<span class="pink">-math</span></span>
        </div>
        <nav class="nav-tabs">
          <button type="button" class="nav-btn active" data-nav="modules" onclick="switchTab('modules', this)">Games</button>
          <button type="button" class="nav-btn" data-nav="music" onclick="switchTab('music', this)">Music</button>
          <button type="button" class="nav-btn" data-nav="books" onclick="switchTab('books', this)">Books &amp; Manga</button>
          <button type="button" class="nav-btn" data-nav="movies" onclick="switchTab('movies', this)">Movies</button>
          <button type="button" class="nav-btn" data-nav="search" onclick="switchTab('search', this)">Omni-Search</button>
        </nav>
      </div>
      <div class="nav-right">
        <button type="button" class="icon-btn" onclick="switchTab('movies')">Movies</button>
        <button type="button" class="icon-btn" onclick="switchTab('search')">Omni-Search</button>
        <button type="button" class="icon-btn" onclick="togglePortalTheme()">Theme</button>
      </div>
    </div>
  </header>

  <main>
    <section id="view-modules" class="view active">
      <div class="toolbar">
        <input type="text" id="moduleSearch" placeholder="Search games..." oninput="renderModules()">
        <select id="moduleSort" onchange="renderModules()">
          <option value="default">Featured</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="fav">Favorites</option>
        </select>
      </div>
      <div id="moduleStatus" class="status-text">Loading catalog...</div>
      <div id="moduleGrid" class="grid"></div>
    </section>

    <section id="view-music" class="view">
      <div class="music-grid">
        <div class="panel">
          <h3>SoundCloud Playlist &amp; Track Player</h3>
          <div class="toolbar">
            <input type="text" id="scUrl" placeholder="Paste SoundCloud URL...">
            <button type="button" class="btn" onclick="loadSoundCloud()">Load</button>
          </div>
          <div class="pill-row">
            <button type="button" class="btn secondary chip" onclick="setSC('https://soundcloud.com/lofi-girl-music/sets/lofi-hip-hop-beats')">Lo-Fi</button>
            <button type="button" class="btn secondary chip" onclick="setSC('https://soundcloud.com/synthwave-radio/sets/synthwave')">Synthwave</button>
            <button type="button" class="btn secondary chip" onclick="setSC('https://soundcloud.com/nocopyrightsounds/sets/ncs-best-of')">Game OST</button>
          </div>
          <iframe id="scFrame" width="100%" height="320" scrolling="no" frameborder="no" allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Flofi-girl-music%2Fsets%2Flofi-hip-hop-beats&color=%23fc2651&auto_play=false&visual=true">
          </iframe>
        </div>
        <div class="panel">
          <h3>Offline Synth &amp; Local Audio</h3>
          <div class="pill-row">
            <button type="button" class="btn" id="synthBtn" onclick="toggleSynth()">Start Lo-Fi Synth</button>
          </div>
          <input type="file" accept="audio/*" onchange="playLocalAudio(this)" style="margin-bottom:0.75rem;">
          <audio id="localPlayer" controls style="width:100%;"></audio>
        </div>
      </div>
    </section>

    <section id="view-books" class="view">
      <div class="toolbar">
        <input type="text" id="bookQuery" placeholder="Search 70,000+ classics..." onkeydown="if(event.key==='Enter') searchBooks()">
        <button type="button" class="btn" onclick="searchBooks()">Search Books</button>
      </div>
      <div id="bookStatus" class="status-text">Search Gutendex public-domain books.</div>
      <div id="bookResults" class="result-list"></div>
    </section>

    <section id="view-movies" class="view">
      <div class="toolbar">
        <input type="text" id="movieQuery" placeholder="Search classic public-domain movies..." onkeydown="if(event.key==='Enter') searchMovies()">
        <button type="button" class="btn" onclick="searchMovies()">Find Movies</button>
      </div>
      <div id="movieStatus" class="status-text">Featured cinema ready to stream.</div>
      <div id="movieGrid" class="movie-grid"></div>
    </section>

    <section id="view-search" class="view">
      <div class="section-banner">
        <div>
          <h2>Omni-Search</h2>
          <p>Multi-tab fullscreen Omni-Search powered by BareMux + Epoxy Wisp + Scramjet v2</p>
        </div>
        <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
          <button type="button" class="btn secondary chip" onclick="fullscreenOmniSearch()">&#9974; Fullscreen</button>
          <button type="button" class="btn chip" onclick="switchTab('movies')">&#127916; Change to Movie</button>
        </div>
      </div>
      <div class="scramjet-frame-shell" id="omniShellWrap">
        <iframe id="scramjetPortalFrame" title="Omni-Search Browser" src="${scramjetSrc}" allow="autoplay; keyboard; gamepad; fullscreen" referrerpolicy="no-referrer"></iframe>
      </div>
    </section>
  </main>

  <div id="overlay">
    <div class="overlay-bar">
      <div><span class="overlay-badge" id="overlayKind">Portal</span> <strong id="overlayTitle"></strong></div>
      <div class="overlay-actions">
        <button type="button" class="btn secondary chip" onclick="closeOverlay(); switchTab('movies');">Movies</button>
        <button type="button" class="btn chip" onclick="closeOverlay()">Close</button>
      </div>
    </div>
    <iframe id="overlayFrame" allow="autoplay; keyboard; gamepad; fullscreen"></iframe>
    <div id="movieBox"><video id="movieVideo" controls playsinline></video></div>
    <div id="readerBox"><div id="readerInner" class="reader-inner"></div></div>
  </div>

  <script>
    var memStore = {};
    var safeLS = {
      get: function(k, fb) { try { var v = localStorage.getItem(k); if (v !== null) return v; } catch (e) {} return memStore[k] || fb; },
      set: function(k, v) { memStore[k] = String(v); try { localStorage.setItem(k, String(v)); } catch (e) {} }
    };
    var ZONES_URLS = ['https://cdn.jsdelivr.net/gh/freebuisness/assets@main/zones.json', 'https://fastly.jsdelivr.net/gh/freebuisness/assets@main/zones.json'];
    var COVER_BASE = 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main';
    var HTML_BASE = 'https://cdn.jsdelivr.net/gh/freebuisness/html@main';
    var allModules = [];
    var moduleFavs = [];
    try { moduleFavs = JSON.parse(safeLS.get('euler_favs', '') || safeLS.get('gn_favs', '[]')); } catch (e) {}
    var booksLoaded = false, moviesLoaded = false;

    function switchTab(tabKey, btn) {
      var targetTab = tabKey === 'games' ? 'modules' : tabKey;
      document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
      document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
      var v = document.getElementById('view-' + targetTab);
      if (v) v.classList.add('active');
      var b = btn || document.querySelector('.nav-btn[data-nav="' + targetTab + '"]');
      if (b) b.classList.add('active');
      if (targetTab === 'books' && !booksLoaded) { booksLoaded = true; searchBooks('classic'); }
      if (targetTab === 'movies' && !moviesLoaded) { moviesLoaded = true; loadCuratedMovies(); }
    }

    async function loadModules() {
      for (var i = 0; i < ZONES_URLS.length; i++) {
        try {
          var res = await fetch(ZONES_URLS[i]);
          if (!res.ok) continue;
          var data = await res.json();
          allModules = data.filter(function(z) { return z && z.url && !z.url.startsWith('http'); }).map(function(z) {
            return { name: z.name || 'Untitled', cover: (z.cover || '').replace('{COVER_URL}', COVER_BASE), url: (z.url || '').replace('{HTML_URL}', HTML_BASE) };
          });
          renderModules();
          return;
        } catch (e) {}
      }
    }

    function renderModules() {
      var q = document.getElementById('moduleSearch').value.toLowerCase().trim();
      var sort = document.getElementById('moduleSort').value;
      var list = allModules.filter(function(g) { return g.name.toLowerCase().indexOf(q) !== -1; });
      if (sort === 'fav') list = list.filter(function(g) { return moduleFavs.indexOf(g.name) !== -1; });
      else if (sort === 'az') list.sort(function(a, b) { return a.name.localeCompare(b.name); });
      else if (sort === 'za') list.sort(function(a, b) { return b.name.localeCompare(a.name); });
      document.getElementById('moduleStatus').textContent = 'Showing ' + list.length + ' games';
      var grid = document.getElementById('moduleGrid');
      grid.innerHTML = '';
      list.forEach(function(g) {
        var c = document.createElement('div');
        c.className = 'card';
        c.onclick = function() { openModule(g); };
        c.innerHTML = '<img class="card-thumb" src="' + g.cover + '" loading="lazy"><div class="card-body"><span class="card-title"></span><button type="button" class="star">★</button></div>';
        c.querySelector('.card-title').textContent = g.name;
        var star = c.querySelector('.star');
        if (moduleFavs.indexOf(g.name) !== -1) star.classList.add('fav');
        star.onclick = function(e) {
          e.stopPropagation();
          moduleFavs = moduleFavs.indexOf(g.name) !== -1 ? moduleFavs.filter(function(f) { return f !== g.name; }) : moduleFavs.concat([g.name]);
          safeLS.set('euler_favs', JSON.stringify(moduleFavs));
          renderModules();
        };
        grid.appendChild(c);
      });
    }

    function openModule(g) {
      showOverlay('frame', 'Game', g.name);
      var f = document.getElementById('overlayFrame');
      fetch(g.url).then(function(r) { return r.text(); }).then(function(h) {
        f.srcdoc = '<base href="' + HTML_BASE + '/">' + h;
      }).catch(function() { f.removeAttribute('srcdoc'); f.src = g.url; });
    }

    function setSC(url) {
      document.getElementById('scFrame').src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&color=%23fc2651&auto_play=true&visual=true';
    }
    function loadSoundCloud() {
      var u = document.getElementById('scUrl').value.trim();
      if (u) setSC(u);
    }
    function playLocalAudio(inp) {
      if (inp.files && inp.files[0]) {
        var p = document.getElementById('localPlayer');
        p.src = URL.createObjectURL(inp.files[0]);
        p.play().catch(function() {});
      }
    }
    var synthOn = false, sCtx = null, sInt = null;
    function toggleSynth() {
      var btn = document.getElementById('synthBtn');
      if (synthOn) { synthOn = false; clearInterval(sInt); btn.textContent = 'Start Lo-Fi Synth'; return; }
      var C = window.AudioContext || window.webkitAudioContext;
      if (!sCtx && C) sCtx = new C();
      if (!sCtx) return;
      sCtx.resume();
      synthOn = true;
      btn.textContent = 'Stop Lo-Fi Synth';
      var playNote = function() {
        [261.6, 329.6, 392.0, 493.8].forEach(function(freq) {
          var o = sCtx.createOscillator(), g = sCtx.createGain();
          o.type = 'triangle'; o.frequency.value = freq;
          g.gain.setValueAtTime(0.03, sCtx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.0001, sCtx.currentTime + 2.2);
          o.connect(g); g.connect(sCtx.destination);
          o.start(); o.stop(sCtx.currentTime + 2.3);
        });
      };
      playNote();
      sInt = setInterval(playNote, 2400);
    }

    async function searchBooks(qOverride) {
      var q = typeof qOverride === 'string' ? qOverride : (document.getElementById('bookQuery').value.trim() || 'classic');
      var res = await fetch('https://gutendex.com/books?search=' + encodeURIComponent(q));
      var data = await res.json();
      var list = document.getElementById('bookResults');
      list.innerHTML = '';
      (data.results || []).slice(0, 15).forEach(function(b) {
        var item = document.createElement('div');
        item.className = 'result-item';
        var txtUrl = b.formats && (b.formats['text/plain; charset=utf-8'] || b.formats['text/plain']);
        var h4 = document.createElement('h4');
        h4.textContent = b.title;
        h4.onclick = async function() {
          showOverlay('reader', 'Reader', b.title);
          document.getElementById('readerInner').textContent = 'Loading...';
          if (txtUrl) {
            var r = await fetch('https://corsproxy.io/?' + encodeURIComponent(txtUrl));
            document.getElementById('readerInner').textContent = await r.text();
          }
        };
        item.appendChild(h4);
        list.appendChild(item);
      });
    }

    function loadCuratedMovies() {
      var movies = [
        { id: 'night_of_the_living_dead', title: 'Night of the Living Dead (1968)' },
        { id: 'The_General_1926', title: 'The General (1926)' },
        { id: 'SteamboatWillie', title: 'Steamboat Willie (1928)' },
        { id: 'Charade_1963', title: 'Charade (1963)' }
      ];
      renderMovies(movies);
    }
    async function searchMovies() {
      var q = document.getElementById('movieQuery').value.trim();
      if (!q) return loadCuratedMovies();
      var r = await fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(q + ' AND mediatype:movies') + '&fl[]=identifier,title&rows=18&output=json');
      var d = await r.json();
      renderMovies(((d.response && d.response.docs) || []).map(function(x) { return { id: x.identifier, title: x.title || x.identifier }; }));
    }
    function renderMovies(movies) {
      var grid = document.getElementById('movieGrid');
      grid.innerHTML = '';
      movies.forEach(function(m) {
        var c = document.createElement('div');
        c.className = 'card';
        c.onclick = function() {
          showOverlay('frame', 'Cinema', m.title);
          var f = document.getElementById('overlayFrame');
          f.removeAttribute('srcdoc');
          f.src = 'https://archive.org/embed/' + encodeURIComponent(m.id);
        };
        c.innerHTML = '<img class="movie-thumb" src="https://archive.org/services/img/' + encodeURIComponent(m.id) + '" loading="lazy"><div class="card-meta-col"><div class="card-title"></div></div>';
        c.querySelector('.card-title').textContent = m.title;
        grid.appendChild(c);
      });
    }

    function togglePortalTheme() {
      document.body.classList.toggle('light-mode');
      var f = document.getElementById('scramjetPortalFrame');
      if (f && f.contentWindow) {
        try {
          f.contentWindow.postMessage({ type: 'scramjet-theme', light: document.body.classList.contains('light-mode') }, '*');
        } catch (e) {}
      }
    }

    function fullscreenOmniSearch() {
      var target = document.getElementById('scramjetPortalFrame') || document.getElementById('omniShellWrap');
      if (target && target.requestFullscreen) {
        target.requestFullscreen().catch(function() {});
      }
    }

    window.addEventListener('message', function(ev) {
      if (!ev || !ev.data) return;
      if (ev.data.type === 'gn-switch-tab' && typeof ev.data.tab === 'string') {
        switchTab(ev.data.tab);
      } else if (ev.data.type === 'omni-fullscreen-toggle' && ev.data.active) {
        fullscreenOmniSearch();
      }
    });

    function showOverlay(mode, kind, title) {
      document.getElementById('overlayKind').textContent = kind;
      document.getElementById('overlayTitle').textContent = title;
      document.getElementById('overlayFrame').style.display = mode === 'frame' ? 'block' : 'none';
      document.getElementById('movieBox').style.display = mode === 'movie' ? 'flex' : 'none';
      document.getElementById('readerBox').style.display = mode === 'reader' ? 'block' : 'none';
      document.getElementById('overlay').style.display = 'flex';
    }
    function closeOverlay() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('overlayFrame').src = 'about:blank';
    }
    loadModules();
  </script>
</body>
</html>`;
}

export function EmbeddedCatalogViewer() {
  const html = useMemo(() => {
    const origin =
      typeof window !== "undefined" &&
      window.location.origin &&
      window.location.origin !== "null" &&
      window.location.protocol.startsWith("http")
        ? window.location.origin
        : "";
    return buildEmbeddedPortalHtml(origin);
  }, []);

  return (
    <iframe
      title="Embedded Portal"
      srcDoc={html}
      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      allow="autoplay; keyboard; gamepad; fullscreen"
    />
  );
}

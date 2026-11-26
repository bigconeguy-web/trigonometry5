let scramjet = null;

try {
  importScripts("/baremux/index.js");
} catch (err) {
  console.error("BareMux worker bundle init failed safely:", err);
}

try {
  importScripts("/scram/scramjet.all.js");
  if (typeof $scramjetLoadWorker === "function") {
    const { ScramjetServiceWorker } = $scramjetLoadWorker();
    scramjet = new ScramjetServiceWorker();
  }
} catch (err) {
  console.error("Scramjet worker init failed safely:", err);
  scramjet = null;
}

const HOP_BY_HOP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-connection",
  "transfer-encoding",
  "te",
  "upgrade",
  "content-length",
  "http2-settings",
]);

let bareClientInstance = null;
let libcurlBridgeAdapter = null;

function getBareClient() {
  if (bareClientInstance) return bareClientInstance;
  if (typeof BareMux !== "undefined" && typeof BareMux.BareClient === "function") {
    bareClientInstance = new BareMux.BareClient("/baremux/worker.js");
  }
  return bareClientInstance;
}

function sanitizeLibcurlHeaders(rawHeaders) {
  const entries = [];
  if (!rawHeaders) return entries;
  if (typeof rawHeaders.forEach === "function" && typeof rawHeaders.get === "function") {
    rawHeaders.forEach((value, key) => {
      const lower = String(key || "").toLowerCase();
      if (!lower || HOP_BY_HOP_REQUEST_HEADERS.has(lower)) return;
      entries.push([lower, String(value)]);
    });
    return entries;
  }
  if (Array.isArray(rawHeaders)) {
    for (let i = 0; i < rawHeaders.length; i++) {
      const pair = rawHeaders[i];
      if (!Array.isArray(pair) || pair.length < 2) continue;
      const lower = String(pair[0] || "").toLowerCase();
      if (!lower || HOP_BY_HOP_REQUEST_HEADERS.has(lower)) continue;
      entries.push([lower, String(pair[1])]);
    }
    return entries;
  }
  if (typeof rawHeaders === "object") {
    const keys = Object.keys(rawHeaders);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const lower = String(key || "").toLowerCase();
      if (!lower || HOP_BY_HOP_REQUEST_HEADERS.has(lower)) continue;
      const val = rawHeaders[key];
      if (val === undefined || val === null) continue;
      if (Array.isArray(val)) {
        for (let j = 0; j < val.length; j++) {
          entries.push([lower, String(val[j])]);
        }
      } else {
        entries.push([lower, String(val)]);
      }
    }
  }
  return entries;
}

function normalizeResponseRawHeaders(rawHeaders, fallbackHeaders) {
  const out = {};
  const appendPair = (k, v) => {
    const key = String(k || "").toLowerCase();
    if (!key) return;
    if (Object.prototype.hasOwnProperty.call(out, key)) {
      if (Array.isArray(out[key])) {
        out[key].push(String(v));
      } else {
        out[key] = [out[key], String(v)];
      }
    } else {
      out[key] = String(v);
    }
  };
  if (Array.isArray(rawHeaders)) {
    for (let i = 0; i < rawHeaders.length; i++) {
      const entry = rawHeaders[i];
      if (Array.isArray(entry) && entry.length >= 2) {
        appendPair(entry[0], entry[1]);
      }
    }
  } else if (rawHeaders && typeof rawHeaders === "object") {
    const keys = Object.keys(rawHeaders);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const v = rawHeaders[k];
      if (Array.isArray(v)) {
        for (let j = 0; j < v.length; j++) appendPair(k, v[j]);
      } else if (v !== undefined && v !== null) {
        appendPair(k, v);
      }
    }
  } else if (fallbackHeaders && typeof fallbackHeaders.forEach === "function") {
    fallbackHeaders.forEach((v, k) => appendPair(k, v));
  }
  return out;
}

async function requestWindowEnsureTransport() {
  try {
    if (typeof BroadcastChannel === "function") {
      const bc = new BroadcastChannel("bare-mux");
      bc.postMessage({ type: "refreshPort" });
      bc.close();
    }
  } catch (_e) {}
  try {
    const winClients = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });
    for (let i = 0; i < winClients.length; i++) {
      try {
        winClients[i].postMessage({ scramjet$type: "ensureLibcurlTransport" });
      } catch (_e) {}
    }
  } catch (_e) {}
  await new Promise((resolve) => setTimeout(resolve, 350));
}

function isRecoverableBareMuxError(err) {
  const msg = String((err && (err.message || err.cause)) || err || "");
  return /no bare clients|No BareTransport|Invalid MessagePort|timeout/i.test(msg);
}

function createLibcurlEpoxyAdapter() {
  if (libcurlBridgeAdapter) return libcurlBridgeAdapter;
  const client = getBareClient();
  if (!client) return null;

  libcurlBridgeAdapter = {
    async fetch(input, init = {}) {
      const urlStr =
        typeof input === "string"
          ? input
          : input && typeof input.href === "string"
          ? input.href
          : input && typeof input.url === "string"
          ? input.url
          : String(input);
      const method = String(init.method || "GET").toUpperCase();
      const headerEntries = sanitizeLibcurlHeaders(init.headers);

      let preparedBody = undefined;
      if (init.body !== undefined && init.body !== null && method !== "GET" && method !== "HEAD") {
        if (
          init.body instanceof ArrayBuffer ||
          ArrayBuffer.isView(init.body) ||
          typeof init.body === "string"
        ) {
          preparedBody = init.body;
        } else {
          preparedBody = await new Response(init.body).arrayBuffer();
        }
      }

      const executeFetch = async () => {
        const res = await client.fetch(urlStr, {
          method,
          headers: headerEntries,
          body: preparedBody,
          redirect: "manual",
        });
        const normalizedRaw = normalizeResponseRawHeaders(res.rawHeaders, res.headers);
        try {
          Object.defineProperty(res, "rawHeaders", {
            value: normalizedRaw,
            configurable: true,
            writable: true,
          });
        } catch (_e) {
          res.rawHeaders = normalizedRaw;
        }
        try {
          if (!res.finalURL) {
            res.finalURL = urlStr;
          }
        } catch (_e) {}
        return res;
      };

      try {
        return await executeFetch();
      } catch (err) {
        if (isRecoverableBareMuxError(err)) {
          await requestWindowEnsureTransport();
          return await executeFetch();
        }
        throw err;
      }
    },
  };
  return libcurlBridgeAdapter;
}

function bindLibcurlBridge() {
  if (!scramjet) return false;
  const adapter = createLibcurlEpoxyAdapter();
  if (!adapter) return false;
  scramjet.epoxy = adapter;
  scramjet.initEpoxy = async () => {
    scramjet.epoxy = adapter;
    return adapter;
  };
  return true;
}

bindLibcurlBridge();

const SCRAM_DB_NAME = "$scramjet";
const REQUIRED_STORES = [
  "config",
  "cookies",
  "redirectTrackers",
  "referrerPolicies",
  "publicSuffixList",
];

const STATIC_SCRAM_ASSETS = new Set([
  "/scram/scramjet.all.js",
  "/scram/scramjet.all.js.map",
  "/scram/scramjet.bundle.js",
  "/scram/scramjet.bundle.js.map",
  "/scram/scramjet.sync.js",
  "/scram/scramjet.sync.js.map",
]);

function isStaticScramAsset(pathname) {
  if (STATIC_SCRAM_ASSETS.has(pathname)) return true;
  if (/^\/scram\/[0-9a-f]{16}\.wasm$/i.test(pathname)) return true;
  return false;
}

function isIdbNotFoundError(err) {
  if (!err) return false;
  const name = String(err.name || "");
  const msg = String(err.message || err || "");
  return (
    name === "NotFoundError" ||
    /NotFoundError|IDBDatabase|object store/i.test(msg)
  );
}

function deleteScramjetDatabase() {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.deleteDatabase(SCRAM_DB_NAME);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
      req.onblocked = () => resolve(false);
    } catch (_e) {
      resolve(false);
    }
  });
}

function validateScramjetDatabase() {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok) => {
      if (!settled) {
        settled = true;
        resolve(ok);
      }
    };
    try {
      const req = indexedDB.open(SCRAM_DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const storeName of REQUIRED_STORES) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        }
      };
      req.onsuccess = async () => {
        const db = req.result;
        const missing = REQUIRED_STORES.some(
          (storeName) => !db.objectStoreNames.contains(storeName)
        );
        try {
          db.close();
        } catch (_e) {}
        if (missing) {
          await deleteScramjetDatabase();
          finish(false);
          return;
        }
        finish(true);
      };
      req.onerror = async () => {
        await deleteScramjetDatabase();
        finish(false);
      };
    } catch (_e) {
      finish(false);
    }
  });
}

async function safeLoadScramjetConfig() {
  if (!scramjet) return false;
  if (scramjet.config && scramjet.config.prefix) {
    return true;
  }
  try {
    await validateScramjetDatabase();
    await scramjet.loadConfig();
    return Boolean(scramjet.config && scramjet.config.prefix);
  } catch (err) {
    if (isIdbNotFoundError(err)) {
      scramjet.config = undefined;
      await deleteScramjetDatabase();
    }
    return false;
  }
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await validateScramjetDatabase();
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (!event || !event.data) return;
  const replyPort = event.ports && event.ports[0];

  if (event.data.scramjet$type === "pingStatus") {
    if (replyPort) {
      try {
        replyPort.postMessage({
          ok: Boolean(scramjet),
          hasConfig: Boolean(scramjet && scramjet.config && scramjet.config.codec),
          wisp: scramjet && scramjet.config ? scramjet.config.wisp : null,
        });
      } catch (_e) {}
    }
    return;
  }

  if (!scramjet) {
    if (replyPort) {
      try {
        replyPort.postMessage({ ok: false, error: "Scramjet worker failed to load" });
      } catch (_e) {}
    }
    return;
  }

  if (event.data.scramjet$type === "resetDB") {
    scramjet.config = undefined;
    bindLibcurlBridge();
    event.waitUntil(
      (async () => {
        const deleted = await deleteScramjetDatabase();
        if (replyPort) {
          try { replyPort.postMessage({ ok: deleted }); } catch (_e) {}
        }
      })()
    );
    return;
  }

  if (event.data.scramjet$type === "reloadConfigFromIDB") {
    scramjet.config = undefined;
    event.waitUntil(
      (async () => {
        const loaded = await safeLoadScramjetConfig();
        const libcurlOk = bindLibcurlBridge();
        if (replyPort) {
          try {
            replyPort.postMessage({
              ok: Boolean(loaded && scramjet.config && scramjet.config.codec && libcurlOk),
              hasCodec: Boolean(scramjet.config && scramjet.config.codec),
              libcurlOk,
              transport: "libcurl",
              wisp: scramjet.config ? scramjet.config.wisp : null,
            });
          } catch (_e) {}
        }
      })()
    );
  }
});

function buildSwErrorResponse(status, title, detail) {
  const safeTitle = String(title || "Proxy Error").replace(/[<>&"]/g, "");
  const safeDetail = String(detail || "").replace(/[<>&"]/g, "");
  const html =
    "<!DOCTYPE html><html><head><meta charset='utf-8'><title>" +
    safeTitle +
    "</title></head><body style='margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#090d16;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;padding:24px;'>" +
    "<div style='max-width:460px;background:#111827;border:1px solid #1f2937;border-radius:12px;padding:20px;'>" +
    "<h2 style='margin:0 0 8px;font-size:16px;color:#fb7185;'>" +
    safeTitle +
    "</h2>" +
    "<p style='margin:0;font-size:13px;line-height:1.5;color:#94a3b8;'>" +
    safeDetail +
    "</p></div></body></html>";
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

self.addEventListener("fetch", (event) => {
  if (!scramjet) return;

  let reqUrl;
  try {
    reqUrl = new URL(event.request.url);
  } catch (_e) {
    return;
  }

  // Only handle Scramjet /scram/ proxy routes; never intercept the main app shell or static assets
  if (
    reqUrl.origin !== self.location.origin ||
    !reqUrl.pathname.startsWith("/scram/") ||
    isStaticScramAsset(reqUrl.pathname)
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      const configReady = await safeLoadScramjetConfig();
      if (!configReady || !scramjet.config || !scramjet.config.codec) {
        return buildSwErrorResponse(
          503,
          "Proxy Session Initializing",
          "Scramjet configuration is not loaded yet. Click Retry or submit your URL again."
        );
      }

      bindLibcurlBridge();

      try {
        if (scramjet.route(event)) {
          return await scramjet.fetch(event);
        }
      } catch (err) {
        if (isIdbNotFoundError(err)) {
          scramjet.config = undefined;
          bindLibcurlBridge();
          await deleteScramjetDatabase();
        }
        return buildSwErrorResponse(
          502,
          "Unable to Reach Target Page",
          err && err.message ? err.message : String(err)
        );
      }

      return buildSwErrorResponse(
        502,
        "Unrouted Proxy Request",
        "Scramjet did not match this proxy route. Reset storage or retry your navigation."
      );
    })()
  );
});

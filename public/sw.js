let scramjet = null;

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
    scramjet.epoxy = undefined;
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
    scramjet.epoxy = undefined;
    event.waitUntil(
      (async () => {
        const loaded = await safeLoadScramjetConfig();
        let epoxyOk = false;
        if (loaded && typeof scramjet.initEpoxy === "function") {
          try {
            await scramjet.initEpoxy();
            epoxyOk = true;
          } catch (err) {
            console.warn("Scramjet Epoxy reload warning:", err);
          }
        }
        if (replyPort) {
          try {
            replyPort.postMessage({
              ok: Boolean(loaded && scramjet.config && scramjet.config.codec),
              hasCodec: Boolean(scramjet.config && scramjet.config.codec),
              epoxyOk,
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

      try {
        if (scramjet.route(event)) {
          return await scramjet.fetch(event);
        }
      } catch (err) {
        if (isIdbNotFoundError(err)) {
          scramjet.config = undefined;
          scramjet.epoxy = undefined;
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

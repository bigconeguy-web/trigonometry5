import http from "node:http";
import * as wispModule from "@mercuryworkshop/wisp-js/server";

const wisp = wispModule.server || wispModule.default || wispModule;
const PORT = Number(process.env.PORT) || 8080;

const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Wisp server is running!");
});

server.on("upgrade", (req, socket, head) => {
  const reqUrl = req.url || "/";
  if (reqUrl.startsWith("/wisp/") || reqUrl === "/wisp") {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Wisp server listening on port ${PORT}`);
});

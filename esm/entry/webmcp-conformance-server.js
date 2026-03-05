import { BrowserModelContextServer } from "out-root/webmcp.js";
import { createServer as createMCPServer } from "out-root/conformance-server.js";

class WebMCPServer extends BrowserModelContextServer {
  constructor(serverInfo, options) {
    super(serverInfo, { ...(options ?? {}), native: navigator.modelContext });
  }
}

export function createServer() {
  return createMCPServer({}, WebMCPServer);
}

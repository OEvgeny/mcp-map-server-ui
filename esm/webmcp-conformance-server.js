// entry/webmcp-conformance-server.js
import { BrowserModelContextServer } from "./webmcp.js";
import { createServer as createMCPServer } from "./conformance-server.js";
var WebMCPServer = class extends BrowserModelContextServer {
  constructor(serverInfo, options) {
    super(serverInfo, { ...options ?? {}, native: navigator.modelContext });
  }
};
function createServer() {
  return createMCPServer({}, WebMCPServer);
}
export {
  createServer
};
//# sourceMappingURL=webmcp-conformance-server.js.map

// entry/index.js
import { MessagePortServerTransport } from "./mcp.js";
import { createServer as createMCPServer } from "./server.js";
async function startMessageChannelServer(port) {
  await createMCPServer().connect(new MessagePortServerTransport(port));
}
export {
  startMessageChannelServer
};
//# sourceMappingURL=index.js.map

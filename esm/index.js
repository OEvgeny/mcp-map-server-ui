// entry/index.js
import { MessagePortServerTransport } from "./mcp.js";
async function startMessageChannelServer(port, createMCPServer) {
  await createMCPServer().connect(new MessagePortServerTransport(port));
}
export {
  startMessageChannelServer
};
//# sourceMappingURL=index.js.map

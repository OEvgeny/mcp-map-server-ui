import { MessagePortServerTransport } from "out-root/mcp.js";
import { createServer as createMCPServer } from 'out-root/server.js';

export async function startMessageChannelServer(port) {
  await createMCPServer().connect(new MessagePortServerTransport(port));
}

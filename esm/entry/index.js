import { MessagePortServerTransport } from "out-root/mcp.js";

export async function startMessageChannelServer(port, createMCPServer) {
  await createMCPServer().connect(new MessagePortServerTransport(port));
}

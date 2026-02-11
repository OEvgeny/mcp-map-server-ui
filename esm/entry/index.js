import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer as createMCPServer } from 'out-root/server.js';
import { Buffer } from "node:process";

Object.assign(window, { Buffer });

/**
 * Starts an MCP server with stdio transport.
 *
 * @param createServer - Factory function that creates a new McpServer instance.
 */
export async function startStdioServer(
    createServer/*: () => McpServer*/ = createMCPServer,
)/*: Promise<void>*/ {
  console.log("Starting in STDIO mode");
  await createServer().connect(new StdioServerTransport());
}

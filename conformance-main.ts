/**
 * Entry point for the MCP Conformance Tests server.
 * Run with: node dist/conformance-index.js
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { createServer } from "./conformance-server.js";

interface Session {
  transport: StreamableHTTPServerTransport;
  server: McpServer;
}

export async function startStreamableHTTPServer(
  createServer: () => McpServer,
): Promise<void> {
  const port = parseInt(process.env.PORT ?? "3002", 10);

  const sessions = new Map<string, Session>();

  const app = createMcpExpressApp({ host: "0.0.0.0" });
  app.use(cors({
    exposedHeaders: ["mcp-session-id"],
  }));

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: "healthy",
      service: "MCP Conformance Server",
      port: port,
      timestamp: new Date().toISOString()
    });
  });

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  // CORS test endpoint for Domain & CORS conformance tests
  const DECLARED_DOMAIN = process.env.DECLARED_DOMAIN || "mcp-conformance.test";

  app.options("/cors-test", (req: Request, res: Response) => {
    const origin = req.headers.origin || "";
    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.status(204).end();
  });

  app.get("/cors-test", (req: Request, res: Response) => {
    const origin = req.headers.origin || "";
    const expected = `https://${DECLARED_DOMAIN}`;
    res.set({ "Access-Control-Allow-Origin": origin });
    res.json({ origin, expected, match: origin === expected });
  });

  app.all("/mcp", async (req: Request, res: Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    const method = (req.body as { method?: string })?.method ?? "-";
    console.log(`[REQ] ${req.method} session=${sessionId ?? "none"} method=${method} known=${sessionId ? sessions.has(sessionId) : false}`);

    if (sessionId && sessions.has(sessionId)) {
      const session = sessions.get(sessionId)!;
      try {
        await session.transport.handleRequest(req, res, req.body);
      } catch (error) {
        console.error("[ERROR] existing session:", error);
        if (!res.headersSent) {
          res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
        }
      }
      return;
    }

    if (req.method === "GET") {
      console.log("[REQ] GET with no/unknown session → 405");
      res.status(405).json({ error: "Method Not Allowed: GET requires a valid Mcp-Session-Id" });
      return;
    }

    if (sessionId && !sessions.has(sessionId)) {
      console.log(`[REQ] POST with unknown session ${sessionId} → 404 (server restarted?)`);
      res.status(404).json({ jsonrpc: "2.0", error: { code: -32001, message: "Session not found — please re-initialise" }, id: null });
      return;
    }

    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (newSessionId) => {
        sessions.set(newSessionId, { transport, server });
      },
    });

    transport.onclose = () => {
      const id = transport.sessionId;
      if (id) {
        sessions.delete(id);
      }
    };

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("[ERROR] new session:", error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        });
      }
    }
  });

  const httpServer = app.listen(port, "0.0.0.0", () => {
    console.log(`=== MCP Conformance Server Started ===`);
    console.log(`Port: ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`Health: http://localhost:${port}/health`);
    console.log(`MCP Endpoint: http://localhost:${port}/mcp`);
    console.log(`======================================`);
  });

  const shutdown = () => {
    console.log("\nShutting down...");
    httpServer.close(() => process.exit(0));
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

export async function startStdioServer(
  createServer: () => McpServer,
): Promise<void> {
  await createServer().connect(new StdioServerTransport());
}

process.on("unhandledRejection", (reason) => {
  console.error("[UNHANDLED REJECTION]", reason instanceof Error ? reason.stack ?? reason.message : reason);
});

process.on("uncaughtException", (err) => {
  console.error("[UNCAUGHT EXCEPTION]", err.stack ?? err.message);
});

async function main() {
  const isStdio = process.argv.includes("--stdio");
  const log = isStdio ? console.error : console.log;

  log("Starting MCP Conformance Server...");
  log("Node version:", process.version);
  log("PORT env:", process.env.PORT || "not set (using 3002)");
  log("Args:", process.argv);

  if (isStdio) {
    log("Starting in STDIO mode");
    await startStdioServer(() => createServer({ stdio: true }));
  } else {
    log("Starting in HTTP mode");
    await startStreamableHTTPServer(createServer);
  }
}

main().catch((e) => {
  console.error("=== STARTUP ERROR ===");
  console.error(e);
  console.error("====================");
  process.exit(1);
});

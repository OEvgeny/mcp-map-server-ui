/**
 * MCP Conformance Tests Server
 *
 * Provides tools for 5 conformance test apps:
 * - Lifecycle, Host Context, Messaging, Domain & CORS, Theming
 * Plus server-only tools: echo-tool, slow-task, slow-echo
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod/v4";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
  RESOURCE_URI_META_KEY,
} from "@modelcontextprotocol/ext-apps/server";
import { randomUUID } from "crypto";

if (!('process' in globalThis)) {
  (globalThis as any).process = { env: {} };
}

// Server-side logger — always use stderr so stdio mode isn't corrupted
const log = {
  tool: (name: string, input: Record<string, unknown>) =>
    console.error(`[TOOL] ${name} called`, Object.keys(input).length ? JSON.stringify(input) : ""),
  done: (name: string, summary?: string) =>
    console.error(`[TOOL] ${name} done${summary ? ` — ${summary}` : ""}`),
  error: (name: string, err: unknown) =>
    console.error(`[ERROR] ${name} failed:`, err instanceof Error ? err.stack ?? err.message : err),
  notify: (method: string) =>
    console.error(`[NOTIFY] sent ${method}`),
};

// Works both from source (conformance-server.ts) and compiled (dist/conformance-server.js)
const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;

const LIFECYCLE_RESOURCE_URI = "ui://lifecycle-test/lifecycle-app.html";
const HOST_CONTEXT_RESOURCE_URI = "ui://host-context-test/host-context-app.html";
const MESSAGING_RESOURCE_URI = "ui://messaging-test/messaging-app.html";
const DOMAIN_CORS_RESOURCE_URI = "ui://domain-cors-test/domain-cors-app.html";
const THEMING_RESOURCE_URI = "ui://theming-test/theming-app.html";

const DECLARED_DOMAIN = process.env.DECLARED_DOMAIN || "mcp-conformance.test";

export function createServer(options?: { stdio?: boolean }, ServerCtr = McpServer): McpServer {
  const isStdio = options?.stdio ?? false;
  const server = new ServerCtr({
    name: "MCP Conformance Tests",
    version: "1.0.0",
  });

  // --- Conformance Resources ---

  registerAppResource(server, LIFECYCLE_RESOURCE_URI, LIFECYCLE_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(path.join(DIST_DIR, "apps/lifecycle/lifecycle-app.html"), "utf-8");
      return { contents: [{ uri: LIFECYCLE_RESOURCE_URI, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    },
  );

  registerAppResource(server, HOST_CONTEXT_RESOURCE_URI, HOST_CONTEXT_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(path.join(DIST_DIR, "apps/host-context/host-context-app.html"), "utf-8");
      return { contents: [{ uri: HOST_CONTEXT_RESOURCE_URI, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    },
  );

  registerAppResource(server, MESSAGING_RESOURCE_URI, MESSAGING_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(path.join(DIST_DIR, "apps/messaging/messaging-app.html"), "utf-8");
      return { contents: [{ uri: MESSAGING_RESOURCE_URI, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    },
  );

  const domainCorsCspMeta = {
    ui: {
      domain: DECLARED_DOMAIN,
      csp: {
        connectDomains: [`http://localhost:${process.env.PORT ?? "3002"}`],
      },
    },
  };

  registerAppResource(server, DOMAIN_CORS_RESOURCE_URI, DOMAIN_CORS_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(path.join(DIST_DIR, "apps/domain-cors/domain-cors-app.html"), "utf-8");
      return {
        contents: [{
          uri: DOMAIN_CORS_RESOURCE_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: html,
          ...(!isStdio && { _meta: domainCorsCspMeta }),
        }],
      };
    },
  );

  registerAppResource(server, THEMING_RESOURCE_URI, THEMING_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(path.join(DIST_DIR, "apps/theming/theming-app.html"), "utf-8");
      return {
        contents: [{
          uri: THEMING_RESOURCE_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: html,
          _meta: { ui: { prefersBorder: true } },
        }],
      };
    },
  );

  // --- Conformance App Tools ---

  registerAppTool(server, "show-lifecycle", {
    title: "Show Lifecycle Tests",
    description: "Display MCP Apps §3 Lifecycle conformance tests.",
    inputSchema: {
      greeting: z.string().optional().default("hello").describe("Greeting passed in args"),
    },
    _meta: { [RESOURCE_URI_META_KEY]: LIFECYCLE_RESOURCE_URI },
  }, async ({ greeting }): Promise<CallToolResult> => {
    log.tool("show-lifecycle", { greeting });
    return {
      content: [{ type: "text" as const, text: `Lifecycle tests launched (greeting: ${greeting})` }],
      _meta: { viewUUID: randomUUID(), greeting },
    };
  });

  registerAppTool(server, "show-host-context", {
    title: "Show Host Context Tests",
    description: "Display MCP Apps §4 HostContext conformance tests.",
    inputSchema: {},
    _meta: { [RESOURCE_URI_META_KEY]: HOST_CONTEXT_RESOURCE_URI },
  }, async (): Promise<CallToolResult> => {
    log.tool("show-host-context", {});
    return {
      content: [{ type: "text" as const, text: "Host Context tests launched" }],
      _meta: { viewUUID: randomUUID() },
    };
  });

  registerAppTool(server, "show-messaging", {
    title: "Show Messaging Tests",
    description: "Display MCP Apps §5 View→Host messaging conformance tests.",
    inputSchema: {},
    _meta: { [RESOURCE_URI_META_KEY]: MESSAGING_RESOURCE_URI },
  }, async (): Promise<CallToolResult> => {
    log.tool("show-messaging", {});
    return {
      content: [{ type: "text" as const, text: "Messaging tests launched" }],
      _meta: { viewUUID: randomUUID() },
    };
  });

  registerAppTool(server, "show-domain-cors", {
    title: "Show Domain & CORS Tests",
    description: "Display MCP Apps §2.4 Domain & CORS conformance tests.",
    inputSchema: {},
    _meta: { [RESOURCE_URI_META_KEY]: DOMAIN_CORS_RESOURCE_URI },
  }, async (): Promise<CallToolResult> => {
    const port = process.env.PORT ?? "3002";
    const corsTestUrl = `http://localhost:${port}/cors-test`;
    log.tool("show-domain-cors", { corsTestUrl, expectedDomain: DECLARED_DOMAIN });
    return {
      content: [{ type: "text" as const, text: `Domain & CORS tests launched (domain: ${DECLARED_DOMAIN})` }],
      _meta: { viewUUID: randomUUID(), corsTestUrl, expectedDomain: DECLARED_DOMAIN },
    };
  });

  registerAppTool(server, "show-theming", {
    title: "Show Theming Tests",
    description: "Display MCP Apps §4.5 CSS Variables & Theming conformance tests.",
    inputSchema: {},
    _meta: { [RESOURCE_URI_META_KEY]: THEMING_RESOURCE_URI },
  }, async (): Promise<CallToolResult> => {
    log.tool("show-theming", {});
    return {
      content: [{ type: "text" as const, text: "Theming tests launched" }],
      _meta: { viewUUID: randomUUID() },
    };
  });

  // --- Server-only Tools (no UI) ---

  server.registerTool("echo-tool", {
    title: "Echo Tool",
    description: "Echoes the provided message back. Used by conformance tests.",
    inputSchema: {
      message: z.string().describe("Message to echo"),
    },
  }, async ({ message }): Promise<CallToolResult> => {
    log.tool("echo-tool", { message });
    return {
      content: [{ type: "text" as const, text: `echo: ${message}` }],
    };
  });

  server.registerTool("slow-task", {
    title: "Slow Task",
    description: "Runs for a specified duration, sending progress notifications. Supports cancellation via signal.",
    inputSchema: {
      durationMs: z.number().min(100).max(60000).describe("Duration in milliseconds"),
    },
  }, async ({ durationMs }, extra): Promise<CallToolResult> => {
    log.tool("slow-task", { durationMs });
    const steps = 10;
    const stepMs = durationMs / steps;
    const progressToken = extra._meta?.progressToken;

    for (let i = 1; i <= steps; i++) {
      await new Promise<void>((r) => setTimeout(r, stepMs));
      if (extra.signal?.aborted) {
        return { content: [{ type: "text" as const, text: `Aborted after step ${i - 1}/${steps}` }] };
      }
      if (progressToken !== undefined) {
        await extra.sendNotification({
          method: "notifications/progress",
          params: { progressToken, progress: i, total: steps, message: `Step ${i}/${steps}` },
        });
      }
    }
    return { content: [{ type: "text" as const, text: `Completed ${steps} steps in ${durationMs}ms` }] };
  });

  server.registerTool("slow-echo", {
    title: "Slow Echo",
    description: "Echoes a message after a delay with progress notifications. Supports cancellation.",
    inputSchema: {
      message: z.string().describe("Message to echo"),
      durationMs: z.number().min(100).max(60000).optional().default(3000).describe("Duration in ms"),
    },
  }, async ({ message, durationMs }, extra): Promise<CallToolResult> => {
    log.tool("slow-echo", { message, durationMs });
    const steps = 5;
    const stepMs = durationMs / steps;
    const progressToken = extra._meta?.progressToken;

    for (let i = 1; i <= steps; i++) {
      await new Promise<void>((r) => setTimeout(r, stepMs));
      if (extra.signal?.aborted) {
        return { content: [{ type: "text" as const, text: `Aborted echo after step ${i - 1}/${steps}` }] };
      }
      if (progressToken !== undefined) {
        await extra.sendNotification({
          method: "notifications/progress",
          params: { progressToken, progress: i, total: steps, message: `Processing ${i}/${steps}` },
        });
      }
    }
    return { content: [{ type: "text" as const, text: `echo: ${message}` }] };
  });

  // --- Notification Tools ---

  server.registerTool(
    "test-resources-notification",
    {
      title: "Test Resources Notification",
      description:
        "Triggers a resources/list_changed notification to demonstrate dynamic resource list updates.",
      inputSchema: {},
    },
    async (): Promise<CallToolResult> => {
      log.tool("test-resources-notification", {});
      try {
        await server.server.notification({
          method: "notifications/resources/list_changed",
          params: {},
        });
        log.notify("notifications/resources/list_changed");
        return {
          content: [{ type: "text", text: "Sent resources/list_changed notification." }],
        };
      } catch (err) {
        log.error("test-resources-notification", err);
        throw err;
      }
    }
  );

  server.registerTool(
    "test-tools-notification",
    {
      title: "Test Tools Notification",
      description:
        "Triggers a tools/list_changed notification to demonstrate dynamic tool list updates.",
      inputSchema: {},
    },
    async (): Promise<CallToolResult> => {
      log.tool("test-tools-notification", {});
      try {
        await server.server.notification({
          method: "notifications/tools/list_changed",
          params: {},
        });
        log.notify("notifications/tools/list_changed");
        return {
          content: [{ type: "text", text: "Sent tools/list_changed notification." }],
        };
      } catch (err) {
        log.error("test-tools-notification", err);
        throw err;
      }
    }
  );

  return server;
}

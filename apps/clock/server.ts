/**
 * Clock MCP Server
 *
 * Provides tools for:
 * - show-clock: Display an interactive clock timer UI
 * - run-clock: Server-side tick engine with progress notifications
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
  RESOURCE_URI_META_KEY,
} from "@modelcontextprotocol/ext-apps/server";

const log = {
  tool: (name: string, input: Record<string, unknown>) =>
    console.log(`[TOOL] ${name} called`, Object.keys(input).length ? JSON.stringify(input) : ""),
  done: (name: string, summary?: string) =>
    console.log(`[TOOL] ${name} done${summary ? ` — ${summary}` : ""}`),
  error: (name: string, err: unknown) =>
    console.error(`[ERROR] ${name} failed:`, err instanceof Error ? err.stack ?? err.message : err),
  tick: (i: number, total: number) =>
    console.log(`[CLOCK] tick ${i}/${total}`),
};

const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;
const CLOCK_RESOURCE_URI = "ui://clock-timer/clock-app.html";

export function createServer(): McpServer {
  const server = new McpServer(
    {
      name: "Clock Timer Server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: { listChanged: true },
        resources: { listChanged: true },
      },
    }
  );

  registerAppResource(
    server,
    CLOCK_RESOURCE_URI,
    CLOCK_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      try {
        const html = await fs.readFile(
          path.join(DIST_DIR, "clock-app.html"),
          "utf-8",
        );
        return {
          contents: [
            {
              uri: CLOCK_RESOURCE_URI,
              mimeType: RESOURCE_MIME_TYPE,
              text: html,
            },
          ],
        };
      } catch (err) {
        log.error("resource:clock-app.html", err);
        throw err;
      }
    },
  );

  registerAppTool(
    server,
    "show-clock",
    {
      title: "Show Clock",
      description:
        "Display an interactive clock timer that ticks for a configurable number of ticks at a set interval. Uses MCP progress notifications to stream each tick to the UI in real time. The user can also adjust settings and start/stop the clock from the UI.",
      inputSchema: {
        ticks: z
          .number()
          .int()
          .min(1)
          .max(30)
          .optional()
          .default(10)
          .describe("Number of ticks to count (1–30, default 10)"),
        intervalSeconds: z
          .number()
          .min(0.1)
          .max(30)
          .optional()
          .default(1)
          .describe("Seconds between each tick (0.1–30, default 1)"),
      },
      _meta: { [RESOURCE_URI_META_KEY]: CLOCK_RESOURCE_URI },
    },
    async ({ ticks, intervalSeconds }): Promise<CallToolResult> => {
      log.tool("show-clock", { ticks, intervalSeconds });
      try {
        const result = {
          content: [
            {
              type: "text" as const,
              text: `Showing clock timer: ${ticks} tick${ticks !== 1 ? "s" : ""} at ${intervalSeconds}s intervals. Click "Start Clock" in the UI to begin.`,
            },
          ],
          _meta: { ticks, intervalSeconds },
        };
        log.done("show-clock", `${ticks} ticks @ ${intervalSeconds}s`);
        return result;
      } catch (err) {
        log.error("show-clock", err);
        throw err;
      }
    },
  );

  server.registerTool(
    "run-clock",
    {
      title: "Run Clock",
      description:
        "Execute the clock timer: tick N times with a given interval, sending a notifications/progress message for each tick. Called by the show-clock UI app — pass a progressToken in _meta to receive real-time tick notifications.",
      inputSchema: {
        ticks: z
          .number()
          .int()
          .min(1)
          .max(30)
          .describe("Number of ticks to perform (1–30)"),
        intervalMs: z
          .number()
          .min(100)
          .max(30000)
          .describe("Milliseconds to wait between ticks (100–30000)"),
      },
    },
    async ({ ticks, intervalMs }, extra): Promise<CallToolResult> => {
      const clampedTicks = Math.min(30, Math.max(1, ticks));
      const progressToken = extra._meta?.progressToken;
      log.tool("run-clock", { ticks: clampedTicks, intervalMs, hasProgressToken: progressToken !== undefined });
      try {
        for (let i = 1; i <= clampedTicks; i++) {
          await new Promise<void>((resolve) => setTimeout(resolve, intervalMs));

          if (extra.signal?.aborted) {
            console.log(`[CLOCK] aborted after ${i - 1}/${clampedTicks} ticks`);
            return {
              content: [
                {
                  type: "text",
                  text: `Clock stopped after ${i - 1} of ${clampedTicks} ticks.`,
                },
              ],
            };
          }

          if (progressToken !== undefined) {
            log.tick(i, clampedTicks);
            await extra.sendNotification({
              method: "notifications/progress",
              params: {
                progressToken,
                progress: i,
                total: clampedTicks,
                message: `Tick ${i} of ${clampedTicks}`,
              },
            });
          }
        }

        log.done("run-clock", `${clampedTicks} ticks completed`);
        return {
          content: [
            {
              type: "text",
              text: `Clock completed: ${clampedTicks} tick${clampedTicks !== 1 ? "s" : ""} at ${intervalMs}ms intervals.`,
            },
          ],
        };
      } catch (err) {
        log.error("run-clock", err);
        throw err;
      }
    },
  );

  return server;
}

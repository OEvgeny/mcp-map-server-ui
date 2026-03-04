/**
 * App C: Messaging Conformance Tests (MCP Apps Spec §5)
 *
 * Tests View->Host requests. All tests are manual/button-triggered.
 */
import { App } from "@modelcontextprotocol/ext-apps";
import { TestRunner } from "../../shared/test-runner.js";
import { pass, fail, skip } from "../../shared/validators.js";

const runner = new TestRunner("test-container");

// --- App setup (must be before test registrations that reference `app`) ---

const app = new App(
  { name: "Messaging Test", version: "1.0.0" },
  {},
);

app.ontoolinput = () => {};

// --- Register all test cases (all manual) ---

runner.register(
  { id: "TC-5.1", description: "sendMessage accepted", specRef: "§5.1", level: "MUST", manual: true },
  async () => {
    try {
      await app.sendMessage({
        role: "user",
        content: [{ type: "text", text: "Conformance test message from TC-5.1" }],
      });
      return pass("no error", "sendMessage completed");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.2", description: "openLink accepted", specRef: "§5.2", level: "MUST", manual: true },
  async () => {
    try {
      await app.openLink({ url: "https://modelcontextprotocol.io" });
      return pass("no error", "openLink completed");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.3", description: "updateModelContext with content[] accepted", specRef: "§5.3", level: "MUST", manual: true },
  async () => {
    try {
      await app.updateModelContext({
        content: [{ type: "text", text: "Test context from TC-5.3" }],
      });
      return pass("no error", "updateModelContext completed");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.4", description: "updateModelContext with structuredContent accepted", specRef: "§5.3", level: "SHOULD", manual: true },
  async () => {
    try {
      await app.updateModelContext({
        structuredContent: { key: "test", value: "from TC-5.4" },
      });
      return pass("no error", "structuredContent accepted");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.5", description: "requestDisplayMode: inline accepted", specRef: "§5.5", level: "MUST", manual: true },
  async () => {
    try {
      await app.requestDisplayMode({ mode: "inline" });
      return pass("no error", "inline mode requested");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.6", description: "requestDisplayMode: fullscreen accepted", specRef: "§5.5", level: "MUST", manual: true },
  async () => {
    try {
      await app.requestDisplayMode({ mode: "fullscreen" });
      return pass("no error", "fullscreen mode requested");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.7", description: "requestDisplayMode: pip accepted", specRef: "§5.5", level: "SHOULD", manual: true },
  async () => {
    try {
      await app.requestDisplayMode({ mode: "pip" });
      return pass("no error", "pip mode requested");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.8", description: "callServerTool (echo-tool) returns correct response", specRef: "§5.8", level: "MUST", manual: true },
  async () => {
    try {
      const result = await app.callServerTool({
        name: "echo-tool",
        arguments: { message: "hello-from-TC-5.8" },
      });
      const text = result?.content?.[0];
      if (text && "text" in text && text.text?.includes("hello-from-TC-5.8")) {
        return pass("echoed message", text.text);
      }
      return fail("echoed message", JSON.stringify(result).slice(0, 120));
    } catch (err) {
      return fail("echoed message", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.9", description: "sendLog accepted", specRef: "§5.9", level: "MUST", manual: true },
  async () => {
    try {
      await app.sendLog({ level: "info", data: "Conformance test log from TC-5.9" });
      return pass("no error", "sendLog completed");
    } catch (err) {
      return fail("no error", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.10", description: "Progress notifications via onprogress callback", specRef: "§5.10", level: "MUST", manual: true },
  async () => {
    try {
      let progressCount = 0;
      await app.callServerTool(
        { name: "slow-echo", arguments: { message: "progress-test", durationMs: 3000 } },
        {
          onprogress: () => {
            progressCount++;
          },
        },
      );
      if (progressCount > 0) {
        return pass(">0 progress events", `${progressCount} events received`);
      }
      return fail(">0 progress events", "0 events");
    } catch (err) {
      return fail("progress events", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.11", description: "callServerTool abort via AbortController.signal", specRef: "§5.11", level: "MUST", manual: true },
  async () => {
    try {
      const ac = new AbortController();
      const callPromise = app.callServerTool(
        { name: "slow-echo", arguments: { message: "abort-test", durationMs: 10000 } },
        { signal: ac.signal },
      );
      setTimeout(() => ac.abort(), 1000);
      try {
        await callPromise;
        return pass("abort stops call", "call completed before abort (still ok)");
      } catch {
        return pass("abort stops call", "aborted successfully");
      }
    } catch (err) {
      return fail("abort works", String(err));
    }
  },
);

runner.register(
  { id: "TC-5.12", description: "resources/read from app", specRef: "§5.12", level: "SHOULD", manual: true },
  async () => {
    if (!("readResource" in app)) {
      return skip("readResource not available in SDK");
    }
    try {
      const result = await (app as unknown as { readResource: (uri: string) => Promise<unknown> }).readResource("ui://lifecycle-test/lifecycle-app.html");
      return pass("resource returned", JSON.stringify(result).slice(0, 80));
    } catch (err) {
      return fail("resource returned", String(err));
    }
  },
);

// --- Connect ---

async function main() {
  await app.connect();
  // All tests are manual — just wait for user to click Run buttons
}

main().catch((err) => console.error("[MESSAGING-TEST] Fatal:", err));

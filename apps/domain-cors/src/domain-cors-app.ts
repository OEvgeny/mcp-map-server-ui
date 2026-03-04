/**
 * App D: Domain & CORS Conformance Tests (MCP Apps Spec §2.4)
 *
 * Verifies that the host serves the app from the declared domain
 * and that CSP connectDomains are honored.
 */
import { App } from "@modelcontextprotocol/ext-apps";
import { TestRunner } from "../../shared/test-runner.js";
import { pass, fail, skip } from "../../shared/validators.js";

const runner = new TestRunner("test-container");

let corsTestUrl = "";
let expectedDomain = "";

// --- Register test cases ---

runner.register(
  { id: "TC-2.4.1", description: "Resource _meta.ui.domain declared", specRef: "§2.4", level: "MUST" },
  () => ({ status: "pending" }),
);

runner.register(
  { id: "TC-2.4.2", description: "connectDomains CSP allows CORS endpoint", specRef: "§2.4", level: "MUST" },
  () => ({ status: "pending" }),
);

runner.register(
  { id: "TC-2.4.3", description: "CORS fetch succeeds AND origin matches declared domain", specRef: "§2.4", level: "MUST", manual: true },
  async () => {
    if (!corsTestUrl) {
      return fail("corsTestUrl from tool result", "not received");
    }
    try {
      const resp = await fetch(corsTestUrl);
      if (!resp.ok) {
        return fail("200 OK", `${resp.status} ${resp.statusText}`);
      }
      const data = await resp.json() as { origin: string; expected: string; match: boolean };
      // TC-2.4.2: if we got here, the CSP allowed the fetch
      runner.resolve("TC-2.4.2", pass("fetch allowed", `origin: ${data.origin}`));

      if (data.match) {
        return pass(`origin === ${data.expected}`, `origin: ${data.origin}`);
      } else {
        return fail(`origin === ${data.expected}`, `origin: ${data.origin} (mismatch — host likely did not serve from declared domain)`);
      }
    } catch (err) {
      return fail("CORS fetch succeeds", String(err));
    }
  },
);

runner.register(
  { id: "TC-2.4.4", description: "Fetch to non-allowlisted domain blocked by CSP", specRef: "§2.4", level: "SHOULD", manual: true },
  async () => {
    try {
      const resp = await fetch("https://httpbin.org/get");
      // If it succeeded, CSP didn't block it
      if (resp.ok) {
        return fail("fetch blocked by CSP", `fetch succeeded (${resp.status}) — CSP may not be enforced`);
      }
      return pass("fetch blocked", `status: ${resp.status}`);
    } catch {
      // Network error = CSP blocked or CORS blocked
      return pass("fetch blocked", "network error (CSP or CORS blocked)");
    }
  },
);

// --- App setup ---

const app = new App(
  { name: "Domain CORS Test", version: "1.0.0" },
  {},
);

app.ontoolinput = (input) => {
  // Extract corsTestUrl and expectedDomain from tool input arguments
  const args = input?.arguments as Record<string, unknown> | undefined;
  if (args?.corsTestUrl) corsTestUrl = String(args.corsTestUrl);
  if (args?.expectedDomain) expectedDomain = String(args.expectedDomain);
};

app.ontoolresult = (result) => {
  // Also check tool result _meta for corsTestUrl and expectedDomain
  const meta = result?._meta as Record<string, unknown> | undefined;
  if (meta?.corsTestUrl) corsTestUrl = String(meta.corsTestUrl);
  if (meta?.expectedDomain) expectedDomain = String(meta.expectedDomain);

  // TC-2.4.1: if expectedDomain was provided, the server declared it
  if (expectedDomain) {
    runner.resolve("TC-2.4.1", pass("domain declared", expectedDomain));
  } else {
    runner.resolve("TC-2.4.1", fail("domain in _meta", "not found in tool result"));
  }
};

async function main() {
  await app.connect();

  // If tool result already arrived (via ontoolresult), tests will resolve.
  // Give a brief delay for initial data
  setTimeout(() => {
    // Check if TC-2.4.1 is still pending
    const r = runner.getResult("TC-2.4.1");
    if (!r || r.status === "pending") {
      // Try to read from the URL
      if (expectedDomain) {
        runner.resolve("TC-2.4.1", pass("domain declared", expectedDomain));
      } else {
        runner.resolve("TC-2.4.1", skip("expectedDomain not received from tool result"));
      }
    }
    // TC-2.4.2 will resolve when TC-2.4.3 runs
    const r2 = runner.getResult("TC-2.4.2");
    if (!r2 || r2.status === "pending") {
      runner.resolve("TC-2.4.2", skip("Run TC-2.4.3 to verify"));
    }
  }, 2000);
}

main().catch((err) => console.error("[DOMAIN-CORS-TEST] Fatal:", err));

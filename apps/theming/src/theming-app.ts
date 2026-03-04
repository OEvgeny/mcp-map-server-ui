/**
 * App E: Theming Conformance Tests (MCP Apps Spec §4.5)
 *
 * Tests CSS custom properties and theming variables injected by the host.
 */
import { App } from "@modelcontextprotocol/ext-apps";
import { TestRunner } from "../../shared/test-runner.js";
import { pass, fail, skip, isCssColor, isCssLength, isCssFontFamily } from "../../shared/validators.js";

const runner = new TestRunner("test-container");

// Background color variables
const bgVars = [
  { id: "TC-4.5.1", name: "--color-background-primary", label: "background-primary" },
  { id: "TC-4.5.2", name: "--color-background-secondary", label: "background-secondary" },
  { id: "TC-4.5.3", name: "--color-background-tertiary", label: "background-tertiary" },
  { id: "TC-4.5.4", name: "--color-background-inverse", label: "background-inverse" },
  { id: "TC-4.5.5", name: "--color-background-ghost", label: "background-ghost" },
  { id: "TC-4.5.6", name: "--color-background-info", label: "background-info" },
  { id: "TC-4.5.7", name: "--color-background-danger", label: "background-danger" },
  { id: "TC-4.5.8", name: "--color-background-success", label: "background-success" },
  { id: "TC-4.5.9", name: "--color-background-warning", label: "background-warning" },
];

// Text color variables
const textVars = [
  { id: "TC-4.5.10", name: "--color-text-primary", label: "text-primary" },
  { id: "TC-4.5.11", name: "--color-text-secondary", label: "text-secondary" },
  { id: "TC-4.5.12", name: "--color-text-tertiary", label: "text-tertiary" },
  { id: "TC-4.5.13", name: "--color-text-inverse", label: "text-inverse" },
  { id: "TC-4.5.14", name: "--color-text-ghost", label: "text-ghost" },
  { id: "TC-4.5.15", name: "--color-text-info", label: "text-info" },
  { id: "TC-4.5.16", name: "--color-text-danger", label: "text-danger" },
  { id: "TC-4.5.17", name: "--color-text-success", label: "text-success" },
  { id: "TC-4.5.18", name: "--color-text-warning", label: "text-warning" },
];

// Register all CSS var tests
const allColorVars = [...bgVars, ...textVars];
for (const v of allColorVars) {
  runner.register(
    { id: v.id, description: `${v.name} present and valid CSS color`, specRef: "§4.5", level: "SHOULD" },
    () => ({ status: "pending" }),
  );
}

// Font and other tests
runner.register(
  { id: "TC-4.5.19", description: "--font-sans resolved to valid font family", specRef: "§4.5", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.5.20", description: "--font-mono resolved to valid font family", specRef: "§4.5", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.5.21", description: "--border-radius-md is valid CSS length", specRef: "§4.5", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.5.22", description: "styles.css.fonts injected via HostContext", specRef: "§4.5", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.5.23", description: "prefersBorder declared (host-side)", specRef: "§4.5", level: "SHOULD" },
  () => ({ status: "pending" }),
);

// --- App setup ---

const app = new App(
  { name: "Theming Test", version: "1.0.0" },
  {},
);

app.ontoolinput = () => {};

async function runTests() {
  await app.connect();

  // Delay 100ms for host to inject CSS vars
  await new Promise((r) => setTimeout(r, 100));

  const computed = getComputedStyle(document.documentElement);

  // Test color variables
  for (const v of allColorVars) {
    const val = computed.getPropertyValue(v.name).trim();
    if (!val) {
      runner.resolve(v.id, skip(`${v.name} not set`));
    } else if (isCssColor(val)) {
      runner.resolve(v.id, pass("valid CSS color", val));
    } else {
      runner.resolve(v.id, fail("valid CSS color", val));
    }
  }

  // --font-sans
  const fontSans = computed.getPropertyValue("--font-sans").trim();
  if (!fontSans) {
    runner.resolve("TC-4.5.19", skip("--font-sans not set"));
  } else if (isCssFontFamily(fontSans)) {
    runner.resolve("TC-4.5.19", pass("valid font family", fontSans.slice(0, 60)));
  } else {
    runner.resolve("TC-4.5.19", fail("valid font family", fontSans));
  }

  // --font-mono
  const fontMono = computed.getPropertyValue("--font-mono").trim();
  if (!fontMono) {
    runner.resolve("TC-4.5.20", skip("--font-mono not set"));
  } else if (isCssFontFamily(fontMono)) {
    runner.resolve("TC-4.5.20", pass("valid font family", fontMono.slice(0, 60)));
  } else {
    runner.resolve("TC-4.5.20", fail("valid font family", fontMono));
  }

  // --border-radius-md
  const borderRadius = computed.getPropertyValue("--border-radius-md").trim();
  if (!borderRadius) {
    runner.resolve("TC-4.5.21", skip("--border-radius-md not set"));
  } else if (isCssLength(borderRadius)) {
    runner.resolve("TC-4.5.21", pass("valid CSS length", borderRadius));
  } else {
    runner.resolve("TC-4.5.21", fail("valid CSS length", borderRadius));
  }

  // styles.css.fonts from HostContext
  const ctx = app.getHostContext() as Record<string, unknown> | null;
  const styles = ctx?.styles as Record<string, unknown> | undefined;
  const css = styles?.css as Record<string, unknown> | undefined;
  if (css?.fonts) {
    runner.resolve("TC-4.5.22", pass("fonts present", String(css.fonts).slice(0, 60)));
  } else {
    runner.resolve("TC-4.5.22", skip("styles.css.fonts not in HostContext"));
  }

  // prefersBorder — this is a server-side declaration; app can only note it was set
  runner.resolve("TC-4.5.23", skip("prefersBorder is server-side metadata; host verification needed"));
}

runTests().catch((err) => console.error("[THEMING-TEST] Fatal:", err));

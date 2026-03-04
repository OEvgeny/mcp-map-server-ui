/**
 * App B: Host Context Conformance Tests (MCP Apps Spec §4)
 *
 * Tests the shape and completeness of the HostContext object
 * provided by the host after initialization.
 */
import { App } from "@modelcontextprotocol/ext-apps";
import { TestRunner } from "../../shared/test-runner.js";
import {
  pass, fail, skip,
  isBcp47, isIanaTimezone, isNonEmptyString, isBoolean,
} from "../../shared/validators.js";

const runner = new TestRunner("test-container");

// --- Register all test cases ---

runner.register(
  { id: "TC-4.1", description: "theme is 'light' or 'dark'", specRef: "§4.1", level: "MUST" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.2", description: "displayMode is valid enum", specRef: "§4.2", level: "MUST" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.3", description: "availableDisplayModes is non-empty array", specRef: "§4.3", level: "MUST" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.4", description: "locale is BCP 47 format", specRef: "§4.4", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.5", description: "timeZone is IANA format", specRef: "§4.5", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.6", description: "platform is web/desktop/mobile", specRef: "§4.6", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.7", description: "userAgent is non-empty string", specRef: "§4.7", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.8", description: "deviceCapabilities.touch is boolean", specRef: "§4.8", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.9", description: "deviceCapabilities.hover is boolean", specRef: "§4.9", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.10", description: "toolInfo.tool contains tool definition", specRef: "§4.10", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.11", description: "styles.variables is present", specRef: "§4.11", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.12", description: "containerDimensions is present", specRef: "§4.12", level: "SHOULD" },
  () => ({ status: "pending" }),
);
runner.register(
  { id: "TC-4.13", description: "host-context-changed merges partial updates", specRef: "§4.13", level: "SHOULD", manual: true },
  () => ({ status: "pending" }),
);

// --- App setup ---

const app = new App(
  { name: "Host Context Test", version: "1.0.0" },
  {},
);

// Reactive test: TC-4.13
app.onhostcontextchanged = () => {
  runner.resolve("TC-4.13", pass("callback fired", "onhostcontextchanged invoked"));
};

app.ontoolinput = () => {};

async function runTests() {
  await app.connect();
  const ctx = app.getHostContext();
  if (!ctx) {
    runner.resolve("TC-4.1", fail("HostContext object", "null/undefined", "getHostContext() returned nothing"));
    return;
  }

  const hc = ctx as Record<string, unknown>;

  // TC-4.1: theme
  const theme = hc.theme;
  if (theme === "light" || theme === "dark") {
    runner.resolve("TC-4.1", pass("light|dark", String(theme)));
  } else if (theme === undefined) {
    runner.resolve("TC-4.1", fail("light|dark", "undefined"));
  } else {
    runner.resolve("TC-4.1", fail("light|dark", String(theme)));
  }

  // TC-4.2: displayMode
  const dm = hc.displayMode;
  const validModes = ["inline", "fullscreen", "pip"];
  if (typeof dm === "string" && validModes.includes(dm)) {
    runner.resolve("TC-4.2", pass("inline|fullscreen|pip", dm));
  } else if (dm === undefined) {
    runner.resolve("TC-4.2", fail("inline|fullscreen|pip", "undefined"));
  } else {
    runner.resolve("TC-4.2", fail("inline|fullscreen|pip", String(dm)));
  }

  // TC-4.3: availableDisplayModes
  const adm = hc.availableDisplayModes;
  if (Array.isArray(adm) && adm.length > 0) {
    runner.resolve("TC-4.3", pass("non-empty array", JSON.stringify(adm)));
  } else if (adm === undefined) {
    runner.resolve("TC-4.3", fail("non-empty array", "undefined"));
  } else {
    runner.resolve("TC-4.3", fail("non-empty array", JSON.stringify(adm)));
  }

  // TC-4.4: locale
  const locale = hc.locale;
  if (locale === undefined) {
    runner.resolve("TC-4.4", skip("locale not provided"));
  } else if (isBcp47(locale)) {
    runner.resolve("TC-4.4", pass("BCP 47", String(locale)));
  } else {
    runner.resolve("TC-4.4", fail("BCP 47", String(locale)));
  }

  // TC-4.5: timeZone
  const tz = hc.timeZone;
  if (tz === undefined) {
    runner.resolve("TC-4.5", skip("timeZone not provided"));
  } else if (isIanaTimezone(tz)) {
    runner.resolve("TC-4.5", pass("IANA tz", String(tz)));
  } else {
    runner.resolve("TC-4.5", fail("IANA tz", String(tz)));
  }

  // TC-4.6: platform
  const platform = hc.platform;
  const validPlatforms = ["web", "desktop", "mobile"];
  if (platform === undefined) {
    runner.resolve("TC-4.6", skip("platform not provided"));
  } else if (typeof platform === "string" && validPlatforms.includes(platform)) {
    runner.resolve("TC-4.6", pass("web|desktop|mobile", platform));
  } else {
    runner.resolve("TC-4.6", fail("web|desktop|mobile", String(platform)));
  }

  // TC-4.7: userAgent
  const ua = hc.userAgent;
  if (ua === undefined) {
    runner.resolve("TC-4.7", skip("userAgent not provided"));
  } else if (isNonEmptyString(ua)) {
    runner.resolve("TC-4.7", pass("non-empty string", ua.slice(0, 60) + (ua.length > 60 ? "..." : "")));
  } else {
    runner.resolve("TC-4.7", fail("non-empty string", String(ua)));
  }

  // TC-4.8: deviceCapabilities.touch
  const dc = hc.deviceCapabilities as Record<string, unknown> | undefined;
  if (!dc) {
    runner.resolve("TC-4.8", skip("deviceCapabilities not provided"));
  } else if (isBoolean(dc.touch)) {
    runner.resolve("TC-4.8", pass("boolean", String(dc.touch)));
  } else {
    runner.resolve("TC-4.8", fail("boolean", String(dc.touch)));
  }

  // TC-4.9: deviceCapabilities.hover
  if (!dc) {
    runner.resolve("TC-4.9", skip("deviceCapabilities not provided"));
  } else if (isBoolean(dc.hover)) {
    runner.resolve("TC-4.9", pass("boolean", String(dc.hover)));
  } else {
    runner.resolve("TC-4.9", fail("boolean", String(dc.hover)));
  }

  // TC-4.10: toolInfo.tool
  const ti = hc.toolInfo as Record<string, unknown> | undefined;
  if (!ti) {
    runner.resolve("TC-4.10", skip("toolInfo not provided"));
  } else if (ti.tool && typeof ti.tool === "object") {
    runner.resolve("TC-4.10", pass("object with tool", JSON.stringify(ti.tool).slice(0, 80)));
  } else {
    runner.resolve("TC-4.10", fail("object with tool", JSON.stringify(ti)));
  }

  // TC-4.11: styles.variables
  const styles = hc.styles as Record<string, unknown> | undefined;
  if (!styles) {
    runner.resolve("TC-4.11", skip("styles not provided"));
  } else if (styles.variables && typeof styles.variables === "object") {
    runner.resolve("TC-4.11", pass("object", `${Object.keys(styles.variables as object).length} keys`));
  } else {
    runner.resolve("TC-4.11", fail("object with variables", JSON.stringify(styles)));
  }

  // TC-4.12: containerDimensions
  const cd = hc.containerDimensions;
  if (cd === undefined) {
    runner.resolve("TC-4.12", skip("containerDimensions not provided"));
  } else if (typeof cd === "object") {
    runner.resolve("TC-4.12", pass("object", JSON.stringify(cd)));
  } else {
    runner.resolve("TC-4.12", fail("object", String(cd)));
  }
}

runTests().catch((err) => {
  console.error("[HOST-CONTEXT-TEST] Fatal:", err);
});

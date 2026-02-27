/**
 * Clock Timer MCP App
 *
 * Displays a ticking clock with a progress bar driven by MCP progress notifications.
 * The user configures the number of ticks (max 30) and interval, then clicks Start.
 * The app calls the server-side "run-clock" tool with an onprogress callback, which
 * receives notifications/progress for each tick and updates the UI in real time.
 */
import { App } from "@modelcontextprotocol/ext-apps";

const log = {
  info: console.log.bind(console, "[CLOCK-APP]"),
  warn: console.warn.bind(console, "[CLOCK-APP]"),
  error: console.error.bind(console, "[CLOCK-APP]"),
};

// Create App instance
const app = new App(
  { name: "Clock Timer", version: "1.0.0" },
  { tools: { listChanged: false } },
  { autoResize: false },
);

// UI element references
const tickCounter = document.getElementById("tick-counter")!;
const tickOf = document.getElementById("tick-of")!;
const progressFill = document.getElementById("progress-fill")!;
const progressPct = document.getElementById("progress-pct")!;
const progressMessage = document.getElementById("progress-message")!;
const statusDot = document.getElementById("status-dot")!;
const statusLabel = document.getElementById("status-label")!;
const ticksInput = document.getElementById("ticks-input") as HTMLInputElement;
const intervalInput = document.getElementById("interval-input") as HTMLInputElement;
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const logList = document.getElementById("log-list")!;
const logEmpty = document.getElementById("log-empty")!;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;

type ClockState = "idle" | "running" | "done" | "error";

let currentState: ClockState = "idle";
let abortController: AbortController | null = null;

/**
 * Clamp and validate an integer tick count (1–30)
 */
function clampTicks(value: number): number {
  return Math.min(30, Math.max(1, Math.round(value)));
}

/**
 * Clamp and validate interval in seconds (0.1–30)
 */
function clampInterval(value: number): number {
  return Math.min(30, Math.max(0.1, value));
}

/**
 * Update the status indicator dot and label
 */
function setStatus(state: ClockState, label: string): void {
  currentState = state;
  statusDot.className = `status-dot ${state}`;
  statusLabel.textContent = label;
}

/**
 * Update the big tick counter with a pulse animation
 */
function updateTickCounter(current: number, total: number): void {
  tickCounter.textContent = String(current);
  tickOf.textContent = `/ ${total} tick${total !== 1 ? "s" : ""}`;

  // Pulse animation
  tickCounter.classList.remove("pulse");
  void tickCounter.offsetWidth; // force reflow
  tickCounter.classList.add("pulse");
}

/**
 * Update the progress bar
 */
function updateProgress(current: number, total: number, message?: string): void {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  progressFill.style.width = `${pct}%`;
  progressPct.textContent = `${pct}%`;

  if (message) {
    progressMessage.textContent = message;
  }
}

/**
 * Set whether the inputs are disabled during a run
 */
function setInputsDisabled(disabled: boolean): void {
  ticksInput.disabled = disabled;
  intervalInput.disabled = disabled;
}

/**
 * Append a tick entry to the log
 */
function appendLogEntry(tickNum: number, total: number, message: string): void {
  // Remove empty placeholder
  if (logEmpty.parentElement) {
    logEmpty.remove();
  }

  const entry = document.createElement("div");
  entry.className = "log-entry";

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  entry.innerHTML = `
    <span class="log-tick-num">#${tickNum}</span>
    <div class="log-entry-body">
      <div class="log-msg">${escapeHtml(message)}</div>
      <div class="log-time">${timeStr} &bull; ${tickNum}/${total}</div>
    </div>
  `;

  logList.appendChild(entry);
  logList.scrollTop = logList.scrollHeight;
}

/**
 * Append a completion or error entry to the log
 */
function appendDoneEntry(text: string, icon: string): void {
  if (logEmpty.parentElement) {
    logEmpty.remove();
  }

  const entry = document.createElement("div");
  entry.className = "log-done-entry";
  entry.innerHTML = `
    <span class="log-done-icon">${icon}</span>
    <span class="log-done-text">${escapeHtml(text)}</span>
  `;
  logList.appendChild(entry);
  logList.scrollTop = logList.scrollHeight;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Reset the display for a new run
 */
function resetDisplay(ticks: number): void {
  updateTickCounter(0, ticks);
  updateProgress(0, ticks, "Starting…");
  progressFill.classList.add("active");
}

/**
 * Start the clock by calling the run-clock server tool with progress tracking
 */
async function startClock(): Promise<void> {
  const rawTicks = parseFloat(ticksInput.value);
  const rawInterval = parseFloat(intervalInput.value);

  if (isNaN(rawTicks) || isNaN(rawInterval)) {
    log.warn("Invalid input values");
    return;
  }

  const ticks = clampTicks(rawTicks);
  const intervalSeconds = clampInterval(rawInterval);
  const intervalMs = Math.round(intervalSeconds * 1000);

  // Update inputs to show clamped values
  ticksInput.value = String(ticks);
  intervalInput.value = String(intervalSeconds);

  // Set up UI for running state
  setStatus("running", "Running");
  setInputsDisabled(true);
  startBtn.className = "start-btn running";
  startBtn.textContent = "⏹ Stop Clock";
  resetDisplay(ticks);

  abortController = new AbortController();

  let tickCount = 0;

  try {
    log.info(`Starting clock: ${ticks} ticks, ${intervalMs}ms interval`);

    const result = await app.callServerTool(
      { name: "run-clock", arguments: { ticks, intervalMs } },
      {
        signal: abortController.signal,
        onprogress: (progress) => {
          tickCount = progress.progress;
          const total = progress.total ?? ticks;
          const message = progress.message ?? `Tick ${tickCount} of ${total}`;

          log.info(`Progress: ${tickCount}/${total} — ${message}`);
          updateTickCounter(tickCount, total);
          updateProgress(tickCount, total, message);
          appendLogEntry(tickCount, total, message);
        },
      },
    );

    if (result.isError) {
      const errorText = result.content
        .filter((c) => c.type === "text")
        .map((c) => (c as { type: "text"; text: string }).text)
        .join(" ");
      throw new Error(errorText || "Tool returned an error");
    }

    // Done!
    setStatus("done", "Done");
    progressFill.classList.remove("active");
    appendDoneEntry(`Completed ${ticks} tick${ticks !== 1 ? "s" : ""} successfully`, "✓");
    log.info("Clock completed successfully");
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      setStatus("idle", "Stopped");
      progressFill.classList.remove("active");
      progressMessage.textContent = "Stopped by user";
      appendDoneEntry("Clock stopped by user", "⏹");
      log.info("Clock stopped by user");
    } else {
      setStatus("error", "Error");
      progressFill.classList.remove("active");
      const msg = error instanceof Error ? error.message : String(error);
      progressMessage.textContent = `Error: ${msg}`;
      appendDoneEntry(`Error: ${msg}`, "✗");
      log.error("Clock error:", error);
    }
  } finally {
    abortController = null;
    setInputsDisabled(false);
    startBtn.className = "start-btn ready";
    startBtn.textContent = "▶ Start Clock";
    startBtn.disabled = false;
  }
}

/**
 * Stop the clock if it is running
 */
function stopClock(): void {
  if (abortController) {
    abortController.abort();
    startBtn.disabled = true;
    startBtn.textContent = "Stopping…";
  }
}

/**
 * Clear the tick log
 */
function clearLog(): void {
  logList.innerHTML = "";
  logList.appendChild(logEmpty);
}

// Button click handler
startBtn.addEventListener("click", () => {
  if (currentState === "running") {
    stopClock();
  } else {
    startClock();
  }
});

// Clear log button
clearBtn.addEventListener("click", clearLog);

// Clamp inputs on blur
ticksInput.addEventListener("blur", () => {
  const v = parseFloat(ticksInput.value);
  if (!isNaN(v)) ticksInput.value = String(clampTicks(v));
});

intervalInput.addEventListener("blur", () => {
  const v = parseFloat(intervalInput.value);
  if (!isNaN(v)) intervalInput.value = String(clampInterval(v));
});

// Handle tool input from show-clock — pre-fill form with server-provided defaults
app.ontoolinput = async (params) => {
  log.info("Received tool input:", params);
  const args = params.arguments as {
    ticks?: number;
    intervalSeconds?: number;
  } | undefined;

  if (args) {
    if (typeof args.ticks === "number") {
      ticksInput.value = String(clampTicks(args.ticks));
    }
    if (typeof args.intervalSeconds === "number") {
      intervalInput.value = String(clampInterval(args.intervalSeconds));
    }
    // Update the tick-of display to reflect new total
    const ticks = clampTicks(parseFloat(ticksInput.value) || 10);
    tickOf.textContent = `/ ${ticks} tick${ticks !== 1 ? "s" : ""}`;
  }
};

app.onerror = log.error;

// Connect to host
async function initialize(): Promise<void> {
  try {
    log.info("Connecting to host…");
    await app.connect();
    log.info("Connected to host");

    // Send preferred height
    app.sendSizeChanged({ height: 520 });
  } catch (error) {
    log.error("Failed to connect:", error);
  }
}

initialize();

/**
 * Shared Conformance Test Runner
 *
 * Renders a test table with numbered test cases referencing spec sections,
 * shows expected vs actual, and displays PASS/FAIL/SKIP badges.
 */

export type TestStatus = "pending" | "pass" | "fail" | "skip" | "running";
export type TestLevel = "MUST" | "SHOULD" | "MAY" | "OPTIONAL";

export interface TestCase {
  id: string;
  description: string;
  specRef: string;
  level: TestLevel;
  manual?: boolean;
}

export interface TestResult {
  status: TestStatus;
  expected?: string;
  actual?: string;
  error?: string;
}

type TestFn = () => Promise<TestResult> | TestResult;

interface RegisteredTest {
  tc: TestCase;
  fn: TestFn;
  result: TestResult;
}

export class TestRunner {
  private tests = new Map<string, RegisteredTest>();
  private container: HTMLElement;
  private summaryEl!: HTMLElement;
  private tableBody!: HTMLElement;
  private styleInjected = false;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
    this.injectStyles();
    this.buildShell();
  }

  register(tc: TestCase, fn: TestFn): void {
    this.tests.set(tc.id, {
      tc,
      fn,
      result: { status: "pending" },
    });
    this.renderRow(tc.id);
    this.updateSummary();
  }

  async runAll(): Promise<void> {
    for (const [id, t] of this.tests) {
      if (t.tc.manual) continue;
      await this.runOne(id);
    }
  }

  async runOne(id: string): Promise<void> {
    const t = this.tests.get(id);
    if (!t) return;
    t.result = { status: "running" };
    this.renderRow(id);
    try {
      t.result = await t.fn();
    } catch (err) {
      t.result = {
        status: "fail",
        error: err instanceof Error ? err.message : String(err),
      };
    }
    this.renderRow(id);
    this.updateSummary();
  }

  resolve(id: string, result: TestResult): void {
    const t = this.tests.get(id);
    if (!t) return;
    t.result = result;
    this.renderRow(id);
    this.updateSummary();
  }

  getResult(id: string): TestResult | undefined {
    return this.tests.get(id)?.result;
  }

  // --- Rendering ---

  private buildShell(): void {
    this.container.innerHTML = `
      <div class="tr-summary" id="tr-summary"></div>
      <table class="tr-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Level</th>
            <th>Description</th>
            <th>Expected</th>
            <th>Actual</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tr-tbody"></tbody>
      </table>
    `;
    this.summaryEl = document.getElementById("tr-summary")!;
    this.tableBody = document.getElementById("tr-tbody")!;
  }

  private renderRow(id: string): void {
    const t = this.tests.get(id);
    if (!t) return;
    const { tc, result } = t;

    let row = document.getElementById(`tr-row-${id}`);
    if (!row) {
      row = document.createElement("tr");
      row.id = `tr-row-${id}`;
      this.tableBody.appendChild(row);
    }

    const levelClass = tc.level === "MUST" ? "must" : tc.level === "SHOULD" ? "should" : "optional";
    const statusClass = result.status;

    row.className = `tr-row tr-level-${levelClass}`;
    row.innerHTML = `
      <td class="tr-id">${tc.id}</td>
      <td><span class="tr-badge tr-badge-${levelClass}">${tc.level}</span></td>
      <td class="tr-desc">${tc.description} <span class="tr-spec">${tc.specRef}</span></td>
      <td class="tr-expected">${result.expected ?? ""}</td>
      <td class="tr-actual">${result.actual ?? (result.error ? `<span class="tr-error">${result.error}</span>` : "")}</td>
      <td><span class="tr-badge tr-badge-${statusClass}">${result.status.toUpperCase()}</span></td>
      <td>${tc.manual ? `<button class="tr-run-btn" data-id="${id}">Run</button>` : ""}</td>
    `;

    const btn = row.querySelector(".tr-run-btn");
    if (btn) {
      btn.addEventListener("click", () => this.runOne(id));
    }
  }

  private updateSummary(): void {
    let pass = 0, fail = 0, skip = 0, pending = 0, running = 0;
    for (const t of this.tests.values()) {
      switch (t.result.status) {
        case "pass": pass++; break;
        case "fail": fail++; break;
        case "skip": skip++; break;
        case "running": running++; break;
        default: pending++; break;
      }
    }
    const total = this.tests.size;
    this.summaryEl.innerHTML = `
      <span class="tr-sum-total">${total} tests</span>
      <span class="tr-sum-pass">${pass} PASS</span>
      <span class="tr-sum-fail">${fail} FAIL</span>
      <span class="tr-sum-skip">${skip} SKIP</span>
      <span class="tr-sum-pending">${pending + running} PENDING</span>
    `;
  }

  private injectStyles(): void {
    if (this.styleInjected) return;
    this.styleInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f0f1a; color: #e2e8f0; }
      #test-container { padding: 16px; max-width: 1100px; margin: 0 auto; }
      .tr-summary { display: flex; gap: 12px; align-items: center; padding: 12px 16px; background: #1a1a2e; border-radius: 10px; margin-bottom: 16px; flex-wrap: wrap; }
      .tr-sum-total { font-weight: 700; font-size: 14px; margin-right: 8px; }
      .tr-sum-pass { color: #10b981; font-weight: 600; font-size: 13px; }
      .tr-sum-fail { color: #ef4444; font-weight: 600; font-size: 13px; }
      .tr-sum-skip { color: #f59e0b; font-weight: 600; font-size: 13px; }
      .tr-sum-pending { color: #6b7280; font-weight: 600; font-size: 13px; }

      .tr-table { width: 100%; border-collapse: collapse; font-size: 13px; }
      .tr-table th { text-align: left; padding: 8px 10px; background: #1a1a2e; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 2px solid #2d2d44; }
      .tr-table td { padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: top; }

      .tr-level-must { border-left: 3px solid #ef4444; }
      .tr-level-should { border-left: 3px solid #f59e0b; }
      .tr-level-optional { border-left: 3px solid #6b7280; }

      .tr-id { font-family: monospace; font-weight: 600; white-space: nowrap; color: #a78bfa; }
      .tr-desc { max-width: 320px; }
      .tr-spec { font-size: 11px; color: #6b7280; }
      .tr-expected, .tr-actual { font-family: monospace; font-size: 12px; max-width: 180px; word-break: break-all; color: #9ca3af; }
      .tr-error { color: #ef4444; }

      .tr-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
      .tr-badge-must { background: rgba(239,68,68,0.15); color: #ef4444; }
      .tr-badge-should { background: rgba(245,158,11,0.15); color: #f59e0b; }
      .tr-badge-optional { background: rgba(107,114,128,0.15); color: #9ca3af; }
      .tr-badge-pass { background: rgba(16,185,129,0.15); color: #10b981; }
      .tr-badge-fail { background: rgba(239,68,68,0.15); color: #ef4444; }
      .tr-badge-skip { background: rgba(245,158,11,0.15); color: #f59e0b; }
      .tr-badge-pending { background: rgba(107,114,128,0.1); color: #6b7280; }
      .tr-badge-running { background: rgba(99,102,241,0.15); color: #818cf8; }

      .tr-run-btn { background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; border: none; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; }
      .tr-run-btn:hover { opacity: 0.85; }

      .tr-app-title { font-size: 18px; font-weight: 700; margin-bottom: 4px; background: linear-gradient(135deg, #a78bfa, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .tr-app-subtitle { font-size: 13px; color: #6b7280; margin-bottom: 16px; }
    `;
    document.head.appendChild(style);
  }
}

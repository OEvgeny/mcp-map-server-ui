/**
 * Shared validation utilities for conformance tests
 */
import type { TestResult } from "./test-runner.js";

export function pass(expected?: string, actual?: string): TestResult {
  return { status: "pass", expected, actual };
}

export function fail(expected?: string, actual?: string, error?: string): TestResult {
  return { status: "fail", expected, actual, error };
}

export function skip(reason?: string): TestResult {
  return { status: "skip", expected: reason, actual: "skipped" };
}

export function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

export function isBoolean(v: unknown): v is boolean {
  return typeof v === "boolean";
}

/** BCP 47 language tag — loose check (e.g. "en", "en-US", "zh-Hant-TW") */
export function isBcp47(v: unknown): boolean {
  if (typeof v !== "string") return false;
  return /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/.test(v);
}

/** IANA timezone identifier — loose check (e.g. "America/New_York", "UTC") */
export function isIanaTimezone(v: unknown): boolean {
  if (typeof v !== "string") return false;
  return /^[A-Z][a-zA-Z_]+\/[A-Za-z_]+(?:\/[A-Za-z_]+)?$/.test(v) || v === "UTC" || v === "GMT";
}

/** Check if a value looks like a valid CSS color (hex, rgb, hsl, named, etc.) */
export function isCssColor(v: unknown): boolean {
  if (typeof v !== "string" || v.trim() === "") return false;
  const s = v.trim();
  // hex, rgb, rgba, hsl, hsla, named colors, oklch, etc.
  if (/^#([0-9a-fA-F]{3,8})$/.test(s)) return true;
  if (/^(rgb|rgba|hsl|hsla|oklch|oklab|lch|lab|color)\s*\(/.test(s)) return true;
  // Named colors — accept anything alphabetic as a potential named color
  if (/^[a-zA-Z]+$/.test(s)) return true;
  return false;
}

/** Check if a value looks like a valid CSS length (px, em, rem, %, etc.) */
export function isCssLength(v: unknown): boolean {
  if (typeof v !== "string" || v.trim() === "") return false;
  return /^-?[\d.]+(px|em|rem|%|vh|vw|pt|cm|mm|in|ch|ex|vmin|vmax|lh|rlh|cqi|cqb|cap|ic|svh|svw|dvh|dvw|lvh|lvw)$/.test(v.trim()) || v.trim() === "0";
}

/** Check if a value looks like a valid CSS font-family */
export function isCssFontFamily(v: unknown): boolean {
  if (typeof v !== "string" || v.trim() === "") return false;
  // Accept anything that has at least one word
  return v.trim().length > 0;
}

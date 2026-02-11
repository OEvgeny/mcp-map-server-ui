// process.js (ESM)
// Drop-in polyfill for `node:process` in browser / Workers using WHATWG Streams,
// now emitting a tiny Buffer shim (subclass of Uint8Array) so `chunk.indexOf("...")` works.
//
// It provides:
//   import process from "node:process";
//   process.stdin.on("data", (chunk) => chunk.indexOf("foo") ...)
//   process.stdout.write(...)
// plus on/off/once, listenerCount, pause/resume, drain.
//
// Backing transport (default):
// - Uses postMessage for stdout/stderr and listens to `message` for stdin.
//
// Incoming stdin messages expected:
//   postMessage({ type: "stdin", data: Uint8Array | ArrayBuffer | string })
//   postMessage({ type: "stdin:error", error: any })
//   postMessage({ type: "stdin:end" })
//
// Outgoing:
//   postMessage({ type: "stdout", data: Uint8Array })
//   postMessage({ type: "stderr", data: Uint8Array })
//
// You can override transport with:
//   process.__setStdioTransport({ onMessage(cb)->unsub, postMessage(msg) })
//
// Optional backpressure simulation:
//   process.__setBackpressure(true)
//   host later sends {type:"stdout:drain"} or {type:"stderr:drain"} to release.

const _global =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
      ? self
      : typeof window !== "undefined"
        ? window
        : {};

// ---------- tiny EventEmitter ----------
class Emitter {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._m = new Map();
  }
  on(ev, fn) {
    let set = this._m.get(ev);
    if (!set) this._m.set(ev, (set = new Set()));
    set.add(fn);
    return this;
  }
  off(ev, fn) {
    const set = this._m.get(ev);
    if (set) set.delete(fn);
    return this;
  }
  once(ev, fn) {
    const wrap = (...args) => {
      this.off(ev, wrap);
      fn(...args);
    };
    return this.on(ev, wrap);
  }
  emit(ev, ...args) {
    const set = this._m.get(ev);
    if (!set || set.size === 0) return false;
    [...set].forEach((fn) => {
      try {
        fn(...args);
      } catch (e) {
        if (ev !== "error") this.emit("error", e);
      }
    });
    return true;
  }
  listenerCount(ev) {
    const set = this._m.get(ev);
    return set ? set.size : 0;
  }
}

// ---------- tiny Buffer shim (enough for indexOf(string)) ----------
const _te = new TextEncoder();
const _td = new TextDecoder();

function _normEncoding(enc) {
  enc = (enc || "utf8").toLowerCase();
  if (enc === "utf-8") enc = "utf8";
  return enc;
}

function _encodeString(str, encoding) {
  const enc = _normEncoding(encoding);
  if (enc === "utf8" || enc === "utf16le" || enc === "ucs2") {
    // Only utf8 truly supported; utf16le/ucs2 not implemented (kept for signature compatibility)
    // If you need utf16le, add it here.
    return _te.encode(str);
  }
  if (enc === "ascii" || enc === "latin1" || enc === "binary") {
    const out = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i) & 0xff;
    return out;
  }
  if (enc === "hex") {
    const clean = str.trim();
    const len = clean.length;
    const out = new Uint8Array((len / 2) | 0);
    for (let i = 0, j = 0; i + 1 < len; i += 2, j++) {
      out[j] = parseInt(clean.slice(i, i + 2), 16) & 0xff;
    }
    return out;
  }
  // Fallback utf8
  return _te.encode(str);
}

function _toByteArray(v, encoding) {
  if (v == null) return new Uint8Array();
  if (typeof v === "number") return Uint8Array.of(v & 0xff);
  if (typeof v === "string") return _encodeString(v, encoding);
  if (v instanceof Uint8Array) return v;
  if (v instanceof ArrayBuffer) return new Uint8Array(v);
  if (
    typeof v === "object" &&
    v.buffer instanceof ArrayBuffer &&
    typeof v.byteOffset === "number" &&
    typeof v.byteLength === "number"
  ) {
    return new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
  }
  return _te.encode(String(v));
}

function _indexOfBytes(haystack, needle, from) {
  const hLen = haystack.length >>> 0;
  const nLen = needle.length >>> 0;

  if (from < 0) from = Math.max(hLen + from, 0);
  if (from > hLen) return -1;
  if (nLen === 0) return from;

  // Naive scan (good enough for typical stdio framing searches)
  outer: for (let i = from; i + nLen <= hLen; i++) {
    for (let j = 0; j < nLen; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

class BufferShim extends Uint8Array {
  static from(input, encoding) {
    const u8 = _toByteArray(input, encoding);
    // Ensure we allocate a new view with exact bounds
    const out = new BufferShim(u8.byteLength);
    out.set(u8);
    return out;
  }

  static isBuffer(x) {
    return x instanceof BufferShim;
  }

  static concat(list, totalLength) {
    if (!Array.isArray(list)) throw new TypeError("Buffer.concat expects an array");
    if (totalLength == null) {
      totalLength = 0;
      for (const b of list) totalLength += (b ? b.length : 0);
    }
    const out = new BufferShim(totalLength >>> 0);
    let off = 0;
    for (const b of list) {
      if (!b) continue;
      const u8 = b instanceof Uint8Array ? b : BufferShim.from(b);
      out.set(u8, off);
      off += u8.length;
    }
    return out;
  }

  toString(encoding = "utf8", start = 0, end = this.length) {
    const enc = _normEncoding(encoding);
    const s = Math.max(0, start | 0);
    const e = Math.min(this.length, end == null ? this.length : end | 0);
    const view = this.subarray(s, e);
    if (enc === "ascii" || enc === "latin1" || enc === "binary") {
      let out = "";
      for (let i = 0; i < view.length; i++) out += String.fromCharCode(view[i]);
      return out;
    }
    // utf8 default
    return _td.decode(view);
  }

  /**
   * Minimal Node-like Buffer#indexOf.
   * Supports: number | string | Uint8Array/Buffer
   * Signature: indexOf(value[, byteOffset[, encoding]])
   */
  indexOf(value, byteOffset = 0, encoding = "utf8") {
    const from = byteOffset | 0;
    const needle = _toByteArray(value, encoding);
    return _indexOfBytes(this, needle, from);
  }
}

// Provide global Buffer for libs that assume it exists.
if (!_global.Buffer) _global.Buffer = BufferShim;

// Normalize any chunk to BufferShim
function toBuf(chunk, encoding) {
  if (chunk instanceof BufferShim) return chunk;
  if (chunk instanceof Uint8Array) {
    // Preserve bytes exactly
    const out = new BufferShim(chunk.byteLength);
    out.set(chunk);
    return out;
  }
  if (chunk instanceof ArrayBuffer) return BufferShim.from(new Uint8Array(chunk));
  if (
    typeof chunk === "object" &&
    chunk &&
    chunk.buffer instanceof ArrayBuffer &&
    typeof chunk.byteOffset === "number" &&
    typeof chunk.byteLength === "number"
  ) {
    const u8 = new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    const out = new BufferShim(u8.byteLength);
    out.set(u8);
    return out;
  }
  return BufferShim.from(chunk, encoding);
}

// ---------- default stdio transport (message-based) ----------
function defaultTransport() {
  const hasAdd = typeof _global.addEventListener === "function";
  const hasPost = typeof _global.postMessage === "function";

  const onMessage = (cb) => {
    if (!hasAdd) return () => {};
    const handler = (ev) => cb(ev);
    _global.addEventListener("message", handler);
    return () => _global.removeEventListener("message", handler);
  };

  const postMessage = (msg) => {
    if (!hasPost) return;
    _global.postMessage(msg);
  };

  return { onMessage, postMessage };
}

// ---------- Streams-backed stdin/stdout with Node-ish surface ----------
class Stdin extends Emitter {
  /**
   * @param {{ readable: ReadableStream<Uint8Array>, push: (chunk: Uint8Array)=>void, error: (err:any)=>void, end: ()=>void }} backing
   */
  constructor(backing) {
    super();
    this._backing = backing;
    this._paused = true;
    this._reader = null;
    this._pumpRunning = false;
  }

  pause() {
    this._paused = true;
    return this;
  }

  resume() {
    this._paused = false;
    this._startPump();
    return this;
  }

  on(ev, fn) {
    super.on(ev, fn);
    if (ev === "data") this.resume();
    return this;
  }

  off(ev, fn) {
    super.off(ev, fn);
    if (ev === "data" && this.listenerCount("data") === 0) this.pause();
    return this;
  }

  _startPump() {
    if (this._pumpRunning) return;
    this._pumpRunning = true;

    const run = async () => {
      try {
        if (!this._reader) this._reader = this._backing.readable.getReader();
        while (!this._paused) {
          const { value, done } = await this._reader.read();
          if (done) {
            this.emit("end");
            break;
          }
          if (value) this.emit("data", toBuf(value));
        }
      } catch (e) {
        this.emit("error", e);
      } finally {
        this._pumpRunning = false;
      }
    };

    run();
  }
}

class Stdout extends Emitter {
  /**
   * @param {{ writable: WritableStream<Uint8Array>, writeU8: (chunk: Uint8Array)=>Promise<void> }} backing
   */
  constructor(backing) {
    super();
    this._backing = backing;
    this._backpressured = false;
    this._simulateBackpressure = false;
  }

  __setBackpressureMode(enabled) {
    this._simulateBackpressure = !!enabled;
  }

  __notifyDrain() {
    if (!this._backpressured) return;
    this._backpressured = false;
    this.emit("drain");
  }

  /**
   * Node-like: write(chunk) => boolean
   * Accepts Buffer / Uint8Array / ArrayBuffer / string
   */
  write(chunk) {
    const buf = toBuf(chunk);

    // Async write, sync boolean return.
    this._backing.writeU8(buf).catch((e) => this.emit("error", e));

    if (!this._simulateBackpressure) return true;

    if (!this._backpressured) {
      this._backpressured = true;
      return false;
    }
    return false;
  }
}

// ---------- make readable/writable streams for stdin/stdout ----------
function makePushReadableStream() {
  /** @type {ReadableStreamDefaultController<Uint8Array>|null} */
  let controller = null;
  let closed = false;

  const readable = new ReadableStream({
    start(c) {
      controller = c;
    },
    cancel() {
      closed = true;
      controller = null;
    },
  });

  const push = (chunk) => {
    if (closed || !controller) return;
    controller.enqueue(chunk);
  };

  const error = (err) => {
    if (closed || !controller) return;
    controller.error(err);
    closed = true;
  };

  const end = () => {
    if (closed || !controller) return;
    controller.close();
    closed = true;
  };

  return { readable, push, error, end };
}

function makeWritableStreamSink(writeFn) {
  const writable = new WritableStream({
    async write(chunk) {
      await writeFn(chunk);
    },
  });

  const writeU8 = async (u8) => {
    const writer = writable.getWriter();
    try {
      await writer.write(u8);
    } finally {
      writer.releaseLock();
    }
  };

  return { writable, writeU8 };
}

// ---------- process polyfill ----------
const _transport = defaultTransport();

// stdin backing: push bytes into a ReadableStream; Stdin emits BufferShim on 'data'
const _stdinBacking = makePushReadableStream();
const stdin = new Stdin(_stdinBacking);

// stdout/stderr backing: WritableStream that forwards bytes outward
function makeChannelWriter(channelType) {
  return makeWritableStreamSink(async (u8) => {
    // Ensure we send a plain Uint8Array-ish (BufferShim is fine; it's a Uint8Array subclass)
    _process.__transport.postMessage({ type: channelType, data: u8 });
  });
}
const _stdoutBacking = makeChannelWriter("stdout");
const _stderrBacking = makeChannelWriter("stderr");
const stdout = new Stdout(_stdoutBacking);
const stderr = new Stdout(_stderrBacking);

let _unsub = null;

function _attachTransportListener() {
  if (_unsub) _unsub();
  _unsub = _process.__transport.onMessage((ev) => {
    const msg = ev && typeof ev === "object" && "data" in ev ? ev.data : ev;
    if (!msg || typeof msg !== "object") return;

    if (msg.type === "stdin") {
      _stdinBacking.push(toBuf(msg.data));
    } else if (msg.type === "stdin:error") {
      _stdinBacking.error(msg.error ?? new Error("stdin error"));
      stdin.emit("error", msg.error);
    } else if (msg.type === "stdin:end") {
      _stdinBacking.end();
    } else if (msg.type === "stdout:drain") {
      stdout.__notifyDrain();
    } else if (msg.type === "stderr:drain") {
      stderr.__notifyDrain();
    }
  });
}

const _process = {
  stdin,
  stdout,
  stderr,

  // handy extras
  Buffer: BufferShim,
  env: {},
  argv: [],
  platform: "browser",
  versions: {},

  __transport: _transport,

  __setStdioTransport(t) {
    if (!t || typeof t.onMessage !== "function" || typeof t.postMessage !== "function") {
      throw new TypeError("Invalid transport: expected { onMessage(cb)->unsub, postMessage(msg) }");
    }
    _process.__transport = t;

    _stdoutBacking.writeU8 = async (u8) => {
      _process.__transport.postMessage({ type: "stdout", data: u8 });
    };
    _stderrBacking.writeU8 = async (u8) => {
      _process.__transport.postMessage({ type: "stderr", data: u8 });
    };

    _attachTransportListener();
  },

  __setBackpressure(enabled) {
    stdout.__setBackpressureMode(enabled);
    stderr.__setBackpressureMode(enabled);
  },

  __pushStdin(chunk) {
    _stdinBacking.push(toBuf(chunk));
  },

  __endStdin() {
    _stdinBacking.end();
  },
};

// attach listener immediately
_attachTransportListener();

// Default export for `import process from "node:process"`
export default _process;

// Optional named exports
export { stdin, stdout, stderr, BufferShim as Buffer };

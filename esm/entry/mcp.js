import { JSONRPCMessageSchema } from "@modelcontextprotocol/sdk/types.js";

// messageport-transport.js (ESM)
//
// A JSON-RPC transport over MessagePort (MessageChannel / postMessage transfer).
//
// Incoming payloads can be:
//   - a structured-clone JSON-RPC message object
//   - a JSON string (we'll JSON.parse)
// Also supports an optional control close message: { __mcp__: "close" }.
//

/**
 * @typedef {import("../types.js").JSONRPCMessage} JSONRPCMessage
 */

/**
 * Shared implementation for both server/client.
 * You can use either class name for clarity, but they behave the same.
 */
class MessagePortTransportBase {
  /**
   * @param {MessagePort} port
   */
  constructor(port) {
    this._port = port;
    this._started = false;
    this._closed = false;

    /** @type {(ev: MessageEvent) => void} */
    this._onMessageEvent = (ev) => {
      this._handleIncoming(ev?.data);
    };

    /** @type {(ev: MessageEvent) => void} */
    this._onMessageErrorEvent = (ev) => {
      const err =
        ev?.data instanceof Error
          ? ev.data
          : new Error("MessagePort messageerror");
      this.onerror?.(err);
    };
  }

  /**
   * Start listening for messages.
   */
  async start() {
    if (this._started) {
      throw new Error(
        `${this.constructor.name} already started! If using Client/Server class, note that connect() calls start() automatically.`
      );
    }
    if (!this._port) {
      throw new Error("No MessagePort provided");
    }

    this._started = true;

    // Prefer addEventListener for consistent removal.
    this._port.addEventListener("message", this._onMessageEvent);
    this._port.addEventListener("messageerror", this._onMessageErrorEvent);

    // Some environments require start() for MessagePort event delivery.
    // (Safe to call even if not required.)
    if (typeof this._port.start === "function") {
      this._port.start();
    }
  }

  /**
   * Close this transport and underlying port.
   */
  async close() {
    if (this._closed) return;
    this._closed = true;

    if (this._port) {
      try {
        this._port.removeEventListener("message", this._onMessageEvent);
        this._port.removeEventListener("messageerror", this._onMessageErrorEvent);
      } catch {
        // ignore
      }

      try {
        // Optional courtesy: notify peer (receiver treats it as close, not JSON-RPC)
        this._port.postMessage({ __mcp__: "close" });
      } catch {
        // ignore
      }

      try {
        this._port.close();
      } catch {
        // ignore
      }
    }

    this.onclose?.();
  }

  /**
   * Send a JSON-RPC message.
   * @param {JSONRPCMessage} message
   */
  send(message) {
    return new Promise((resolve, reject) => {
      if (!this._port || this._closed) {
        reject(new Error("Not connected"));
        return;
      }
      try {
        // Structured clone: no framing, no stringify.
        this._port.postMessage(message);
        resolve();
      } catch (e) {
        this.onerror?.(e);
        reject(e);
      }
    });
  }

  /**
   * @param {any} data
   */
  _handleIncoming(data) {
    // Optional control message
    if (data && typeof data === "object" && data.__mcp__ === "close") {
      // Peer is closing. We follow suit.
      this.onclose?.();
      try {
        this._port?.close();
      } catch {
        // ignore
      }
      this._closed = true;
      return;
    }

    let payload = data;

    // Allow string payloads (if the other side JSON.stringify'ed for some reason)
    if (typeof payload === "string") {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        this.onerror?.(e);
        return;
      }
    }

    let message;
    try {
      message = JSONRPCMessageSchema.parse(payload);
    } catch (e) {
      this.onerror?.(e);
      return;
    }

    this.onmessage?.(message);
  }
}

/**
 * Server-side transport over a MessagePort.
 * (Same behavior as client; name is just for readability.)
 */
export class MessagePortServerTransport extends MessagePortTransportBase {
  /** @param {MessagePort} port */
  constructor(port) {
    super(port);
  }
}

/**
 * Client-side transport over a MessagePort.
 * (Same behavior as server; name is just for readability.)
 */
export class MessagePortClientTransport extends MessagePortTransportBase {
  /** @param {MessagePort} port */
  constructor(port) {
    super(port);
  }
}

/**
 * Convenience helper for same-realm usage (tests, demos).
 * In real embed/iframe scenarios, you usually create the MessageChannel in the host,
 * keep one port, and transfer the other port to the iframe/worker.
 */
export function createMessageChannelPair() {
  const ch = new MessageChannel();
  return {
    clientPort: ch.port1,
    serverPort: ch.port2,
    clientTransport: new MessagePortClientTransport(ch.port1),
    serverTransport: new MessagePortServerTransport(ch.port2),
  };
}

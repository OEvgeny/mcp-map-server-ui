
/**
 * Browser replacement for Buffer.concat, returning a Uint8Array.
 *
 * Accepts: Uint8Array | ArrayBuffer | ArrayBufferView (e.g. DataView) | number[] (fallback)
 * Optional: totalLength (like Node) to pre-size output.
 */
export function concat(chunks, totalLength) {
  if (!Array.isArray(chunks)) {
    throw new TypeError("concat(chunks, totalLength): chunks must be an array");
  }

  // Normalize chunks to Uint8Array views without copying data.
  const views = new Array(chunks.length);
  let computed = 0;

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];

    let v;
    if (c instanceof Uint8Array) {
      v = c;
    } else if (c instanceof ArrayBuffer) {
      v = new Uint8Array(c);
    } else if (ArrayBuffer.isView(c) && c.buffer instanceof ArrayBuffer) {
      // e.g. DataView, Uint16Array, etc -> byte view of that slice
      v = new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
    } else if (Array.isArray(c)) {
      v = Uint8Array.from(c);
    } else {
      throw new TypeError(`concat: unsupported chunk at index ${i}`);
    }

    views[i] = v;
    computed += v.byteLength;
  }

  const len = totalLength == null ? computed : (totalLength >>> 0);
  const out = new Uint8Array(len);

  // Copy, truncating if totalLength is smaller (Node behavior).
  let offset = 0;
  for (let i = 0; i < views.length && offset < len; i++) {
    const v = views[i];
    const n = Math.min(v.byteLength, len - offset);
    out.set(n === v.byteLength ? v : v.subarray(0, n), offset);
    offset += n;
  }

  return out;
}

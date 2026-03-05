// ../conformance-server.ts
import { McpServer } from "./mcp.js";

// module/fs.js
async function readFile(path) {
  const url = new URL(path, import.meta.url);
  if (url.protocol === "file:") {
    const { readFile: nodeReadFile } = await import("node:fs/promises");
    const { fileURLToPath } = await import("node:url");
    return await nodeReadFile(fileURLToPath(url), "utf8");
  } else {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`readFile: ${res.status} ${res.statusText} (${url})`, { cause: res });
    return await res.text();
  }
}
var fs_default = { readFile };

// node_modules/pathe/dist/shared/pathe.M-eThtNZ.mjs
var _lazyMatch = () => {
  var __lib__ = (() => {
    var m2 = Object.defineProperty, V2 = Object.getOwnPropertyDescriptor, G2 = Object.getOwnPropertyNames, T2 = Object.prototype.hasOwnProperty, q2 = (r, e) => {
      for (var n in e) m2(r, n, { get: e[n], enumerable: true });
    }, H2 = (r, e, n, a2) => {
      if (e && typeof e == "object" || typeof e == "function") for (let t of G2(e)) !T2.call(r, t) && t !== n && m2(r, t, { get: () => e[t], enumerable: !(a2 = V2(e, t)) || a2.enumerable });
      return r;
    }, J = (r) => H2(m2({}, "__esModule", { value: true }), r), w2 = {};
    q2(w2, { default: () => re2 });
    var A2 = (r) => Array.isArray(r), d2 = (r) => typeof r == "function", Q2 = (r) => r.length === 0, W2 = (r) => typeof r == "number", K2 = (r) => typeof r == "object" && r !== null, X = (r) => r instanceof RegExp, b2 = (r) => typeof r == "string", h2 = (r) => r === void 0, Y2 = (r) => {
      const e = /* @__PURE__ */ new Map();
      return (n) => {
        const a2 = e.get(n);
        if (a2) return a2;
        const t = r(n);
        return e.set(n, t), t;
      };
    }, rr2 = (r, e, n = {}) => {
      const a2 = { cache: {}, input: r, index: 0, indexMax: 0, options: n, output: [] };
      if (v(e)(a2) && a2.index === r.length) return a2.output;
      throw new Error(`Failed to parse at index ${a2.indexMax}`);
    }, i = (r, e) => A2(r) ? er2(r, e) : b2(r) ? ar2(r, e) : nr2(r, e), er2 = (r, e) => {
      const n = {};
      for (const a2 of r) {
        if (a2.length !== 1) throw new Error(`Invalid character: "${a2}"`);
        const t = a2.charCodeAt(0);
        n[t] = true;
      }
      return (a2) => {
        const t = a2.index, o = a2.input;
        for (; a2.index < o.length && o.charCodeAt(a2.index) in n; ) a2.index += 1;
        const u = a2.index;
        if (u > t) {
          if (!h2(e) && !a2.options.silent) {
            const s2 = a2.input.slice(t, u), c = d2(e) ? e(s2, o, String(t)) : e;
            h2(c) || a2.output.push(c);
          }
          a2.indexMax = Math.max(a2.indexMax, a2.index);
        }
        return true;
      };
    }, nr2 = (r, e) => {
      const n = r.source, a2 = r.flags.replace(/y|$/, "y"), t = new RegExp(n, a2);
      return g2((o) => {
        t.lastIndex = o.index;
        const u = t.exec(o.input);
        if (u) {
          if (!h2(e) && !o.options.silent) {
            const s2 = d2(e) ? e(...u, o.input, String(o.index)) : e;
            h2(s2) || o.output.push(s2);
          }
          return o.index += u[0].length, o.indexMax = Math.max(o.indexMax, o.index), true;
        } else return false;
      });
    }, ar2 = (r, e) => (n) => {
      if (n.input.startsWith(r, n.index)) {
        if (!h2(e) && !n.options.silent) {
          const t = d2(e) ? e(r, n.input, String(n.index)) : e;
          h2(t) || n.output.push(t);
        }
        return n.index += r.length, n.indexMax = Math.max(n.indexMax, n.index), true;
      } else return false;
    }, C = (r, e, n, a2) => {
      const t = v(r);
      return g2(_(M2((o) => {
        let u = 0;
        for (; u < n; ) {
          const s2 = o.index;
          if (!t(o) || (u += 1, o.index === s2)) break;
        }
        return u >= e;
      })));
    }, tr2 = (r, e) => C(r, 0, 1), f2 = (r, e) => C(r, 0, 1 / 0), x2 = (r, e) => {
      const n = r.map(v);
      return g2(_(M2((a2) => {
        for (let t = 0, o = n.length; t < o; t++) if (!n[t](a2)) return false;
        return true;
      })));
    }, l = (r, e) => {
      const n = r.map(v);
      return g2(_((a2) => {
        for (let t = 0, o = n.length; t < o; t++) if (n[t](a2)) return true;
        return false;
      }));
    }, M2 = (r, e = false) => {
      const n = v(r);
      return (a2) => {
        const t = a2.index, o = a2.output.length, u = n(a2);
        return (!u || e) && (a2.index = t, a2.output.length !== o && (a2.output.length = o)), u;
      };
    }, _ = (r, e) => {
      const n = v(r);
      return n;
    }, g2 = /* @__PURE__ */ (() => {
      let r = 0;
      return (e) => {
        const n = v(e), a2 = r += 1;
        return (t) => {
          var o;
          if (t.options.memoization === false) return n(t);
          const u = t.index, s2 = (o = t.cache)[a2] || (o[a2] = /* @__PURE__ */ new Map()), c = s2.get(u);
          if (c === false) return false;
          if (W2(c)) return t.index = c, true;
          if (c) return t.index = c.index, c.output?.length && t.output.push(...c.output), true;
          {
            const Z = t.output.length;
            if (n(t)) {
              const D2 = t.index, U2 = t.output.length;
              if (U2 > Z) {
                const ee2 = t.output.slice(Z, U2);
                s2.set(u, { index: D2, output: ee2 });
              } else s2.set(u, D2);
              return true;
            } else return s2.set(u, false), false;
          }
        };
      };
    })(), E2 = (r) => {
      let e;
      return (n) => (e || (e = v(r())), e(n));
    }, v = Y2((r) => {
      if (d2(r)) return Q2(r) ? E2(r) : r;
      if (b2(r) || X(r)) return i(r);
      if (A2(r)) return x2(r);
      if (K2(r)) return l(Object.values(r));
      throw new Error("Invalid rule");
    }), P2 = "abcdefghijklmnopqrstuvwxyz", ir2 = (r) => {
      let e = "";
      for (; r > 0; ) {
        const n = (r - 1) % 26;
        e = P2[n] + e, r = Math.floor((r - 1) / 26);
      }
      return e;
    }, O = (r) => {
      let e = 0;
      for (let n = 0, a2 = r.length; n < a2; n++) e = e * 26 + P2.indexOf(r[n]) + 1;
      return e;
    }, S2 = (r, e) => {
      if (e < r) return S2(e, r);
      const n = [];
      for (; r <= e; ) n.push(r++);
      return n;
    }, or2 = (r, e, n) => S2(r, e).map((a2) => String(a2).padStart(n, "0")), R2 = (r, e) => S2(O(r), O(e)).map(ir2), p2 = (r) => r, z3 = (r) => ur2((e) => rr2(e, r, { memoization: false }).join("")), ur2 = (r) => {
      const e = {};
      return (n) => e[n] ?? (e[n] = r(n));
    }, sr2 = i(/^\*\*\/\*$/, ".*"), cr2 = i(/^\*\*\/(\*)?([ a-zA-Z0-9._-]+)$/, (r, e, n) => `.*${e ? "" : "(?:^|/)"}${n.replaceAll(".", "\\.")}`), lr2 = i(/^\*\*\/(\*)?([ a-zA-Z0-9._-]*)\{([ a-zA-Z0-9._-]+(?:,[ a-zA-Z0-9._-]+)*)\}$/, (r, e, n, a2) => `.*${e ? "" : "(?:^|/)"}${n.replaceAll(".", "\\.")}(?:${a2.replaceAll(",", "|").replaceAll(".", "\\.")})`), y2 = i(/\\./, p2), pr2 = i(/[$.*+?^(){}[\]\|]/, (r) => `\\${r}`), vr2 = i(/./, p2), hr2 = i(/^(?:!!)*!(.*)$/, (r, e) => `(?!^${L2(e)}$).*?`), dr2 = i(/^(!!)+/, ""), fr2 = l([hr2, dr2]), xr2 = i(/\/(\*\*\/)+/, "(?:/.+/|/)"), gr2 = i(/^(\*\*\/)+/, "(?:^|.*/)"), mr2 = i(/\/(\*\*)$/, "(?:/.*|$)"), _r2 = i(/\*\*/, ".*"), j2 = l([xr2, gr2, mr2, _r2]), Sr2 = i(/\*\/(?!\*\*\/)/, "[^/]*/"), yr2 = i(/\*/, "[^/]*"), N = l([Sr2, yr2]), k2 = i("?", "[^/]"), $r2 = i("[", p2), wr2 = i("]", p2), Ar2 = i(/[!^]/, "^/"), br2 = i(/[a-z]-[a-z]|[0-9]-[0-9]/i, p2), Cr2 = i(/[$.*+?^(){}[\|]/, (r) => `\\${r}`), Mr2 = i(/[^\]]/, p2), Er2 = l([y2, Cr2, br2, Mr2]), B2 = x2([$r2, tr2(Ar2), f2(Er2), wr2]), Pr2 = i("{", "(?:"), Or2 = i("}", ")"), Rr2 = i(/(\d+)\.\.(\d+)/, (r, e, n) => or2(+e, +n, Math.min(e.length, n.length)).join("|")), zr = i(/([a-z]+)\.\.([a-z]+)/, (r, e, n) => R2(e, n).join("|")), jr2 = i(/([A-Z]+)\.\.([A-Z]+)/, (r, e, n) => R2(e.toLowerCase(), n.toLowerCase()).join("|").toUpperCase()), Nr2 = l([Rr2, zr, jr2]), I2 = x2([Pr2, Nr2, Or2]), kr2 = i("{", "(?:"), Br2 = i("}", ")"), Ir2 = i(",", "|"), Fr2 = i(/[$.*+?^(){[\]\|]/, (r) => `\\${r}`), Lr2 = i(/[^}]/, p2), Zr2 = E2(() => F), Dr2 = l([j2, N, k2, B2, I2, Zr2, y2, Fr2, Ir2, Lr2]), F = x2([kr2, f2(Dr2), Br2]), Ur2 = f2(l([sr2, cr2, lr2, fr2, j2, N, k2, B2, I2, F, y2, pr2, vr2])), Vr2 = Ur2, Gr2 = z3(Vr2), L2 = Gr2, Tr2 = i(/\\./, p2), qr2 = i(/./, p2), Hr2 = i(/\*\*\*+/, "*"), Jr2 = i(/([^/{[(!])\*\*/, (r, e) => `${e}*`), Qr2 = i(/(^|.)\*\*(?=[^*/)\]}])/, (r, e) => `${e}*`), Wr2 = f2(l([Tr2, Hr2, Jr2, Qr2, qr2])), Kr2 = Wr2, Xr2 = z3(Kr2), Yr2 = Xr2, $ = (r, e) => {
      const n = Array.isArray(r) ? r : [r];
      if (!n.length) return false;
      const a2 = n.map($.compile), t = n.every((s2) => /(\/(?:\*\*)?|\[\/\])$/.test(s2)), o = e.replace(/[\\\/]+/g, "/").replace(/\/$/, t ? "/" : "");
      return a2.some((s2) => s2.test(o));
    };
    $.compile = (r) => new RegExp(`^${L2(Yr2(r))}$`, "s");
    var re2 = $;
    return J(w2);
  })();
  return __lib__.default || __lib__;
};
var _match;
var zeptomatch = (path, pattern) => {
  if (!_match) {
    _match = _lazyMatch();
    _lazyMatch = null;
  }
  return _match(path, pattern);
};
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
var _EXTNAME_RE = /.(\.[^./]+|\.)$/;
var _PATH_ROOT_RE = /^[/\\]|^[a-zA-Z]:[/\\]/;
var sep = "/";
var normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
var join = function(...segments) {
  let path = "";
  for (const seg of segments) {
    if (!seg) {
      continue;
    }
    if (path.length > 0) {
      const pathTrailing = path[path.length - 1] === "/";
      const segLeading = seg[0] === "/";
      const both = pathTrailing && segLeading;
      if (both) {
        path += seg.slice(1);
      } else {
        path += pathTrailing || segLeading ? seg : `/${seg}`;
      }
    } else {
      path += seg;
    }
  }
  return normalize(path);
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p2) {
  return _IS_ABSOLUTE_RE.test(p2);
};
var toNamespacedPath = function(p2) {
  return normalizeWindowsPath(p2);
};
var extname = function(p2) {
  if (p2 === "..") return "";
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p2));
  return match && match[1] || "";
};
var relative = function(from, to2) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to2).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
var dirname = function(p2) {
  const segments = normalizeWindowsPath(p2).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p2) ? "/" : ".");
};
var format = function(p2) {
  const ext = p2.ext ? p2.ext.startsWith(".") ? p2.ext : `.${p2.ext}` : "";
  const segments = [p2.root, p2.dir, p2.base ?? (p2.name ?? "") + ext].filter(
    Boolean
  );
  return normalizeWindowsPath(
    p2.root ? resolve(...segments) : segments.join("/")
  );
};
var basename = function(p2, extension) {
  const segments = normalizeWindowsPath(p2).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};
var parse = function(p2) {
  const root = _PATH_ROOT_RE.exec(p2)?.[0]?.replace(/\\/g, "/") || "";
  const base = basename(p2);
  const extension = extname(base);
  return {
    root,
    dir: dirname(p2),
    base,
    ext: extension,
    name: base.slice(0, base.length - extension.length)
  };
};
var matchesGlob = (path, pattern) => {
  return zeptomatch(pattern, normalize(path));
};
var _path = {
  __proto__: null,
  basename,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  matchesGlob,
  normalize,
  normalizeString,
  parse,
  relative,
  resolve,
  sep,
  toNamespacedPath
};

// node_modules/pathe/dist/index.mjs
var delimiter = /* @__PURE__ */ (() => globalThis.process?.platform === "win32" ? ";" : ":")();
var _platforms = { posix: void 0, win32: void 0 };
var mix = (del = delimiter) => {
  return new Proxy(_path, {
    get(_, prop) {
      if (prop === "delimiter") return del;
      if (prop === "posix") return posix;
      if (prop === "win32") return win32;
      return _platforms[prop] || _path[prop];
    }
  });
};
var posix = /* @__PURE__ */ mix(":");
var win32 = /* @__PURE__ */ mix(";");

// ../conformance-server.ts
import { z as z2 } from "./zod.js";

// ../node_modules/@modelcontextprotocol/ext-apps/dist/src/server/index.js
import { Protocol as H6 } from "./mcp.js";
import { CallToolRequestSchema as T6, CallToolResultSchema as M6, EmptyResultSchema as R6, ListToolsRequestSchema as x6, PingRequestSchema as Z6 } from "./mcp.js";
import { JSONRPCMessageSchema as YI } from "./mcp.js";
import { ContentBlockSchema as PI, CallToolResultSchema as P6, ImplementationSchema as jI, RequestIdSchema as j6, ToolSchema as J6 } from "./mcp.js";
var QI = Object.defineProperty;
var s = (r, i) => {
  for (var o in i) QI(r, o, { get: i[o], enumerable: true, configurable: true, set: (t) => i[o] = () => t });
};
var g = {};
s(g, { xor: () => al, xid: () => Ol, void: () => Zl, uuidv7: () => cl, uuidv6: () => Il, uuidv4: () => ll, uuid: () => el, util: () => D, url: () => bl, uppercase: () => Kr, unknown: () => Nr, union: () => ev, undefined: () => Rl, ulid: () => Nl, uint64: () => Tl, uint32: () => Bl, tuple: () => Yg, trim: () => mr, treeifyError: () => Xv, transform: () => Iv, toUpperCase: () => Tr, toLowerCase: () => Hr, toJSONSchema: () => Yi, templateLiteral: () => lI, symbol: () => Ml, superRefine: () => ee, success: () => uI, stringbool: () => wI, stringFormat: () => El, string: () => Mi, strictObject: () => yl, startsWith: () => Qr, slugify: () => Mr, size: () => kr, setErrorMap: () => b6, set: () => iI, safeParseAsync: () => lg, safeParse: () => eg, safeEncodeAsync: () => Dg, safeEncode: () => Ug, safeDecodeAsync: () => wg, safeDecode: () => kg, registry: () => ui, regexes: () => x, regex: () => Er, refine: () => ge, record: () => Fg, readonly: () => ie, property: () => Ai, promise: () => II, prettifyError: () => Ev, preprocess: () => OI, prefault: () => yg, positive: () => Wi, pipe: () => Gn, partialRecord: () => sl, parseAsync: () => gg, parse: () => ug, overwrite: () => d, optional: () => Jn, object: () => fl, number: () => Og, nullish: () => $I, nullable: () => Ln, null: () => Jg, normalize: () => Br, nonpositive: () => Xi, nonoptional: () => hg, nonnegative: () => Ei, never: () => gv, negative: () => Vi, nativeEnum: () => vI, nanoid: () => kl, nan: () => gI, multipleOf: () => ur, minSize: () => a, minLength: () => nr, mime: () => Fr, meta: () => kI, maxSize: () => gr, maxLength: () => Dr, map: () => nI, mac: () => Pl, lte: () => M, lt: () => y, lowercase: () => Ar, looseRecord: () => rI, looseObject: () => hl, locales: () => On, literal: () => oI, length: () => wr, lazy: () => te, ksuid: () => zl, keyof: () => Cl, jwt: () => Xl, json: () => NI, iso: () => Zr, ipv6: () => jl, ipv4: () => Sl, intersection: () => qg, int64: () => Hl, int32: () => Fl, int: () => Ri, instanceof: () => DI, includes: () => qr, httpUrl: () => _l, hostname: () => Al, hex: () => Kl, hash: () => ql, guid: () => gl, gte: () => Q, gt: () => h, globalRegistry: () => A, getErrorMap: () => _6, function: () => cI, fromJSONSchema: () => SI, formatError: () => en, float64: () => Yl, float32: () => Ql, flattenError: () => gn, file: () => tI, exactOptional: () => xg, enum: () => lv, endsWith: () => Yr, encodeAsync: () => bg, encode: () => Ig, emoji: () => Ul, email: () => ul, e164: () => Vl, discriminatedUnion: () => pl, describe: () => UI, decodeAsync: () => _g, decode: () => cg, date: () => dl, custom: () => _I, cuid2: () => wl, cuid: () => Dl, core: () => ir, config: () => E, coerce: () => Ie, codec: () => eI, clone: () => q, cidrv6: () => Ll, cidrv4: () => Jl, check: () => bI, catch: () => sg, boolean: () => zg, bigint: () => ml, base64url: () => Wl, base64: () => Gl, array: () => Xn, any: () => xl, _function: () => cI, _default: () => Cg, _ZodString: () => xi, ZodXor: () => Eg, ZodXID: () => ai, ZodVoid: () => Vg, ZodUnknown: () => Gg, ZodUnion: () => An, ZodUndefined: () => Pg, ZodUUID: () => p, ZodURL: () => Wn, ZodULID: () => hi, ZodType: () => P, ZodTuple: () => Qg, ZodTransform: () => Mg, ZodTemplateLiteral: () => ve, ZodSymbol: () => Sg, ZodSuccess: () => ag, ZodStringFormat: () => W, ZodString: () => Cr, ZodSet: () => mg, ZodRecord: () => Kn, ZodRealError: () => H, ZodReadonly: () => ne, ZodPromise: () => $e, ZodPrefault: () => fg, ZodPipe: () => _v, ZodOptional: () => cv, ZodObject: () => En, ZodNumberFormat: () => Or, ZodNumber: () => yr, ZodNullable: () => Zg, ZodNull: () => jg, ZodNonOptional: () => bv, ZodNever: () => Wg, ZodNanoID: () => Ci, ZodNaN: () => re, ZodMap: () => Bg, ZodMAC: () => Ng, ZodLiteral: () => Hg, ZodLazy: () => oe, ZodKSUID: () => pi, ZodJWT: () => $v, ZodIssueCode: () => c6, ZodIntersection: () => Kg, ZodISOTime: () => Hi, ZodISODuration: () => Ti, ZodISODateTime: () => Bi, ZodISODate: () => mi, ZodIPv6: () => rv, ZodIPv4: () => si, ZodGUID: () => jn, ZodFunction: () => ue, ZodFirstPartyTypeKind: () => le, ZodFile: () => Tg, ZodExactOptional: () => Rg, ZodError: () => l6, ZodEnum: () => dr, ZodEmoji: () => di, ZodEmail: () => Zi, ZodE164: () => tv, ZodDiscriminatedUnion: () => Ag, ZodDefault: () => dg, ZodDate: () => Vn, ZodCustomStringFormat: () => fr, ZodCustom: () => qn, ZodCodec: () => Uv, ZodCatch: () => pg, ZodCUID2: () => yi, ZodCUID: () => fi, ZodCIDRv6: () => iv, ZodCIDRv4: () => nv, ZodBoolean: () => hr, ZodBigIntFormat: () => uv, ZodBigInt: () => ar, ZodBase64URL: () => ov, ZodBase64: () => vv, ZodArray: () => Xg, ZodAny: () => Lg, TimePrecision: () => Y$, NEVER: () => Nv, $output: () => X$, $input: () => E$, $brand: () => Ov });
var ir = {};
s(ir, { version: () => Lo, util: () => D, treeifyError: () => Xv, toJSONSchema: () => Yi, toDotPath: () => Xe, safeParseAsync: () => Kv, safeParse: () => Av, safeEncodeAsync: () => Uc, safeEncode: () => bc, safeDecodeAsync: () => kc, safeDecode: () => _c, registry: () => ui, regexes: () => x, process: () => L, prettifyError: () => Ev, parseAsync: () => mn, parse: () => Bn, meta: () => ku, locales: () => On, isValidJWT: () => ye, isValidBase64URL: () => fe, isValidBase64: () => yo, initializeContext: () => er, globalRegistry: () => A, globalConfig: () => sr, formatError: () => en, flattenError: () => gn, finalize: () => Ir, extractDefs: () => lr, encodeAsync: () => Ic, encode: () => ec, describe: () => Uu, decodeAsync: () => cc, decode: () => lc, createToJSONSchemaMethod: () => wu, createStandardJSONSchemaMethod: () => xr, config: () => E, clone: () => q, _xor: () => H4, _xid: () => wi, _void: () => $u, _uuidv7: () => ci, _uuidv6: () => Ii, _uuidv4: () => li, _uuid: () => ei, _url: () => Sn, _uppercase: () => Kr, _unknown: () => ou, _union: () => m4, _undefined: () => nu, _ulid: () => Di, _uint64: () => s$, _uint32: () => C$, _tuple: () => R4, _trim: () => mr, _transform: () => h4, _toUpperCase: () => Tr, _toLowerCase: () => Hr, _templateLiteral: () => t6, _symbol: () => ru, _superRefine: () => _u, _success: () => n6, _stringbool: () => Du, _stringFormat: () => Rr, _string: () => K$, _startsWith: () => Qr, _slugify: () => Mr, _size: () => kr, _set: () => d4, _safeParseAsync: () => Wr, _safeParse: () => Gr, _safeEncodeAsync: () => dn, _safeEncode: () => xn, _safeDecodeAsync: () => Cn, _safeDecode: () => Zn, _regex: () => Er, _refine: () => bu, _record: () => x4, _readonly: () => o6, _property: () => Ai, _promise: () => u6, _positive: () => Wi, _pipe: () => v6, _parseAsync: () => Lr, _parse: () => Jr, _overwrite: () => d, _optional: () => a4, _number: () => T$, _nullable: () => p4, _null: () => iu, _normalize: () => Br, _nonpositive: () => Xi, _nonoptional: () => r6, _nonnegative: () => Ei, _never: () => tu, _negative: () => Vi, _nativeEnum: () => f4, _nanoid: () => _i, _nan: () => eu, _multipleOf: () => ur, _minSize: () => a, _minLength: () => nr, _min: () => Q, _mime: () => Fr, _maxSize: () => gr, _maxLength: () => Dr, _max: () => M, _map: () => Z4, _mac: () => Q$, _lte: () => M, _lt: () => y, _lowercase: () => Ar, _literal: () => y4, _length: () => wr, _lazy: () => $6, _ksuid: () => Ni, _jwt: () => Gi, _isoTime: () => m$, _isoDuration: () => H$, _isoDateTime: () => F$, _isoDate: () => B$, _ipv6: () => zi, _ipv4: () => Oi, _intersection: () => M4, _int64: () => p$, _int32: () => d$, _int: () => R$, _includes: () => qr, _guid: () => zn, _gte: () => Q, _gt: () => h, _float64: () => Z$, _float32: () => x$, _file: () => Iu, _enum: () => C4, _endsWith: () => Yr, _encodeAsync: () => Mn, _encode: () => Hn, _emoji: () => bi, _email: () => gi, _e164: () => Li, _discriminatedUnion: () => T4, _default: () => s4, _decodeAsync: () => Rn, _decode: () => Tn, _date: () => uu, _custom: () => cu, _cuid2: () => ki, _cuid: () => Ui, _coercedString: () => q$, _coercedNumber: () => M$, _coercedDate: () => gu, _coercedBoolean: () => y$, _coercedBigint: () => a$, _cidrv6: () => Pi, _cidrv4: () => Si, _check: () => ol, _catch: () => i6, _boolean: () => f$, _bigint: () => h$, _base64url: () => Ji, _base64: () => ji, _array: () => lu, _any: () => vu, TimePrecision: () => Y$, NEVER: () => Nv, JSONSchemaGenerator: () => ig, JSONSchema: () => tl, Doc: () => an, $output: () => X$, $input: () => E$, $constructor: () => I, $brand: () => Ov, $ZodXor: () => bt, $ZodXID: () => Fo, $ZodVoid: () => et, $ZodUnknown: () => ut, $ZodUnion: () => _n, $ZodUndefined: () => ot, $ZodUUID: () => Vo, $ZodURL: () => Eo, $ZodULID: () => Yo, $ZodType: () => S, $ZodTuple: () => ti, $ZodTransform: () => St, $ZodTemplateLiteral: () => Kt, $ZodSymbol: () => vt, $ZodSuccess: () => Wt, $ZodStringFormat: () => G, $ZodString: () => Ur, $ZodSet: () => wt, $ZodRegistry: () => A$, $ZodRecord: () => kt, $ZodRealError: () => m, $ZodReadonly: () => At, $ZodPromise: () => Qt, $ZodPrefault: () => Lt, $ZodPipe: () => Et, $ZodOptional: () => $i, $ZodObjectJIT: () => ct, $ZodObject: () => pe, $ZodNumberFormat: () => nt, $ZodNumber: () => vi, $ZodNullable: () => jt, $ZodNull: () => tt, $ZodNonOptional: () => Gt, $ZodNever: () => gt, $ZodNanoID: () => Ko, $ZodNaN: () => Xt, $ZodMap: () => Dt, $ZodMAC: () => Zo, $ZodLiteral: () => Ot, $ZodLazy: () => Yt, $ZodKSUID: () => Bo, $ZodJWT: () => so, $ZodIntersection: () => Ut, $ZodISOTime: () => To, $ZodISODuration: () => Mo, $ZodISODateTime: () => mo, $ZodISODate: () => Ho, $ZodIPv6: () => xo, $ZodIPv4: () => Ro, $ZodGUID: () => Wo, $ZodFunction: () => qt, $ZodFile: () => zt, $ZodExactOptional: () => Pt, $ZodError: () => un, $ZodEnum: () => Nt, $ZodEncodeError: () => cr, $ZodEmoji: () => Ao, $ZodEmail: () => Xo, $ZodE164: () => po, $ZodDiscriminatedUnion: () => _t, $ZodDefault: () => Jt, $ZodDate: () => lt, $ZodCustomStringFormat: () => rt, $ZodCustom: () => Ft, $ZodCodec: () => Un, $ZodCheckUpperCase: () => No, $ZodCheckStringFormat: () => Vr, $ZodCheckStartsWith: () => zo, $ZodCheckSizeEquals: () => bo, $ZodCheckRegex: () => Do, $ZodCheckProperty: () => Po, $ZodCheckOverwrite: () => Jo, $ZodCheckNumberFormat: () => eo, $ZodCheckMultipleOf: () => go, $ZodCheckMinSize: () => co, $ZodCheckMinLength: () => Uo, $ZodCheckMimeType: () => jo, $ZodCheckMaxSize: () => Io, $ZodCheckMaxLength: () => _o, $ZodCheckLowerCase: () => wo, $ZodCheckLessThan: () => yn, $ZodCheckLengthEquals: () => ko, $ZodCheckIncludes: () => Oo, $ZodCheckGreaterThan: () => hn, $ZodCheckEndsWith: () => So, $ZodCheckBigIntFormat: () => lo, $ZodCheck: () => V, $ZodCatch: () => Vt, $ZodCUID2: () => Qo, $ZodCUID: () => qo, $ZodCIDRv6: () => fo, $ZodCIDRv4: () => Co, $ZodBoolean: () => bn, $ZodBigIntFormat: () => it, $ZodBigInt: () => oi, $ZodBase64URL: () => ao, $ZodBase64: () => ho, $ZodAsyncError: () => f, $ZodArray: () => It, $ZodAny: () => $t });
var Nv = Object.freeze({ status: "aborted" });
function I(r, i, o) {
  function t(u, l) {
    if (!u._zod) Object.defineProperty(u, "_zod", { value: { def: l, constr: $, traits: /* @__PURE__ */ new Set() }, enumerable: false });
    if (u._zod.traits.has(r)) return;
    u._zod.traits.add(r), i(u, l);
    let e = $.prototype, c = Object.keys(e);
    for (let _ = 0; _ < c.length; _++) {
      let N = c[_];
      if (!(N in u)) u[N] = e[N].bind(u);
    }
  }
  let n = o?.Parent ?? Object;
  class v extends n {
  }
  Object.defineProperty(v, "name", { value: r });
  function $(u) {
    var l;
    let e = o?.Parent ? new v() : this;
    t(e, u), (l = e._zod).deferred ?? (l.deferred = []);
    for (let c of e._zod.deferred) c();
    return e;
  }
  return Object.defineProperty($, "init", { value: t }), Object.defineProperty($, Symbol.hasInstance, { value: (u) => {
    if (o?.Parent && u instanceof o.Parent) return true;
    return u?._zod?.traits?.has(r);
  } }), Object.defineProperty($, "name", { value: r }), $;
}
var Ov = Symbol("zod_brand");
var f = class extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
};
var cr = class extends Error {
  constructor(r) {
    super(`Encountered unidirectional transform during encode: ${r}`);
    this.name = "ZodEncodeError";
  }
};
var sr = {};
function E(r) {
  if (r) Object.assign(sr, r);
  return sr;
}
var D = {};
s(D, { unwrapMessage: () => rn, uint8ArrayToHex: () => uc, uint8ArrayToBase64url: () => tc, uint8ArrayToBase64: () => Ge, stringifyPrimitive: () => U, slugify: () => Pv, shallowClone: () => Jv, safeExtend: () => sI, required: () => ic, randomString: () => dI, propertyKeyTypes: () => on, promiseAllObject: () => ZI, primitiveTypes: () => Lv, prefixIssues: () => T, pick: () => hI, partial: () => nc, parsedType: () => k, optionalKeys: () => Gv, omit: () => aI, objectClone: () => MI, numKeys: () => CI, nullish: () => vr, normalizeParams: () => w, mergeDefs: () => rr, merge: () => rc, jsonStringifyReplacer: () => Sr, joinValues: () => b, issue: () => jr, isPlainObject: () => tr, isObject: () => br, hexToUint8Array: () => $c, getSizableOrigin: () => tn, getParsedType: () => fI, getLengthableOrigin: () => $n, getEnumValues: () => nn, getElementAtPath: () => xI, floatSafeRemainder: () => Sv, finalizeIssue: () => B, extend: () => pI, escapeRegex: () => R, esc: () => Yn, defineLazy: () => j, createTransparentProxy: () => yI, cloneDef: () => RI, clone: () => q, cleanRegex: () => vn, cleanEnum: () => vc, captureStackTrace: () => Fn, cached: () => Pr, base64urlToUint8Array: () => oc, base64ToUint8Array: () => Le, assignProp: () => or, assertNotEqual: () => BI, assertNever: () => HI, assertIs: () => mI, assertEqual: () => FI, assert: () => TI, allowsEval: () => jv, aborted: () => $r, NUMBER_FORMAT_RANGES: () => Wv, Class: () => We, BIGINT_FORMAT_RANGES: () => Vv });
function FI(r) {
  return r;
}
function BI(r) {
  return r;
}
function mI(r) {
}
function HI(r) {
  throw Error("Unexpected value in exhaustive check");
}
function TI(r) {
}
function nn(r) {
  let i = Object.values(r).filter((t) => typeof t === "number");
  return Object.entries(r).filter(([t, n]) => i.indexOf(+t) === -1).map(([t, n]) => n);
}
function b(r, i = "|") {
  return r.map((o) => U(o)).join(i);
}
function Sr(r, i) {
  if (typeof i === "bigint") return i.toString();
  return i;
}
function Pr(r) {
  return { get value() {
    {
      let o = r();
      return Object.defineProperty(this, "value", { value: o }), o;
    }
    throw Error("cached value already set");
  } };
}
function vr(r) {
  return r === null || r === void 0;
}
function vn(r) {
  let i = r.startsWith("^") ? 1 : 0, o = r.endsWith("$") ? r.length - 1 : r.length;
  return r.slice(i, o);
}
function Sv(r, i) {
  let o = (r.toString().split(".")[1] || "").length, t = i.toString(), n = (t.split(".")[1] || "").length;
  if (n === 0 && /\d?e-\d?/.test(t)) {
    let l = t.match(/\d?e-(\d?)/);
    if (l?.[1]) n = Number.parseInt(l[1]);
  }
  let v = o > n ? o : n, $ = Number.parseInt(r.toFixed(v).replace(".", "")), u = Number.parseInt(i.toFixed(v).replace(".", ""));
  return $ % u / 10 ** v;
}
var Je = Symbol("evaluating");
function j(r, i, o) {
  let t = void 0;
  Object.defineProperty(r, i, { get() {
    if (t === Je) return;
    if (t === void 0) t = Je, t = o();
    return t;
  }, set(n) {
    Object.defineProperty(r, i, { value: n });
  }, configurable: true });
}
function MI(r) {
  return Object.create(Object.getPrototypeOf(r), Object.getOwnPropertyDescriptors(r));
}
function or(r, i, o) {
  Object.defineProperty(r, i, { value: o, writable: true, enumerable: true, configurable: true });
}
function rr(...r) {
  let i = {};
  for (let o of r) {
    let t = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, t);
  }
  return Object.defineProperties({}, i);
}
function RI(r) {
  return rr(r._zod.def);
}
function xI(r, i) {
  if (!i) return r;
  return i.reduce((o, t) => o?.[t], r);
}
function ZI(r) {
  let i = Object.keys(r), o = i.map((t) => r[t]);
  return Promise.all(o).then((t) => {
    let n = {};
    for (let v = 0; v < i.length; v++) n[i[v]] = t[v];
    return n;
  });
}
function dI(r = 10) {
  let o = "";
  for (let t = 0; t < r; t++) o += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  return o;
}
function Yn(r) {
  return JSON.stringify(r);
}
function Pv(r) {
  return r.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var Fn = "captureStackTrace" in Error ? Error.captureStackTrace : (...r) => {
};
function br(r) {
  return typeof r === "object" && r !== null && !Array.isArray(r);
}
var jv = Pr(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return false;
  try {
    return new Function(""), true;
  } catch (r) {
    return false;
  }
});
function tr(r) {
  if (br(r) === false) return false;
  let i = r.constructor;
  if (i === void 0) return true;
  if (typeof i !== "function") return true;
  let o = i.prototype;
  if (br(o) === false) return false;
  if (Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === false) return false;
  return true;
}
function Jv(r) {
  if (tr(r)) return { ...r };
  if (Array.isArray(r)) return [...r];
  return r;
}
function CI(r) {
  let i = 0;
  for (let o in r) if (Object.prototype.hasOwnProperty.call(r, o)) i++;
  return i;
}
var fI = (r) => {
  let i = typeof r;
  switch (i) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(r) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(r)) return "array";
      if (r === null) return "null";
      if (r.then && typeof r.then === "function" && r.catch && typeof r.catch === "function") return "promise";
      if (typeof Map < "u" && r instanceof Map) return "map";
      if (typeof Set < "u" && r instanceof Set) return "set";
      if (typeof Date < "u" && r instanceof Date) return "date";
      if (typeof File < "u" && r instanceof File) return "file";
      return "object";
    default:
      throw Error(`Unknown data type: ${i}`);
  }
};
var on = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var Lv = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function R(r) {
  return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function q(r, i, o) {
  let t = new r._zod.constr(i ?? r._zod.def);
  if (!i || o?.parent) t._zod.parent = r;
  return t;
}
function w(r) {
  let i = r;
  if (!i) return {};
  if (typeof i === "string") return { error: () => i };
  if (i?.message !== void 0) {
    if (i?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
    i.error = i.message;
  }
  if (delete i.message, typeof i.error === "string") return { ...i, error: () => i.error };
  return i;
}
function yI(r) {
  let i;
  return new Proxy({}, { get(o, t, n) {
    return i ?? (i = r()), Reflect.get(i, t, n);
  }, set(o, t, n, v) {
    return i ?? (i = r()), Reflect.set(i, t, n, v);
  }, has(o, t) {
    return i ?? (i = r()), Reflect.has(i, t);
  }, deleteProperty(o, t) {
    return i ?? (i = r()), Reflect.deleteProperty(i, t);
  }, ownKeys(o) {
    return i ?? (i = r()), Reflect.ownKeys(i);
  }, getOwnPropertyDescriptor(o, t) {
    return i ?? (i = r()), Reflect.getOwnPropertyDescriptor(i, t);
  }, defineProperty(o, t, n) {
    return i ?? (i = r()), Reflect.defineProperty(i, t, n);
  } });
}
function U(r) {
  if (typeof r === "bigint") return r.toString() + "n";
  if (typeof r === "string") return `"${r}"`;
  return `${r}`;
}
function Gv(r) {
  return Object.keys(r).filter((i) => {
    return r[i]._zod.optin === "optional" && r[i]._zod.optout === "optional";
  });
}
var Wv = { safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], int32: [-2147483648, 2147483647], uint32: [0, 4294967295], float32: [-34028234663852886e22, 34028234663852886e22], float64: [-Number.MAX_VALUE, Number.MAX_VALUE] };
var Vv = { int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")], uint64: [BigInt(0), BigInt("18446744073709551615")] };
function hI(r, i) {
  let o = r._zod.def, t = o.checks;
  if (t && t.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
  let v = rr(r._zod.def, { get shape() {
    let $ = {};
    for (let u in i) {
      if (!(u in o.shape)) throw Error(`Unrecognized key: "${u}"`);
      if (!i[u]) continue;
      $[u] = o.shape[u];
    }
    return or(this, "shape", $), $;
  }, checks: [] });
  return q(r, v);
}
function aI(r, i) {
  let o = r._zod.def, t = o.checks;
  if (t && t.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
  let v = rr(r._zod.def, { get shape() {
    let $ = { ...r._zod.def.shape };
    for (let u in i) {
      if (!(u in o.shape)) throw Error(`Unrecognized key: "${u}"`);
      if (!i[u]) continue;
      delete $[u];
    }
    return or(this, "shape", $), $;
  }, checks: [] });
  return q(r, v);
}
function pI(r, i) {
  if (!tr(i)) throw Error("Invalid input to extend: expected a plain object");
  let o = r._zod.def.checks;
  if (o && o.length > 0) {
    let v = r._zod.def.shape;
    for (let $ in i) if (Object.getOwnPropertyDescriptor(v, $) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  let n = rr(r._zod.def, { get shape() {
    let v = { ...r._zod.def.shape, ...i };
    return or(this, "shape", v), v;
  } });
  return q(r, n);
}
function sI(r, i) {
  if (!tr(i)) throw Error("Invalid input to safeExtend: expected a plain object");
  let o = rr(r._zod.def, { get shape() {
    let t = { ...r._zod.def.shape, ...i };
    return or(this, "shape", t), t;
  } });
  return q(r, o);
}
function rc(r, i) {
  let o = rr(r._zod.def, { get shape() {
    let t = { ...r._zod.def.shape, ...i._zod.def.shape };
    return or(this, "shape", t), t;
  }, get catchall() {
    return i._zod.def.catchall;
  }, checks: [] });
  return q(r, o);
}
function nc(r, i, o) {
  let n = i._zod.def.checks;
  if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
  let $ = rr(i._zod.def, { get shape() {
    let u = i._zod.def.shape, l = { ...u };
    if (o) for (let e in o) {
      if (!(e in u)) throw Error(`Unrecognized key: "${e}"`);
      if (!o[e]) continue;
      l[e] = r ? new r({ type: "optional", innerType: u[e] }) : u[e];
    }
    else for (let e in u) l[e] = r ? new r({ type: "optional", innerType: u[e] }) : u[e];
    return or(this, "shape", l), l;
  }, checks: [] });
  return q(i, $);
}
function ic(r, i, o) {
  let t = rr(i._zod.def, { get shape() {
    let n = i._zod.def.shape, v = { ...n };
    if (o) for (let $ in o) {
      if (!($ in v)) throw Error(`Unrecognized key: "${$}"`);
      if (!o[$]) continue;
      v[$] = new r({ type: "nonoptional", innerType: n[$] });
    }
    else for (let $ in n) v[$] = new r({ type: "nonoptional", innerType: n[$] });
    return or(this, "shape", v), v;
  } });
  return q(i, t);
}
function $r(r, i = 0) {
  if (r.aborted === true) return true;
  for (let o = i; o < r.issues.length; o++) if (r.issues[o]?.continue !== true) return true;
  return false;
}
function T(r, i) {
  return i.map((o) => {
    var t;
    return (t = o).path ?? (t.path = []), o.path.unshift(r), o;
  });
}
function rn(r) {
  return typeof r === "string" ? r : r?.message;
}
function B(r, i, o) {
  let t = { ...r, path: r.path ?? [] };
  if (!r.message) {
    let n = rn(r.inst?._zod.def?.error?.(r)) ?? rn(i?.error?.(r)) ?? rn(o.customError?.(r)) ?? rn(o.localeError?.(r)) ?? "Invalid input";
    t.message = n;
  }
  if (delete t.inst, delete t.continue, !i?.reportInput) delete t.input;
  return t;
}
function tn(r) {
  if (r instanceof Set) return "set";
  if (r instanceof Map) return "map";
  if (r instanceof File) return "file";
  return "unknown";
}
function $n(r) {
  if (Array.isArray(r)) return "array";
  if (typeof r === "string") return "string";
  return "unknown";
}
function k(r) {
  let i = typeof r;
  switch (i) {
    case "number":
      return Number.isNaN(r) ? "nan" : "number";
    case "object": {
      if (r === null) return "null";
      if (Array.isArray(r)) return "array";
      let o = r;
      if (o && Object.getPrototypeOf(o) !== Object.prototype && "constructor" in o && o.constructor) return o.constructor.name;
    }
  }
  return i;
}
function jr(...r) {
  let [i, o, t] = r;
  if (typeof i === "string") return { message: i, code: "custom", input: o, inst: t };
  return { ...i };
}
function vc(r) {
  return Object.entries(r).filter(([i, o]) => {
    return Number.isNaN(Number.parseInt(i, 10));
  }).map((i) => i[1]);
}
function Le(r) {
  let i = atob(r), o = new Uint8Array(i.length);
  for (let t = 0; t < i.length; t++) o[t] = i.charCodeAt(t);
  return o;
}
function Ge(r) {
  let i = "";
  for (let o = 0; o < r.length; o++) i += String.fromCharCode(r[o]);
  return btoa(i);
}
function oc(r) {
  let i = r.replace(/-/g, "+").replace(/_/g, "/"), o = "=".repeat((4 - i.length % 4) % 4);
  return Le(i + o);
}
function tc(r) {
  return Ge(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function $c(r) {
  let i = r.replace(/^0x/, "");
  if (i.length % 2 !== 0) throw Error("Invalid hex string length");
  let o = new Uint8Array(i.length / 2);
  for (let t = 0; t < i.length; t += 2) o[t / 2] = Number.parseInt(i.slice(t, t + 2), 16);
  return o;
}
function uc(r) {
  return Array.from(r).map((i) => i.toString(16).padStart(2, "0")).join("");
}
var We = class {
  constructor(...r) {
  }
};
var Ve = (r, i) => {
  r.name = "$ZodError", Object.defineProperty(r, "_zod", { value: r._zod, enumerable: false }), Object.defineProperty(r, "issues", { value: i, enumerable: false }), r.message = JSON.stringify(i, Sr, 2), Object.defineProperty(r, "toString", { value: () => r.message, enumerable: false });
};
var un = I("$ZodError", Ve);
var m = I("$ZodError", Ve, { Parent: Error });
function gn(r, i = (o) => o.message) {
  let o = {}, t = [];
  for (let n of r.issues) if (n.path.length > 0) o[n.path[0]] = o[n.path[0]] || [], o[n.path[0]].push(i(n));
  else t.push(i(n));
  return { formErrors: t, fieldErrors: o };
}
function en(r, i = (o) => o.message) {
  let o = { _errors: [] }, t = (n) => {
    for (let v of n.issues) if (v.code === "invalid_union" && v.errors.length) v.errors.map(($) => t({ issues: $ }));
    else if (v.code === "invalid_key") t({ issues: v.issues });
    else if (v.code === "invalid_element") t({ issues: v.issues });
    else if (v.path.length === 0) o._errors.push(i(v));
    else {
      let $ = o, u = 0;
      while (u < v.path.length) {
        let l = v.path[u];
        if (u !== v.path.length - 1) $[l] = $[l] || { _errors: [] };
        else $[l] = $[l] || { _errors: [] }, $[l]._errors.push(i(v));
        $ = $[l], u++;
      }
    }
  };
  return t(r), o;
}
function Xv(r, i = (o) => o.message) {
  let o = { errors: [] }, t = (n, v = []) => {
    var $, u;
    for (let l of n.issues) if (l.code === "invalid_union" && l.errors.length) l.errors.map((e) => t({ issues: e }, l.path));
    else if (l.code === "invalid_key") t({ issues: l.issues }, l.path);
    else if (l.code === "invalid_element") t({ issues: l.issues }, l.path);
    else {
      let e = [...v, ...l.path];
      if (e.length === 0) {
        o.errors.push(i(l));
        continue;
      }
      let c = o, _ = 0;
      while (_ < e.length) {
        let N = e[_], O = _ === e.length - 1;
        if (typeof N === "string") c.properties ?? (c.properties = {}), ($ = c.properties)[N] ?? ($[N] = { errors: [] }), c = c.properties[N];
        else c.items ?? (c.items = []), (u = c.items)[N] ?? (u[N] = { errors: [] }), c = c.items[N];
        if (O) c.errors.push(i(l));
        _++;
      }
    }
  };
  return t(r), o;
}
function Xe(r) {
  let i = [], o = r.map((t) => typeof t === "object" ? t.key : t);
  for (let t of o) if (typeof t === "number") i.push(`[${t}]`);
  else if (typeof t === "symbol") i.push(`[${JSON.stringify(String(t))}]`);
  else if (/[^\w$]/.test(t)) i.push(`[${JSON.stringify(t)}]`);
  else {
    if (i.length) i.push(".");
    i.push(t);
  }
  return i.join("");
}
function Ev(r) {
  let i = [], o = [...r.issues].sort((t, n) => (t.path ?? []).length - (n.path ?? []).length);
  for (let t of o) if (i.push(`\u2716 ${t.message}`), t.path?.length) i.push(`  \u2192 at ${Xe(t.path)}`);
  return i.join(`
`);
}
var Jr = (r) => (i, o, t, n) => {
  let v = t ? Object.assign(t, { async: false }) : { async: false }, $ = i._zod.run({ value: o, issues: [] }, v);
  if ($ instanceof Promise) throw new f();
  if ($.issues.length) {
    let u = new (n?.Err ?? r)($.issues.map((l) => B(l, v, E())));
    throw Fn(u, n?.callee), u;
  }
  return $.value;
};
var Bn = Jr(m);
var Lr = (r) => async (i, o, t, n) => {
  let v = t ? Object.assign(t, { async: true }) : { async: true }, $ = i._zod.run({ value: o, issues: [] }, v);
  if ($ instanceof Promise) $ = await $;
  if ($.issues.length) {
    let u = new (n?.Err ?? r)($.issues.map((l) => B(l, v, E())));
    throw Fn(u, n?.callee), u;
  }
  return $.value;
};
var mn = Lr(m);
var Gr = (r) => (i, o, t) => {
  let n = t ? { ...t, async: false } : { async: false }, v = i._zod.run({ value: o, issues: [] }, n);
  if (v instanceof Promise) throw new f();
  return v.issues.length ? { success: false, error: new (r ?? un)(v.issues.map(($) => B($, n, E()))) } : { success: true, data: v.value };
};
var Av = Gr(m);
var Wr = (r) => async (i, o, t) => {
  let n = t ? Object.assign(t, { async: true }) : { async: true }, v = i._zod.run({ value: o, issues: [] }, n);
  if (v instanceof Promise) v = await v;
  return v.issues.length ? { success: false, error: new r(v.issues.map(($) => B($, n, E()))) } : { success: true, data: v.value };
};
var Kv = Wr(m);
var Hn = (r) => (i, o, t) => {
  let n = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Jr(r)(i, o, n);
};
var ec = Hn(m);
var Tn = (r) => (i, o, t) => {
  return Jr(r)(i, o, t);
};
var lc = Tn(m);
var Mn = (r) => async (i, o, t) => {
  let n = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Lr(r)(i, o, n);
};
var Ic = Mn(m);
var Rn = (r) => async (i, o, t) => {
  return Lr(r)(i, o, t);
};
var cc = Rn(m);
var xn = (r) => (i, o, t) => {
  let n = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Gr(r)(i, o, n);
};
var bc = xn(m);
var Zn = (r) => (i, o, t) => {
  return Gr(r)(i, o, t);
};
var _c = Zn(m);
var dn = (r) => async (i, o, t) => {
  let n = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Wr(r)(i, o, n);
};
var Uc = dn(m);
var Cn = (r) => async (i, o, t) => {
  return Wr(r)(i, o, t);
};
var kc = Cn(m);
var x = {};
s(x, { xid: () => Fv, uuid7: () => Oc, uuid6: () => Nc, uuid4: () => wc, uuid: () => _r, uppercase: () => uo, unicodeEmail: () => Ee, undefined: () => to, ulid: () => Yv, time: () => pv, string: () => ro, sha512_hex: () => Tc, sha512_base64url: () => Rc, sha512_base64: () => Mc, sha384_hex: () => Bc, sha384_base64url: () => Hc, sha384_base64: () => mc, sha256_hex: () => Qc, sha256_base64url: () => Fc, sha256_base64: () => Yc, sha1_hex: () => Ac, sha1_base64url: () => qc, sha1_base64: () => Kc, rfc5322Email: () => Sc, number: () => ln, null: () => oo, nanoid: () => mv, md5_hex: () => Vc, md5_base64url: () => Ec, md5_base64: () => Xc, mac: () => dv, lowercase: () => $o, ksuid: () => Bv, ipv6: () => Zv, ipv4: () => xv, integer: () => io, idnEmail: () => Pc, html5Email: () => zc, hostname: () => Lc, hex: () => Wc, guid: () => Tv, extendedDuration: () => Dc, emoji: () => Rv, email: () => Mv, e164: () => hv, duration: () => Hv, domain: () => Gc, datetime: () => sv, date: () => av, cuid2: () => Qv, cuid: () => qv, cidrv6: () => fv, cidrv4: () => Cv, browserEmail: () => jc, boolean: () => vo, bigint: () => no, base64url: () => fn, base64: () => yv });
var qv = /^[cC][^\s-]{8,}$/;
var Qv = /^[0-9a-z]+$/;
var Yv = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var Fv = /^[0-9a-vA-V]{20}$/;
var Bv = /^[A-Za-z0-9]{27}$/;
var mv = /^[a-zA-Z0-9_-]{21}$/;
var Hv = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var Dc = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var Tv = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var _r = (r) => {
  if (!r) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${r}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var wc = _r(4);
var Nc = _r(6);
var Oc = _r(7);
var Mv = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var zc = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Sc = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var Ee = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var Pc = Ee;
var jc = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Jc = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Rv() {
  return new RegExp(Jc, "u");
}
var xv = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var Zv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var dv = (r) => {
  let i = R(r ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${i}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${i}){5}[0-9a-f]{2}$`);
};
var Cv = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var fv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var yv = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var fn = /^[A-Za-z0-9_-]*$/;
var Lc = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var Gc = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var hv = /^\+[1-9]\d{6,14}$/;
var Ae = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
var av = new RegExp(`^${Ae}$`);
function Ke(r) {
  return typeof r.precision === "number" ? r.precision === -1 ? "(?:[01]\\d|2[0-3]):[0-5]\\d" : r.precision === 0 ? "(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d" : `(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${r.precision}}` : "(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?";
}
function pv(r) {
  return new RegExp(`^${Ke(r)}$`);
}
function sv(r) {
  let i = Ke({ precision: r.precision }), o = ["Z"];
  if (r.local) o.push("");
  if (r.offset) o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let t = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${Ae}T(?:${t})$`);
}
var ro = (r) => {
  let i = r ? `[\\s\\S]{${r?.minimum ?? 0},${r?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
};
var no = /^-?\d+n?$/;
var io = /^-?\d+$/;
var ln = /^-?\d+(?:\.\d+)?$/;
var vo = /^(?:true|false)$/i;
var oo = /^null$/i;
var to = /^undefined$/i;
var $o = /^[^A-Z]*$/;
var uo = /^[^a-z]*$/;
var Wc = /^[0-9a-fA-F]*$/;
function In(r, i) {
  return new RegExp(`^[A-Za-z0-9+/]{${r}}${i}$`);
}
function cn(r) {
  return new RegExp(`^[A-Za-z0-9_-]{${r}}$`);
}
var Vc = /^[0-9a-fA-F]{32}$/;
var Xc = In(22, "==");
var Ec = cn(22);
var Ac = /^[0-9a-fA-F]{40}$/;
var Kc = In(27, "=");
var qc = cn(27);
var Qc = /^[0-9a-fA-F]{64}$/;
var Yc = In(43, "=");
var Fc = cn(43);
var Bc = /^[0-9a-fA-F]{96}$/;
var mc = In(64, "");
var Hc = cn(64);
var Tc = /^[0-9a-fA-F]{128}$/;
var Mc = In(86, "==");
var Rc = cn(86);
var V = I("$ZodCheck", (r, i) => {
  var o;
  r._zod ?? (r._zod = {}), r._zod.def = i, (o = r._zod).onattach ?? (o.onattach = []);
});
var Qe = { number: "number", bigint: "bigint", object: "date" };
var yn = I("$ZodCheckLessThan", (r, i) => {
  V.init(r, i);
  let o = Qe[typeof i.value];
  r._zod.onattach.push((t) => {
    let n = t._zod.bag, v = (i.inclusive ? n.maximum : n.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (i.value < v) if (i.inclusive) n.maximum = i.value;
    else n.exclusiveMaximum = i.value;
  }), r._zod.check = (t) => {
    if (i.inclusive ? t.value <= i.value : t.value < i.value) return;
    t.issues.push({ origin: o, code: "too_big", maximum: typeof i.value === "object" ? i.value.getTime() : i.value, input: t.value, inclusive: i.inclusive, inst: r, continue: !i.abort });
  };
});
var hn = I("$ZodCheckGreaterThan", (r, i) => {
  V.init(r, i);
  let o = Qe[typeof i.value];
  r._zod.onattach.push((t) => {
    let n = t._zod.bag, v = (i.inclusive ? n.minimum : n.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (i.value > v) if (i.inclusive) n.minimum = i.value;
    else n.exclusiveMinimum = i.value;
  }), r._zod.check = (t) => {
    if (i.inclusive ? t.value >= i.value : t.value > i.value) return;
    t.issues.push({ origin: o, code: "too_small", minimum: typeof i.value === "object" ? i.value.getTime() : i.value, input: t.value, inclusive: i.inclusive, inst: r, continue: !i.abort });
  };
});
var go = I("$ZodCheckMultipleOf", (r, i) => {
  V.init(r, i), r._zod.onattach.push((o) => {
    var t;
    (t = o._zod.bag).multipleOf ?? (t.multipleOf = i.value);
  }), r._zod.check = (o) => {
    if (typeof o.value !== typeof i.value) throw Error("Cannot mix number and bigint in multiple_of check.");
    if (typeof o.value === "bigint" ? o.value % i.value === BigInt(0) : Sv(o.value, i.value) === 0) return;
    o.issues.push({ origin: typeof o.value, code: "not_multiple_of", divisor: i.value, input: o.value, inst: r, continue: !i.abort });
  };
});
var eo = I("$ZodCheckNumberFormat", (r, i) => {
  V.init(r, i), i.format = i.format || "float64";
  let o = i.format?.includes("int"), t = o ? "int" : "number", [n, v] = Wv[i.format];
  r._zod.onattach.push(($) => {
    let u = $._zod.bag;
    if (u.format = i.format, u.minimum = n, u.maximum = v, o) u.pattern = io;
  }), r._zod.check = ($) => {
    let u = $.value;
    if (o) {
      if (!Number.isInteger(u)) {
        $.issues.push({ expected: t, format: i.format, code: "invalid_type", continue: false, input: u, inst: r });
        return;
      }
      if (!Number.isSafeInteger(u)) {
        if (u > 0) $.issues.push({ input: u, code: "too_big", maximum: Number.MAX_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: r, origin: t, inclusive: true, continue: !i.abort });
        else $.issues.push({ input: u, code: "too_small", minimum: Number.MIN_SAFE_INTEGER, note: "Integers must be within the safe integer range.", inst: r, origin: t, inclusive: true, continue: !i.abort });
        return;
      }
    }
    if (u < n) $.issues.push({ origin: "number", input: u, code: "too_small", minimum: n, inclusive: true, inst: r, continue: !i.abort });
    if (u > v) $.issues.push({ origin: "number", input: u, code: "too_big", maximum: v, inclusive: true, inst: r, continue: !i.abort });
  };
});
var lo = I("$ZodCheckBigIntFormat", (r, i) => {
  V.init(r, i);
  let [o, t] = Vv[i.format];
  r._zod.onattach.push((n) => {
    let v = n._zod.bag;
    v.format = i.format, v.minimum = o, v.maximum = t;
  }), r._zod.check = (n) => {
    let v = n.value;
    if (v < o) n.issues.push({ origin: "bigint", input: v, code: "too_small", minimum: o, inclusive: true, inst: r, continue: !i.abort });
    if (v > t) n.issues.push({ origin: "bigint", input: v, code: "too_big", maximum: t, inclusive: true, inst: r, continue: !i.abort });
  };
});
var Io = I("$ZodCheckMaxSize", (r, i) => {
  var o;
  V.init(r, i), (o = r._zod.def).when ?? (o.when = (t) => {
    let n = t.value;
    return !vr(n) && n.size !== void 0;
  }), r._zod.onattach.push((t) => {
    let n = t._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (i.maximum < n) t._zod.bag.maximum = i.maximum;
  }), r._zod.check = (t) => {
    let n = t.value;
    if (n.size <= i.maximum) return;
    t.issues.push({ origin: tn(n), code: "too_big", maximum: i.maximum, inclusive: true, input: n, inst: r, continue: !i.abort });
  };
});
var co = I("$ZodCheckMinSize", (r, i) => {
  var o;
  V.init(r, i), (o = r._zod.def).when ?? (o.when = (t) => {
    let n = t.value;
    return !vr(n) && n.size !== void 0;
  }), r._zod.onattach.push((t) => {
    let n = t._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (i.minimum > n) t._zod.bag.minimum = i.minimum;
  }), r._zod.check = (t) => {
    let n = t.value;
    if (n.size >= i.minimum) return;
    t.issues.push({ origin: tn(n), code: "too_small", minimum: i.minimum, inclusive: true, input: n, inst: r, continue: !i.abort });
  };
});
var bo = I("$ZodCheckSizeEquals", (r, i) => {
  var o;
  V.init(r, i), (o = r._zod.def).when ?? (o.when = (t) => {
    let n = t.value;
    return !vr(n) && n.size !== void 0;
  }), r._zod.onattach.push((t) => {
    let n = t._zod.bag;
    n.minimum = i.size, n.maximum = i.size, n.size = i.size;
  }), r._zod.check = (t) => {
    let n = t.value, v = n.size;
    if (v === i.size) return;
    let $ = v > i.size;
    t.issues.push({ origin: tn(n), ...$ ? { code: "too_big", maximum: i.size } : { code: "too_small", minimum: i.size }, inclusive: true, exact: true, input: t.value, inst: r, continue: !i.abort });
  };
});
var _o = I("$ZodCheckMaxLength", (r, i) => {
  var o;
  V.init(r, i), (o = r._zod.def).when ?? (o.when = (t) => {
    let n = t.value;
    return !vr(n) && n.length !== void 0;
  }), r._zod.onattach.push((t) => {
    let n = t._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (i.maximum < n) t._zod.bag.maximum = i.maximum;
  }), r._zod.check = (t) => {
    let n = t.value;
    if (n.length <= i.maximum) return;
    let $ = $n(n);
    t.issues.push({ origin: $, code: "too_big", maximum: i.maximum, inclusive: true, input: n, inst: r, continue: !i.abort });
  };
});
var Uo = I("$ZodCheckMinLength", (r, i) => {
  var o;
  V.init(r, i), (o = r._zod.def).when ?? (o.when = (t) => {
    let n = t.value;
    return !vr(n) && n.length !== void 0;
  }), r._zod.onattach.push((t) => {
    let n = t._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (i.minimum > n) t._zod.bag.minimum = i.minimum;
  }), r._zod.check = (t) => {
    let n = t.value;
    if (n.length >= i.minimum) return;
    let $ = $n(n);
    t.issues.push({ origin: $, code: "too_small", minimum: i.minimum, inclusive: true, input: n, inst: r, continue: !i.abort });
  };
});
var ko = I("$ZodCheckLengthEquals", (r, i) => {
  var o;
  V.init(r, i), (o = r._zod.def).when ?? (o.when = (t) => {
    let n = t.value;
    return !vr(n) && n.length !== void 0;
  }), r._zod.onattach.push((t) => {
    let n = t._zod.bag;
    n.minimum = i.length, n.maximum = i.length, n.length = i.length;
  }), r._zod.check = (t) => {
    let n = t.value, v = n.length;
    if (v === i.length) return;
    let $ = $n(n), u = v > i.length;
    t.issues.push({ origin: $, ...u ? { code: "too_big", maximum: i.length } : { code: "too_small", minimum: i.length }, inclusive: true, exact: true, input: t.value, inst: r, continue: !i.abort });
  };
});
var Vr = I("$ZodCheckStringFormat", (r, i) => {
  var o, t;
  if (V.init(r, i), r._zod.onattach.push((n) => {
    let v = n._zod.bag;
    if (v.format = i.format, i.pattern) v.patterns ?? (v.patterns = /* @__PURE__ */ new Set()), v.patterns.add(i.pattern);
  }), i.pattern) (o = r._zod).check ?? (o.check = (n) => {
    if (i.pattern.lastIndex = 0, i.pattern.test(n.value)) return;
    n.issues.push({ origin: "string", code: "invalid_format", format: i.format, input: n.value, ...i.pattern ? { pattern: i.pattern.toString() } : {}, inst: r, continue: !i.abort });
  });
  else (t = r._zod).check ?? (t.check = () => {
  });
});
var Do = I("$ZodCheckRegex", (r, i) => {
  Vr.init(r, i), r._zod.check = (o) => {
    if (i.pattern.lastIndex = 0, i.pattern.test(o.value)) return;
    o.issues.push({ origin: "string", code: "invalid_format", format: "regex", input: o.value, pattern: i.pattern.toString(), inst: r, continue: !i.abort });
  };
});
var wo = I("$ZodCheckLowerCase", (r, i) => {
  i.pattern ?? (i.pattern = $o), Vr.init(r, i);
});
var No = I("$ZodCheckUpperCase", (r, i) => {
  i.pattern ?? (i.pattern = uo), Vr.init(r, i);
});
var Oo = I("$ZodCheckIncludes", (r, i) => {
  V.init(r, i);
  let o = R(i.includes), t = new RegExp(typeof i.position === "number" ? `^.{${i.position}}${o}` : o);
  i.pattern = t, r._zod.onattach.push((n) => {
    let v = n._zod.bag;
    v.patterns ?? (v.patterns = /* @__PURE__ */ new Set()), v.patterns.add(t);
  }), r._zod.check = (n) => {
    if (n.value.includes(i.includes, i.position)) return;
    n.issues.push({ origin: "string", code: "invalid_format", format: "includes", includes: i.includes, input: n.value, inst: r, continue: !i.abort });
  };
});
var zo = I("$ZodCheckStartsWith", (r, i) => {
  V.init(r, i);
  let o = new RegExp(`^${R(i.prefix)}.*`);
  i.pattern ?? (i.pattern = o), r._zod.onattach.push((t) => {
    let n = t._zod.bag;
    n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(o);
  }), r._zod.check = (t) => {
    if (t.value.startsWith(i.prefix)) return;
    t.issues.push({ origin: "string", code: "invalid_format", format: "starts_with", prefix: i.prefix, input: t.value, inst: r, continue: !i.abort });
  };
});
var So = I("$ZodCheckEndsWith", (r, i) => {
  V.init(r, i);
  let o = new RegExp(`.*${R(i.suffix)}$`);
  i.pattern ?? (i.pattern = o), r._zod.onattach.push((t) => {
    let n = t._zod.bag;
    n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(o);
  }), r._zod.check = (t) => {
    if (t.value.endsWith(i.suffix)) return;
    t.issues.push({ origin: "string", code: "invalid_format", format: "ends_with", suffix: i.suffix, input: t.value, inst: r, continue: !i.abort });
  };
});
function qe(r, i, o) {
  if (r.issues.length) i.issues.push(...T(o, r.issues));
}
var Po = I("$ZodCheckProperty", (r, i) => {
  V.init(r, i), r._zod.check = (o) => {
    let t = i.schema._zod.run({ value: o.value[i.property], issues: [] }, {});
    if (t instanceof Promise) return t.then((n) => qe(n, o, i.property));
    qe(t, o, i.property);
    return;
  };
});
var jo = I("$ZodCheckMimeType", (r, i) => {
  V.init(r, i);
  let o = new Set(i.mime);
  r._zod.onattach.push((t) => {
    t._zod.bag.mime = i.mime;
  }), r._zod.check = (t) => {
    if (o.has(t.value.type)) return;
    t.issues.push({ code: "invalid_value", values: i.mime, input: t.value.type, inst: r, continue: !i.abort });
  };
});
var Jo = I("$ZodCheckOverwrite", (r, i) => {
  V.init(r, i), r._zod.check = (o) => {
    o.value = i.tx(o.value);
  };
});
var an = class {
  constructor(r = []) {
    if (this.content = [], this.indent = 0, this) this.args = r;
  }
  indented(r) {
    this.indent += 1, r(this), this.indent -= 1;
  }
  write(r) {
    if (typeof r === "function") {
      r(this, { execution: "sync" }), r(this, { execution: "async" });
      return;
    }
    let o = r.split(`
`).filter((v) => v), t = Math.min(...o.map((v) => v.length - v.trimStart().length)), n = o.map((v) => v.slice(t)).map((v) => " ".repeat(this.indent * 2) + v);
    for (let v of n) this.content.push(v);
  }
  compile() {
    let r = Function, i = this?.args, t = [...(this?.content ?? [""]).map((n) => `  ${n}`)];
    return new r(...i, t.join(`
`));
  }
};
var Lo = { major: 4, minor: 3, patch: 5 };
var S = I("$ZodType", (r, i) => {
  var o;
  r ?? (r = {}), r._zod.def = i, r._zod.bag = r._zod.bag || {}, r._zod.version = Lo;
  let t = [...r._zod.def.checks ?? []];
  if (r._zod.traits.has("$ZodCheck")) t.unshift(r);
  for (let n of t) for (let v of n._zod.onattach) v(r);
  if (t.length === 0) (o = r._zod).deferred ?? (o.deferred = []), r._zod.deferred?.push(() => {
    r._zod.run = r._zod.parse;
  });
  else {
    let n = ($, u, l) => {
      let e = $r($), c;
      for (let _ of u) {
        if (_._zod.def.when) {
          if (!_._zod.def.when($)) continue;
        } else if (e) continue;
        let N = $.issues.length, O = _._zod.check($);
        if (O instanceof Promise && l?.async === false) throw new f();
        if (c || O instanceof Promise) c = (c ?? Promise.resolve()).then(async () => {
          if (await O, $.issues.length === N) return;
          if (!e) e = $r($, N);
        });
        else {
          if ($.issues.length === N) continue;
          if (!e) e = $r($, N);
        }
      }
      if (c) return c.then(() => {
        return $;
      });
      return $;
    }, v = ($, u, l) => {
      if ($r($)) return $.aborted = true, $;
      let e = n(u, t, l);
      if (e instanceof Promise) {
        if (l.async === false) throw new f();
        return e.then((c) => r._zod.parse(c, l));
      }
      return r._zod.parse(e, l);
    };
    r._zod.run = ($, u) => {
      if (u.skipChecks) return r._zod.parse($, u);
      if (u.direction === "backward") {
        let e = r._zod.parse({ value: $.value, issues: [] }, { ...u, skipChecks: true });
        if (e instanceof Promise) return e.then((c) => {
          return v(c, $, u);
        });
        return v(e, $, u);
      }
      let l = r._zod.parse($, u);
      if (l instanceof Promise) {
        if (u.async === false) throw new f();
        return l.then((e) => n(e, t, u));
      }
      return n(l, t, u);
    };
  }
  j(r, "~standard", () => ({ validate: (n) => {
    try {
      let v = Av(r, n);
      return v.success ? { value: v.data } : { issues: v.error?.issues };
    } catch (v) {
      return Kv(r, n).then(($) => $.success ? { value: $.data } : { issues: $.error?.issues });
    }
  }, vendor: "zod", version: 1 }));
});
var Ur = I("$ZodString", (r, i) => {
  S.init(r, i), r._zod.pattern = [...r?._zod.bag?.patterns ?? []].pop() ?? ro(r._zod.bag), r._zod.parse = (o, t) => {
    if (i.coerce) try {
      o.value = String(o.value);
    } catch (n) {
    }
    if (typeof o.value === "string") return o;
    return o.issues.push({ expected: "string", code: "invalid_type", input: o.value, inst: r }), o;
  };
});
var G = I("$ZodStringFormat", (r, i) => {
  Vr.init(r, i), Ur.init(r, i);
});
var Wo = I("$ZodGUID", (r, i) => {
  i.pattern ?? (i.pattern = Tv), G.init(r, i);
});
var Vo = I("$ZodUUID", (r, i) => {
  if (i.version) {
    let t = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[i.version];
    if (t === void 0) throw Error(`Invalid UUID version: "${i.version}"`);
    i.pattern ?? (i.pattern = _r(t));
  } else i.pattern ?? (i.pattern = _r());
  G.init(r, i);
});
var Xo = I("$ZodEmail", (r, i) => {
  i.pattern ?? (i.pattern = Mv), G.init(r, i);
});
var Eo = I("$ZodURL", (r, i) => {
  G.init(r, i), r._zod.check = (o) => {
    try {
      let t = o.value.trim(), n = new URL(t);
      if (i.hostname) {
        if (i.hostname.lastIndex = 0, !i.hostname.test(n.hostname)) o.issues.push({ code: "invalid_format", format: "url", note: "Invalid hostname", pattern: i.hostname.source, input: o.value, inst: r, continue: !i.abort });
      }
      if (i.protocol) {
        if (i.protocol.lastIndex = 0, !i.protocol.test(n.protocol.endsWith(":") ? n.protocol.slice(0, -1) : n.protocol)) o.issues.push({ code: "invalid_format", format: "url", note: "Invalid protocol", pattern: i.protocol.source, input: o.value, inst: r, continue: !i.abort });
      }
      if (i.normalize) o.value = n.href;
      else o.value = t;
      return;
    } catch (t) {
      o.issues.push({ code: "invalid_format", format: "url", input: o.value, inst: r, continue: !i.abort });
    }
  };
});
var Ao = I("$ZodEmoji", (r, i) => {
  i.pattern ?? (i.pattern = Rv()), G.init(r, i);
});
var Ko = I("$ZodNanoID", (r, i) => {
  i.pattern ?? (i.pattern = mv), G.init(r, i);
});
var qo = I("$ZodCUID", (r, i) => {
  i.pattern ?? (i.pattern = qv), G.init(r, i);
});
var Qo = I("$ZodCUID2", (r, i) => {
  i.pattern ?? (i.pattern = Qv), G.init(r, i);
});
var Yo = I("$ZodULID", (r, i) => {
  i.pattern ?? (i.pattern = Yv), G.init(r, i);
});
var Fo = I("$ZodXID", (r, i) => {
  i.pattern ?? (i.pattern = Fv), G.init(r, i);
});
var Bo = I("$ZodKSUID", (r, i) => {
  i.pattern ?? (i.pattern = Bv), G.init(r, i);
});
var mo = I("$ZodISODateTime", (r, i) => {
  i.pattern ?? (i.pattern = sv(i)), G.init(r, i);
});
var Ho = I("$ZodISODate", (r, i) => {
  i.pattern ?? (i.pattern = av), G.init(r, i);
});
var To = I("$ZodISOTime", (r, i) => {
  i.pattern ?? (i.pattern = pv(i)), G.init(r, i);
});
var Mo = I("$ZodISODuration", (r, i) => {
  i.pattern ?? (i.pattern = Hv), G.init(r, i);
});
var Ro = I("$ZodIPv4", (r, i) => {
  i.pattern ?? (i.pattern = xv), G.init(r, i), r._zod.bag.format = "ipv4";
});
var xo = I("$ZodIPv6", (r, i) => {
  i.pattern ?? (i.pattern = Zv), G.init(r, i), r._zod.bag.format = "ipv6", r._zod.check = (o) => {
    try {
      new URL(`http://[${o.value}]`);
    } catch {
      o.issues.push({ code: "invalid_format", format: "ipv6", input: o.value, inst: r, continue: !i.abort });
    }
  };
});
var Zo = I("$ZodMAC", (r, i) => {
  i.pattern ?? (i.pattern = dv(i.delimiter)), G.init(r, i), r._zod.bag.format = "mac";
});
var Co = I("$ZodCIDRv4", (r, i) => {
  i.pattern ?? (i.pattern = Cv), G.init(r, i);
});
var fo = I("$ZodCIDRv6", (r, i) => {
  i.pattern ?? (i.pattern = fv), G.init(r, i), r._zod.check = (o) => {
    let t = o.value.split("/");
    try {
      if (t.length !== 2) throw Error();
      let [n, v] = t;
      if (!v) throw Error();
      let $ = Number(v);
      if (`${$}` !== v) throw Error();
      if ($ < 0 || $ > 128) throw Error();
      new URL(`http://[${n}]`);
    } catch {
      o.issues.push({ code: "invalid_format", format: "cidrv6", input: o.value, inst: r, continue: !i.abort });
    }
  };
});
function yo(r) {
  if (r === "") return true;
  if (r.length % 4 !== 0) return false;
  try {
    return atob(r), true;
  } catch {
    return false;
  }
}
var ho = I("$ZodBase64", (r, i) => {
  i.pattern ?? (i.pattern = yv), G.init(r, i), r._zod.bag.contentEncoding = "base64", r._zod.check = (o) => {
    if (yo(o.value)) return;
    o.issues.push({ code: "invalid_format", format: "base64", input: o.value, inst: r, continue: !i.abort });
  };
});
function fe(r) {
  if (!fn.test(r)) return false;
  let i = r.replace(/[-_]/g, (t) => t === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return yo(o);
}
var ao = I("$ZodBase64URL", (r, i) => {
  i.pattern ?? (i.pattern = fn), G.init(r, i), r._zod.bag.contentEncoding = "base64url", r._zod.check = (o) => {
    if (fe(o.value)) return;
    o.issues.push({ code: "invalid_format", format: "base64url", input: o.value, inst: r, continue: !i.abort });
  };
});
var po = I("$ZodE164", (r, i) => {
  i.pattern ?? (i.pattern = hv), G.init(r, i);
});
function ye(r, i = null) {
  try {
    let o = r.split(".");
    if (o.length !== 3) return false;
    let [t] = o;
    if (!t) return false;
    let n = JSON.parse(atob(t));
    if ("typ" in n && n?.typ !== "JWT") return false;
    if (!n.alg) return false;
    if (i && (!("alg" in n) || n.alg !== i)) return false;
    return true;
  } catch {
    return false;
  }
}
var so = I("$ZodJWT", (r, i) => {
  G.init(r, i), r._zod.check = (o) => {
    if (ye(o.value, i.alg)) return;
    o.issues.push({ code: "invalid_format", format: "jwt", input: o.value, inst: r, continue: !i.abort });
  };
});
var rt = I("$ZodCustomStringFormat", (r, i) => {
  G.init(r, i), r._zod.check = (o) => {
    if (i.fn(o.value)) return;
    o.issues.push({ code: "invalid_format", format: i.format, input: o.value, inst: r, continue: !i.abort });
  };
});
var vi = I("$ZodNumber", (r, i) => {
  S.init(r, i), r._zod.pattern = r._zod.bag.pattern ?? ln, r._zod.parse = (o, t) => {
    if (i.coerce) try {
      o.value = Number(o.value);
    } catch ($) {
    }
    let n = o.value;
    if (typeof n === "number" && !Number.isNaN(n) && Number.isFinite(n)) return o;
    let v = typeof n === "number" ? Number.isNaN(n) ? "NaN" : !Number.isFinite(n) ? "Infinity" : void 0 : void 0;
    return o.issues.push({ expected: "number", code: "invalid_type", input: n, inst: r, ...v ? { received: v } : {} }), o;
  };
});
var nt = I("$ZodNumberFormat", (r, i) => {
  eo.init(r, i), vi.init(r, i);
});
var bn = I("$ZodBoolean", (r, i) => {
  S.init(r, i), r._zod.pattern = vo, r._zod.parse = (o, t) => {
    if (i.coerce) try {
      o.value = Boolean(o.value);
    } catch (v) {
    }
    let n = o.value;
    if (typeof n === "boolean") return o;
    return o.issues.push({ expected: "boolean", code: "invalid_type", input: n, inst: r }), o;
  };
});
var oi = I("$ZodBigInt", (r, i) => {
  S.init(r, i), r._zod.pattern = no, r._zod.parse = (o, t) => {
    if (i.coerce) try {
      o.value = BigInt(o.value);
    } catch (n) {
    }
    if (typeof o.value === "bigint") return o;
    return o.issues.push({ expected: "bigint", code: "invalid_type", input: o.value, inst: r }), o;
  };
});
var it = I("$ZodBigIntFormat", (r, i) => {
  lo.init(r, i), oi.init(r, i);
});
var vt = I("$ZodSymbol", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (typeof n === "symbol") return o;
    return o.issues.push({ expected: "symbol", code: "invalid_type", input: n, inst: r }), o;
  };
});
var ot = I("$ZodUndefined", (r, i) => {
  S.init(r, i), r._zod.pattern = to, r._zod.values = /* @__PURE__ */ new Set([void 0]), r._zod.optin = "optional", r._zod.optout = "optional", r._zod.parse = (o, t) => {
    let n = o.value;
    if (typeof n > "u") return o;
    return o.issues.push({ expected: "undefined", code: "invalid_type", input: n, inst: r }), o;
  };
});
var tt = I("$ZodNull", (r, i) => {
  S.init(r, i), r._zod.pattern = oo, r._zod.values = /* @__PURE__ */ new Set([null]), r._zod.parse = (o, t) => {
    let n = o.value;
    if (n === null) return o;
    return o.issues.push({ expected: "null", code: "invalid_type", input: n, inst: r }), o;
  };
});
var $t = I("$ZodAny", (r, i) => {
  S.init(r, i), r._zod.parse = (o) => o;
});
var ut = I("$ZodUnknown", (r, i) => {
  S.init(r, i), r._zod.parse = (o) => o;
});
var gt = I("$ZodNever", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    return o.issues.push({ expected: "never", code: "invalid_type", input: o.value, inst: r }), o;
  };
});
var et = I("$ZodVoid", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (typeof n > "u") return o;
    return o.issues.push({ expected: "void", code: "invalid_type", input: n, inst: r }), o;
  };
});
var lt = I("$ZodDate", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    if (i.coerce) try {
      o.value = new Date(o.value);
    } catch (u) {
    }
    let n = o.value, v = n instanceof Date;
    if (v && !Number.isNaN(n.getTime())) return o;
    return o.issues.push({ expected: "date", code: "invalid_type", input: n, ...v ? { received: "Invalid Date" } : {}, inst: r }), o;
  };
});
function Fe(r, i, o) {
  if (r.issues.length) i.issues.push(...T(o, r.issues));
  i.value[o] = r.value;
}
var It = I("$ZodArray", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (!Array.isArray(n)) return o.issues.push({ expected: "array", code: "invalid_type", input: n, inst: r }), o;
    o.value = Array(n.length);
    let v = [];
    for (let $ = 0; $ < n.length; $++) {
      let u = n[$], l = i.element._zod.run({ value: u, issues: [] }, t);
      if (l instanceof Promise) v.push(l.then((e) => Fe(e, o, $)));
      else Fe(l, o, $);
    }
    if (v.length) return Promise.all(v).then(() => o);
    return o;
  };
});
function ii(r, i, o, t, n) {
  if (r.issues.length) {
    if (n && !(o in t)) return;
    i.issues.push(...T(o, r.issues));
  }
  if (r.value === void 0) {
    if (o in t) i.value[o] = void 0;
  } else i.value[o] = r.value;
}
function he(r) {
  let i = Object.keys(r.shape);
  for (let t of i) if (!r.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
  let o = Gv(r.shape);
  return { ...r, keys: i, keySet: new Set(i), numKeys: i.length, optionalKeys: new Set(o) };
}
function ae(r, i, o, t, n, v) {
  let $ = [], u = n.keySet, l = n.catchall._zod, e = l.def.type, c = l.optout === "optional";
  for (let _ in i) {
    if (u.has(_)) continue;
    if (e === "never") {
      $.push(_);
      continue;
    }
    let N = l.run({ value: i[_], issues: [] }, t);
    if (N instanceof Promise) r.push(N.then((O) => ii(O, o, _, i, c)));
    else ii(N, o, _, i, c);
  }
  if ($.length) o.issues.push({ code: "unrecognized_keys", keys: $, input: i, inst: v });
  if (!r.length) return o;
  return Promise.all(r).then(() => {
    return o;
  });
}
var pe = I("$ZodObject", (r, i) => {
  if (S.init(r, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
    let u = i.shape;
    Object.defineProperty(i, "shape", { get: () => {
      let l = { ...u };
      return Object.defineProperty(i, "shape", { value: l }), l;
    } });
  }
  let t = Pr(() => he(i));
  j(r._zod, "propValues", () => {
    let u = i.shape, l = {};
    for (let e in u) {
      let c = u[e]._zod;
      if (c.values) {
        l[e] ?? (l[e] = /* @__PURE__ */ new Set());
        for (let _ of c.values) l[e].add(_);
      }
    }
    return l;
  });
  let n = br, v = i.catchall, $;
  r._zod.parse = (u, l) => {
    $ ?? ($ = t.value);
    let e = u.value;
    if (!n(e)) return u.issues.push({ expected: "object", code: "invalid_type", input: e, inst: r }), u;
    u.value = {};
    let c = [], _ = $.shape;
    for (let N of $.keys) {
      let O = _[N], J = O._zod.optout === "optional", X = O._zod.run({ value: e[N], issues: [] }, l);
      if (X instanceof Promise) c.push(X.then((zr) => ii(zr, u, N, e, J)));
      else ii(X, u, N, e, J);
    }
    if (!v) return c.length ? Promise.all(c).then(() => u) : u;
    return ae(c, e, u, l, t.value, r);
  };
});
var ct = I("$ZodObjectJIT", (r, i) => {
  pe.init(r, i);
  let o = r._zod.parse, t = Pr(() => he(i)), n = (N) => {
    let O = new an(["shape", "payload", "ctx"]), J = t.value, X = (C) => {
      let F = Yn(C);
      return `shape[${F}]._zod.run({ value: input[${F}], issues: [] }, ctx)`;
    };
    O.write("const input = payload.value;");
    let zr = /* @__PURE__ */ Object.create(null), AI = 0;
    for (let C of J.keys) zr[C] = `key_${AI++}`;
    O.write("const newResult = {};");
    for (let C of J.keys) {
      let F = zr[C], Z = Yn(C), qI = N[C]?._zod?.optout === "optional";
      if (O.write(`const ${F} = ${X(C)};`), qI) O.write(`
        if (${F}.issues.length) {
          if (${Z} in input) {
            payload.issues = payload.issues.concat(${F}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${Z}, ...iss.path] : [${Z}]
            })));
          }
        }
        
        if (${F}.value === undefined) {
          if (${Z} in input) {
            newResult[${Z}] = undefined;
          }
        } else {
          newResult[${Z}] = ${F}.value;
        }
        
      `);
      else O.write(`
        if (${F}.issues.length) {
          payload.issues = payload.issues.concat(${F}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${Z}, ...iss.path] : [${Z}]
          })));
        }
        
        if (${F}.value === undefined) {
          if (${Z} in input) {
            newResult[${Z}] = undefined;
          }
        } else {
          newResult[${Z}] = ${F}.value;
        }
        
      `);
    }
    O.write("payload.value = newResult;"), O.write("return payload;");
    let KI = O.compile();
    return (C, F) => KI(N, C, F);
  }, v, $ = br, u = !sr.jitless, e = u && jv.value, c = i.catchall, _;
  r._zod.parse = (N, O) => {
    _ ?? (_ = t.value);
    let J = N.value;
    if (!$(J)) return N.issues.push({ expected: "object", code: "invalid_type", input: J, inst: r }), N;
    if (u && e && O?.async === false && O.jitless !== true) {
      if (!v) v = n(i.shape);
      if (N = v(N, O), !c) return N;
      return ae([], J, N, O, _, r);
    }
    return o(N, O);
  };
});
function Be(r, i, o, t) {
  for (let v of r) if (v.issues.length === 0) return i.value = v.value, i;
  let n = r.filter((v) => !$r(v));
  if (n.length === 1) return i.value = n[0].value, n[0];
  return i.issues.push({ code: "invalid_union", input: i.value, inst: o, errors: r.map((v) => v.issues.map(($) => B($, t, E()))) }), i;
}
var _n = I("$ZodUnion", (r, i) => {
  S.init(r, i), j(r._zod, "optin", () => i.options.some((n) => n._zod.optin === "optional") ? "optional" : void 0), j(r._zod, "optout", () => i.options.some((n) => n._zod.optout === "optional") ? "optional" : void 0), j(r._zod, "values", () => {
    if (i.options.every((n) => n._zod.values)) return new Set(i.options.flatMap((n) => Array.from(n._zod.values)));
    return;
  }), j(r._zod, "pattern", () => {
    if (i.options.every((n) => n._zod.pattern)) {
      let n = i.options.map((v) => v._zod.pattern);
      return new RegExp(`^(${n.map((v) => vn(v.source)).join("|")})$`);
    }
    return;
  });
  let o = i.options.length === 1, t = i.options[0]._zod.run;
  r._zod.parse = (n, v) => {
    if (o) return t(n, v);
    let $ = false, u = [];
    for (let l of i.options) {
      let e = l._zod.run({ value: n.value, issues: [] }, v);
      if (e instanceof Promise) u.push(e), $ = true;
      else {
        if (e.issues.length === 0) return e;
        u.push(e);
      }
    }
    if (!$) return Be(u, n, r, v);
    return Promise.all(u).then((l) => {
      return Be(l, n, r, v);
    });
  };
});
function me(r, i, o, t) {
  let n = r.filter((v) => v.issues.length === 0);
  if (n.length === 1) return i.value = n[0].value, i;
  if (n.length === 0) i.issues.push({ code: "invalid_union", input: i.value, inst: o, errors: r.map((v) => v.issues.map(($) => B($, t, E()))) });
  else i.issues.push({ code: "invalid_union", input: i.value, inst: o, errors: [], inclusive: false });
  return i;
}
var bt = I("$ZodXor", (r, i) => {
  _n.init(r, i), i.inclusive = false;
  let o = i.options.length === 1, t = i.options[0]._zod.run;
  r._zod.parse = (n, v) => {
    if (o) return t(n, v);
    let $ = false, u = [];
    for (let l of i.options) {
      let e = l._zod.run({ value: n.value, issues: [] }, v);
      if (e instanceof Promise) u.push(e), $ = true;
      else u.push(e);
    }
    if (!$) return me(u, n, r, v);
    return Promise.all(u).then((l) => {
      return me(l, n, r, v);
    });
  };
});
var _t = I("$ZodDiscriminatedUnion", (r, i) => {
  i.inclusive = false, _n.init(r, i);
  let o = r._zod.parse;
  j(r._zod, "propValues", () => {
    let n = {};
    for (let v of i.options) {
      let $ = v._zod.propValues;
      if (!$ || Object.keys($).length === 0) throw Error(`Invalid discriminated union option at index "${i.options.indexOf(v)}"`);
      for (let [u, l] of Object.entries($)) {
        if (!n[u]) n[u] = /* @__PURE__ */ new Set();
        for (let e of l) n[u].add(e);
      }
    }
    return n;
  });
  let t = Pr(() => {
    let n = i.options, v = /* @__PURE__ */ new Map();
    for (let $ of n) {
      let u = $._zod.propValues?.[i.discriminator];
      if (!u || u.size === 0) throw Error(`Invalid discriminated union option at index "${i.options.indexOf($)}"`);
      for (let l of u) {
        if (v.has(l)) throw Error(`Duplicate discriminator value "${String(l)}"`);
        v.set(l, $);
      }
    }
    return v;
  });
  r._zod.parse = (n, v) => {
    let $ = n.value;
    if (!br($)) return n.issues.push({ code: "invalid_type", expected: "object", input: $, inst: r }), n;
    let u = t.value.get($?.[i.discriminator]);
    if (u) return u._zod.run(n, v);
    if (i.unionFallback) return o(n, v);
    return n.issues.push({ code: "invalid_union", errors: [], note: "No matching discriminator", discriminator: i.discriminator, input: $, path: [i.discriminator], inst: r }), n;
  };
});
var Ut = I("$ZodIntersection", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value, v = i.left._zod.run({ value: n, issues: [] }, t), $ = i.right._zod.run({ value: n, issues: [] }, t);
    if (v instanceof Promise || $ instanceof Promise) return Promise.all([v, $]).then(([l, e]) => {
      return He(o, l, e);
    });
    return He(o, v, $);
  };
});
function Go(r, i) {
  if (r === i) return { valid: true, data: r };
  if (r instanceof Date && i instanceof Date && +r === +i) return { valid: true, data: r };
  if (tr(r) && tr(i)) {
    let o = Object.keys(i), t = Object.keys(r).filter((v) => o.indexOf(v) !== -1), n = { ...r, ...i };
    for (let v of t) {
      let $ = Go(r[v], i[v]);
      if (!$.valid) return { valid: false, mergeErrorPath: [v, ...$.mergeErrorPath] };
      n[v] = $.data;
    }
    return { valid: true, data: n };
  }
  if (Array.isArray(r) && Array.isArray(i)) {
    if (r.length !== i.length) return { valid: false, mergeErrorPath: [] };
    let o = [];
    for (let t = 0; t < r.length; t++) {
      let n = r[t], v = i[t], $ = Go(n, v);
      if (!$.valid) return { valid: false, mergeErrorPath: [t, ...$.mergeErrorPath] };
      o.push($.data);
    }
    return { valid: true, data: o };
  }
  return { valid: false, mergeErrorPath: [] };
}
function He(r, i, o) {
  let t = /* @__PURE__ */ new Map(), n;
  for (let u of i.issues) if (u.code === "unrecognized_keys") {
    n ?? (n = u);
    for (let l of u.keys) {
      if (!t.has(l)) t.set(l, {});
      t.get(l).l = true;
    }
  } else r.issues.push(u);
  for (let u of o.issues) if (u.code === "unrecognized_keys") for (let l of u.keys) {
    if (!t.has(l)) t.set(l, {});
    t.get(l).r = true;
  }
  else r.issues.push(u);
  let v = [...t].filter(([, u]) => u.l && u.r).map(([u]) => u);
  if (v.length && n) r.issues.push({ ...n, keys: v });
  if ($r(r)) return r;
  let $ = Go(i.value, o.value);
  if (!$.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify($.mergeErrorPath)}`);
  return r.value = $.data, r;
}
var ti = I("$ZodTuple", (r, i) => {
  S.init(r, i);
  let o = i.items;
  r._zod.parse = (t, n) => {
    let v = t.value;
    if (!Array.isArray(v)) return t.issues.push({ input: v, inst: r, expected: "tuple", code: "invalid_type" }), t;
    t.value = [];
    let $ = [], u = [...o].reverse().findIndex((c) => c._zod.optin !== "optional"), l = u === -1 ? 0 : o.length - u;
    if (!i.rest) {
      let c = v.length > o.length, _ = v.length < l - 1;
      if (c || _) return t.issues.push({ ...c ? { code: "too_big", maximum: o.length, inclusive: true } : { code: "too_small", minimum: o.length }, input: v, inst: r, origin: "array" }), t;
    }
    let e = -1;
    for (let c of o) {
      if (e++, e >= v.length) {
        if (e >= l) continue;
      }
      let _ = c._zod.run({ value: v[e], issues: [] }, n);
      if (_ instanceof Promise) $.push(_.then((N) => pn(N, t, e)));
      else pn(_, t, e);
    }
    if (i.rest) {
      let c = v.slice(o.length);
      for (let _ of c) {
        e++;
        let N = i.rest._zod.run({ value: _, issues: [] }, n);
        if (N instanceof Promise) $.push(N.then((O) => pn(O, t, e)));
        else pn(N, t, e);
      }
    }
    if ($.length) return Promise.all($).then(() => t);
    return t;
  };
});
function pn(r, i, o) {
  if (r.issues.length) i.issues.push(...T(o, r.issues));
  i.value[o] = r.value;
}
var kt = I("$ZodRecord", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (!tr(n)) return o.issues.push({ expected: "record", code: "invalid_type", input: n, inst: r }), o;
    let v = [], $ = i.keyType._zod.values;
    if ($) {
      o.value = {};
      let u = /* @__PURE__ */ new Set();
      for (let e of $) if (typeof e === "string" || typeof e === "number" || typeof e === "symbol") {
        u.add(typeof e === "number" ? e.toString() : e);
        let c = i.valueType._zod.run({ value: n[e], issues: [] }, t);
        if (c instanceof Promise) v.push(c.then((_) => {
          if (_.issues.length) o.issues.push(...T(e, _.issues));
          o.value[e] = _.value;
        }));
        else {
          if (c.issues.length) o.issues.push(...T(e, c.issues));
          o.value[e] = c.value;
        }
      }
      let l;
      for (let e in n) if (!u.has(e)) l = l ?? [], l.push(e);
      if (l && l.length > 0) o.issues.push({ code: "unrecognized_keys", input: n, inst: r, keys: l });
    } else {
      o.value = {};
      for (let u of Reflect.ownKeys(n)) {
        if (u === "__proto__") continue;
        let l = i.keyType._zod.run({ value: u, issues: [] }, t);
        if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
        if (typeof u === "string" && ln.test(u) && l.issues.length && l.issues.some((_) => _.code === "invalid_type" && _.expected === "number")) {
          let _ = i.keyType._zod.run({ value: Number(u), issues: [] }, t);
          if (_ instanceof Promise) throw Error("Async schemas not supported in object keys currently");
          if (_.issues.length === 0) l = _;
        }
        if (l.issues.length) {
          if (i.mode === "loose") o.value[u] = n[u];
          else o.issues.push({ code: "invalid_key", origin: "record", issues: l.issues.map((_) => B(_, t, E())), input: u, path: [u], inst: r });
          continue;
        }
        let c = i.valueType._zod.run({ value: n[u], issues: [] }, t);
        if (c instanceof Promise) v.push(c.then((_) => {
          if (_.issues.length) o.issues.push(...T(u, _.issues));
          o.value[l.value] = _.value;
        }));
        else {
          if (c.issues.length) o.issues.push(...T(u, c.issues));
          o.value[l.value] = c.value;
        }
      }
    }
    if (v.length) return Promise.all(v).then(() => o);
    return o;
  };
});
var Dt = I("$ZodMap", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (!(n instanceof Map)) return o.issues.push({ expected: "map", code: "invalid_type", input: n, inst: r }), o;
    let v = [];
    o.value = /* @__PURE__ */ new Map();
    for (let [$, u] of n) {
      let l = i.keyType._zod.run({ value: $, issues: [] }, t), e = i.valueType._zod.run({ value: u, issues: [] }, t);
      if (l instanceof Promise || e instanceof Promise) v.push(Promise.all([l, e]).then(([c, _]) => {
        Te(c, _, o, $, n, r, t);
      }));
      else Te(l, e, o, $, n, r, t);
    }
    if (v.length) return Promise.all(v).then(() => o);
    return o;
  };
});
function Te(r, i, o, t, n, v, $) {
  if (r.issues.length) if (on.has(typeof t)) o.issues.push(...T(t, r.issues));
  else o.issues.push({ code: "invalid_key", origin: "map", input: n, inst: v, issues: r.issues.map((u) => B(u, $, E())) });
  if (i.issues.length) if (on.has(typeof t)) o.issues.push(...T(t, i.issues));
  else o.issues.push({ origin: "map", code: "invalid_element", input: n, inst: v, key: t, issues: i.issues.map((u) => B(u, $, E())) });
  o.value.set(r.value, i.value);
}
var wt = I("$ZodSet", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (!(n instanceof Set)) return o.issues.push({ input: n, inst: r, expected: "set", code: "invalid_type" }), o;
    let v = [];
    o.value = /* @__PURE__ */ new Set();
    for (let $ of n) {
      let u = i.valueType._zod.run({ value: $, issues: [] }, t);
      if (u instanceof Promise) v.push(u.then((l) => Me(l, o)));
      else Me(u, o);
    }
    if (v.length) return Promise.all(v).then(() => o);
    return o;
  };
});
function Me(r, i) {
  if (r.issues.length) i.issues.push(...r.issues);
  i.value.add(r.value);
}
var Nt = I("$ZodEnum", (r, i) => {
  S.init(r, i);
  let o = nn(i.entries), t = new Set(o);
  r._zod.values = t, r._zod.pattern = new RegExp(`^(${o.filter((n) => on.has(typeof n)).map((n) => typeof n === "string" ? R(n) : n.toString()).join("|")})$`), r._zod.parse = (n, v) => {
    let $ = n.value;
    if (t.has($)) return n;
    return n.issues.push({ code: "invalid_value", values: o, input: $, inst: r }), n;
  };
});
var Ot = I("$ZodLiteral", (r, i) => {
  if (S.init(r, i), i.values.length === 0) throw Error("Cannot create literal schema with no valid values");
  let o = new Set(i.values);
  r._zod.values = o, r._zod.pattern = new RegExp(`^(${i.values.map((t) => typeof t === "string" ? R(t) : t ? R(t.toString()) : String(t)).join("|")})$`), r._zod.parse = (t, n) => {
    let v = t.value;
    if (o.has(v)) return t;
    return t.issues.push({ code: "invalid_value", values: i.values, input: v, inst: r }), t;
  };
});
var zt = I("$ZodFile", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    let n = o.value;
    if (n instanceof File) return o;
    return o.issues.push({ expected: "file", code: "invalid_type", input: n, inst: r }), o;
  };
});
var St = I("$ZodTransform", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    if (t.direction === "backward") throw new cr(r.constructor.name);
    let n = i.transform(o.value, o);
    if (t.async) return (n instanceof Promise ? n : Promise.resolve(n)).then(($) => {
      return o.value = $, o;
    });
    if (n instanceof Promise) throw new f();
    return o.value = n, o;
  };
});
function Re(r, i) {
  if (r.issues.length && i === void 0) return { issues: [], value: void 0 };
  return r;
}
var $i = I("$ZodOptional", (r, i) => {
  S.init(r, i), r._zod.optin = "optional", r._zod.optout = "optional", j(r._zod, "values", () => {
    return i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0;
  }), j(r._zod, "pattern", () => {
    let o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${vn(o.source)})?$`) : void 0;
  }), r._zod.parse = (o, t) => {
    if (i.innerType._zod.optin === "optional") {
      let n = i.innerType._zod.run(o, t);
      if (n instanceof Promise) return n.then((v) => Re(v, o.value));
      return Re(n, o.value);
    }
    if (o.value === void 0) return o;
    return i.innerType._zod.run(o, t);
  };
});
var Pt = I("$ZodExactOptional", (r, i) => {
  $i.init(r, i), j(r._zod, "values", () => i.innerType._zod.values), j(r._zod, "pattern", () => i.innerType._zod.pattern), r._zod.parse = (o, t) => {
    return i.innerType._zod.run(o, t);
  };
});
var jt = I("$ZodNullable", (r, i) => {
  S.init(r, i), j(r._zod, "optin", () => i.innerType._zod.optin), j(r._zod, "optout", () => i.innerType._zod.optout), j(r._zod, "pattern", () => {
    let o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${vn(o.source)}|null)$`) : void 0;
  }), j(r._zod, "values", () => {
    return i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0;
  }), r._zod.parse = (o, t) => {
    if (o.value === null) return o;
    return i.innerType._zod.run(o, t);
  };
});
var Jt = I("$ZodDefault", (r, i) => {
  S.init(r, i), r._zod.optin = "optional", j(r._zod, "values", () => i.innerType._zod.values), r._zod.parse = (o, t) => {
    if (t.direction === "backward") return i.innerType._zod.run(o, t);
    if (o.value === void 0) return o.value = i.defaultValue, o;
    let n = i.innerType._zod.run(o, t);
    if (n instanceof Promise) return n.then((v) => xe(v, i));
    return xe(n, i);
  };
});
function xe(r, i) {
  if (r.value === void 0) r.value = i.defaultValue;
  return r;
}
var Lt = I("$ZodPrefault", (r, i) => {
  S.init(r, i), r._zod.optin = "optional", j(r._zod, "values", () => i.innerType._zod.values), r._zod.parse = (o, t) => {
    if (t.direction === "backward") return i.innerType._zod.run(o, t);
    if (o.value === void 0) o.value = i.defaultValue;
    return i.innerType._zod.run(o, t);
  };
});
var Gt = I("$ZodNonOptional", (r, i) => {
  S.init(r, i), j(r._zod, "values", () => {
    let o = i.innerType._zod.values;
    return o ? new Set([...o].filter((t) => t !== void 0)) : void 0;
  }), r._zod.parse = (o, t) => {
    let n = i.innerType._zod.run(o, t);
    if (n instanceof Promise) return n.then((v) => Ze(v, r));
    return Ze(n, r);
  };
});
function Ze(r, i) {
  if (!r.issues.length && r.value === void 0) r.issues.push({ code: "invalid_type", expected: "nonoptional", input: r.value, inst: i });
  return r;
}
var Wt = I("$ZodSuccess", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    if (t.direction === "backward") throw new cr("ZodSuccess");
    let n = i.innerType._zod.run(o, t);
    if (n instanceof Promise) return n.then((v) => {
      return o.value = v.issues.length === 0, o;
    });
    return o.value = n.issues.length === 0, o;
  };
});
var Vt = I("$ZodCatch", (r, i) => {
  S.init(r, i), j(r._zod, "optin", () => i.innerType._zod.optin), j(r._zod, "optout", () => i.innerType._zod.optout), j(r._zod, "values", () => i.innerType._zod.values), r._zod.parse = (o, t) => {
    if (t.direction === "backward") return i.innerType._zod.run(o, t);
    let n = i.innerType._zod.run(o, t);
    if (n instanceof Promise) return n.then((v) => {
      if (o.value = v.value, v.issues.length) o.value = i.catchValue({ ...o, error: { issues: v.issues.map(($) => B($, t, E())) }, input: o.value }), o.issues = [];
      return o;
    });
    if (o.value = n.value, n.issues.length) o.value = i.catchValue({ ...o, error: { issues: n.issues.map((v) => B(v, t, E())) }, input: o.value }), o.issues = [];
    return o;
  };
});
var Xt = I("$ZodNaN", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    if (typeof o.value !== "number" || !Number.isNaN(o.value)) return o.issues.push({ input: o.value, inst: r, expected: "nan", code: "invalid_type" }), o;
    return o;
  };
});
var Et = I("$ZodPipe", (r, i) => {
  S.init(r, i), j(r._zod, "values", () => i.in._zod.values), j(r._zod, "optin", () => i.in._zod.optin), j(r._zod, "optout", () => i.out._zod.optout), j(r._zod, "propValues", () => i.in._zod.propValues), r._zod.parse = (o, t) => {
    if (t.direction === "backward") {
      let v = i.out._zod.run(o, t);
      if (v instanceof Promise) return v.then(($) => sn($, i.in, t));
      return sn(v, i.in, t);
    }
    let n = i.in._zod.run(o, t);
    if (n instanceof Promise) return n.then((v) => sn(v, i.out, t));
    return sn(n, i.out, t);
  };
});
function sn(r, i, o) {
  if (r.issues.length) return r.aborted = true, r;
  return i._zod.run({ value: r.value, issues: r.issues }, o);
}
var Un = I("$ZodCodec", (r, i) => {
  S.init(r, i), j(r._zod, "values", () => i.in._zod.values), j(r._zod, "optin", () => i.in._zod.optin), j(r._zod, "optout", () => i.out._zod.optout), j(r._zod, "propValues", () => i.in._zod.propValues), r._zod.parse = (o, t) => {
    if ((t.direction || "forward") === "forward") {
      let v = i.in._zod.run(o, t);
      if (v instanceof Promise) return v.then(($) => ri($, i, t));
      return ri(v, i, t);
    } else {
      let v = i.out._zod.run(o, t);
      if (v instanceof Promise) return v.then(($) => ri($, i, t));
      return ri(v, i, t);
    }
  };
});
function ri(r, i, o) {
  if (r.issues.length) return r.aborted = true, r;
  if ((o.direction || "forward") === "forward") {
    let n = i.transform(r.value, r);
    if (n instanceof Promise) return n.then((v) => ni(r, v, i.out, o));
    return ni(r, n, i.out, o);
  } else {
    let n = i.reverseTransform(r.value, r);
    if (n instanceof Promise) return n.then((v) => ni(r, v, i.in, o));
    return ni(r, n, i.in, o);
  }
}
function ni(r, i, o, t) {
  if (r.issues.length) return r.aborted = true, r;
  return o._zod.run({ value: i, issues: r.issues }, t);
}
var At = I("$ZodReadonly", (r, i) => {
  S.init(r, i), j(r._zod, "propValues", () => i.innerType._zod.propValues), j(r._zod, "values", () => i.innerType._zod.values), j(r._zod, "optin", () => i.innerType?._zod?.optin), j(r._zod, "optout", () => i.innerType?._zod?.optout), r._zod.parse = (o, t) => {
    if (t.direction === "backward") return i.innerType._zod.run(o, t);
    let n = i.innerType._zod.run(o, t);
    if (n instanceof Promise) return n.then(de);
    return de(n);
  };
});
function de(r) {
  return r.value = Object.freeze(r.value), r;
}
var Kt = I("$ZodTemplateLiteral", (r, i) => {
  S.init(r, i);
  let o = [];
  for (let t of i.parts) if (typeof t === "object" && t !== null) {
    if (!t._zod.pattern) throw Error(`Invalid template literal part, no pattern found: ${[...t._zod.traits].shift()}`);
    let n = t._zod.pattern instanceof RegExp ? t._zod.pattern.source : t._zod.pattern;
    if (!n) throw Error(`Invalid template literal part: ${t._zod.traits}`);
    let v = n.startsWith("^") ? 1 : 0, $ = n.endsWith("$") ? n.length - 1 : n.length;
    o.push(n.slice(v, $));
  } else if (t === null || Lv.has(typeof t)) o.push(R(`${t}`));
  else throw Error(`Invalid template literal part: ${t}`);
  r._zod.pattern = new RegExp(`^${o.join("")}$`), r._zod.parse = (t, n) => {
    if (typeof t.value !== "string") return t.issues.push({ input: t.value, inst: r, expected: "string", code: "invalid_type" }), t;
    if (r._zod.pattern.lastIndex = 0, !r._zod.pattern.test(t.value)) return t.issues.push({ input: t.value, inst: r, code: "invalid_format", format: i.format ?? "template_literal", pattern: r._zod.pattern.source }), t;
    return t;
  };
});
var qt = I("$ZodFunction", (r, i) => {
  return S.init(r, i), r._def = i, r._zod.def = i, r.implement = (o) => {
    if (typeof o !== "function") throw Error("implement() must be called with a function");
    return function(...t) {
      let n = r._def.input ? Bn(r._def.input, t) : t, v = Reflect.apply(o, this, n);
      if (r._def.output) return Bn(r._def.output, v);
      return v;
    };
  }, r.implementAsync = (o) => {
    if (typeof o !== "function") throw Error("implementAsync() must be called with a function");
    return async function(...t) {
      let n = r._def.input ? await mn(r._def.input, t) : t, v = await Reflect.apply(o, this, n);
      if (r._def.output) return await mn(r._def.output, v);
      return v;
    };
  }, r._zod.parse = (o, t) => {
    if (typeof o.value !== "function") return o.issues.push({ code: "invalid_type", expected: "function", input: o.value, inst: r }), o;
    if (r._def.output && r._def.output._zod.def.type === "promise") o.value = r.implementAsync(o.value);
    else o.value = r.implement(o.value);
    return o;
  }, r.input = (...o) => {
    let t = r.constructor;
    if (Array.isArray(o[0])) return new t({ type: "function", input: new ti({ type: "tuple", items: o[0], rest: o[1] }), output: r._def.output });
    return new t({ type: "function", input: o[0], output: r._def.output });
  }, r.output = (o) => {
    return new r.constructor({ type: "function", input: r._def.input, output: o });
  }, r;
});
var Qt = I("$ZodPromise", (r, i) => {
  S.init(r, i), r._zod.parse = (o, t) => {
    return Promise.resolve(o.value).then((n) => i.innerType._zod.run({ value: n, issues: [] }, t));
  };
});
var Yt = I("$ZodLazy", (r, i) => {
  S.init(r, i), j(r._zod, "innerType", () => i.getter()), j(r._zod, "pattern", () => r._zod.innerType?._zod?.pattern), j(r._zod, "propValues", () => r._zod.innerType?._zod?.propValues), j(r._zod, "optin", () => r._zod.innerType?._zod?.optin ?? void 0), j(r._zod, "optout", () => r._zod.innerType?._zod?.optout ?? void 0), r._zod.parse = (o, t) => {
    return r._zod.innerType._zod.run(o, t);
  };
});
var Ft = I("$ZodCustom", (r, i) => {
  V.init(r, i), S.init(r, i), r._zod.parse = (o, t) => {
    return o;
  }, r._zod.check = (o) => {
    let t = o.value, n = i.fn(t);
    if (n instanceof Promise) return n.then((v) => Ce(v, o, t, r));
    Ce(n, o, t, r);
    return;
  };
});
function Ce(r, i, o, t) {
  if (!r) {
    let n = { code: "custom", input: o, inst: t, path: [...t._zod.def.path ?? []], continue: !t._zod.def.abort };
    if (t._zod.def.params) n.params = t._zod.def.params;
    i.issues.push(jr(n));
  }
}
var On = {};
s(On, { zhTW: () => W$, zhCN: () => G$, yo: () => V$, vi: () => L$, uz: () => J$, ur: () => j$, uk: () => Nn, ua: () => P$, tr: () => S$, th: () => z$, ta: () => O$, sv: () => N$, sl: () => w$, ru: () => D$, pt: () => k$, ps: () => _$, pl: () => U$, ota: () => b$, no: () => c$, nl: () => I$, ms: () => l$, mk: () => e$, lt: () => g$, ko: () => u$, km: () => Dn, kh: () => $$, ka: () => t$, ja: () => o$, it: () => v$, is: () => i$, id: () => n$, hy: () => r$, hu: () => st, he: () => pt, frCA: () => at, fr: () => ht, fi: () => yt, fa: () => ft, es: () => Ct, eo: () => dt, en: () => kn, de: () => Zt, da: () => xt, cs: () => Rt, ca: () => Mt, bg: () => Tt, be: () => Ht, az: () => mt, ar: () => Bt });
var Zc = () => {
  let r = { string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }, set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0645\u062F\u062E\u0644", email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", url: "\u0631\u0627\u0628\u0637", emoji: "\u0625\u064A\u0645\u0648\u062C\u064A", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO", date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO", time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO", duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO", ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4", ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6", cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4", cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6", base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded", base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded", json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON", e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164", jwt: "JWT", template_literal: "\u0645\u062F\u062E\u0644" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${n.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${u}`;
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${v}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${U(n.values[0])}`;
        return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${n.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${v} ${n.maximum.toString()} ${$.unit ?? "\u0639\u0646\u0635\u0631"}`;
        return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${n.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${v} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${n.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${v} ${n.minimum.toString()} ${$.unit}`;
        return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${n.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${v} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${n.prefix}"`;
        if (v.format === "ends_with") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${v.suffix}"`;
        if (v.format === "includes") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${v.includes}"`;
        if (v.format === "regex") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${v.pattern}`;
        return `${o[v.format] ?? n.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${n.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${n.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${n.keys.length > 1 ? "\u0629" : ""}: ${b(n.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${n.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${n.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function Bt() {
  return { localeError: Zc() };
}
var dc = () => {
  let r = { string: { unit: "simvol", verb: "olmal\u0131d\u0131r" }, file: { unit: "bayt", verb: "olmal\u0131d\u0131r" }, array: { unit: "element", verb: "olmal\u0131d\u0131r" }, set: { unit: "element", verb: "olmal\u0131d\u0131r" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${n.expected}, daxil olan ${u}`;
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${v}, daxil olan ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${U(n.values[0])}`;
        return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${n.origin ?? "d\u0259y\u0259r"} ${v}${n.maximum.toString()} ${$.unit ?? "element"}`;
        return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${n.origin ?? "d\u0259y\u0259r"} ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${n.origin} ${v}${n.minimum.toString()} ${$.unit}`;
        return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${n.origin} ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Yanl\u0131\u015F m\u0259tn: "${v.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
        if (v.format === "ends_with") return `Yanl\u0131\u015F m\u0259tn: "${v.suffix}" il\u0259 bitm\u0259lidir`;
        if (v.format === "includes") return `Yanl\u0131\u015F m\u0259tn: "${v.includes}" daxil olmal\u0131d\u0131r`;
        if (v.format === "regex") return `Yanl\u0131\u015F m\u0259tn: ${v.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
        return `Yanl\u0131\u015F ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${n.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${n.keys.length > 1 ? "lar" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${n.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return "Yanl\u0131\u015F d\u0259y\u0259r";
    }
  };
};
function mt() {
  return { localeError: dc() };
}
function se(r, i, o, t) {
  let n = Math.abs(r), v = n % 10, $ = n % 100;
  if ($ >= 11 && $ <= 19) return t;
  if (v === 1) return i;
  if (v >= 2 && v <= 4) return o;
  return t;
}
var Cc = () => {
  let r = { string: { unit: { one: "\u0441\u0456\u043C\u0432\u0430\u043B", few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B", many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, array: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, set: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" }, file: { unit: { one: "\u0431\u0430\u0439\u0442", few: "\u0431\u0430\u0439\u0442\u044B", many: "\u0431\u0430\u0439\u0442\u0430\u045E" }, verb: "\u043C\u0435\u0446\u044C" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0443\u0432\u043E\u0434", email: "email \u0430\u0434\u0440\u0430\u0441", url: "URL", emoji: "\u044D\u043C\u043E\u0434\u0437\u0456", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0447\u0430\u0441", duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C", ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441", cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D", base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64", base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url", json_string: "JSON \u0440\u0430\u0434\u043E\u043A", e164: "\u043D\u0443\u043C\u0430\u0440 E.164", jwt: "JWT", template_literal: "\u0443\u0432\u043E\u0434" }, t = { nan: "NaN", number: "\u043B\u0456\u043A", array: "\u043C\u0430\u0441\u0456\u045E" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${n.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${u}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${v}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${U(n.values[0])}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) {
          let u = Number(n.maximum), l = se(u, $.unit.one, $.unit.few, $.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${$.verb} ${v}${n.maximum.toString()} ${l}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) {
          let u = Number(n.minimum), l = se(u, $.unit.one, $.unit.few, $.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${$.verb} ${v}${n.minimum.toString()} ${l}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${n.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${v.prefix}"`;
        if (v.format === "ends_with") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${v.suffix}"`;
        if (v.format === "includes") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${v.includes}"`;
        if (v.format === "regex") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${v.pattern}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${n.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${n.origin}`;
      default:
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
    }
  };
};
function Ht() {
  return { localeError: Cc() };
}
var fc = () => {
  let r = { string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }, set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0432\u0445\u043E\u0434", email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441", url: "URL", emoji: "\u0435\u043C\u043E\u0434\u0436\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0432\u0440\u0435\u043C\u0435", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0432\u0440\u0435\u043C\u0435", duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441", cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437", base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437", json_string: "JSON \u043D\u0438\u0437", e164: "E.164 \u043D\u043E\u043C\u0435\u0440", jwt: "JWT", template_literal: "\u0432\u0445\u043E\u0434" }, t = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0438\u0432" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${n.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${u}`;
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${v}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${U(n.values[0])}`;
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${n.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${v}${n.maximum.toString()} ${$.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${n.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${n.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${v}${n.minimum.toString()} ${$.unit}`;
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${n.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${v.prefix}"`;
        if (v.format === "ends_with") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${v.suffix}"`;
        if (v.format === "includes") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${v.includes}"`;
        if (v.format === "regex") return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${v.pattern}`;
        let $ = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        if (v.format === "emoji") $ = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (v.format === "datetime") $ = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (v.format === "date") $ = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        if (v.format === "time") $ = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (v.format === "duration") $ = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        return `${$} ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${n.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${n.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${n.origin}`;
      default:
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
    }
  };
};
function Tt() {
  return { localeError: fc() };
}
var yc = () => {
  let r = { string: { unit: "car\xE0cters", verb: "contenir" }, file: { unit: "bytes", verb: "contenir" }, array: { unit: "elements", verb: "contenir" }, set: { unit: "elements", verb: "contenir" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "entrada", email: "adre\xE7a electr\xF2nica", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data i hora ISO", date: "data ISO", time: "hora ISO", duration: "durada ISO", ipv4: "adre\xE7a IPv4", ipv6: "adre\xE7a IPv6", cidrv4: "rang IPv4", cidrv6: "rang IPv6", base64: "cadena codificada en base64", base64url: "cadena codificada en base64url", json_string: "cadena JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Tipus inv\xE0lid: s'esperava instanceof ${n.expected}, s'ha rebut ${u}`;
        return `Tipus inv\xE0lid: s'esperava ${v}, s'ha rebut ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Valor inv\xE0lid: s'esperava ${U(n.values[0])}`;
        return `Opci\xF3 inv\xE0lida: s'esperava una de ${b(n.values, " o ")}`;
      case "too_big": {
        let v = n.inclusive ? "com a m\xE0xim" : "menys de", $ = i(n.origin);
        if ($) return `Massa gran: s'esperava que ${n.origin ?? "el valor"} contingu\xE9s ${v} ${n.maximum.toString()} ${$.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${n.origin ?? "el valor"} fos ${v} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? "com a m\xEDnim" : "m\xE9s de", $ = i(n.origin);
        if ($) return `Massa petit: s'esperava que ${n.origin} contingu\xE9s ${v} ${n.minimum.toString()} ${$.unit}`;
        return `Massa petit: s'esperava que ${n.origin} fos ${v} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Format inv\xE0lid: ha de comen\xE7ar amb "${v.prefix}"`;
        if (v.format === "ends_with") return `Format inv\xE0lid: ha d'acabar amb "${v.suffix}"`;
        if (v.format === "includes") return `Format inv\xE0lid: ha d'incloure "${v.includes}"`;
        if (v.format === "regex") return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${v.pattern}`;
        return `Format inv\xE0lid per a ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${n.divisor}`;
      case "unrecognized_keys":
        return `Clau${n.keys.length > 1 ? "s" : ""} no reconeguda${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${n.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      case "invalid_element":
        return `Element inv\xE0lid a ${n.origin}`;
      default:
        return "Entrada inv\xE0lida";
    }
  };
};
function Mt() {
  return { localeError: yc() };
}
var hc = () => {
  let r = { string: { unit: "znak\u016F", verb: "m\xEDt" }, file: { unit: "bajt\u016F", verb: "m\xEDt" }, array: { unit: "prvk\u016F", verb: "m\xEDt" }, set: { unit: "prvk\u016F", verb: "m\xEDt" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "regul\xE1rn\xED v\xFDraz", email: "e-mailov\xE1 adresa", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "datum a \u010Das ve form\xE1tu ISO", date: "datum ve form\xE1tu ISO", time: "\u010Das ve form\xE1tu ISO", duration: "doba trv\xE1n\xED ISO", ipv4: "IPv4 adresa", ipv6: "IPv6 adresa", cidrv4: "rozsah IPv4", cidrv6: "rozsah IPv6", base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64", base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url", json_string: "\u0159et\u011Bzec ve form\xE1tu JSON", e164: "\u010D\xEDslo E.164", jwt: "JWT", template_literal: "vstup" }, t = { nan: "NaN", number: "\u010D\xEDslo", string: "\u0159et\u011Bzec", function: "funkce", array: "pole" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${n.expected}, obdr\u017Eeno ${u}`;
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${v}, obdr\u017Eeno ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${U(n.values[0])}`;
        return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${n.origin ?? "hodnota"} mus\xED m\xEDt ${v}${n.maximum.toString()} ${$.unit ?? "prvk\u016F"}`;
        return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${n.origin ?? "hodnota"} mus\xED b\xFDt ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${n.origin ?? "hodnota"} mus\xED m\xEDt ${v}${n.minimum.toString()} ${$.unit ?? "prvk\u016F"}`;
        return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${n.origin ?? "hodnota"} mus\xED b\xFDt ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${v.prefix}"`;
        if (v.format === "ends_with") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${v.suffix}"`;
        if (v.format === "includes") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${v.includes}"`;
        if (v.format === "regex") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${v.pattern}`;
        return `Neplatn\xFD form\xE1t ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${n.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${n.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${n.origin}`;
      default:
        return "Neplatn\xFD vstup";
    }
  };
};
function Rt() {
  return { localeError: hc() };
}
var ac = () => {
  let r = { string: { unit: "tegn", verb: "havde" }, file: { unit: "bytes", verb: "havde" }, array: { unit: "elementer", verb: "indeholdt" }, set: { unit: "elementer", verb: "indeholdt" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "e-mailadresse", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dato- og klokkesl\xE6t", date: "ISO-dato", time: "ISO-klokkesl\xE6t", duration: "ISO-varighed", ipv4: "IPv4-omr\xE5de", ipv6: "IPv6-omr\xE5de", cidrv4: "IPv4-spektrum", cidrv6: "IPv6-spektrum", base64: "base64-kodet streng", base64url: "base64url-kodet streng", json_string: "JSON-streng", e164: "E.164-nummer", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN", string: "streng", number: "tal", boolean: "boolean", array: "liste", object: "objekt", set: "s\xE6t", file: "fil" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Ugyldigt input: forventede instanceof ${n.expected}, fik ${u}`;
        return `Ugyldigt input: forventede ${v}, fik ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Ugyldig v\xE6rdi: forventede ${U(n.values[0])}`;
        return `Ugyldigt valg: forventede en af f\xF8lgende ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin), u = t[n.origin] ?? n.origin;
        if ($) return `For stor: forventede ${u ?? "value"} ${$.verb} ${v} ${n.maximum.toString()} ${$.unit ?? "elementer"}`;
        return `For stor: forventede ${u ?? "value"} havde ${v} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin), u = t[n.origin] ?? n.origin;
        if ($) return `For lille: forventede ${u} ${$.verb} ${v} ${n.minimum.toString()} ${$.unit}`;
        return `For lille: forventede ${u} havde ${v} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Ugyldig streng: skal starte med "${v.prefix}"`;
        if (v.format === "ends_with") return `Ugyldig streng: skal ende med "${v.suffix}"`;
        if (v.format === "includes") return `Ugyldig streng: skal indeholde "${v.includes}"`;
        if (v.format === "regex") return `Ugyldig streng: skal matche m\xF8nsteret ${v.pattern}`;
        return `Ugyldig ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${n.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${n.origin}`;
      default:
        return "Ugyldigt input";
    }
  };
};
function xt() {
  return { localeError: ac() };
}
var pc = () => {
  let r = { string: { unit: "Zeichen", verb: "zu haben" }, file: { unit: "Bytes", verb: "zu haben" }, array: { unit: "Elemente", verb: "zu haben" }, set: { unit: "Elemente", verb: "zu haben" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "Eingabe", email: "E-Mail-Adresse", url: "URL", emoji: "Emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-Datum und -Uhrzeit", date: "ISO-Datum", time: "ISO-Uhrzeit", duration: "ISO-Dauer", ipv4: "IPv4-Adresse", ipv6: "IPv6-Adresse", cidrv4: "IPv4-Bereich", cidrv6: "IPv6-Bereich", base64: "Base64-codierter String", base64url: "Base64-URL-codierter String", json_string: "JSON-String", e164: "E.164-Nummer", jwt: "JWT", template_literal: "Eingabe" }, t = { nan: "NaN", number: "Zahl", array: "Array" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Ung\xFCltige Eingabe: erwartet instanceof ${n.expected}, erhalten ${u}`;
        return `Ung\xFCltige Eingabe: erwartet ${v}, erhalten ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Ung\xFCltige Eingabe: erwartet ${U(n.values[0])}`;
        return `Ung\xFCltige Option: erwartet eine von ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Zu gro\xDF: erwartet, dass ${n.origin ?? "Wert"} ${v}${n.maximum.toString()} ${$.unit ?? "Elemente"} hat`;
        return `Zu gro\xDF: erwartet, dass ${n.origin ?? "Wert"} ${v}${n.maximum.toString()} ist`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Zu klein: erwartet, dass ${n.origin} ${v}${n.minimum.toString()} ${$.unit} hat`;
        return `Zu klein: erwartet, dass ${n.origin} ${v}${n.minimum.toString()} ist`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Ung\xFCltiger String: muss mit "${v.prefix}" beginnen`;
        if (v.format === "ends_with") return `Ung\xFCltiger String: muss mit "${v.suffix}" enden`;
        if (v.format === "includes") return `Ung\xFCltiger String: muss "${v.includes}" enthalten`;
        if (v.format === "regex") return `Ung\xFCltiger String: muss dem Muster ${v.pattern} entsprechen`;
        return `Ung\xFCltig: ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${n.divisor} sein`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${n.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${n.origin}`;
      default:
        return "Ung\xFCltige Eingabe";
    }
  };
};
function Zt() {
  return { localeError: pc() };
}
var sc = () => {
  let r = { string: { unit: "characters", verb: "to have" }, file: { unit: "bytes", verb: "to have" }, array: { unit: "items", verb: "to have" }, set: { unit: "items", verb: "to have" }, map: { unit: "entries", verb: "to have" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "email address", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datetime", date: "ISO date", time: "ISO time", duration: "ISO duration", ipv4: "IPv4 address", ipv6: "IPv6 address", mac: "MAC address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded string", base64url: "base64url-encoded string", json_string: "JSON string", e164: "E.164 number", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        return `Invalid input: expected ${v}, received ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Invalid input: expected ${U(n.values[0])}`;
        return `Invalid option: expected one of ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Too big: expected ${n.origin ?? "value"} to have ${v}${n.maximum.toString()} ${$.unit ?? "elements"}`;
        return `Too big: expected ${n.origin ?? "value"} to be ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Too small: expected ${n.origin} to have ${v}${n.minimum.toString()} ${$.unit}`;
        return `Too small: expected ${n.origin} to be ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Invalid string: must start with "${v.prefix}"`;
        if (v.format === "ends_with") return `Invalid string: must end with "${v.suffix}"`;
        if (v.format === "includes") return `Invalid string: must include "${v.includes}"`;
        if (v.format === "regex") return `Invalid string: must match pattern ${v.pattern}`;
        return `Invalid ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${n.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${n.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${n.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function kn() {
  return { localeError: sc() };
}
var r4 = () => {
  let r = { string: { unit: "karaktrojn", verb: "havi" }, file: { unit: "bajtojn", verb: "havi" }, array: { unit: "elementojn", verb: "havi" }, set: { unit: "elementojn", verb: "havi" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "enigo", email: "retadreso", url: "URL", emoji: "emo\u011Dio", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-datotempo", date: "ISO-dato", time: "ISO-tempo", duration: "ISO-da\u016Dro", ipv4: "IPv4-adreso", ipv6: "IPv6-adreso", cidrv4: "IPv4-rango", cidrv6: "IPv6-rango", base64: "64-ume kodita karaktraro", base64url: "URL-64-ume kodita karaktraro", json_string: "JSON-karaktraro", e164: "E.164-nombro", jwt: "JWT", template_literal: "enigo" }, t = { nan: "NaN", number: "nombro", array: "tabelo", null: "senvalora" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Nevalida enigo: atendi\u011Dis instanceof ${n.expected}, ricevi\u011Dis ${u}`;
        return `Nevalida enigo: atendi\u011Dis ${v}, ricevi\u011Dis ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Nevalida enigo: atendi\u011Dis ${U(n.values[0])}`;
        return `Nevalida opcio: atendi\u011Dis unu el ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Tro granda: atendi\u011Dis ke ${n.origin ?? "valoro"} havu ${v}${n.maximum.toString()} ${$.unit ?? "elementojn"}`;
        return `Tro granda: atendi\u011Dis ke ${n.origin ?? "valoro"} havu ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Tro malgranda: atendi\u011Dis ke ${n.origin} havu ${v}${n.minimum.toString()} ${$.unit}`;
        return `Tro malgranda: atendi\u011Dis ke ${n.origin} estu ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Nevalida karaktraro: devas komenci\u011Di per "${v.prefix}"`;
        if (v.format === "ends_with") return `Nevalida karaktraro: devas fini\u011Di per "${v.suffix}"`;
        if (v.format === "includes") return `Nevalida karaktraro: devas inkluzivi "${v.includes}"`;
        if (v.format === "regex") return `Nevalida karaktraro: devas kongrui kun la modelo ${v.pattern}`;
        return `Nevalida ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${n.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${n.keys.length > 1 ? "j" : ""} \u015Dlosilo${n.keys.length > 1 ? "j" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${n.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${n.origin}`;
      default:
        return "Nevalida enigo";
    }
  };
};
function dt() {
  return { localeError: r4() };
}
var n4 = () => {
  let r = { string: { unit: "caracteres", verb: "tener" }, file: { unit: "bytes", verb: "tener" }, array: { unit: "elementos", verb: "tener" }, set: { unit: "elementos", verb: "tener" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "entrada", email: "direcci\xF3n de correo electr\xF3nico", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "fecha y hora ISO", date: "fecha ISO", time: "hora ISO", duration: "duraci\xF3n ISO", ipv4: "direcci\xF3n IPv4", ipv6: "direcci\xF3n IPv6", cidrv4: "rango IPv4", cidrv6: "rango IPv6", base64: "cadena codificada en base64", base64url: "URL codificada en base64", json_string: "cadena JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, t = { nan: "NaN", string: "texto", number: "n\xFAmero", boolean: "booleano", array: "arreglo", object: "objeto", set: "conjunto", file: "archivo", date: "fecha", bigint: "n\xFAmero grande", symbol: "s\xEDmbolo", undefined: "indefinido", null: "nulo", function: "funci\xF3n", map: "mapa", record: "registro", tuple: "tupla", enum: "enumeraci\xF3n", union: "uni\xF3n", literal: "literal", promise: "promesa", void: "vac\xEDo", never: "nunca", unknown: "desconocido", any: "cualquiera" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Entrada inv\xE1lida: se esperaba instanceof ${n.expected}, recibido ${u}`;
        return `Entrada inv\xE1lida: se esperaba ${v}, recibido ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Entrada inv\xE1lida: se esperaba ${U(n.values[0])}`;
        return `Opci\xF3n inv\xE1lida: se esperaba una de ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin), u = t[n.origin] ?? n.origin;
        if ($) return `Demasiado grande: se esperaba que ${u ?? "valor"} tuviera ${v}${n.maximum.toString()} ${$.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${u ?? "valor"} fuera ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin), u = t[n.origin] ?? n.origin;
        if ($) return `Demasiado peque\xF1o: se esperaba que ${u} tuviera ${v}${n.minimum.toString()} ${$.unit}`;
        return `Demasiado peque\xF1o: se esperaba que ${u} fuera ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Cadena inv\xE1lida: debe comenzar con "${v.prefix}"`;
        if (v.format === "ends_with") return `Cadena inv\xE1lida: debe terminar en "${v.suffix}"`;
        if (v.format === "includes") return `Cadena inv\xE1lida: debe incluir "${v.includes}"`;
        if (v.format === "regex") return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${v.pattern}`;
        return `Inv\xE1lido ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${n.divisor}`;
      case "unrecognized_keys":
        return `Llave${n.keys.length > 1 ? "s" : ""} desconocida${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${t[n.origin] ?? n.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${t[n.origin] ?? n.origin}`;
      default:
        return "Entrada inv\xE1lida";
    }
  };
};
function Ct() {
  return { localeError: n4() };
}
var i4 = () => {
  let r = { string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }, set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0648\u0631\u0648\u062F\u06CC", email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644", url: "URL", emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648", time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648", ipv4: "IPv4 \u0622\u062F\u0631\u0633", ipv6: "IPv6 \u0622\u062F\u0631\u0633", cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647", cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647", base64: "base64-encoded \u0631\u0634\u062A\u0647", base64url: "base64url-encoded \u0631\u0634\u062A\u0647", json_string: "JSON \u0631\u0634\u062A\u0647", e164: "E.164 \u0639\u062F\u062F", jwt: "JWT", template_literal: "\u0648\u0631\u0648\u062F\u06CC" }, t = { nan: "NaN", number: "\u0639\u062F\u062F", array: "\u0622\u0631\u0627\u06CC\u0647" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${n.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${u} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${v} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${u} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${U(n.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
        return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${b(n.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${n.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${v}${n.maximum.toString()} ${$.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
        return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${n.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${v}${n.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${n.origin} \u0628\u0627\u06CC\u062F ${v}${n.minimum.toString()} ${$.unit} \u0628\u0627\u0634\u062F`;
        return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${n.origin} \u0628\u0627\u06CC\u062F ${v}${n.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${v.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
        if (v.format === "ends_with") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${v.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
        if (v.format === "includes") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${v.includes}" \u0628\u0627\u0634\u062F`;
        if (v.format === "regex") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${v.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
        return `${o[v.format] ?? n.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${n.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${n.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${n.origin}`;
      case "invalid_union":
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${n.origin}`;
      default:
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
    }
  };
};
function ft() {
  return { localeError: i4() };
}
var v4 = () => {
  let r = { string: { unit: "merkki\xE4", subject: "merkkijonon" }, file: { unit: "tavua", subject: "tiedoston" }, array: { unit: "alkiota", subject: "listan" }, set: { unit: "alkiota", subject: "joukon" }, number: { unit: "", subject: "luvun" }, bigint: { unit: "", subject: "suuren kokonaisluvun" }, int: { unit: "", subject: "kokonaisluvun" }, date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "s\xE4\xE4nn\xF6llinen lauseke", email: "s\xE4hk\xF6postiosoite", url: "URL-osoite", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-aikaleima", date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4", time: "ISO-aika", duration: "ISO-kesto", ipv4: "IPv4-osoite", ipv6: "IPv6-osoite", cidrv4: "IPv4-alue", cidrv6: "IPv6-alue", base64: "base64-koodattu merkkijono", base64url: "base64url-koodattu merkkijono", json_string: "JSON-merkkijono", e164: "E.164-luku", jwt: "JWT", template_literal: "templaattimerkkijono" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Virheellinen tyyppi: odotettiin instanceof ${n.expected}, oli ${u}`;
        return `Virheellinen tyyppi: odotettiin ${v}, oli ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Virheellinen sy\xF6te: t\xE4ytyy olla ${U(n.values[0])}`;
        return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Liian suuri: ${$.subject} t\xE4ytyy olla ${v}${n.maximum.toString()} ${$.unit}`.trim();
        return `Liian suuri: arvon t\xE4ytyy olla ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Liian pieni: ${$.subject} t\xE4ytyy olla ${v}${n.minimum.toString()} ${$.unit}`.trim();
        return `Liian pieni: arvon t\xE4ytyy olla ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${v.prefix}"`;
        if (v.format === "ends_with") return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${v.suffix}"`;
        if (v.format === "includes") return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${v.includes}"`;
        if (v.format === "regex") return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${v.pattern}`;
        return `Virheellinen ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${n.divisor} monikerta`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return "Virheellinen sy\xF6te";
    }
  };
};
function yt() {
  return { localeError: v4() };
}
var o4 = () => {
  let r = { string: { unit: "caract\xE8res", verb: "avoir" }, file: { unit: "octets", verb: "avoir" }, array: { unit: "\xE9l\xE9ments", verb: "avoir" }, set: { unit: "\xE9l\xE9ments", verb: "avoir" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "entr\xE9e", email: "adresse e-mail", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "date et heure ISO", date: "date ISO", time: "heure ISO", duration: "dur\xE9e ISO", ipv4: "adresse IPv4", ipv6: "adresse IPv6", cidrv4: "plage IPv4", cidrv6: "plage IPv6", base64: "cha\xEEne encod\xE9e en base64", base64url: "cha\xEEne encod\xE9e en base64url", json_string: "cha\xEEne JSON", e164: "num\xE9ro E.164", jwt: "JWT", template_literal: "entr\xE9e" }, t = { nan: "NaN", number: "nombre", array: "tableau" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Entr\xE9e invalide : instanceof ${n.expected} attendu, ${u} re\xE7u`;
        return `Entr\xE9e invalide : ${v} attendu, ${u} re\xE7u`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Entr\xE9e invalide : ${U(n.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${b(n.values, "|")} attendue`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Trop grand : ${n.origin ?? "valeur"} doit ${$.verb} ${v}${n.maximum.toString()} ${$.unit ?? "\xE9l\xE9ment(s)"}`;
        return `Trop grand : ${n.origin ?? "valeur"} doit \xEAtre ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Trop petit : ${n.origin} doit ${$.verb} ${v}${n.minimum.toString()} ${$.unit}`;
        return `Trop petit : ${n.origin} doit \xEAtre ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Cha\xEEne invalide : doit commencer par "${v.prefix}"`;
        if (v.format === "ends_with") return `Cha\xEEne invalide : doit se terminer par "${v.suffix}"`;
        if (v.format === "includes") return `Cha\xEEne invalide : doit inclure "${v.includes}"`;
        if (v.format === "regex") return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${v.pattern}`;
        return `${o[v.format] ?? n.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${n.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${n.keys.length > 1 ? "s" : ""} non reconnue${n.keys.length > 1 ? "s" : ""} : ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${n.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${n.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function ht() {
  return { localeError: o4() };
}
var t4 = () => {
  let r = { string: { unit: "caract\xE8res", verb: "avoir" }, file: { unit: "octets", verb: "avoir" }, array: { unit: "\xE9l\xE9ments", verb: "avoir" }, set: { unit: "\xE9l\xE9ments", verb: "avoir" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "entr\xE9e", email: "adresse courriel", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "date-heure ISO", date: "date ISO", time: "heure ISO", duration: "dur\xE9e ISO", ipv4: "adresse IPv4", ipv6: "adresse IPv6", cidrv4: "plage IPv4", cidrv6: "plage IPv6", base64: "cha\xEEne encod\xE9e en base64", base64url: "cha\xEEne encod\xE9e en base64url", json_string: "cha\xEEne JSON", e164: "num\xE9ro E.164", jwt: "JWT", template_literal: "entr\xE9e" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Entr\xE9e invalide : attendu instanceof ${n.expected}, re\xE7u ${u}`;
        return `Entr\xE9e invalide : attendu ${v}, re\xE7u ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Entr\xE9e invalide : attendu ${U(n.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "\u2264" : "<", $ = i(n.origin);
        if ($) return `Trop grand : attendu que ${n.origin ?? "la valeur"} ait ${v}${n.maximum.toString()} ${$.unit}`;
        return `Trop grand : attendu que ${n.origin ?? "la valeur"} soit ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? "\u2265" : ">", $ = i(n.origin);
        if ($) return `Trop petit : attendu que ${n.origin} ait ${v}${n.minimum.toString()} ${$.unit}`;
        return `Trop petit : attendu que ${n.origin} soit ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Cha\xEEne invalide : doit commencer par "${v.prefix}"`;
        if (v.format === "ends_with") return `Cha\xEEne invalide : doit se terminer par "${v.suffix}"`;
        if (v.format === "includes") return `Cha\xEEne invalide : doit inclure "${v.includes}"`;
        if (v.format === "regex") return `Cha\xEEne invalide : doit correspondre au motif ${v.pattern}`;
        return `${o[v.format] ?? n.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${n.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${n.keys.length > 1 ? "s" : ""} non reconnue${n.keys.length > 1 ? "s" : ""} : ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${n.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${n.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function at() {
  return { localeError: t4() };
}
var $4 = () => {
  let r = { string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" }, number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" }, boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" }, bigint: { label: "BigInt", gender: "m" }, date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" }, array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" }, object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" }, null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" }, undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" }, symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" }, function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" }, map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" }, set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" }, file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" }, promise: { label: "Promise", gender: "m" }, NaN: { label: "NaN", gender: "m" }, unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" }, value: { label: "\u05E2\u05E8\u05DA", gender: "m" } }, i = { string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" }, file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }, number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" } }, o = (e) => e ? r[e] : void 0, t = (e) => {
    let c = o(e);
    if (c) return c.label;
    return e ?? r.unknown.label;
  }, n = (e) => `\u05D4${t(e)}`, v = (e) => {
    return (o(e)?.gender ?? "m") === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
  }, $ = (e) => {
    if (!e) return null;
    return i[e] ?? null;
  }, u = { regex: { label: "\u05E7\u05DC\u05D8", gender: "m" }, email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" }, url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" }, emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" }, uuid: { label: "UUID", gender: "m" }, nanoid: { label: "nanoid", gender: "m" }, guid: { label: "GUID", gender: "m" }, cuid: { label: "cuid", gender: "m" }, cuid2: { label: "cuid2", gender: "m" }, ulid: { label: "ULID", gender: "m" }, xid: { label: "XID", gender: "m" }, ksuid: { label: "KSUID", gender: "m" }, datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" }, date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" }, time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" }, duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" }, ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" }, ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" }, cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" }, cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" }, base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" }, base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" }, json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" }, e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" }, jwt: { label: "JWT", gender: "m" }, ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" }, includes: { label: "\u05E7\u05DC\u05D8", gender: "m" }, lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }, starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" }, uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" } }, l = { nan: "NaN" };
  return (e) => {
    switch (e.code) {
      case "invalid_type": {
        let c = e.expected, _ = l[c ?? ""] ?? t(c), N = k(e.input), O = l[N] ?? r[N]?.label ?? N;
        if (/^[A-Z]/.test(e.expected)) return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${e.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${O}`;
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${_}, \u05D4\u05EA\u05E7\u05D1\u05DC ${O}`;
      }
      case "invalid_value": {
        if (e.values.length === 1) return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${U(e.values[0])}`;
        let c = e.values.map((O) => U(O));
        if (e.values.length === 2) return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${c[0]} \u05D0\u05D5 ${c[1]}`;
        let _ = c[c.length - 1];
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${c.slice(0, -1).join(", ")} \u05D0\u05D5 ${_}`;
      }
      case "too_big": {
        let c = $(e.origin), _ = n(e.origin ?? "value");
        if (e.origin === "string") return `${c?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${_} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${e.maximum.toString()} ${c?.unit ?? ""} ${e.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        if (e.origin === "number") {
          let J = e.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${e.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${e.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${_} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${J}`;
        }
        if (e.origin === "array" || e.origin === "set") {
          let J = e.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA", X = e.inclusive ? `${e.maximum} ${c?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${e.maximum} ${c?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${_} ${J} \u05DC\u05D4\u05DB\u05D9\u05DC ${X}`.trim();
        }
        let N = e.inclusive ? "<=" : "<", O = v(e.origin ?? "value");
        if (c?.unit) return `${c.longLabel} \u05DE\u05D3\u05D9: ${_} ${O} ${N}${e.maximum.toString()} ${c.unit}`;
        return `${c?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${_} ${O} ${N}${e.maximum.toString()}`;
      }
      case "too_small": {
        let c = $(e.origin), _ = n(e.origin ?? "value");
        if (e.origin === "string") return `${c?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${_} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${e.minimum.toString()} ${c?.unit ?? ""} ${e.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        if (e.origin === "number") {
          let J = e.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${e.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${e.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${_} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${J}`;
        }
        if (e.origin === "array" || e.origin === "set") {
          let J = e.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (e.minimum === 1 && e.inclusive) {
            let zr = e.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${_} ${J} \u05DC\u05D4\u05DB\u05D9\u05DC ${zr}`;
          }
          let X = e.inclusive ? `${e.minimum} ${c?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${e.minimum} ${c?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${_} ${J} \u05DC\u05D4\u05DB\u05D9\u05DC ${X}`.trim();
        }
        let N = e.inclusive ? ">=" : ">", O = v(e.origin ?? "value");
        if (c?.unit) return `${c.shortLabel} \u05DE\u05D3\u05D9: ${_} ${O} ${N}${e.minimum.toString()} ${c.unit}`;
        return `${c?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${_} ${O} ${N}${e.minimum.toString()}`;
      }
      case "invalid_format": {
        let c = e;
        if (c.format === "starts_with") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${c.prefix}"`;
        if (c.format === "ends_with") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${c.suffix}"`;
        if (c.format === "includes") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${c.includes}"`;
        if (c.format === "regex") return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${c.pattern}`;
        let _ = u[c.format], N = _?.label ?? c.format, J = (_?.gender ?? "m") === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${N} \u05DC\u05D0 ${J}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${e.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${e.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${e.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${b(e.keys, ", ")}`;
      case "invalid_key":
        return "\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8";
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element":
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${n(e.origin ?? "array")}`;
      default:
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
    }
  };
};
function pt() {
  return { localeError: $4() };
}
var u4 = () => {
  let r = { string: { unit: "karakter", verb: "legyen" }, file: { unit: "byte", verb: "legyen" }, array: { unit: "elem", verb: "legyen" }, set: { unit: "elem", verb: "legyen" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "bemenet", email: "email c\xEDm", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO id\u0151b\xE9lyeg", date: "ISO d\xE1tum", time: "ISO id\u0151", duration: "ISO id\u0151intervallum", ipv4: "IPv4 c\xEDm", ipv6: "IPv6 c\xEDm", cidrv4: "IPv4 tartom\xE1ny", cidrv6: "IPv6 tartom\xE1ny", base64: "base64-k\xF3dolt string", base64url: "base64url-k\xF3dolt string", json_string: "JSON string", e164: "E.164 sz\xE1m", jwt: "JWT", template_literal: "bemenet" }, t = { nan: "NaN", number: "sz\xE1m", array: "t\xF6mb" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${n.expected}, a kapott \xE9rt\xE9k ${u}`;
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${v}, a kapott \xE9rt\xE9k ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${U(n.values[0])}`;
        return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `T\xFAl nagy: ${n.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${v}${n.maximum.toString()} ${$.unit ?? "elem"}`;
        return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${n.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${n.origin} m\xE9rete t\xFAl kicsi ${v}${n.minimum.toString()} ${$.unit}`;
        return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${n.origin} t\xFAl kicsi ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\xC9rv\xE9nytelen string: "${v.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
        if (v.format === "ends_with") return `\xC9rv\xE9nytelen string: "${v.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
        if (v.format === "includes") return `\xC9rv\xE9nytelen string: "${v.includes}" \xE9rt\xE9ket kell tartalmaznia`;
        if (v.format === "regex") return `\xC9rv\xE9nytelen string: ${v.pattern} mint\xE1nak kell megfelelnie`;
        return `\xC9rv\xE9nytelen ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${n.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${n.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${n.origin}`;
      default:
        return "\xC9rv\xE9nytelen bemenet";
    }
  };
};
function st() {
  return { localeError: u4() };
}
function rl(r, i, o) {
  return Math.abs(r) === 1 ? i : o;
}
function Xr(r) {
  if (!r) return "";
  let i = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"], o = r[r.length - 1];
  return r + (i.includes(o) ? "\u0576" : "\u0568");
}
var g4 = () => {
  let r = { string: { unit: { one: "\u0576\u0577\u0561\u0576", many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, file: { unit: { one: "\u0562\u0561\u0575\u0569", many: "\u0562\u0561\u0575\u0569\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, array: { unit: { one: "\u057F\u0561\u0580\u0580", many: "\u057F\u0561\u0580\u0580\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" }, set: { unit: { one: "\u057F\u0561\u0580\u0580", many: "\u057F\u0561\u0580\u0580\u0565\u0580" }, verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0574\u0578\u0582\u057F\u0584", email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565", url: "URL", emoji: "\u0567\u0574\u0578\u057B\u056B", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574", date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E", time: "ISO \u056A\u0561\u0574", duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576", ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565", ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565", cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584", cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584", base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572", base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572", json_string: "JSON \u057F\u0578\u0572", e164: "E.164 \u0570\u0561\u0574\u0561\u0580", jwt: "JWT", template_literal: "\u0574\u0578\u0582\u057F\u0584" }, t = { nan: "NaN", number: "\u0569\u056B\u057E", array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${n.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${u}`;
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${v}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${U(n.values[1])}`;
        return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) {
          let u = Number(n.maximum), l = rl(u, $.unit.one, $.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${Xr(n.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${v}${n.maximum.toString()} ${l}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${Xr(n.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) {
          let u = Number(n.minimum), l = rl(u, $.unit.one, $.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${Xr(n.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${v}${n.minimum.toString()} ${l}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${Xr(n.origin)} \u056C\u056B\u0576\u056B ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${v.prefix}"-\u0578\u057E`;
        if (v.format === "ends_with") return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${v.suffix}"-\u0578\u057E`;
        if (v.format === "includes") return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${v.includes}"`;
        if (v.format === "regex") return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${v.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
        return `\u054D\u056D\u0561\u056C ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${n.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${n.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${Xr(n.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${Xr(n.origin)}-\u0578\u0582\u0574`;
      default:
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
    }
  };
};
function r$() {
  return { localeError: g4() };
}
var e4 = () => {
  let r = { string: { unit: "karakter", verb: "memiliki" }, file: { unit: "byte", verb: "memiliki" }, array: { unit: "item", verb: "memiliki" }, set: { unit: "item", verb: "memiliki" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "alamat email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "tanggal dan waktu format ISO", date: "tanggal format ISO", time: "jam format ISO", duration: "durasi format ISO", ipv4: "alamat IPv4", ipv6: "alamat IPv6", cidrv4: "rentang alamat IPv4", cidrv6: "rentang alamat IPv6", base64: "string dengan enkode base64", base64url: "string dengan enkode base64url", json_string: "string JSON", e164: "angka E.164", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Input tidak valid: diharapkan instanceof ${n.expected}, diterima ${u}`;
        return `Input tidak valid: diharapkan ${v}, diterima ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Input tidak valid: diharapkan ${U(n.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Terlalu besar: diharapkan ${n.origin ?? "value"} memiliki ${v}${n.maximum.toString()} ${$.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${n.origin ?? "value"} menjadi ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Terlalu kecil: diharapkan ${n.origin} memiliki ${v}${n.minimum.toString()} ${$.unit}`;
        return `Terlalu kecil: diharapkan ${n.origin} menjadi ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `String tidak valid: harus dimulai dengan "${v.prefix}"`;
        if (v.format === "ends_with") return `String tidak valid: harus berakhir dengan "${v.suffix}"`;
        if (v.format === "includes") return `String tidak valid: harus menyertakan "${v.includes}"`;
        if (v.format === "regex") return `String tidak valid: harus sesuai pola ${v.pattern}`;
        return `${o[v.format] ?? n.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${n.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${n.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${n.origin}`;
      default:
        return "Input tidak valid";
    }
  };
};
function n$() {
  return { localeError: e4() };
}
var l4 = () => {
  let r = { string: { unit: "stafi", verb: "a\xF0 hafa" }, file: { unit: "b\xE6ti", verb: "a\xF0 hafa" }, array: { unit: "hluti", verb: "a\xF0 hafa" }, set: { unit: "hluti", verb: "a\xF0 hafa" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "gildi", email: "netfang", url: "vefsl\xF3\xF0", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dagsetning og t\xEDmi", date: "ISO dagsetning", time: "ISO t\xEDmi", duration: "ISO t\xEDmalengd", ipv4: "IPv4 address", ipv6: "IPv6 address", cidrv4: "IPv4 range", cidrv6: "IPv6 range", base64: "base64-encoded strengur", base64url: "base64url-encoded strengur", json_string: "JSON strengur", e164: "E.164 t\xF6lugildi", jwt: "JWT", template_literal: "gildi" }, t = { nan: "NaN", number: "n\xFAmer", array: "fylki" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Rangt gildi: \xDE\xFA sl\xF3st inn ${u} \xFEar sem \xE1 a\xF0 vera instanceof ${n.expected}`;
        return `Rangt gildi: \xDE\xFA sl\xF3st inn ${u} \xFEar sem \xE1 a\xF0 vera ${v}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Rangt gildi: gert r\xE1\xF0 fyrir ${U(n.values[0])}`;
        return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${n.origin ?? "gildi"} hafi ${v}${n.maximum.toString()} ${$.unit ?? "hluti"}`;
        return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${n.origin ?? "gildi"} s\xE9 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${n.origin} hafi ${v}${n.minimum.toString()} ${$.unit}`;
        return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${n.origin} s\xE9 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${v.prefix}"`;
        if (v.format === "ends_with") return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${v.suffix}"`;
        if (v.format === "includes") return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${v.includes}"`;
        if (v.format === "regex") return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${v.pattern}`;
        return `Rangt ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${n.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${n.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${n.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${n.origin}`;
      default:
        return "Rangt gildi";
    }
  };
};
function i$() {
  return { localeError: l4() };
}
var I4 = () => {
  let r = { string: { unit: "caratteri", verb: "avere" }, file: { unit: "byte", verb: "avere" }, array: { unit: "elementi", verb: "avere" }, set: { unit: "elementi", verb: "avere" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "indirizzo email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data e ora ISO", date: "data ISO", time: "ora ISO", duration: "durata ISO", ipv4: "indirizzo IPv4", ipv6: "indirizzo IPv6", cidrv4: "intervallo IPv4", cidrv6: "intervallo IPv6", base64: "stringa codificata in base64", base64url: "URL codificata in base64", json_string: "stringa JSON", e164: "numero E.164", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN", number: "numero", array: "vettore" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Input non valido: atteso instanceof ${n.expected}, ricevuto ${u}`;
        return `Input non valido: atteso ${v}, ricevuto ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Input non valido: atteso ${U(n.values[0])}`;
        return `Opzione non valida: atteso uno tra ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Troppo grande: ${n.origin ?? "valore"} deve avere ${v}${n.maximum.toString()} ${$.unit ?? "elementi"}`;
        return `Troppo grande: ${n.origin ?? "valore"} deve essere ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Troppo piccolo: ${n.origin} deve avere ${v}${n.minimum.toString()} ${$.unit}`;
        return `Troppo piccolo: ${n.origin} deve essere ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Stringa non valida: deve iniziare con "${v.prefix}"`;
        if (v.format === "ends_with") return `Stringa non valida: deve terminare con "${v.suffix}"`;
        if (v.format === "includes") return `Stringa non valida: deve includere "${v.includes}"`;
        if (v.format === "regex") return `Stringa non valida: deve corrispondere al pattern ${v.pattern}`;
        return `Invalid ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${n.divisor}`;
      case "unrecognized_keys":
        return `Chiav${n.keys.length > 1 ? "i" : "e"} non riconosciut${n.keys.length > 1 ? "e" : "a"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${n.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${n.origin}`;
      default:
        return "Input non valido";
    }
  };
};
function v$() {
  return { localeError: I4() };
}
var c4 = () => {
  let r = { string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" }, file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" }, array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }, set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u5165\u529B\u5024", email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", url: "URL", emoji: "\u7D75\u6587\u5B57", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO\u65E5\u6642", date: "ISO\u65E5\u4ED8", time: "ISO\u6642\u523B", duration: "ISO\u671F\u9593", ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9", ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9", cidrv4: "IPv4\u7BC4\u56F2", cidrv6: "IPv6\u7BC4\u56F2", base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217", base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217", json_string: "JSON\u6587\u5B57\u5217", e164: "E.164\u756A\u53F7", jwt: "JWT", template_literal: "\u5165\u529B\u5024" }, t = { nan: "NaN", number: "\u6570\u5024", array: "\u914D\u5217" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${n.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${u}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
        return `\u7121\u52B9\u306A\u5165\u529B: ${v}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${u}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u7121\u52B9\u306A\u5165\u529B: ${U(n.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
        return `\u7121\u52B9\u306A\u9078\u629E: ${b(n.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        let v = n.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044", $ = i(n.origin);
        if ($) return `\u5927\u304D\u3059\u304E\u308B\u5024: ${n.origin ?? "\u5024"}\u306F${n.maximum.toString()}${$.unit ?? "\u8981\u7D20"}${v}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5927\u304D\u3059\u304E\u308B\u5024: ${n.origin ?? "\u5024"}\u306F${n.maximum.toString()}${v}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        let v = n.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044", $ = i(n.origin);
        if ($) return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${n.origin}\u306F${n.minimum.toString()}${$.unit}${v}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${n.origin}\u306F${n.minimum.toString()}${v}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${v.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (v.format === "ends_with") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${v.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (v.format === "includes") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${v.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (v.format === "regex") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${v.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u7121\u52B9\u306A${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${n.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${n.keys.length > 1 ? "\u7FA4" : ""}: ${b(n.keys, "\u3001")}`;
      case "invalid_key":
        return `${n.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${n.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return "\u7121\u52B9\u306A\u5165\u529B";
    }
  };
};
function o$() {
  return { localeError: c4() };
}
var b4 = () => {
  let r = { string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }, set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0", email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", url: "URL", emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD", date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8", time: "\u10D3\u10E0\u10DD", duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0", ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8", cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8", cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8", base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8", jwt: "JWT", template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0" }, t = { nan: "NaN", number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8", string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8", boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8", function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0", array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${n.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${u}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${v}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${U(n.values[0])}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${b(n.values, "|")}-\u10D3\u10D0\u10DC`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${n.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${$.verb} ${v}${n.maximum.toString()} ${$.unit}`;
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${n.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${n.origin} ${$.verb} ${v}${n.minimum.toString()} ${$.unit}`;
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${n.origin} \u10D8\u10E7\u10DD\u10E1 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${v.prefix}"-\u10D8\u10D7`;
        if (v.format === "ends_with") return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${v.suffix}"-\u10D8\u10D7`;
        if (v.format === "includes") return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${v.includes}"-\u10E1`;
        if (v.format === "regex") return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${v.pattern}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${n.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
      case "unrecognized_keys":
        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${n.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${n.origin}-\u10E8\u10D8`;
      case "invalid_union":
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      case "invalid_element":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${n.origin}-\u10E8\u10D8`;
      default:
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
    }
  };
};
function t$() {
  return { localeError: b4() };
}
var _4 = () => {
  let r = { string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }, set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B", email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B", url: "URL", emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO", date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO", time: "\u1798\u17C9\u17C4\u1784 ISO", duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO", ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4", ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6", cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4", cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6", base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64", base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url", json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON", e164: "\u179B\u17C1\u1781 E.164", jwt: "JWT", template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B" }, t = { nan: "NaN", number: "\u179B\u17C1\u1781", array: "\u17A2\u17B6\u179A\u17C1 (Array)", null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${n.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${u}`;
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${v} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${U(n.values[0])}`;
        return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${v} ${n.maximum.toString()} ${$.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
        return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${v} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin} ${v} ${n.minimum.toString()} ${$.unit}`;
        return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${n.origin} ${v} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${v.prefix}"`;
        if (v.format === "ends_with") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${v.suffix}"`;
        if (v.format === "includes") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${v.includes}"`;
        if (v.format === "regex") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${v.pattern}`;
        return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${n.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${n.origin}`;
      case "invalid_union":
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${n.origin}`;
      default:
        return "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C";
    }
  };
};
function Dn() {
  return { localeError: _4() };
}
function $$() {
  return Dn();
}
var U4 = () => {
  let r = { string: { unit: "\uBB38\uC790", verb: "to have" }, file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" }, array: { unit: "\uAC1C", verb: "to have" }, set: { unit: "\uAC1C", verb: "to have" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\uC785\uB825", email: "\uC774\uBA54\uC77C \uC8FC\uC18C", url: "URL", emoji: "\uC774\uBAA8\uC9C0", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04", date: "ISO \uB0A0\uC9DC", time: "ISO \uC2DC\uAC04", duration: "ISO \uAE30\uAC04", ipv4: "IPv4 \uC8FC\uC18C", ipv6: "IPv6 \uC8FC\uC18C", cidrv4: "IPv4 \uBC94\uC704", cidrv6: "IPv6 \uBC94\uC704", base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4", base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4", json_string: "JSON \uBB38\uC790\uC5F4", e164: "E.164 \uBC88\uD638", jwt: "JWT", template_literal: "\uC785\uB825" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${n.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${u}\uC785\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${v}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${u}\uC785\uB2C8\uB2E4`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${U(n.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C \uC635\uC158: ${b(n.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        let v = n.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC", $ = v === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", u = i(n.origin), l = u?.unit ?? "\uC694\uC18C";
        if (u) return `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${n.maximum.toString()}${l} ${v}${$}`;
        return `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${n.maximum.toString()} ${v}${$}`;
      }
      case "too_small": {
        let v = n.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC", $ = v === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", u = i(n.origin), l = u?.unit ?? "\uC694\uC18C";
        if (u) return `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${n.minimum.toString()}${l} ${v}${$}`;
        return `${n.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${n.minimum.toString()} ${v}${$}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${v.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
        if (v.format === "ends_with") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${v.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
        if (v.format === "includes") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${v.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
        if (v.format === "regex") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${v.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${n.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${n.origin}`;
      case "invalid_union":
        return "\uC798\uBABB\uB41C \uC785\uB825";
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${n.origin}`;
      default:
        return "\uC798\uBABB\uB41C \uC785\uB825";
    }
  };
};
function u$() {
  return { localeError: U4() };
}
var wn = (r) => {
  return r.charAt(0).toUpperCase() + r.slice(1);
};
function nl(r) {
  let i = Math.abs(r), o = i % 10, t = i % 100;
  if (t >= 11 && t <= 19 || o === 0) return "many";
  if (o === 1) return "one";
  return "few";
}
var k4 = () => {
  let r = { string: { unit: { one: "simbolis", few: "simboliai", many: "simboli\u0173" }, verb: { smaller: { inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip", notInclusive: "turi b\u016Bti trumpesn\u0117 kaip" }, bigger: { inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip", notInclusive: "turi b\u016Bti ilgesn\u0117 kaip" } } }, file: { unit: { one: "baitas", few: "baitai", many: "bait\u0173" }, verb: { smaller: { inclusive: "turi b\u016Bti ne didesnis kaip", notInclusive: "turi b\u016Bti ma\u017Eesnis kaip" }, bigger: { inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip", notInclusive: "turi b\u016Bti didesnis kaip" } } }, array: { unit: { one: "element\u0105", few: "elementus", many: "element\u0173" }, verb: { smaller: { inclusive: "turi tur\u0117ti ne daugiau kaip", notInclusive: "turi tur\u0117ti ma\u017Eiau kaip" }, bigger: { inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip", notInclusive: "turi tur\u0117ti daugiau kaip" } } }, set: { unit: { one: "element\u0105", few: "elementus", many: "element\u0173" }, verb: { smaller: { inclusive: "turi tur\u0117ti ne daugiau kaip", notInclusive: "turi tur\u0117ti ma\u017Eiau kaip" }, bigger: { inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip", notInclusive: "turi tur\u0117ti daugiau kaip" } } } };
  function i(n, v, $, u) {
    let l = r[n] ?? null;
    if (l === null) return l;
    return { unit: l.unit[v], verb: l.verb[u][$ ? "inclusive" : "notInclusive"] };
  }
  let o = { regex: "\u012Fvestis", email: "el. pa\u0161to adresas", url: "URL", emoji: "jaustukas", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO data ir laikas", date: "ISO data", time: "ISO laikas", duration: "ISO trukm\u0117", ipv4: "IPv4 adresas", ipv6: "IPv6 adresas", cidrv4: "IPv4 tinklo prefiksas (CIDR)", cidrv6: "IPv6 tinklo prefiksas (CIDR)", base64: "base64 u\u017Ekoduota eilut\u0117", base64url: "base64url u\u017Ekoduota eilut\u0117", json_string: "JSON eilut\u0117", e164: "E.164 numeris", jwt: "JWT", template_literal: "\u012Fvestis" }, t = { nan: "NaN", number: "skai\u010Dius", bigint: "sveikasis skai\u010Dius", string: "eilut\u0117", boolean: "login\u0117 reik\u0161m\u0117", undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117", function: "funkcija", symbol: "simbolis", array: "masyvas", object: "objektas", null: "nulin\u0117 reik\u0161m\u0117" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Gautas tipas ${u}, o tik\u0117tasi - instanceof ${n.expected}`;
        return `Gautas tipas ${u}, o tik\u0117tasi - ${v}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Privalo b\u016Bti ${U(n.values[0])}`;
        return `Privalo b\u016Bti vienas i\u0161 ${b(n.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        let v = t[n.origin] ?? n.origin, $ = i(n.origin, nl(Number(n.maximum)), n.inclusive ?? false, "smaller");
        if ($?.verb) return `${wn(v ?? n.origin ?? "reik\u0161m\u0117")} ${$.verb} ${n.maximum.toString()} ${$.unit ?? "element\u0173"}`;
        let u = n.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${wn(v ?? n.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${u} ${n.maximum.toString()} ${$?.unit}`;
      }
      case "too_small": {
        let v = t[n.origin] ?? n.origin, $ = i(n.origin, nl(Number(n.minimum)), n.inclusive ?? false, "bigger");
        if ($?.verb) return `${wn(v ?? n.origin ?? "reik\u0161m\u0117")} ${$.verb} ${n.minimum.toString()} ${$.unit ?? "element\u0173"}`;
        let u = n.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${wn(v ?? n.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${u} ${n.minimum.toString()} ${$?.unit}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Eilut\u0117 privalo prasid\u0117ti "${v.prefix}"`;
        if (v.format === "ends_with") return `Eilut\u0117 privalo pasibaigti "${v.suffix}"`;
        if (v.format === "includes") return `Eilut\u0117 privalo \u012Ftraukti "${v.includes}"`;
        if (v.format === "regex") return `Eilut\u0117 privalo atitikti ${v.pattern}`;
        return `Neteisingas ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${n.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${n.keys.length > 1 ? "i" : "as"} rakt${n.keys.length > 1 ? "ai" : "as"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        let v = t[n.origin] ?? n.origin;
        return `${wn(v ?? n.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function g$() {
  return { localeError: k4() };
}
var D4 = () => {
  let r = { string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }, set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0432\u043D\u0435\u0441", email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430", url: "URL", emoji: "\u0435\u043C\u043E\u045F\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435", date: "ISO \u0434\u0430\u0442\u0443\u043C", time: "ISO \u0432\u0440\u0435\u043C\u0435", duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430", cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433", cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433", base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430", base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430", json_string: "JSON \u043D\u0438\u0437\u0430", e164: "E.164 \u0431\u0440\u043E\u0458", jwt: "JWT", template_literal: "\u0432\u043D\u0435\u0441" }, t = { nan: "NaN", number: "\u0431\u0440\u043E\u0458", array: "\u043D\u0438\u0437\u0430" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${n.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${u}`;
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${v}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Invalid input: expected ${U(n.values[0])}`;
        return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${v}${n.maximum.toString()} ${$.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin} \u0434\u0430 \u0438\u043C\u0430 ${v}${n.minimum.toString()} ${$.unit}`;
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${n.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${v.prefix}"`;
        if (v.format === "ends_with") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${v.suffix}"`;
        if (v.format === "includes") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${v.includes}"`;
        if (v.format === "regex") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${v.pattern}`;
        return `Invalid ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${n.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${n.origin}`;
      default:
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
    }
  };
};
function e$() {
  return { localeError: D4() };
}
var w4 = () => {
  let r = { string: { unit: "aksara", verb: "mempunyai" }, file: { unit: "bait", verb: "mempunyai" }, array: { unit: "elemen", verb: "mempunyai" }, set: { unit: "elemen", verb: "mempunyai" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "alamat e-mel", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "tarikh masa ISO", date: "tarikh ISO", time: "masa ISO", duration: "tempoh ISO", ipv4: "alamat IPv4", ipv6: "alamat IPv6", cidrv4: "julat IPv4", cidrv6: "julat IPv6", base64: "string dikodkan base64", base64url: "string dikodkan base64url", json_string: "string JSON", e164: "nombor E.164", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN", number: "nombor" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Input tidak sah: dijangka instanceof ${n.expected}, diterima ${u}`;
        return `Input tidak sah: dijangka ${v}, diterima ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Input tidak sah: dijangka ${U(n.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Terlalu besar: dijangka ${n.origin ?? "nilai"} ${$.verb} ${v}${n.maximum.toString()} ${$.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${n.origin ?? "nilai"} adalah ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Terlalu kecil: dijangka ${n.origin} ${$.verb} ${v}${n.minimum.toString()} ${$.unit}`;
        return `Terlalu kecil: dijangka ${n.origin} adalah ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `String tidak sah: mesti bermula dengan "${v.prefix}"`;
        if (v.format === "ends_with") return `String tidak sah: mesti berakhir dengan "${v.suffix}"`;
        if (v.format === "includes") return `String tidak sah: mesti mengandungi "${v.includes}"`;
        if (v.format === "regex") return `String tidak sah: mesti sepadan dengan corak ${v.pattern}`;
        return `${o[v.format] ?? n.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${n.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${n.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${n.origin}`;
      default:
        return "Input tidak sah";
    }
  };
};
function l$() {
  return { localeError: w4() };
}
var N4 = () => {
  let r = { string: { unit: "tekens", verb: "heeft" }, file: { unit: "bytes", verb: "heeft" }, array: { unit: "elementen", verb: "heeft" }, set: { unit: "elementen", verb: "heeft" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "invoer", email: "emailadres", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum en tijd", date: "ISO datum", time: "ISO tijd", duration: "ISO duur", ipv4: "IPv4-adres", ipv6: "IPv6-adres", cidrv4: "IPv4-bereik", cidrv6: "IPv6-bereik", base64: "base64-gecodeerde tekst", base64url: "base64 URL-gecodeerde tekst", json_string: "JSON string", e164: "E.164-nummer", jwt: "JWT", template_literal: "invoer" }, t = { nan: "NaN", number: "getal" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Ongeldige invoer: verwacht instanceof ${n.expected}, ontving ${u}`;
        return `Ongeldige invoer: verwacht ${v}, ontving ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Ongeldige invoer: verwacht ${U(n.values[0])}`;
        return `Ongeldige optie: verwacht \xE9\xE9n van ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin), u = n.origin === "date" ? "laat" : n.origin === "string" ? "lang" : "groot";
        if ($) return `Te ${u}: verwacht dat ${n.origin ?? "waarde"} ${v}${n.maximum.toString()} ${$.unit ?? "elementen"} ${$.verb}`;
        return `Te ${u}: verwacht dat ${n.origin ?? "waarde"} ${v}${n.maximum.toString()} is`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin), u = n.origin === "date" ? "vroeg" : n.origin === "string" ? "kort" : "klein";
        if ($) return `Te ${u}: verwacht dat ${n.origin} ${v}${n.minimum.toString()} ${$.unit} ${$.verb}`;
        return `Te ${u}: verwacht dat ${n.origin} ${v}${n.minimum.toString()} is`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Ongeldige tekst: moet met "${v.prefix}" beginnen`;
        if (v.format === "ends_with") return `Ongeldige tekst: moet op "${v.suffix}" eindigen`;
        if (v.format === "includes") return `Ongeldige tekst: moet "${v.includes}" bevatten`;
        if (v.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${v.pattern}`;
        return `Ongeldig: ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${n.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${n.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${n.origin}`;
      default:
        return "Ongeldige invoer";
    }
  };
};
function I$() {
  return { localeError: N4() };
}
var O4 = () => {
  let r = { string: { unit: "tegn", verb: "\xE5 ha" }, file: { unit: "bytes", verb: "\xE5 ha" }, array: { unit: "elementer", verb: "\xE5 inneholde" }, set: { unit: "elementer", verb: "\xE5 inneholde" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "input", email: "e-postadresse", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO dato- og klokkeslett", date: "ISO-dato", time: "ISO-klokkeslett", duration: "ISO-varighet", ipv4: "IPv4-omr\xE5de", ipv6: "IPv6-omr\xE5de", cidrv4: "IPv4-spekter", cidrv6: "IPv6-spekter", base64: "base64-enkodet streng", base64url: "base64url-enkodet streng", json_string: "JSON-streng", e164: "E.164-nummer", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN", number: "tall", array: "liste" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Ugyldig input: forventet instanceof ${n.expected}, fikk ${u}`;
        return `Ugyldig input: forventet ${v}, fikk ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Ugyldig verdi: forventet ${U(n.values[0])}`;
        return `Ugyldig valg: forventet en av ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `For stor(t): forventet ${n.origin ?? "value"} til \xE5 ha ${v}${n.maximum.toString()} ${$.unit ?? "elementer"}`;
        return `For stor(t): forventet ${n.origin ?? "value"} til \xE5 ha ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `For lite(n): forventet ${n.origin} til \xE5 ha ${v}${n.minimum.toString()} ${$.unit}`;
        return `For lite(n): forventet ${n.origin} til \xE5 ha ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Ugyldig streng: m\xE5 starte med "${v.prefix}"`;
        if (v.format === "ends_with") return `Ugyldig streng: m\xE5 ende med "${v.suffix}"`;
        if (v.format === "includes") return `Ugyldig streng: m\xE5 inneholde "${v.includes}"`;
        if (v.format === "regex") return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${v.pattern}`;
        return `Ugyldig ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${n.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${n.origin}`;
      default:
        return "Ugyldig input";
    }
  };
};
function c$() {
  return { localeError: O4() };
}
var z4 = () => {
  let r = { string: { unit: "harf", verb: "olmal\u0131d\u0131r" }, file: { unit: "bayt", verb: "olmal\u0131d\u0131r" }, array: { unit: "unsur", verb: "olmal\u0131d\u0131r" }, set: { unit: "unsur", verb: "olmal\u0131d\u0131r" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "giren", email: "epostag\xE2h", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO heng\xE2m\u0131", date: "ISO tarihi", time: "ISO zaman\u0131", duration: "ISO m\xFCddeti", ipv4: "IPv4 ni\u015F\xE2n\u0131", ipv6: "IPv6 ni\u015F\xE2n\u0131", cidrv4: "IPv4 menzili", cidrv6: "IPv6 menzili", base64: "base64-\u015Fifreli metin", base64url: "base64url-\u015Fifreli metin", json_string: "JSON metin", e164: "E.164 say\u0131s\u0131", jwt: "JWT", template_literal: "giren" }, t = { nan: "NaN", number: "numara", array: "saf", null: "gayb" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `F\xE2sit giren: umulan instanceof ${n.expected}, al\u0131nan ${u}`;
        return `F\xE2sit giren: umulan ${v}, al\u0131nan ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `F\xE2sit giren: umulan ${U(n.values[0])}`;
        return `F\xE2sit tercih: m\xFBteberler ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Fazla b\xFCy\xFCk: ${n.origin ?? "value"}, ${v}${n.maximum.toString()} ${$.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
        return `Fazla b\xFCy\xFCk: ${n.origin ?? "value"}, ${v}${n.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Fazla k\xFC\xE7\xFCk: ${n.origin}, ${v}${n.minimum.toString()} ${$.unit} sahip olmal\u0131yd\u0131.`;
        return `Fazla k\xFC\xE7\xFCk: ${n.origin}, ${v}${n.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `F\xE2sit metin: "${v.prefix}" ile ba\u015Flamal\u0131.`;
        if (v.format === "ends_with") return `F\xE2sit metin: "${v.suffix}" ile bitmeli.`;
        if (v.format === "includes") return `F\xE2sit metin: "${v.includes}" ihtiv\xE2 etmeli.`;
        if (v.format === "regex") return `F\xE2sit metin: ${v.pattern} nak\u015F\u0131na uymal\u0131.`;
        return `F\xE2sit ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${n.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${n.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return "K\u0131ymet tan\u0131namad\u0131.";
    }
  };
};
function b$() {
  return { localeError: z4() };
}
var S4 = () => {
  let r = { string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }, file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" }, array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }, set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0648\u0631\u0648\u062F\u064A", email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9", url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644", emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A", date: "\u0646\u06D0\u067C\u0647", time: "\u0648\u062E\u062A", duration: "\u0645\u0648\u062F\u0647", ipv4: "\u062F IPv4 \u067E\u062A\u0647", ipv6: "\u062F IPv6 \u067E\u062A\u0647", cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647", cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647", base64: "base64-encoded \u0645\u062A\u0646", base64url: "base64url-encoded \u0645\u062A\u0646", json_string: "JSON \u0645\u062A\u0646", e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647", jwt: "JWT", template_literal: "\u0648\u0631\u0648\u062F\u064A" }, t = { nan: "NaN", number: "\u0639\u062F\u062F", array: "\u0627\u0631\u06D0" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${n.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${u} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${v} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${u} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${U(n.values[0])} \u0648\u0627\u06CC`;
        return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${b(n.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${n.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${v}${n.maximum.toString()} ${$.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
        return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${n.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${v}${n.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${n.origin} \u0628\u0627\u06CC\u062F ${v}${n.minimum.toString()} ${$.unit} \u0648\u0644\u0631\u064A`;
        return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${n.origin} \u0628\u0627\u06CC\u062F ${v}${n.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${v.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
        if (v.format === "ends_with") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${v.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
        if (v.format === "includes") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${v.includes}" \u0648\u0644\u0631\u064A`;
        if (v.format === "regex") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${v.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
        return `${o[v.format] ?? n.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${n.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${n.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${n.origin} \u06A9\u06D0`;
      case "invalid_union":
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${n.origin} \u06A9\u06D0`;
      default:
        return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
    }
  };
};
function _$() {
  return { localeError: S4() };
}
var P4 = () => {
  let r = { string: { unit: "znak\xF3w", verb: "mie\u0107" }, file: { unit: "bajt\xF3w", verb: "mie\u0107" }, array: { unit: "element\xF3w", verb: "mie\u0107" }, set: { unit: "element\xF3w", verb: "mie\u0107" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "wyra\u017Cenie", email: "adres email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data i godzina w formacie ISO", date: "data w formacie ISO", time: "godzina w formacie ISO", duration: "czas trwania ISO", ipv4: "adres IPv4", ipv6: "adres IPv6", cidrv4: "zakres IPv4", cidrv6: "zakres IPv6", base64: "ci\u0105g znak\xF3w zakodowany w formacie base64", base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url", json_string: "ci\u0105g znak\xF3w w formacie JSON", e164: "liczba E.164", jwt: "JWT", template_literal: "wej\u015Bcie" }, t = { nan: "NaN", number: "liczba", array: "tablica" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${n.expected}, otrzymano ${u}`;
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${v}, otrzymano ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${U(n.values[0])}`;
        return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${v}${n.maximum.toString()} ${$.unit ?? "element\xF3w"}`;
        return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${v}${n.minimum.toString()} ${$.unit ?? "element\xF3w"}`;
        return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${n.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${v.prefix}"`;
        if (v.format === "ends_with") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${v.suffix}"`;
        if (v.format === "includes") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${v.includes}"`;
        if (v.format === "regex") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${v.pattern}`;
        return `Nieprawid\u0142ow(y/a/e) ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${n.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${n.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${n.origin}`;
      default:
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
    }
  };
};
function U$() {
  return { localeError: P4() };
}
var j4 = () => {
  let r = { string: { unit: "caracteres", verb: "ter" }, file: { unit: "bytes", verb: "ter" }, array: { unit: "itens", verb: "ter" }, set: { unit: "itens", verb: "ter" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "padr\xE3o", email: "endere\xE7o de e-mail", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "data e hora ISO", date: "data ISO", time: "hora ISO", duration: "dura\xE7\xE3o ISO", ipv4: "endere\xE7o IPv4", ipv6: "endere\xE7o IPv6", cidrv4: "faixa de IPv4", cidrv6: "faixa de IPv6", base64: "texto codificado em base64", base64url: "URL codificada em base64", json_string: "texto JSON", e164: "n\xFAmero E.164", jwt: "JWT", template_literal: "entrada" }, t = { nan: "NaN", number: "n\xFAmero", null: "nulo" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Tipo inv\xE1lido: esperado instanceof ${n.expected}, recebido ${u}`;
        return `Tipo inv\xE1lido: esperado ${v}, recebido ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Entrada inv\xE1lida: esperado ${U(n.values[0])}`;
        return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Muito grande: esperado que ${n.origin ?? "valor"} tivesse ${v}${n.maximum.toString()} ${$.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${n.origin ?? "valor"} fosse ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Muito pequeno: esperado que ${n.origin} tivesse ${v}${n.minimum.toString()} ${$.unit}`;
        return `Muito pequeno: esperado que ${n.origin} fosse ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Texto inv\xE1lido: deve come\xE7ar com "${v.prefix}"`;
        if (v.format === "ends_with") return `Texto inv\xE1lido: deve terminar com "${v.suffix}"`;
        if (v.format === "includes") return `Texto inv\xE1lido: deve incluir "${v.includes}"`;
        if (v.format === "regex") return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${v.pattern}`;
        return `${o[v.format] ?? n.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${n.divisor}`;
      case "unrecognized_keys":
        return `Chave${n.keys.length > 1 ? "s" : ""} desconhecida${n.keys.length > 1 ? "s" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${n.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${n.origin}`;
      default:
        return "Campo inv\xE1lido";
    }
  };
};
function k$() {
  return { localeError: j4() };
}
function il(r, i, o, t) {
  let n = Math.abs(r), v = n % 10, $ = n % 100;
  if ($ >= 11 && $ <= 19) return t;
  if (v === 1) return i;
  if (v >= 2 && v <= 4) return o;
  return t;
}
var J4 = () => {
  let r = { string: { unit: { one: "\u0441\u0438\u043C\u0432\u043E\u043B", few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, file: { unit: { one: "\u0431\u0430\u0439\u0442", few: "\u0431\u0430\u0439\u0442\u0430", many: "\u0431\u0430\u0439\u0442" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, array: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" }, set: { unit: { one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442", few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430", many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432" }, verb: "\u0438\u043C\u0435\u0442\u044C" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0432\u0432\u043E\u0434", email: "email \u0430\u0434\u0440\u0435\u0441", url: "URL", emoji: "\u044D\u043C\u043E\u0434\u0437\u0438", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F", date: "ISO \u0434\u0430\u0442\u0430", time: "ISO \u0432\u0440\u0435\u043C\u044F", duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C", ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441", ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441", cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D", base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64", base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url", json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430", e164: "\u043D\u043E\u043C\u0435\u0440 E.164", jwt: "JWT", template_literal: "\u0432\u0432\u043E\u0434" }, t = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0441\u0438\u0432" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${n.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${u}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${v}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${U(n.values[0])}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) {
          let u = Number(n.maximum), l = il(u, $.unit.one, $.unit.few, $.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${v}${n.maximum.toString()} ${l}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) {
          let u = Number(n.minimum), l = il(u, $.unit.one, $.unit.few, $.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${v}${n.minimum.toString()} ${l}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${n.origin} \u0431\u0443\u0434\u0435\u0442 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${v.prefix}"`;
        if (v.format === "ends_with") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${v.suffix}"`;
        if (v.format === "includes") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${v.includes}"`;
        if (v.format === "regex") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${v.pattern}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${n.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${n.keys.length > 1 ? "\u0438" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${n.origin}`;
      default:
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
    }
  };
};
function D$() {
  return { localeError: J4() };
}
var L4 = () => {
  let r = { string: { unit: "znakov", verb: "imeti" }, file: { unit: "bajtov", verb: "imeti" }, array: { unit: "elementov", verb: "imeti" }, set: { unit: "elementov", verb: "imeti" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "vnos", email: "e-po\u0161tni naslov", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO datum in \u010Das", date: "ISO datum", time: "ISO \u010Das", duration: "ISO trajanje", ipv4: "IPv4 naslov", ipv6: "IPv6 naslov", cidrv4: "obseg IPv4", cidrv6: "obseg IPv6", base64: "base64 kodiran niz", base64url: "base64url kodiran niz", json_string: "JSON niz", e164: "E.164 \u0161tevilka", jwt: "JWT", template_literal: "vnos" }, t = { nan: "NaN", number: "\u0161tevilo", array: "tabela" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Neveljaven vnos: pri\u010Dakovano instanceof ${n.expected}, prejeto ${u}`;
        return `Neveljaven vnos: pri\u010Dakovano ${v}, prejeto ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Neveljaven vnos: pri\u010Dakovano ${U(n.values[0])}`;
        return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Preveliko: pri\u010Dakovano, da bo ${n.origin ?? "vrednost"} imelo ${v}${n.maximum.toString()} ${$.unit ?? "elementov"}`;
        return `Preveliko: pri\u010Dakovano, da bo ${n.origin ?? "vrednost"} ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Premajhno: pri\u010Dakovano, da bo ${n.origin} imelo ${v}${n.minimum.toString()} ${$.unit}`;
        return `Premajhno: pri\u010Dakovano, da bo ${n.origin} ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Neveljaven niz: mora se za\u010Deti z "${v.prefix}"`;
        if (v.format === "ends_with") return `Neveljaven niz: mora se kon\u010Dati z "${v.suffix}"`;
        if (v.format === "includes") return `Neveljaven niz: mora vsebovati "${v.includes}"`;
        if (v.format === "regex") return `Neveljaven niz: mora ustrezati vzorcu ${v.pattern}`;
        return `Neveljaven ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${n.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${n.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${n.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${n.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function w$() {
  return { localeError: L4() };
}
var G4 = () => {
  let r = { string: { unit: "tecken", verb: "att ha" }, file: { unit: "bytes", verb: "att ha" }, array: { unit: "objekt", verb: "att inneh\xE5lla" }, set: { unit: "objekt", verb: "att inneh\xE5lla" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "regulj\xE4rt uttryck", email: "e-postadress", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO-datum och tid", date: "ISO-datum", time: "ISO-tid", duration: "ISO-varaktighet", ipv4: "IPv4-intervall", ipv6: "IPv6-intervall", cidrv4: "IPv4-spektrum", cidrv6: "IPv6-spektrum", base64: "base64-kodad str\xE4ng", base64url: "base64url-kodad str\xE4ng", json_string: "JSON-str\xE4ng", e164: "E.164-nummer", jwt: "JWT", template_literal: "mall-literal" }, t = { nan: "NaN", number: "antal", array: "lista" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${n.expected}, fick ${u}`;
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${v}, fick ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Ogiltig inmatning: f\xF6rv\xE4ntat ${U(n.values[0])}`;
        return `Ogiltigt val: f\xF6rv\xE4ntade en av ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `F\xF6r stor(t): f\xF6rv\xE4ntade ${n.origin ?? "v\xE4rdet"} att ha ${v}${n.maximum.toString()} ${$.unit ?? "element"}`;
        return `F\xF6r stor(t): f\xF6rv\xE4ntat ${n.origin ?? "v\xE4rdet"} att ha ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `F\xF6r lite(t): f\xF6rv\xE4ntade ${n.origin ?? "v\xE4rdet"} att ha ${v}${n.minimum.toString()} ${$.unit}`;
        return `F\xF6r lite(t): f\xF6rv\xE4ntade ${n.origin ?? "v\xE4rdet"} att ha ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${v.prefix}"`;
        if (v.format === "ends_with") return `Ogiltig str\xE4ng: m\xE5ste sluta med "${v.suffix}"`;
        if (v.format === "includes") return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${v.includes}"`;
        if (v.format === "regex") return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${v.pattern}"`;
        return `Ogiltig(t) ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${n.divisor}`;
      case "unrecognized_keys":
        return `${n.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${n.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${n.origin ?? "v\xE4rdet"}`;
      default:
        return "Ogiltig input";
    }
  };
};
function N$() {
  return { localeError: G4() };
}
var W4 = () => {
  let r = { string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }, set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1", email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF", time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD", duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1", ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF", cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1", cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1", base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD", base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD", json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD", e164: "E.164 \u0B8E\u0BA3\u0BCD", jwt: "JWT", template_literal: "input" }, t = { nan: "NaN", number: "\u0B8E\u0BA3\u0BCD", array: "\u0B85\u0BA3\u0BBF", null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${n.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${u}`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${v}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${U(n.values[0])}`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${b(n.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${v}${n.maximum.toString()} ${$.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${v}${n.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin} ${v}${n.minimum.toString()} ${$.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${n.origin} ${v}${n.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${v.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (v.format === "ends_with") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${v.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (v.format === "includes") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${v.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (v.format === "regex") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${v.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${n.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${n.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${n.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
    }
  };
};
function O$() {
  return { localeError: W4() };
}
var V4 = () => {
  let r = { string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }, set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19", email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25", url: "URL", emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO", time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO", ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4", ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6", cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4", cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6", base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64", base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL", json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON", e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)", jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT", template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19" }, t = { nan: "NaN", number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02", array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)", null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${n.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${u}`;
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${v} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${U(n.values[0])}`;
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32", $ = i(n.origin);
        if ($) return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${v} ${n.maximum.toString()} ${$.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
        return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${v} ${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32", $ = i(n.origin);
        if ($) return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${v} ${n.minimum.toString()} ${$.unit}`;
        return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${n.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${v} ${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${v.prefix}"`;
        if (v.format === "ends_with") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${v.suffix}"`;
        if (v.format === "includes") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${v.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
        if (v.format === "regex") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${v.pattern}`;
        return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${n.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${n.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${n.origin}`;
      default:
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07";
    }
  };
};
function z$() {
  return { localeError: V4() };
}
var X4 = () => {
  let r = { string: { unit: "karakter", verb: "olmal\u0131" }, file: { unit: "bayt", verb: "olmal\u0131" }, array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }, set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "girdi", email: "e-posta adresi", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO tarih ve saat", date: "ISO tarih", time: "ISO saat", duration: "ISO s\xFCre", ipv4: "IPv4 adresi", ipv6: "IPv6 adresi", cidrv4: "IPv4 aral\u0131\u011F\u0131", cidrv6: "IPv6 aral\u0131\u011F\u0131", base64: "base64 ile \u015Fifrelenmi\u015F metin", base64url: "base64url ile \u015Fifrelenmi\u015F metin", json_string: "JSON dizesi", e164: "E.164 say\u0131s\u0131", jwt: "JWT", template_literal: "\u015Eablon dizesi" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${n.expected}, al\u0131nan ${u}`;
        return `Ge\xE7ersiz de\u011Fer: beklenen ${v}, al\u0131nan ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Ge\xE7ersiz de\u011Fer: beklenen ${U(n.values[0])}`;
        return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\xC7ok b\xFCy\xFCk: beklenen ${n.origin ?? "de\u011Fer"} ${v}${n.maximum.toString()} ${$.unit ?? "\xF6\u011Fe"}`;
        return `\xC7ok b\xFCy\xFCk: beklenen ${n.origin ?? "de\u011Fer"} ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\xC7ok k\xFC\xE7\xFCk: beklenen ${n.origin} ${v}${n.minimum.toString()} ${$.unit}`;
        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${n.origin} ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Ge\xE7ersiz metin: "${v.prefix}" ile ba\u015Flamal\u0131`;
        if (v.format === "ends_with") return `Ge\xE7ersiz metin: "${v.suffix}" ile bitmeli`;
        if (v.format === "includes") return `Ge\xE7ersiz metin: "${v.includes}" i\xE7ermeli`;
        if (v.format === "regex") return `Ge\xE7ersiz metin: ${v.pattern} desenine uymal\u0131`;
        return `Ge\xE7ersiz ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Ge\xE7ersiz say\u0131: ${n.divisor} ile tam b\xF6l\xFCnebilmeli`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar${n.keys.length > 1 ? "lar" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} i\xE7inde ge\xE7ersiz anahtar`;
      case "invalid_union":
        return "Ge\xE7ersiz de\u011Fer";
      case "invalid_element":
        return `${n.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
      default:
        return "Ge\xE7ersiz de\u011Fer";
    }
  };
};
function S$() {
  return { localeError: X4() };
}
var E4 = () => {
  let r = { string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }, set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456", email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438", url: "URL", emoji: "\u0435\u043C\u043E\u0434\u0437\u0456", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO", date: "\u0434\u0430\u0442\u0430 ISO", time: "\u0447\u0430\u0441 ISO", duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO", ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4", ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6", cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4", cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6", base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64", base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url", json_string: "\u0440\u044F\u0434\u043E\u043A JSON", e164: "\u043D\u043E\u043C\u0435\u0440 E.164", jwt: "JWT", template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456" }, t = { nan: "NaN", number: "\u0447\u0438\u0441\u043B\u043E", array: "\u043C\u0430\u0441\u0438\u0432" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${n.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${u}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${v}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${U(n.values[0])}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${$.verb} ${v}${n.maximum.toString()} ${$.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin} ${$.verb} ${v}${n.minimum.toString()} ${$.unit}`;
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${n.origin} \u0431\u0443\u0434\u0435 ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${v.prefix}"`;
        if (v.format === "ends_with") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${v.suffix}"`;
        if (v.format === "includes") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${v.includes}"`;
        if (v.format === "regex") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${v.pattern}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${n.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${n.keys.length > 1 ? "\u0456" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${n.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${n.origin}`;
      default:
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
    }
  };
};
function Nn() {
  return { localeError: E4() };
}
function P$() {
  return Nn();
}
var A4 = () => {
  let r = { string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" }, file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" }, array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }, set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0627\u0646 \u067E\u0679", email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633", url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644", emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC", uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4", uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6", nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC", guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2", ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC", xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC", ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC", datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645", date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E", time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A", duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A", ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633", ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633", cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C", cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C", base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF", base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF", json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF", e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631", jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC", template_literal: "\u0627\u0646 \u067E\u0679" }, t = { nan: "NaN", number: "\u0646\u0645\u0628\u0631", array: "\u0622\u0631\u06D2", null: "\u0646\u0644" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${n.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${u} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${v} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${u} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${U(n.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
        return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${b(n.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${n.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${v}${n.maximum.toString()} ${$.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${n.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${v}${n.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${n.origin} \u06A9\u06D2 ${v}${n.minimum.toString()} ${$.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${n.origin} \u06A9\u0627 ${v}${n.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${v.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (v.format === "ends_with") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${v.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (v.format === "includes") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${v.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (v.format === "regex") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${v.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        return `\u063A\u0644\u0637 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${n.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${n.keys.length > 1 ? "\u0632" : ""}: ${b(n.keys, "\u060C ")}`;
      case "invalid_key":
        return `${n.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${n.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
    }
  };
};
function j$() {
  return { localeError: A4() };
}
var K4 = () => {
  let r = { string: { unit: "belgi", verb: "bo\u2018lishi kerak" }, file: { unit: "bayt", verb: "bo\u2018lishi kerak" }, array: { unit: "element", verb: "bo\u2018lishi kerak" }, set: { unit: "element", verb: "bo\u2018lishi kerak" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "kirish", email: "elektron pochta manzili", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO sana va vaqti", date: "ISO sana", time: "ISO vaqt", duration: "ISO davomiylik", ipv4: "IPv4 manzil", ipv6: "IPv6 manzil", mac: "MAC manzil", cidrv4: "IPv4 diapazon", cidrv6: "IPv6 diapazon", base64: "base64 kodlangan satr", base64url: "base64url kodlangan satr", json_string: "JSON satr", e164: "E.164 raqam", jwt: "JWT", template_literal: "kirish" }, t = { nan: "NaN", number: "raqam", array: "massiv" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${n.expected}, qabul qilingan ${u}`;
        return `Noto\u2018g\u2018ri kirish: kutilgan ${v}, qabul qilingan ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `Noto\u2018g\u2018ri kirish: kutilgan ${U(n.values[0])}`;
        return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Juda katta: kutilgan ${n.origin ?? "qiymat"} ${v}${n.maximum.toString()} ${$.unit} ${$.verb}`;
        return `Juda katta: kutilgan ${n.origin ?? "qiymat"} ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Juda kichik: kutilgan ${n.origin} ${v}${n.minimum.toString()} ${$.unit} ${$.verb}`;
        return `Juda kichik: kutilgan ${n.origin} ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Noto\u2018g\u2018ri satr: "${v.prefix}" bilan boshlanishi kerak`;
        if (v.format === "ends_with") return `Noto\u2018g\u2018ri satr: "${v.suffix}" bilan tugashi kerak`;
        if (v.format === "includes") return `Noto\u2018g\u2018ri satr: "${v.includes}" ni o\u2018z ichiga olishi kerak`;
        if (v.format === "regex") return `Noto\u2018g\u2018ri satr: ${v.pattern} shabloniga mos kelishi kerak`;
        return `Noto\u2018g\u2018ri ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `Noto\u2018g\u2018ri raqam: ${n.divisor} ning karralisi bo\u2018lishi kerak`;
      case "unrecognized_keys":
        return `Noma\u2019lum kalit${n.keys.length > 1 ? "lar" : ""}: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} dagi kalit noto\u2018g\u2018ri`;
      case "invalid_union":
        return "Noto\u2018g\u2018ri kirish";
      case "invalid_element":
        return `${n.origin} da noto\u2018g\u2018ri qiymat`;
      default:
        return "Noto\u2018g\u2018ri kirish";
    }
  };
};
function J$() {
  return { localeError: K4() };
}
var q4 = () => {
  let r = { string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" }, file: { unit: "byte", verb: "c\xF3" }, array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }, set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u0111\u1EA7u v\xE0o", email: "\u0111\u1ECBa ch\u1EC9 email", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ng\xE0y gi\u1EDD ISO", date: "ng\xE0y ISO", time: "gi\u1EDD ISO", duration: "kho\u1EA3ng th\u1EDDi gian ISO", ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4", ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6", cidrv4: "d\u1EA3i IPv4", cidrv6: "d\u1EA3i IPv6", base64: "chu\u1ED7i m\xE3 h\xF3a base64", base64url: "chu\u1ED7i m\xE3 h\xF3a base64url", json_string: "chu\u1ED7i JSON", e164: "s\u1ED1 E.164", jwt: "JWT", template_literal: "\u0111\u1EA7u v\xE0o" }, t = { nan: "NaN", number: "s\u1ED1", array: "m\u1EA3ng" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${n.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${u}`;
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${v}, nh\u1EADn \u0111\u01B0\u1EE3c ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${U(n.values[0])}`;
        return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${n.origin ?? "gi\xE1 tr\u1ECB"} ${$.verb} ${v}${n.maximum.toString()} ${$.unit ?? "ph\u1EA7n t\u1EED"}`;
        return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${n.origin ?? "gi\xE1 tr\u1ECB"} ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${n.origin} ${$.verb} ${v}${n.minimum.toString()} ${$.unit}`;
        return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${n.origin} ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${v.prefix}"`;
        if (v.format === "ends_with") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${v.suffix}"`;
        if (v.format === "includes") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${v.includes}"`;
        if (v.format === "regex") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${v.pattern}`;
        return `${o[v.format] ?? n.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${n.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${n.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${n.origin}`;
      default:
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
    }
  };
};
function L$() {
  return { localeError: q4() };
}
var Q4 = () => {
  let r = { string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" }, file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" }, array: { unit: "\u9879", verb: "\u5305\u542B" }, set: { unit: "\u9879", verb: "\u5305\u542B" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u8F93\u5165", email: "\u7535\u5B50\u90AE\u4EF6", url: "URL", emoji: "\u8868\u60C5\u7B26\u53F7", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO\u65E5\u671F\u65F6\u95F4", date: "ISO\u65E5\u671F", time: "ISO\u65F6\u95F4", duration: "ISO\u65F6\u957F", ipv4: "IPv4\u5730\u5740", ipv6: "IPv6\u5730\u5740", cidrv4: "IPv4\u7F51\u6BB5", cidrv6: "IPv6\u7F51\u6BB5", base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32", base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32", json_string: "JSON\u5B57\u7B26\u4E32", e164: "E.164\u53F7\u7801", jwt: "JWT", template_literal: "\u8F93\u5165" }, t = { nan: "NaN", number: "\u6570\u5B57", array: "\u6570\u7EC4", null: "\u7A7A\u503C(null)" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${n.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${u}`;
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${v}\uFF0C\u5B9E\u9645\u63A5\u6536 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${U(n.values[0])}`;
        return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${n.origin ?? "\u503C"} ${v}${n.maximum.toString()} ${$.unit ?? "\u4E2A\u5143\u7D20"}`;
        return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${n.origin ?? "\u503C"} ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${n.origin} ${v}${n.minimum.toString()} ${$.unit}`;
        return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${n.origin} ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${v.prefix}" \u5F00\u5934`;
        if (v.format === "ends_with") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${v.suffix}" \u7ED3\u5C3E`;
        if (v.format === "includes") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${v.includes}"`;
        if (v.format === "regex") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${v.pattern}`;
        return `\u65E0\u6548${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${n.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `${n.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${n.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return "\u65E0\u6548\u8F93\u5165";
    }
  };
};
function G$() {
  return { localeError: Q4() };
}
var Y4 = () => {
  let r = { string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" }, file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" }, array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }, set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u8F38\u5165", email: "\u90F5\u4EF6\u5730\u5740", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "ISO \u65E5\u671F\u6642\u9593", date: "ISO \u65E5\u671F", time: "ISO \u6642\u9593", duration: "ISO \u671F\u9593", ipv4: "IPv4 \u4F4D\u5740", ipv6: "IPv6 \u4F4D\u5740", cidrv4: "IPv4 \u7BC4\u570D", cidrv6: "IPv6 \u7BC4\u570D", base64: "base64 \u7DE8\u78BC\u5B57\u4E32", base64url: "base64url \u7DE8\u78BC\u5B57\u4E32", json_string: "JSON \u5B57\u4E32", e164: "E.164 \u6578\u503C", jwt: "JWT", template_literal: "\u8F38\u5165" }, t = { nan: "NaN" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${n.expected}\uFF0C\u4F46\u6536\u5230 ${u}`;
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${v}\uFF0C\u4F46\u6536\u5230 ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${U(n.values[0])}`;
        return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${n.origin ?? "\u503C"} \u61C9\u70BA ${v}${n.maximum.toString()} ${$.unit ?? "\u500B\u5143\u7D20"}`;
        return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${n.origin ?? "\u503C"} \u61C9\u70BA ${v}${n.maximum.toString()}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${n.origin} \u61C9\u70BA ${v}${n.minimum.toString()} ${$.unit}`;
        return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${n.origin} \u61C9\u70BA ${v}${n.minimum.toString()}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${v.prefix}" \u958B\u982D`;
        if (v.format === "ends_with") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${v.suffix}" \u7D50\u5C3E`;
        if (v.format === "includes") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${v.includes}"`;
        if (v.format === "regex") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${v.pattern}`;
        return `\u7121\u6548\u7684 ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${n.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${n.keys.length > 1 ? "\u5011" : ""}\uFF1A${b(n.keys, "\u3001")}`;
      case "invalid_key":
        return `${n.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${n.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
    }
  };
};
function W$() {
  return { localeError: Y4() };
}
var F4 = () => {
  let r = { string: { unit: "\xE0mi", verb: "n\xED" }, file: { unit: "bytes", verb: "n\xED" }, array: { unit: "nkan", verb: "n\xED" }, set: { unit: "nkan", verb: "n\xED" } };
  function i(n) {
    return r[n] ?? null;
  }
  let o = { regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9", email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC", url: "URL", emoji: "emoji", uuid: "UUID", uuidv4: "UUIDv4", uuidv6: "UUIDv6", nanoid: "nanoid", guid: "GUID", cuid: "cuid", cuid2: "cuid2", ulid: "ULID", xid: "XID", ksuid: "KSUID", datetime: "\xE0k\xF3k\xF2 ISO", date: "\u1ECDj\u1ECD\u0301 ISO", time: "\xE0k\xF3k\xF2 ISO", duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO", ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4", ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6", cidrv4: "\xE0gb\xE8gb\xE8 IPv4", cidrv6: "\xE0gb\xE8gb\xE8 IPv6", base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64", base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url", json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON", e164: "n\u1ECD\u0301mb\xE0 E.164", jwt: "JWT", template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9" }, t = { nan: "NaN", number: "n\u1ECD\u0301mb\xE0", array: "akop\u1ECD" };
  return (n) => {
    switch (n.code) {
      case "invalid_type": {
        let v = t[n.expected] ?? n.expected, $ = k(n.input), u = t[$] ?? $;
        if (/^[A-Z]/.test(n.expected)) return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${n.expected}, \xE0m\u1ECD\u0300 a r\xED ${u}`;
        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${v}, \xE0m\u1ECD\u0300 a r\xED ${u}`;
      }
      case "invalid_value":
        if (n.values.length === 1) return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${U(n.values[0])}`;
        return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${b(n.values, "|")}`;
      case "too_big": {
        let v = n.inclusive ? "<=" : "<", $ = i(n.origin);
        if ($) return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${n.origin ?? "iye"} ${$.verb} ${v}${n.maximum} ${$.unit}`;
        return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${v}${n.maximum}`;
      }
      case "too_small": {
        let v = n.inclusive ? ">=" : ">", $ = i(n.origin);
        if ($) return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${n.origin} ${$.verb} ${v}${n.minimum} ${$.unit}`;
        return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${v}${n.minimum}`;
      }
      case "invalid_format": {
        let v = n;
        if (v.format === "starts_with") return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${v.prefix}"`;
        if (v.format === "ends_with") return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${v.suffix}"`;
        if (v.format === "includes") return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${v.includes}"`;
        if (v.format === "regex") return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${v.pattern}`;
        return `A\u1E63\xEC\u1E63e: ${o[v.format] ?? n.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${n.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${b(n.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${n.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${n.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function V$() {
  return { localeError: F4() };
}
var vl;
var X$ = Symbol("ZodOutput");
var E$ = Symbol("ZodInput");
var A$ = class {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(r, ...i) {
    let o = i[0];
    if (this._map.set(r, o), o && typeof o === "object" && "id" in o) this._idmap.set(o.id, r);
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(r) {
    let i = this._map.get(r);
    if (i && typeof i === "object" && "id" in i) this._idmap.delete(i.id);
    return this._map.delete(r), this;
  }
  get(r) {
    let i = r._zod.parent;
    if (i) {
      let o = { ...this.get(i) ?? {} };
      delete o.id;
      let t = { ...o, ...this._map.get(r) };
      return Object.keys(t).length ? t : void 0;
    }
    return this._map.get(r);
  }
  has(r) {
    return this._map.has(r);
  }
};
function ui() {
  return new A$();
}
(vl = globalThis).__zod_globalRegistry ?? (vl.__zod_globalRegistry = ui());
var A = globalThis.__zod_globalRegistry;
function K$(r, i) {
  return new r({ type: "string", ...w(i) });
}
function q$(r, i) {
  return new r({ type: "string", coerce: true, ...w(i) });
}
function gi(r, i) {
  return new r({ type: "string", format: "email", check: "string_format", abort: false, ...w(i) });
}
function zn(r, i) {
  return new r({ type: "string", format: "guid", check: "string_format", abort: false, ...w(i) });
}
function ei(r, i) {
  return new r({ type: "string", format: "uuid", check: "string_format", abort: false, ...w(i) });
}
function li(r, i) {
  return new r({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v4", ...w(i) });
}
function Ii(r, i) {
  return new r({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v6", ...w(i) });
}
function ci(r, i) {
  return new r({ type: "string", format: "uuid", check: "string_format", abort: false, version: "v7", ...w(i) });
}
function Sn(r, i) {
  return new r({ type: "string", format: "url", check: "string_format", abort: false, ...w(i) });
}
function bi(r, i) {
  return new r({ type: "string", format: "emoji", check: "string_format", abort: false, ...w(i) });
}
function _i(r, i) {
  return new r({ type: "string", format: "nanoid", check: "string_format", abort: false, ...w(i) });
}
function Ui(r, i) {
  return new r({ type: "string", format: "cuid", check: "string_format", abort: false, ...w(i) });
}
function ki(r, i) {
  return new r({ type: "string", format: "cuid2", check: "string_format", abort: false, ...w(i) });
}
function Di(r, i) {
  return new r({ type: "string", format: "ulid", check: "string_format", abort: false, ...w(i) });
}
function wi(r, i) {
  return new r({ type: "string", format: "xid", check: "string_format", abort: false, ...w(i) });
}
function Ni(r, i) {
  return new r({ type: "string", format: "ksuid", check: "string_format", abort: false, ...w(i) });
}
function Oi(r, i) {
  return new r({ type: "string", format: "ipv4", check: "string_format", abort: false, ...w(i) });
}
function zi(r, i) {
  return new r({ type: "string", format: "ipv6", check: "string_format", abort: false, ...w(i) });
}
function Q$(r, i) {
  return new r({ type: "string", format: "mac", check: "string_format", abort: false, ...w(i) });
}
function Si(r, i) {
  return new r({ type: "string", format: "cidrv4", check: "string_format", abort: false, ...w(i) });
}
function Pi(r, i) {
  return new r({ type: "string", format: "cidrv6", check: "string_format", abort: false, ...w(i) });
}
function ji(r, i) {
  return new r({ type: "string", format: "base64", check: "string_format", abort: false, ...w(i) });
}
function Ji(r, i) {
  return new r({ type: "string", format: "base64url", check: "string_format", abort: false, ...w(i) });
}
function Li(r, i) {
  return new r({ type: "string", format: "e164", check: "string_format", abort: false, ...w(i) });
}
function Gi(r, i) {
  return new r({ type: "string", format: "jwt", check: "string_format", abort: false, ...w(i) });
}
var Y$ = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
function F$(r, i) {
  return new r({ type: "string", format: "datetime", check: "string_format", offset: false, local: false, precision: null, ...w(i) });
}
function B$(r, i) {
  return new r({ type: "string", format: "date", check: "string_format", ...w(i) });
}
function m$(r, i) {
  return new r({ type: "string", format: "time", check: "string_format", precision: null, ...w(i) });
}
function H$(r, i) {
  return new r({ type: "string", format: "duration", check: "string_format", ...w(i) });
}
function T$(r, i) {
  return new r({ type: "number", checks: [], ...w(i) });
}
function M$(r, i) {
  return new r({ type: "number", coerce: true, checks: [], ...w(i) });
}
function R$(r, i) {
  return new r({ type: "number", check: "number_format", abort: false, format: "safeint", ...w(i) });
}
function x$(r, i) {
  return new r({ type: "number", check: "number_format", abort: false, format: "float32", ...w(i) });
}
function Z$(r, i) {
  return new r({ type: "number", check: "number_format", abort: false, format: "float64", ...w(i) });
}
function d$(r, i) {
  return new r({ type: "number", check: "number_format", abort: false, format: "int32", ...w(i) });
}
function C$(r, i) {
  return new r({ type: "number", check: "number_format", abort: false, format: "uint32", ...w(i) });
}
function f$(r, i) {
  return new r({ type: "boolean", ...w(i) });
}
function y$(r, i) {
  return new r({ type: "boolean", coerce: true, ...w(i) });
}
function h$(r, i) {
  return new r({ type: "bigint", ...w(i) });
}
function a$(r, i) {
  return new r({ type: "bigint", coerce: true, ...w(i) });
}
function p$(r, i) {
  return new r({ type: "bigint", check: "bigint_format", abort: false, format: "int64", ...w(i) });
}
function s$(r, i) {
  return new r({ type: "bigint", check: "bigint_format", abort: false, format: "uint64", ...w(i) });
}
function ru(r, i) {
  return new r({ type: "symbol", ...w(i) });
}
function nu(r, i) {
  return new r({ type: "undefined", ...w(i) });
}
function iu(r, i) {
  return new r({ type: "null", ...w(i) });
}
function vu(r) {
  return new r({ type: "any" });
}
function ou(r) {
  return new r({ type: "unknown" });
}
function tu(r, i) {
  return new r({ type: "never", ...w(i) });
}
function $u(r, i) {
  return new r({ type: "void", ...w(i) });
}
function uu(r, i) {
  return new r({ type: "date", ...w(i) });
}
function gu(r, i) {
  return new r({ type: "date", coerce: true, ...w(i) });
}
function eu(r, i) {
  return new r({ type: "nan", ...w(i) });
}
function y(r, i) {
  return new yn({ check: "less_than", ...w(i), value: r, inclusive: false });
}
function M(r, i) {
  return new yn({ check: "less_than", ...w(i), value: r, inclusive: true });
}
function h(r, i) {
  return new hn({ check: "greater_than", ...w(i), value: r, inclusive: false });
}
function Q(r, i) {
  return new hn({ check: "greater_than", ...w(i), value: r, inclusive: true });
}
function Wi(r) {
  return h(0, r);
}
function Vi(r) {
  return y(0, r);
}
function Xi(r) {
  return M(0, r);
}
function Ei(r) {
  return Q(0, r);
}
function ur(r, i) {
  return new go({ check: "multiple_of", ...w(i), value: r });
}
function gr(r, i) {
  return new Io({ check: "max_size", ...w(i), maximum: r });
}
function a(r, i) {
  return new co({ check: "min_size", ...w(i), minimum: r });
}
function kr(r, i) {
  return new bo({ check: "size_equals", ...w(i), size: r });
}
function Dr(r, i) {
  return new _o({ check: "max_length", ...w(i), maximum: r });
}
function nr(r, i) {
  return new Uo({ check: "min_length", ...w(i), minimum: r });
}
function wr(r, i) {
  return new ko({ check: "length_equals", ...w(i), length: r });
}
function Er(r, i) {
  return new Do({ check: "string_format", format: "regex", ...w(i), pattern: r });
}
function Ar(r) {
  return new wo({ check: "string_format", format: "lowercase", ...w(r) });
}
function Kr(r) {
  return new No({ check: "string_format", format: "uppercase", ...w(r) });
}
function qr(r, i) {
  return new Oo({ check: "string_format", format: "includes", ...w(i), includes: r });
}
function Qr(r, i) {
  return new zo({ check: "string_format", format: "starts_with", ...w(i), prefix: r });
}
function Yr(r, i) {
  return new So({ check: "string_format", format: "ends_with", ...w(i), suffix: r });
}
function Ai(r, i, o) {
  return new Po({ check: "property", property: r, schema: i, ...w(o) });
}
function Fr(r, i) {
  return new jo({ check: "mime_type", mime: r, ...w(i) });
}
function d(r) {
  return new Jo({ check: "overwrite", tx: r });
}
function Br(r) {
  return d((i) => i.normalize(r));
}
function mr() {
  return d((r) => r.trim());
}
function Hr() {
  return d((r) => r.toLowerCase());
}
function Tr() {
  return d((r) => r.toUpperCase());
}
function Mr() {
  return d((r) => Pv(r));
}
function lu(r, i, o) {
  return new r({ type: "array", element: i, ...w(o) });
}
function m4(r, i, o) {
  return new r({ type: "union", options: i, ...w(o) });
}
function H4(r, i, o) {
  return new r({ type: "union", options: i, inclusive: false, ...w(o) });
}
function T4(r, i, o, t) {
  return new r({ type: "union", options: o, discriminator: i, ...w(t) });
}
function M4(r, i, o) {
  return new r({ type: "intersection", left: i, right: o });
}
function R4(r, i, o, t) {
  let n = o instanceof S;
  return new r({ type: "tuple", items: i, rest: n ? o : null, ...w(n ? t : o) });
}
function x4(r, i, o, t) {
  return new r({ type: "record", keyType: i, valueType: o, ...w(t) });
}
function Z4(r, i, o, t) {
  return new r({ type: "map", keyType: i, valueType: o, ...w(t) });
}
function d4(r, i, o) {
  return new r({ type: "set", valueType: i, ...w(o) });
}
function C4(r, i, o) {
  let t = Array.isArray(i) ? Object.fromEntries(i.map((n) => [n, n])) : i;
  return new r({ type: "enum", entries: t, ...w(o) });
}
function f4(r, i, o) {
  return new r({ type: "enum", entries: i, ...w(o) });
}
function y4(r, i, o) {
  return new r({ type: "literal", values: Array.isArray(i) ? i : [i], ...w(o) });
}
function Iu(r, i) {
  return new r({ type: "file", ...w(i) });
}
function h4(r, i) {
  return new r({ type: "transform", transform: i });
}
function a4(r, i) {
  return new r({ type: "optional", innerType: i });
}
function p4(r, i) {
  return new r({ type: "nullable", innerType: i });
}
function s4(r, i, o) {
  return new r({ type: "default", innerType: i, get defaultValue() {
    return typeof o === "function" ? o() : Jv(o);
  } });
}
function r6(r, i, o) {
  return new r({ type: "nonoptional", innerType: i, ...w(o) });
}
function n6(r, i) {
  return new r({ type: "success", innerType: i });
}
function i6(r, i, o) {
  return new r({ type: "catch", innerType: i, catchValue: typeof o === "function" ? o : () => o });
}
function v6(r, i, o) {
  return new r({ type: "pipe", in: i, out: o });
}
function o6(r, i) {
  return new r({ type: "readonly", innerType: i });
}
function t6(r, i, o) {
  return new r({ type: "template_literal", parts: i, ...w(o) });
}
function $6(r, i) {
  return new r({ type: "lazy", getter: i });
}
function u6(r, i) {
  return new r({ type: "promise", innerType: i });
}
function cu(r, i, o) {
  let t = w(o);
  return t.abort ?? (t.abort = true), new r({ type: "custom", check: "custom", fn: i, ...t });
}
function bu(r, i, o) {
  return new r({ type: "custom", check: "custom", fn: i, ...w(o) });
}
function _u(r) {
  let i = ol((o) => {
    return o.addIssue = (t) => {
      if (typeof t === "string") o.issues.push(jr(t, o.value, i._zod.def));
      else {
        let n = t;
        if (n.fatal) n.continue = false;
        n.code ?? (n.code = "custom"), n.input ?? (n.input = o.value), n.inst ?? (n.inst = i), n.continue ?? (n.continue = !i._zod.def.abort), o.issues.push(jr(n));
      }
    }, r(o.value, o);
  });
  return i;
}
function ol(r, i) {
  let o = new V({ check: "custom", ...w(i) });
  return o._zod.check = r, o;
}
function Uu(r) {
  let i = new V({ check: "describe" });
  return i._zod.onattach = [(o) => {
    let t = A.get(o) ?? {};
    A.add(o, { ...t, description: r });
  }], i._zod.check = () => {
  }, i;
}
function ku(r) {
  let i = new V({ check: "meta" });
  return i._zod.onattach = [(o) => {
    let t = A.get(o) ?? {};
    A.add(o, { ...t, ...r });
  }], i._zod.check = () => {
  }, i;
}
function Du(r, i) {
  let o = w(i), t = o.truthy ?? ["true", "1", "yes", "on", "y", "enabled"], n = o.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (o.case !== "sensitive") t = t.map((O) => typeof O === "string" ? O.toLowerCase() : O), n = n.map((O) => typeof O === "string" ? O.toLowerCase() : O);
  let v = new Set(t), $ = new Set(n), u = r.Codec ?? Un, l = r.Boolean ?? bn, c = new (r.String ?? Ur)({ type: "string", error: o.error }), _ = new l({ type: "boolean", error: o.error }), N = new u({ type: "pipe", in: c, out: _, transform: (O, J) => {
    let X = O;
    if (o.case !== "sensitive") X = X.toLowerCase();
    if (v.has(X)) return true;
    else if ($.has(X)) return false;
    else return J.issues.push({ code: "invalid_value", expected: "stringbool", values: [...v, ...$], input: J.value, inst: N, continue: false }), {};
  }, reverseTransform: (O, J) => {
    if (O === true) return t[0] || "true";
    else return n[0] || "false";
  }, error: o.error });
  return N;
}
function Rr(r, i, o, t = {}) {
  let n = w(t), v = { ...w(t), check: "string_format", type: "string", format: i, fn: typeof o === "function" ? o : (u) => o.test(u), ...n };
  if (o instanceof RegExp) v.pattern = o;
  return new r(v);
}
function er(r) {
  let i = r?.target ?? "draft-2020-12";
  if (i === "draft-4") i = "draft-04";
  if (i === "draft-7") i = "draft-07";
  return { processors: r.processors ?? {}, metadataRegistry: r?.metadata ?? A, target: i, unrepresentable: r?.unrepresentable ?? "throw", override: r?.override ?? (() => {
  }), io: r?.io ?? "output", counter: 0, seen: /* @__PURE__ */ new Map(), cycles: r?.cycles ?? "ref", reused: r?.reused ?? "inline", external: r?.external ?? void 0 };
}
function L(r, i, o = { path: [], schemaPath: [] }) {
  var t;
  let n = r._zod.def, v = i.seen.get(r);
  if (v) {
    if (v.count++, o.schemaPath.includes(r)) v.cycle = o.path;
    return v.schema;
  }
  let $ = { schema: {}, count: 1, cycle: void 0, path: o.path };
  i.seen.set(r, $);
  let u = r._zod.toJSONSchema?.();
  if (u) $.schema = u;
  else {
    let c = { ...o, schemaPath: [...o.schemaPath, r], path: o.path };
    if (r._zod.processJSONSchema) r._zod.processJSONSchema(i, $.schema, c);
    else {
      let N = $.schema, O = i.processors[n.type];
      if (!O) throw Error(`[toJSONSchema]: Non-representable type encountered: ${n.type}`);
      O(r, i, N, c);
    }
    let _ = r._zod.parent;
    if (_) {
      if (!$.ref) $.ref = _;
      L(_, i, c), i.seen.get(_).isParent = true;
    }
  }
  let l = i.metadataRegistry.get(r);
  if (l) Object.assign($.schema, l);
  if (i.io === "input" && Y(r)) delete $.schema.examples, delete $.schema.default;
  if (i.io === "input" && $.schema._prefault) (t = $.schema).default ?? (t.default = $.schema._prefault);
  return delete $.schema._prefault, i.seen.get(r).schema;
}
function lr(r, i) {
  let o = r.seen.get(i);
  if (!o) throw Error("Unprocessed schema. This is a bug in Zod.");
  let t = /* @__PURE__ */ new Map();
  for (let $ of r.seen.entries()) {
    let u = r.metadataRegistry.get($[0])?.id;
    if (u) {
      let l = t.get(u);
      if (l && l !== $[0]) throw Error(`Duplicate schema id "${u}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      t.set(u, $[0]);
    }
  }
  let n = ($) => {
    let u = r.target === "draft-2020-12" ? "$defs" : "definitions";
    if (r.external) {
      let _ = r.external.registry.get($[0])?.id, N = r.external.uri ?? ((J) => J);
      if (_) return { ref: N(_) };
      let O = $[1].defId ?? $[1].schema.id ?? `schema${r.counter++}`;
      return $[1].defId = O, { defId: O, ref: `${N("__shared")}#/${u}/${O}` };
    }
    if ($[1] === o) return { ref: "#" };
    let e = `${"#"}/${u}/`, c = $[1].schema.id ?? `__schema${r.counter++}`;
    return { defId: c, ref: e + c };
  }, v = ($) => {
    if ($[1].schema.$ref) return;
    let u = $[1], { ref: l, defId: e } = n($);
    if (u.def = { ...u.schema }, e) u.defId = e;
    let c = u.schema;
    for (let _ in c) delete c[_];
    c.$ref = l;
  };
  if (r.cycles === "throw") for (let $ of r.seen.entries()) {
    let u = $[1];
    if (u.cycle) throw Error(`Cycle detected: #/${u.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
  }
  for (let $ of r.seen.entries()) {
    let u = $[1];
    if (i === $[0]) {
      v($);
      continue;
    }
    if (r.external) {
      let e = r.external.registry.get($[0])?.id;
      if (i !== $[0] && e) {
        v($);
        continue;
      }
    }
    if (r.metadataRegistry.get($[0])?.id) {
      v($);
      continue;
    }
    if (u.cycle) {
      v($);
      continue;
    }
    if (u.count > 1) {
      if (r.reused === "ref") {
        v($);
        continue;
      }
    }
  }
}
function Ir(r, i) {
  let o = r.seen.get(i);
  if (!o) throw Error("Unprocessed schema. This is a bug in Zod.");
  let t = ($) => {
    let u = r.seen.get($);
    if (u.ref === null) return;
    let l = u.def ?? u.schema, e = { ...l }, c = u.ref;
    if (u.ref = null, c) {
      t(c);
      let N = r.seen.get(c), O = N.schema;
      if (O.$ref && (r.target === "draft-07" || r.target === "draft-04" || r.target === "openapi-3.0")) l.allOf = l.allOf ?? [], l.allOf.push(O);
      else Object.assign(l, O);
      if (Object.assign(l, e), $._zod.parent === c) for (let X in l) {
        if (X === "$ref" || X === "allOf") continue;
        if (!(X in e)) delete l[X];
      }
      if (O.$ref) for (let X in l) {
        if (X === "$ref" || X === "allOf") continue;
        if (X in N.def && JSON.stringify(l[X]) === JSON.stringify(N.def[X])) delete l[X];
      }
    }
    let _ = $._zod.parent;
    if (_ && _ !== c) {
      t(_);
      let N = r.seen.get(_);
      if (N?.schema.$ref) {
        if (l.$ref = N.schema.$ref, N.def) for (let O in l) {
          if (O === "$ref" || O === "allOf") continue;
          if (O in N.def && JSON.stringify(l[O]) === JSON.stringify(N.def[O])) delete l[O];
        }
      }
    }
    r.override({ zodSchema: $, jsonSchema: l, path: u.path ?? [] });
  };
  for (let $ of [...r.seen.entries()].reverse()) t($[0]);
  let n = {};
  if (r.target === "draft-2020-12") n.$schema = "https://json-schema.org/draft/2020-12/schema";
  else if (r.target === "draft-07") n.$schema = "http://json-schema.org/draft-07/schema#";
  else if (r.target === "draft-04") n.$schema = "http://json-schema.org/draft-04/schema#";
  else if (r.target === "openapi-3.0") ;
  if (r.external?.uri) {
    let $ = r.external.registry.get(i)?.id;
    if (!$) throw Error("Schema is missing an `id` property");
    n.$id = r.external.uri($);
  }
  Object.assign(n, o.def ?? o.schema);
  let v = r.external?.defs ?? {};
  for (let $ of r.seen.entries()) {
    let u = $[1];
    if (u.def && u.defId) v[u.defId] = u.def;
  }
  if (r.external) ;
  else if (Object.keys(v).length > 0) if (r.target === "draft-2020-12") n.$defs = v;
  else n.definitions = v;
  try {
    let $ = JSON.parse(JSON.stringify(n));
    return Object.defineProperty($, "~standard", { value: { ...i["~standard"], jsonSchema: { input: xr(i, "input", r.processors), output: xr(i, "output", r.processors) } }, enumerable: false, writable: false }), $;
  } catch ($) {
    throw Error("Error converting schema to JSON.");
  }
}
function Y(r, i) {
  let o = i ?? { seen: /* @__PURE__ */ new Set() };
  if (o.seen.has(r)) return false;
  o.seen.add(r);
  let t = r._zod.def;
  if (t.type === "transform") return true;
  if (t.type === "array") return Y(t.element, o);
  if (t.type === "set") return Y(t.valueType, o);
  if (t.type === "lazy") return Y(t.getter(), o);
  if (t.type === "promise" || t.type === "optional" || t.type === "nonoptional" || t.type === "nullable" || t.type === "readonly" || t.type === "default" || t.type === "prefault") return Y(t.innerType, o);
  if (t.type === "intersection") return Y(t.left, o) || Y(t.right, o);
  if (t.type === "record" || t.type === "map") return Y(t.keyType, o) || Y(t.valueType, o);
  if (t.type === "pipe") return Y(t.in, o) || Y(t.out, o);
  if (t.type === "object") {
    for (let n in t.shape) if (Y(t.shape[n], o)) return true;
    return false;
  }
  if (t.type === "union") {
    for (let n of t.options) if (Y(n, o)) return true;
    return false;
  }
  if (t.type === "tuple") {
    for (let n of t.items) if (Y(n, o)) return true;
    if (t.rest && Y(t.rest, o)) return true;
    return false;
  }
  return false;
}
var wu = (r, i = {}) => (o) => {
  let t = er({ ...o, processors: i });
  return L(r, t), lr(t, r), Ir(t, r);
};
var xr = (r, i, o = {}) => (t) => {
  let { libraryOptions: n, target: v } = t ?? {}, $ = er({ ...n ?? {}, target: v, io: i, processors: o });
  return L(r, $), lr($, r), Ir($, r);
};
var g6 = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" };
var Nu = (r, i, o, t) => {
  let n = o;
  n.type = "string";
  let { minimum: v, maximum: $, format: u, patterns: l, contentEncoding: e } = r._zod.bag;
  if (typeof v === "number") n.minLength = v;
  if (typeof $ === "number") n.maxLength = $;
  if (u) {
    if (n.format = g6[u] ?? u, n.format === "") delete n.format;
    if (u === "time") delete n.format;
  }
  if (e) n.contentEncoding = e;
  if (l && l.size > 0) {
    let c = [...l];
    if (c.length === 1) n.pattern = c[0].source;
    else if (c.length > 1) n.allOf = [...c.map((_) => ({ ...i.target === "draft-07" || i.target === "draft-04" || i.target === "openapi-3.0" ? { type: "string" } : {}, pattern: _.source }))];
  }
};
var Ou = (r, i, o, t) => {
  let n = o, { minimum: v, maximum: $, format: u, multipleOf: l, exclusiveMaximum: e, exclusiveMinimum: c } = r._zod.bag;
  if (typeof u === "string" && u.includes("int")) n.type = "integer";
  else n.type = "number";
  if (typeof c === "number") if (i.target === "draft-04" || i.target === "openapi-3.0") n.minimum = c, n.exclusiveMinimum = true;
  else n.exclusiveMinimum = c;
  if (typeof v === "number") {
    if (n.minimum = v, typeof c === "number" && i.target !== "draft-04") if (c >= v) delete n.minimum;
    else delete n.exclusiveMinimum;
  }
  if (typeof e === "number") if (i.target === "draft-04" || i.target === "openapi-3.0") n.maximum = e, n.exclusiveMaximum = true;
  else n.exclusiveMaximum = e;
  if (typeof $ === "number") {
    if (n.maximum = $, typeof e === "number" && i.target !== "draft-04") if (e <= $) delete n.maximum;
    else delete n.exclusiveMaximum;
  }
  if (typeof l === "number") n.multipleOf = l;
};
var zu = (r, i, o, t) => {
  o.type = "boolean";
};
var Su = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("BigInt cannot be represented in JSON Schema");
};
var Pu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Symbols cannot be represented in JSON Schema");
};
var ju = (r, i, o, t) => {
  if (i.target === "openapi-3.0") o.type = "string", o.nullable = true, o.enum = [null];
  else o.type = "null";
};
var Ju = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Undefined cannot be represented in JSON Schema");
};
var Lu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Void cannot be represented in JSON Schema");
};
var Gu = (r, i, o, t) => {
  o.not = {};
};
var Wu = (r, i, o, t) => {
};
var Vu = (r, i, o, t) => {
};
var Xu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Date cannot be represented in JSON Schema");
};
var Eu = (r, i, o, t) => {
  let n = r._zod.def, v = nn(n.entries);
  if (v.every(($) => typeof $ === "number")) o.type = "number";
  if (v.every(($) => typeof $ === "string")) o.type = "string";
  o.enum = v;
};
var Au = (r, i, o, t) => {
  let n = r._zod.def, v = [];
  for (let $ of n.values) if ($ === void 0) {
    if (i.unrepresentable === "throw") throw Error("Literal `undefined` cannot be represented in JSON Schema");
  } else if (typeof $ === "bigint") if (i.unrepresentable === "throw") throw Error("BigInt literals cannot be represented in JSON Schema");
  else v.push(Number($));
  else v.push($);
  if (v.length === 0) ;
  else if (v.length === 1) {
    let $ = v[0];
    if (o.type = $ === null ? "null" : typeof $, i.target === "draft-04" || i.target === "openapi-3.0") o.enum = [$];
    else o.const = $;
  } else {
    if (v.every(($) => typeof $ === "number")) o.type = "number";
    if (v.every(($) => typeof $ === "string")) o.type = "string";
    if (v.every(($) => typeof $ === "boolean")) o.type = "boolean";
    if (v.every(($) => $ === null)) o.type = "null";
    o.enum = v;
  }
};
var Ku = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("NaN cannot be represented in JSON Schema");
};
var qu = (r, i, o, t) => {
  let n = o, v = r._zod.pattern;
  if (!v) throw Error("Pattern not found in template literal");
  n.type = "string", n.pattern = v.source;
};
var Qu = (r, i, o, t) => {
  let n = o, v = { type: "string", format: "binary", contentEncoding: "binary" }, { minimum: $, maximum: u, mime: l } = r._zod.bag;
  if ($ !== void 0) v.minLength = $;
  if (u !== void 0) v.maxLength = u;
  if (l) if (l.length === 1) v.contentMediaType = l[0], Object.assign(n, v);
  else Object.assign(n, v), n.anyOf = l.map((e) => ({ contentMediaType: e }));
  else Object.assign(n, v);
};
var Yu = (r, i, o, t) => {
  o.type = "boolean";
};
var Fu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
};
var Bu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Function types cannot be represented in JSON Schema");
};
var mu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
};
var Hu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Map cannot be represented in JSON Schema");
};
var Tu = (r, i, o, t) => {
  if (i.unrepresentable === "throw") throw Error("Set cannot be represented in JSON Schema");
};
var Mu = (r, i, o, t) => {
  let n = o, v = r._zod.def, { minimum: $, maximum: u } = r._zod.bag;
  if (typeof $ === "number") n.minItems = $;
  if (typeof u === "number") n.maxItems = u;
  n.type = "array", n.items = L(v.element, i, { ...t, path: [...t.path, "items"] });
};
var Ru = (r, i, o, t) => {
  let n = o, v = r._zod.def;
  n.type = "object", n.properties = {};
  let $ = v.shape;
  for (let e in $) n.properties[e] = L($[e], i, { ...t, path: [...t.path, "properties", e] });
  let u = new Set(Object.keys($)), l = new Set([...u].filter((e) => {
    let c = v.shape[e]._zod;
    if (i.io === "input") return c.optin === void 0;
    else return c.optout === void 0;
  }));
  if (l.size > 0) n.required = Array.from(l);
  if (v.catchall?._zod.def.type === "never") n.additionalProperties = false;
  else if (!v.catchall) {
    if (i.io === "output") n.additionalProperties = false;
  } else if (v.catchall) n.additionalProperties = L(v.catchall, i, { ...t, path: [...t.path, "additionalProperties"] });
};
var qi = (r, i, o, t) => {
  let n = r._zod.def, v = n.inclusive === false, $ = n.options.map((u, l) => L(u, i, { ...t, path: [...t.path, v ? "oneOf" : "anyOf", l] }));
  if (v) o.oneOf = $;
  else o.anyOf = $;
};
var xu = (r, i, o, t) => {
  let n = r._zod.def, v = L(n.left, i, { ...t, path: [...t.path, "allOf", 0] }), $ = L(n.right, i, { ...t, path: [...t.path, "allOf", 1] }), u = (e) => "allOf" in e && Object.keys(e).length === 1, l = [...u(v) ? v.allOf : [v], ...u($) ? $.allOf : [$]];
  o.allOf = l;
};
var Zu = (r, i, o, t) => {
  let n = o, v = r._zod.def;
  n.type = "array";
  let $ = i.target === "draft-2020-12" ? "prefixItems" : "items", u = i.target === "draft-2020-12" ? "items" : i.target === "openapi-3.0" ? "items" : "additionalItems", l = v.items.map((N, O) => L(N, i, { ...t, path: [...t.path, $, O] })), e = v.rest ? L(v.rest, i, { ...t, path: [...t.path, u, ...i.target === "openapi-3.0" ? [v.items.length] : []] }) : null;
  if (i.target === "draft-2020-12") {
    if (n.prefixItems = l, e) n.items = e;
  } else if (i.target === "openapi-3.0") {
    if (n.items = { anyOf: l }, e) n.items.anyOf.push(e);
    if (n.minItems = l.length, !e) n.maxItems = l.length;
  } else if (n.items = l, e) n.additionalItems = e;
  let { minimum: c, maximum: _ } = r._zod.bag;
  if (typeof c === "number") n.minItems = c;
  if (typeof _ === "number") n.maxItems = _;
};
var du = (r, i, o, t) => {
  let n = o, v = r._zod.def;
  n.type = "object";
  let $ = v.keyType, l = $._zod.bag?.patterns;
  if (v.mode === "loose" && l && l.size > 0) {
    let c = L(v.valueType, i, { ...t, path: [...t.path, "patternProperties", "*"] });
    n.patternProperties = {};
    for (let _ of l) n.patternProperties[_.source] = c;
  } else {
    if (i.target === "draft-07" || i.target === "draft-2020-12") n.propertyNames = L(v.keyType, i, { ...t, path: [...t.path, "propertyNames"] });
    n.additionalProperties = L(v.valueType, i, { ...t, path: [...t.path, "additionalProperties"] });
  }
  let e = $._zod.values;
  if (e) {
    let c = [...e].filter((_) => typeof _ === "string" || typeof _ === "number");
    if (c.length > 0) n.required = c;
  }
};
var Cu = (r, i, o, t) => {
  let n = r._zod.def, v = L(n.innerType, i, t), $ = i.seen.get(r);
  if (i.target === "openapi-3.0") $.ref = n.innerType, o.nullable = true;
  else o.anyOf = [v, { type: "null" }];
};
var fu = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  v.ref = n.innerType;
};
var yu = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  v.ref = n.innerType, o.default = JSON.parse(JSON.stringify(n.defaultValue));
};
var hu = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  if (v.ref = n.innerType, i.io === "input") o._prefault = JSON.parse(JSON.stringify(n.defaultValue));
};
var au = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  v.ref = n.innerType;
  let $;
  try {
    $ = n.catchValue(void 0);
  } catch {
    throw Error("Dynamic catch values are not supported in JSON Schema");
  }
  o.default = $;
};
var pu = (r, i, o, t) => {
  let n = r._zod.def, v = i.io === "input" ? n.in._zod.def.type === "transform" ? n.out : n.in : n.out;
  L(v, i, t);
  let $ = i.seen.get(r);
  $.ref = v;
};
var su = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  v.ref = n.innerType, o.readOnly = true;
};
var rg = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  v.ref = n.innerType;
};
var Qi = (r, i, o, t) => {
  let n = r._zod.def;
  L(n.innerType, i, t);
  let v = i.seen.get(r);
  v.ref = n.innerType;
};
var ng = (r, i, o, t) => {
  let n = r._zod.innerType;
  L(n, i, t);
  let v = i.seen.get(r);
  v.ref = n;
};
var Ki = { string: Nu, number: Ou, boolean: zu, bigint: Su, symbol: Pu, null: ju, undefined: Ju, void: Lu, never: Gu, any: Wu, unknown: Vu, date: Xu, enum: Eu, literal: Au, nan: Ku, template_literal: qu, file: Qu, success: Yu, custom: Fu, function: Bu, transform: mu, map: Hu, set: Tu, array: Mu, object: Ru, union: qi, intersection: xu, tuple: Zu, record: du, nullable: Cu, nonoptional: fu, default: yu, prefault: hu, catch: au, pipe: pu, readonly: su, promise: rg, optional: Qi, lazy: ng };
function Yi(r, i) {
  if ("_idmap" in r) {
    let t = r, n = er({ ...i, processors: Ki }), v = {};
    for (let l of t._idmap.entries()) {
      let [e, c] = l;
      L(c, n);
    }
    let $ = {}, u = { registry: t, uri: i?.uri, defs: v };
    n.external = u;
    for (let l of t._idmap.entries()) {
      let [e, c] = l;
      lr(n, c), $[e] = Ir(n, c);
    }
    if (Object.keys(v).length > 0) {
      let l = n.target === "draft-2020-12" ? "$defs" : "definitions";
      $.__shared = { [l]: v };
    }
    return { schemas: $ };
  }
  let o = er({ ...i, processors: Ki });
  return L(r, o), lr(o, r), Ir(o, r);
}
var ig = class {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(r) {
    this.ctx.counter = r;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(r) {
    let i = r?.target ?? "draft-2020-12";
    if (i === "draft-4") i = "draft-04";
    if (i === "draft-7") i = "draft-07";
    this.ctx = er({ processors: Ki, target: i, ...r?.metadata && { metadata: r.metadata }, ...r?.unrepresentable && { unrepresentable: r.unrepresentable }, ...r?.override && { override: r.override }, ...r?.io && { io: r.io } });
  }
  process(r, i = { path: [], schemaPath: [] }) {
    return L(r, this.ctx, i);
  }
  emit(r, i) {
    if (i) {
      if (i.cycles) this.ctx.cycles = i.cycles;
      if (i.reused) this.ctx.reused = i.reused;
      if (i.external) this.ctx.external = i.external;
    }
    lr(this.ctx, r);
    let o = Ir(this.ctx, r), { "~standard": t, ...n } = o;
    return n;
  }
};
var tl = {};
var Pn = {};
s(Pn, { xor: () => al, xid: () => Ol, void: () => Zl, uuidv7: () => cl, uuidv6: () => Il, uuidv4: () => ll, uuid: () => el, url: () => bl, unknown: () => Nr, union: () => ev, undefined: () => Rl, ulid: () => Nl, uint64: () => Tl, uint32: () => Bl, tuple: () => Yg, transform: () => Iv, templateLiteral: () => lI, symbol: () => Ml, superRefine: () => ee, success: () => uI, stringbool: () => wI, stringFormat: () => El, string: () => Mi, strictObject: () => yl, set: () => iI, refine: () => ge, record: () => Fg, readonly: () => ie, promise: () => II, preprocess: () => OI, prefault: () => yg, pipe: () => Gn, partialRecord: () => sl, optional: () => Jn, object: () => fl, number: () => Og, nullish: () => $I, nullable: () => Ln, null: () => Jg, nonoptional: () => hg, never: () => gv, nativeEnum: () => vI, nanoid: () => kl, nan: () => gI, meta: () => kI, map: () => nI, mac: () => Pl, looseRecord: () => rI, looseObject: () => hl, literal: () => oI, lazy: () => te, ksuid: () => zl, keyof: () => Cl, jwt: () => Xl, json: () => NI, ipv6: () => jl, ipv4: () => Sl, intersection: () => qg, int64: () => Hl, int32: () => Fl, int: () => Ri, instanceof: () => DI, httpUrl: () => _l, hostname: () => Al, hex: () => Kl, hash: () => ql, guid: () => gl, function: () => cI, float64: () => Yl, float32: () => Ql, file: () => tI, exactOptional: () => xg, enum: () => lv, emoji: () => Ul, email: () => ul, e164: () => Vl, discriminatedUnion: () => pl, describe: () => UI, date: () => dl, custom: () => _I, cuid2: () => wl, cuid: () => Dl, codec: () => eI, cidrv6: () => Ll, cidrv4: () => Jl, check: () => bI, catch: () => sg, boolean: () => zg, bigint: () => ml, base64url: () => Wl, base64: () => Gl, array: () => Xn, any: () => xl, _function: () => cI, _default: () => Cg, _ZodString: () => xi, ZodXor: () => Eg, ZodXID: () => ai, ZodVoid: () => Vg, ZodUnknown: () => Gg, ZodUnion: () => An, ZodUndefined: () => Pg, ZodUUID: () => p, ZodURL: () => Wn, ZodULID: () => hi, ZodType: () => P, ZodTuple: () => Qg, ZodTransform: () => Mg, ZodTemplateLiteral: () => ve, ZodSymbol: () => Sg, ZodSuccess: () => ag, ZodStringFormat: () => W, ZodString: () => Cr, ZodSet: () => mg, ZodRecord: () => Kn, ZodReadonly: () => ne, ZodPromise: () => $e, ZodPrefault: () => fg, ZodPipe: () => _v, ZodOptional: () => cv, ZodObject: () => En, ZodNumberFormat: () => Or, ZodNumber: () => yr, ZodNullable: () => Zg, ZodNull: () => jg, ZodNonOptional: () => bv, ZodNever: () => Wg, ZodNanoID: () => Ci, ZodNaN: () => re, ZodMap: () => Bg, ZodMAC: () => Ng, ZodLiteral: () => Hg, ZodLazy: () => oe, ZodKSUID: () => pi, ZodJWT: () => $v, ZodIntersection: () => Kg, ZodIPv6: () => rv, ZodIPv4: () => si, ZodGUID: () => jn, ZodFunction: () => ue, ZodFile: () => Tg, ZodExactOptional: () => Rg, ZodEnum: () => dr, ZodEmoji: () => di, ZodEmail: () => Zi, ZodE164: () => tv, ZodDiscriminatedUnion: () => Ag, ZodDefault: () => dg, ZodDate: () => Vn, ZodCustomStringFormat: () => fr, ZodCustom: () => qn, ZodCodec: () => Uv, ZodCatch: () => pg, ZodCUID2: () => yi, ZodCUID: () => fi, ZodCIDRv6: () => iv, ZodCIDRv4: () => nv, ZodBoolean: () => hr, ZodBigIntFormat: () => uv, ZodBigInt: () => ar, ZodBase64URL: () => ov, ZodBase64: () => vv, ZodArray: () => Xg, ZodAny: () => Lg });
var Fi = {};
s(Fi, { uppercase: () => Kr, trim: () => mr, toUpperCase: () => Tr, toLowerCase: () => Hr, startsWith: () => Qr, slugify: () => Mr, size: () => kr, regex: () => Er, property: () => Ai, positive: () => Wi, overwrite: () => d, normalize: () => Br, nonpositive: () => Xi, nonnegative: () => Ei, negative: () => Vi, multipleOf: () => ur, minSize: () => a, minLength: () => nr, mime: () => Fr, maxSize: () => gr, maxLength: () => Dr, lte: () => M, lt: () => y, lowercase: () => Ar, length: () => wr, includes: () => qr, gte: () => Q, gt: () => h, endsWith: () => Yr });
var Zr = {};
s(Zr, { time: () => tg, duration: () => $g, datetime: () => vg, date: () => og, ZodISOTime: () => Hi, ZodISODuration: () => Ti, ZodISODateTime: () => Bi, ZodISODate: () => mi });
var Bi = I("ZodISODateTime", (r, i) => {
  mo.init(r, i), W.init(r, i);
});
function vg(r) {
  return F$(Bi, r);
}
var mi = I("ZodISODate", (r, i) => {
  Ho.init(r, i), W.init(r, i);
});
function og(r) {
  return B$(mi, r);
}
var Hi = I("ZodISOTime", (r, i) => {
  To.init(r, i), W.init(r, i);
});
function tg(r) {
  return m$(Hi, r);
}
var Ti = I("ZodISODuration", (r, i) => {
  Mo.init(r, i), W.init(r, i);
});
function $g(r) {
  return H$(Ti, r);
}
var $l = (r, i) => {
  un.init(r, i), r.name = "ZodError", Object.defineProperties(r, { format: { value: (o) => en(r, o) }, flatten: { value: (o) => gn(r, o) }, addIssue: { value: (o) => {
    r.issues.push(o), r.message = JSON.stringify(r.issues, Sr, 2);
  } }, addIssues: { value: (o) => {
    r.issues.push(...o), r.message = JSON.stringify(r.issues, Sr, 2);
  } }, isEmpty: { get() {
    return r.issues.length === 0;
  } } });
};
var l6 = I("ZodError", $l);
var H = I("ZodError", $l, { Parent: Error });
var ug = Jr(H);
var gg = Lr(H);
var eg = Gr(H);
var lg = Wr(H);
var Ig = Hn(H);
var cg = Tn(H);
var bg = Mn(H);
var _g = Rn(H);
var Ug = xn(H);
var kg = Zn(H);
var Dg = dn(H);
var wg = Cn(H);
var P = I("ZodType", (r, i) => {
  return S.init(r, i), Object.assign(r["~standard"], { jsonSchema: { input: xr(r, "input"), output: xr(r, "output") } }), r.toJSONSchema = wu(r, {}), r.def = i, r.type = i.type, Object.defineProperty(r, "_def", { value: i }), r.check = (...o) => {
    return r.clone(D.mergeDefs(i, { checks: [...i.checks ?? [], ...o.map((t) => typeof t === "function" ? { _zod: { check: t, def: { check: "custom" }, onattach: [] } } : t)] }), { parent: true });
  }, r.with = r.check, r.clone = (o, t) => q(r, o, t), r.brand = () => r, r.register = (o, t) => {
    return o.add(r, t), r;
  }, r.parse = (o, t) => ug(r, o, t, { callee: r.parse }), r.safeParse = (o, t) => eg(r, o, t), r.parseAsync = async (o, t) => gg(r, o, t, { callee: r.parseAsync }), r.safeParseAsync = async (o, t) => lg(r, o, t), r.spa = r.safeParseAsync, r.encode = (o, t) => Ig(r, o, t), r.decode = (o, t) => cg(r, o, t), r.encodeAsync = async (o, t) => bg(r, o, t), r.decodeAsync = async (o, t) => _g(r, o, t), r.safeEncode = (o, t) => Ug(r, o, t), r.safeDecode = (o, t) => kg(r, o, t), r.safeEncodeAsync = async (o, t) => Dg(r, o, t), r.safeDecodeAsync = async (o, t) => wg(r, o, t), r.refine = (o, t) => r.check(ge(o, t)), r.superRefine = (o) => r.check(ee(o)), r.overwrite = (o) => r.check(d(o)), r.optional = () => Jn(r), r.exactOptional = () => xg(r), r.nullable = () => Ln(r), r.nullish = () => Jn(Ln(r)), r.nonoptional = (o) => hg(r, o), r.array = () => Xn(r), r.or = (o) => ev([r, o]), r.and = (o) => qg(r, o), r.transform = (o) => Gn(r, Iv(o)), r.default = (o) => Cg(r, o), r.prefault = (o) => yg(r, o), r.catch = (o) => sg(r, o), r.pipe = (o) => Gn(r, o), r.readonly = () => ie(r), r.describe = (o) => {
    let t = r.clone();
    return A.add(t, { description: o }), t;
  }, Object.defineProperty(r, "description", { get() {
    return A.get(r)?.description;
  }, configurable: true }), r.meta = (...o) => {
    if (o.length === 0) return A.get(r);
    let t = r.clone();
    return A.add(t, o[0]), t;
  }, r.isOptional = () => r.safeParse(void 0).success, r.isNullable = () => r.safeParse(null).success, r.apply = (o) => o(r), r;
});
var xi = I("_ZodString", (r, i) => {
  Ur.init(r, i), P.init(r, i), r._zod.processJSONSchema = (t, n, v) => Nu(r, t, n, v);
  let o = r._zod.bag;
  r.format = o.format ?? null, r.minLength = o.minimum ?? null, r.maxLength = o.maximum ?? null, r.regex = (...t) => r.check(Er(...t)), r.includes = (...t) => r.check(qr(...t)), r.startsWith = (...t) => r.check(Qr(...t)), r.endsWith = (...t) => r.check(Yr(...t)), r.min = (...t) => r.check(nr(...t)), r.max = (...t) => r.check(Dr(...t)), r.length = (...t) => r.check(wr(...t)), r.nonempty = (...t) => r.check(nr(1, ...t)), r.lowercase = (t) => r.check(Ar(t)), r.uppercase = (t) => r.check(Kr(t)), r.trim = () => r.check(mr()), r.normalize = (...t) => r.check(Br(...t)), r.toLowerCase = () => r.check(Hr()), r.toUpperCase = () => r.check(Tr()), r.slugify = () => r.check(Mr());
});
var Cr = I("ZodString", (r, i) => {
  Ur.init(r, i), xi.init(r, i), r.email = (o) => r.check(gi(Zi, o)), r.url = (o) => r.check(Sn(Wn, o)), r.jwt = (o) => r.check(Gi($v, o)), r.emoji = (o) => r.check(bi(di, o)), r.guid = (o) => r.check(zn(jn, o)), r.uuid = (o) => r.check(ei(p, o)), r.uuidv4 = (o) => r.check(li(p, o)), r.uuidv6 = (o) => r.check(Ii(p, o)), r.uuidv7 = (o) => r.check(ci(p, o)), r.nanoid = (o) => r.check(_i(Ci, o)), r.guid = (o) => r.check(zn(jn, o)), r.cuid = (o) => r.check(Ui(fi, o)), r.cuid2 = (o) => r.check(ki(yi, o)), r.ulid = (o) => r.check(Di(hi, o)), r.base64 = (o) => r.check(ji(vv, o)), r.base64url = (o) => r.check(Ji(ov, o)), r.xid = (o) => r.check(wi(ai, o)), r.ksuid = (o) => r.check(Ni(pi, o)), r.ipv4 = (o) => r.check(Oi(si, o)), r.ipv6 = (o) => r.check(zi(rv, o)), r.cidrv4 = (o) => r.check(Si(nv, o)), r.cidrv6 = (o) => r.check(Pi(iv, o)), r.e164 = (o) => r.check(Li(tv, o)), r.datetime = (o) => r.check(vg(o)), r.date = (o) => r.check(og(o)), r.time = (o) => r.check(tg(o)), r.duration = (o) => r.check($g(o));
});
function Mi(r) {
  return K$(Cr, r);
}
var W = I("ZodStringFormat", (r, i) => {
  G.init(r, i), xi.init(r, i);
});
var Zi = I("ZodEmail", (r, i) => {
  Xo.init(r, i), W.init(r, i);
});
function ul(r) {
  return gi(Zi, r);
}
var jn = I("ZodGUID", (r, i) => {
  Wo.init(r, i), W.init(r, i);
});
function gl(r) {
  return zn(jn, r);
}
var p = I("ZodUUID", (r, i) => {
  Vo.init(r, i), W.init(r, i);
});
function el(r) {
  return ei(p, r);
}
function ll(r) {
  return li(p, r);
}
function Il(r) {
  return Ii(p, r);
}
function cl(r) {
  return ci(p, r);
}
var Wn = I("ZodURL", (r, i) => {
  Eo.init(r, i), W.init(r, i);
});
function bl(r) {
  return Sn(Wn, r);
}
function _l(r) {
  return Sn(Wn, { protocol: /^https?$/, hostname: x.domain, ...D.normalizeParams(r) });
}
var di = I("ZodEmoji", (r, i) => {
  Ao.init(r, i), W.init(r, i);
});
function Ul(r) {
  return bi(di, r);
}
var Ci = I("ZodNanoID", (r, i) => {
  Ko.init(r, i), W.init(r, i);
});
function kl(r) {
  return _i(Ci, r);
}
var fi = I("ZodCUID", (r, i) => {
  qo.init(r, i), W.init(r, i);
});
function Dl(r) {
  return Ui(fi, r);
}
var yi = I("ZodCUID2", (r, i) => {
  Qo.init(r, i), W.init(r, i);
});
function wl(r) {
  return ki(yi, r);
}
var hi = I("ZodULID", (r, i) => {
  Yo.init(r, i), W.init(r, i);
});
function Nl(r) {
  return Di(hi, r);
}
var ai = I("ZodXID", (r, i) => {
  Fo.init(r, i), W.init(r, i);
});
function Ol(r) {
  return wi(ai, r);
}
var pi = I("ZodKSUID", (r, i) => {
  Bo.init(r, i), W.init(r, i);
});
function zl(r) {
  return Ni(pi, r);
}
var si = I("ZodIPv4", (r, i) => {
  Ro.init(r, i), W.init(r, i);
});
function Sl(r) {
  return Oi(si, r);
}
var Ng = I("ZodMAC", (r, i) => {
  Zo.init(r, i), W.init(r, i);
});
function Pl(r) {
  return Q$(Ng, r);
}
var rv = I("ZodIPv6", (r, i) => {
  xo.init(r, i), W.init(r, i);
});
function jl(r) {
  return zi(rv, r);
}
var nv = I("ZodCIDRv4", (r, i) => {
  Co.init(r, i), W.init(r, i);
});
function Jl(r) {
  return Si(nv, r);
}
var iv = I("ZodCIDRv6", (r, i) => {
  fo.init(r, i), W.init(r, i);
});
function Ll(r) {
  return Pi(iv, r);
}
var vv = I("ZodBase64", (r, i) => {
  ho.init(r, i), W.init(r, i);
});
function Gl(r) {
  return ji(vv, r);
}
var ov = I("ZodBase64URL", (r, i) => {
  ao.init(r, i), W.init(r, i);
});
function Wl(r) {
  return Ji(ov, r);
}
var tv = I("ZodE164", (r, i) => {
  po.init(r, i), W.init(r, i);
});
function Vl(r) {
  return Li(tv, r);
}
var $v = I("ZodJWT", (r, i) => {
  so.init(r, i), W.init(r, i);
});
function Xl(r) {
  return Gi($v, r);
}
var fr = I("ZodCustomStringFormat", (r, i) => {
  rt.init(r, i), W.init(r, i);
});
function El(r, i, o = {}) {
  return Rr(fr, r, i, o);
}
function Al(r) {
  return Rr(fr, "hostname", x.hostname, r);
}
function Kl(r) {
  return Rr(fr, "hex", x.hex, r);
}
function ql(r, i) {
  let o = i?.enc ?? "hex", t = `${r}_${o}`, n = x[t];
  if (!n) throw Error(`Unrecognized hash format: ${t}`);
  return Rr(fr, t, n, i);
}
var yr = I("ZodNumber", (r, i) => {
  vi.init(r, i), P.init(r, i), r._zod.processJSONSchema = (t, n, v) => Ou(r, t, n, v), r.gt = (t, n) => r.check(h(t, n)), r.gte = (t, n) => r.check(Q(t, n)), r.min = (t, n) => r.check(Q(t, n)), r.lt = (t, n) => r.check(y(t, n)), r.lte = (t, n) => r.check(M(t, n)), r.max = (t, n) => r.check(M(t, n)), r.int = (t) => r.check(Ri(t)), r.safe = (t) => r.check(Ri(t)), r.positive = (t) => r.check(h(0, t)), r.nonnegative = (t) => r.check(Q(0, t)), r.negative = (t) => r.check(y(0, t)), r.nonpositive = (t) => r.check(M(0, t)), r.multipleOf = (t, n) => r.check(ur(t, n)), r.step = (t, n) => r.check(ur(t, n)), r.finite = () => r;
  let o = r._zod.bag;
  r.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, r.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, r.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), r.isFinite = true, r.format = o.format ?? null;
});
function Og(r) {
  return T$(yr, r);
}
var Or = I("ZodNumberFormat", (r, i) => {
  nt.init(r, i), yr.init(r, i);
});
function Ri(r) {
  return R$(Or, r);
}
function Ql(r) {
  return x$(Or, r);
}
function Yl(r) {
  return Z$(Or, r);
}
function Fl(r) {
  return d$(Or, r);
}
function Bl(r) {
  return C$(Or, r);
}
var hr = I("ZodBoolean", (r, i) => {
  bn.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => zu(r, o, t, n);
});
function zg(r) {
  return f$(hr, r);
}
var ar = I("ZodBigInt", (r, i) => {
  oi.init(r, i), P.init(r, i), r._zod.processJSONSchema = (t, n, v) => Su(r, t, n, v), r.gte = (t, n) => r.check(Q(t, n)), r.min = (t, n) => r.check(Q(t, n)), r.gt = (t, n) => r.check(h(t, n)), r.gte = (t, n) => r.check(Q(t, n)), r.min = (t, n) => r.check(Q(t, n)), r.lt = (t, n) => r.check(y(t, n)), r.lte = (t, n) => r.check(M(t, n)), r.max = (t, n) => r.check(M(t, n)), r.positive = (t) => r.check(h(BigInt(0), t)), r.negative = (t) => r.check(y(BigInt(0), t)), r.nonpositive = (t) => r.check(M(BigInt(0), t)), r.nonnegative = (t) => r.check(Q(BigInt(0), t)), r.multipleOf = (t, n) => r.check(ur(t, n));
  let o = r._zod.bag;
  r.minValue = o.minimum ?? null, r.maxValue = o.maximum ?? null, r.format = o.format ?? null;
});
function ml(r) {
  return h$(ar, r);
}
var uv = I("ZodBigIntFormat", (r, i) => {
  it.init(r, i), ar.init(r, i);
});
function Hl(r) {
  return p$(uv, r);
}
function Tl(r) {
  return s$(uv, r);
}
var Sg = I("ZodSymbol", (r, i) => {
  vt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Pu(r, o, t, n);
});
function Ml(r) {
  return ru(Sg, r);
}
var Pg = I("ZodUndefined", (r, i) => {
  ot.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Ju(r, o, t, n);
});
function Rl(r) {
  return nu(Pg, r);
}
var jg = I("ZodNull", (r, i) => {
  tt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => ju(r, o, t, n);
});
function Jg(r) {
  return iu(jg, r);
}
var Lg = I("ZodAny", (r, i) => {
  $t.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Wu(r, o, t, n);
});
function xl() {
  return vu(Lg);
}
var Gg = I("ZodUnknown", (r, i) => {
  ut.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Vu(r, o, t, n);
});
function Nr() {
  return ou(Gg);
}
var Wg = I("ZodNever", (r, i) => {
  gt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Gu(r, o, t, n);
});
function gv(r) {
  return tu(Wg, r);
}
var Vg = I("ZodVoid", (r, i) => {
  et.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Lu(r, o, t, n);
});
function Zl(r) {
  return $u(Vg, r);
}
var Vn = I("ZodDate", (r, i) => {
  lt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (t, n, v) => Xu(r, t, n, v), r.min = (t, n) => r.check(Q(t, n)), r.max = (t, n) => r.check(M(t, n));
  let o = r._zod.bag;
  r.minDate = o.minimum ? new Date(o.minimum) : null, r.maxDate = o.maximum ? new Date(o.maximum) : null;
});
function dl(r) {
  return uu(Vn, r);
}
var Xg = I("ZodArray", (r, i) => {
  It.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Mu(r, o, t, n), r.element = i.element, r.min = (o, t) => r.check(nr(o, t)), r.nonempty = (o) => r.check(nr(1, o)), r.max = (o, t) => r.check(Dr(o, t)), r.length = (o, t) => r.check(wr(o, t)), r.unwrap = () => r.element;
});
function Xn(r, i) {
  return lu(Xg, r, i);
}
function Cl(r) {
  let i = r._zod.def.shape;
  return lv(Object.keys(i));
}
var En = I("ZodObject", (r, i) => {
  ct.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Ru(r, o, t, n), D.defineLazy(r, "shape", () => {
    return i.shape;
  }), r.keyof = () => lv(Object.keys(r._zod.def.shape)), r.catchall = (o) => r.clone({ ...r._zod.def, catchall: o }), r.passthrough = () => r.clone({ ...r._zod.def, catchall: Nr() }), r.loose = () => r.clone({ ...r._zod.def, catchall: Nr() }), r.strict = () => r.clone({ ...r._zod.def, catchall: gv() }), r.strip = () => r.clone({ ...r._zod.def, catchall: void 0 }), r.extend = (o) => {
    return D.extend(r, o);
  }, r.safeExtend = (o) => {
    return D.safeExtend(r, o);
  }, r.merge = (o) => D.merge(r, o), r.pick = (o) => D.pick(r, o), r.omit = (o) => D.omit(r, o), r.partial = (...o) => D.partial(cv, r, o[0]), r.required = (...o) => D.required(bv, r, o[0]);
});
function fl(r, i) {
  let o = { type: "object", shape: r ?? {}, ...D.normalizeParams(i) };
  return new En(o);
}
function yl(r, i) {
  return new En({ type: "object", shape: r, catchall: gv(), ...D.normalizeParams(i) });
}
function hl(r, i) {
  return new En({ type: "object", shape: r, catchall: Nr(), ...D.normalizeParams(i) });
}
var An = I("ZodUnion", (r, i) => {
  _n.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => qi(r, o, t, n), r.options = i.options;
});
function ev(r, i) {
  return new An({ type: "union", options: r, ...D.normalizeParams(i) });
}
var Eg = I("ZodXor", (r, i) => {
  An.init(r, i), bt.init(r, i), r._zod.processJSONSchema = (o, t, n) => qi(r, o, t, n), r.options = i.options;
});
function al(r, i) {
  return new Eg({ type: "union", options: r, inclusive: false, ...D.normalizeParams(i) });
}
var Ag = I("ZodDiscriminatedUnion", (r, i) => {
  An.init(r, i), _t.init(r, i);
});
function pl(r, i, o) {
  return new Ag({ type: "union", options: i, discriminator: r, ...D.normalizeParams(o) });
}
var Kg = I("ZodIntersection", (r, i) => {
  Ut.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => xu(r, o, t, n);
});
function qg(r, i) {
  return new Kg({ type: "intersection", left: r, right: i });
}
var Qg = I("ZodTuple", (r, i) => {
  ti.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Zu(r, o, t, n), r.rest = (o) => r.clone({ ...r._zod.def, rest: o });
});
function Yg(r, i, o) {
  let t = i instanceof S, n = t ? o : i;
  return new Qg({ type: "tuple", items: r, rest: t ? i : null, ...D.normalizeParams(n) });
}
var Kn = I("ZodRecord", (r, i) => {
  kt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => du(r, o, t, n), r.keyType = i.keyType, r.valueType = i.valueType;
});
function Fg(r, i, o) {
  return new Kn({ type: "record", keyType: r, valueType: i, ...D.normalizeParams(o) });
}
function sl(r, i, o) {
  let t = q(r);
  return t._zod.values = void 0, new Kn({ type: "record", keyType: t, valueType: i, ...D.normalizeParams(o) });
}
function rI(r, i, o) {
  return new Kn({ type: "record", keyType: r, valueType: i, mode: "loose", ...D.normalizeParams(o) });
}
var Bg = I("ZodMap", (r, i) => {
  Dt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Hu(r, o, t, n), r.keyType = i.keyType, r.valueType = i.valueType, r.min = (...o) => r.check(a(...o)), r.nonempty = (o) => r.check(a(1, o)), r.max = (...o) => r.check(gr(...o)), r.size = (...o) => r.check(kr(...o));
});
function nI(r, i, o) {
  return new Bg({ type: "map", keyType: r, valueType: i, ...D.normalizeParams(o) });
}
var mg = I("ZodSet", (r, i) => {
  wt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Tu(r, o, t, n), r.min = (...o) => r.check(a(...o)), r.nonempty = (o) => r.check(a(1, o)), r.max = (...o) => r.check(gr(...o)), r.size = (...o) => r.check(kr(...o));
});
function iI(r, i) {
  return new mg({ type: "set", valueType: r, ...D.normalizeParams(i) });
}
var dr = I("ZodEnum", (r, i) => {
  Nt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (t, n, v) => Eu(r, t, n, v), r.enum = i.entries, r.options = Object.values(i.entries);
  let o = new Set(Object.keys(i.entries));
  r.extract = (t, n) => {
    let v = {};
    for (let $ of t) if (o.has($)) v[$] = i.entries[$];
    else throw Error(`Key ${$} not found in enum`);
    return new dr({ ...i, checks: [], ...D.normalizeParams(n), entries: v });
  }, r.exclude = (t, n) => {
    let v = { ...i.entries };
    for (let $ of t) if (o.has($)) delete v[$];
    else throw Error(`Key ${$} not found in enum`);
    return new dr({ ...i, checks: [], ...D.normalizeParams(n), entries: v });
  };
});
function lv(r, i) {
  let o = Array.isArray(r) ? Object.fromEntries(r.map((t) => [t, t])) : r;
  return new dr({ type: "enum", entries: o, ...D.normalizeParams(i) });
}
function vI(r, i) {
  return new dr({ type: "enum", entries: r, ...D.normalizeParams(i) });
}
var Hg = I("ZodLiteral", (r, i) => {
  Ot.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Au(r, o, t, n), r.values = new Set(i.values), Object.defineProperty(r, "value", { get() {
    if (i.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
    return i.values[0];
  } });
});
function oI(r, i) {
  return new Hg({ type: "literal", values: Array.isArray(r) ? r : [r], ...D.normalizeParams(i) });
}
var Tg = I("ZodFile", (r, i) => {
  zt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Qu(r, o, t, n), r.min = (o, t) => r.check(a(o, t)), r.max = (o, t) => r.check(gr(o, t)), r.mime = (o, t) => r.check(Fr(Array.isArray(o) ? o : [o], t));
});
function tI(r) {
  return Iu(Tg, r);
}
var Mg = I("ZodTransform", (r, i) => {
  St.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => mu(r, o, t, n), r._zod.parse = (o, t) => {
    if (t.direction === "backward") throw new cr(r.constructor.name);
    o.addIssue = (v) => {
      if (typeof v === "string") o.issues.push(D.issue(v, o.value, i));
      else {
        let $ = v;
        if ($.fatal) $.continue = false;
        $.code ?? ($.code = "custom"), $.input ?? ($.input = o.value), $.inst ?? ($.inst = r), o.issues.push(D.issue($));
      }
    };
    let n = i.transform(o.value, o);
    if (n instanceof Promise) return n.then((v) => {
      return o.value = v, o;
    });
    return o.value = n, o;
  };
});
function Iv(r) {
  return new Mg({ type: "transform", transform: r });
}
var cv = I("ZodOptional", (r, i) => {
  $i.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Qi(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function Jn(r) {
  return new cv({ type: "optional", innerType: r });
}
var Rg = I("ZodExactOptional", (r, i) => {
  Pt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Qi(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function xg(r) {
  return new Rg({ type: "optional", innerType: r });
}
var Zg = I("ZodNullable", (r, i) => {
  jt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Cu(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function Ln(r) {
  return new Zg({ type: "nullable", innerType: r });
}
function $I(r) {
  return Jn(Ln(r));
}
var dg = I("ZodDefault", (r, i) => {
  Jt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => yu(r, o, t, n), r.unwrap = () => r._zod.def.innerType, r.removeDefault = r.unwrap;
});
function Cg(r, i) {
  return new dg({ type: "default", innerType: r, get defaultValue() {
    return typeof i === "function" ? i() : D.shallowClone(i);
  } });
}
var fg = I("ZodPrefault", (r, i) => {
  Lt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => hu(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function yg(r, i) {
  return new fg({ type: "prefault", innerType: r, get defaultValue() {
    return typeof i === "function" ? i() : D.shallowClone(i);
  } });
}
var bv = I("ZodNonOptional", (r, i) => {
  Gt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => fu(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function hg(r, i) {
  return new bv({ type: "nonoptional", innerType: r, ...D.normalizeParams(i) });
}
var ag = I("ZodSuccess", (r, i) => {
  Wt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Yu(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function uI(r) {
  return new ag({ type: "success", innerType: r });
}
var pg = I("ZodCatch", (r, i) => {
  Vt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => au(r, o, t, n), r.unwrap = () => r._zod.def.innerType, r.removeCatch = r.unwrap;
});
function sg(r, i) {
  return new pg({ type: "catch", innerType: r, catchValue: typeof i === "function" ? i : () => i });
}
var re = I("ZodNaN", (r, i) => {
  Xt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Ku(r, o, t, n);
});
function gI(r) {
  return eu(re, r);
}
var _v = I("ZodPipe", (r, i) => {
  Et.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => pu(r, o, t, n), r.in = i.in, r.out = i.out;
});
function Gn(r, i) {
  return new _v({ type: "pipe", in: r, out: i });
}
var Uv = I("ZodCodec", (r, i) => {
  _v.init(r, i), Un.init(r, i);
});
function eI(r, i, o) {
  return new Uv({ type: "pipe", in: r, out: i, transform: o.decode, reverseTransform: o.encode });
}
var ne = I("ZodReadonly", (r, i) => {
  At.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => su(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function ie(r) {
  return new ne({ type: "readonly", innerType: r });
}
var ve = I("ZodTemplateLiteral", (r, i) => {
  Kt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => qu(r, o, t, n);
});
function lI(r, i) {
  return new ve({ type: "template_literal", parts: r, ...D.normalizeParams(i) });
}
var oe = I("ZodLazy", (r, i) => {
  Yt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => ng(r, o, t, n), r.unwrap = () => r._zod.def.getter();
});
function te(r) {
  return new oe({ type: "lazy", getter: r });
}
var $e = I("ZodPromise", (r, i) => {
  Qt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => rg(r, o, t, n), r.unwrap = () => r._zod.def.innerType;
});
function II(r) {
  return new $e({ type: "promise", innerType: r });
}
var ue = I("ZodFunction", (r, i) => {
  qt.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Bu(r, o, t, n);
});
function cI(r) {
  return new ue({ type: "function", input: Array.isArray(r?.input) ? Yg(r?.input) : r?.input ?? Xn(Nr()), output: r?.output ?? Nr() });
}
var qn = I("ZodCustom", (r, i) => {
  Ft.init(r, i), P.init(r, i), r._zod.processJSONSchema = (o, t, n) => Fu(r, o, t, n);
});
function bI(r) {
  let i = new V({ check: "custom" });
  return i._zod.check = r, i;
}
function _I(r, i) {
  return cu(qn, r ?? (() => true), i);
}
function ge(r, i = {}) {
  return bu(qn, r, i);
}
function ee(r) {
  return _u(r);
}
var UI = Uu;
var kI = ku;
function DI(r, i = {}) {
  let o = new qn({ type: "custom", check: "custom", fn: (t) => t instanceof r, abort: true, ...D.normalizeParams(i) });
  return o._zod.bag.Class = r, o._zod.check = (t) => {
    if (!(t.value instanceof r)) t.issues.push({ code: "invalid_type", expected: r.name, input: t.value, inst: o, path: [...o._zod.def.path ?? []] });
  }, o;
}
var wI = (...r) => Du({ Codec: Uv, Boolean: hr, String: Cr }, ...r);
function NI(r) {
  let i = te(() => {
    return ev([Mi(r), Og(), zg(), Jg(), Xn(i), Fg(Mi(), i)]);
  });
  return i;
}
function OI(r, i) {
  return Gn(Iv(r), i);
}
var c6 = { invalid_type: "invalid_type", too_big: "too_big", too_small: "too_small", invalid_format: "invalid_format", not_multiple_of: "not_multiple_of", unrecognized_keys: "unrecognized_keys", invalid_union: "invalid_union", invalid_key: "invalid_key", invalid_element: "invalid_element", invalid_value: "invalid_value", custom: "custom" };
function b6(r) {
  E({ customError: r });
}
function _6() {
  return E().customError;
}
var le;
/* @__PURE__ */ (function(r) {
})(le || (le = {}));
var z = { ...Pn, ...Fi, iso: Zr };
var U6 = /* @__PURE__ */ new Set(["$schema", "$ref", "$defs", "definitions", "$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor", "type", "enum", "const", "anyOf", "oneOf", "allOf", "not", "properties", "required", "additionalProperties", "patternProperties", "propertyNames", "minProperties", "maxProperties", "items", "prefixItems", "additionalItems", "minItems", "maxItems", "uniqueItems", "contains", "minContains", "maxContains", "minLength", "maxLength", "pattern", "format", "minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf", "description", "default", "contentEncoding", "contentMediaType", "contentSchema", "unevaluatedItems", "unevaluatedProperties", "if", "then", "else", "dependentSchemas", "dependentRequired", "nullable", "readOnly"]);
function k6(r, i) {
  let o = r.$schema;
  if (o === "https://json-schema.org/draft/2020-12/schema") return "draft-2020-12";
  if (o === "http://json-schema.org/draft-07/schema#") return "draft-7";
  if (o === "http://json-schema.org/draft-04/schema#") return "draft-4";
  return i ?? "draft-2020-12";
}
function D6(r, i) {
  if (!r.startsWith("#")) throw Error("External $ref is not supported, only local refs (#/...) are allowed");
  let o = r.slice(1).split("/").filter(Boolean);
  if (o.length === 0) return i.rootSchema;
  let t = i.version === "draft-2020-12" ? "$defs" : "definitions";
  if (o[0] === t) {
    let n = o[1];
    if (!n || !i.defs[n]) throw Error(`Reference not found: ${r}`);
    return i.defs[n];
  }
  throw Error(`Reference not found: ${r}`);
}
function zI(r, i) {
  if (r.not !== void 0) {
    if (typeof r.not === "object" && Object.keys(r.not).length === 0) return z.never();
    throw Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (r.unevaluatedItems !== void 0) throw Error("unevaluatedItems is not supported");
  if (r.unevaluatedProperties !== void 0) throw Error("unevaluatedProperties is not supported");
  if (r.if !== void 0 || r.then !== void 0 || r.else !== void 0) throw Error("Conditional schemas (if/then/else) are not supported");
  if (r.dependentSchemas !== void 0 || r.dependentRequired !== void 0) throw Error("dependentSchemas and dependentRequired are not supported");
  if (r.$ref) {
    let n = r.$ref;
    if (i.refs.has(n)) return i.refs.get(n);
    if (i.processing.has(n)) return z.lazy(() => {
      if (!i.refs.has(n)) throw Error(`Circular reference not resolved: ${n}`);
      return i.refs.get(n);
    });
    i.processing.add(n);
    let v = D6(n, i), $ = K(v, i);
    return i.refs.set(n, $), i.processing.delete(n), $;
  }
  if (r.enum !== void 0) {
    let n = r.enum;
    if (i.version === "openapi-3.0" && r.nullable === true && n.length === 1 && n[0] === null) return z.null();
    if (n.length === 0) return z.never();
    if (n.length === 1) return z.literal(n[0]);
    if (n.every(($) => typeof $ === "string")) return z.enum(n);
    let v = n.map(($) => z.literal($));
    if (v.length < 2) return v[0];
    return z.union([v[0], v[1], ...v.slice(2)]);
  }
  if (r.const !== void 0) return z.literal(r.const);
  let o = r.type;
  if (Array.isArray(o)) {
    let n = o.map((v) => {
      let $ = { ...r, type: v };
      return zI($, i);
    });
    if (n.length === 0) return z.never();
    if (n.length === 1) return n[0];
    return z.union(n);
  }
  if (!o) return z.any();
  let t;
  switch (o) {
    case "string": {
      let n = z.string();
      if (r.format) {
        let v = r.format;
        if (v === "email") n = n.check(z.email());
        else if (v === "uri" || v === "uri-reference") n = n.check(z.url());
        else if (v === "uuid" || v === "guid") n = n.check(z.uuid());
        else if (v === "date-time") n = n.check(z.iso.datetime());
        else if (v === "date") n = n.check(z.iso.date());
        else if (v === "time") n = n.check(z.iso.time());
        else if (v === "duration") n = n.check(z.iso.duration());
        else if (v === "ipv4") n = n.check(z.ipv4());
        else if (v === "ipv6") n = n.check(z.ipv6());
        else if (v === "mac") n = n.check(z.mac());
        else if (v === "cidr") n = n.check(z.cidrv4());
        else if (v === "cidr-v6") n = n.check(z.cidrv6());
        else if (v === "base64") n = n.check(z.base64());
        else if (v === "base64url") n = n.check(z.base64url());
        else if (v === "e164") n = n.check(z.e164());
        else if (v === "jwt") n = n.check(z.jwt());
        else if (v === "emoji") n = n.check(z.emoji());
        else if (v === "nanoid") n = n.check(z.nanoid());
        else if (v === "cuid") n = n.check(z.cuid());
        else if (v === "cuid2") n = n.check(z.cuid2());
        else if (v === "ulid") n = n.check(z.ulid());
        else if (v === "xid") n = n.check(z.xid());
        else if (v === "ksuid") n = n.check(z.ksuid());
      }
      if (typeof r.minLength === "number") n = n.min(r.minLength);
      if (typeof r.maxLength === "number") n = n.max(r.maxLength);
      if (r.pattern) n = n.regex(new RegExp(r.pattern));
      t = n;
      break;
    }
    case "number":
    case "integer": {
      let n = o === "integer" ? z.number().int() : z.number();
      if (typeof r.minimum === "number") n = n.min(r.minimum);
      if (typeof r.maximum === "number") n = n.max(r.maximum);
      if (typeof r.exclusiveMinimum === "number") n = n.gt(r.exclusiveMinimum);
      else if (r.exclusiveMinimum === true && typeof r.minimum === "number") n = n.gt(r.minimum);
      if (typeof r.exclusiveMaximum === "number") n = n.lt(r.exclusiveMaximum);
      else if (r.exclusiveMaximum === true && typeof r.maximum === "number") n = n.lt(r.maximum);
      if (typeof r.multipleOf === "number") n = n.multipleOf(r.multipleOf);
      t = n;
      break;
    }
    case "boolean": {
      t = z.boolean();
      break;
    }
    case "null": {
      t = z.null();
      break;
    }
    case "object": {
      let n = {}, v = r.properties || {}, $ = new Set(r.required || []);
      for (let [l, e] of Object.entries(v)) {
        let c = K(e, i);
        n[l] = $.has(l) ? c : c.optional();
      }
      if (r.propertyNames) {
        let l = K(r.propertyNames, i), e = r.additionalProperties && typeof r.additionalProperties === "object" ? K(r.additionalProperties, i) : z.any();
        if (Object.keys(n).length === 0) {
          t = z.record(l, e);
          break;
        }
        let c = z.object(n).passthrough(), _ = z.looseRecord(l, e);
        t = z.intersection(c, _);
        break;
      }
      if (r.patternProperties) {
        let l = r.patternProperties, e = Object.keys(l), c = [];
        for (let N of e) {
          let O = K(l[N], i), J = z.string().regex(new RegExp(N));
          c.push(z.looseRecord(J, O));
        }
        let _ = [];
        if (Object.keys(n).length > 0) _.push(z.object(n).passthrough());
        if (_.push(...c), _.length === 0) t = z.object({}).passthrough();
        else if (_.length === 1) t = _[0];
        else {
          let N = z.intersection(_[0], _[1]);
          for (let O = 2; O < _.length; O++) N = z.intersection(N, _[O]);
          t = N;
        }
        break;
      }
      let u = z.object(n);
      if (r.additionalProperties === false) t = u.strict();
      else if (typeof r.additionalProperties === "object") t = u.catchall(K(r.additionalProperties, i));
      else t = u.passthrough();
      break;
    }
    case "array": {
      let { prefixItems: n, items: v } = r;
      if (n && Array.isArray(n)) {
        let $ = n.map((l) => K(l, i)), u = v && typeof v === "object" && !Array.isArray(v) ? K(v, i) : void 0;
        if (u) t = z.tuple($).rest(u);
        else t = z.tuple($);
        if (typeof r.minItems === "number") t = t.check(z.minLength(r.minItems));
        if (typeof r.maxItems === "number") t = t.check(z.maxLength(r.maxItems));
      } else if (Array.isArray(v)) {
        let $ = v.map((l) => K(l, i)), u = r.additionalItems && typeof r.additionalItems === "object" ? K(r.additionalItems, i) : void 0;
        if (u) t = z.tuple($).rest(u);
        else t = z.tuple($);
        if (typeof r.minItems === "number") t = t.check(z.minLength(r.minItems));
        if (typeof r.maxItems === "number") t = t.check(z.maxLength(r.maxItems));
      } else if (v !== void 0) {
        let $ = K(v, i), u = z.array($);
        if (typeof r.minItems === "number") u = u.min(r.minItems);
        if (typeof r.maxItems === "number") u = u.max(r.maxItems);
        t = u;
      } else t = z.array(z.any());
      break;
    }
    default:
      throw Error(`Unsupported type: ${o}`);
  }
  if (r.description) t = t.describe(r.description);
  if (r.default !== void 0) t = t.default(r.default);
  return t;
}
function K(r, i) {
  if (typeof r === "boolean") return r ? z.any() : z.never();
  let o = zI(r, i), t = r.type || r.enum !== void 0 || r.const !== void 0;
  if (r.anyOf && Array.isArray(r.anyOf)) {
    let u = r.anyOf.map((e) => K(e, i)), l = z.union(u);
    o = t ? z.intersection(o, l) : l;
  }
  if (r.oneOf && Array.isArray(r.oneOf)) {
    let u = r.oneOf.map((e) => K(e, i)), l = z.xor(u);
    o = t ? z.intersection(o, l) : l;
  }
  if (r.allOf && Array.isArray(r.allOf)) if (r.allOf.length === 0) o = t ? o : z.any();
  else {
    let u = t ? o : K(r.allOf[0], i), l = t ? 0 : 1;
    for (let e = l; e < r.allOf.length; e++) u = z.intersection(u, K(r.allOf[e], i));
    o = u;
  }
  if (r.nullable === true && i.version === "openapi-3.0") o = z.nullable(o);
  if (r.readOnly === true) o = z.readonly(o);
  let n = {}, v = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (let u of v) if (u in r) n[u] = r[u];
  let $ = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (let u of $) if (u in r) n[u] = r[u];
  for (let u of Object.keys(r)) if (!U6.has(u)) n[u] = r[u];
  if (Object.keys(n).length > 0) i.registry.add(o, n);
  return o;
}
function SI(r, i) {
  if (typeof r === "boolean") return r ? z.any() : z.never();
  let o = k6(r, i?.defaultTarget), t = r.$defs || r.definitions || {}, n = { version: o, defs: t, refs: /* @__PURE__ */ new Map(), processing: /* @__PURE__ */ new Set(), rootSchema: r, registry: i?.registry ?? A };
  return K(r, n);
}
var Ie = {};
s(Ie, { string: () => w6, number: () => N6, date: () => S6, boolean: () => O6, bigint: () => z6 });
function w6(r) {
  return q$(Cr, r);
}
function N6(r) {
  return M$(yr, r);
}
function O6(r) {
  return y$(hr, r);
}
function z6(r) {
  return a$(ar, r);
}
function S6(r) {
  return gu(Vn, r);
}
E(kn());
var JI = g.union([g.literal("light"), g.literal("dark")]).describe("Color theme preference for the host environment.");
var pr = g.union([g.literal("inline"), g.literal("fullscreen"), g.literal("pip")]).describe("Display mode for UI presentation.");
var L6 = g.union([g.literal("--color-background-primary"), g.literal("--color-background-secondary"), g.literal("--color-background-tertiary"), g.literal("--color-background-inverse"), g.literal("--color-background-ghost"), g.literal("--color-background-info"), g.literal("--color-background-danger"), g.literal("--color-background-success"), g.literal("--color-background-warning"), g.literal("--color-background-disabled"), g.literal("--color-text-primary"), g.literal("--color-text-secondary"), g.literal("--color-text-tertiary"), g.literal("--color-text-inverse"), g.literal("--color-text-ghost"), g.literal("--color-text-info"), g.literal("--color-text-danger"), g.literal("--color-text-success"), g.literal("--color-text-warning"), g.literal("--color-text-disabled"), g.literal("--color-text-ghost"), g.literal("--color-border-primary"), g.literal("--color-border-secondary"), g.literal("--color-border-tertiary"), g.literal("--color-border-inverse"), g.literal("--color-border-ghost"), g.literal("--color-border-info"), g.literal("--color-border-danger"), g.literal("--color-border-success"), g.literal("--color-border-warning"), g.literal("--color-border-disabled"), g.literal("--color-ring-primary"), g.literal("--color-ring-secondary"), g.literal("--color-ring-inverse"), g.literal("--color-ring-info"), g.literal("--color-ring-danger"), g.literal("--color-ring-success"), g.literal("--color-ring-warning"), g.literal("--font-sans"), g.literal("--font-mono"), g.literal("--font-weight-normal"), g.literal("--font-weight-medium"), g.literal("--font-weight-semibold"), g.literal("--font-weight-bold"), g.literal("--font-text-xs-size"), g.literal("--font-text-sm-size"), g.literal("--font-text-md-size"), g.literal("--font-text-lg-size"), g.literal("--font-heading-xs-size"), g.literal("--font-heading-sm-size"), g.literal("--font-heading-md-size"), g.literal("--font-heading-lg-size"), g.literal("--font-heading-xl-size"), g.literal("--font-heading-2xl-size"), g.literal("--font-heading-3xl-size"), g.literal("--font-text-xs-line-height"), g.literal("--font-text-sm-line-height"), g.literal("--font-text-md-line-height"), g.literal("--font-text-lg-line-height"), g.literal("--font-heading-xs-line-height"), g.literal("--font-heading-sm-line-height"), g.literal("--font-heading-md-line-height"), g.literal("--font-heading-lg-line-height"), g.literal("--font-heading-xl-line-height"), g.literal("--font-heading-2xl-line-height"), g.literal("--font-heading-3xl-line-height"), g.literal("--border-radius-xs"), g.literal("--border-radius-sm"), g.literal("--border-radius-md"), g.literal("--border-radius-lg"), g.literal("--border-radius-xl"), g.literal("--border-radius-full"), g.literal("--border-width-regular"), g.literal("--shadow-hairline"), g.literal("--shadow-sm"), g.literal("--shadow-md"), g.literal("--shadow-lg")]).describe("CSS variable keys available to MCP apps for theming.");
var G6 = g.record(L6.describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`), g.union([g.string(), g.undefined()]).describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`)).describe(`Style variables for theming MCP apps.

Individual style keys are optional - hosts may provide any subset of these values.
Values are strings containing CSS values (colors, sizes, font stacks, etc.).

Note: This type uses \`Record<K, string | undefined>\` rather than \`Partial<Record<K, string>>\`
for compatibility with Zod schema generation. Both are functionally equivalent for validation.`);
var W6 = g.object({ method: g.literal("ui/open-link"), params: g.object({ url: g.string().describe("URL to open in the host's browser") }) });
var be = g.object({ isError: g.boolean().optional().describe("True if the host failed to open the URL (e.g., due to security policy).") }).passthrough();
var _e = g.object({ isError: g.boolean().optional().describe("True if the host rejected or failed to deliver the message.") }).passthrough();
var V6 = g.object({ method: g.literal("ui/notifications/sandbox-proxy-ready"), params: g.object({}) });
var kv = g.object({ connectDomains: g.array(g.string()).optional().describe("Origins for network requests (fetch/XHR/WebSocket)."), resourceDomains: g.array(g.string()).optional().describe("Origins for static resources (scripts, images, styles, fonts)."), frameDomains: g.array(g.string()).optional().describe("Origins for nested iframes (frame-src directive)."), baseUriDomains: g.array(g.string()).optional().describe("Allowed base URIs for the document (base-uri directive).") });
var Dv = g.object({ camera: g.object({}).optional().describe("Request camera access (Permission Policy `camera` feature)."), microphone: g.object({}).optional().describe("Request microphone access (Permission Policy `microphone` feature)."), geolocation: g.object({}).optional().describe("Request geolocation access (Permission Policy `geolocation` feature)."), clipboardWrite: g.object({}).optional().describe("Request clipboard write access (Permission Policy `clipboard-write` feature).") });
var X6 = g.object({ method: g.literal("ui/notifications/size-changed"), params: g.object({ width: g.number().optional().describe("New width in pixels."), height: g.number().optional().describe("New height in pixels.") }) });
var Ue = g.object({ method: g.literal("ui/notifications/tool-input"), params: g.object({ arguments: g.record(g.string(), g.unknown().describe("Complete tool call arguments as key-value pairs.")).optional().describe("Complete tool call arguments as key-value pairs.") }) });
var ke = g.object({ method: g.literal("ui/notifications/tool-input-partial"), params: g.object({ arguments: g.record(g.string(), g.unknown().describe("Partial tool call arguments (incomplete, may change).")).optional().describe("Partial tool call arguments (incomplete, may change).") }) });
var De = g.object({ method: g.literal("ui/notifications/tool-cancelled"), params: g.object({ reason: g.string().optional().describe('Optional reason for the cancellation (e.g., "user action", "timeout").') }) });
var LI = g.object({ fonts: g.string().optional() });
var GI = g.object({ variables: G6.optional().describe("CSS variables for theming the app."), css: LI.optional().describe("CSS blocks that apps can inject.") });
var we = g.object({ method: g.literal("ui/resource-teardown"), params: g.object({}) });
var E6 = g.record(g.string(), g.unknown());
var ce = g.object({ text: g.object({}).optional().describe("Host supports text content blocks."), image: g.object({}).optional().describe("Host supports image content blocks."), audio: g.object({}).optional().describe("Host supports audio content blocks."), resource: g.object({}).optional().describe("Host supports resource content blocks."), resourceLink: g.object({}).optional().describe("Host supports resource link content blocks."), structuredContent: g.object({}).optional().describe("Host supports structured content.") });
var WI = g.object({ experimental: g.object({}).optional().describe("Experimental features (structure TBD)."), openLinks: g.object({}).optional().describe("Host supports opening external URLs."), serverTools: g.object({ listChanged: g.boolean().optional().describe("Host supports tools/list_changed notifications.") }).optional().describe("Host can proxy tool calls to the MCP server."), serverResources: g.object({ listChanged: g.boolean().optional().describe("Host supports resources/list_changed notifications.") }).optional().describe("Host can proxy resource reads to the MCP server."), logging: g.object({}).optional().describe("Host accepts log messages."), sandbox: g.object({ permissions: Dv.optional().describe("Permissions granted by the host (camera, microphone, geolocation)."), csp: kv.optional().describe("CSP domains approved by the host.") }).optional().describe("Sandbox configuration applied by the host."), updateModelContext: ce.optional().describe("Host accepts context updates (ui/update-model-context) to be included in the model's context for future turns."), message: ce.optional().describe("Host supports receiving content messages (ui/message) from the view.") });
var VI = g.object({ experimental: g.object({}).optional().describe("Experimental features (structure TBD)."), tools: g.object({ listChanged: g.boolean().optional().describe("App supports tools/list_changed notifications.") }).optional().describe("App exposes MCP-style tools that the host can call."), availableDisplayModes: g.array(pr).optional().describe("Display modes the app supports.") });
var A6 = g.object({ method: g.literal("ui/notifications/initialized"), params: g.object({}).optional() });
var K6 = g.object({ csp: kv.optional().describe("Content Security Policy configuration."), permissions: Dv.optional().describe("Sandbox permissions requested by the UI."), domain: g.string().optional().describe("Dedicated origin for view sandbox."), prefersBorder: g.boolean().optional().describe("Visual boundary preference - true if UI prefers a visible border.") });
var q6 = g.object({ method: g.literal("ui/request-display-mode"), params: g.object({ mode: pr.describe("The display mode being requested.") }) });
var Ne = g.object({ mode: pr.describe("The display mode that was actually set. May differ from requested if not supported.") }).passthrough();
var XI = g.union([g.literal("model"), g.literal("app")]).describe("Tool visibility scope - who can access the tool.");
var Q6 = g.object({ resourceUri: g.string().optional(), visibility: g.array(XI).optional().describe(`Who can access this tool. Default: ["model", "app"]
- "model": Tool visible to and callable by the agent
- "app": Tool callable by the app from this server only`) });
var ZU = g.object({ mimeTypes: g.array(g.string()).optional().describe('Array of supported MIME types for UI resources.\nMust include `"text/html;profile=mcp-app"` for MCP Apps support.') });
var Y6 = g.object({ method: g.literal("ui/message"), params: g.object({ role: g.literal("user").describe('Message role, currently only "user" is supported.'), content: g.array(PI).describe("Message content blocks (text, image, etc.).") }) });
var F6 = g.object({ method: g.literal("ui/notifications/sandbox-resource-ready"), params: g.object({ html: g.string().describe("HTML content to load into the inner iframe."), sandbox: g.string().optional().describe("Optional override for the inner iframe's sandbox attribute."), csp: kv.optional().describe("CSP configuration from resource metadata."), permissions: Dv.optional().describe("Sandbox permissions from resource metadata.") }) });
var Oe = g.object({ method: g.literal("ui/notifications/tool-result"), params: P6.describe("Standard MCP tool execution result.") });
var ze = g.object({ toolInfo: g.object({ id: j6.optional().describe("JSON-RPC id of the tools/call request."), tool: J6.describe("Tool definition including name, inputSchema, etc.") }).optional().describe("Metadata of the tool call that instantiated this App."), theme: JI.optional().describe("Current color theme preference."), styles: GI.optional().describe("Style configuration for theming the app."), displayMode: pr.optional().describe("How the UI is currently displayed."), availableDisplayModes: g.array(pr).optional().describe("Display modes the host supports."), containerDimensions: g.union([g.object({ height: g.number().describe("Fixed container height in pixels.") }), g.object({ maxHeight: g.union([g.number(), g.undefined()]).optional().describe("Maximum container height in pixels.") })]).and(g.union([g.object({ width: g.number().describe("Fixed container width in pixels.") }), g.object({ maxWidth: g.union([g.number(), g.undefined()]).optional().describe("Maximum container width in pixels.") })])).optional().describe(`Container dimensions. Represents the dimensions of the iframe or other
container holding the app. Specify either width or maxWidth, and either height or maxHeight.`), locale: g.string().optional().describe("User's language and region preference in BCP 47 format."), timeZone: g.string().optional().describe("User's timezone in IANA format."), userAgent: g.string().optional().describe("Host application identifier."), platform: g.union([g.literal("web"), g.literal("desktop"), g.literal("mobile")]).optional().describe("Platform type for responsive design decisions."), deviceCapabilities: g.object({ touch: g.boolean().optional().describe("Whether the device supports touch input."), hover: g.boolean().optional().describe("Whether the device supports hover interactions.") }).optional().describe("Device input capabilities."), safeAreaInsets: g.object({ top: g.number().describe("Top safe area inset in pixels."), right: g.number().describe("Right safe area inset in pixels."), bottom: g.number().describe("Bottom safe area inset in pixels."), left: g.number().describe("Left safe area inset in pixels.") }).optional().describe("Mobile safe area boundaries in pixels.") }).passthrough();
var Se = g.object({ method: g.literal("ui/notifications/host-context-changed"), params: ze.describe("Partial context update containing only changed fields.") });
var B6 = g.object({ method: g.literal("ui/update-model-context"), params: g.object({ content: g.array(PI).optional().describe("Context content blocks (text, image, etc.)."), structuredContent: g.record(g.string(), g.unknown().describe("Structured content for machine-readable context data.")).optional().describe("Structured content for machine-readable context data.") }) });
var m6 = g.object({ method: g.literal("ui/initialize"), params: g.object({ appInfo: jI.describe("App identification (name and version)."), appCapabilities: VI.describe("Features and capabilities this app provides."), protocolVersion: g.string().describe("Protocol version this app supports.") }) });
var Pe = g.object({ protocolVersion: g.string().describe('Negotiated protocol version string (e.g., "2025-11-21").'), hostInfo: jI.describe("Host application identification and version."), hostCapabilities: WI.describe("Features and capabilities provided by the host."), hostContext: ze.describe("Rich context about the host environment.") }).passthrough();
var je = "ui/resourceUri";
var EI = "text/html;profile=mcp-app";
function hk(r, i, o, t) {
  let n = o._meta, v = n.ui, $ = n[je], u = n;
  if (v?.resourceUri && !$) u = { ...n, [je]: v.resourceUri };
  else if ($ && !v?.resourceUri) u = { ...n, ui: { ...v, resourceUri: $ } };
  return r.registerTool(i, { ...o, _meta: u }, t);
}
function ak(r, i, o, t, n) {
  r.registerResource(i, o, { mimeType: EI, ...t }, n);
}

// module/crypto.js
function randomUUID() {
  return crypto.randomUUID();
}

// ../conformance-server.ts
if (!("process" in globalThis)) {
  globalThis.process = { env: {} };
}
var log = {
  tool: (name, input) => console.error(`[TOOL] ${name} called`, Object.keys(input).length ? JSON.stringify(input) : ""),
  done: (name, summary) => console.error(`[TOOL] ${name} done${summary ? ` \u2014 ${summary}` : ""}`),
  error: (name, err) => console.error(`[ERROR] ${name} failed:`, err instanceof Error ? err.stack ?? err.message : err),
  notify: (method) => console.error(`[NOTIFY] sent ${method}`)
};
var DIST_DIR = "server.js".endsWith(".ts") ? posix.join(".", "dist") : ".";
var LIFECYCLE_RESOURCE_URI = "ui://lifecycle-test/lifecycle-app.html";
var HOST_CONTEXT_RESOURCE_URI = "ui://host-context-test/host-context-app.html";
var MESSAGING_RESOURCE_URI = "ui://messaging-test/messaging-app.html";
var DOMAIN_CORS_RESOURCE_URI = "ui://domain-cors-test/domain-cors-app.html";
var THEMING_RESOURCE_URI = "ui://theming-test/theming-app.html";
var DECLARED_DOMAIN = process.env.DECLARED_DOMAIN || "mcp-conformance.test";
function createServer(options, ServerCtr = McpServer) {
  const isStdio = options?.stdio ?? false;
  const server = new ServerCtr({
    name: "MCP Conformance Tests",
    version: "1.0.0"
  });
  ak(
    server,
    LIFECYCLE_RESOURCE_URI,
    LIFECYCLE_RESOURCE_URI,
    { mimeType: EI },
    async () => {
      const html = await fs_default.readFile(posix.join(DIST_DIR, "apps/lifecycle/lifecycle-app.html"), "utf-8");
      return { contents: [{ uri: LIFECYCLE_RESOURCE_URI, mimeType: EI, text: html }] };
    }
  );
  ak(
    server,
    HOST_CONTEXT_RESOURCE_URI,
    HOST_CONTEXT_RESOURCE_URI,
    { mimeType: EI },
    async () => {
      const html = await fs_default.readFile(posix.join(DIST_DIR, "apps/host-context/host-context-app.html"), "utf-8");
      return { contents: [{ uri: HOST_CONTEXT_RESOURCE_URI, mimeType: EI, text: html }] };
    }
  );
  ak(
    server,
    MESSAGING_RESOURCE_URI,
    MESSAGING_RESOURCE_URI,
    { mimeType: EI },
    async () => {
      const html = await fs_default.readFile(posix.join(DIST_DIR, "apps/messaging/messaging-app.html"), "utf-8");
      return { contents: [{ uri: MESSAGING_RESOURCE_URI, mimeType: EI, text: html }] };
    }
  );
  const domainCorsCspMeta = {
    ui: {
      domain: DECLARED_DOMAIN,
      csp: {
        connectDomains: [`http://localhost:${process.env.PORT ?? "3002"}`]
      }
    }
  };
  ak(
    server,
    DOMAIN_CORS_RESOURCE_URI,
    DOMAIN_CORS_RESOURCE_URI,
    { mimeType: EI },
    async () => {
      const html = await fs_default.readFile(posix.join(DIST_DIR, "apps/domain-cors/domain-cors-app.html"), "utf-8");
      return {
        contents: [{
          uri: DOMAIN_CORS_RESOURCE_URI,
          mimeType: EI,
          text: html,
          ...!isStdio && { _meta: domainCorsCspMeta }
        }]
      };
    }
  );
  ak(
    server,
    THEMING_RESOURCE_URI,
    THEMING_RESOURCE_URI,
    { mimeType: EI },
    async () => {
      const html = await fs_default.readFile(posix.join(DIST_DIR, "apps/theming/theming-app.html"), "utf-8");
      return {
        contents: [{
          uri: THEMING_RESOURCE_URI,
          mimeType: EI,
          text: html,
          _meta: { ui: { prefersBorder: true } }
        }]
      };
    }
  );
  hk(server, "show-lifecycle", {
    title: "Show Lifecycle Tests",
    description: "Display MCP Apps \xA73 Lifecycle conformance tests.",
    inputSchema: {
      greeting: z2.string().optional().default("hello").describe("Greeting passed in args")
    },
    _meta: { [je]: LIFECYCLE_RESOURCE_URI }
  }, async ({ greeting }) => {
    log.tool("show-lifecycle", { greeting });
    return {
      content: [{ type: "text", text: `Lifecycle tests launched (greeting: ${greeting})` }],
      _meta: { viewUUID: randomUUID(), greeting }
    };
  });
  hk(server, "show-host-context", {
    title: "Show Host Context Tests",
    description: "Display MCP Apps \xA74 HostContext conformance tests.",
    inputSchema: {},
    _meta: { [je]: HOST_CONTEXT_RESOURCE_URI }
  }, async () => {
    log.tool("show-host-context", {});
    return {
      content: [{ type: "text", text: "Host Context tests launched" }],
      _meta: { viewUUID: randomUUID() }
    };
  });
  hk(server, "show-messaging", {
    title: "Show Messaging Tests",
    description: "Display MCP Apps \xA75 View\u2192Host messaging conformance tests.",
    inputSchema: {},
    _meta: { [je]: MESSAGING_RESOURCE_URI }
  }, async () => {
    log.tool("show-messaging", {});
    return {
      content: [{ type: "text", text: "Messaging tests launched" }],
      _meta: { viewUUID: randomUUID() }
    };
  });
  hk(server, "show-domain-cors", {
    title: "Show Domain & CORS Tests",
    description: "Display MCP Apps \xA72.4 Domain & CORS conformance tests.",
    inputSchema: {},
    _meta: { [je]: DOMAIN_CORS_RESOURCE_URI }
  }, async () => {
    const port = process.env.PORT ?? "3002";
    const corsTestUrl = `http://localhost:${port}/cors-test`;
    log.tool("show-domain-cors", { corsTestUrl, expectedDomain: DECLARED_DOMAIN });
    return {
      content: [{ type: "text", text: `Domain & CORS tests launched (domain: ${DECLARED_DOMAIN})` }],
      _meta: { viewUUID: randomUUID(), corsTestUrl, expectedDomain: DECLARED_DOMAIN }
    };
  });
  hk(server, "show-theming", {
    title: "Show Theming Tests",
    description: "Display MCP Apps \xA74.5 CSS Variables & Theming conformance tests.",
    inputSchema: {},
    _meta: { [je]: THEMING_RESOURCE_URI }
  }, async () => {
    log.tool("show-theming", {});
    return {
      content: [{ type: "text", text: "Theming tests launched" }],
      _meta: { viewUUID: randomUUID() }
    };
  });
  server.registerTool("echo-tool", {
    title: "Echo Tool",
    description: "Echoes the provided message back. Used by conformance tests.",
    inputSchema: {
      message: z2.string().describe("Message to echo")
    }
  }, async ({ message }) => {
    log.tool("echo-tool", { message });
    return {
      content: [{ type: "text", text: `echo: ${message}` }]
    };
  });
  server.registerTool("slow-task", {
    title: "Slow Task",
    description: "Runs for a specified duration, sending progress notifications. Supports cancellation via signal.",
    inputSchema: {
      durationMs: z2.number().min(100).max(6e4).describe("Duration in milliseconds")
    }
  }, async ({ durationMs }, extra) => {
    log.tool("slow-task", { durationMs });
    const steps = 10;
    const stepMs = durationMs / steps;
    const progressToken = extra._meta?.progressToken;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, stepMs));
      if (extra.signal?.aborted) {
        return { content: [{ type: "text", text: `Aborted after step ${i - 1}/${steps}` }] };
      }
      if (progressToken !== void 0) {
        await extra.sendNotification({
          method: "notifications/progress",
          params: { progressToken, progress: i, total: steps, message: `Step ${i}/${steps}` }
        });
      }
    }
    return { content: [{ type: "text", text: `Completed ${steps} steps in ${durationMs}ms` }] };
  });
  server.registerTool("slow-echo", {
    title: "Slow Echo",
    description: "Echoes a message after a delay with progress notifications. Supports cancellation.",
    inputSchema: {
      message: z2.string().describe("Message to echo"),
      durationMs: z2.number().min(100).max(6e4).optional().default(3e3).describe("Duration in ms")
    }
  }, async ({ message, durationMs }, extra) => {
    log.tool("slow-echo", { message, durationMs });
    const steps = 5;
    const stepMs = durationMs / steps;
    const progressToken = extra._meta?.progressToken;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, stepMs));
      if (extra.signal?.aborted) {
        return { content: [{ type: "text", text: `Aborted echo after step ${i - 1}/${steps}` }] };
      }
      if (progressToken !== void 0) {
        await extra.sendNotification({
          method: "notifications/progress",
          params: { progressToken, progress: i, total: steps, message: `Processing ${i}/${steps}` }
        });
      }
    }
    return { content: [{ type: "text", text: `echo: ${message}` }] };
  });
  server.registerTool(
    "test-resources-notification",
    {
      title: "Test Resources Notification",
      description: "Triggers a resources/list_changed notification to demonstrate dynamic resource list updates.",
      inputSchema: {}
    },
    async () => {
      log.tool("test-resources-notification", {});
      try {
        await server.server.notification({
          method: "notifications/resources/list_changed",
          params: {}
        });
        log.notify("notifications/resources/list_changed");
        return {
          content: [{ type: "text", text: "Sent resources/list_changed notification." }]
        };
      } catch (err) {
        log.error("test-resources-notification", err);
        throw err;
      }
    }
  );
  server.registerTool(
    "test-tools-notification",
    {
      title: "Test Tools Notification",
      description: "Triggers a tools/list_changed notification to demonstrate dynamic tool list updates.",
      inputSchema: {}
    },
    async () => {
      log.tool("test-tools-notification", {});
      try {
        await server.server.notification({
          method: "notifications/tools/list_changed",
          params: {}
        });
        log.notify("notifications/tools/list_changed");
        return {
          content: [{ type: "text", text: "Sent tools/list_changed notification." }]
        };
      } catch (err) {
        log.error("test-tools-notification", err);
        throw err;
      }
    }
  );
  return server;
}
export {
  createServer
};
//# sourceMappingURL=conformance-server.js.map


async function readFile(path) {
  const url = new URL(path, import.meta.url);

  if (url.protocol === "file:") { // assume node:fs support as we can't fetch file: protocol anyways
    const { readFile: nodeReadFile } = await import("runtime:fs/promises");
    const { fileURLToPath } = await import("runtime:url");
    return await nodeReadFile(fileURLToPath(url), "utf8");
  } else {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`readFile: ${res.status} ${res.statusText} (${url})`, { cause: res });
    return await res.text();
  }
}

export default { readFile };
export { readFile };

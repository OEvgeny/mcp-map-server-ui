
async function readFile(path) {
  const url = new URL(path, import.meta.url)
  return await (await fetch(url)).text();
}

export default { readFile }
import { H3, serve, defineEventHandler, serveStatic } from "h3";
import { stat, readFile } from "node:fs/promises";
import { join } from "path";

const app = new H3();
export default app;

serve(app, { port: 3001 });

const publicDir = "./out";

function resolveId(id: string) {
  return !['/', '/index.html'] .includes(id) ? join(publicDir, id) : './app/index.html';
}

function readBlob(filePath: string) {
  return readFile(filePath).then((data: any) => new Blob([data], {
    type: filePath.endsWith('.html')
      ? 'text/html' : filePath.endsWith('.js') ? 'application/javascript' : undefined
  }));
}

app.use(
  defineEventHandler((event) => {
    return serveStatic(event, {
      getContents: (id) => readBlob(resolveId(id)),
      getMeta: async (id) => {
        const stats = await stat(resolveId(id)).catch(() => { });

        if (!stats || !stats.isFile()) {
          return;
        }

        return {
          size: stats.size,
          mtime: stats.mtimeMs,
        };
      },
    });
  }),
);
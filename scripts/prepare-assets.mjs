import { cp, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { prepareCursor } from "./game-cursor.mjs";
const require = createRequire(import.meta.url);
const root = path.dirname(require.resolve("pannellum/package.json"));
await mkdir("public/vendor/pannellum", { recursive: true });
// The distribution CSS embeds its icons; there is no build/img directory.
for (const name of ["pannellum.js", "pannellum.css"]) {
  await cp(path.join(root, "build", name), path.join("public/vendor/pannellum", name), {
    recursive: true,
  });
}
await cp(path.join(root, "COPYING"), "public/vendor/pannellum/COPYING");
await prepareCursor();

import { readFile, writeFile } from "node:fs/promises";
import { crc32, deflateSync } from "node:zlib";

// Offline decoder for the checked-in 32-bit Windows cursor, not an upload parser.
// RIFF/ACON stores CUR frames plus timing in 1/60-second jiffies.
export function decodeCursor(bytes) {
  if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "ACON") {
    throw new Error("Expected a RIFF/ACON cursor");
  }
  // This original asset declares a RIFF size eight bytes too large. Validate
  // every chunk against the actual buffer instead of trusting that old header.
  const frames = [];
  let header, sequence, rates;
  function chunks(start, end, inFrames = false) {
    for (let offset = start; offset < end;) {
      if (offset + 8 > end) throw new Error("Truncated ANI chunk");
      const kind = bytes.toString("ascii", offset, offset + 4);
      const size = bytes.readUInt32LE(offset + 4);
      const begin = offset + 8,
        finish = begin + size;
      if (finish > end) throw new Error("ANI chunk exceeds buffer");
      const data = bytes.subarray(begin, finish);
      if (kind === "LIST" && data.toString("ascii", 0, 4) === "fram")
        chunks(begin + 4, finish, true);
      if (kind === "anih") header = data;
      if (kind === "seq ") sequence = data;
      if (kind === "rate") rates = data;
      if (kind === "icon" && inFrames) frames.push(decodeFrame(data));
      offset = finish + (size % 2);
    }
  }
  chunks(12, bytes.length);
  if (
    !header ||
    header.length !== 36 ||
    header.readUInt32LE(4) !== frames.length ||
    !frames.length
  ) {
    throw new Error("Invalid ANI frame count/header");
  }
  const count = header.readUInt32LE(8),
    defaultRate = header.readUInt32LE(28);
  if (
    !count ||
    count > 1000 ||
    (sequence && sequence.length !== count * 4) ||
    (rates && rates.length !== count * 4)
  ) {
    throw new Error("Invalid ANI steps");
  }
  const steps = Array.from({ length: count }, (_, i) => ({
    frame: sequence ? sequence.readUInt32LE(i * 4) : i,
    jiffies: rates ? rates.readUInt32LE(i * 4) : defaultRate,
  }));
  if (steps.some((s) => !frames[s.frame] || !s.jiffies))
    throw new Error("Invalid ANI sequence/rate");
  return { frames, steps };
}

function decodeFrame(cur) {
  if (
    cur.length < 22 ||
    cur.readUInt16LE(0) !== 0 ||
    cur.readUInt16LE(2) !== 2 ||
    cur.readUInt16LE(4) !== 1
  ) {
    throw new Error("Expected a single-image CUR frame");
  }
  const width = cur[6] || 256,
    height = cur[7] || 256;
  const x = cur.readUInt16LE(10),
    y = cur.readUInt16LE(12);
  const offset = cur.readUInt32LE(18),
    size = cur.readUInt32LE(14);
  if (
    width > 128 ||
    height > 128 ||
    x >= width ||
    y >= height ||
    offset < 22 ||
    offset + size > cur.length ||
    size < 40
  ) {
    throw new Error("Invalid CUR dimensions/offset/hotspot");
  }
  const dib = cur.subarray(offset, offset + size);
  if (
    dib.readUInt32LE(0) !== 40 ||
    dib.readInt32LE(4) !== width ||
    dib.readInt32LE(8) !== height * 2 ||
    dib.readUInt16LE(12) !== 1 ||
    dib.readUInt16LE(14) !== 32 ||
    dib.readUInt32LE(16) !== 0 ||
    size < 40 + width * height * 4
  ) {
    throw new Error("Expected an uncompressed 32-bit cursor bitmap");
  }
  // Windows DIB is bottom-up BGRA. Keep its original per-pixel alpha.
  const rgba = Buffer.alloc(width * height * 4);
  for (let row = 0; row < height; row++)
    for (let col = 0; col < width; col++) {
      const from = 40 + ((height - 1 - row) * width + col) * 4,
        to = (row * width + col) * 4;
      rgba[to] = dib[from + 2];
      rgba[to + 1] = dib[from + 1];
      rgba[to + 2] = dib[from];
      rgba[to + 3] = dib[from + 3];
    }
  return { width, height, x, y, rgba, png: encodePng(width, height, rgba) };
}

function encodePng(width, height, rgba) {
  function chunk(type, data) {
    const body = Buffer.concat([Buffer.from(type), data]);
    const length = Buffer.alloc(4),
      checksum = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    checksum.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, checksum]);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let row = 0; row < height; row++)
    rgba.copy(scanlines, row * (width * 4 + 1) + 1, row * width * 4, (row + 1) * width * 4);
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(scanlines)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

export function cursorCss({ frames, steps }) {
  const cursors = frames.map(
    (f) => `url("data:image/png;base64,${f.png.toString("base64")}") ${f.x} ${f.y}, auto`,
  );
  const total = steps.reduce((sum, step) => sum + step.jiffies, 0);
  let elapsed = 0;
  const keyframes = steps
    .map((step) => {
      const rule = `  ${((elapsed / total) * 100).toFixed(6)}% { cursor: ${cursors[step.frame]}; }`;
      elapsed += step.jiffies;
      return rule;
    })
    .join("\n");
  return `/* Generated from public/assets/normal.ani by scripts/game-cursor.mjs. */
@media (hover: hover) and (pointer: fine) {
  html {
    cursor: ${cursors[steps[0].frame]};
    animation: pw-game-cursor ${total / 60}s step-end infinite;
  }
  /* Inherit the same animation phase through links and Pannellum's drag layer. */
  body, body *, body::before, body::after, body *::before, body *::after {
    cursor: inherit !important;
  }
  @keyframes pw-game-cursor {
${keyframes}
    100% { cursor: ${cursors[steps[0].frame]}; }
  }
}
@media (prefers-reduced-motion: reduce) {
  html { animation: none; }
}
`;
}

export async function prepareCursor() {
  const source = await readFile(new URL("../public/assets/normal.ani", import.meta.url));
  await writeFile(
    new URL("../src/app/game-cursor.generated.css", import.meta.url),
    cursorCss(decodeCursor(source)),
  );
}

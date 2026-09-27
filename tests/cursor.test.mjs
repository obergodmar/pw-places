import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { decodeCursor } from "../scripts/game-cursor.mjs";

const source = await readFile(new URL("../public/assets/normal.ani", import.meta.url));
test("original PW cursor retains twelve distinct transparent frames and two-second timing", () => {
  const { frames, steps } = decodeCursor(source);
  assert.equal(frames.length, 12);
  assert.equal(new Set(frames.map((frame) => frame.png.toString("base64"))).size, 12);
  assert.equal(
    steps.reduce((sum, step) => sum + step.jiffies, 0),
    120,
  );
  assert.deepEqual(
    steps.map((step) => step.frame),
    Array.from({ length: 12 }, (_, i) => i),
  );
  for (const frame of frames) {
    assert.deepEqual([frame.width, frame.height, frame.x, frame.y], [32, 32, 0, 0]);
    assert.ok(frame.rgba.some((v, i) => i % 4 === 3 && v === 0));
    assert.ok(frame.rgba.some((v, i) => i % 4 === 3 && v === 255));
  }
});
test("damaged source fails the build instead of emitting broken cursors", () => {
  assert.throws(() => decodeCursor(source.subarray(0, source.length - 10)), /exceeds buffer/);
  const badSequence = Buffer.from(source);
  badSequence.writeUInt32LE(999, badSequence.indexOf(Buffer.from("seq ")) + 8);
  assert.throws(() => decodeCursor(badSequence), /sequence/);
});

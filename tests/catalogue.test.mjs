import { test } from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
const places = JSON.parse(
  await readFile(new URL("../src/data/places.json", import.meta.url), "utf8"),
);

test("catalogue preserves unique safe IDs, valid map coordinates and available media", async () => {
  assert.equal(new Set(places.map((p) => p.id)).size, places.length);
  for (const place of places) {
    assert.match(place.id, /^[a-zA-Z]+$/);
    assert.ok(place.name.length > 0);
    assert.ok(place.x >= 0 && place.x <= 1440 && place.y >= 0 && place.y <= 1080);
    for (const asset of [...place.images, ...(place.audio ? [place.audio] : [])]) {
      assert.ok(asset.startsWith("/assets/") && !asset.includes(".."));
      await access(path.join("public", asset));
    }
  }
});
test("missing panorama is explicit, not a broken URL", () => {
  assert.deepEqual(
    places.filter((p) => !p.images.length).map((p) => p.id),
    ["lagerVodopada"],
  );
  assert.equal(places.filter((p) => p.images.length).length, 10);
});

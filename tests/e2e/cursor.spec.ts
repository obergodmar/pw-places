import { test, expect } from "@playwright/test";

test("native game cursor animates across the map and panorama; touch keeps native behavior", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const root = page.locator("html");
  if (isMobile) {
    await expect(root).toHaveCSS("animation-name", "none");
    await expect(root).toHaveCSS("cursor", "auto");
    return;
  }
  await expect(root).toHaveCSS("animation-name", "pw-game-cursor");
  await expect(root).toHaveCSS("animation-duration", "2s");
  const cursors = await page.evaluate(() => {
    const animation = document.documentElement.getAnimations()[0];
    animation.pause();
    return Array.from({ length: 12 }, (_, i) => {
      animation.currentTime = (i * 2000) / 12 + 5;
      return getComputedStyle(document.documentElement).cursor;
    });
  });
  expect(new Set(cursors).size).toBe(12);
  // Decode every actual browser cursor PNG, rather than only checking CSS text.
  expect(
    await page.evaluate(
      async (values) =>
        Promise.all(
          values.map(async (value) => {
            const image = new Image();
            image.src = value.slice(value.indexOf('"') + 1, value.lastIndexOf('"'));
            await image.decode();
            return [image.naturalWidth, image.naturalHeight];
          }),
        ),
      cursors,
    ),
  ).toEqual(Array.from({ length: 12 }, () => [32, 32]));
  const current = cursors[11];
  const link = page.getByRole("link", { name: "Город Мечей", exact: true });
  await expect(link).toHaveCSS("cursor", current);
  await link.click();
  const layer = page.locator(".pnlm-dragfix");
  await expect(layer).toBeVisible();
  await expect(layer).toHaveCSS("cursor", current);
  await layer.hover();
  await page.mouse.down();
  await expect(layer).toHaveCSS("cursor", current);
  await page.mouse.up();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(root).toHaveCSS("animation-name", "none");
  await expect(layer).toHaveCSS("cursor", cursors[0]);
});

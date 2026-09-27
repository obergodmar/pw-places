import { test, expect } from "@playwright/test";

test("map to panorama and back", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".map")).toBeVisible();
  await expect(page.getByRole("heading")).toHaveCount(0);
  await expect(page.locator("footer")).toHaveCount(0);
  await expect(page.getByRole("link")).toHaveCount(11);
  await page.screenshot({ path: testInfo.outputPath("map.png"), fullPage: true });
  await page.getByRole("link", { name: "Город Мечей", exact: true }).click();
  await expect(page.getByRole("main", { name: "Город Мечей" })).toBeVisible();
  await expect(page.locator(".pnlm-render-container canvas")).toBeVisible({ timeout: 30000 });
  await expect(page.getByRole("status")).toHaveCount(0, { timeout: 30000 });
  await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
  await expect(page.locator(".game-cell")).toHaveCount(9);
  await expect(
    page.locator(".place-toolbar, .place-heading, audio, .pnlm-controls:visible"),
  ).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("panorama.png") });
  await page.mouse.move(400, 300);
  await page.mouse.down();
  await page.mouse.move(550, 320, { steps: 8 });
  await page.mouse.up();
  await page.getByRole("link", { name: "Вернуться к карте" }).click();
  await expect(page).toHaveURL("/");
  await page.getByRole("link", { name: "Деревня лавин", exact: true }).click();
  await expect(page.locator(".pnlm-render-container canvas")).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0, { timeout: 30000 });
  expect(errors).toEqual([]);
});
test("missing place, missing panorama, and API validation", async ({ page, request }) => {
  await page.goto("/places/lagerVodopada");
  await expect(page.getByText("Панорама недоступна.")).toBeVisible();
  expect((await request.get("/places/unknown")).status()).toBe(404);
  expect((await request.get("/api/places/unknown")).status()).toBe(404);
  const res = await request.get("/api/places/lesopilnya");
  expect(res.status()).toBe(200);
  expect((await res.json()).images).toEqual(["/assets/places/lesopilnya/Lesopilnya.jpg"]);
});
test("image failure gives a recovery link", async ({ page }) => {
  await page.route("**/assets/places/**", (route) => route.abort());
  await page.goto("/places/gorodMechej");
  await expect(page.getByRole("main").getByRole("alert")).toBeVisible({ timeout: 35000 });
  await expect(page.getByRole("link", { name: "Открыть изображение" })).toBeVisible();
});

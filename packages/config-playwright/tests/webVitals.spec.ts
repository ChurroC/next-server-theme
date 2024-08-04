import { test } from "@playwright/test";

test("run actions to get web vital data", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");
    // Find an element with the text 'About' and click on it
    const buttons = await page.locator("button").all();

    for (const button of buttons) {
        await button.click();
    }

    await page.reload();
    await page.close();
});

import { test, expect, type Page } from "@playwright/test";

// This will always run when file is imported
test("has title", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

// This will be a function called checkHeading
// This allows it to be reused in other tests and not cause it to be run when file is imported
/*
You can use it like so:
test("whatever name", checkHeading);
or
test("whatever name", async ({ page }) => {
  await checkHeading({ page });
  // add additional test steps here
});
*/
export const checkHeading = async ({ page }: { page: Page }) => {
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
        page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
};

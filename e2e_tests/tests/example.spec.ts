import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should not allow the user to sign in ', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link",{name:"Sign In"}).click().toBeVissible()
  
  awaint page.locator("[name=email]").fill("test1@check.com")

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

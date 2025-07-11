import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should not allow the user to log in ', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link",{name:"Log In"}).click()

  await expect(page.getByRole("heading",{name:"Log In"})).toBeVisible()
  
  await page.locator("[name=email]").fill("fashan@test1.com")
  await page.locator("[name=password]").fill("test@1")  


  await page.getByRole("button",{name:"Log In"}).click()
  await expect(page.getByText("Invalid Credential")).toBeVisible()

});

test('should allow the user to register ',async ({page})=>{
  await page.goto(UI_URL)
  await page.getByRole("link",{name:"Sign In"}).click()
  await expect(page.getByRole("heading",{name:"Create Account"})).toBeVisible()
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

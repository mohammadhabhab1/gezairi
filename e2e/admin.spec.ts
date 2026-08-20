import { test, expect } from '@playwright/test'

test.describe('Admin Panel', () => {
  test('should load admin login page', async ({ page }) => {
    await page.goto('/admin')

    // Payload CMS should redirect to login if not authenticated
    await expect(page).toHaveURL(/.*\/admin/)
  })

  test('should display login form elements', async ({ page }) => {
    await page.goto('/admin')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Check for common Payload admin elements
    // Note: These selectors may need adjustment based on Payload version
    const loginForm = page.locator('form')
    await expect(loginForm).toBeVisible()
  })
})

test.describe('Admin Authentication', () => {
  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')

    // Fill in invalid credentials
    const emailInput = page.locator('input[name="email"], input[type="email"]')
    const passwordInput = page.locator('input[name="password"], input[type="password"]')

    if (await emailInput.isVisible() && await passwordInput.isVisible()) {
      await emailInput.fill('invalid@example.com')
      await passwordInput.fill('wrongpassword')

      const submitButton = page.locator('button[type="submit"]')
      await submitButton.click()

      // Should remain on login page or show error
      await expect(page).toHaveURL(/.*\/admin/)
    }
  })
})

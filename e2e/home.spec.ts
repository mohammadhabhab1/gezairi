import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the welcome heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /welcome to gezairi/i })
    await expect(heading).toBeVisible()
  })

  test('should display the description text', async ({ page }) => {
    const description = page.getByText(/modern web application/i)
    await expect(description).toBeVisible()
  })

  test('should have an admin panel link', async ({ page }) => {
    const adminLink = page.getByRole('link', { name: /admin panel/i })
    await expect(adminLink).toBeVisible()
    await expect(adminLink).toHaveAttribute('href', '/admin')
  })

  test('should have a documentation link', async ({ page }) => {
    const docsLink = page.getByRole('link', { name: /documentation/i })
    await expect(docsLink).toBeVisible()
    await expect(docsLink).toHaveAttribute('href', 'https://payloadcms.com/docs')
  })

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/gezairi/i)
  })
})

test.describe('Navigation', () => {
  test('should navigate to admin panel', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /admin panel/i }).click()
    await expect(page).toHaveURL(/.*\/admin/)
  })
})

test.describe('Responsive Design', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const heading = page.getByRole('heading', { name: /welcome to gezairi/i })
    await expect(heading).toBeVisible()
  })

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    const heading = page.getByRole('heading', { name: /welcome to gezairi/i })
    await expect(heading).toBeVisible()
  })
})

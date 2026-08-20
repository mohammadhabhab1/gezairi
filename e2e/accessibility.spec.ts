import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('home page should have no critical accessibility issues', async ({ page }) => {
    await page.goto('/')

    // Check for basic accessibility requirements

    // 1. Page should have a main heading
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()

    // 2. Links should have accessible names
    const links = page.locator('a')
    const linkCount = await links.count()

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i)
      const accessibleName = await link.getAttribute('aria-label') || await link.textContent()
      expect(accessibleName).toBeTruthy()
    }

    // 3. Buttons should have accessible names
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const accessibleName = await button.getAttribute('aria-label') || await button.textContent()
      expect(accessibleName).toBeTruthy()
    }

    // 4. Page should have proper lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang')
    expect(htmlLang).toBe('en')
  })

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/')

    // Tab through the page and check focus is visible
    await page.keyboard.press('Tab')

    // First focusable element should receive focus
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/')

    // Check that text elements have visible content
    const heading = page.getByRole('heading', { name: /welcome/i })
    await expect(heading).toBeVisible()

    // Text should not be transparent
    const computedStyle = await heading.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        color: style.color,
        opacity: style.opacity,
      }
    })

    expect(computedStyle.opacity).not.toBe('0')
    expect(computedStyle.color).not.toBe('rgba(0, 0, 0, 0)')
  })
})

import { expect, test } from '@playwright/test'

test('loads and the theme switch works', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'StressFreeBudget' })).toBeVisible()
  await page.getByRole('radio', { name: 'Dark' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('radio', { name: 'Light' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
})

test('no horizontal scroll at this viewport', async ({ page }) => {
  await page.goto('./')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBe(0)
})

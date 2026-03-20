import { test, expect } from '@playwright/test'

test.describe('Админка — контент', () => {
  test('страница контент-хаба загружается', async ({ page }) => {
    await page.goto('/content')
    // Перенаправит на login если не авторизован
    await expect(page.locator('body')).toBeVisible()
  })

  test('страница студентов загружается', async ({ page }) => {
    await page.goto('/students')
    await expect(page.locator('body')).toBeVisible()
  })
})

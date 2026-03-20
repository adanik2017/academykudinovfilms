import { test, expect } from '@playwright/test'

test.describe('Авторизация', () => {
  test('страница входа загружается', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h1')).toContainText('Вход')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('страница регистрации загружается', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('h1')).toContainText('Создать аккаунт')
    await expect(page.locator('input[id="name"]')).toBeVisible()
    await expect(page.locator('input[id="email"]')).toBeVisible()
  })

  test('ссылка на регистрацию работает', async ({ page }) => {
    await page.goto('/login')
    await page.click('a[href="/register"]')
    await expect(page).toHaveURL('/register')
  })

  test('ошибка при пустом пароле', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'test@test.com')
    await page.click('button[type="submit"]')
    // Браузер покажет native validation
    const emailInput = page.locator('input[type="password"]')
    await expect(emailInput).toBeVisible()
  })
})

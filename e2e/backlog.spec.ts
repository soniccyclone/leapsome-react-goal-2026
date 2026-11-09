import { expect, test } from '@playwright/test'

test('added game survives a reload', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Title').fill('Hades')
  await page.getByLabel('Platform').fill('PC')
  await page.getByRole('button', { name: 'Add game' }).click()
  await expect(page.getByRole('link', { name: 'Hades' })).toBeVisible()

  await page.reload()
  await expect(page.getByRole('link', { name: 'Hades' })).toBeVisible()
})

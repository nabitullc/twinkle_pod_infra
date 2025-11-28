import { test, expect } from '@playwright/test';
import { loginUser, createChild } from '../helpers/auth';

test.describe('Child Profile Management', () => {
  test.beforeEach(async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'test@twinklepod.com';
    const password = process.env.TEST_USER_PASSWORD || 'Test1234!';
    await loginUser(page, email, password);
  });

  test('should create new child profile', async ({ page }) => {
    await createChild(page, 'Emma', 5);
    
    await expect(page.locator('[data-testid="child-card"]')).toContainText('Emma');
    await expect(page.locator('[data-testid="child-age"]')).toContainText('5');
  });

  test('should edit child profile', async ({ page }) => {
    await page.goto('/dashboard');
    
    await page.click('[data-testid="edit-child-button"]:first-child');
    await page.fill('[data-testid="child-age-input"]', '6');
    await page.click('[data-testid="save-child-button"]');
    
    await expect(page.locator('[data-testid="child-age"]')).toContainText('6');
  });

  test('should delete child profile', async ({ page }) => {
    await page.goto('/dashboard');
    
    const initialCount = await page.locator('[data-testid="child-card"]').count();
    
    await page.click('[data-testid="delete-child-button"]:first-child');
    await page.click('[data-testid="confirm-delete"]');
    
    await expect(page.locator('[data-testid="child-card"]')).toHaveCount(initialCount - 1);
  });
});

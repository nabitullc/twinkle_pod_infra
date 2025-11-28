import { test, expect } from '@playwright/test';
import { loginUser, selectChild } from '../helpers/auth';

test.describe('Favorite Stories', () => {
  test.beforeEach(async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'test@twinklepod.com';
    const password = process.env.TEST_USER_PASSWORD || 'Test1234!';
    await loginUser(page, email, password);
    await selectChild(page, 'Emma');
  });

  test('should favorite and unfavorite story', async ({ page }) => {
    await page.goto('/stories');
    await page.click('[data-testid="story-card"]:first-child');
    
    // Favorite
    await page.click('[data-testid="favorite-button"]');
    await expect(page.locator('[data-testid="favorite-button"]')).toHaveClass(/favorited/);
    
    // Check library
    await page.goto('/library?tab=favorites');
    await expect(page.locator('[data-testid="story-card"]')).toHaveCount(1);
    
    // Unfavorite
    await page.click('[data-testid="story-card"] [data-testid="favorite-button"]');
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  });
});

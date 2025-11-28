import { test, expect } from '@playwright/test';
import { loginUser, selectChild } from '../helpers/auth';

test.describe('Library Tabs', () => {
  test.beforeEach(async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'test@twinklepod.com';
    const password = process.env.TEST_USER_PASSWORD || 'Test1234!';
    await loginUser(page, email, password);
    await selectChild(page, 'Emma');
  });

  test('should display correct stories in each tab', async ({ page }) => {
    await page.goto('/library');
    
    // Continue Reading
    await page.click('[data-testid="tab-continue"]');
    await expect(page.locator('[data-testid="story-card"]')).toHaveCount(3, { timeout: 5000 });
    
    // Favorites
    await page.click('[data-testid="tab-favorites"]');
    await expect(page.locator('[data-testid="story-card"]')).toHaveCount(5, { timeout: 5000 });
    
    // Completed
    await page.click('[data-testid="tab-completed"]');
    await expect(page.locator('[data-testid="story-card"]')).toHaveCount(2, { timeout: 5000 });
  });
});

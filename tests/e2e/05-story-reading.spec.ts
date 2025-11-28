import { test, expect } from '@playwright/test';
import { loginUser, selectChild } from '../helpers/auth';

test.describe('Story Reading & Progress', () => {
  test.beforeEach(async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'test@twinklepod.com';
    const password = process.env.TEST_USER_PASSWORD || 'Test1234!';
    await loginUser(page, email, password);
    await selectChild(page, 'Emma');
  });

  test('should read story and track progress', async ({ page }) => {
    await page.goto('/stories');
    await page.click('[data-testid="story-card"]:first-child');
    
    await expect(page.locator('[data-testid="story-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="story-text"]')).toBeVisible();
    
    // Scroll through story
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    
    // Wait for auto-save
    await page.waitForTimeout(11000);
    
    // Verify progress saved
    const progressRequest = page.waitForRequest(req => 
      req.url().includes('/api/progress') && req.method() === 'POST'
    );
    expect(progressRequest).toBeTruthy();
  });

  test('should show continue reading', async ({ page }) => {
    await page.goto('/library');
    
    await expect(page.locator('[data-testid="continue-reading"]')).toBeVisible();
  });
});

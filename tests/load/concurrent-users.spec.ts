import { test, expect } from '@playwright/test';
import { registerUser, createChild } from '../helpers/auth';

test.describe('Load Test: 100 Concurrent Users', () => {
  test.describe.configure({ mode: 'parallel' });
  
  const userCount = parseInt(process.env.LOAD_TEST_USERS || '100');
  
  for (let i = 0; i < userCount; i++) {
    test(`User ${i} - Browse and read story`, async ({ page }) => {
      const email = `loadtest-${Date.now()}-${i}@twinklepod.com`;
      
      // Register
      await registerUser(page, email);
      
      // Create child
      await createChild(page, `Child-${i}`, 5);
      
      // Browse stories
      await page.goto('/stories');
      await expect(page.locator('[data-testid="story-card"]')).toHaveCount(20);
      
      // Read story
      await page.click('[data-testid="story-card"]:first-child');
      await page.waitForLoadState('networkidle');
      
      // Scroll and save progress
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(11000);
    });
  }
});

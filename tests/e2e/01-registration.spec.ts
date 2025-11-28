import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test('should register new user successfully', async ({ page }) => {
    const email = `test-${Date.now()}@twinklepod.com`;
    
    await page.goto('/');
    await page.click('[data-testid="signup-button"]');
    
    await page.fill('[data-testid="email-input"]', email);
    await page.fill('[data-testid="password-input"]', 'Test1234!');
    await page.fill('[data-testid="confirm-password-input"]', 'Test1234!');
    
    await page.click('[data-testid="submit-button"]');
    
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.fill('[data-testid="password-input"]', 'Test1234!');
    await page.click('[data-testid="submit-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});

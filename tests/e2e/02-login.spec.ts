import { test, expect } from '@playwright/test';
import { loginUser } from '../helpers/auth';

test.describe('User Login', () => {
  test('should login with valid credentials', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'test@twinklepod.com';
    const password = process.env.TEST_USER_PASSWORD || 'Test1234!';
    
    await loginUser(page, email, password);
    
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'wrong@email.com');
    await page.fill('[data-testid="password-input"]', 'WrongPass123!');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});

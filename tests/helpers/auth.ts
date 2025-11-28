import { Page } from '@playwright/test';

export async function registerUser(page: Page, email: string, password: string = 'Test1234!') {
  await page.goto('/register');
  await page.fill('[data-testid="email-input"]', email);
  await page.fill('[data-testid="password-input"]', password);
  await page.fill('[data-testid="confirm-password-input"]', password);
  await page.click('[data-testid="submit-button"]');
  await page.waitForURL(/\/dashboard/);
}

export async function loginUser(page: Page, email: string, password: string = 'Test1234!') {
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', email);
  await page.fill('[data-testid="password-input"]', password);
  await page.click('[data-testid="login-button"]');
  await page.waitForURL(/\/dashboard/);
}

export async function createChild(page: Page, name: string, age: number) {
  await page.goto('/dashboard');
  await page.click('[data-testid="add-child-button"]');
  await page.fill('[data-testid="child-name-input"]', name);
  await page.fill('[data-testid="child-age-input"]', age.toString());
  await page.click('[data-testid="save-child-button"]');
  await page.waitForSelector(`text=${name}`);
}

export async function selectChild(page: Page, name: string) {
  await page.click('[data-testid="child-selector"]');
  await page.click(`[data-testid="child-option-${name.toLowerCase()}"]`);
}

import { test, expect } from '@playwright/test';

test.describe('Story Browsing', () => {
  test('should load and display stories', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('[data-testid="story-card"]')).toHaveCount(20, { timeout: 5000 });
  });

  test('should filter stories by category', async ({ page }) => {
    await page.goto('/stories');
    
    await page.click('[data-testid="category-animals"]');
    
    await expect(page).toHaveURL(/category=animals/);
    await expect(page.locator('[data-testid="story-card"]')).toHaveCount(20);
  });

  test('should filter stories by age range', async ({ page }) => {
    await page.goto('/stories');
    
    await page.click('[data-testid="age-filter-5"]');
    
    await expect(page).toHaveURL(/age_range=5/);
  });

  test('should search stories', async ({ page }) => {
    await page.goto('/stories');
    
    await page.fill('[data-testid="search-input"]', 'rabbit');
    await page.press('[data-testid="search-input"]', 'Enter');
    
    const cards = page.locator('[data-testid="story-card"]');
    await expect(cards.first()).toContainText('rabbit', { ignoreCase: true });
  });
});

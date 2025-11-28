import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Story cards stack vertically
    const cards = page.locator('[data-testid="story-card"]');
    const firstCard = await cards.first().boundingBox();
    const secondCard = await cards.nth(1).boundingBox();
    
    if (firstCard && secondCard) {
      expect(secondCard.y).toBeGreaterThan(firstCard.y + firstCard.height);
    }
  });
});

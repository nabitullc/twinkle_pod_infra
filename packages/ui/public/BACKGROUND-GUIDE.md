# Background Image Guide

## Dimensions

**Recommended**: `1920x1080px` (16:9 ratio)
- Works on all desktop screens
- Scales well on mobile

**Minimum**: `1200x675px`
- Covers most use cases
- Smaller file size

## File Format

- **WebP**: Best (smaller, modern)
- **JPG**: Good (universal support)
- **PNG**: Only if transparency needed

## Optimization

Target file size: **< 200KB**

Use: https://squoosh.app or https://tinypng.com

## Placement

Save as: `public/hero-bg.jpg`

The CSS handles:
- ✅ Centering on all devices
- ✅ Cover (no stretching)
- ✅ Responsive scaling
- ✅ Overlay for text readability

## Current Setup

```css
backgroundSize: 'cover'        // Fills container, crops if needed
backgroundPosition: 'center'   // Always centered
backgroundRepeat: 'no-repeat'  // No tiling
```

Overlay: `bg-white/60 backdrop-blur-sm` ensures text is readable

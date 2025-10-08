# Adding Project Screenshots

Your projects are currently using placeholder images from Unsplash. Here's how to add real screenshots of your client sites.

## Quick Steps

### 1. Take Screenshots

**Recommended Tool:** Use browser dev tools or a screenshot service

**Best Practices:**
- Use desktop viewport (1920x1080 or 1440x900)
- Capture above-the-fold content (hero section)
- Ensure site is fully loaded
- Use consistent aspect ratio (16:9 works well)

**Methods:**

**A. Browser Screenshot (Chrome/Edge)**
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
3. Type "screenshot"
4. Select "Capture full size screenshot"

**B. Online Tools**
- [screely.com](https://screely.com) - Adds browser mockup
- [shots.so](https://shots.so) - Beautiful mockups
- [browserframe.com](https://browserframe.com) - Browser frames

### 2. Optimize Images

**Resize & Compress:**
```bash
# Recommended dimensions: 800x600 or 1200x800
# Use an image optimizer:
```

**Online Tools:**
- [TinyPNG](https://tinypng.com) - Compress PNG/JPG
- [Squoosh](https://squoosh.app) - Advanced compression
- [ImageOptim](https://imageoptim.com) - Mac app

**Target:** Keep images under 200KB each for fast loading

### 3. Add to Project

**Option A: Local Images (Recommended)**

1. Create a screenshots folder:
```bash
mkdir public/screenshots
```

2. Save your optimized screenshots:
```
public/screenshots/
├── oakencupboards.jpg
├── eaglerocktimber.jpg
├── mytbrite.jpg
├── mytbrite-lights.jpg
└── walkup-beats.jpg
```

3. Update `components/sections/Projects.tsx`:
```tsx
{
  id: 1,
  title: 'Oaken Cupboards',
  image: '/screenshots/oakencupboards.jpg',  // ← Update this
  // ... rest of config
}
```

**Option B: Use External CDN**

Upload to a service like:
- [Cloudinary](https://cloudinary.com)
- [imgix](https://imgix.com)
- [Imgur](https://imgur.com)

Then use the CDN URL:
```tsx
image: 'https://your-cdn.com/oakencupboards.jpg'
```

### 4. Example: Taking a Screenshot of oakencupboards.com

1. Visit https://oakencupboards.com
2. Open Chrome DevTools (`F12`)
3. Set device to "Responsive"
4. Set dimensions to 1200x800
5. Press `Ctrl+Shift+P` and type "screenshot"
6. Select "Capture screenshot"
7. Compress with TinyPNG
8. Save as `public/screenshots/oakencupboards.jpg`
9. Update project config

### 5. Current Projects to Screenshot

Update these in `components/sections/Projects.tsx`:

**Client Sites:**
```tsx
// Oaken Cupboards
image: '/screenshots/oakencupboards.jpg',

// Eagle Rock Timber
image: '/screenshots/eaglerocktimber.jpg',

// MyTBrite
image: '/screenshots/mytbrite.jpg',

// MyTBrite Lights
image: '/screenshots/mytbrite-lights.jpg',

// Beehive Window Cleaning
image: '/screenshots/beehivewindowcleaning.jpg',

// ML Serv
image: '/screenshots/mlserv.jpg',

// Hidden Treasures
image: '/screenshots/hiddentreasures.jpg',
```

**Personal Projects:**
```tsx
// Walkup Beats (Featured)
image: '/screenshots/walkup-beats.jpg',
```

## Advanced: Automated Screenshots

Use a screenshot API for automated, consistent captures:

```bash
npm install puppeteer
```

Create `scripts/take-screenshots.js`:
```javascript
const puppeteer = require('puppeteer');

const sites = [
  { url: 'https://oakencupboards.com', name: 'oakencupboards' },
  { url: 'https://eaglerocktimber.com', name: 'eaglerocktimber' },
  // ... add others
];

(async () => {
  const browser = await puppeteer.launch();

  for (const site of sites) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(site.url, { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: `public/screenshots/${site.name}.jpg`,
      type: 'jpeg',
      quality: 85
    });
  }

  await browser.close();
})();
```

Run: `node scripts/take-screenshots.js`

## Image Optimization Tips

### Next.js Image Component (Recommended)

For better performance, use Next.js `Image` component:

```tsx
import Image from 'next/image';

// In your project card:
<div className="relative h-48 overflow-hidden bg-muted">
  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover group-hover:scale-110 transition-transform duration-300"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

This provides:
- Automatic optimization
- Lazy loading
- Responsive images
- WebP conversion

### Aspect Ratio

Maintain consistent aspect ratio for all screenshots:
- **Recommended:** 4:3 (800x600) or 16:9 (1200x675)
- Ensures uniform card heights
- Professional appearance

## Quick Reference

| Site | URL | Screenshot Filename | Type |
|------|-----|-------------------|------|
| Oaken Cupboards | oakencupboards.com | oakencupboards.jpg | Client |
| Eagle Rock Timber | eaglerocktimber.com | eaglerocktimber.jpg | Client |
| MyTBrite | mytbrite.com | mytbrite.jpg | Client |
| MyTBrite Lights | mytbrite-lights.com | mytbrite-lights.jpg | Client |
| Beehive Window Cleaning | beehivewindowcleaning.com | beehivewindowcleaning.jpg | Client |
| ML Serv | mlserv.com | mlserv.jpg | Client |
| Hidden Treasures | hiddentreasures.com | hiddentreasures.jpg | Client |
| Walkup Beats | walkup-beats.com | walkup-beats.jpg | Personal (Featured) |

## Notes

- Current placeholders are from Unsplash (generic images)
- Screenshots should showcase your actual work
- Update images anytime by replacing files in `public/screenshots/`
- Consider adding multiple screenshots per project (gallery view)
- Always get client permission before showing their sites

## Next Steps

1. Take screenshots of all 5 client sites
2. Optimize images (< 200KB each)
3. Save to `public/screenshots/`
4. Update image paths in `Projects.tsx`
5. Test that images load correctly
6. Consider adding hover effects or lightbox gallery

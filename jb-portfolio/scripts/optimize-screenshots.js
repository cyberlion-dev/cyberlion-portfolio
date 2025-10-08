/* eslint-disable @typescript-eslint/no-require-imports */
// Image optimization script using sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '../public/screenshots');

// Images that need optimization (over 200KB)
const imagesToOptimize = [
  'eagleRockTimber.png',
  'hiddenTreasures.png',
  'mlServ.png',
  'mytbrite.png',
  'mytbrite-lights.png',
  'shelleyLegion.png'
];

async function optimizeImage(filename) {
  const inputPath = path.join(screenshotsDir, filename);
  const tempPath = path.join(screenshotsDir, `temp-${filename}`);

  console.log(`\nOptimizing ${filename}...`);

  // Get original file size
  const originalStats = fs.statSync(inputPath);
  const originalSize = (originalStats.size / 1024).toFixed(2);
  console.log(`Original size: ${originalSize}KB`);

  try {
    // Optimize: resize to 1200px width, convert to JPEG with 80% quality
    await sharp(inputPath)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true
      })
      .toFile(tempPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(tempPath);
    const optimizedSize = (optimizedStats.size / 1024).toFixed(2);
    console.log(`Optimized size: ${optimizedSize}KB`);

    // Replace original with optimized
    const newFilename = filename.replace('.png', '.jpg');
    const finalPath = path.join(screenshotsDir, newFilename);
    fs.renameSync(tempPath, finalPath);

    // Delete original PNG if different from JPG
    if (filename !== newFilename) {
      fs.unlinkSync(inputPath);
    }

    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`✓ Reduced by ${reduction}% → ${newFilename}`);

    return { filename, newFilename, originalSize, optimizedSize, reduction };
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}:`, error.message);
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return null;
  }
}

async function optimizeAll() {
  console.log('Starting image optimization...\n');
  console.log('Target: < 200KB per image');
  console.log('Method: Resize to 1200px width, JPEG quality 80%\n');

  const results = [];

  for (const filename of imagesToOptimize) {
    const result = await optimizeImage(filename);
    if (result) {
      results.push(result);
    }
  }

  console.log('\n=== Optimization Summary ===');
  results.forEach(r => {
    console.log(`${r.filename} → ${r.newFilename}`);
    console.log(`  ${r.originalSize}KB → ${r.optimizedSize}KB (${r.reduction}% reduction)\n`);
  });

  console.log('\nNote: Update Projects.tsx to change .png extensions to .jpg for optimized images');
}

optimizeAll().catch(console.error);

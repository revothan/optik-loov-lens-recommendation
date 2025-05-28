#!/usr/bin/env node

/**
 * Icon Generation Script for Optik LOOV PWA
 * 
 * This script converts the favicon.ico to the required PWA icon sizes.
 * 
 * Requirements:
 * - sharp: npm install sharp
 * - The favicon.ico file should be in the public directory
 * 
 * Usage:
 * node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const faviconPath = path.join(__dirname, '../public/favicon.ico');
  const publicDir = path.join(__dirname, '../public');

  // Check if favicon exists
  if (!fs.existsSync(faviconPath)) {
    console.error('favicon.ico not found in public directory');
    return;
  }

  try {
    // Generate PWA icons
    const sizes = [
      { size: 192, name: 'pwa-192x192.png' },
      { size: 512, name: 'pwa-512x512.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 16, name: 'favicon-16x16.png' }
    ];

    console.log('Generating PWA icons from favicon.ico...');

    for (const { size, name } of sizes) {
      await sharp(faviconPath)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    console.log('✅ All PWA icons generated successfully!');
    console.log('\nGenerated files:');
    sizes.forEach(({ name }) => console.log(`  - public/${name}`));

  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();

# PWA Icons

This directory contains the icons used for the Progressive Web App (PWA) functionality.

## Files

- `favicon.ico` - Main favicon for the website
- `pwa-192x192.png` - PWA icon for 192x192 size
- `pwa-512x512.png` - PWA icon for 512x512 size  
- `apple-touch-icon.png` - Apple touch icon (180x180)
- `favicon-16x16.png` - Small favicon (16x16)
- `favicon-32x32.png` - Medium favicon (32x32)

## Generating Icons

To generate the PWA icons from the favicon.ico file:

1. Install sharp: `npm install --save-dev sharp`
2. Run the generation script: `node scripts/generate-icons.js`

This will create all the necessary icon sizes from your favicon.ico file.

## Manual Icon Creation

If you prefer to create icons manually, ensure they meet these requirements:

- **192x192px**: Used for Android home screen and app launcher
- **512x512px**: Used for splash screens and larger displays
- **180x180px**: Apple touch icon for iOS devices
- **32x32px & 16x16px**: Traditional favicon sizes

All icons should be PNG format except for favicon.ico.

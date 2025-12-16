# Favicon Generation Instructions

## Current Setup
- `favicon.ico` - Basic ICO format for maximum compatibility
- `icon.svg` - Modern SVG favicon for high-resolution displays
- `logo-icon.svg` - Apple touch icon fallback

## To Generate Proper PNG Favicons

You can use online tools or design software to create these sizes from the logo:

### Required Sizes:
- `favicon-16x16.png` - Browser tab
- `favicon-32x32.png` - Browser tab (high-res)
- `apple-touch-icon.png` (180x180) - iOS home screen
- `android-chrome-192x192.png` - Android home screen
- `android-chrome-512x512.png` - Android splash screen

### Recommended Tools:
1. **Online**: https://realfavicongenerator.net/
2. **Design**: Use Figma, Photoshop, or GIMP
3. **CLI**: Use `sharp` or `imagemagick`

### Colors to Use:
- Primary: `#d946ef` (purple)
- Secondary: `#f43f5e` (pink)  
- Accent: `#0ea5e9` (blue)
- Background: `#020617` (dark)

### Design:
- Circular logo with gradient background
- Simple geometric shapes for small sizes
- High contrast for visibility
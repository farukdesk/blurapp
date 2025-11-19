# Installation Guide - Blur App Chrome Extension

This guide will walk you through installing and using the Blur App Chrome extension.

## Prerequisites

- Google Chrome (version 88 or higher)
- Basic understanding of Chrome extensions
- The Blur App extension files

## Installation Steps

### Step 1: Download the Extension

If you haven't already, download or clone the repository:

```bash
git clone https://github.com/farukdesk/blurapp.git
```

Or download the ZIP file and extract it to a folder on your computer.

### Step 2: Open Chrome Extensions Page

1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. Alternatively: Click the three dots (⋮) → More Tools → Extensions

### Step 3: Enable Developer Mode

1. Look for the "Developer mode" toggle in the top-right corner
2. Click to enable it
3. You should see additional options appear (Load unpacked, Pack extension, etc.)

### Step 4: Load the Extension

1. Click the "Load unpacked" button
2. Navigate to the folder where you downloaded/extracted the Blur App
3. Select the `blurapp` folder (the one containing `manifest.json`)
4. Click "Select Folder" (or "Open" on Mac)

### Step 5: Verify Installation

1. You should see "Blur App" appear in your extensions list
2. The extension icon should appear in your Chrome toolbar
3. If you don't see the icon, click the puzzle piece icon and pin Blur App

## Quick Start Guide

### Using the Extension

1. **Navigate to any website** where you want to blur content
2. **Click the Blur App icon** in your toolbar
3. **Click "Enable Selection Mode"** in the popup
4. **Click and drag** on the webpage to select areas to blur
5. **Release the mouse** to create the blur region

### Managing Blur Regions

- **View count**: Check the popup to see how many blur regions are active
- **Remove single blur**: Right-click on any blur region
- **Remove all blurs**: Click "Clear All Blurs" in the popup
- **Disable selection**: Click the button again to stop adding new blurs

### Testing Persistence

To verify blur regions persist correctly:

1. Add some blur regions to a page
2. Scroll up and down - blurs should stay in place
3. Refresh the page - blurs should reappear
4. Close and reopen Chrome - blurs should still be there

## Testing with Test Page

The repository includes a test page for easy testing:

1. Open `test-page.html` in Chrome (File → Open File)
2. Or open it via a local server
3. Follow the instructions on the test page
4. Try blurring different elements

## Troubleshooting

### Extension Not Loading

**Problem**: Error when loading the extension

**Solution**:
- Verify you selected the correct folder (containing manifest.json)
- Check that all files are present
- Look at the error message for specific issues
- Ensure Chrome is up to date

### Blur Regions Not Appearing

**Problem**: Blur regions don't show up after selection

**Solution**:
- Refresh the page after installing the extension
- Check if the extension is enabled
- Verify the selection was large enough (minimum 20x20 pixels)
- Check browser console for errors (F12 → Console)

### Selection Mode Not Working

**Problem**: Can't enter selection mode

**Solution**:
- Ensure you clicked "Enable Selection Mode"
- Check if another extension is interfering
- Try disabling other extensions temporarily
- Reload the webpage

### Blur Regions Disappear After Scroll

**Problem**: Blurs move or disappear when scrolling

**Solution**:
- This should not happen - if it does, it's a bug
- Try removing all blurs and adding them again
- Check browser console for errors
- Report the issue on GitHub

### Storage Quota Exceeded

**Problem**: Error about storage quota

**Solution**:
- Clear blur regions for sites you don't use anymore
- Chrome storage has a 100KB limit per item
- Each hostname stores its own blur regions

## Updating the Extension

When a new version is released:

1. Download the new version files
2. Replace the old files with new ones
3. Go to `chrome://extensions/`
4. Click the refresh icon (↻) on the Blur App card
5. Your blur regions will be preserved

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find Blur App in the list
3. Click "Remove"
4. Confirm the removal

**Note**: This will delete all saved blur regions

## Security & Privacy

- ✅ No data is sent to external servers
- ✅ All blur data is stored locally in your browser
- ✅ No tracking or analytics
- ✅ Open source - you can review all code
- ✅ Works completely offline

## Tips for Best Results

1. **Make precise selections**: Take your time selecting areas
2. **Test immediately**: After adding a blur, scroll to verify it works
3. **Use right-click**: Quickly remove individual blurs
4. **Clear regularly**: Remove old blur regions you don't need
5. **Check the count**: Monitor active blurs in the popup

## Advanced Usage

### Syncing Across Devices

If you have Chrome Sync enabled, your blur regions will sync across all your devices automatically.

### Keyboard Shortcuts

Currently not implemented, but planned for future versions.

### Exporting Configuration

Currently not implemented, but planned for future versions.

## Getting Help

If you encounter issues:

1. Check this guide first
2. Look at the main README.md
3. Check browser console for errors (F12)
4. Open an issue on GitHub with:
   - Chrome version
   - Extension version
   - Steps to reproduce
   - Error messages (if any)

## Next Steps

- Read the full README.md for detailed information
- Try the test page to familiarize yourself
- Start using the extension on your favorite websites
- Report bugs or suggest features on GitHub

---

Happy blurring! 🔒
# Blur App - Chrome Extension

A powerful Chrome extension that allows you to blur specific areas of any website. The blur regions persist across page reloads, scrolling, and navigation, giving you complete control over what content you want to obscure.

## Features

✨ **Persistent Blur Regions** - Blur areas remain even after scrolling or refreshing the page  
🎯 **Easy Selection** - Click and drag to select areas to blur  
💾 **Auto-Save** - All blur regions are automatically saved per website  
🗑️ **Easy Management** - Right-click to remove individual blur regions or clear all at once  
🌐 **Works Everywhere** - Compatible with all websites  
📱 **Intuitive UI** - Beautiful, user-friendly popup interface  

## Installation

### Method 1: Load Unpacked Extension (For Development/Testing)

1. **Download or Clone this Repository**
   ```bash
   git clone https://github.com/farukdesk/blurapp.git
   cd blurapp
   ```

2. **Open Chrome Extensions Page**
   - Open Chrome and navigate to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `blurapp` directory (the folder containing `manifest.json`)

5. **Verify Installation**
   - You should see the "Blur App" extension in your extensions list
   - The extension icon should appear in your Chrome toolbar

### Method 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon for easy one-click installation.

## How to Use

### Basic Usage

1. **Navigate to Any Website**
   - Open any website where you want to blur content

2. **Open the Extension**
   - Click the Blur App icon in your Chrome toolbar

3. **Enable Selection Mode**
   - Click the "Enable Selection Mode" button in the popup
   - Your cursor will change to a crosshair

4. **Select Areas to Blur**
   - Click and drag on the webpage to select areas you want to blur
   - Release to create the blur region
   - The selected area will be blurred with a backdrop filter

5. **Disable Selection Mode**
   - Click the button again to disable selection mode
   - The blur regions will remain active

### Managing Blur Regions

- **View Active Blurs**: The popup shows the count of active blur regions
- **Remove a Single Blur**: Right-click on any blur region to remove it
- **Clear All Blurs**: Click "Clear All Blurs" button in the popup to remove all blur regions on the current website
- **Persistent Blurs**: All blur regions are saved automatically and will persist across:
  - Page refreshes
  - Browser restarts
  - Scrolling up and down
  - Navigation within the same domain

## Technical Details

### Architecture

The extension consists of:

- **Manifest V3**: Uses the latest Chrome extension manifest format
- **Content Script**: Injected into web pages to handle blur functionality
- **Popup Interface**: User-friendly control panel
- **Background Service Worker**: Manages extension lifecycle
- **Chrome Storage API**: Persists blur regions per domain

### Permissions

The extension requires the following permissions:

- `storage`: To save blur region data persistently
- `activeTab`: To inject scripts into the active tab
- `scripting`: To execute content scripts
- `notifications`: To show installation notifications
- `<all_urls>`: To work on all websites

### Storage

Blur regions are stored using Chrome's `chrome.storage.sync` API, which:
- Syncs across devices if Chrome Sync is enabled
- Stores data per hostname
- Has a storage quota of 100KB per item

## File Structure

```
blurapp/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface HTML
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── content.js            # Main blur functionality
├── content.css           # Content script styles
├── background.js         # Background service worker
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Browser Compatibility

- ✅ Chrome (Tested)
- ✅ Edge (Chromium-based)
- ✅ Brave
- ✅ Opera (Chromium-based)
- ❌ Firefox (requires manifest adjustments)
- ❌ Safari (requires different extension format)

## Privacy

- **No Data Collection**: The extension does not collect or transmit any user data
- **Local Storage Only**: All blur regions are stored locally in your browser
- **No External Servers**: No communication with external servers
- **Open Source**: All code is transparent and auditable

## Troubleshooting

### Blur Regions Not Appearing

1. Refresh the page after adding blur regions
2. Check if the extension is enabled
3. Ensure the website allows content scripts

### Selection Mode Not Working

1. Check if another extension is interfering
2. Try disabling and re-enabling the extension
3. Reload the webpage

### Blur Regions Lost

- Blur regions are saved per hostname
- Clearing browser data may remove saved regions
- Check Chrome storage quota

## Development

### Building from Source

No build step is required. The extension can be loaded directly as unpacked.

### Making Changes

1. Edit the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Blur App extension
4. Test your changes

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use, modify, and distribute as needed.

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact: [Repository Issues](https://github.com/farukdesk/blurapp/issues)

## Changelog

### Version 1.0.0 (Initial Release)
- ✨ Basic blur functionality
- ✨ Persistent blur regions per website
- ✨ Drag-to-select interface
- ✨ Right-click to remove blur regions
- ✨ Clear all blurs functionality
- ✨ Beautiful popup UI
- ✨ Cross-session persistence
- ✨ Scroll-aware blur positioning

## Roadmap

Future features planned:
- [ ] Adjustable blur intensity
- [ ] Different blur patterns (pixelate, mosaic, etc.)
- [ ] Export/Import blur configurations
- [ ] Keyboard shortcuts
- [ ] Blur region resizing
- [ ] Blur region moving/dragging
- [ ] Pattern matching for auto-blur
- [ ] Dark mode for popup

---

Made with ❤️ for privacy-conscious users
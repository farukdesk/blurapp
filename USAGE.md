# Usage Guide - Blur App Chrome Extension

## Table of Contents
- [Getting Started](#getting-started)
- [Basic Operations](#basic-operations)
- [Advanced Features](#advanced-features)
- [Tips and Tricks](#tips-and-tricks)
- [Troubleshooting](#troubleshooting)

## Getting Started

### First Time Setup

1. **Install the Extension**
   - Follow the INSTALLATION.md guide to load the extension
   - The Blur App icon will appear in your Chrome toolbar

2. **Pin the Extension** (Optional but recommended)
   - Click the puzzle piece icon in Chrome toolbar
   - Find "Blur App" in the list
   - Click the pin icon to keep it visible

### Your First Blur

1. Open any website (try the included `test-page.html`)
2. Click the Blur App icon
3. Click "Enable Selection Mode"
4. Click and drag on the page to select an area
5. Release to create the blur

The selected area will now be blurred!

## Basic Operations

### Creating Blur Regions

**Step-by-step:**

1. Click the extension icon
2. Click "Enable Selection Mode" button
3. Your cursor changes to a crosshair
4. Click and hold at the starting corner
5. Drag to the opposite corner
6. Release to create the blur

**Visual feedback:**
- While dragging: You'll see a selection box with a blue dashed border
- After release: The area becomes blurred with a backdrop filter effect
- The blur region has a semi-transparent border

**Minimum size:**
- Blur regions must be at least 20x20 pixels
- Smaller selections are ignored

### Removing Blur Regions

**Remove a single blur:**
1. Right-click on any blur region
2. The blur is immediately removed

**Remove all blurs:**
1. Click the extension icon
2. Click "Clear All Blurs" button
3. Confirm the action
4. All blurs on the current site are removed

### Checking Active Blurs

The popup shows:
- Number of active blur regions on the current site
- This updates in real-time as you add/remove blurs

## Advanced Features

### Persistence Across Sessions

**What persists:**
- ✅ Blur regions survive page refresh
- ✅ Blur regions survive browser restart
- ✅ Blur regions survive scrolling
- ✅ Blur regions sync across devices (if Chrome Sync is enabled)

**What doesn't persist:**
- ❌ Selection mode state (resets when you close the popup)
- ❌ The selection box (temporary visual aid)

### Per-Domain Storage

- Each website hostname has its own set of blur regions
- `example.com` and `subdomain.example.com` are separate
- Blur regions don't carry over to different sites

**Example:**
- Blurs created on `github.com` only appear on `github.com`
- Blurs on `google.com` won't show on `github.com`

### Scroll Behavior

The extension handles scrolling intelligently:

1. **Absolute positioning**: Blur regions use absolute coordinates
2. **Viewport independent**: Blurs stay in the exact same spot
3. **No repositioning needed**: Works automatically

**Testing scroll persistence:**
1. Create a blur region
2. Scroll the page up/down
3. Scroll back to the original position
4. The blur is exactly where you left it

### Multi-Blur Selection

You can create multiple blur regions:

1. Enable selection mode once
2. Create multiple blurs by dragging different areas
3. All blurs are saved automatically
4. Each blur can be removed independently

## Tips and Tricks

### Precision Selection

**For small areas:**
- Zoom in on the page (Ctrl/Cmd + Plus)
- Make your selection
- Zoom back out

**For text:**
- Select slightly beyond the text boundaries
- Account for line height and padding

**For images:**
- Select the entire image boundary
- Include any borders or shadows

### Effective Blur Patterns

**Privacy use cases:**
1. Email addresses in screenshots
2. Phone numbers in documents
3. Credit card information
4. Personal addresses
5. Salary information in tables

**Presentation use cases:**
1. Confidential data in demos
2. Personal information in tutorials
3. Sensitive parts of dashboards
4. Private messages in screenshots

### Keyboard Workflow

While keyboard shortcuts aren't implemented yet, you can:

1. Keep the popup open
2. Toggle selection mode with one click
3. Create multiple blurs without reopening
4. Close popup when done

### Performance Tips

**For many blur regions:**
- Keep blur regions reasonably sized
- Remove old blur regions you don't need
- Clear blurs on sites you're done with

**For large websites:**
- Blur regions are lightweight
- Modern browsers handle backdrop-filter efficiently
- No significant performance impact

## Troubleshooting

### Selection Mode Issues

**Problem**: Selection mode won't activate

**Solutions:**
1. Refresh the page
2. Check if extension is enabled
3. Try disabling other extensions temporarily
4. Reopen the popup

**Problem**: Can't see the selection box

**Solutions:**
1. Make sure you're clicking and dragging
2. Check if you're dragging far enough
3. Look for the blue dashed border
4. Try on a different part of the page

### Blur Region Issues

**Problem**: Blur regions don't appear

**Solutions:**
1. Ensure selection was large enough (20x20px minimum)
2. Refresh the page after creating blur
3. Check browser console for errors
4. Verify extension permissions

**Problem**: Blur regions disappear after scroll

**This shouldn't happen!** If it does:
1. Note the website URL
2. Check browser console for errors
3. Try removing and recreating the blur
4. Report as a bug on GitHub

**Problem**: Blur regions in wrong position

**Solutions:**
1. This indicates a bug - report it
2. Clear all blurs and recreate them
3. Try on a different website to confirm

### Storage Issues

**Problem**: "Storage quota exceeded" error

**Solutions:**
1. Clear blurs on sites you don't use
2. Each hostname has a storage limit
3. Remove old blur regions
4. Consider which sites really need blurs

**Problem**: Blur regions not syncing

**Check:**
1. Is Chrome Sync enabled?
2. Are you logged into Chrome?
3. Check sync settings in Chrome
4. Wait a few minutes for sync to complete

### Browser Compatibility

**Chrome/Chromium-based browsers:**
- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Brave
- ✅ Opera

**Unsupported:**
- ❌ Firefox (requires adaptation)
- ❌ Safari (different extension system)

## Best Practices

### When to Use Blur App

**Good use cases:**
- Recording tutorials with sensitive data
- Taking screenshots of private information
- Sharing your screen in meetings
- Creating documentation with examples
- Protecting personal information

**Not ideal for:**
- Permanent content blocking (use an ad blocker)
- Replacing privacy settings
- Hiding illegal content
- Bypassing paywalls

### Privacy Considerations

**Remember:**
- Blurs are visual only
- Data is still in the HTML
- Screenshot/screen recording shows the blur
- The original content is still accessible in DevTools
- This is for visual privacy, not data protection

**For maximum privacy:**
1. Use in combination with privacy-focused browsers
2. Clear blur regions when done
3. Don't rely on it for sensitive transactions
4. Use HTTPS websites
5. Keep the extension updated

### Maintenance

**Regular cleanup:**
- Review active blur regions monthly
- Clear blurs on sites you no longer visit
- Update the extension when new versions release

**Backup (currently manual):**
- Blur regions are stored in Chrome storage
- Enabling Chrome Sync backs them up
- Future versions may include export/import

## Feature Requests & Feedback

The extension is under active development. Planned features:

- [ ] Adjustable blur intensity
- [ ] Different blur effects (pixelate, mosaic)
- [ ] Blur region resizing
- [ ] Blur region moving
- [ ] Keyboard shortcuts
- [ ] Export/import configurations
- [ ] Pattern-based auto-blur

Have ideas? Open an issue on GitHub!

## Quick Reference

| Action | Steps |
|--------|-------|
| Create blur | Click icon → Enable mode → Drag on page |
| Remove blur | Right-click on blur region |
| Remove all | Click icon → Clear All Blurs |
| Check count | Click icon → See number in popup |
| Disable mode | Click icon → Toggle button again |

---

**Need more help?** Check out:
- README.md for overview
- INSTALLATION.md for setup
- GitHub Issues for support
- test-page.html for practice
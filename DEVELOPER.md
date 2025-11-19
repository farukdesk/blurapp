# Developer Guide - Blur App Extension

This guide is for developers who want to understand, modify, or contribute to the Blur App extension.

## Architecture Overview

### Extension Components

```
┌─────────────────────────────────────────────┐
│                Chrome Browser                │
├─────────────────────────────────────────────┤
│  ┌──────────┐    ┌────────────────────┐    │
│  │  Popup   │    │  Content Script    │    │
│  │  (UI)    │───▶│  (Blur Logic)      │    │
│  └──────────┘    └────────────────────┘    │
│       │                    │                │
│       │                    │                │
│       ▼                    ▼                │
│  ┌─────────────────────────────────┐       │
│  │    Background Service Worker     │       │
│  └─────────────────────────────────┘       │
│                   │                         │
│                   ▼                         │
│  ┌─────────────────────────────────┐       │
│  │      Chrome Storage API          │       │
│  └─────────────────────────────────┘       │
└─────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Popup UI → Message → Content Script → Storage
                                        ↓
                                   DOM Update
                                        ↓
                                  Blur Region
```

## Core Files Explained

### manifest.json
**Purpose**: Extension configuration and permissions

**Key sections**:
- `manifest_version: 3` - Uses latest format
- `permissions` - What the extension can do
- `content_scripts` - Injected into web pages
- `background.service_worker` - Persistent background process
- `action` - Popup configuration

**Critical settings**:
```json
"host_permissions": ["<all_urls>"]  // Works on all sites
"run_at": "document_end"            // Load after DOM ready
```

### popup.js
**Purpose**: Handle popup UI interactions

**Main functions**:
- `updateBlurCount()` - Display active blur count
- Toggle selection mode via messaging
- Clear all blurs functionality
- Listen for storage changes

**Communication**:
```javascript
chrome.tabs.sendMessage(tabId, { action: 'toggleSelectionMode' })
```

### content.js
**Purpose**: Core blur functionality on web pages

**Key components**:

1. **State Management**
   - `selectionMode`: Boolean for drag mode
   - `blurRegions`: Array of blur data
   - `hostname`: Current site identifier

2. **Blur Region Object**
   ```javascript
   {
     id: "unique-id",
     x: 100,           // Absolute position
     y: 200,
     width: 300,
     height: 150,
     scrollX: 0,       // Scroll offset (for future use)
     scrollY: 0
   }
   ```

3. **Main Functions**
   - `createBlurOverlay()` - DOM element creation
   - `addBlurRegion()` - Save and render new blur
   - `removeBlurRegion()` - Delete blur
   - `updateBlurPositions()` - Maintain positions on scroll
   - `renderAllBlurs()` - Redraw all blurs

4. **Event Handlers**
   - `mousedown` - Start selection
   - `mousemove` - Update selection box
   - `mouseup` - Create blur
   - `scroll` - Update positions
   - `contextmenu` - Remove blur

### background.js
**Purpose**: Extension lifecycle management

**Features**:
- Installation notifications
- Storage cleanup (optional)
- Message routing (if needed)

**Minimal by design**: Most logic in content script for performance

## Storage Strategy

### Data Structure
```javascript
{
  "example.com": [
    { id: "...", x: 100, y: 200, width: 300, height: 150 },
    { id: "...", x: 500, y: 300, width: 200, height: 100 }
  ],
  "another-site.com": [
    { id: "...", x: 50, y: 50, width: 400, height: 200 }
  ]
}
```

### Storage API Choice

**Using `chrome.storage.sync`**:
- ✅ Syncs across devices
- ✅ Persists across sessions
- ⚠️ Limited to 100KB per item
- ⚠️ Slower than local storage

**Alternative: `chrome.storage.local`**:
- ✅ Larger quota (10MB)
- ✅ Faster access
- ❌ No cross-device sync

### Storage Operations
```javascript
// Save
await chrome.storage.sync.set({ [hostname]: blurRegions });

// Load
const result = await chrome.storage.sync.get([hostname]);

// Remove
await chrome.storage.sync.remove([hostname]);
```

## CSS Implementation

### Backdrop Filter
```css
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

**Why backdrop filter?**:
- GPU accelerated
- Native browser feature
- Better performance than canvas/SVG
- Works with dynamic content

### Positioning Strategy
```css
position: absolute;
left: [x]px;
top: [y]px;
```

**Why absolute?**:
- Independent of scroll position
- Stays with page content
- No layout reflow
- Simple coordinate system

### Z-Index Management
```css
z-index: 999999;  /* Blur overlays */
z-index: 1000000; /* Selection box */
```

**Consideration**: May conflict with site elements that use high z-index

## Message Passing

### Popup → Content Script
```javascript
// Popup sends
chrome.tabs.sendMessage(tabId, { 
  action: 'toggleSelectionMode' 
});

// Content receives
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleSelectionMode') {
    // Handle action
    sendResponse({ enabled: true });
  }
});
```

### Content Script → Popup
Storage changes automatically propagate via:
```javascript
chrome.storage.onChanged.addListener((changes, namespace) => {
  // React to changes
});
```

## Development Workflow

### Setup
1. Clone repository
2. Load unpacked in Chrome
3. Make changes
4. Reload extension
5. Test on target page

### Debugging

**Popup**:
```
Right-click popup → Inspect
```

**Content Script**:
```
F12 on any page → Console tab
```

**Background**:
```
chrome://extensions/ → Inspect views: service worker
```

### Common Debug Points

**Check if content script loaded**:
```javascript
console.log('Blur App content script loaded');
```

**Check storage**:
```javascript
chrome.storage.sync.get(null, (data) => console.log(data));
```

**Check messages**:
```javascript
console.log('Message received:', request);
```

## Extension Permissions

### Required Permissions

**storage**:
```javascript
chrome.storage.sync.set(...)
chrome.storage.sync.get(...)
```

**activeTab**:
```javascript
chrome.tabs.query({ active: true, currentWindow: true })
```

**scripting**:
```javascript
chrome.scripting.executeScript(...)
```

**notifications**:
```javascript
chrome.notifications.create(...)
```

### Host Permissions

**`<all_urls>`**: Required to inject content script on all sites

## Testing Strategy

### Manual Testing Checklist

- [ ] Create blur region
- [ ] Verify blur appears
- [ ] Scroll page
- [ ] Verify blur stays in place
- [ ] Refresh page
- [ ] Verify blur persists
- [ ] Right-click blur
- [ ] Verify blur removes
- [ ] Create multiple blurs
- [ ] Clear all blurs
- [ ] Test on different sites
- [ ] Test with Chrome Sync

### Edge Cases

1. **Very small selections**: Minimum 20x20px
2. **Overlapping blurs**: Each is independent
3. **Dynamic content**: Blurs stay at coordinates
4. **Zoom levels**: May affect precision
5. **Multiple tabs**: Each tracked separately

## Performance Optimization

### Current Optimizations

1. **Passive event listeners**:
   ```javascript
   window.addEventListener('scroll', handler, { passive: true });
   ```

2. **CSS-based blur**: No JavaScript rendering

3. **Minimal DOM queries**: Cache element references

4. **Debounced scroll**: Only update on scroll end (if needed)

### Potential Improvements

1. **Virtual scrolling**: For 100+ blur regions
2. **IndexedDB**: For larger datasets
3. **Web Workers**: Heavy computation (not needed currently)
4. **Intersection Observer**: Render only visible blurs

## Extension API Usage

### Chrome APIs Used

```javascript
chrome.storage.sync.*      // Persistent storage
chrome.tabs.*              // Tab management
chrome.runtime.*           // Messaging
chrome.notifications.*     // User notifications
```

### Manifest V3 Considerations

**Service worker limitations**:
- No DOM access
- Can't use XMLHttpRequest
- Must use async APIs
- Can be terminated anytime

**Migration from V2**:
- `background.page` → `background.service_worker`
- `browser_action` → `action`
- Host permissions separate from `permissions`

## Code Style

### JavaScript
- Use async/await for async operations
- Arrow functions for callbacks
- Const for immutable, let for mutable
- Template literals for strings
- Semicolons required

### CSS
- Use modern CSS (grid, flexbox)
- Mobile-first approach
- CSS custom properties for theming
- BEM naming (if needed)

### HTML
- Semantic HTML5
- Accessible markup
- Minimal inline styles

## Security Considerations

### Current Security Features

1. **No innerHTML**: Use textContent
2. **No eval**: Static code only
3. **CSP compliant**: No inline scripts in HTML
4. **Permission minimization**: Only needed permissions

### Future Considerations

1. **Content Security Policy**: Already enforced by Manifest V3
2. **Input validation**: Sanitize coordinates
3. **XSS prevention**: No user HTML injection
4. **Rate limiting**: Prevent storage abuse

## Contributing

### Adding New Features

1. **Fork repository**
2. **Create feature branch**
3. **Make changes**
4. **Test thoroughly**
5. **Update documentation**
6. **Submit PR**

### Code Review Checklist

- [ ] Follows existing style
- [ ] No security vulnerabilities
- [ ] Tested on multiple sites
- [ ] Documentation updated
- [ ] No console errors
- [ ] Manifest V3 compliant

## Future Roadmap

### Planned Features

1. **Adjustable blur intensity**
   - UI slider in popup
   - Store intensity per blur
   - Update backdrop-filter value

2. **Blur region resizing**
   - Drag handles on corners
   - Update stored coordinates
   - Re-render overlay

3. **Keyboard shortcuts**
   - Define in manifest
   - Toggle selection mode
   - Clear all blurs

4. **Export/Import**
   - JSON format
   - Download configuration
   - Import from file

5. **Pattern matching**
   - Regex-based auto-blur
   - CSS selector matching
   - Privacy rules engine

### Technical Debt

- Add TypeScript definitions
- Implement unit tests
- Add E2E tests
- Set up CI/CD
- Minify production builds

## Useful Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

## Getting Help

- Read existing documentation
- Check browser console
- Review GitHub issues
- Ask in discussions
- Submit detailed bug reports

---

**Happy coding!** 🚀
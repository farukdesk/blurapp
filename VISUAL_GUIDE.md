# Visual Guide - Blur App Extension

This document provides visual descriptions of the extension components.

## Extension Icon

The extension uses a circular gradient icon with concentric circles representing blur:

- **Colors**: Purple-to-blue gradient (#667eea to #764ba2)
- **Design**: Concentric circles on gradient background
- **Sizes**: 16x16, 32x32, 48x48, and 128x128 pixels

## Popup Interface

### Layout
```
┌─────────────────────────────┐
│   Blur App (Purple Header)  │
│ Blur specific areas...      │
├─────────────────────────────┤
│                             │
│  [🎯 Enable Selection Mode] │
│                             │
│  [🗑️ Clear All Blurs]       │
│                             │
├─────────────────────────────┤
│  How to use:                │
│  1. Click "Enable..."       │
│  2. Click and drag...       │
│  3. Blur regions persist... │
│  4. Right-click to remove   │
│                             │
│  Active blur regions: 0     │
└─────────────────────────────┘
```

### Color Scheme
- **Header Background**: Linear gradient (purple to darker purple)
- **Buttons**: Gradient purple (primary), light gray (secondary)
- **Body**: White with light gray info section
- **Text**: Dark gray (#333) for readability

### Button States
- **Default**: Purple gradient with white text
- **Hover**: Slight lift effect with shadow
- **Active** (Selection mode on): Green gradient

## Selection Mode

When selection mode is enabled:

### Visual Indicators
1. **Cursor**: Changes to crosshair (✛)
2. **Selection Box**: Blue dashed border with semi-transparent background
3. **Notification**: Top-right notification saying "Selection mode enabled"

### Selection Process
```
Step 1: Click and hold
   ↓
Step 2: Drag mouse
   ┌─────────────┐ ← Blue dashed box appears
   │             │
   │   DRAG...   │
   │             │
   └─────────────┘
   ↓
Step 3: Release mouse
   ╔═════════════╗ ← Blur region created
   ║   BLURRED   ║    (with backdrop filter)
   ╚═════════════╝
```

## Blur Region Appearance

### Visual Properties
- **Effect**: Backdrop filter blur (20px)
- **Background**: Semi-transparent black (rgba(0, 0, 0, 0.1))
- **Border**: 2px dashed purple-blue (rgba(102, 126, 234, 0.5))
- **Border on Hover**: Solid purple-blue (rgba(102, 126, 234, 0.8))
- **Z-index**: 999999 (appears above most content)

### Example
```
Before blur:
┌──────────────────────┐
│ Email: user@test.com │
│ Phone: 555-1234      │
└──────────────────────┘

After blur:
┌──────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← Blurred
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │ ← Blurred
└──────────────────────┘
```

## Test Page Layout

The test page includes:

1. **Header**: Purple gradient with title
2. **Instructions Section**: How to use the extension
3. **Cards Grid**: Sample data to blur (email, phone, credit card)
4. **Image Placeholder**: Visual content for blurring
5. **Data Table**: Tabular data with sensitive information
6. **Long Content**: For scroll testing
7. **Scroll Indicator**: Fixed bottom-right showing scroll position

### Sample Content Types
- Text cards with sensitive data
- Tables with multiple columns
- Image placeholders
- Info boxes and warnings
- Multi-column layouts

## Notification Messages

### Types
1. **Selection Mode Enabled**
   ```
   ┌────────────────────────────────────┐
   │ Selection mode enabled. Click and  │
   │ drag to blur areas.                │
   └────────────────────────────────────┘
   ```

2. **Selection Mode Disabled**
   ```
   ┌────────────────────────────────────┐
   │ Selection mode disabled.           │
   └────────────────────────────────────┘
   ```

### Styling
- **Position**: Fixed top-right (20px from edges)
- **Background**: Purple gradient
- **Text**: White, 14px
- **Animation**: Fade in/out
- **Duration**: 3 seconds
- **Shadow**: Subtle drop shadow

## Color Palette

### Primary Colors
```
Purple-Blue Gradient:
  Start: #667eea (Light Purple-Blue)
  End:   #764ba2 (Deep Purple)

Accent Colors:
  Green (Active):  #48bb78
  Red (Delete):    #e53e3e
  Gray (Info):     #f7fafc
```

### Text Colors
```
Primary Text:   #333333
Secondary Text: #4a5568
Light Text:     #718096
Link Color:     #667eea
```

## Responsive Behavior

### Popup Window
- **Width**: Fixed 320px
- **Height**: Auto (content-based)
- **Scrollable**: If content exceeds viewport

### Blur Regions
- **Position**: Absolute (stays with page content)
- **Scroll**: Maintains position relative to page
- **Resize**: Fixed size (no auto-resize currently)

## Interaction States

### Hover Effects
1. **Buttons**: Lift animation (translateY -2px) + shadow
2. **Blur Regions**: Border becomes solid and more opaque
3. **Cards**: Lift animation on test page

### Click Interactions
1. **Primary Button**: Ripple effect (visual feedback)
2. **Blur Region**: Right-click shows context action
3. **Links**: Standard link hover/click behavior

## Animation Timing

All animations use smooth easing:
```css
transition: all 0.3s ease;
```

### Specific Animations
- Button hover: 0.3s ease
- Notification fade: 0.3s ease in/out
- Border color change: 0.2s ease

## Accessibility Considerations

### Visual Indicators
- ✓ Clear button states
- ✓ High contrast text
- ✓ Visible focus indicators
- ✓ Descriptive icons (emoji + text)

### User Feedback
- ✓ Cursor changes indicate mode
- ✓ Notifications confirm actions
- ✓ Visual selection preview
- ✓ Hover effects on interactive elements

## Browser Chrome Integration

### Toolbar Icon
- Appears in Chrome toolbar
- Shows extension status
- Click opens popup
- Badge (future): Could show blur count

### Extension Menu
```
Extensions Menu (Puzzle Icon)
├── Blur App ⭐ (pinned)
│   ├── [Icon]
│   └── Click to open popup
```

## File Size Reference

```
manifest.json   ~1 KB   (Configuration)
popup.html      ~1 KB   (Interface structure)
popup.css       ~2 KB   (Styling)
popup.js        ~2 KB   (Functionality)
content.js      ~8 KB   (Main logic)
content.css     ~1 KB   (Styles)
background.js   ~1 KB   (Service worker)
icons/          ~9 KB   (All icon sizes)
Total Core:     ~26 KB  (Very lightweight!)
```

## Performance Characteristics

### Resource Usage
- **Memory**: Minimal (only blur region coordinates)
- **CPU**: Low (CSS-based blur, no JavaScript rendering)
- **Storage**: ~1-2 KB per website with blurs
- **Network**: None (completely offline)

### Render Performance
- Backdrop filter is GPU-accelerated
- No impact on page load time
- Instant blur creation/removal
- Smooth scrolling maintained

---

This visual guide helps understand the user experience and design decisions of the Blur App extension.
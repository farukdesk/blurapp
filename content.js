// Content script for Blur App
(function() {
  'use strict';

  let selectionMode = false;
  let startX, startY;
  let selectionBox = null;
  let blurRegions = [];
  const hostname = window.location.hostname;

  // Initialize blur regions from storage
  async function initBlurRegions() {
    const result = await chrome.storage.sync.get([hostname]);
    const storedBlurs = result[hostname] || [];
    
    blurRegions = storedBlurs;
    renderAllBlurs();
  }

  // Create a blur overlay element
  function createBlurOverlay(region) {
    const overlay = document.createElement('div');
    overlay.className = 'blur-app-overlay';
    overlay.dataset.blurId = region.id;
    
    // Set position and size
    overlay.style.position = 'absolute';
    overlay.style.left = region.x + 'px';
    overlay.style.top = region.y + 'px';
    overlay.style.width = region.width + 'px';
    overlay.style.height = region.height + 'px';
    overlay.style.backdropFilter = 'blur(20px)';
    overlay.style.WebkitBackdropFilter = 'blur(20px)';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    overlay.style.border = '2px dashed rgba(102, 126, 234, 0.5)';
    overlay.style.zIndex = '999999';
    overlay.style.pointerEvents = 'auto';
    overlay.style.cursor = 'move';
    
    // Add context menu to remove blur
    overlay.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeBlurRegion(region.id);
    });

    // Add hover effect
    overlay.addEventListener('mouseenter', () => {
      overlay.style.border = '2px solid rgba(102, 126, 234, 0.8)';
    });

    overlay.addEventListener('mouseleave', () => {
      overlay.style.border = '2px dashed rgba(102, 126, 234, 0.5)';
    });

    return overlay;
  }

  // Render all blur overlays
  function renderAllBlurs() {
    // Remove existing overlays
    document.querySelectorAll('.blur-app-overlay').forEach(el => el.remove());
    
    // Create new overlays
    blurRegions.forEach(region => {
      const overlay = createBlurOverlay(region);
      document.body.appendChild(overlay);
    });
  }

  // Update blur positions based on scroll
  function updateBlurPositions() {
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    document.querySelectorAll('.blur-app-overlay').forEach(overlay => {
      const blurId = overlay.dataset.blurId;
      const region = blurRegions.find(r => r.id === blurId);
      
      if (region) {
        // Update position based on original coordinates
        overlay.style.left = region.x + 'px';
        overlay.style.top = region.y + 'px';
      }
    });
  }

  // Save blur regions to storage
  async function saveBlurRegions() {
    await chrome.storage.sync.set({ [hostname]: blurRegions });
  }

  // Add a new blur region
  async function addBlurRegion(x, y, width, height) {
    const region = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(width),
      height: Math.round(height),
      scrollX: window.pageXOffset || document.documentElement.scrollLeft,
      scrollY: window.pageYOffset || document.documentElement.scrollTop
    };
    
    blurRegions.push(region);
    await saveBlurRegions();
    
    const overlay = createBlurOverlay(region);
    document.body.appendChild(overlay);
  }

  // Remove a blur region
  async function removeBlurRegion(id) {
    blurRegions = blurRegions.filter(r => r.id !== id);
    await saveBlurRegions();
    
    const overlay = document.querySelector(`[data-blur-id="${id}"]`);
    if (overlay) {
      overlay.remove();
    }
  }

  // Clear all blur regions
  async function clearAllBlurs() {
    blurRegions = [];
    await saveBlurRegions();
    document.querySelectorAll('.blur-app-overlay').forEach(el => el.remove());
  }

  // Create selection box
  function createSelectionBox() {
    if (selectionBox) return;
    
    selectionBox = document.createElement('div');
    selectionBox.className = 'blur-app-selection-box';
    selectionBox.style.position = 'absolute';
    selectionBox.style.border = '2px dashed #667eea';
    selectionBox.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    selectionBox.style.zIndex = '1000000';
    selectionBox.style.pointerEvents = 'none';
    document.body.appendChild(selectionBox);
  }

  // Mouse event handlers for selection mode
  function handleMouseDown(e) {
    if (!selectionMode) return;
    if (e.target.classList.contains('blur-app-overlay')) return;
    
    e.preventDefault();
    
    startX = e.pageX;
    startY = e.pageY;
    
    createSelectionBox();
    selectionBox.style.left = startX + 'px';
    selectionBox.style.top = startY + 'px';
    selectionBox.style.width = '0px';
    selectionBox.style.height = '0px';
    selectionBox.style.display = 'block';
  }

  function handleMouseMove(e) {
    if (!selectionMode || !selectionBox || selectionBox.style.display === 'none') return;
    
    const currentX = e.pageX;
    const currentY = e.pageY;
    
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    
    selectionBox.style.left = left + 'px';
    selectionBox.style.top = top + 'px';
    selectionBox.style.width = width + 'px';
    selectionBox.style.height = height + 'px';
  }

  function handleMouseUp(e) {
    if (!selectionMode || !selectionBox || selectionBox.style.display === 'none') return;
    
    const currentX = e.pageX;
    const currentY = e.pageY;
    
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    
    // Only create blur if selection is large enough
    if (width > 20 && height > 20) {
      addBlurRegion(left, top, width, height);
    }
    
    selectionBox.style.display = 'none';
  }

  // Toggle selection mode
  function toggleSelectionMode() {
    selectionMode = !selectionMode;
    
    if (selectionMode) {
      document.body.style.cursor = 'crosshair';
      // Show notification
      showNotification('Selection mode enabled. Click and drag to blur areas.');
    } else {
      document.body.style.cursor = '';
      if (selectionBox) {
        selectionBox.style.display = 'none';
      }
      showNotification('Selection mode disabled.');
    }
    
    return selectionMode;
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'blur-app-notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '10000000';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.fontSize = '14px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.animation = 'blur-app-fade-in 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'blur-app-fade-out 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleSelectionMode') {
      const enabled = toggleSelectionMode();
      sendResponse({ enabled });
    } else if (request.action === 'clearAllBlurs') {
      clearAllBlurs();
      sendResponse({ success: true });
    }
    return true;
  });

  // Initialize
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Update blur positions on scroll
  window.addEventListener('scroll', updateBlurPositions, { passive: true });
  
  // Load saved blur regions when page loads
  initBlurRegions();

  // Re-render blurs on window resize
  window.addEventListener('resize', updateBlurPositions);
})();

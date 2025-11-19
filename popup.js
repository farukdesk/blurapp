// Popup script for Blur App
document.addEventListener('DOMContentLoaded', async () => {
  const toggleBtn = document.getElementById('toggleBlur');
  const clearBtn = document.getElementById('clearBlurs');
  const toggleText = document.getElementById('toggleText');
  const toggleIcon = document.getElementById('toggleIcon');
  const blurCountEl = document.getElementById('blurCount');

  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const hostname = url.hostname;

  // Update blur count
  async function updateBlurCount() {
    const result = await chrome.storage.sync.get([hostname]);
    const blurs = result[hostname] || [];
    blurCountEl.textContent = blurs.length;
  }

  // Initialize blur count
  await updateBlurCount();

  // Toggle blur selection mode
  toggleBtn.addEventListener('click', async () => {
    try {
      // Send message to content script to toggle selection mode
      const response = await chrome.tabs.sendMessage(tab.id, { 
        action: 'toggleSelectionMode' 
      });
      
      if (response && response.enabled) {
        toggleBtn.classList.add('active');
        toggleText.textContent = 'Selection Mode Active';
        toggleIcon.textContent = '✅';
      } else {
        toggleBtn.classList.remove('active');
        toggleText.textContent = 'Enable Selection Mode';
        toggleIcon.textContent = '🎯';
      }
    } catch (error) {
      console.error('Error toggling blur mode:', error);
    }
  });

  // Clear all blurs for current site
  clearBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all blur regions on this site?')) {
      try {
        // Remove from storage
        await chrome.storage.sync.remove([hostname]);
        
        // Send message to content script to remove all blurs
        await chrome.tabs.sendMessage(tab.id, { 
          action: 'clearAllBlurs' 
        });
        
        await updateBlurCount();
      } catch (error) {
        console.error('Error clearing blurs:', error);
      }
    }
  });

  // Listen for storage changes to update count
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes[hostname]) {
      updateBlurCount();
    }
  });
});

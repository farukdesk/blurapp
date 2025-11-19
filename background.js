// Background service worker for Blur App

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Blur App installed successfully!');
    
    // Open welcome page or show notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Blur App Installed',
      message: 'Click the extension icon to start blurring areas on any website!',
      priority: 2
    });
  } else if (details.reason === 'update') {
    console.log('Blur App updated to version', chrome.runtime.getManifest().version);
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle any background tasks if needed
  if (request.action === 'getStorageData') {
    chrome.storage.sync.get(null, (data) => {
      sendResponse({ data });
    });
    return true;
  }
});

// Clean up old data periodically (optional)
chrome.alarms.create('cleanupOldData', { periodInMinutes: 1440 }); // Once per day

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cleanupOldData') {
    // Implement cleanup logic if needed
    console.log('Running cleanup...');
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.shortcut) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: 'SHORTCUT_UPDATED',
            payload: changes.shortcut.newValue
          }, () => {
            if (chrome.runtime.lastError) {
              console.log("Error sending message to tab:", tab.id, chrome.runtime.lastError.message);
            }
          });
          chrome.tabs.reload(tab.id); 
        }
      });
    });
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.sync.get(['shortcut'], (result) => {
      if (!result.shortcut && details.reason === 'install') {
        const defaultShortcut = {
          ctrl: false,
          alt: false, 
          shift: true,
          meta: false, 
          code: 'Space',
          keyView: 'Space'
        };

        chrome.storage.sync.set({ shortcut: defaultShortcut }, () => {
          console.log('Default shortcut set:', defaultShortcut);
          chrome.runtime.sendMessage({
            type: "SHORTCUT_UPDATED",
            payload: defaultShortcut
          }, () => {
            if (chrome.runtime.lastError) {
              console.log("Error sending default shortcut message to popup:", chrome.runtime.lastError.message);
            }
          });
        });
      }
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          if (tab.id) chrome.tabs.reload(tab.id);
        });
      });
    });
  }
});

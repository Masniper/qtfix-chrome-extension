
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});


chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.shortcut) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHORTCUT_UPDATED',
          payload: changes.shortcut.newValue
        }, () => {
          if (chrome.runtime.lastError) {
          }
        });
      });
    });
  }
});

const shortcutInput = document.getElementById('shortcutInput');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const message = document.getElementById('message');

let editing = false;
let capturedShortcut = null;

function shortcutToString(obj) {
  let parts = [];
  if (obj.ctrl) parts.push('Ctrl');
  if (obj.alt) parts.push('Alt');
  if (obj.shift) parts.push('Shift');
  if (obj.key) parts.push(obj.key.toUpperCase());
  return parts.join(' + ');
}

function parseShortcut(event) {
  return {
    ctrl: event.ctrlKey,
    alt: event.altKey,
    shift: event.shiftKey,
    key: event.key.length === 1 ? event.key.toLowerCase() : '' 
  };
}

function showShortcut(obj) {
  shortcutInput.value = shortcutToString(obj);
}

chrome.storage.sync.get(['shortcut'], (result) => {
  const shortcut = result.shortcut || {ctrl: true, alt: true, shift: false, key: 'm'};
  showShortcut(shortcut);
  capturedShortcut = shortcut;
});

editBtn.onclick = () => {
  editing = true;
  saveBtn.style.display = '';
  cancelBtn.style.display = '';
  editBtn.style.display = 'none';
  shortcutInput.value = '';
  shortcutInput.placeholder = '[شورتکات را فشار دهید]';
  shortcutInput.focus();
};

cancelBtn.onclick = () => {
  editing = false;
  showShortcut(capturedShortcut);
  saveBtn.style.display = 'none';
  cancelBtn.style.display = 'none';
  editBtn.style.display = '';
  shortcutInput.placeholder = '';
  message.textContent = '';
};

shortcutInput.onkeydown = (e) => {
  if (!editing) return;
  if (
    (e.ctrlKey || e.altKey || e.shiftKey) &&
    e.key.length === 1 
  ) {
    e.preventDefault();
    capturedShortcut = parseShortcut(e);
    showShortcut(capturedShortcut);
  } else if (
    (e.ctrlKey || e.altKey || e.shiftKey) &&
    ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab','Esc','Escape'].indexOf(e.key) === -1
  ) {
    e.preventDefault();
  }
};

saveBtn.onclick = (e) => {
  e.preventDefault();
  if (!capturedShortcut || !capturedShortcut.key) {
    message.textContent = "شورتکات نامعتبره.";
    return;
  }
  chrome.storage.sync.set({shortcut: capturedShortcut}, () => {
    message.textContent = "شورتکات جدید ذخیره شد!";
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    editBtn.style.display = '';
    shortcutInput.placeholder = '';
    editing = false;
  });
};

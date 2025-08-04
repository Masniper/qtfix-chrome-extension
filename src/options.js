document.addEventListener('DOMContentLoaded', () => {
  const shortcutDisplay = document.getElementById('shortcutDisplay');
  const editBtn = document.getElementById('editBtn');
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const shortcutInput = document.getElementById('shortcutInput');
  const message = document.getElementById('message');
  let editing = false;
  let capturedShortcut = null, previousShortcut = null;

  chrome.storage.sync.get(['shortcut'], (result) => {
    if (result.shortcut) {
      shortcutDisplay.textContent = shortcutToString(result.shortcut);
      capturedShortcut = result.shortcut;
    } else {
      let def = {ctrl: true, alt: true, shift: false, meta: false, code: 'KeyM', keyView: 'M'};
      shortcutDisplay.textContent = shortcutToString(def);
      capturedShortcut = def;
    }
  });

  function shortcutToString(s) {
    if (!s || !s.code) return "";
    let parts = [];
    if (s.meta) parts.push(/mac/i.test(window.navigator.userAgent) ? '⌘' : 'Win');
    if (s.ctrl) parts.push('Ctrl');
    if (s.alt) parts.push(/mac/i.test(window.navigator.userAgent) ? 'Option' : 'Alt');
    if (s.shift) parts.push('Shift');
    parts.push(s.keyView || s.code.replace(/^Key|Digit/, ''));
    return parts.join(' + ');
  }

  editBtn.onclick = (e) => {
    e.preventDefault();
    if (editing) return;
    editing = true;
    shortcutInput.style.display = '';
    shortcutInput.focus();
    saveBtn.style.display = '';
    cancelBtn.style.display = '';
    editBtn.style.display = 'none';
    shortcutInput.value = '';
    message.textContent = "کلیدهای شورتکات مورد نظر را بزنید...";
    previousShortcut = {...capturedShortcut};
  };

  shortcutInput.addEventListener('keydown', function captureShortcut(e) {
    if (!editing) return;
    e.preventDefault();
    if (
      e.key === "Control" || e.key === "Alt" || e.key === "Shift" || e.key === "Meta"
    ) {
      shortcutInput.value = '';
      return;
    }
    capturedShortcut = {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      shift: e.shiftKey,
      meta: e.metaKey,
      code: e.code,
      keyView: getHumanKey(e)
    };
    shortcutInput.value = shortcutToString(capturedShortcut);
  });

  function getHumanKey(e) {
    if (/^(Key|Digit)[A-Z0-9]$/i.test(e.code)) {
      return e.key.length == 1 ? e.key.toUpperCase() : e.code.replace(/^Key|Digit/, '');
    }
    const specials = {
      'Space': 'Space',
      'Escape': 'Esc',
      'Backspace': 'Back',
      'Enter': 'Enter',
      'Tab': 'Tab',
      'CapsLock': 'Caps',
      'ContextMenu': 'Menu',
      'Minus': '-',
      'Equal': '=',
      'Comma': ',',
      'Period': '.',
      'Slash': '/',
      'Backquote': '`',
      'BracketLeft': '[',
      'BracketRight': ']',
      'Semicolon': ';',
      'Quote': "'",
      'Backslash': `"\"`,
    };

    if (e.shiftKey) {
      if (e.code === 'Digit4') return '$';
    }
    return specials[e.code] || e.key;
  }

  saveBtn.onclick = (e) => {
    e.preventDefault();
    if (!capturedShortcut || !capturedShortcut.code) {
      message.textContent = "شورتکات نامعتبر است.";
      return;
    }
    chrome.storage.sync.set({shortcut: capturedShortcut}, () => {
      shortcutDisplay.textContent = shortcutToString(capturedShortcut);
      message.textContent = "شورتکات جدید ذخیره شد!";
      finishEditing();
      chrome.runtime.sendMessage({
        type: "SHORTCUT_UPDATED",
        payload: capturedShortcut
      }, () => { if (chrome.runtime.lastError) {} });
    });
  };

  cancelBtn.onclick = (e) => {
    e.preventDefault();
    capturedShortcut = {...previousShortcut};
    finishEditing();
    message.textContent = "تغییری اعمال نشد.";
  };

  function finishEditing() {
    shortcutInput.style.display = 'none';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    editBtn.style.display = '';
    shortcutInput.value = '';
    editing = false;
  }
});

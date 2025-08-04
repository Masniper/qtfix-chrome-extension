import { faToEnMap, enToFaMap, convert, detectLang } from "./utils/layout.js";

const DEFAULT_SHORTCUT = {
  ctrl: true,
  alt: true,
  shift: false,
  key: 'm' 
};

let currentShortcut = DEFAULT_SHORTCUT;

chrome.storage.sync.get(['shortcut'], (result) => {
  if (result.shortcut) {
    currentShortcut = result.shortcut;
  }
});

function isShortcut(e) {
  return (
    e.ctrlKey === !!currentShortcut.ctrl &&
    e.altKey === !!currentShortcut.alt &&
    e.shiftKey === !!currentShortcut.shift &&
    e.key.toLowerCase() === currentShortcut.key
  );
}

function handleConvert(e) {
  if (!isShortcut(e)) return;

  const el = document.activeElement;
  if (
    el &&
    (
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.isContentEditable
    )
  ) {
    e.preventDefault();

    let value, selStart, selEnd;

    if (el.isContentEditable) {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        let selectedText = range.toString();
        if (selectedText.length > 0) {
          const lang = detectLang(selectedText.replace(/\s/g, '')); // فقط حروف
          const mapping = lang === 'fa' ? faToEnMap : enToFaMap;
          const converted = convert(selectedText, mapping);

          document.execCommand('insertText', false, converted);
        }
      }
      return;
    }

    value = el.value;
    selStart = el.selectionStart;
    selEnd = el.selectionEnd;
    let selected = value.substring(selStart, selEnd);

    if (selected.length > 0) {
      const lang = detectLang(selected.replace(/\s/g, ''));
      const mapping = lang === 'fa' ? faToEnMap : enToFaMap;
      const converted = convert(selected, mapping);

      el.setRangeText(converted, selStart, selEnd, 'end');
    } else {
      const lang = detectLang(value.replace(/\s/g, ''));
      const mapping = lang === 'fa' ? faToEnMap : enToFaMap;
      const converted = convert(value, mapping);
      el.value = converted;
      el.setSelectionRange(converted.length, converted.length);
    }
  }
}

document.addEventListener('keydown', handleConvert, true);

const faToEnMap = {
  'ض':'q','ص':'w','ث':'e','ق':'r','ف':'t','غ':'y','ع':'u','ه':'i','خ':'o','ح':'p',
  'ج':'[','چ':']','ش':'a','س':'s','ی':'d','ب':'f','ل':'g','ا':'h','ت':'j','ن':'k',
  'م':'l','ک':';','گ':"'",'ظ':'z','ط':'x','ز':'c','ر':'v','ذ':'b','د':'n','پ':'m',
  'و':',','؟':'?',' ':' '
};
const enToFaMap = {}; Object.entries(faToEnMap).forEach(([fa, en]) => { enToFaMap[en] = fa; });

function convert(str, direction) {
  const map = direction === "fa" ? faToEnMap : enToFaMap;
  return str.split('').map(ch => map[ch] ?? ch).join('');
}
function detectLang(word) {
  const faRegex = /^[\u0600-\u06FF]+$/;
  const enRegex = /^[a-zA-Z]+$/;
  if(faRegex.test(word)) return 'fa';
  if(enRegex.test(word)) return 'en';
  return 'other';
}

function isWritableInput(el) {
  if (!el) return false;
  if (el.tagName === 'INPUT') {
    const editables = [
      'text', 'search', 'tel', 'url', 'email', 'password', 'number'
    ];
    return editables.includes(el.type) && !el.readOnly && !el.disabled;
  }
  if (el.tagName === 'TEXTAREA') return !el.readOnly && !el.disabled;
  if (el.isContentEditable) return true;
  return false;
}

function isShortcut(e, shortcut) {
  if (!shortcut) return false;
  return (
    !!e.ctrlKey === !!shortcut.ctrl &&
    !!e.altKey === !!shortcut.alt && 
    !!e.shiftKey === !!shortcut.shift &&
    !!e.metaKey === !!shortcut.meta &&
    e.code === shortcut.code
  );
}

let shortcut = {
  ctrl: true, alt: true, shift: false, meta: false, code: 'KeyM', keyView: 'M'
};
chrome.storage.sync.get(["shortcut"], (result) => {
  if (result.shortcut) shortcut = result.shortcut;
});
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SHORTCUT_UPDATED") shortcut = msg.payload;
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

function handleConvert(element) {
  let text;
  if (element.isContentEditable) {
    let sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      let range = sel.getRangeAt(0);
      text = range.toString();
      if (text) {
        let targetLang = detectLang(text);
        let converted = convert(text, targetLang === "fa" ? "fa" : "en");
        range.deleteContents();
        range.insertNode(document.createTextNode(converted));
      }
      return;
    } else {
      text = element.innerText;
      let targetLang = detectLang(text);
      let converted = convert(text, targetLang === "fa" ? "fa" : "en");
      element.innerText = converted;
      return;
    }
  }
  let start = element.selectionStart, end = element.selectionEnd;
  text = element.value;
  if (start != null && end != null && start !== end) {
    let selected = text.slice(start, end);
    let targetLang = detectLang(selected);
    let converted = convert(selected, targetLang === "fa" ? "fa" : "en");
    element.setRangeText(converted, start, end, "end");
  } else {
    let targetLang = detectLang(text);
    let converted = convert(text, targetLang === "fa" ? "fa" : "en");
    element.value = converted;
  }
}

document.addEventListener("keydown", (e) => {
  const el = document.activeElement;
  if (isWritableInput(el)) {
    if (isShortcut(e, shortcut)) {
      e.preventDefault();
      handleConvert(el);
    }
  }
});

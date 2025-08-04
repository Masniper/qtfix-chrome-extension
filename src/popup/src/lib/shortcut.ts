export type Shortcut = {
  meta?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  code: string;      
  keyView?: string;  
};

export const defaultShortcut: Shortcut = {
  ctrl: true,
  alt: false,
  shift: true,
  meta: false,
  code: "Space",
  keyView: "Space",
};

const faToEnMap: Record<string, string> = {
  'ض':'q','ص':'w','ث':'e','ق':'r','ف':'t','غ':'y','ع':'u','ه':'i','خ':'o','ح':'p',
  'ج':'[','چ':']','ش':'a','س':'s','ی':'d','ب':'f','ل':'g','ا':'h','ت':'j','ن':'k',
  'م':'l','ک':';','گ':"'",'ظ':'z','ط':'x','ز':'c','ر':'v','ذ':'b','د':'n','پ':'m',
  'و':',','؟':'?',' ':' '
};
const enToFaMap: Record<string, string> = {};
Object.entries(faToEnMap).forEach(([fa, en]) => (enToFaMap[en] = fa));

const enNums = '0123456789';
const faNums = '۰۱۲۳۴۵۶۷۸۹';

const specialKeysMap: Record<string, { en: string, fa: string }> = {
  'Space':       { en: 'Space',     fa: 'اسپیس'    },
  'Tab':         { en: 'Tab',       fa: 'تب'       },
  'Enter':       { en: 'Enter',     fa: 'اینتر'    },
  'Backspace':   { en: 'Backspace', fa: 'بک‌اسپیس' },
  'Escape':      { en: 'Esc',       fa: 'اسکِیپ'   },
  'Delete':      { en: 'Delete',    fa: 'دیلیت'    },
  'Insert':      { en: 'Insert',    fa: 'اینسرت'   },
  'Home':        { en: 'Home',      fa: 'هوم'      },
  'End':         { en: 'End',       fa: 'اند'      },
  'PageUp':      { en: 'PgUp',      fa: 'پیج‌آپ'   },
  'PageDown':    { en: 'PgDn',      fa: 'پیج‌داون' },
  'ArrowLeft':   { en: '←',         fa: 'جهت چپ'   },
  'ArrowRight':  { en: '→',         fa: 'جهت راست' },
  'ArrowUp':     { en: '↑',         fa: 'جهت بالا' },
  'ArrowDown':   { en: '↓',         fa: 'جهت پایین'},
  'F1':    { en: 'F1',  fa: 'F1'  },
  'F2':    { en: 'F2',  fa: 'F2'  },
  'F3':    { en: 'F3',  fa: 'F3'  },
  'F4':    { en: 'F4',  fa: 'F4'  },
  'F5':    { en: 'F5',  fa: 'F5'  },
  'F6':    { en: 'F6',  fa: 'F6'  },
  'F7':    { en: 'F7',  fa: 'F7'  },
  'F8':    { en: 'F8',  fa: 'F8'  },
  'F9':    { en: 'F9',  fa: 'F9'  },
  'F10':   { en: 'F10', fa: 'F10' },
  'F11':   { en: 'F11', fa: 'F11' },
  'F12':   { en: 'F12', fa: 'F12' }
};

function convertChar(char: string, lang: "en" | "fa"): string {
  if (lang === "en") {
    if (faNums.includes(char)) return enNums[faNums.indexOf(char)];
    if (faToEnMap[char]) return faToEnMap[char];
    return char;
  } else {
    if (enNums.includes(char)) return faNums[enNums.indexOf(char)];
    if (enToFaMap[char]) return enToFaMap[char];
    return char;
  }
}

export function shortcutToString(
  s: Shortcut | null,
  lang: "en" | "fa" = "en"
): string[] {
  if (!s || !s.code) return [];
  let parts: string[] = [];
  const isMac = /mac/i.test(window.navigator.userAgent);

  if (s.meta) parts.push(isMac ? "⌘" : lang === "fa" ? "ویندوز" : "Win");
  if (s.ctrl) parts.push(lang === "fa" ? "کنترل" : "Ctrl");
  if (s.alt)
    parts.push(
      isMac
        ? lang === "fa"
          ? "اختیار"
          : "Option"
        : lang === "fa"
        ? "آلت"
        : "Alt"
    );
  if (s.shift) parts.push(lang === "fa" ? "شیفت" : "Shift");

  let keyName = s.keyView || '';
  let code = s.code;

  if (specialKeysMap[code]) {
    keyName = specialKeysMap[code][lang];
  } else {
    keyName = s.keyView ?? code.replace(/^Key|^Digit/, '');
    keyName = [...keyName].map(ch => convertChar(ch, lang)).join('');
  }

  parts.push(keyName);
  return parts;
}

export function getHumanKey(e: KeyboardEvent): string {
  if (/^(Key|Digit)[A-Z0-9]$/i.test(e.code)) {
    return e.key.length === 1
      ? e.key.toUpperCase()
      : e.code.replace(/^Key|Digit/, "");
  }
  const specials: Record<string, string> = {
    Space: "Space",
    Escape: "Esc",
    Backspace: "Back",
    Enter: "Enter",
    Tab: "Tab",
    CapsLock: "Caps",
    ContextMenu: "Menu",
    Minus: "-",
    Equal: "=",
    Comma: ",",
    Period: ".",
    Slash: "/",
    Backquote: "`",
    BracketLeft: "[",
    BracketRight: "]",
    Semicolon: ";",
    Quote: "'",
    Backslash: `"\"`,
  };
  return specials[e.code] ?? e.key;
}




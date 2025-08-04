export const faToEnMap = {
  'ض': 'q', 'ص': 'w', 'ث': 'e', 'ق': 'r', 'ف': 't', 'غ': 'y', 'ع': 'u', 'ه': 'i', 'خ': 'o', 'ح': 'p',
  'ج': '[', 'چ': ']', 'ش': 'a', 'س': 's', 'ی': 'd', 'ب': 'f', 'ل': 'g', 'ا': 'h', 'ت': 'j', 'ن': 'k',
  'م': 'l', 'ک': ';', 'گ': "'", 'ظ': 'z', 'ط': 'x', 'ز': 'c', 'ر': 'v', 'ذ': 'b', 'د': 'n', 'پ': 'm',
  'و': ',', '؟': '?', ' ': ' '
};
export const enToFaMap = {};
Object.entries(faToEnMap).forEach(([fa, en]) => {
  enToFaMap[en] = fa;
});

export function convert(str, map) {
  return str
    .split('')
    .map(ch => map[ch] ?? ch)
    .join('');
}

export function detectLang(word) {
  const faRegex = /^[\u0600-\u06FF]+$/;
  const enRegex = /^[a-zA-Z]+$/;
  if(faRegex.test(word)) return 'fa';
  if(enRegex.test(word)) return 'en';
  return 'other';
}

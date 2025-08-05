# QTFix: Instantly Fix Text Typed With the Wrong Keyboard

A modern Chrome extension to **instantly fix Persian ↔ English text typed with the wrong keyboard, anywhere you type** — just press your shortcut and it’s done! No need to delete or re-write anything.

![Extension Icon](./icons/icon128.png)

---

## ✨ What is QTFix?

Typed with the wrong keyboard?  
Don’t worry! Just keep the cursor in your input, hit your shortcut, and **QTFix** will fix it for you — works everywhere

---

## How to Use

1. Click in the input where you typed the messed-up text.
2. Press your chosen shortcut (default is usually `Shift + Space`, but you can set your own).
3. Instantly, your text is fixed! You *don’t* need to select or delete anything.

---

## Features

- **Fix mixed-up Persian/English text instantly**, anywhere you type.
- Works in everywhere.**
- Converts both ways (English ↔ Persian) with one shortcut.
- *No need* to select or erase any text.
- **Works fully offline** — your text never leaves your computer.
- **Customizable keyboard shortcut:** Set whatever combo you like.
- Handles **Right-to-Left (RTL), Left-to-Right (LTR), and mixed texts.**
- **Persian and English number** support.
- Fully **open-source** & privacy-focused.

---

## 🧩 Manual Installation

1. Download [qtfix-chrome-extension.zip](./release/qtfix-chrome-extension.zip) from this repository.
2. Unzip it anywhere on your computer.
3. Go to `chrome://extensions/` in your browser.
4. Turn on “Developer mode”.
5. Click “Load unpacked” and select the unpacked folder.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/masniper/QTFix.git
cd QTFix
```

### 2. Install Dependencies

```bash
cd src/popup
npm install
```

### 3. Build the Popup

```bash
npm run build
```

Generated files will appear in `dist/popup`.

### 4. Load the Extension in Chrome

- Go to `chrome://extensions/`
- Enable **Developer mode**
- Click **Load unpacked** and select the **root** QTFix folder
- The extension icon should appear in your toolbar.

---

## Development

- **Pop-up UI:**  
Located in `src/popup` (Vite + React + TypeScript)
- **Background/Content scripts:**  
Located in `src/background.js`, `src/content.js`

To develop the popup with hot reload:

```bash
cd src/popup
npm run dev
```

---

## Contributing

Pull requests are welcome! For major changes, please [open an issue first](https://github.com/masniper/QTFix/issues).

**GitHub:** [masniper](https://github.com/masniper/)  
**Report issues:** [Email](mailto:mohammad.alii.shahsavari@gmail.com?subject=QTFix%20Bug%20Report)

---

## License

MIT — free to use, just keep the author's name.

---

## فارسی 🇮🇷

### کیوتی فیکس : تبدیل فوری متن اشتباهی به زبان درست!  

برای همه‌ی کسانی که یه جا متن رو با کیبورد اشتباهی نوشتن — حالا چه فارسی چه انگلیسی —  
کافیـه روی همون کادر متنی باشی، میانبرت رو بزنی، کیوتی فیکس خودش متن رو برات درست میکنه.  
لازم نیست چیزی رو انتخاب یا پاک کنی.تو هرجا که فکرش رو بکنی کار می‌کنه!

---

### روش استفاده

۱. نشانگر موس رو روی کادری بذار که متن اشتباهی نوشتی  
۲. کلید میانبر (مثلاً `Shift + Space`) رو بزن — می‌تونی خودت هم براش میانبر دلخواه بذاری  
۳. متن همون لحظه به فارسی یا انگلیسی درست میشه. نیاز به انتخاب یا پاک کردن نیست!

---

### ویژگی‌ها

**تبدیل فوری متن انگلیسی/فارسی اشتباه، هرجا که تایپ کنی!**

۱ چت، پیام‌رسان، مرورگر، یادداشت و…

۲ تبدیل دوطرفه (انگلیسی ↔ فارسی) با یه میانبر

۳ لازم نیست چیزی رو پاک یا انتخاب کنی

۴ کاملاً آفلاین و بدون هیچ ارسال یا ردیابی

۵ کلید میانبر کاملاً قابل سفارشی‌سازی

۶ پشتیبانی از متون راست‌به‌چپ و چپ‌به‌راست و متون ترکیبی

۷ اعداد فارسی و انگلیسی

۸ متن‌باز و رایگان

---
## نصب دستی 

۱. فایل [qtfix-chrome-extension.zip](./release/qtfix-chrome-extension.zip) رو از این مخزن بگیر و استخراج کن.
۲. وارد کروم شو آدرس  `chrome://extensions/` رو بزن.
۳. حالت توسعه‌دهنده (Developer mode) رو فعال کن.
۴. روی “بارگذاری افزونه unpacked” کلیک کن و پوشه استخراج‌شده رو انتخاب کن.

---

### نصب و راه‌اندازی برای توسعه‌دهنده‌ها

1. ریپازیتوری رو کلون کن:
    ```bash
    git clone https://github.com/masniper/QTFix.git
    cd QTFix
    ```
2. وابستگی‌ها رو نصب کن:
    ```bash
    cd src/popup
    npm install
    ```
3. نسخه نهایی رو بساز:
    ```bash
    npm run build
    ```
    خروجی توی `dist/popup` ذخیره میشه.
4. افزونه رو اضافه کن (برای تست یا توسعه):
    - برو به `chrome://extensions/`
    - حالت توسعه‌دهنده رو فعال کن
    - روی **Load unpacked** بزن و پوشه پروژه رو انتخاب کن

---

### مشارکت و ارتباط

- گزارش خطا یا نظر در issues گیت‌هاب
- یا ایمیل: mohammad.alii.shahsavari@gmail.com
- گیت‌هاب سازنده: [masniper](https://github.com/masniper/)

---

### لایسنس

انتشار تحت مجوز MIT  
آزاد برای همه؛ فقط لطف کن اسم نویسنده رو حذف نکن 😉

---

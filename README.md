# WebContents Preload bug

### **`Uncaught Error: Module did not self-register.`**

This behaviour is also happening in `webContents` using the new feature `nativeWindowOpen` and this happens every time when you open a new window using `window.open` or `_blank`

## How to reproduce

```bash
git clone https://github.com/KiranNiranjan/electron-preload-bug.git
npm i
npm run build
npm run start
```
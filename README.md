# Modal Issue on Windows

## Modal window does not appear on top of the parent window when the parent window is placed in a different monitor

### Expected behavior

If the electron main window is placed in a different display/monitor other than primary display and opening the modal window should appear on top of the electron main window.

### Actual behavior

Child modal window appears in the primary display rather than on the display/monitor the electron main window is present

### Fix

Calculating the center of the main window and updating the modal properties

```javascript 1.8

const { x, y, width, height } = parentWindow.getBounds();

const windowWidth = Math.round(width * 0.5);
const windowHeight = Math.round(height * 0.5);

// Calculating the center of the primary display
// to place the wrapper
const centerX = x + width / 2.0;
const centerY = y + height / 2.0;

// Update the child modal with the new values 
modalWindow.x = Math.round(centerX - (windowWidth / 2.0));
modalWindow.y = Math.round(centerY - (windowHeight / 2.0));

```

## How to reproduce

```bash
git clone https://github.com/KiranNiranjan/electron-preload-bug.git
npm i
npm run build
npm run start
```
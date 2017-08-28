This is happening frequently in `electron 1.7.5`. Opening and closing the DevTool multiple times.

- Electron ver: 1.7.5
- Operating sys: macOS Sierra

## Steps to reproduce:

- [Sample Repo](https://github.com/KiranNiranjan/electron-preload-bug/tree/electron-6359)
- `npm run start`
- Open DevTools & close it
- Reopen DevTools & close it
- Electron crashes

**Removing this line stops the app from crashing**
`const { SpellCheckHandler, ContextMenuListener, ContextMenuBuilder } = require('electron-spellchecker');`
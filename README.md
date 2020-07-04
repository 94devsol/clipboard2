# clipboard2

**A smart way to manage your clipboard**

A solution for clipboard hassels.

#### How to run.

- clone the repo.
- `npm i`
- `npm start`

#### How it works.

clipboard2 maintains a history of your clipboard. You can access your clipboard history by pressing `Alt` + `Ctrl` + `V` together.

![clipboard2 full screenshot](https://github.com/ar-naseef/clipboard2/blob/master/assets/Screenshot_clipboard2_2.jpg?raw=true)

This will open a popup with a list of your clipboard history. Keep pressing `Alt` + `Ctrl` + `V` together to rotate through the history. When you release the keys, selected text will be back in your clipboard.

**Isn't clipboard2 awesome?**

#### Tech used

- Electron
- iohooks
- electron-clipboard-watcher

#### Contribute!

- [x] Tray icon + tray menu
- [ ] Testing in windows and MAC
- [ ] Remove window from the task bar when key combination pressed
- [ ] Configurable number of items stored in the history. (currently hardcoded to 5)
- [ ] Compatible with macOS (app crashes on macOS)
- [ ] Option to delete an item from the history
- [ ] Animation while rotating through history
- [ ] Configurable background color
- [x] Clipboard empty message

by [94dev](https://94dev.xyz)

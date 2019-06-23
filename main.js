const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path');

const iconPath = path.join(__dirname, 'icon2.png');

let mainWindow;
let tray;

app.on('ready', () => {
  	//  Create the browser window. TODO:
	mainWindow = new BrowserWindow({width: 800, height: 600})

	mainWindow.loadFile('index.html')

	// this will not be called on ready. rather will be called on a globalShortcut event (https://electronjs.org/docs/api/global-shortcut#globalshortcutunregisterall)
	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})

	// Create tray app TODO:
	mainWindow = new BrowserWindow({ show: false })
	tray = new Tray(iconPath);
	let contextMenu = Menu.buildFromTemplate([
		{
			label: "first item",
			type: 'radio'
		},
		{
			label: "second",
			type: 'radio'
		},
		{
			label: "third",
			submenu: [
				{
					label: "sub1",
				},
				{
					label: "sub2",	
				}
			]
		}
	])
	tray.setToolTip("clipboard 2");
	tray.setContextMenu(contextMenu);

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

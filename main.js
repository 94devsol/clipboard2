const {
	app,
	BrowserWindow,
	ipcMain,
	clipboard,
	Menu,
	Tray
} = require('electron');
const randomstring = require("randomstring");
const ioHook = require('iohook');
const clipboardWatcher = require('electron-clipboard-watcher');
const clipboardMaxLength = 5;
let win

let clipboardHistoryList = [];

//clipboardRotate START
const clipboardRotate = (arr) => {
	let currentIndex = arr.findIndex((elem) => {
		return elem.isCurrent == true
	})
	console.log("current index" + currentIndex);
	if (currentIndex === arr.length - 1) {
		clipboard.writeText(arr[0].value);
		arr = arr.map(item => {
			item.isCurrent = false;
			return item;
		})
		arr[0].isCurrent = true
	} else {
		clipboard.writeText(arr[currentIndex + 1].value);
		arr = arr.map(item => {
			item.isCurrent = false;
			return item;
		})
		arr[currentIndex + 1].isCurrent = true;
	}
	return arr;
}
//clipboardRotate END


function createWindow() {



	win = new BrowserWindow({
		show: false,
		frame: false,
		titleBarStyle: 'hidden',
		backgroundColor: "#fff",
		height: 220,
		skipTaskbar: true,
		// maxHeight: 190,
		// width: 250,
		// maxWidth: 510,
		// transparent: true,
		webPreferences: {
			nodeIntegration: true,
			minimumFontSize: 16,
			defaultFontSize: 18,
			// defaultMonospaceFontSize: 18
		}
	})


	// ClipboardWatcher  Start
	clipboardWatcher({
		// (optional) delay in ms between polls
		watchDelay: 10,
		onTextChange: function (text) {

			console.log("copied....!");
			console.log(text);

			// clipboardHistoryList = clipboardHistoryList.map(item => {
			//     item.isCurrent = false;
			//     return item;
			// })

			// clipboardHistoryList.unshift({
			//     value: text,
			//     isCurrent: true
			// });

			if (clipboardHistoryList.length > clipboardMaxLength) {
				clipboardHistoryList.splice(clipboardHistoryList.length - 1, 1);

				clipboardHistoryList.unshift({
					id: randomstring.generate(7),
					value: text,
					isCurrent: true
				});
			} else {
				clipboardHistoryList.unshift({
					id: randomstring.generate(7),
					value: text,
					isCurrent: true
				});
			}
			// console.log(clipboardHistoryList);
		}
	})
	//ClipboardWatcher  End


	//Iohook KEYUP START

	ioHook.on('keyup', event => {
		if (event.altKey && event.ctrlKey && event.keycode !== 47) {
			console.log("closing..")
			if (win) {
				win.hide();
			}
		}
	});

	//Iohook KEYUP END     

	//Iohook KEY DOWN START
	ioHook.on('keydown', event => {

		if (event.altKey && event.ctrlKey && event.keycode === 47) {

			if (clipboardHistoryList === undefined || clipboardHistoryList.length === 0) {
				console.log("Clipbored Empty")

				win.show()
				// ipcMain.once('asynchronous-message', (event, arg) => {
				// 	console.log(arg);
				// 	event.reply('asynchronous-reply', 'empty');
				// })

			} else {
				console.log("Rotating clipboard");
				clipboardHistoryList = clipboardRotate(clipboardHistoryList);

				setTimeout(() => {

					if (clipboardHistoryList.length > 1) {
						clipboardHistoryList.splice(0, 1);
					}

					console.log("array rotated")
					console.log('opening the window..');
					if (win) {
						win.show();
						ipcMain.once('asynchronous-message', (event, arg) => {
							console.log(arg);
							event.reply('asynchronous-reply', clipboardHistoryList);
						})

						// win.webContents.openDevTools();
						win.setVisibleOnAllWorkspaces(true);
						win.loadFile('src/index.html');
					} else {
						win.show()

						ipcMain.once('asynchronous-message', (event, arg) => {
							console.log(arg)
							event.reply('asynchronous-reply', clipboardHistoryList);
						})

						// win.webContents.openDevTools();
						win.setVisibleOnAllWorkspaces(true);
						win.loadFile('src/index.html');
					}
				}, 15);
			}
		}
	});
	//Iohook KEY DOWN END

	ioHook.start();
}

let tray = null
app.on('ready', () => {
	tray = new Tray('./icon.png')
	const contextMenu = Menu.buildFromTemplate([{
			label: 'Quit',
			click: function () {
				application.isQuiting = true;
				application.quit();
			}
		},
		{
			label: 'Configure',
			click: function () {

			}
		}

	])
	tray.setToolTip('This is my application.')
	tray.setContextMenu(contextMenu);
	createWindow();
})


// app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (win === null) {
		createWindow()
	}
})

app.on('active', () => {
	if (win == null) {
		createWindow()
	}
})
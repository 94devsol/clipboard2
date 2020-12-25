const {
  app,
  BrowserWindow,
  ipcMain,
  clipboard,
  Menu,
  Tray,
} = require("electron");
const randomstring = require("randomstring");
const ioHook = require("iohook");
const clipboardWatcher = require("electron-clipboard-watcher");
const clipboardMaxLength = 5;
let win;
let tray = null;

let clipboardHistoryList = [];

//clipboardRotate START
const clipboardRotate = (arr) => {
  let currentIndex = arr.findIndex((elem) => {
    return elem.isCurrent == true;
  });
  console.log("current index" + currentIndex);
  if (currentIndex === arr.length - 1) {
    clipboard.writeText(arr[0].value);
    arr = arr.map((item) => {
      item.isCurrent = false;
      return item;
    });
    arr[0].isCurrent = true;
  } else {
    clipboard.writeText(arr[currentIndex + 1].value);
    arr = arr.map((item) => {
      item.isCurrent = false;
      return item;
    });
    arr[currentIndex + 1].isCurrent = true;
  }
  return arr;
};
//clipboardRotate END

createWindow = () => {
  win = new BrowserWindow({
    show: false,
    frame: false,
    // titleBarStyle: 'hidden',
    backgroundColor: "#fff",
    height: 370,
    width: 700,
    // skipTaskbar: true,
    // resizable: false,
    // maxHeight: 190,
    // width: 250,
    // maxWidth: 510,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    //   minimumFontSize: 16,
    //   defaultFontSize: 18,
      // defaultMonospaceFontSize: 18
    },
  });

  // win = new BrowserWindow({
  // 	show: false,
  // 	frame: false,
  // 	height: 250,
  // 	width: 250,
  // 	movable: false,
  // 	center: true,
  // 	kiosk: true,
  // 	transparent: true,
  // })

  //Delete clipboard history Start
  // ipcMain.on('delete-message', (event, arg) => {

  // 	console.log(" ID :: " + arg)
  // 	var del = clipboardHistoryList.indexOf(arg);
  // 	clipboardHistoryList.splice(del, 1)

  // 	// clipboardRotate(clipboardHistoryList)

  // 	//  event.reply('asynchronous-reply', clipboardHistoryList);
  // })
  //Delete clipboard history End

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
          isCurrent: true,
          coppyAt: new Date(),
        });
      } else {
        clipboardHistoryList.unshift({
          id: randomstring.generate(7),
          value: text,
		  isCurrent: true,
          coppyAt: new Date(),
        });
      }
      // console.log(clipboardHistoryList);
    },
  });
  //ClipboardWatcher  End

  //Iohook KEYUP START

  ioHook.on("keyup", (event) => {
    if (event.altKey && event.ctrlKey && event.keycode !== 47) {
      console.log("closing..");
      if (win) {
        win.hide();
      }
    }
  });

  //Iohook KEYUP END

  //Iohook KEY DOWN START
  ioHook.on("keydown", (event) => {
    if (event.altKey && event.ctrlKey && event.keycode === 47) {
      if (
        clipboardHistoryList === undefined ||
        clipboardHistoryList.length === 0
      ) {
        console.log("Clipbored Empty");

        win.show();
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

          console.log("array rotated");
          console.log("opening the window..");
          if (win) {
            win.show();
            ipcMain.once("asynchronous-message", (event, arg) => {
              console.log(arg);

              event.reply("asynchronous-reply", clipboardHistoryList);
            });

            // win.webContents.openDevTools();
            win.setVisibleOnAllWorkspaces(true);
            win.loadFile("src/index.html");
          } else {
            win.show();

            ipcMain.once("asynchronous-message", (event, arg) => {
              console.log(arg);

              event.reply("asynchronous-reply", clipboardHistoryList);
            });

            // win.webContents.openDevTools();
            win.setVisibleOnAllWorkspaces(true);
            win.loadFile("src/index.html");
          }
        }, 15);
      }
    }
  });
  //Iohook KEY DOWN END

  ioHook.start();
};

app.on("ready", () => {
  createWindow();

  tray = new Tray("icon.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => {
        console.log("quiting..");
        app.quit();
      },
    },
  ]);

  // tray.setToolTip('clipboard2')
  tray.setContextMenu(contextMenu);
});

app.on("window-all-closed", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("active", () => {
  if (win == null) {
    createWindow();
  }
});

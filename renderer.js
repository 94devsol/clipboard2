// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const clipboardX = require('electron-clipboard-extended')

console.log("from renderer");

let clipboardHistoryList = [];

clipboardX.on('text-changed', () => {
    let clipboardHistoryHTML = '';
    let currentClipboard = clipboardX.readText()
    clipboardHistoryList.push(currentClipboard);

    console.log(clipboardHistoryList)
    clipboardHistoryList.forEach(item => {
        clipboardHistoryHTML += `<li>${item}</li>`
    })

    document.getElementById('current-clipboard').innerHTML = currentClipboard;
    document.getElementById('clipboard').innerHTML = clipboardHistoryHTML;
}).startWatching();

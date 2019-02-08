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

    // console.log(clipboardHistoryList)

    if (clipboardHistoryList.length > 3) {
        clipboardHistoryList = clipboardHistoryList.splice(1,3);
    }

    // console.log(clipboardHistoryList)
    clipboardHistoryList.forEach((item, i) => {
        clipboardHistoryHTML += `<li id="elem-${i}">${item}</li>`
    })

    document.getElementById('current-clipboard').innerHTML = currentClipboard;
    document.getElementById('clipboard').innerHTML = clipboardHistoryHTML;
    
    
    document.getElementById("elem-0").addEventListener("click", (e) => {
        console.log(e.target.innerText)
        clipboardX.writeText(e.target.innerText)
    })
    document.getElementById("elem-1").addEventListener("click", (e) => {
        console.log(e.target.innerText)
        clipboardX.writeText(e.target.innerText)
    })
    document.getElementById("elem-2").addEventListener("click", (e) => {
        console.log(e.target.innerText)
        clipboardX.writeText(e.target.innerText)
    })
}).startWatching();


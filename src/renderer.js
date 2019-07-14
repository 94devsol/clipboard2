const {
    ipcRenderer
} = require('electron');

console.log("from renderer");

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    // prints "pong"
    if (arg.length == 0) {

        document.getElementById("clipboard").innerHTML += 'Your Clipbored Empty !!!';
    } else {
        arg.forEach((item, i) => {

            if (item.value.length > 80) {
                var res = item.value.substring(0, 50);
               
                item.value = res + " ....";
            }
            if (item.isCurrent == true) {
                document.getElementById("clipboard").innerHTML += `<li class='current'>${item.value.trim()}</li>`;

            } else {
                document.getElementById("clipboard").innerHTML += `<li>${item.value}</li>`;
            }

        });
    }
})

ipcRenderer.send('asynchronous-message', 'ping')
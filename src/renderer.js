const {
    ipcRenderer
} = require('electron');

console.log("from renderer");

ipcRenderer.on('asynchronous-reply', (event, arg) => {
	let clipboard = document.getElementById("clipboard");
	if (arg.length === 0) {
		clipboard.innerHTML += 'Your clipbored is empty !!!';
	} else {
		console.log("rendering for first time..")
		arg.forEach((item, i) => {
			if (item.value.length > 50) {
				var res = item.value.substring(0, 50);
				arg[i].value = res + "....";
			}
			if (item.isCurrent === true) {
				clipboard.innerHTML += `<li id="${item.id}" class='current'>${item.value.trim()}</li>`;
			} else {
				clipboard.innerHTML += `<li id="${item.id}">${item.value}</li>`;
			}
		});
	}
});

ipcRenderer.send('asynchronous-message', 'ping')
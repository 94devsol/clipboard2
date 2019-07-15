const {
	ipcRenderer
} = require('electron');

console.log("from renderer");

ipcRenderer.on('asynchronous-reply', (event, arg) => {

	console.log(arg)
	var clipboard = document.getElementById("clipboard");

	// var ul = document.createElement("ul");
	// var li = document.createElement("li");
	// clipboard.appendChild(li)
	debugger;
	if (arg === 'empty') {
		// var clipboard = document.getElementById("clipboard");
		// console.log("clipboard empty")
		// clipboard.innerHTML = `
		// 	<li>Your clipbored is empty !!!</li>
		// `;
	} else {

		console.log("rendering for first time..")
		arg.forEach((item, i) => {
			var li = document.createElement("li");
			if (item.value.length > 50) {
				var res = item.value.substring(0, 50);
				arg[i].value = res + " ....";
			}
			if (item.isCurrent === true) {
				// clipboard.innerText += `<li id="${item.id}" class='current'>${item.value.trim()}</li>`;
				var node = document.createTextNode(`${item.value.trim()}`)
				li.classList.add("current");

			} else {
				// clipboard.innerText += `<li id="${item.id}">${item.value}</li>`;
				var node = document.createTextNode(`${item.value.trim()}`);
			}
			li.appendChild(node);
			clipboard.appendChild(li);
		});
	}
});

ipcRenderer.send('asynchronous-message', 'ping')
const {
	ipcRenderer
} = require('electron');
const tt = require('electron-tooltip')

console.log("from renderer");
tt({
	position: 'bottom',
	width: 200,
	style: {
	  backgroundColor: '#f2f3f4',
	  borderRadius: '4px'
	}
  })

ipcRenderer.on('asynchronous-reply', (event, arg) => {

	console.log(arg)
	var clipboard = document.getElementById("clipboard");

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
			li.setAttribute("title", item.value);
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
				// var btn = document.createElement('button');
				// btn.className = 'icons';
				// var text = document.createTextNode('delete');
				// btn.onclick = () =>{
					 
				// ipcRenderer.send('delete-message', item.id)

				// 	};
				// btn.appendChild(text);
				// li.append(btn);

			}
                li.append(node)
				clipboard.appendChild(li);
		});
	}
});

ipcRenderer.send('asynchronous-message', 'ping')
const { ipcRenderer } = require("electron");
const { format, register } = require("timeago.js");
//var ta = require('time-ago.js')
// const tt = require('electron-tooltip')
console.log("from renderer");
// tt({
// 	position: 'bottom',
// 	width: 200,
// 	style: {
// 	  backgroundColor: '#f2f3f4',
// 	  borderRadius: '4px'
// 	}
// })

const localeFunc = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['just now', 'right now'],
    ['%s sec ago', 'in %s seconds'],
    ['1 min ago', 'in 1 minute'],
    ['%s mins ago', 'in %s minutes'],
    ['1 hr ago  ', 'in 1 hour'],
    ['%s hrs ago  ', 'in %s hours'],
    ['1 day ago  ', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years'],
  ][index];
};
// register your locale with timeago
register("my-locale", localeFunc);

// use it

ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log("aa=>", arg);
  var clipboard = document.getElementById("clipboard");

  // debugger;
  if (arg === "empty") {
    // var clipboard = document.getElementById("clipboard");
    // console.log("clipboard empty")
    // clipboard.innerHTML = `
    // 	<li>Your clipbored is empty !!!</li>
    // `;
    // var li = document.createElement("div");
    // li.innerText = "clipboard empty";
    // clipboard.appendChild(li);
    // console.log("rendering for first time..");
  } else {
    console.log("rendering for first time..");
    arg.forEach((item, i) => {
      var historyWrapper = document.createElement("div");
      var historyDiv = document.createElement("div");
      var timeDiv = document.createElement("div");
      timeDiv.classList.add("time");
      historyDiv.classList.add("history");
      historyWrapper.classList.add("history__wrapper");
      historyWrapper.setAttribute("title", item.value);
      if (item.value.length > 60) {
        var res = item.value.substring(0, 60);
        arg[i].value = res + " ....";
      }
      if (item.isCurrent === true) {
        // clipboard.innerText += `<li id="${item.id}" class='current'>${item.value.trim()}</li>`;
        // var timeNode = document.createTextNode(`${}`);
        //  var timeNode = document.createTextNode(`${timeago.format(item.coppyAt)}`);

        var timeNode = document.createTextNode(
          `${format(item.coppyAt, "my-locale")}`
        );
        var historyNode = document.createTextNode(`${item.value.trim()}`);

        historyWrapper.classList.add("current");
      } else {
        // clipboard.innerText += `<li id="${item.id}">${item.value}</li>`;
        // var timeNode = document.createTextNode(`${ta.ago(item.coppyAt, true)}`);
        var timeNode = document.createTextNode(
          `${format(item.coppyAt, "my-locale")}`
        );
        var historyNode = document.createTextNode(`${item.value.trim()}`);

        // var btn = document.createElement('button');
        // btn.className = 'icons';
        // var text = document.createTextNode('delete');
        // btn.onclick = () =>{

        // ipcRenderer.send('delete-message', item.id)

        // 	};
        // btn.appendChild(text);
      }
      timeDiv.append(timeNode);
      historyDiv.append(historyNode);
      historyWrapper.append(timeDiv);
      historyWrapper.append(historyDiv);

      clipboard.appendChild(historyWrapper);
    });
  }
});

ipcRenderer.send("asynchronous-message", "ping");

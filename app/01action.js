//inspired by reading a lot of code... experiment on starting a server instance
//code gets triggered/executed by image display
function execCode() {
console.log("start of code");

document.body.addEventListener("keydown",function(e){
    e = e || window.event;
    var key = e.which || e.keyCode; // keyCode detection
    var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    if ( key == 86 && ctrl ) {
        console.log("paste detected");
    } else if ( key == 67 && ctrl ) {
        console.log("copy detected");
    }
	else if ( key == 88 && ctrl ) {
        console.log("cut detected");
    }

},false);

var solidws = require('solid-ws')
var ldnode = require('ldnode')
var express = require('express')
var https = require('https')

var app = express()
console.log('init of app done')

app.use('/databox', ldnode())
console.log('node created')
var server = https.createServer({/* your settings*/}, app)
console.log('server created')
server.listen(port, function () {
  console.log('Solid server started')
})

// Attach WS to solid
solidws(server, app)
console.log('this is in any case executed once we have the require work')

};

//dependency
var express = require('express');
//initialize
var app = express();
//request - resource
app.get('/', function (req, res) {
//string
   res.send('Hello World');
})
//create server
var server = app.listen(8000, function () {
//assign adress
   var host = server.address().address
//assign port
   var port = server.address().port
//log      
   console.log("Example app listening at http://%s:%s", host, port)
})

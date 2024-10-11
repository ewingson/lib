//skeleton
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
solidWs(server, app)
console.log('here code')
console.log('everything listening now')

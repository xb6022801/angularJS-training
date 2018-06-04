var express = require('./express')
var request = express.request

var newReq = new request()
console.log(newReq.version)

var bodyParser = express.bodyParser

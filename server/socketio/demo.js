// const app = require('express')()

// app.get('/', function(req, res) {
//   res.send({
//     message: 'testing'
//   })
// })

// app.listen(3001, function() {
//   console.log('connected')
// })

//
var fs = require('fs'),
    io = require('socket.io')()

const http = require('http').createServer(function(req, res) {
  res.writeHead(200)
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.write(data)
    res.end()
  })
})

io.attach(http)

io.of('/admin').to('room1').emit('room1\'s event')


http.listen(3001)

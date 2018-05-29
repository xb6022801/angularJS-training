var SocketIO = require('socket.io')

module.exports = function (srv) {
  var io = new SocketIO(srv);

  io.on('connection', function(socket) {
    socket.broadcast.emit('newconn', Math.random())

    socket.on('getAllRooms', function(cb) {
      cb('20')
      console.log(io.sockets.length)
      console.log(socket.id)
      console.log(io.sockets.adapter.rooms)
    })
  })

  return io
}
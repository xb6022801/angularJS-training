var SocketIO = require('socket.io')

module.exports = function (srv) {
  var io = new SocketIO(srv);

  io.on('connection', function(socket) {
    socket.broadcast.emit('newconn', Math.random())
  })
  
}
var SocketIO = require('socket.io')
var customRoom = /^room\d+$/g

module.exports = function (srv) {
  var io = new SocketIO(srv);

  io.on('connection', function(socket) {
    socket.broadcast.emit('newconn', Math.random())

    socket.on('getAllRooms', function(cb) {
      cb(getAvailableRooms())
    })

    socket.on('joinRoom', function(room, cb) {
      socket.join(room, function(err) {
        if (!err) {
          cb()
        }
      })
    })

    socket.on('createNewRoom', function(cb) {
      var newRoom = generateNewRoom()
      socket.join(newRoom, function(err) {
        if (!err) {
          cb(newRoom)
        }
      })
    })

    function getAvailableRooms() {
      return Object.keys(io.sockets.adapter.rooms).filter( room => {
        return customRoom.test(room)
      })
    }

    function generateNewRoom() {
      var sortedRooms = getAvailableRooms().sort(function(a, b) {
        return Number(b.replace('room', '')) - Number(a.replace('room', ''))
      })
      return sortedRooms.length ? `room${parseInt(sortedRooms[0].replace('room', ''))+1}`
        : 'room1' 
    }
  })

  return io
}
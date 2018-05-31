var SocketIO = require('socket.io')
var customRoom = /^room\d+$/

module.exports = function (srv) {
  var io = new SocketIO(srv);
  var connectedUser = new Map(); // manage connected users per room, 
                                 // auto-correct when room does not exist anymore

  io.on('connection', function(socket) {
    socket.broadcast.emit('newconn', Math.random())

    //test api, to revise
    socket.on('disconnect', function(user) {
      socket.broadcast.emit('userQuit', socket.id, user)
    })

    socket.on('getConnectedUsers', function(room, cb) {
      updateUserMap();
      var users = connectedUser.get(room) ? connectedUser.get(room) : []
      cb(users);
    })

    socket.on('getAllRooms', function(cb) {
      // updateUserMap();
      cb(getAvailableRooms())
    })

    socket.on('createNewRoom', function(cb) {
      var newRoom = generateNewRoom()
      socket.join(newRoom, function(err) {
        if (!err) {
          socket.broadcast.emit('newRoomCreated', newRoom)
          cb(newRoom)
        }
      })
    })

    socket.on('joinRoom', function(room, user, cb) {
      socket.join(room, function(err) {
        if (!err) {
          setConnectedUser(room, user, true);
          socket.to(room).broadcast.emit('userJoin');
          cb()
        }
      })
    })

    socket.on('quitRoom', function(room, user, cb) {
      socket
        .leave(room, function() {
          setConnectedUser(room, user, false);
          socket.broadcast.emit('userQuit', room); //inform other users
        })
        .join(socket.id, function() {
          cb()
        }) // go to default room
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

  /**
   * @description delete room from user map if room does not exist
   */
  function updateUserMap() {
    var availRooms = getAvailableRooms();
    for (room of connectedUser.keys()) {
      if (!~Array.prototype.indexOf.call(availRooms, room)) {
        connectedUser.delete(room)
      }
    }
  }

  /**
   * @param {*} room 
   * @param {*} user 
   * @param {*} isAdd 
   * @description update connected user from cache
   */
  function setConnectedUser(room, user, isAdd) {
    updateUserMap();
    if (isAdd) {
      if (!connectedUser.get(room)) {
        connectedUser.set(room, [user])
      } else {
        var index = connectedUser.get(room).findIndex(connUser => {
          return connUser.nickName === user.nickName
        })
        if (index === -1) {
          connectedUser.get(room).push(user)
        }
      }
    } else { // delete
      if (!connectedUser.get(room)) return;

      var index = connectedUser.get(room).findIndex(connUser => {
        return connUser.nickName === user.nickName
      })
      if (index != -1) {
        connectedUser.get(room).splice(index, 1)
      }  
    }
  }

  return io
}
var SocketIO = require('socket.io');
var customRoom = /^room\d+$/;
var connectedUser = new Map(); // manage connected users per room, 
                               // auto-correct when room does not exist anymore

module.exports = function (srv) {
  var io = new SocketIO(srv);
  var eventHandler = {
    getConnectedUsers,
    getAllRooms,
    createNewRoom,
    joinRoom,
    quitRoom,
    newMessage,
    typing,
    stopTyping,
  }

  io.on('connection', function(socket) {
    socket.broadcast.emit('newconn', Math.random())

    //test api, to revise
    socket.on('disconnect', function(user) {
      socket.broadcast.emit('userQuit', socket.id, user)
    })

    Object.keys(eventHandler).forEach((event) => {
      socket.on(event, eventHandler[event].bind(socket))
    })
  })

  /**
   * @api public
   * @param {room} room 
   * @param {cb} callbakc
   */
  function getConnectedUsers(room, cb) {
    updateUserMap();
    var users = connectedUser.get(room) ? connectedUser.get(room) : []
    cb(users);
  }

  /**
   * @api public
   * @param {cb} callback
   */
  function createNewRoom(cb) {
    var newRoom = generateNewRoom(),
        socket = this
    socket.join(newRoom, function(err) {
      if (!err) {
        io.of('/').emit('newRoomCreated', newRoom)
        cb(newRoom)
      }
    })
  }
  
  /**
   * @api public
   * @param {room} room 
   * @param {user} user 
   * @param {cb} callback 
   */
  function joinRoom(room, user, cb) {
    var socket = this
    socket.join(room, function(err) {
      if (!err) {
        setConnectedUser(room, user, true);
        socket.to(room).broadcast.emit('userJoin');
        cb()
      }
    })
  }

  /**
   * @api public
   * @param {room} room 
   * @param {user} user 
   * @param {cb} callback
   */
  function quitRoom(room, user, cb) {
    var socket = this
    socket
      .leave(room, function() {
        setConnectedUser(room, user, false);
        socket.broadcast.emit('userQuit', room); //inform other users
      })
      .join(socket.id, function() {
        cb()
      }) // go to default room
  }

  /**
   * @api public
   * @param {cb} callback
   */
  function getAllRooms(cb) {
    cb(getAvailableRooms())
  }

  /**
   * @api public
   * @param {*} packet 
   */
  function newMessage(packet, cb) {
    var socket = this
    // socket.to(packet.room).broadcast.emit('newMessage', packet);
    socket.to(packet.room).emit('newMessage', packet);
    cb();
  }

  /**
   * @api public
   * @param {*} packet 
   */
  function typing(packet) {
    var socket = this
    socket.to(packet.room).emit('typing', packet);
  }

  /**
   * @api public
   * @param {*} packet 
   */
  function stopTyping(packet) {
    var socket = this
    socket.to(packet.room).emit('stopTyping', packet);
  }

  /**
   * @api private
   */
  function getAvailableRooms() {
    return Object.keys(io.sockets.adapter.rooms).filter( room => {
      return customRoom.test(room)
    })
  }

  /**
   * @api private
   */
  function generateNewRoom() {
    var sortedRooms = getAvailableRooms().sort(function(a, b) {
      return Number(b.replace('room', '')) - Number(a.replace('room', ''))
    })
    return sortedRooms.length ? `room${parseInt(sortedRooms[0].replace('room', ''))+1}`
      : 'room1' 
  }

  /**
   * @api private
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
   * @api private
   * @param {*} room 
   * @param {*} user 
   * @param {*} isAdd 
   * @description update connected user from cache
   */
  function setConnectedUser(room, user, isAdd) {
    console.log('user = ' + JSON.stringify(user))
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
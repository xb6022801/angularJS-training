

(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatIndexCtrl', ['$state', '$scope', 'chatService', ChatIndexCtrl])

  function ChatIndexCtrl($state, $scope, chatService) {
    this.joinedRoom = false
    this.rooms = []
    this.currentRoom
    this.user
    this.currentRoom
    this.connectedUsers = []

    var self = this

    var scopeEvs = {
      logout,
      getAllRooms,
      createNewRoom,
      joinRoom,
      quitRoom,
      refreshConnectedUsers,
    }

    var socketEvs = {
      userJoin,
      userQuit,
      newRoomCreated,
    }

    Object.keys(scopeEvs).forEach(event => {
      $scope[event] = scopeEvs[event]
    })    

    Object.keys(socketEvs).forEach(event => {
      chatService.socket.on(event, socketEvs[event])
    })

    // controller init
    chatService.isAuthenticated()
    .then(function(res) {
      if (res.data.user && res.data.user.isConnected) {
        self.user = res.data.user
      } else {
        $state.go('chat.auth')
      }
    });

   $scope.getAllRooms();

    //socket events 
    function userJoin() {
      // console.log('there is a user join')
      $scope.refreshConnectedUsers();
    }
    
    function userQuit(room) {
      $scope.getAllRooms(); 
      if (self.currentRoom == room) {
        $scope.refreshConnectedUsers();
      }
    }

    function newRoomCreated() {
      $scope.getAllRooms(); //刷新房间
    }

   //scope event
   function logout () {
    //  leave all rooms
      chatService.logout()
        .then( function() {
          $state.go('chat.auth')
        })
    }

    //得到当前所有房间
    function getAllRooms() {
      // console.log('getAllRooms')
      chatService.socket.emit('getAllRooms', function(data) {
        self.rooms = []
        self.rooms.push(...data)
        $scope.$apply()
      })
    }

    //新建房间
    function createNewRoom() {
      console.log('create new room request')
      chatService.socket.emit('createNewRoom', function(newRoomName) {
        $scope.joinRoom(newRoomName)
      })
    }

    //加入房间
    function joinRoom(room) {
      chatService.socket.emit('joinRoom', room, self.user, function() {
        self.joinedRoom = true
        self.currentRoom = room
        $scope.refreshConnectedUsers()
      })
    }

    //退出房间
    function quitRoom() {
      chatService.socket.emit('quitRoom', self.currentRoom, self.user, function() {
        self.joinedRoom = false
        self.currentRoom = chatService.socket.id // maybe not
        $scope.getAllRooms() //刷新房间
      })
    }

    function refreshConnectedUsers() {
      chatService.socket.emit('getConnectedUsers', self.currentRoom, function(users) {
        self.connectedUsers = users;
        $scope.$apply()
      })
    }
  }
})()
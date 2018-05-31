

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

    //得到当前所有房间
    $scope.getAllRooms = function() {
      console.log('getAllRooms')
      chatService.socket.emit('getAllRooms', function(data) {
        self.rooms = []
        self.rooms.push(...data)
        $scope.$apply()
      })
    }

    //新建房间
    $scope.createNewRoom = function() {
      chatService.socket.emit('createNewRoom', function(newRoomName) {
        $scope.joinRoom(newRoomName)
      })
    }

    //加入房间
    $scope.joinRoom = function(room) {
      chatService.socket.emit('joinRoom', room, self.user, function() {
        self.joinedRoom = true
        self.currentRoom = room
        $scope.$apply()
      })
    }

    //退出房间
    $scope.quitRoom = function() {
      chatService.socket.emit('quitRoom', self.currentRoom, self.user, function() {
        self.joinedRoom = false
        self.currentRoom = chatService.socket.id // maybe not
        $scope.getAllRooms() //刷新房间
      })
    }
    
    chatService.socket.on('userJoin', function(user) {
      console.log('there is a user join')
      self.connectedUsers.push(user)
      $scope.$apply()
    })
    
    chatService.socket.on('userQuit', function(room, user) {
      $scope.getAllRooms(); 
      if (self.currentRoom == room) {
        var index = self.connectedUsers.findIndex(function(connectedUser) {
          return connectedUser.nickName = user.nickName
        })
        if (~index) {
          self.connectedUsers.splice(index, 1)
          $scope.$apply()
        }
      }
    })

    chatService.socket.on('newRoomCreated', function() {
      $scope.getAllRooms() //刷新房间
    })

    //init
    chatService.isAuthenticated()
      .then(function(res) {
        if (res.data.user) {
          self.user = res.data.user
        } else {
          $state.go('chat.auth')
        }
      });

    $scope.getAllRooms();

  }
})()


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
      // console.log('getAllRooms')
      chatService.socket.emit('getAllRooms', function(data) {
        self.rooms = []
        self.rooms.push(...data)
        $scope.$apply()
      })
    }

    //新建房间
    this.createNewRoom = function() {
      // console.log('create new room request')
      chatService.socket.emit('createNewRoom', function(newRoomName) {
        $scope.joinRoom(newRoomName)
      })
    }

    //加入房间
    $scope.joinRoom = function(room) {
      chatService.socket.emit('joinRoom', room, self.user, function() {
        self.joinedRoom = true
        self.currentRoom = room
        $scope.refreshConnectedUsers()
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

    $scope.refreshConnectedUsers = function() {
      chatService.socket.emit('getConnectedUsers', self.currentRoom, function(users) {
        self.connectedUsers = users;
        $scope.$apply()
      })
    }
    
    chatService.socket.on('userJoin', function() {
      // console.log('there is a user join')
      $scope.refreshConnectedUsers();
    })
    
    chatService.socket.on('userQuit', function(room) {
      $scope.getAllRooms(); 
      if (self.currentRoom == room) {
        $scope.refreshConnectedUsers();
      }
    })

    chatService.socket.on('newRoomCreated', function() {
      $scope.getAllRooms(); //刷新房间
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
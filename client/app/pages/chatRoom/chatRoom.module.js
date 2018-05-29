

(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatIndexCtrl', ['$scope', 'chatService', ChatIndexCtrl])

  function ChatIndexCtrl($scope, chatService) {
    this.joinedRoom = false
    this.rooms = []
    this.currentRoom
    this.user

    var self = this

    chatService.isAuthenticated()
      .then(function(res) {
        console.log(res.data.user) //有问题
        self.user = res.data.user
      })

    //得到当前所有房间
    chatService.socket.emit('getAllRooms', function(data) {
      self.rooms.push(...data)
      $scope.$apply()
    })

    //加入房间
    $scope.joinRoom = function(room) {
      chatService.socket.emit('joinRoom', room, function() {
        console.log('joined room')
      })
    }

    //新建房间
    $scope.createNewRoom = function() {
      console.log('create new room')
      chatService.socket.emit('createNewRoom', function(newRoomName) {
        console.log(`get new room name: ${newRoomName}`)
        self.joinedRoom = true
        self.currentRoom = newRoomName
        $scope.$apply()
      })
    }
  }
})()
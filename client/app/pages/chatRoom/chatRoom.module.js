

(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatIndexCtrl', ['chatService', ChatIndexCtrl])

  function ChatIndexCtrl(chatService) {
    chatService.socket.emit('getAllRooms', function(data) {
      // console.log(data)
    })
  }
})()


(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatCtrl', ['chatService', '$scope', ChatCtrl])

  function ChatCtrl(chatService, $scope) {
    chatService.socket.on('newconn', function(msg) {
      console.log(`received message: ${JSON.stringify(msg)}`)
    })

    chatService.isAuthenticated()
      .then(function(res) {
        console.log(`chatCtrl check: ${JSON.stringify(res)}`)
      })
  }
})()
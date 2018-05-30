

(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatCtrl', ['chatService', '$scope', '$state', ChatCtrl])

  function ChatCtrl(chatService, $scope, $state) {
    console.log('coming chat home')
    var self = this;
    chatService.socket.on('newconn', function(msg) {
      console.log(`received message: ${JSON.stringify(msg)}`)
    })

    chatService.isAuthenticated()
      .then(function(res) {
        if (!res.data.isAuthenticated) {
          console.log('go auth')
          $state.go('chat.auth')
        } else {
          console.log('go room')
          $state.go('chat.home')
        }
      })
  }
})()
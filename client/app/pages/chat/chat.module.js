(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatCtrl', ['chatService', '$scope', '$state', ChatCtrl])

  function ChatCtrl(chatService, $scope, $state) {
    var self = this;

    chatService.isAuthenticated()
      .then(function(res) {
        if (res.data.user && res.data.user.isConnected) {
          $state.go('chat.home')
        } else {
          $state.go('chat.auth')
        }
      })
  }
})()
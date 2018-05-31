(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatCtrl', ['chatService', '$scope', '$state', ChatCtrl])

  function ChatCtrl(chatService, $scope, $state) {
    var self = this;

    chatService.isAuthenticated()
      .then(function(res) {
        if (!res.data.isAuthenticated) {
          // console.log('go auth')
          $state.go('chat.auth')
        } else {
          // console.log('go room')
          $state.go('chat.home')
        }
      })
  }
})()
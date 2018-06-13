

(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatAuthCtrl', ['$scope', 'eventCodeMapping', 'chatService',
                                 '$state', ChatAuthCtrl])

  function ChatAuthCtrl($scope, eventCodeMapping, chatService, $state) {
    chatService.isAuthenticated()
      .then(function(res) {
        if (res.data.user) {
          // $state.go('chat.home')
          $scope.sessionUser = res.data.user
        } 
      })

    $scope.nickName = ''
    $scope.setNickname = function (event, nickName) {
      var isProceed = (event.keyCode === eventCodeMapping.enterCode 
                       && $scope.nickName.trim().length)
                       || nickName !== undefined
      if (isProceed) {
        chatService.setNickname(nickName? nickName: $scope.nickName)
          .then(function() {
            $state.go('chat.home')
          })
      }
    }
  }
})()


(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatAuthCtrl', ['$scope', 'eventCodeMapping', 'chatService',
                                 '$state', ChatAuthCtrl])

  function ChatAuthCtrl($scope, eventCodeMapping, chatService, $state) {
    $scope.nickName = ''
    $scope.setNickname = function (event) {
      if (event.keyCode === eventCodeMapping.enterCode) {
        chatService.setNickname($scope.nickName)
          .then(function() {
            $state.go('chat.home')
          })
      }
    }
  }
})()
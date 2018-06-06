angular.module('myApp')
  .component('smartChatting', {
    templateUrl: 'app/components/smart-chatting/smart-chatting.html',
    transclude: {
      // title: '?smartTitle',
      // body: 'smartBody',
      // footer: '?smartFooter',
    },
    bindings: {
      // isFullScreen: '=',
      // isFadeOut: '=',
      // smartStyle: '@',
      // onClose: '&'
      msgQueue: '<'
    },
    controller: ['$scope', SmartChatCtrl]
  })

  function SmartChatCtrl($scope) {
    var self = this;
   console.log(self.msgQueue)
   $scope.$watch(function() {
     return self.msgQueue.length
   }, function() {
     console.log('new message length: ' + self.msgQueue.length)
   })
  }

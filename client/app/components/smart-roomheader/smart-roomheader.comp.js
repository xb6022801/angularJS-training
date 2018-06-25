angular.module('myApp')
  .component('smartRoomheader', {
    templateUrl: 'app/components/smart-roomheader/smart-roomheader.html',
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
      // room: '?<'
    },
    controller: [SmartRoomHeader]
  });

  function SmartRoomHeader() {

  }

  // function SmartChatCtrl($scope, chatService) {
  //   var self = this;
  //   // set user
  //   chatService.isAuthenticated()
  //     .then((res) => {
  //       if (res.data.user && res.data.user.isConnected) {
  //         this.user = res.data.user
  //       }
  //     })
    
  // //  console.log(self.msgQueue)
  //  $scope.$watch(function() {
  //    return self.msgQueue.length
  //  }, function() {
  //   //  console.log('new message length: ' + self.msgQueue.length)
  //    self.msgQueue.forEach(message => {
  //      message.self = message.user.nickName === self.user.nickName
  //    })
  //  })
  // }

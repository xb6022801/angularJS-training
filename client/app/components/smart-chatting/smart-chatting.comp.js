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
      messages: '<'
    },
    controller: [SmartChatCtrl]
  })

  function SmartChatCtrl() {

  }

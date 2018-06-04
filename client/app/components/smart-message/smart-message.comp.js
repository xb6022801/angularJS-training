angular.module('myApp')
  .component('smartMessage', {
    templateUrl: 'app/components/smart-message/smart-message.html',
    transclude: {
      // title: '?smartTitle',
      // body: 'smartBody',
      // footer: '?smartFooter',
    },
    require: {
      smartChatCtrl: '^smartChatting'
    },
    bindings: {
      // isFullScreen: '=',
      // isFadeOut: '=',
      // smartStyle: '@',
      // onClose: '&'
      message: '<'
    },
    controller: [SmartMessageCtrl]
  })

  function SmartMessageCtrl() {

  }

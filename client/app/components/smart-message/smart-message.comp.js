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
    controller: ['dfPhotoSetting', SmartMessageCtrl]
  })

  function SmartMessageCtrl(dfPhotoSetting) {
    var self = this
    this.photoPath = dfPhotoSetting.path
    this.photoSize = dfPhotoSetting.size
  }

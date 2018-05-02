angular.module('myApp')
  .component('smartModal', {
    templateUrl: 'app/components/smart-modal/smart-modal.html',
    transclude: {
      title: '?smartTitle',
      body: 'smartBody',
      footer: '?smartFooter',
    },
    bindings: {
      isFullScreen: '=',
      isFadeOut: '=',
      smartStyle: '@',
      onClose: '&'
    },
    controller: ['$document', 'eventCodeMapping', function($document, eventCodeMapping) {
      var ctrl = this,
          exitModalEvent

      this.localStyle = {color: 'blue'}

      exitModalEvent = function (event) {
        var _self = event.target
        if (event.which === eventCodeMapping.exitCode) {
          ctrl.onClose()
        }
      }

      this.$onInit = function() {
        console.log('on init')
        $document.on('keydown', exitModalEvent)
      }
      this.$onDestroy = function() {
        console.log('on destroy')
        $document.off('keydown', exitModalEvent)
      }
    }]
  })

  // function exitModal(event) {
  //   var _self = event.target
  //   // console.log(_self)
  //   console.log(event.which === eventCodeMapping.exitCode)
  //   // if (angular.element(_self).hasClass('.smart-modal-container')) {
  //   //   console.log('in target')
  //   // }
  //   if (event.which === eventCodeMapping.exitCode) {
  //     ctrl.onClose()
  //   }    
  // }
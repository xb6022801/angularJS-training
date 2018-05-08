angular.module('myApp')
  .component('smartPhoto', {
    templateUrl: 'app/components/smart-photo/smart-photo.html',
    bindings: {
      photoPath: '<',
      photoSize: '<',
    },
    controller: ['$scope', SmartPhoto],
  })

function SmartPhoto ($scope) {
  // this.$onInit = function() {
  //   console.log('init')
  // }
  // console.log(this.photoPath)
}
'use strict';

angular.module('myApp')
  .directive('smartPrgbar', ['$log', SmartPrgbar])

function SmartPrgbar ($log) {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/smart-prgbar/smart-prgbar.html',
    replace: true,
    scope: {
      percentage: '='
    },
    link: function($scope, element, attrs,) {
      // console.log(attrs)
      $scope.$watch('percentage', function(value) {
        // console.log(value)
      })
    }
  }
}
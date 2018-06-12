'use strict';

angular.module('myApp')
  .directive('smartNotice', [SmartNotice])

function SmartNotice () {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/smart-notice/smart-notice.html',
    replace: true,
    scope: {
      message: '=',
      type: '='
    },
    link: function($scope, element, attrs) {
      
    }
  }
}
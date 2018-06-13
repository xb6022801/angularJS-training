'use strict';

angular.module('myApp')
  .directive('smartScroll', ['$timeout', '$window', SmartScroll])

function SmartScroll($timeout, $window) {
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {

      function autoScroll() {
        $timeout(function() {
          var el = element[0];
          var scrollDiff = el.scrollHeight - el.clientHeight;

          if (scrollDiff > 0) {
            el.scrollTop = scrollDiff
          }
        }, 100)
      };
      
      function cleanup() {
        $window.removeEventListener('resize', autoScroll)
      };

      $scope.$watch(attrs.smartScroll, autoScroll);
      $window.addEventListener('resize', autoScroll);

      $scope.$on('$destroy', function() {
        cleanup();
      });

    }
  }
}
(function() {
  'use strict';

  angular.module('myApp')
    .filter('puralize', function() {
      return function(value, nbPuralize) {
        return value.length > nbPuralize ? value.slice(0, nbPuralize) +'...'
                 : value
      }
    })
})()
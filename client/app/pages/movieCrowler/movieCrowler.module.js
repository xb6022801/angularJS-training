

(function() {
  'use strict'

  angular.module('myApp')
    .controller('movieCrowlerCtrl', ['$scope', '$http', movieCrowlerCtrl]);
  
  function movieCrowlerCtrl($scope, $http) {
    var ctrl = this

    ctrl.movies = []
    ctrl.loading = false
    ctrl.startCrowler = function() {
      if (ctrl.loading) return

      ctrl.movies = []
      ctrl.loading = true
      
      $http({
        method: 'POST',
        url: '/getMovies'
      })  
      .then(function (res) {
        ctrl.movies.push(...res.data)
        ctrl.loading = false
      })
    }
  } 
})()
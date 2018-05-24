(function() {
  'use strict'

  angular.module('myApp')
    .controller('movieCrowlerCtrl', ['$scope', '$http', 'movieService', movieCrowlerCtrl]);
  
  function movieCrowlerCtrl($scope, $http, movieService) {
    var ctrl = this
    ctrl.movies = []
    ctrl.loading = true

    // test
    ctrl.currentLocation = window.location
    ctrl.origin = window.origin

    movieService.getCachedMovies()
    .then(function(data) {
      ctrl.movies.push(...data)
      ctrl.parseMovies()
      ctrl.loading = false          
    })

    ctrl.startCrowler = function() {
      if (ctrl.loading) return

      ctrl.movies = []
      ctrl.loading = true

      movieService.getCachedMovies(true)
        .then(function(data) {
          ctrl.movies.push(...data)
          ctrl.parseMovies()
          ctrl.loading = false          
        })
    }

    ctrl.parseMovies = function() {
      if (ctrl.movies.length == 0) return
      ctrl.movies = ctrl.movies
        .map( movie => {
          movie.date = movie.date && movie.date.replace(/发布时间：/g, '').trim()
          movie.rank = movie.rank && parseFloat(movie.rank)
          return movie
        })
        .filter(movie => {
          return movie.rank > 7
        })
      
      ctrl.movies.sort(function(m1, m2) {
        return m2.rank - m1.rank
      })
    }
  } 
})()
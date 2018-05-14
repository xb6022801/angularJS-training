(function() {
  'use strict';

  angular.module('myApp')
  .factory('movieService', ['$q', '$http', MovieService])

  function MovieService ($q, $http) {
    var cachedMovies = {
      movies: [],
      lastRefreshedDate: null
    }

    function isToRefresh() {
      if (cachedMovies.lastRefreshedDate == null 
        || cachedMovies.movies.length === 0) {
        return true
      }
      //refresh only when it is over 2 mins
      return new Date().getTime() - cachedMovies.lastRefreshedDate > 2 * 60 * 1000   
    }

    return {
      getCachedMovies: function (isMandatory) {
        var deferred = $q.defer()
        
        if (isToRefresh() || isMandatory) {
          cachedMovies.movies = []
          $http({
            method: 'POST',
            url: '/getMovies'
          })  
          .then(function (res) {
            cachedMovies.movies.push(...res.data)
            cachedMovies.lastRefreshedDate = new Date()
            deferred.resolve(cachedMovies.movies)
          })
        } else {
          deferred.resolve(cachedMovies.movies)
        }
        return deferred.promise
      }
    }
  }
})()

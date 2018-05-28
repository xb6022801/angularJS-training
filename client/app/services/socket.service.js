(function() {
  'use strict';

  angular.module('myApp')
  .factory('chatService', ['$rootScope', '$http', '$q', ChatService])

  function ChatService ($rootScope, $http, $q) {
    //test snippet
    var socket = io();

    return {
      socket,
      isAuthenticated: function() {
        var deferred = $q.defer()
        $http({
          method: 'POST',
          url: '/authentication',
        })
        .then(function(data) {
          // console.log(`chatService check: ${JSON.stringify(data)}` )
          deferred.resolve(data)
        })
        
        return deferred.promise
      },
      setNickname: function(nickName) {
        var deferred = $q.defer()
        $http({
          method: 'POST',
          url: '/setUser',
          nickName
        })
        .then(function(res) {
          console.log(res.statusCode)
          deferred.resolve()
        })

        return deferred.promise
      }
    }
  }
})()

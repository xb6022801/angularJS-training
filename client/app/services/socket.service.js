(function() {
  'use strict';

  angular.module('myApp')
  .factory('chatService', ['$rootScope', '$http', '$q', ChatService])

  function ChatService ($rootScope, $http, $q) {
    //test snippet
    var socket = io(),
        deferred

    return {
      socket,
      isAuthenticated: function() {
        deferred = $q.defer()
        $http({
          method: 'POST',
          url: '/authentication',
        })
        .then(function(data) {
          deferred.resolve(data)
        })
        
        return deferred.promise
      },
      setNickname: function(nickName) {
        console.log('nickname = ' + nickName)
        deferred = $q.defer()
        $http({
          method: 'POST',
          url: '/setUser',
          data: {
            nickName
          }
        })
        .then(function(res) {
          deferred.resolve()
        })

        return deferred.promise
      },
      logout: function() {
        deferred = $q.defer()
        $http({
          method: 'POST',
          url: '/logoutChat'
        })
        .then(function() {
          deferred.resolve()
        })
        return deferred.promise
      }
      // getAllRooms: function() {
      //   deferred = $q.defer()
      //   $http({
      //     method: 'POST',
      //     url: '/getAllRooms',
      //   })
      //   .then(function(res) {
      //     console.log(res)
      //     deferred.resolve(res)
      //   })

      //   return deferred.promise        
      // }
    }
  }
})()

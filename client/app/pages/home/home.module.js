

(function() {
  'use strict'

  angular.module('myApp')
    // .config(['$routeProvider', function($routeProvider) {
    //   $routeProvider.when('/home', {
    //     templateUrl: 'app/pages/home/home.temp.html',
    //     controller: 'homeCtrl'
    //   })
    // }])
    .controller('homeCtrl', ['$rootScope', '$scope', '$state', homeCtrl]);
  
  function homeCtrl($rootScope, $scope, $state) {
    $scope.rootUserName = 'inital vaue'
    this.isModalVisible = false

    this.closeModal = function () {
      console.log('close modal is')
      this.isModalVisible = false
      $scope.$apply()
    }

    this.checkTodoDetail = function() {
      $state.go('todo', {
        id: '2'
      })
    }

    this.changeRootUserName = function() {
      console.log('change root user name')
      $scope.$broadcast('changeRootUsername', $scope.rootUserName)
    }

    this.vote = function() {
      $state.go('vote')
    }

    $scope.$on('receivedMessage', function(event, data) {
      console.log('root | parent scope received message from child : ' + data.message)
    })
  } 
})()
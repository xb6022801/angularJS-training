

(function() {
  'use strict'

  angular.module('myApp')
    // .config(['$routeProvider', function($routeProvider) {
    //   $routeProvider.when('/home', {
    //     templateUrl: 'app/pages/home/home.temp.html',
    //     controller: 'homeCtrl'
    //   })
    // }])
    .controller('homeCtrl', ['$scope', '$state', homeCtrl]);
  
  function homeCtrl($scope, $state) {
    this.isModalVisible = false
    // this.displayModal = function() {  
      
    // }
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
  } 
})()
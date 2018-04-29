

(function() {
  'use strict'

  angular.module('myApp')
    // .config(['$routeProvider', function($routeProvider) {
    //   $routeProvider.when('/home', {
    //     templateUrl: 'app/pages/home/home.temp.html',
    //     controller: 'homeCtrl'
    //   })
    // }])
    .controller('homeCtrl', ['$scope', homeCtrl]);
  
  function homeCtrl($scope) {
    this.isModalVisible = false
    // this.displayModal = function() {  
      
    // }
    this.closeModal = function () {
      console.log('close modal')
      this.isModalVisible = false
      $scope.$apply()
    }
  } 
})()
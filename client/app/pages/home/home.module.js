

(function() {
  'use strict'

  angular.module('myApp')
    // .config(['$routeProvider', function($routeProvider) {
    //   $routeProvider.when('/home', {
    //     templateUrl: 'app/pages/home/home.temp.html',
    //     controller: 'homeCtrl'
    //   })
    // }])
    .controller('homeCtrl', [homeCtrl])
  
  function homeCtrl() {
    console.log('ss')
  } 
})()
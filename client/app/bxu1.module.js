

(function() {
  'use strict'

  angular.module('myApp', [
    'ui.router',
  ]).
  config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function($stateProvider, 
             $urlRouterProvider,
             $locationProvider) {
      $locationProvider.hashPrefix('!')
      
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'app/pages/home/home.temp.html'
        })
        .state('home.subhome', {
          url: '/subhome',
          template: '<div>this is subhome</div>'
        })
        .state('home.content', {
          url: '/content',
          template: '<div>this is content</div>'
        })      
      $urlRouterProvider
        .otherwise('/home')
        
  }])
})()
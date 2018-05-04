(function() {
  angular.module('myApp')
  .config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, 
             $urlRouterProvider,
             $locationProvider
             ) {
      $locationProvider.hashPrefix('!')

      $stateProvider
        .state('home', {
          url: '/home',
          controller: 'homeCtrl',
          controllerAs: 'homeCtrl',
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
        .state('todo', {
          url: '/todo/:id?',
          templateUrl: 'app/pages/todo/todo.temp.html',
          //deprecated
          resolve: {
            todoDetail: function(todoService, $stateParams) {
              return [
                { 
                  id: 1,
                  description: 'demo task', 
                  isDone: false, 
                },
                {
                  id: 2,
                  description: '今天无事', 
                  isDone: true,                   
                }
              ]
            },
            todoId: function($stateParams) {
              console.log($stateParams.id)
              return $stateParams.id
            }
          },
          controller: 'TodoCtrl as todo',
        })      
      $urlRouterProvider
        .otherwise('/home')
        
  }])
})()
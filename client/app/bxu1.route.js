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
          template: '<div>this is subhome {{ rootUserName  }}</div>',
          controller: ['$scope',function($scope) {
            $scope.rootUserName = 'subhome root user name'
            $scope.$on('changeRootUsername', function(event, newUserName) {
              // console.log(`new user name is ${newUserName}`)
              $scope.rootUserName = newUserName
              $scope.$emit('receivedMessage', {
                message: 'get new user name equals to : ' + newUserName
              })
            })
          }]
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
              return $stateParams.id
            }
          },
          controller: 'TodoCtrl as todo',
        })  
        .state('vote', {
          url: '/vote',
          templateUrl: 'app/pages/vote/vote.temp.html',
          controller: 'VoteController as voteCtrl',
          resolve: {
            voteDetail: function() {
              var $injector = angular.injector(['ng']),
                  $q = $injector.get('$q'),
                  $http = $injector.get('$http'),
                  deferred = $q.defer()

              $http.get('/static/data/participUsers.json')
                .success(function(data) {
                  deferred.resolve(data)
                })
              return deferred.promise
            }
          }
        }) 
        .state('movieCrowler', {
          url: '/movieCrowler',
          templateUrl: 'app/pages/movieCrowler/movieCrowler.temp.html',
          controller: 'movieCrowlerCtrl as mcCtrl'
        }) 
        .state('chat', {
          url: '/chat',
          templateUrl: 'app/pages/chat/chat.temp.html',
          controller: 'chatCtrl as ctCtrl'
        })  
      $urlRouterProvider
        .otherwise('/home')
        
  }])
  // .run(function($animate) {
  //   $animate.enabled(true)
  // })
})()
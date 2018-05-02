

(function() {
  'use strict'
 
  angular.module('myApp')
    .controller('TodoCtrl', ['$scope', 'todoId', 'todoService', 'eventCodeMapping',
                              'todoMapping', TodoCtrl])
  
  function TodoCtrl($scope, todoId, todoService, eventCodeMapping, todoMapping) {
    this.isLoadingData = todoId != null
    this.newTodo = ''

    todoService.getItem(2)
      .then((data) => {
        this.todoDetail = data
        this.isLoadingData = false
      })

    this.testChange = (newValue) => {
      console.log('updated value is ' + newValue)
    }

    this.saveNew = function(event) {
      // console.log(event.keyCode)
      // console.log('new todo' + this.newTodo)
      if (event.keyCode === eventCodeMapping.enterCode) {
        console.log('push')
        this.todoDetail.push({
          description: this.newTodo,
          isDone: false, 
        })
        this.newTodo = ''
      }
    }

    // $scope.testFn = function() {
    //   console.log('tet')
    // }
  }
})()
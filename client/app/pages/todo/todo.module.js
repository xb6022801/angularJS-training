

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

    this.saveNew = function(event) {
      if (event.keyCode === eventCodeMapping.enterCode) {
        this.todoDetail.tasks.push({
          description: this.newTodo,
          isDone: false, 
        })
        todoService.cacheItem(this.todoDetail)
        this.newTodo = ''
      }
    }

    this.editTask = function(index) {
      this.todoDetail.tasks[index].editing = true
    }

    this.saveTask = function(index, event) {
      if (event.keyCode === eventCodeMapping.enterCode) {
        delete this.todoDetail.tasks[index].editing
        todoService.cacheItem(this.todoDetail)
      }
    }
  }
})()
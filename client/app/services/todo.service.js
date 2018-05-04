(function() {
  'use strict';

  angular.module('myApp')
  .factory('todoService', ['$q', '$timeout', 'todoMapping', TodoService])

  function TodoService ($q, $timeout, todoMapping) {
    return {
      cacheItem: function(newTodo) {
        localStorage.setItem(todoMapping._key_identifier + '_' + newTodo[todoMapping._key_id], 
          JSON.stringify(newTodo))
      },
      getItem: function(todoId) {
        var deferred = $q.defer(),
            todoItem = localStorage.getItem(todoMapping._key_identifier + '_' + todoId)
        $timeout(function() {
          deferred.resolve(JSON.parse(todoItem))
        }, 1000)

        return deferred.promise
      },
    }
  }
})()

// var demoTodo = {
//   id: 2,
//   tasks: [
//     {
//     id: 0,
//     description: 'demo storage, need to remove',
//     isDone: false
//     }
//   ]
// }
// localStorage.setItem('todo_2', JSON.stringify(demoTodo))
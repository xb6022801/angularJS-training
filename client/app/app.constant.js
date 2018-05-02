var myApp = angular.module('myApp')

myApp.value('eventCodeMapping', {
  exitCode: 27,
  enterCode: 13,
})

myApp.value('todoMapping', {
  _key_identifier: 'todo',
  _key_id: 'id',
  _key_description: 'description',
  _key_status: 'isDone',
})

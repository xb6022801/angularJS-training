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

myApp.value('mockedSession', {
  userId: 4,
  firstName: 'Bin',
  lastName: 'XU',
  pseudo: '中投靓仔',
  gender: 'male',
  photoPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9v7diyFDBEIXLGY10u_IuI9xT8V7f-rrTwj2E-uigEX-kFnJN'
})

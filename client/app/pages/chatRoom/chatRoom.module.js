

(function() {
  'use strict'
  
  angular.module('myApp')
    .controller('chatIndexCtrl', [ChatIndexCtrl])

  function ChatIndexCtrl() {
    console.log('chatIndex')
  }
})()
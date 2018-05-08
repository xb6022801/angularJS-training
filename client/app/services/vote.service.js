(function() {
  'use strict';

  angular.module('myApp')
  .factory('voteService', [TodoService])

  function TodoService () {
    return {
      unifierResult: function(voteDetail) {
        var voteOptions = []
        voteDetail.options.forEach(option => {
          var voteRes = {}
          voteRes.option = option
          voteRes.result = voteDetail.results.filter(res => res.option == option.id)
          voteRes.percentage = (voteRes.result.length / voteDetail.results.length * 100) + '%'
          voteOptions.push(voteRes)
        })      
        return voteOptions  
      }
    }
  }
})()
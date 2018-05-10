(function() {
  'use strict';

  angular.module('myApp')
  .factory('voteService', ['$http','$q', VoteService])

  function VoteService ($http, $q) {
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
      },
      saveResults: function(voteDetail) {
        var deferred = $q.defer()
        $http({
          method: 'POST',
          url: '/vote/saveParticipUser',
          data: {
            voteDetail,
          }
        }).then(data => {
          if (data.data.error) {
            deferred.resolve({ error: data.data.error })
          } else {
            deferred.resolve({ message: 'saved successfully '})
          }
        })   
        
        return deferred.promise
      }
    }
  }
})()
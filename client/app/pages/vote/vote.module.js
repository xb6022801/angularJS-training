(function() {
  angular.module('myApp')
    .controller('VoteController', 
                ['$scope', '$http', '$log', '$interval', 'voteDetail',
                 'voteService', 'mockedSession',
                 VoteController])
  
  function VoteController ($scope, $http, $log, $interval, voteDetail, voteService, 
                           mockedSession) {
    var ctrl = this,
        currentTime
     
    ctrl.voteDetail = voteDetail || {}
    ctrl.photoSize = {
      width: '30px',
      height: '30px',
    }
    ctrl.runtimeResults = []
    ctrl.voteOptions = voteService.unifierResult(ctrl.voteDetail)
    
    $interval(function() {
      currentTime = new Date().getTime()
      ctrl.runtimeResults.forEach((res, index) => {
        if (Math.abs(currentTime - res.timing) > 2000) {
          ctrl.runtimeResults.splice(index, 1)
        }
      })
    }, 2000)

    ctrl.vote = function ($index) {
      var newResult = {
        id: mockedSession.userId,
        photoPath: mockedSession.photoPath,
        option: voteDetail.options[$index].id
      }
      voteDetail.results.push(newResult)
      ctrl.runtimeResults.push({
        timing: new Date().getTime(),
        description: `${mockedSession.pseudo}在问卷投票'${voteDetail.subject}' 
          中投给了 ${voteDetail.options[$index].value}`
      })
    }

    ctrl.cancelVote = function () {
      var index = ctrl.voteDetail.results.findIndex(res => {
        return res.id == mockedSession.userId
      })
      if (index > -1) {
        voteDetail.results.splice(index, 1)
        ctrl.runtimeResults.push({
          timing: new Date().getTime(),
          description: `${mockedSession.pseudo}在问卷投票'${voteDetail.subject}' 
            中取消了投票`
        })   
      }
    }

    ctrl.setEnableActiontype = function() {
      ctrl.enableActionType = voteDetail.results.findIndex(
        res => res.id === mockedSession.userId) == -1 ? 
        'vote': 'cancelVote'
    }

    $scope.$watch(function() {
      return ctrl.voteDetail.results.length
    }, function() {
      ctrl.voteOptions = voteService.unifierResult(ctrl.voteDetail)
      ctrl.setEnableActiontype()
    })
  }
})()
angular.module('myApp')
  .component('bxu1Btn', {
    templateUrl: 'app/components/bxu1-btn/bxu1-btn-temp.html',
    // transclude: {
    //   'span': 'span'
    // }
    transclude: true,
    bindings: {
      bxu1Click: '&'
    },
    controller: function() {}
  })
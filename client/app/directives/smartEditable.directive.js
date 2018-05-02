'use strict';

angular.module('myApp')
  .directive('smartEditable', ['$document', SmartEditable])

function SmartEditable ($document) {
  var inputStyle = {
    outline: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid grey',
    padding: '.5em .6em',
    borderRadius: '3px',
    color: 'white',
    background: 'black',
    fontSize: '15px',
    width: '250px'
  }

  function link(scope, element, attrs) {
    var bidingValue = attrs.smartEditable

    element.text(bidingValue)

    element.on('dblclick', function() {
      if (element.html().includes('input') === false) {
        var input = document.createElement('input')
        input.type = 'text'
        input.value = bidingValue
        input.addEventListener('keyup', function(event) {
          // console.log('keyup')
        })
        element.text('')
          .append(input)
          .find('input')
          .css(inputStyle)
      } else {
        element.text(bidingValue)
        // scope.testFn()
      }
    })
  }
  return {
    restrict: 'A',
    link,
  }
}
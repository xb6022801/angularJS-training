'use strict'

angular.module('myApp')
  .directive('autoFix', [AutoFix])

function AutoFix() {
  console.log('autofix')
}
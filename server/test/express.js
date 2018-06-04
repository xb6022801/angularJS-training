
'use strict';

var request = require('./request');

exports = module.exports = createApp;

function createApp() {
  console.log('create app')
}

exports.request = request

;[
  'bodyParser',
  'session'
].forEach(middleWare => {
  Object.defineProperty(exports, middleWare, {
    get: function() {
      throw new Error(`${middleWare} is no longer available in common package`)
    }
  })
})
'use strict';

var accepts = require('accepts');
var http = require('http');

class Request extends http.IncomingMessage {
  constructor() {
    this._version = '1.0'
    // String.prototype.toUpperCase
  }

  get version() {
    return this._version.toUpperCase()
  }

  accepts() {
    var accept = accepts(this);
    return accept.types.apply(accept, arguments)
  }
}

module.exports = Request
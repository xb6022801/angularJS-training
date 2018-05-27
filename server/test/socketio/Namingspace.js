const EventEmitter = require('EventEmitter');

exports.events = [
  'connection',
]

module.exports = exports = Namingspace

var emit = EventEmitter.prototype.emit

function Namingspace(server, name) {
  this.fns = [];
  this.server = server;
  this.name = name;
  this.flags = {}
}

/**
 * Flags.
 */

exports.flags = [
  'json',
  'volatile',
  'local'
];

/**
 * inherit from EventEmitter
 */
Namingspace.prototype.___proto__ = EventEmitter.prototype;

/**
 * example: namingSpace.volatile.emit()
 */
exports.flags.forEach(function(flag) {
  Object.defineProperty(Namingspace.prototype, flag, {
    get: function() {
      this.flags[flag] = true;
      return this;
    }
  })
})

Namingspace.prototype.run = function (socket, fn) {
  var fns = this.fns.slice(0);
  if (!fns.length) return fn(null);

  function run(i) {
    fns[i](socket, function(err) {
      if (err) return fn(err);

      if (!fns[i+1]) return fn(null);

      run(i+1)
    })
  }

  run(0);
}


Namingspace.prototype.in =
Namingspace.prototype.to = function(name) {
  if (!~this.rooms.indexOf(name)) this.rooms.push(name);
  return;
}

/**
 * @return {Naming space}
 * @api public
 */
Namingspace.prototype.send =
Namingspace.prototype.write = function() {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('message')
  this.emit.apply(this, args)
  return
}

/**@return {Namingspace} itself
 * @param {*} event 
 * @api public
 */
Namingspace.prototype.emit = function(event) {
  if (~exports.events.indexOf(event)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = Array.prototype.slice.call(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };
  
  if ('function' == typeof args[args.length - 1]) {
    throw new Error('Callbacks are not supported when broadcasting')
  }

  var rooms = this.rooms.slice(0),
      flags = Object.assign({}, this.flags)
  
  // reset flags
  this.rooms = [];
  this.flags = {};

  this.adapter.broadcast(packet, {
    rooms: rooms,
    flags: flags
  });

  return this;
}

// ~str.indexOf(target) //如果不包含的话，return 0 => false
//so
if (~str.indexOf(target)) { //如果包含的话
 
} else {

}
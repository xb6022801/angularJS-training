function Namingspace() {
  this.fns = []
}

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


// ~str.indexOf(target) //如果不包含的话，return 0 => false
//so
if (~str.indexOf(target)) { //如果包含的话
 
} else {

}
// function test() {
//   var room = []
//   if (arguments.length) {
//     var args = Array.prototype.slice.apply(arguments)
//     console.log(arguments instanceof Array)
//     console.log(args instanceof Array)
//     console.log(arguments[0])
//     console.log(args[0])
//     console.log(Array.prototype.slice.apply(arguments)[0])  
//   }
// }

// test('xubin', 2)

var rooms = ['room3', 'room2', 'room4']

var sortedRooms = rooms.sort(function(a, b) {
  return Number(b.replace('room', '')) - Number(a.replace('room', ''))
})

// console.log(rooms)
console.log(parseInt(sortedRooms[0].replace('room', '')))

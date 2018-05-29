var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    routes = require('./routes.js'),
    voteRoutes = require('./voteRoutes.js'),
    port = process.argv.port || 3000,
    server = require('http').Server(app)

//setup io
var socketIO = require('./server/socket.io')(server)

app.use(bodyParser.json())

app.use(session({
  secret: 'changeit',
  resave: false,
  saveUninitialized: true
}))

//test snippet
// app.use(function(req, res, next) {
//   console.log('session check: id = ' + req.session.id)
//   if (!req.session.user) {
//     res
//       .send('require user authentication') 
//   } else {
//     next()
//   }
// })

app.use('/vote', voteRoutes)
app.use('/', routes)

app.use(express.static('./build'))


module.exports = server.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('app is listening on port : ' + port)
  }
})
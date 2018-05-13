var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes.js'),
    voteRoutes = require('./voteRoutes.js'),
    port = process.argv.port || 3000

app.use(bodyParser.json())

app.use('/vote', voteRoutes)
app.use('/', routes)

app.use(express.static('./build'))

module.exports = app.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('app is listening on port : ' + port)
  }
})
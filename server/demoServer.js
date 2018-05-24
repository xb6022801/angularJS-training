var http = require('http').createServer(function(req, res) {
  console.log('request url is : ' + req.url)
  res.writeHead(404)
  res.end()
})

http.listen(4001, function() {
  console.log('listen on 4001')
})
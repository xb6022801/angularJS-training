var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    crawler = require('./server/webcrowler/movieCrawler')()

var getMovies = function (req, res) {
  // res.send({
  //   message: 'received data'
  // })
  crawler(req, res)
    .then(
      function(data) {
        console.log('crawler result: ')
        console.log(data)
        res.send(data)
      },
      function(err) {
        console.log('crawler error')
        res.send({ err })
      }
    )
} 

router.post('/getMovies', getMovies)

module.exports = router
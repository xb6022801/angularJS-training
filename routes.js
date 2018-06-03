var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    crawler = require('./server/webcrowler/movieCrawler')()

var getMovies = function (req, res) {
  crawler(req, res)
    .then(
      function(data) {
        // console.log('crawler result: ')
        // console.log(data)
        res.send(data)
      },
      function(err) {
        // console.log('crawler error')
        res.send({ err })
      }
    )
} 

var authentication = function(req, res) {  
  res.send({
    // isAuthenticated: req.session.user !== undefined,
    user: req.session.user
  })
}

var setUser = function(req, res) {
  req.session.user = {
    nickName: req.body.nickName,
    isConnected: true
  }
  res.status(200).end()
}

var logoutChat = function(req, res) {
  if (req.session.user) {
    req.session.user.isConnected = false
  }
  res.status(200).end()
}

router.post('/getMovies', getMovies)
router.post('/authentication', authentication)
router.post('/setUser', setUser)
router.post('/logoutChat', logoutChat)

module.exports = router
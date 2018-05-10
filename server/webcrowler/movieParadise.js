var superagent = require('superagent')
    require('superagent-charset')(superagent)
    
var cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    http = require('http')

var ep = new eventproxy()
    pageUrl = 'https://www.dy2018.com'

function start() {
  function onRequest(req, res) {
    superagent.get(pageUrl)
      .charset('gbk')
      .end(function(err, response) {
        if (err) {
          console.log(err)
        } else {
          var $ = cheerio.load(response.text),
              contentBlocks = $('.co_content222 a')

          res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})

          for (var i = 0; i < contentBlocks.length; i++) {
            var title = contentBlocks.eq(i).attr('title') 
            res.write('title : ' + title + '<br>')
          }
        }
      })
  }

  http.createServer(onRequest).listen(8000)
}

exports.start = start
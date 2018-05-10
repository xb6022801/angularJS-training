var superagent = require('superagent')
    require('superagent-charset')(superagent)
    
var cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    http = require('http')

var ep = new eventproxy()
    pageUrl = 'https://www.dy2018.com/html/gndy/dyzz/index.html'

function start() {
  function onRequest(req, res) {
    superagent.get(pageUrl)
      .charset('gbk')
      .end(function(err, response) {
        if (err) {
          console.log(err)
        } else {
          var $ = cheerio.load(response.text),
              select = $('select option')
         
          res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        
          for (var i = 0; i < select.length; i++) {
            var link = select.eq(i).attr('value')
            res.write('link : ' + link + '<br>')
          }
        }
      })

  }

  http.createServer(onRequest).listen(8000)
}

exports.start = start
var superagent = require('superagent')
    require('superagent-charset')(superagent)
    
var cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    async = require('async',)
    http = require('http'),
    fs = require('fs')

var ep = new eventproxy()
    entryUrl = 'https://www.dy2018.com/html/gndy/dyzz/index.html',
    pageUrls = [],
    titles_temp = []
    

function start() {
  var curCount = 0

  function onRequest(req, res) {
    superagent.get(entryUrl)
      .charset('gbk')
      .end(function(err, response) {
        if (err) {
          console.log(err)
        } else {
          var $ = cheerio.load(response.text),
              select = $('select option')
         
          res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
          for (var i = 0; i < select.length; i++) { 
            var href = select.eq(i).attr('value')
            pageUrls.push('https://www.dy2018.com' + href)
          }

          //step 2: use async.mapLimit(coll, limit, iteratee, callbackopt) control concurrent
          async.mapLimit(pageUrls, 5, function(url, callback) {
            crowler(url, callback)
          }, function(err, results) {
            if (err) {
              console.log(err)
            } else {
              console.log(results)
              fs.writeFile('result.json', JSON.stringify(titles_temp, 0, 4),
              'utf-8', (err, data) => {
                if (err) {
                  console.log(err)
                }
               }
              )
            }
          }) // end async

        } // end superagent
      })
  } // end onRequest

  function crowler(pageUrl, callback) {
    var delay = parseInt((Math.random() * 30000000) % 1000, 10)
    curCount++
    console.log('现在的并发数是', curCount, '，正在抓取的是', pageUrl, '，耗时' + delay + '毫秒')

    superagent.get(pageUrl)
      .charset('gbk')
      .end(function(err, response) {
        if (err) {
          console.log(err)
        } else {
          var $ = cheerio.load(response.text),
              select = $('.ulink')

          for (var i = 0; i < select.length; i++) { 
            var title = select.eq(i).attr('title'),
                link = 'https://www.dy2018.com' + select.eq(i).attr('href')
            titles_temp.push({ title, link })
          }
        }
      })    

      setTimeout(function() {
        curCount--;
        callback(null, 'Call back content');
      }, delay)
  }

  http.createServer(onRequest).listen(8000)
}

exports.start = start
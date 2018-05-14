var superagent = require('superagent')
    require('superagent-charset')(superagent)
    
var cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    async = require('async'),
    fs = require('fs')

var ep = new eventproxy(),
    curCount = 0,
    pageUrls = [],
    entryUrl = 'https://www.dy2018.com/html/gndy/dyzz/index.html'

var crawler = function() {

  return function (req, res) {
    curCount = 0,
    pageUrls = []

    var promise = new Promise(function(resolve, reject) {
          superagent.get(entryUrl)
          .charset('gbk')
          .end(function(err, response) {
            if (err) {
              console.log(err)
            } else {
              var $ = cheerio.load(response.text),
                  select = $('select option'),
                   requestLength = Math.min(select.length, 10) // 只取前10页的内容
    
              for (var i = 0; i < requestLength; i++) { 
                var href = select.eq(i).attr('value')
                pageUrls.push('https://www.dy2018.com' + href)
              }
    
              //use async.mapLimit to control concurrent
              async.mapLimit(pageUrls, 5, function(url, callback) {
                debounceFn(crowler, url, callback)
              }, function(err, results) {
                if (err) {
                  eq.throw(err)
                }
              }) // end async
            } // end superagent
          }) // end end
    
          // step 1: got each entry page, then crowler every movie per page
          ep.after('got_links', 200, function(links) {
            curCount = 0
            async.mapLimit(links, 5, function(item, cb) {
              debounceFn(analyseMovie, item, cb)
            }, function(err, result) {
              if (err) {
                eq.throw(err)
              }
            })
          })
    
          // step 2: conclure analyzed data, send to client
          ep.after('movie_analyzed', 200, function(items) {
            resolve(items)
          })

          ep.fail(function(err) {
            reject(err)
          })
        })  
        
    return promise
  } // end onRequest

  /**
   * @param {*} pageUrl 
   * @param {*} callback 
   * @description get every movie links per page
   */
  function crowler(pageUrl, callback) {
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
            ep.emit('got_links', { title, link })
          }
        }
      })    
  }

  /**
   * @param {*} item 
   * @param {*} cb 
   * @description analyse movie
   */
  function analyseMovie(item, cb) {
    superagent.get(item.link)
      .charset('gbk')
      .end(function(err, response) {
        if (err) {
          console.log(err)
        } else {
          parseMovie(response.text, item.link)
        }
      })  
  }
  
  /**
   * @param {*} args 
   * @description debounce execution of every http request
   */
  function debounceFn(...args) {
    var targetFn = args.shift(),
        cb = args.pop(),
        delay = parseInt((Math.random() * 30000000) % 1000, 10)

    if (!targetFn instanceof Function) {
      throw new Error('no function argument')
    }

    curCount++
    console.log('analyseMovie 现在的并发数是', curCount, ', 耗时' + delay + '毫秒')
    targetFn.apply(null, args)

    setTimeout(function() {
      curCount--;
      cb(null, 'Call back content');
    }, delay)  
  }

  /**
   * @param {*} rawText 
   * @description parse html of movie page
   */
  function parseMovie(rawText, link) {
    var $ = cheerio.load(rawText),
        metaDatas = $('.co_content8 .position span'),
          title = $('.title_all h1').text(),
          rank = metaDatas.eq(0).find('.rank').text(),
          types = metaDatas.eq(1).find('a'),
          date = metaDatas.eq(2).text(),
          typeArray = []        

    for (var i = 0; i < types.length; i++) {
      typeArray.push(types.eq(i).text())
    }
    ep.emit('movie_analyzed', {
      title,
      rank,
      date,
      type: typeArray.join(' / '),
      link
    })
  }
}

module.exports= crawler
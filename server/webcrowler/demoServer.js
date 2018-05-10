var superagent = require('superagent'),
    cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    http = require('http')

var ep = new eventproxy(),
    pageUrls = []

for (var i = 0; i < 200; i++) {
  pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex='+ i +'&ParentCategoryId=0');

}

function start() {
  // console.log('start')
  function onRequest(req, res) {
    pageUrls.forEach(function(pageUrl) {
      superagent.get(pageUrl)
        .end(function(err, res) {
          if (err) {
            console.log(err)
          } else {
            var $ = cheerio.load(res.text),
                articles = $('.titlelnk')
            
            for (var i = 0; i < articles.length; i++) {
              ep.emit('got_html', articles.eq(i).attr('href'))
            }
          }
        })
    })
    
    ep.after('got_html', pageUrls.length, function(articles) {

      var curCount = 0
      var reptileMove = function(url, cb) {
        var delay = parseInt((Math.random() * 30000000) % 1000, 10)
        curCount++
        console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒')    

        superagent.get(url)
        .end(function(err,sres){
            // sres.text 里面存储着请求返回的 html 内容
            var $ = cheerio.load(sres.text)
            // 收集数据
            // 拼接URL
            var currentBlogApp = url.split('/p/')[0].split('/')[3],
                appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp="+ currentBlogApp
            // 具体收集函数
            personInfo(appUrl)
        });
 
        setTimeout(function() {
            curCount--;
            callback(null,url +'Call back content')
        }, delay)
      }

    })
  }

  http.createServer(onRequest).listen(8000)
}

exports.start = start
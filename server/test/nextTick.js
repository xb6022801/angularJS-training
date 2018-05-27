/**
 * 测试 process.nextTick, 在所有IO操作之前触发
 */
const fs = require('fs'),
      path = require('path')

function cb() {
  process.nextTick(function() {
    // console.log('next tick occurred')
    cb()
  }) 
}

function settimeoutCb() {
  setTimeout(() => {
    // console.log('settimeout')
    settimeoutCb()
  }, 100);
 
}

cb()
// settimeoutCb()
console.log('normal process')

var file = path.resolve(process.cwd(), 'index.js')
fs.stat(file, (err, stat) => {
  console.log(stat)
})
var fs = require('fs')

var globalConfig = require('./config')

var fileName = globalConfig.log_path + '/' + globalConfig.log_name

// 异步 有回调
// fs.writeFile(fileName, 'asd', function () {})

// 同步 无回调
// fs.writeFileSync(fileName, 'asdfsdf')

function log(data) {
    console.log(data)
    // fs.writeFile(__dirname + '/' + fileName, data + '\n', {flag: 'a'}, function () {
    //     console.log('finish')
    // })
    fs.appendFile(__dirname + '/' + fileName, data + '\n', function () {})
}

module.exports = log;
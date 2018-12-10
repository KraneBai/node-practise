var fs = require('fs')
var globalConfig = require('./config')

var controllerSet = [];
var pathMap = new Map()

var files = fs.readdirSync(__dirname + '/' + globalConfig.web_path)

files.forEach(function (item) {
    var temp = require('./' + globalConfig.web_path + '/' + item)
    if (temp.path) {
        // controllerSet.push(temp)
        for (var [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value)
            } else {
                throw new Error('url异常:' + key)
            }
        }
        controllerSet.push(temp)
    }
})
module.exports = pathMap
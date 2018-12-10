var fs = require('fs')
var globalConfig = require('./config')

var filterSet = [];

var files = fs.readdirSync(__dirname + '/' + globalConfig.filter_path)

files.forEach(function (item) {
    var temp = require('./' + globalConfig.filter_path + '/' + item)
    filterSet.push(temp)
})
module.exports = filterSet
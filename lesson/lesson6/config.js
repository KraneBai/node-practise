var fs = require('fs')

// 加载配置项

var conf = fs.readFileSync(__dirname + '/server.conf')
var confArr = conf.toString().split('\n')
var confObj = {}
confArr.forEach ( function(item) {
    let itemArr = item.split('=')
    confObj[itemArr[0]] = itemArr[1]
})

if (confObj['path_position'] === 'relative') {
    confObj['base_path'] = __dirname + confObj['path'] 
} else {
    confObj['base_path'] = confObj['path']
}

module.exports = confObj
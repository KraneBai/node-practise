var fs = require('fs');

var config = fs.readFileSync(__dirname + "/server.conf");
// var config = fs.readFileSync("./server.conf");

var configs = config.toString().split('\n');

var globalConfig = {};

configs.forEach(function (item) {
    var itemArr = item.split('=');
    globalConfig[itemArr[0]] = itemArr[1];
})

if (globalConfig['static_file_type']) {
    globalConfig['static_file_type'] = globalConfig['static_file_type'].split('|')
} else {
    throw new Error('配置文件异常，缺少static_file_type')
}

module.exports = globalConfig;
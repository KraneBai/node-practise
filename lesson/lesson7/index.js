var http = require('http');
var url = require('url');
var fs = require('fs')
var globalConfig = require('./config');
var loader = require('./loader')
var filterSet = require('./filterLoader')
var log = require('./log')

http.createServer(function (request, response) {
    var pathName = url.parse(request.url).pathname
    var params = url.parse(request.url, true).query
    log(pathName)
    for (var i = 0 ; i < filterSet.length; i++) {
        var flag = filterSet[i](request, response)
        if (!flag) {
            return;
        }
      }
    var isStatic = isStaticRequest(pathName)
    if (isStatic) {
        try {
            var data = fs.readFileSync(__dirname + '/' +globalConfig.page_path + pathName)
            // var data = fs.readFileSync(globalConfig.page_path + pathName)
            response.writeHead(200);
            response.write(data);
            response.end();
        } catch (error) {
            response.writeHead(404);
            response.write('<html><body><h1>404NotFound</h1></body></html>');
            response.end();
        }
    } else  {
        console.log('请求了动态的数据')
        console.log(pathName)
        if (loader.get(pathName) != null) {
            try {
                loader.get(pathName)(request, response)
            } catch (error) {
                response.writeHead(500);
                response.write('<html><body><h1>500 Server Error</h1></body></html>');
                response.end();
            }
        } else {
            response.writeHead(404);
            response.write('<html><body><h1>404NotFound</h1></body></html>');
            response.end();
        }
    }
}).listen(globalConfig.port)

log("服务已启动")

function isStaticRequest (pathName) {
    for (var item in globalConfig.static_file_type) {
        var temp = globalConfig.static_file_type[item]
        if (pathName.indexOf(temp) == (pathName.length - temp.length)) {
            return true
        }
    }
    return false
}
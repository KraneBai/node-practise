var http = require('http')
var url = require('url')

http.createServer(function (request, response) {
    console.log(request)
    console.log(request.url)
    var pathName = url.parse(request.url).pathname
    var params = url.parse(request.url).query
    var paramsObj = url.parse(request.url, true).query
    console.log(pathName)
    console.log(params)
    console.log(paramsObj)
}).listen(12306)